import type { CSSProperties } from "react";
import ButtonLink from "@/components/ButtonLink";
import NeonSign from "@/components/NeonSign";
import type { Dictionary } from "@/content/types";
import { links, phoneFor } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// Frequently asked questions, as native <details>: they open without JavaScript, and smoothly where the browser can
// animate them (CSS in globals.css). Under them, a way to just call us.
// Phones: a small neon "?" beside the title, then every question, one topic after the other.
// Computers: the title under a bigger neon "?" on the left, and under it the topics, as pills; the questions of the
// picked topic on the right, the call buttons below them. The pills are radio buttons and globals.css shows the picked
// topic with :has(), so it takes no JavaScript (without :has(), every topic shows).
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
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-10">
        <div data-reveal className="section-head grid content-start justify-items-start gap-6 lg:col-start-1 lg:row-start-1">
          <NeonSign kind="question" />
          <h2 id="faq-title" className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.faq.title}
          </h2>
        </div>

        <fieldset data-reveal className="hidden content-start gap-3 lg:col-start-1 lg:row-start-2 lg:grid lg:max-w-[24rem]">
          <legend className="sr-only">{faq.groupsLabel}</legend>
          {faq.groups.map((group, i) => (
            <label
              key={group.title}
              className="faq-pick relative flex cursor-pointer items-center justify-between gap-4 rounded-full border border-line px-6 py-3.5 font-display text-[1.45rem] leading-none font-extrabold text-haze transition-[color,border-color,box-shadow] duration-300 hover:text-ink"
            >
              <input type="radio" name="faq-group" value={i} defaultChecked={i === 0} className="sr-only" />
              {group.title}
              <span aria-hidden="true" className="font-sans text-sm font-normal">
                {group.items.length}
              </span>
            </label>
          ))}
        </fieldset>

        <div className="grid content-start gap-10 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div data-reveal className="border-t border-line">
            {faq.groups.map((group, i) => (
              <div key={group.title} data-group={i} className="faq-group">
                <h3 className="sr-only">{group.title}</h3>
                {group.items.map((item) => (
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
            ))}
          </div>

          <div data-reveal className="grid content-start justify-items-start gap-4">
            <h3 className="font-display text-step-2 leading-none font-extrabold">{faq.moreTitle}</h3>
            <p className="text-haze">
              {before}
              <a href={links.call} className="whitespace-nowrap text-ink no-underline hover:text-neon">
                {phoneFor(dict.locale)}
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
      </div>
    </section>
  );
}
