import type { CSSProperties } from "react";
import FairyLights from "@/components/FairyLights";
import NeonSign from "@/components/NeonSign";
import type { BreathId, Dictionary, Locale } from "@/content/types";
import { media } from "@/lib/media";

// The photo of each breath, and the side it takes on computers: they alternate, the line goes on the other side.
// glow: the photo's own light as "r g b", spilling softly onto the dark side.
// sign and halo: the neon sign by the line, and the colour it (and the neon words) glow in.
// href: where the small link under the line goes.
// cut: the design of the neon cut where the photo ends (seams below, CSS in globals.css).
// photoWidth, focus: the photo's width on computers, in %, and what part of it stays in frame.
// phoneLift: how much of the photo's top (sky) is cut on phones, so the line comes up closer under a low subject.
const breaths = {
  bar: {
    photo: "break-van-night",
    side: "right",
    glow: "255 64 120",
    sign: "cocktail",
    halo: "255 110 210",
    href: "#service-van",
    cut: "sliver",
    photoWidth: 76,
    focus: "50% 55%",
    phoneLift: "0rem",
  },
  memories: {
    photo: "break-mirror-sunset",
    side: "left",
    glow: "255 150 120",
    sign: "logo",
    halo: "213 140 255",
    href: "#service-mirror",
    cut: "sliver-left",
    photoWidth: 62,
    focus: "50% 55%",
    phoneLift: "0rem",
  },
  date: {
    photo: "break-van-sunset",
    side: "right",
    glow: "255 170 90",
    sign: "heart",
    halo: "255 120 160",
    href: "#contact",
    cut: "slab",
    photoWidth: 66,
    focus: "50% 100%",
    phoneLift: "6rem",
  },
} as const;

// The neon lines of each cut, as x1 y1 x2 y2 in % of the breath on computers. They trace the edges of the clip-paths in
// globals.css. "sliver": the cut breaks a thin sliver off the photo. "slab": the break runs further in, through the photo,
// so the broken piece is wide enough to keep the van's nose and the logo on its door whole. The main edge glows in the
// breath's colour, the others in violet.
const seams = {
  sliver: [
    { line: [55, 0, 42, 100], tone: "main" },
    { line: [51.5, 0, 38.5, 100], tone: "violet" },
    { line: [47, 0, 34, 100], tone: "violet" },
  ],
  "sliver-left": [
    { line: [52, 0, 39, 100], tone: "main" },
    { line: [55.5, 0, 42.5, 100], tone: "violet" },
    { line: [60, 0, 47, 100], tone: "violet" },
  ],
  slab: [
    { line: [63, 0, 50, 100], tone: "main" },
    { line: [60, 0, 47, 100], tone: "violet" },
    { line: [49, 0, 36, 100], tone: "violet" },
  ],
} as const;

// On phones every cut is the same, in % of the photo's height, mirrored for a photo on the left.
const phoneSeams = [
  { line: [-2, 77.8, 102, 88.2], tone: "main" },
  { line: [-2, 81.8, 102, 92.2], tone: "violet" },
  { line: [-2, 88.8, 102, 99.2], tone: "violet" },
] as const;

// One string of lights over the dark side on computers. Its box ends at the cut (globals.css), so it stops there, and
// its far end runs off the screen: only whole bulbs show.
const strands = {
  right: [{ y: 6, y1: 10, sag: 44, r: 2.8, from: -0.05, to: 1 }],
  left: [{ y: 10, y1: 6, sag: 44, r: 2.8, from: 0, to: 1.05 }],
};

type Props = {
  id: BreathId;
  line: Dictionary["breaths"][BreathId];
  locale: Locale;
};

// A "breath" between sections: a big photo with one line beside it. The photo ends in a neon cut, like the hero's, and
// is taller than its frame, drifting through it as the page scrolls (parallax): CSS in globals.css,
// components/ParallaxFallback.tsx where the browser has no scroll timelines. A neon sign by the line, the line's last
// words glowing like the sign, and a small link under it.
// Phones: the photo fills the width at the top, the line and the sign below it.
// Computers: the photo fills one side, the line stands on the other, under a string of fairy lights.
export default function Breath({ id, line, locale }: Props) {
  const { photo, side, glow, sign, halo, href, cut, photoWidth, focus, phoneLift } = breaths[id];
  const square = media[photo];
  const tall = media[`${photo}-tall` as const];
  const right = side === "right";

  return (
    <div
      data-side={side}
      data-cut={cut}
      style={{ "--glow": glow, "--halo": halo, "--lift": phoneLift, "--photo-w": `${photoWidth}%`, "--focus": focus } as CSSProperties}
      className="breath relative isolate grid overflow-hidden border-b border-line bg-night lg:h-[min(82svh,46rem)] lg:min-h-[36rem] lg:items-center"
    >
      {/* The frame of the photo: the whole breath on computers, its top (or all of it) on phones (globals.css). */}
      <picture className="breath-frame absolute inset-0 -z-10 overflow-hidden">
        <source media="(max-width: 767px)" srcSet={tall.srcSet} sizes="100vw" width={tall.width} height={tall.height} />
        <img
          src={square.src}
          srcSet={square.srcSet}
          sizes={`(min-width: 1024px) ${photoWidth}vw, 100vw`}
          width={square.width}
          height={square.height}
          alt={square.alt[locale]}
          loading="lazy"
          decoding="async"
          className={`breath-photo absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover ${right ? "lg:left-auto" : "lg:right-auto"}`}
        />
      </picture>
      <svg className="breath-seam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {phoneSeams.map(({ line: [x1, y1, x2, y2], tone }) => (
          <line key={`phone-${y1}`} x1={x1} y1={y1} x2={x2} y2={y2} data-device="phone" data-tone={tone} />
        ))}
        {seams[cut].map(({ line: [x1, y1, x2, y2], tone }) => (
          <line key={`computer-${x1}`} x1={x1} y1={y1} x2={x2} y2={y2} data-device="computer" data-tone={tone} />
        ))}
      </svg>
      <FairyLights strands={strands[side]} spacing={58} wire className="breath-lights absolute top-0 hidden h-56 lg:block" />
      <div className="breath-text wrap lg:grid lg:py-0">
        <div
          data-reveal={right ? "left" : "right"}
          className={`grid justify-items-start gap-[1.1rem] lg:w-[44%] lg:gap-6 lg:pt-12 ${right ? "" : "lg:justify-self-end"}`}
        >
          <NeonSign kind={sign} />
          <p className="max-w-[14ch] font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-extrabold text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.55)] lg:max-w-[15ch] lg:text-[clamp(3.5rem,min(5.2vw,9svh),5.4rem)] lg:leading-[0.93]">
            {line.lead} <span className="neon-words">{line.neon}</span>
          </p>
          <a
            href={href}
            className="breath-link inline-flex min-h-11 items-center font-display text-[1.2rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon lg:text-[1.3rem]"
          >
            {line.link}
          </a>
        </div>
      </div>
    </div>
  );
}
