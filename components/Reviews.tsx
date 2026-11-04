import type { CSSProperties } from "react";
import NeonSign from "@/components/NeonSign";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// A few real Google reviews, picked by hand, with the rating and a link to all of them on Google. They are short, so
// they read like quotes, in the display font. The quote mark sits in the corner on phones, above the text on computers.
// Phones: a small neon "5 ★" beside the title, the reviews one under the other.
// Computers: the title and rating on the left, under a bigger neon "5 ★", the reviews in two columns on the right (the
// first across both, when there is an odd number).
export default function Reviews({ dict }: Props) {
  const { reviews } = dict;
  const rating = site.google.rating.toLocaleString(dict.locale, { minimumFractionDigits: 1 });
  const summary = reviews.summary.replace("{rating}", rating).replace("{count}", String(site.google.count));
  const stars = reviews.stars.replace("{n}", "5");

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      style={{ "--halo": "255 195 92" } as CSSProperties}
      className="overflow-clip border-b border-line py-20 lg:py-28"
    >
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div data-reveal className="section-head grid content-start justify-items-start gap-5 lg:gap-6">
          <NeonSign kind="rating" />
          <h2 id="reviews-title" className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.reviews.title}
          </h2>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-haze">
            <Stars label={stars} />
            {summary}
          </p>
          <GoogleLink label={reviews.all} className="hidden lg:inline-flex" />
        </div>

        <div className="grid content-start gap-6">
          <ul data-reveal className="grid gap-3 lg:grid-cols-2 lg:gap-6">
            {reviews.items.map((review) => (
              <li key={review.name} className="lg:[&:first-child:nth-last-child(odd)]:col-span-2">
                <figure className="relative grid h-full content-start gap-3 overflow-hidden rounded-2xl border border-line bg-night-2 p-5 pr-14 lg:gap-5 lg:p-8">
                  <span
                    aria-hidden="true"
                    className="absolute top-7 right-4 font-display text-[4.5rem] leading-[0.5] text-amber [text-shadow:0_0_18px_rgb(255_195_92/0.5)] lg:static lg:pt-4 lg:text-[5.5rem]"
                  >
                    “
                  </span>
                  <blockquote lang={review.lang} className="font-display text-[1.45rem] leading-[1.12] font-extrabold lg:text-[1.85rem]">
                    {review.text}
                  </blockquote>
                  <figcaption className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1 text-haze">
                    <Stars label={stars} />
                    {review.name}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          {reviews.note && <p className="text-step--1 text-haze">{reviews.note}</p>}
          <GoogleLink label={reviews.all} className="inline-flex justify-self-start lg:hidden" />
        </div>
      </div>
    </section>
  );
}

function Stars({ label }: { label: string }) {
  return (
    <span role="img" aria-label={label} className="tracking-[0.15em] text-amber [text-shadow:0_0_10px_rgb(255_195_92/0.6)]">
      ★★★★★
    </span>
  );
}

// On phones the link comes after the reviews, on computers under the rating.
function GoogleLink({ label, className }: { label: string; className: string }) {
  return (
    <a
      href={site.google.url}
      rel="noopener"
      className={`items-center gap-2.5 font-display text-[1.3rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon ${className}`}
    >
      {label}
      <span aria-hidden="true" className="grid size-9 place-items-center rounded-full border border-line text-base">
        →
      </span>
    </a>
  );
}
