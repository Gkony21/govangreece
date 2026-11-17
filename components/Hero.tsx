import type { CSSProperties } from "react";
import ButtonLink from "@/components/ButtonLink";
import FairyLights from "@/components/FairyLights";
import NeonSign, { type NeonSignKind } from "@/components/NeonSign";
import Photo from "@/components/Photo";
import TitleSwitch from "@/components/TitleSwitch";
import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
};

// Phones: two strings tied on the corner of the van's raised hatch, slack, running off each side of the photo.
const phoneStrands = [
  { from: 0.455, to: -0.05, y: 57, y1: 9, sag: 26, r: 3, bulbs: 6, vary: true },
  { from: 0.455, to: 1.05, y: 57, y1: 19, sag: 40, r: 3, bulbs: 7, vary: true, wave: [1, 4] as [number, number], skipEnd: 1 },
];

// Computers: one string across the dark side, tied to the neon line.
const computerStrands = [{ from: -0.02, to: 0.534, y: 25, y1: 41, sag: 22, r: 3, skipEnd: 1 }];

// The row of little signs under the buttons, on computers.
const signs: { kind: NeonSignKind; halo: string }[] = [
  { kind: "cocktail", halo: "255 110 210" },
  { kind: "heart", halo: "255 120 160" },
  { kind: "logo", halo: "213 140 255" },
  { kind: "rating", halo: "255 190 90" },
];

export default function Hero({ dict }: Props) {
  const { hero } = dict;

  return (
    <section aria-labelledby="hero-title" className="hero relative isolate flex flex-col overflow-hidden border-b border-line">
      <div className="hero-media">
        <Photo id="hero-van" locale={dict.locale} sizes="(min-width: 1024px) 58vw, 100vw" priority high className="hero-photo" />
        <svg className="hero-seam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line className="hero-seam-phone" x1="-2" y1="97" x2="102" y2="87" />
          <line className="hero-seam-computer" x1="54" y1="0" x2="42" y2="100" />
        </svg>
        <FairyLights strands={phoneStrands} wire wireOpacity={0.32} designWidth={375} className="absolute inset-0 h-full w-full lg:hidden" />
        <div className="hero-toast">
          <NeonSign kind="toast" />
        </div>
      </div>

      <FairyLights strands={computerStrands} spacing={47} wire wireOpacity={0.32} className="absolute inset-x-0 top-0 z-[1] hidden h-32 w-full lg:block" />

      <TitleSwitch />
      <div className="hero-text">
        <h1 id="hero-title" className="hero-title neon font-display font-black">
          <span className="hero-title-lead">{hero.titleLead}</span>
          {hero.title.split("\n").map((line, i) => (
            <span key={line} className="hero-title-line" data-line={i}>
              {" "}
              {line}
            </span>
          ))}
        </h1>
        <p className="hero-lead">
          <strong>{hero.leadStrong}</strong> {hero.lead}
        </p>

        <div className="hero-cta">
          <ButtonLink href="#contact" variant="neon">
            {dict.quoteCta}
          </ButtonLink>
          <a href="#services" className="hero-link">
            <span className="xl:hidden">{hero.servicesCtaShort}</span>
            <span className="hidden xl:inline">{hero.servicesCta}</span>
          </a>
        </div>

        <div className="hero-signs">
          {signs.map(({ kind, halo }) => (
            <div key={kind} style={{ "--halo": halo } as CSSProperties}>
              <NeonSign kind={kind} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
