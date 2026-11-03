import type { CSSProperties } from "react";
import ButtonLink from "@/components/ButtonLink";
import NeonSign from "@/components/NeonSign";
import type { Dictionary } from "@/content/types";
import { links, site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// Frequently asked questions, as native <details>: they open without JavaScript, and smoothly where the browser can
// animate them (CSS in globals.css). Under them, a way to just call us.
// Computers: the title under a neon "?" on the left, with the call buttons below it; the questions on the right.
export default function Faq({ dict }: Props) {
  const { faq } = dict;
  const [before, after = ""] = faq.moreText.split("{phone}");

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      style={{ "--halo": "255 110 210" } as CSSProperties}
      className="overflow-clip border-b border-line py-20 lg:py-28"
    >
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-12">
        <div data-reveal className="grid content-start justify-items-start gap-6 lg:col-start-1 lg:row-start-1">
          <NeonSign kind="question" />
          <h2 id="faq-title" className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.faq.title}
          </h2>
        </div>

        <div data-reveal className="border-t border-line lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          {faq.items.map((item) => (
            <details key={item.q} className="faq-item group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[1.6rem] leading-tight font-extrabold transition-colors hover:text-neon lg:py-6 lg:text-[1.85rem] [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden="true"
                  className="faq-plus grid size-9 shrink-0 place-items-center rounded-full border border-line transition-[rotate,border-color] duration-300 group-open:rotate-45 group-open:border-neon"
                />
              </summary>
              <p className="max-w-[58ch] pb-6 text-step-1 text-haze">{item.a}</p>
            </details>
          ))}
        </div>

        <div data-reveal className="grid content-start justify-items-start gap-4 lg:col-start-1 lg:row-start-2">
          <h3 className="font-display text-step-2 leading-none font-extrabold">{faq.moreTitle}</h3>
          <p className="text-haze">
            {before}
            <a href={links.call} className="whitespace-nowrap text-ink no-underline hover:text-neon">
              {site.phone.display}
            </a>
            {after}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={links.call} variant="ghost" size="sm">
              {faq.call}
            </ButtonLink>
            <ButtonLink href={links.viber} variant="ghost" size="sm">
              Viber
            </ButtonLink>
            <ButtonLink href={links.whatsapp} variant="ghost" size="sm" rel="noopener">
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
