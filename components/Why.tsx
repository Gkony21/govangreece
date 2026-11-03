import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
};

// Why GO! Van: the one-team message in big neon numbers, then four reasons.
export default function Why({ dict }: Props) {
  const { why } = dict;

  return (
    <section id="why" aria-labelledby="why-title" className="border-b border-line bg-night-2 py-20 lg:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="grid content-start gap-4">
          <h2 id="why-title" data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.why.title}
          </h2>
          <p data-reveal className="text-step-1 text-haze">
            {why.lead}
          </p>
          <ul data-reveal className="mt-6 flex gap-8 sm:gap-12">
            {why.stats.map((stat) => (
              <li key={stat.label} className="grid justify-items-start">
                <span className="font-display text-[clamp(4rem,11vw,6.5rem)] leading-[0.85] font-extrabold text-neon [text-shadow:0_0_28px_rgb(213_140_255/0.55)]">
                  {stat.value}
                </span>
                <span className="font-display text-step-1 font-extrabold tracking-wide uppercase">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid content-start gap-x-10 gap-y-8 sm:grid-cols-2">
          {why.points.map((point, i) => (
            <li
              key={point.title}
              data-reveal
              style={{ transitionDelay: `${(i % 2) * 0.1}s` }}
              className="relative grid gap-2 border-t border-line pt-5 pl-6 before:absolute before:top-[1.85rem] before:left-0 before:size-2 before:rounded-full before:bg-amber before:shadow-[0_0_12px_var(--color-amber)]"
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
