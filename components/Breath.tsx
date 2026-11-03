import type { CSSProperties } from "react";
import FairyLights from "@/components/FairyLights";
import type { BreathId, Locale } from "@/content/types";
import { media } from "@/lib/media";

// The photo of each breath, and the side it takes on computers: they alternate, the line goes on the other side.
// On phones the line sits at the bottom, or at the top where the subject is low in the photo.
// glow: the photo's own light as "r g b", spilling softly onto the dark side on computers.
const breaths = {
  bar: { photo: "break-van-night", side: "right", phoneText: "bottom", glow: "255 64 120" },
  memories: { photo: "break-mirror-sunset", side: "left", phoneText: "top", glow: "255 150 120" },
  date: { photo: "break-van-sunset", side: "right", phoneText: "bottom", glow: "255 170 90" },
} as const;

// One string of lights over the dark side on computers, sparser than the hero's two.
const strand = [{ y: 10, sag: 70, r: 2.8 }];

type Props = {
  id: BreathId;
  text: string;
  locale: Locale;
};

// A "breath" between sections: a big photo with one line over it. The photo is taller than its frame and drifts
// through it as the page scrolls (parallax): CSS in globals.css, components/ParallaxFallback.tsx where the browser
// has no scroll timelines.
// Phones: the photo fills the screen width, cut tall, with the line over it.
// Computers: the photo fills one side, near square, and fades into the dark where the line stands, under a string
// of fairy lights like the hero's.
export default function Breath({ id, text, locale }: Props) {
  const { photo, side, phoneText, glow } = breaths[id];
  const square = media[photo];
  const tall = media[`${photo}-tall` as const];
  const right = side === "right";

  return (
    <div
      data-side={side}
      data-phone-text={phoneText}
      style={{ "--glow": glow } as CSSProperties}
      className={`breath relative isolate grid h-[clamp(20rem,62svh,38rem)] overflow-hidden ${phoneText === "top" ? "items-start" : "items-end"} border-b border-line bg-night lg:h-[min(82svh,46rem)] lg:items-center`}
    >
      {/* Photo and line share the one grid cell, so the line can sit at the top, middle or bottom. */}
      <picture className="[grid-area:1/1]">
        <source media="(max-width: 767px)" srcSet={tall.srcSet} sizes="100vw" width={tall.width} height={tall.height} />
        <img
          src={square.src}
          srcSet={square.srcSet}
          sizes="(min-width: 1024px) 62vw, 100vw"
          width={square.width}
          height={square.height}
          alt={square.alt[locale]}
          loading="lazy"
          decoding="async"
          className={`breath-photo absolute inset-x-0 -top-[10%] -z-10 h-[120%] w-full object-cover lg:w-[62%] ${right ? "lg:left-auto" : "lg:right-auto"}`}
        />
      </picture>
      <FairyLights strands={strand} spacing={58} className={`absolute top-0 hidden h-56 w-[44%] lg:block ${right ? "left-0" : "right-0"}`} />
      <div className={`wrap [grid-area:1/1] lg:grid lg:py-0 ${phoneText === "top" ? "pt-10" : "pb-10"}`}>
        <p
          data-reveal={right ? "left" : "right"}
          className={`max-w-[14ch] font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-extrabold text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.55)] lg:max-w-[36%] lg:text-[clamp(3.5rem,5vw,5rem)] ${right ? "" : "lg:justify-self-end lg:text-right"}`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
