import type { BreathId, Locale } from "@/content/types";
import { media } from "@/lib/media";

const photos = {
  bar: "break-van-night",
  memories: "break-venue",
  date: "break-van-sunset",
} as const;

type Props = {
  id: BreathId;
  text: string;
  locale: Locale;
};

// A "breath" between sections: a full-width photo with one line over it. The photo is taller than its frame and
// drifts through it as the page scrolls (parallax): CSS in globals.css, components/ParallaxFallback.tsx where the
// browser has no scroll timelines. Phones get a tall crop of the same photo.
export default function Breath({ id, text, locale }: Props) {
  const wide = media[photos[id]];
  const tall = media[`${photos[id]}-tall` as const];

  return (
    <div className="breath relative isolate grid h-[clamp(20rem,62svh,38rem)] items-end overflow-hidden border-b border-line">
      <picture>
        <source media="(max-width: 767px)" srcSet={tall.srcSet} sizes="100vw" width={tall.width} height={tall.height} />
        <img
          src={wide.src}
          srcSet={wide.srcSet}
          sizes="100vw"
          width={wide.width}
          height={wide.height}
          alt={wide.alt[locale]}
          loading="lazy"
          decoding="async"
          className="breath-photo absolute inset-x-0 -top-[10%] -z-10 h-[120%] w-full object-cover"
        />
      </picture>
      <div className="wrap pb-10 lg:pb-14">
        <p
          data-reveal="left"
          className="max-w-[14ch] font-display text-[clamp(2.6rem,8vw,6rem)] leading-[0.95] font-extrabold text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.55)]"
        >
          {text}
        </p>
      </div>
    </div>
  );
}
