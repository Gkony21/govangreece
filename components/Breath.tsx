import type { CSSProperties } from "react";
import FairyLights from "@/components/FairyLights";
import NeonSign from "@/components/NeonSign";
import type { BreathId, Dictionary, Locale } from "@/content/types";
import { media } from "@/lib/media";

// The photo of each breath, and the side it takes on computers: they alternate, the line goes on the other side.
// On phones the line sits under the photo, or over it at the top, where the subject is low in the photo.
// glow: the photo's own light as "r g b", spilling softly onto the dark side on computers.
// sign and halo: the neon sign over the line on computers, and the colour it (and the neon words) glow in.
// href: where the small link under the line goes.
// fade: how the photo dissolves into the night on computers. "short" where the subject touches the photo's inner edge
// (the van's nose, with the logo on its door): the photo slides out a little, cutting its far side, and dissolves over
// a short, soft edge, so the subject stays lit.
// phoneSign: where the sign goes on phones. "above" the line, on wires that fade out over the photo. In the top right
// "corner", beside a line over the photo, hanging from the top of the breath. Or beside the line on the "wall", with no
// wires, where the subject fills the bottom of the photo (the van, logo and all) and wires would cross it.
// phoneLift: how much of the photo's top (sky) is cut on phones, so the line comes up closer under a low subject.
// cut: where the photo ends in a neon cut instead of dissolving, the design of that cut (seams below, CSS in globals.css).
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
    phoneSign: "wall",
    phoneLift: "0rem",
    cut: "shard",
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
    phoneSign: "corner",
    phoneLift: "0rem",
    cut: null,
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
    phoneSign: "wall",
    phoneLift: "3.5rem",
    cut: null,
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

// The neon lines of each cut, as x1 y1 x2 y2 in % of the breath (computers) or of the photo (phones). They trace the
// edges of the clip-paths in globals.css. "shard": the cut breaks a sliver off the photo, the main edge in the breath's
// colour, the sliver's two edges in violet.
const seams = {
  shard: {
    phone: [
      { line: [-2, 77.8, 102, 88.2], tone: "main" },
      { line: [-2, 81.8, 102, 92.2], tone: "violet" },
      { line: [-2, 88.8, 102, 99.2], tone: "violet" },
    ],
    computer: [
      { line: [55, 0, 42, 100], tone: "main" },
      { line: [51.5, 0, 38.5, 100], tone: "violet" },
      { line: [47, 0, 34, 100], tone: "violet" },
    ],
  },
} as const;

// With a cut, the lights' box ends at the cut, so the string stops there: only whole bulbs, as always.
const cutStrands = [{ y: 6, y1: 10, sag: 44, r: 2.8, from: -0.05, to: 1 }];

type Props = {
  id: BreathId;
  line: Dictionary["breaths"][BreathId];
  locale: Locale;
};

// A "breath" between sections: a big photo with one line over it. The photo is taller than its frame and drifts
// through it as the page scrolls (parallax): CSS in globals.css, components/ParallaxFallback.tsx where the browser
// has no scroll timelines.
// Both: the photo dissolves into the night where the line stands, or ends in a neon cut like the hero's, with a neon
// sign and the line's last words glowing like the sign. A small link under the line.
// Phones: the photo fills the width at the top, the line below it. Or, when the line is at the top, the photo fills the
// breath and the line stands over its sky.
// Computers: the photo fills one side, near square, the line on the other, under a string of fairy lights like the
// hero's and a bigger sign.
export default function Breath({ id, line, locale }: Props) {
  const { photo, side, phoneText, glow, sign, halo, href, fade, phoneSign, phoneLift, cut } = breaths[id];
  const square = media[photo];
  const tall = media[`${photo}-tall` as const];
  const right = side === "right";

  return (
    <div
      data-side={side}
      data-phone-text={phoneText}
      data-fade={fade}
      data-phone-sign={phoneSign}
      data-cut={cut ?? undefined}
      style={{ "--glow": glow, "--halo": halo, "--lift": phoneLift } as CSSProperties}
      className="breath relative isolate grid overflow-hidden border-b border-line bg-night lg:h-[min(82svh,46rem)] lg:min-h-[36rem] lg:items-center"
    >
      {/* The frame of the photo: the whole breath on computers, its top (or all of it) on phones (globals.css). */}
      <picture className="breath-frame absolute inset-0 -z-10 overflow-hidden">
        <source media="(max-width: 767px)" srcSet={tall.srcSet} sizes="100vw" width={tall.width} height={tall.height} />
        <img
          src={square.src}
          srcSet={square.srcSet}
          sizes={`(min-width: 1024px) ${cut ? 76 : 61}vw, 100vw`}
          width={square.width}
          height={square.height}
          alt={square.alt[locale]}
          loading="lazy"
          decoding="async"
          className={`breath-photo absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover lg:w-[61%] ${right ? "lg:left-auto" : "lg:right-auto"}`}
        />
      </picture>
      {cut && (
        <svg className="breath-seam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {(["phone", "computer"] as const).flatMap((device) =>
            seams[cut][device].map(({ line: [x1, y1, x2, y2], tone }) => (
              <line key={`${device}-${x1}`} x1={x1} y1={y1} x2={x2} y2={y2} data-device={device} data-tone={tone} />
            )),
          )}
        </svg>
      )}
      <FairyLights
        strands={cut ? cutStrands : strands[side]}
        spacing={58}
        wire
        className={`absolute inset-x-0 top-0 hidden h-56 w-full lg:block ${cut ? "breath-lights" : ""}`}
      />
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
