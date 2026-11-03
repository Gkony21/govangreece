import type { CSSProperties } from "react";
import NeonSign from "@/components/NeonSign";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

// A few real Google reviews, picked by hand, with the rating and a link to all of them on Google.
// Phones: the reviews sit side by side and scroll sideways, so the page doesn't grow by a screen per review.
// Computers: the title and rating on the left, under a neon "5 ★", the reviews in two columns on the right (the first
// across both, when there is an odd number).
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
        <div data-reveal className="grid content-start justify-items-start gap-5 lg:gap-6">
          <NeonSign kind="rating" />
          <h2 id="reviews-title" className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.reviews.title}
          </h2>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-haze">
            <Stars label={stars} />
            {summary}
          </p>
          <a
            href={site.google.url}
            rel="noopener"
            className="hidden items-center gap-2.5 font-display text-[1.3rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon lg:inline-flex"
          >
            {reviews.all}
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full border border-line text-base">
              →
            </span>
          </a>
        </div>

        <div className="grid content-start gap-6">
          {reviews.items.length > 0 ? (
            <ul
              data-reveal
              tabIndex={0}
              aria-labelledby="reviews-title"
              className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:thin] lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {reviews.items.map((review) => (
                <li
                  key={review.name}
                  className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto lg:[&:first-child:nth-last-child(odd)]:col-span-2"
                >
                  <figure className="grid h-full content-start gap-4 rounded-2xl border border-line bg-night-2 p-5 lg:gap-5 lg:p-8">
                    <span aria-hidden="true" className="font-display text-[3.5rem] leading-[0.5] text-amber lg:text-[4.5rem] [text-shadow:0_0_18px_rgb(255_195_92/0.5)]">
                      {dict.locale === "el" ? "«" : "“"}
                    </span>
                    <blockquote className="text-[1.0625rem] leading-relaxed lg:text-step-1">{review.text}</blockquote>
                    <figcaption className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-step--1 text-haze">
                      <Stars label={stars} />
                      <span>
                        <b className="font-normal text-ink">{review.name}</b> · {review.event}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            // Temporary, until the reviews are picked: like the "coming in step" labels.
            <p lang="el" className="justify-self-start rounded-full border border-amber/40 px-3 py-1 text-sm text-amber">
              Εδώ μπαίνουν 3–5 κριτικές, μόλις τις διαλέξουμε
            </p>
          )}
          {reviews.note && reviews.items.length > 0 && <p className="text-step--1 text-haze">{reviews.note}</p>}
          <a
            href={site.google.url}
            rel="noopener"
            className="inline-flex items-center gap-2.5 justify-self-start font-display text-[1.3rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon lg:hidden"
          >
            {reviews.all}
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full border border-line text-base">
              →
            </span>
          </a>
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
