import type { CSSProperties } from "react";
import FairyLights from "@/components/FairyLights";
import NeonSign from "@/components/NeonSign";
import PrintViewer from "@/components/PrintViewer";
import type { BreathId, Dictionary, Locale } from "@/content/types";
import { media } from "@/lib/media";

// The photo of each breath, and the side it takes on computers: they alternate, the tube goes on the other side.
// glow: the photo's own light as "r g b", spilling softly onto the dark side.
// sign and halo: the neon sign by the tube, and the colour it (and the neon words) glow in.
// href: where the small link under the line goes.
// shift: how far the tube sits from its usual place on computers, in % of the breath.
// photoWidth, focus: the photo's width on computers, in %, and what part of it stays in frame. focusPhone: the same on phones.
const breaths = {
  bar: { photo: "break-van-night", side: "right", glow: "255 64 120", sign: "cocktail", halo: "255 110 210", href: "#service-van", shift: 0, photoWidth: 76, focus: "50% 55%" },
  memories: { photo: "break-mirror-stone", side: "left", glow: "255 150 120", sign: "logo", halo: "213 140 255", href: "#service-mirror", shift: 3, photoWidth: 62, focus: "50% 55%" },
  date: { photo: "break-drinks-red", side: "right", glow: "255 70 90", sign: "heart", halo: "255 120 160", href: "#contact", shift: -3, photoWidth: 70, focus: "50% 50%", focusPhone: "50% 100%" },
} as const;

type Point = readonly [number, number];

// The bent neon tube where the photo ends, as cubic Béziers: a start point, then two controls and an end for each piece.
// Computers: x, y in % of the breath, top to bottom. Phones: x, y in % of the photo's height, left to right.
const computerTube: Point[] = [[53, -1], [47.5, 10], [44.5, 22], [44.5, 40], [44.5, 60], [46, 72], [43, 84], [41.5, 90], [39.5, 96], [37, 101]];
const phoneTube: Point[] = [[-1, 92], [18, 97], [38, 97], [58, 91], [72, 87], [88, 88], [101, 93]];

// Where the tube passes the sign on computers, before shift, and the part of its height (in %) where it stops for the sign.
const signX = 44.6;
const signGap = [31, 63] as const;

function tubePath(points: Point[]) {
  const [[x0, y0], ...rest] = points;
  return `M${x0} ${y0} C${rest.map(([x, y]) => `${x} ${y}`).join(" ")}`;
}

// The same curve as short straight steps, for the clip-path, which takes no curves in %.
function tubeSteps(points: Point[]) {
  const steps: Point[] = [points[0]];
  for (let i = 0; i + 3 < points.length; i += 3) {
    const [a, b, c, d] = points.slice(i, i + 4);
    for (let n = 1; n <= 10; n++) {
      const t = n / 10;
      const u = 1 - t;
      const at = (k: 0 | 1) => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k];
      steps.push([Math.round(at(0) * 100) / 100, Math.round(at(1) * 100) / 100]);
    }
  }
  return steps;
}

// The tube on computers, in two lengths: it stops above the sign and starts again below it.
function computerTubeLengths(shift: number) {
  const steps = tubeSteps(computerTube).map(([x, y]) => `${Math.round((x + shift) * 100) / 100} ${y}`);
  const ys = tubeSteps(computerTube).map(([, y]) => y);
  const above = steps.filter((_, i) => ys[i] <= signGap[0]);
  const below = steps.filter((_, i) => ys[i] >= signGap[1]);
  return [above, below].map((length) => `M${length.join(" L")}`);
}

// Computers: down the tube, then around the photo's side. The tube moves with --cut-shift (globals.css).
function computerClip(shift: number, right: boolean) {
  const edge = right ? "101%" : "-1%";
  const tube = tubeSteps(computerTube).map(([x, y]) => `calc(${Math.round((x + shift) * 100) / 100}% + var(--cut-shift)) ${y}%`);
  return `polygon(${tube.join(", ")}, ${edge} 101%, ${edge} -1%)`;
}

// Phones: across the tube, then around the top. Mirrored for a photo on the left, so the breaths alternate here too.
function phoneClip(right: boolean) {
  const tube = tubeSteps(phoneTube).map(([x, y]) => `${right ? x : Math.round((100 - x) * 100) / 100}% ${y}%`);
  return `polygon(${tube.join(", ")}, ${right ? "101%" : "-1%"} -1%, ${right ? "-1%" : "101%"} -1%)`;
}

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
  // A second link that opens the Mirror Photo Booth's prints over the page (the "memories" breath).
  prints?: Dictionary["prints"];
};

// A "breath" between sections: a big photo with one line beside it. The photo ends in a bent neon tube, and is taller than its frame, drifting through it as the page scrolls (parallax): CSS in globals.css,
// components/ParallaxFallback.tsx where the browser has no scroll timelines. A neon sign by the line, the line's last
// words glowing like the sign, and a small link under it.
// Phones: the photo fills the width at the top, the line and the sign below it.
// Computers: the photo fills one side, the line stands on the other, under a string of fairy lights, the sign on the tube.
export default function Breath({ id, line, locale, prints }: Props) {
  const breath = breaths[id];
  const { photo, side, glow, sign, halo, href, shift, photoWidth, focus } = breath;
  const square = media[photo];
  const tall = media[`${photo}-tall` as const];
  const right = side === "right";

  return (
    <div
      data-side={side}
      style={
        {
          "--glow": glow,
          "--halo": halo,
          "--photo-w": `${photoWidth}%`,
          "--focus": focus,
          ...("focusPhone" in breath && { "--focus-phone": breath.focusPhone }),
          "--clip-phone": phoneClip(right),
          "--clip-computer": computerClip(shift, right),
          "--sign-x": `${signX + shift}%`,
          "--tube-shift": `${shift}%`,
        } as CSSProperties
      }
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
        <path d={tubePath(phoneTube)} data-device="phone" />
        {computerTubeLengths(shift).map((d) => (
          <path key={d} d={d} data-device="computer" />
        ))}
      </svg>
      <FairyLights strands={strands[side]} spacing={58} wire className="breath-lights absolute top-0 hidden h-56 lg:block" />
      <div className="breath-sign">
        <div data-reveal>
          <NeonSign kind={sign} />
        </div>
      </div>
      <div className="breath-text wrap lg:grid lg:py-0">
        <div
          data-reveal={right ? "left" : "right"}
          className={`grid justify-items-start gap-[1.1rem] lg:w-[44%] lg:gap-6 lg:pt-12 ${right ? "" : "lg:justify-self-end"}`}
        >
          <NeonSign kind={sign} />
          <p className="max-w-[14ch] font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.95] font-extrabold text-balance [text-shadow:0_2px_24px_rgb(0_0_0/0.55)] lg:max-w-[15ch] lg:text-[clamp(3.5rem,min(5.2vw,9svh),5.4rem)] lg:leading-[0.93]">
            {line.lead} <span className="neon-words">{line.neon}</span>
          </p>
          <div className="flex flex-wrap gap-x-7">
            <a
              href={href}
              className="breath-link inline-flex min-h-11 items-center font-display text-[1.2rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon lg:text-[1.3rem]"
            >
              {line.link}
            </a>
            {prints && <PrintViewer labels={prints} locale={locale} look="link" />}
          </div>
        </div>
      </div>
    </div>
  );
}
