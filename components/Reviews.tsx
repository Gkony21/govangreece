import type { CSSProperties } from "react";
import NeonSign from "@/components/NeonSign";
import NeonTitle from "@/components/NeonTitle";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// A few real Google reviews, picked by hand, with the rating and a link to all of them on Google. Each one is a paper
// note, a touch crooked (.review-note in globals.css): a change of texture in a page of neon.
// Phones: a small neon "5 ★" beside the title, the notes one under the other.
// Computers: the title and rating on the left, under a bigger neon "5 ★", the notes on the right, in two columns (the
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
      className="overflow-clip py-20 lg:py-28"
    >
      <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div data-reveal className="section-head grid content-start justify-items-start gap-5 lg:gap-6">
          <NeonSign kind="rating" />
          <h2 id="reviews-title" className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            <NeonTitle {...dict.sections.reviews} />
          </h2>
          <p className="-mb-2 font-display text-step-1 leading-none font-extrabold text-amber [text-shadow:0_0_14px_rgb(255_195_92/0.45)]">
            {reviews.happy}
          </p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-haze">
            <Stars label={stars} className="text-amber [text-shadow:0_0_10px_rgb(255_195_92/0.6)]" />
            {summary}
          </p>
          <GoogleLink label={reviews.all} className="hidden lg:inline-flex" />
        </div>

        <div className="grid content-start gap-6">
          <ul data-reveal className="grid gap-5.5 lg:grid-cols-2 lg:gap-7">
            {reviews.items.map((review) => (
              <li key={review.name} className="lg:[&:first-child:nth-last-child(odd)]:col-span-2">
                <figure className="review-note grid h-full content-between gap-3.5 px-5.5 pt-6 pb-5">
                  <blockquote lang={review.lang} className="font-display text-[1.65rem] leading-[1.1] font-extrabold">
                    {review.text}
                  </blockquote>
                  <figcaption className="flex items-center justify-between gap-3 text-[0.95rem] text-[#5b5167]">
                    {review.name}
                    <Stars label={stars} className="text-[#c98a14]" />
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

function Stars({ label, className }: { label: string; className: string }) {
  return (
    <span role="img" aria-label={label} className={`tracking-[0.15em] ${className}`}>
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
      className={`min-h-11 items-center gap-2.5 font-display text-[1.3rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon ${className}`}
    >
      {label}
    </a>
  );
}
