import type { CSSProperties } from "react";
import ButtonLink from "@/components/ButtonLink";
import NeonSign from "@/components/NeonSign";
import NeonTitle from "@/components/NeonTitle";
import type { Dictionary } from "@/content/types";
import { links, phoneFor } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// Frequently asked questions, as native <details>: they open without JavaScript, and smoothly where the browser can
// animate them (CSS in globals.css). Under them, a way to just call us.
// One topic at a time, picked from pills. The pills are radio buttons and globals.css shows the picked topic with :has(),
// so it takes no JavaScript (without :has(), every topic shows).
// Phones: a small neon "?" beside the title, the pills, then the questions.
// Computers: the title under a bigger neon "?" and the pills on the left, the questions and the call buttons on the right.
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
            <NeonTitle {...dict.sections.faq} />
          </h2>
        </div>

        <fieldset data-reveal className="flex flex-wrap content-start gap-2 lg:col-start-1 lg:row-start-2 lg:grid lg:max-w-[24rem] lg:gap-3">
          <legend className="sr-only">{faq.groupsLabel}</legend>
          {faq.groups.map((group, i) => (
            <label
              key={group.title}
              className="faq-pick relative flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-full border border-line px-4 py-2 font-display text-[1.2rem] leading-none font-extrabold text-haze transition-[color,border-color,box-shadow] duration-300 hover:text-ink lg:gap-4 lg:px-6 lg:py-3.5 lg:text-[1.45rem]"
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
              <ButtonLink href={links.call} variant="tube" size="sm">
                {faq.call}
              </ButtonLink>
              <ButtonLink href={links.viber} variant="tube" size="sm">
                Viber
              </ButtonLink>
              <ButtonLink href={links.whatsapp} variant="tube" size="sm" rel="noopener">
                WhatsApp
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
