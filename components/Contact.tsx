import type { CSSProperties } from "react";
import ButtonLink from "@/components/ButtonLink";
import NeonSign from "@/components/NeonSign";
import NeonTitle from "@/components/NeonTitle";
import QuoteForm from "@/components/QuoteForm";
import type { Dictionary } from "@/content/types";
import { links, phoneFor, site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// The quote request, where every "Get a quote" leads. A short line and the direct ways in (call, Viber, WhatsApp,
// email) beside the form, for those who would rather talk.
// Phones: a small neon phone beside the title, the form, then the direct ways.
// Computers: the title under a bigger neon phone on the left with the direct ways under it, the form on the right.
export default function Contact({ dict }: Props) {
  const { contact } = dict;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      style={{ "--halo": "213 140 255" } as CSSProperties}
      className="overflow-clip py-20 lg:py-28"
    >
      <div className="wrap grid gap-y-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div data-reveal className="section-head grid content-start justify-items-start gap-6 lg:col-start-1 lg:row-start-1">
          <NeonSign kind="phone" />
          <h2 id="contact-title" className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            <NeonTitle {...dict.sections.contact} />
          </h2>
          <p className="max-w-[30rem] text-step-1 text-haze">{contact.lead}</p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <QuoteForm dict={dict} />
        </div>

        <div data-reveal className="grid content-start justify-items-start gap-4 lg:col-start-1 lg:row-start-2">
          <h3 className="font-display text-step-2 leading-none font-extrabold">{contact.directTitle}</h3>
          <p className="grid gap-1.5">
            <span className="text-step--1 text-haze">{contact.directPhone}</span>
            <a
              href={links.call}
              className="font-display text-[2.4rem] leading-none font-extrabold tracking-wide text-ink no-underline hover:text-neon"
            >
              {phoneFor(dict.locale)}
            </a>
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={links.call} variant="tube" size="sm" className="min-h-11">
              {contact.call}
            </ButtonLink>
            <ButtonLink href={links.viber} variant="tube" size="sm" className="min-h-11">
              Viber
            </ButtonLink>
            <ButtonLink href={links.whatsapp} variant="tube" size="sm" className="min-h-11" rel="noopener">
              WhatsApp
            </ButtonLink>
          </div>
          <a href={links.email} className="text-haze no-underline hover:text-ink">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
