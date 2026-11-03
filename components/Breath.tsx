import type { CSSProperties } from "react";
import FairyLights from "@/components/FairyLights";
import NeonSign from "@/components/NeonSign";
import type { BreathId, Dictionary, Locale } from "@/content/types";
import { media } from "@/lib/media";

// The photo of each breath, and the side it takes on computers: they alternate, the line goes on the other side.
// On phones the line sits at the bottom, or at the top where the subject is low in the photo.
// glow: the photo's own light as "r g b", spilling softly onto the dark side on computers.
// sign and halo: the neon sign over the line on computers, and the colour it (and the neon words) glow in.
// href: where the small link under the line goes.
// fade: how the photo dissolves into the night on computers. "short" where the subject touches the photo's inner edge
// (the van's nose, with the logo on its door): the photo slides out a little, cutting its far side, and dissolves over
// a short, soft edge, so the subject stays lit.
const breaths = {
  bar: {
    photo: "break-van-night",
    side: "right",
    phoneText: "bottom",
    glow: "255 64 120",
    sign: "cocktail",
    halo: "255 110 210",
    href: "#service-van",
    fade: "long",
  },
  memories: {
    photo: "break-mirror-sunset",
    side: "left",
    phoneText: "top",
    glow: "255 150 120",
    sign: "logo",
    halo: "213 140 255",
    href: "#service-mirror",
    fade: "long",
  },
  date: {
    photo: "break-van-sunset",
    side: "right",
    phoneText: "bottom",
    glow: "255 170 90",
    sign: "heart",
    halo: "255 120 160",
    href: "#contact",
    fade: "short",
  },
} as const;

// One string of lights over the dark side on computers. It runs off the outer edge of the screen and rises into the
// top at the inner end, over the fading photo and clear of the sign's wires, so both ends leave the frame and every
// bulb on show is whole. It hangs no lower than about 35px, above the sign.
const strands = {
  // photo on the left: lights from the photo's edge to the right
  left: [{ y: -30, y1: 6, sag: 44, r: 2.8, from: 0.4, to: 1.03 }],
  right: [{ y: 6, y1: -30, sag: 44, r: 2.8, from: -0.03, to: 0.6 }],
};

type Props = {
  id: BreathId;
  line: Dictionary["breaths"][BreathId];
  locale: Locale;
};

// A "breath" between sections: a big photo with one line over it. The photo is taller than its frame and drifts
// through it as the page scrolls (parallax): CSS in globals.css, components/ParallaxFallback.tsx where the browser
// has no scroll timelines.
// Phones: the photo fills the screen width, cut tall, with the line over it.
// Computers: the photo fills one side, near square, and darkens into the night where the line stands, under a
// string of fairy lights like the hero's and a neon sign. The line's last words glow like the sign.
export default function Breath({ id, line, locale }: Props) {
  const { photo, side, phoneText, glow, sign, halo, href, fade } = breaths[id];
  const square = media[photo];
  const tall = media[`${photo}-tall` as const];
  const right = side === "right";

  return (
    <div
      data-side={side}
      data-phone-text={phoneText}
      data-fade={fade}
      style={{ "--glow": glow, "--halo": halo } as CSSProperties}
      className={`breath relative isolate grid h-[clamp(20rem,62svh,38rem)] overflow-hidden ${phoneText === "top" ? "items-start" : "items-end"} border-b border-line bg-night lg:h-[min(82svh,46rem)] lg:min-h-[36rem] lg:items-center`}
    >
      {/* Photo and line share the one grid cell, so the line can sit at the top, middle or bottom. */}
      <picture className="[grid-area:1/1]">
        <source media="(max-width: 767px)" srcSet={tall.srcSet} sizes="100vw" width={tall.width} height={tall.height} />
        <img
          src={square.src}
          srcSet={square.srcSet}
          sizes="(min-width: 1024px) 61vw, 100vw"
          width={square.width}
          height={square.height}
          alt={square.alt[locale]}
          loading="lazy"
          decoding="async"
          className={`breath-photo absolute inset-x-0 -top-[10%] -z-10 h-[120%] w-full object-cover lg:w-[61%] ${right ? "lg:left-auto" : "lg:right-auto"}`}
        />
      </picture>
      <FairyLights strands={strands[side]} spacing={58} wire className="absolute inset-x-0 top-0 hidden h-56 w-full lg:block" />
      <div className={`wrap [grid-area:1/1] lg:grid lg:py-0 ${phoneText === "top" ? "pt-10" : "pb-10"}`}>
        <div
          data-reveal={right ? "left" : "right"}
          className={`lg:grid lg:w-[44%] lg:justify-items-start lg:gap-6 lg:pt-12 ${right ? "" : "lg:justify-self-end"}`}
        >
          <NeonSign kind={sign} />
          <p className="max-w-[14ch] font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-extrabold text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.55)] lg:max-w-[15ch] lg:text-[clamp(3.5rem,min(5.2vw,9svh),5.4rem)] lg:leading-[0.93]">
            {line.lead} <span className="breath-neon">{line.neon}</span>
          </p>
          <a
            href={href}
            className="hidden items-center gap-2.5 font-display text-[1.3rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon lg:inline-flex"
          >
            {line.link}
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-full border border-line text-base">
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
