"use client";

import { useEffect, useRef, useState, type ComponentProps, type FormEvent } from "react";
import { flushSync } from "react-dom";
import { eventTypes, serviceIds, type Dictionary } from "@/content/types";
import { useCocktailNames } from "@/lib/cocktail-names";
import { setPicked, togglePick, usePicked } from "@/lib/package";
import { checkQuote, isoDay, quoteLimits, readQuote, type QuoteErrors, type QuoteResult } from "@/lib/quote";
import { links, phoneFor } from "@/lib/site";
import { humanCheck, type HumanCheck } from "@/lib/turnstile";

type Props = {
  dict: Dictionary;
};

type Form = Dictionary["contact"]["form"];

// The fields that can be wrong, in the order they appear: the first wrong one gets the focus.
const fields = ["name", "phone", "date", "email"] as const;
type Errors = Partial<Record<(typeof fields)[number], string>>;

const input =
  "w-full min-h-12 rounded-xl border border-line bg-night px-3 py-2 text-ink sm:px-4 transition-[border-color,box-shadow] placeholder:text-haze/60 hover:border-violet/60 focus-visible:border-violet focus-visible:shadow-[0_0_0_4px_rgb(169_139_255/0.2)] focus-visible:outline-none aria-[invalid=true]:border-error disabled:opacity-40";

const label = "font-display text-[1.15rem] leading-none font-extrabold tracking-wide";

const legend = "font-display text-xl leading-none font-extrabold tracking-wide";

// A choice drawn as a pill, its radio or checkbox hidden inside (relative, so focusing it never scrolls the page).
const chip =
  "group relative inline-flex cursor-pointer items-center gap-1.5 min-h-10 rounded-full border border-line px-3.5 py-1.5 font-display text-[1.05rem] leading-none font-extrabold tracking-wide transition-colors hover:border-violet has-checked:border-violet has-checked:bg-violet has-checked:text-on-violet has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-amber";

// What is wrong, in words. The checks are lib/quote.ts, the same the server runs, against the visitor's today.
function check(data: FormData, messages: Form["errors"]): Errors {
  const found = checkQuote(readQuote(data), isoDay(new Date()));
  return wordsFor(found, messages);
}

function wordsFor(found: QuoteErrors, messages: Form["errors"]): Errors {
  const errors: Errors = {};
  for (const field of fields) {
    const code = found[field];
    if (code) errors[field] = messages[code];
  }
  return errors;
}

// Asks Turnstile for its token, then sends. Anything that goes wrong on the way is "failed": the visitor sees the
// phone number and can try again.
async function send(data: FormData, human: HumanCheck): Promise<QuoteResult> {
  try {
    data.set("cf-turnstile-response", await human.token());
    const response = await fetch("/api/quote", { method: "POST", body: data, headers: { Accept: "application/json" } });
    return await response.json();
  } catch {
    return { ok: false, error: "failed" };
  }
}

// The quote request. Light on purpose: the deal is closed on the phone, so only name, phone and date are needed, and
// everything beyond the basics waits behind "Add details" (open without JavaScript, .quote-details in app/globals.css).
// Mistakes show after the first try, under each field, and clear as they are fixed; the first one gets the focus.
// The services are the package built with "I want it", both ways. Names given to the cocktails go into the message.
// It sends to /api/quote (functions/api/quote.ts), which emails the client. Turnstile loads as the form comes near.
export default function QuoteForm({ dict }: Props) {
  const form = dict.contact.form;
  const picked = usePicked();
  const cocktailNames = useCocktailNames();
  const [details, setDetails] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [noDate, setNoDate] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [asked, setAsked] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const date = useRef<HTMLInputElement>(null);
  const humanBox = useRef<HTMLDivElement>(null);
  const human = useRef<HumanCheck>(undefined);
  const thanks = useRef<HTMLHeadingElement>(null);

  // Turnstile, started once, when the form is near or someone sends it.
  function startHuman() {
    if (!human.current && humanBox.current) human.current = humanCheck(humanBox.current, dict.locale, () => setAsked(true));
    return human.current;
  }

  // The date picker starts at today. Set here, as the page is built ahead of time.
  useEffect(() => {
    if (date.current) date.current.min = isoDay(new Date());
  }, []);

  useEffect(() => {
    if (sent) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startHuman();
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    if (formRef.current) observer.observe(formRef.current);
    return () => {
      observer.disconnect();
      human.current?.remove();
      human.current = undefined;
    };
    // startHuman only reads refs, a state setter and the page's language, which never change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sent]);

  useEffect(() => {
    if (sent) thanks.current?.focus();
  }, [sent]);

  // Focuses the first wrong field; true when there was one.
  function showFirst(found: Errors) {
    // A wrong email can be behind "Add details": open them first, so it can take the focus.
    if (found.email) flushSync(() => setDetails(true));
    const first = fields.find((field) => found[field]);
    if (first) document.getElementById(`quote-${first}`)?.focus();
    return first !== undefined;
  }

  // The cocktails the visitor has named, in menu order.
  const named = dict.cocktails.signatures.flatMap((signature) => {
    const name = cocktailNames[signature.name]?.trim();
    return name ? [{ cocktail: signature.name, name }] : [];
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const data = new FormData(event.currentTarget);
    const found = check(data, form.errors);
    setErrors(found);
    setTried(true);
    if (showFirst(found)) {
      setStatus("idle");
      return;
    }

    // At the top of the message, as the server cuts anything past its limit from the end.
    if (named.length > 0) {
      const lines = named.map(({ cocktail, name }) => `${cocktail}: ${name}`).join("\n");
      data.set("message", `${form.cocktailNames}:\n${lines}\n\n${data.get("message")}`.trim());
    }

    const turnstile = startHuman();
    if (!turnstile) return;
    setStatus("sending");
    const result = await send(data, turnstile);
    if (result.ok) {
      // Sent: the package is done with, so the bar at the bottom goes too.
      setSent(true);
      setPicked([]);
      return;
    }
    // A token works once: the next try needs a new one.
    turnstile.reset();
    if (result.error === "invalid") {
      const fromServer = wordsFor(result.errors, form.errors);
      setErrors(fromServer);
      setStatus("idle");
      showFirst(fromServer);
      return;
    }
    setStatus("failed");
  }

  function recheck(event: FormEvent<HTMLFormElement>) {
    if (tried) setErrors(check(new FormData(event.currentTarget), form.errors));
  }

  if (sent) {
    return (
      <div className="grid content-start justify-items-start gap-4 self-start rounded-3xl border border-violet/50 bg-night-2 p-6 shadow-[0_0_40px_rgb(169_139_255/0.15)] lg:p-10">
        <h3 ref={thanks} tabIndex={-1} className="font-display text-step-3 leading-none font-extrabold">
          <span className="neon-words">{form.sent.title}</span>
        </h3>
        <p className="text-step-1 text-haze">{form.sent.text}</p>
      </div>
    );
  }

  const count = Object.keys(errors).length;
  const summary = count === 1 ? form.errors.summaryOne : form.errors.summaryMany.replace("{count}", String(count));
  const all = serviceIds.every((id) => picked.includes(id));
  const [beforeLink, afterLink = ""] = form.privacy.split("{link}");
  const [beforePhone, afterPhone = ""] = form.failed.split("{phone}");
  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      data-reveal
      action="/api/quote"
      method="post"
      noValidate
      aria-label={form.label}
      onSubmit={submit}
      onChange={recheck}
      className="grid grid-cols-1 content-start gap-x-3 gap-y-4 rounded-3xl border border-line bg-night-2 p-5 min-[22.5rem]:grid-cols-2 sm:p-8 lg:gap-x-5 lg:gap-y-5 lg:p-9"
    >
      <input type="hidden" name="locale" value={dict.locale} />

      <TextField
        id="quote-name"
        name="name"
        label={form.name}
        error={errors.name}
        required
        autoComplete="name"
        autoCapitalize="words"
        maxLength={quoteLimits.name}
      />
      <TextField
        id="quote-phone"
        name="phone"
        label={form.phone}
        error={errors.phone}
        required
        type="tel"
        autoComplete="tel"
        maxLength={quoteLimits.phone}
      />

      <div className="col-span-full grid content-start gap-2">
        <label htmlFor="quote-date" className={label}>
          {form.date}
          <Required />
        </label>
        <input
          ref={date}
          id="quote-date"
          name="date"
          type="date"
          required={!noDate}
          disabled={noDate}
          aria-invalid={errors.date ? true : undefined}
          aria-describedby={errors.date ? "quote-date-error" : undefined}
          className={input}
        />
        <label className="flex cursor-pointer items-center gap-2.5 text-haze">
          <input
            type="checkbox"
            name="noDate"
            checked={noDate}
            onChange={(event) => setNoDate(event.target.checked)}
            className="size-5 shrink-0 accent-violet"
          />
          {form.noDate}
        </label>
        <FieldError id="quote-date-error" message={errors.date} />
      </div>

      <fieldset className="col-span-full">
        <legend className={`${legend} float-left mb-2.5 w-full`}>{form.event}</legend>
        <div className="clear-left flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <label key={type} className={chip}>
              <input type="radio" name="event" value={type} className="sr-only" />
              {form.eventTypes[type]}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="col-span-full">
        <legend className={`${legend} float-left mb-2.5 w-full`}>{form.services}</legend>
        <div className="clear-left flex flex-wrap gap-2">
          {dict.services.items.map((service) => (
            <label key={service.id} className={chip}>
              <input
                type="checkbox"
                name="services"
                value={service.id}
                checked={picked.includes(service.id)}
                onChange={() => togglePick(service.id)}
                className="sr-only"
              />
              <Tick />
              {service.name}
            </label>
          ))}
          <label className={`${chip} border-dashed`}>
            <input type="checkbox" checked={all} onChange={(event) => setPicked(event.target.checked ? serviceIds : [])} className="sr-only" />
            <Tick />
            {form.all}
          </label>
        </div>
      </fieldset>

      <button type="button" className="quote-more col-span-full" aria-expanded={details} aria-controls="quote-details" onClick={() => setDetails(!details)}>
        <span aria-hidden="true" className="service-more-mark">
          +
        </span>
        {form.more}
      </button>

      <div id="quote-details" className="quote-details col-span-full grid gap-x-5 gap-y-4 sm:grid-cols-2" data-open={details || undefined}>
        <div className="sm:col-span-2">
          <TextField
            id="quote-email"
            name="email"
            label={form.email}
            error={errors.email}
            type="email"
            autoComplete="email"
            spellCheck={false}
            maxLength={quoteLimits.email}
          />
        </div>
        <TextField
          id="quote-place"
          name="place"
          label={form.place}
          placeholder={form.placePlaceholder}
          autoComplete="off"
          maxLength={quoteLimits.place}
        />
        <TextField
          id="quote-guests"
          name="guests"
          label={form.guests}
          placeholder={form.guestsPlaceholder}
          inputMode="numeric"
          maxLength={quoteLimits.guests}
        />
        <div className="grid content-start gap-2 sm:col-span-2">
          <label htmlFor="quote-message" className={label}>
            {form.message}
          </label>
          <textarea id="quote-message" name="message" rows={3} maxLength={quoteLimits.message} className={`${input} resize-y`} />
        </div>
      </div>

      {named.length > 0 && (
        <p className="col-span-full text-[0.98rem] leading-snug text-[#ffd08a] [text-shadow:0_0_12px_rgb(255_195_92/0.6)]">
          {form.cocktails.replace("{names}", named.map((cocktail) => cocktail.name).join(" & "))}
        </p>
      )}

      {/* No gap here: Turnstile's box takes no room until Cloudflare asks for a tick. */}
      <div className="col-span-full grid">
        <div ref={humanBox} className={asked ? "mb-4" : undefined} />
        <p aria-live="polite" className="mb-4 text-error empty:hidden">
          {status === "failed" ? (
            <>
              {beforePhone}
              <a href={links.call} className="whitespace-nowrap text-ink underline decoration-error underline-offset-4">
                {phoneFor(dict.locale)}
              </a>
              {afterPhone}
            </>
          ) : tried && count > 0 ? (
            summary
          ) : (
            ""
          )}
        </p>
        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6">
          <button
            type="submit"
            aria-disabled={sending || undefined}
            className="btn-neon justify-self-start rounded-full px-7 py-4 font-display text-xl leading-none font-extrabold tracking-wide transition-[background-color,box-shadow] aria-disabled:cursor-wait aria-disabled:opacity-70"
          >
            {sending ? form.sending : form.submit}
          </button>
          <p className="text-step--1 text-haze">
            {beforeLink}
            <a href={form.privacyHref} className="text-ink underline decoration-line underline-offset-4 hover:text-neon">
              {form.privacyLink}
            </a>
            {afterLink}
          </p>
        </div>
      </div>
    </form>
  );
}

function Required() {
  return (
    <span aria-hidden="true" className="text-neon">
      {" "}
      *
    </span>
  );
}

function Tick() {
  return (
    <span aria-hidden="true" className="hidden group-has-checked:inline">
      ✓
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-step--1 text-error">
      {message}
    </p>
  );
}

type TextFieldProps = ComponentProps<"input"> & {
  id: string;
  label: string;
  error?: string;
};

function TextField({ id, label: text, error, required, ...props }: TextFieldProps) {
  return (
    <div className="grid content-start gap-2">
      <label htmlFor={id} className={label}>
        {text}
        {required && <Required />}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={input}
        {...props}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}
