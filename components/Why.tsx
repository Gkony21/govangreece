import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
};

// Why GO! Van: the one big claim with neon last words, and beside it a bar receipt with all five services on one bill
// (never an amount: no prices on the site; paper edge in globals.css). Three short reasons below.
export default function Why({ dict }: Props) {
  const { why } = dict;

  return (
    <section
      id="why"
      aria-labelledby="why-title"
      style={{ "--halo": "213 140 255" } as CSSProperties}
      className="bg-night-2 py-20 lg:py-24"
    >
      <div className="wrap grid gap-12 lg:gap-14">
        <div className="grid items-center gap-9 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div className="grid content-start gap-2">
            <h2 id="why-title" data-reveal className="font-display text-step-1 font-extrabold tracking-[0.18em] text-violet uppercase">
              {dict.sections.why.title}
            </h2>
            <p data-reveal className="font-display text-[clamp(3rem,6vw,5.6rem)] leading-[0.95] font-extrabold text-balance">
              {why.lead} <span className="neon-words">{why.neon}</span>
            </p>
          </div>

          <div data-reveal className="why-receipt justify-self-center">
            <p className="text-center font-display text-[1.9rem] leading-none font-extrabold">GO! Van</p>
            <p className="mt-1 mb-3.5 text-center text-[0.82rem] text-[#5b5167]">drinks &amp; smiles</p>
            <ul>
              {dict.services.items.map((service) => (
                <li key={service.id} className="flex justify-between border-t border-dashed border-[#b7ad9f] py-2">
                  {service.name}
                  <span aria-hidden="true">✓</span>
                </li>
              ))}
            </ul>
            <p className="mt-1.5 border-t-2 border-[#1a1326] pt-3 text-center font-display text-[1.55rem] leading-[1.05] font-extrabold text-balance">
              {why.total}
            </p>
          </div>
        </div>

        <ul className="grid content-start gap-x-10 gap-y-5 lg:grid-cols-3">
          {why.points.map((point, i) => (
            <li key={point.title} data-reveal style={{ transitionDelay: `${(i % 3) * 0.1}s` }} className="grid content-start gap-1">
              <b className="text-[1.15rem] font-normal">{point.title}</b>
              <span className="text-[0.98rem] text-haze">{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
