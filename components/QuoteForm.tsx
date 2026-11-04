"use client";

import { useEffect, useRef, useState, type ComponentProps, type FormEvent } from "react";
import { eventTypes, serviceIds, type Dictionary } from "@/content/types";
import { setPicked, togglePick, usePicked } from "@/lib/package";

type Props = {
  dict: Dictionary;
};

type Form = Dictionary["contact"]["form"];

// The fields that can be wrong, in the order they appear: the first wrong one gets the focus.
const fields = ["name", "phone", "email", "date"] as const;
type Errors = Partial<Record<(typeof fields)[number], string>>;

const input =
  "w-full min-h-13 rounded-xl border border-line bg-night px-4 py-3 text-ink transition-[border-color,box-shadow] placeholder:text-haze/60 hover:border-violet/60 focus-visible:border-violet focus-visible:shadow-[0_0_0_4px_rgb(169_139_255/0.2)] focus-visible:outline-none aria-[invalid=true]:border-error disabled:opacity-40";

const label = "font-display text-xl leading-none font-extrabold tracking-wide";

// A choice drawn as a pill, its radio or checkbox hidden inside (relative, so focusing it never scrolls the page).
const chip =
  "group relative inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-4 py-2.5 font-display text-lg leading-none font-extrabold tracking-wide transition-colors hover:border-violet has-checked:border-violet has-checked:bg-violet has-checked:text-on-violet has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-amber";

// Today as YYYY-MM-DD in the visitor's time zone, the format of <input type="date">.
function today() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

// Only what is needed to call back: a name, a phone that looks like one, and a date (or "not set yet"). An email is
// optional, but has to look like one when given. The server checks it all again (step 10).
function validate(data: FormData, errors: Form["errors"]): Errors {
  const found: Errors = {};
  const phone = String(data.get("phone")).trim();
  const digits = phone.replace(/\D/g, "").length;
  const email = String(data.get("email")).trim();
  const date = data.get("date");

  if (!String(data.get("name")).trim()) found.name = errors.name;
  if (!phone) found.phone = errors.phone;
  else if (digits < 10 || digits > 15 || /[^\d\s+().-]/.test(phone)) found.phone = errors.phoneInvalid;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) found.email = errors.email;
  // A disabled field is left out of the form data: no date when "not set yet" is ticked.
  if (!data.has("noDate")) {
    if (!date) found.date = errors.date;
    else if (String(date) < today()) found.date = errors.datePast;
  }
  return found;
}

// The quote request. Light on purpose: the deal is closed on the phone, so only name, phone and date are needed.
// Mistakes show after the first try, under each field, and clear as they are fixed; the first one gets the focus.
// The services are the package built with "I want it", both ways.
// Step 9: it does not send yet. A valid request shows the thank-you, with a note saying so.
export default function QuoteForm({ dict }: Props) {
  const form = dict.contact.form;
  const picked = usePicked();
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [noDate, setNoDate] = useState(false);
  const [sent, setSent] = useState(false);
  const date = useRef<HTMLInputElement>(null);
  const thanks = useRef<HTMLHeadingElement>(null);

  // The date picker starts at today. Set here, as the page is built ahead of time.
  useEffect(() => {
    if (date.current) date.current.min = today();
  }, []);

  useEffect(() => {
    if (sent) thanks.current?.focus();
  }, [sent]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(new FormData(event.currentTarget), form.errors);
    setErrors(found);
    setTried(true);
    const first = fields.find((field) => found[field]);
    if (first) {
      document.getElementById(`quote-${first}`)?.focus();
      return;
    }
    // Sent: the package is done with, so the bar at the bottom goes too.
    setSent(true);
    setPicked([]);
  }

  function recheck(event: FormEvent<HTMLFormElement>) {
    if (tried) setErrors(validate(new FormData(event.currentTarget), form.errors));
  }

  if (sent) {
    return (
      <div className="grid content-start justify-items-start gap-4 self-start rounded-3xl border border-violet/50 bg-night-2 p-6 shadow-[0_0_40px_rgb(169_139_255/0.15)] lg:p-10">
        <h3 ref={thanks} tabIndex={-1} className="font-display text-step-3 leading-none font-extrabold">
          <span className="neon-words">{form.sent.title}</span>
        </h3>
        <p className="text-step-1 text-haze">{form.sent.text}</p>
        <p lang="el" className="rounded-full border border-amber/40 px-3 py-1 text-sm text-amber">
          Δοκιμή: η φόρμα δεν στέλνει ακόμα. Η αποστολή έρχεται στο Βήμα 10.
        </p>
      </div>
    );
  }

  const count = Object.keys(errors).length;
  const summary = count === 1 ? form.errors.summaryOne : form.errors.summaryMany.replace("{count}", String(count));
  const all = serviceIds.every((id) => picked.includes(id));
  const [beforeLink, afterLink = ""] = form.privacy.split("{link}");

  return (
    <form
      data-reveal
      method="post"
      noValidate
      aria-label={form.label}
      onSubmit={submit}
      onChange={recheck}
      className="grid content-start gap-7 rounded-3xl border border-line bg-night-2 p-5 sm:p-8 lg:grid-cols-2 lg:gap-x-6 lg:p-10"
    >
      <p className="text-step--1 text-haze lg:col-span-2">{form.requiredNote}</p>

      <TextField id="quote-name" name="name" label={form.name} error={errors.name} required autoComplete="name" autoCapitalize="words" />
      <TextField id="quote-phone" name="phone" label={form.phone} error={errors.phone} required type="tel" autoComplete="tel" />
      <TextField id="quote-email" name="email" label={form.email} error={errors.email} type="email" autoComplete="email" spellCheck={false} />

      <div className="grid content-start gap-2.5">
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

      <fieldset className="lg:col-span-2">
        <legend className={`${label} float-left mb-3.5 w-full`}>{form.event}</legend>
        <div className="clear-left flex flex-wrap gap-2.5">
          {eventTypes.map((type) => (
            <label key={type} className={chip}>
              <input type="radio" name="event" value={type} className="sr-only" />
              {form.eventTypes[type]}
            </label>
          ))}
        </div>
      </fieldset>

      <TextField id="quote-place" name="place" label={form.place} placeholder={form.placePlaceholder} autoComplete="off" maxLength={120} />
      <TextField id="quote-guests" name="guests" label={form.guests} placeholder={form.guestsPlaceholder} inputMode="numeric" maxLength={12} />

      <fieldset aria-describedby="quote-services-hint" className="lg:col-span-2">
        <legend className={`${label} float-left mb-2 w-full`}>{form.services}</legend>
        <p id="quote-services-hint" className="clear-left mb-3.5 text-step--1 text-haze">
          {form.servicesHint}
        </p>
        <div className="flex flex-wrap gap-2.5">
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
              {service.short}
            </label>
          ))}
          <label className={`${chip} border-dashed`}>
            <input type="checkbox" checked={all} onChange={(event) => setPicked(event.target.checked ? serviceIds : [])} className="sr-only" />
            <Tick />
            {form.all}
          </label>
        </div>
      </fieldset>

      <div className="grid content-start gap-2.5 lg:col-span-2">
        <label htmlFor="quote-message" className={label}>
          {form.message}
        </label>
        <textarea id="quote-message" name="message" rows={4} maxLength={2000} className={`${input} resize-y`} />
      </div>

      <div className="grid gap-4 lg:col-span-2">
        <p aria-live="polite" className="text-error empty:hidden">
          {tried && count > 0 ? summary : ""}
        </p>
        <div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-6">
          <button
            type="submit"
            className="justify-self-start rounded-full bg-violet px-7 py-4 font-display text-xl leading-none font-extrabold tracking-wide text-on-violet transition-shadow hover:shadow-[0_0_28px_2px_rgb(213_140_255/0.55)]"
          >
            {form.submit}
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
    <div className="grid content-start gap-2.5">
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
