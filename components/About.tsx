import type { CSSProperties } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
};

// A few words about us: no faces or names, the client's wish. One big line with neon last words, a short text, and
// where we go, as rings around Sparta (CSS in globals.css). On computers the two sit side by side.
export default function About({ dict }: Props) {
  const { about } = dict;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      style={{ "--halo": "213 140 255" } as CSSProperties}
      className="border-b border-line bg-night-2 py-20 lg:py-28"
    >
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <div className="grid content-start gap-6">
          <h2 id="about-title" data-reveal className="font-display text-step-1 font-extrabold tracking-[0.18em] text-violet uppercase">
            {dict.sections.about.title}
          </h2>
          <p data-reveal className="font-display text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] font-extrabold text-balance">
            {about.lead} <span className="neon-words">{about.neon}</span>
          </p>
          <p data-reveal className="max-w-[38rem] text-step-1 text-haze">
            {about.text}
          </p>
        </div>

        <div data-reveal className="grid justify-items-center gap-7">
          <h3 className="font-display text-step-2 leading-none font-extrabold">{about.areaTitle}</h3>
          <ol className="area-rings">
            <li className="area-home">
              <span>{about.home}</span>
            </li>
            {about.areas.map((area, i) => (
              <li key={area} data-ring={i + 1} className="area-ring">
                <span>{area}</span>
              </li>
            ))}
          </ol>
          <p className="text-center text-step--1 text-haze">{about.areaNote}</p>
        </div>
      </div>
    </section>
  );
}
