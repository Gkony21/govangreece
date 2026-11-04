import type { CSSProperties } from "react";
import ButtonLink from "@/components/ButtonLink";
import NeonSign from "@/components/NeonSign";
import QuoteForm from "@/components/QuoteForm";
import type { Dictionary } from "@/content/types";
import { links, site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// The quote request, where every "Get a quote" leads. A short line and the direct ways in (call, Viber, WhatsApp,
// email) beside the form, for those who would rather talk.
// Phones: a small neon phone beside the title, the direct ways, then the form.
// Computers: the title under a bigger neon phone on the left, with the direct ways under it, staying in view while
// the form on the right goes past.
export default function Contact({ dict }: Props) {
  const { contact } = dict;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{ "--halo": "213 140 255" } as CSSProperties}
      className="overflow-clip border-b border-line py-20 lg:py-28"
    >
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="grid content-start gap-10 lg:sticky lg:top-[calc(var(--header-h)+2.5rem)] lg:self-start">
          <div data-reveal className="section-head grid content-start justify-items-start gap-6">
            <NeonSign kind="phone" />
            <h2 id="contact-title" className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
              {dict.sections.contact.title}
            </h2>
            <p className="max-w-[30rem] text-step-1 text-haze">{contact.lead}</p>
          </div>

          <div data-reveal className="grid justify-items-start gap-4">
            <h3 className="font-display text-step-2 leading-none font-extrabold">{contact.directTitle}</h3>
            <p className="grid gap-1.5">
              <span className="text-step--1 text-haze">{contact.directPhone}</span>
              <a
                href={links.call}
                className="font-display text-[2.4rem] leading-none font-extrabold tracking-wide text-ink no-underline hover:text-neon"
              >
                {site.phone.display}
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={links.call} variant="ghost" size="sm">
                {contact.call}
              </ButtonLink>
              <ButtonLink href={links.viber} variant="ghost" size="sm">
                Viber
              </ButtonLink>
              <ButtonLink href={links.whatsapp} variant="ghost" size="sm" rel="noopener">
                WhatsApp
              </ButtonLink>
            </div>
            <a href={links.email} className="text-haze no-underline hover:text-ink">
              {site.email}
            </a>
          </div>
        </div>

        <QuoteForm dict={dict} />
      </div>
    </section>
  );
}
