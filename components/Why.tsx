import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
};

// Why GO! Van: the one-team message in big neon numbers, then four reasons. On computers the numbers run across
// the full width like a scoreboard, with the reasons in four columns below.
export default function Why({ dict }: Props) {
  const { why } = dict;

  return (
    <section id="why" aria-labelledby="why-title" className="border-b border-line bg-night-2 py-20 lg:py-24">
      <div className="wrap grid gap-12 lg:gap-14">
        <div className="grid max-w-[46rem] gap-4">
          <h2 id="why-title" data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.why.title}
          </h2>
          <p data-reveal className="text-step-1 text-haze">
            {why.lead}
          </p>
        </div>

        <ul data-reveal className="-mt-2 flex gap-8 sm:gap-12 lg:mt-0 lg:grid lg:grid-cols-3 lg:gap-0 lg:border-y lg:border-line">
          {why.stats.map((stat) => (
            <li
              key={stat.label}
              className="grid justify-items-start lg:flex lg:items-end lg:gap-5 lg:border-l lg:border-line lg:px-10 lg:py-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="font-display text-[clamp(4rem,11vw,6.5rem)] leading-[0.85] font-extrabold text-neon [text-shadow:0_0_28px_rgb(213_140_255/0.55)] lg:text-[clamp(7rem,10vw,10rem)] lg:[text-shadow:0_0_42px_rgb(213_140_255/0.6)]">
                {stat.value}
              </span>
              <span className="font-display text-step-1 font-extrabold tracking-wide uppercase lg:pb-3 lg:text-step-2">{stat.label}</span>
            </li>
          ))}
        </ul>

        <ul className="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {why.points.map((point, i) => (
            <li
              key={point.title}
              data-reveal
              style={{ transitionDelay: `${(i % 4) * 0.1}s` }}
              className="relative grid content-start gap-2 border-t border-line pt-5 pl-6 before:absolute before:top-[1.85rem] before:left-0 before:size-2 before:rounded-full before:bg-amber before:shadow-[0_0_12px_var(--color-amber)] lg:border-t-0 lg:pt-0 lg:before:top-[0.6rem]"
            >
              <b className="text-step-1 font-normal">{point.title}</b>
              <span className="text-haze">{point.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
