import ButtonLink from "@/components/ButtonLink";
import FairyLights from "@/components/FairyLights";
import Photo from "@/components/Photo";
import type { Dictionary } from "@/content/types";
import { media } from "@/lib/media";

// Background photos, in order. Each has a "-wide" photo (landscape screens) and a "-tall" one (phones, portrait),
// not always the same picture: see media/media.config.mjs.
const slides = ["hero-1", "hero-2", "hero-3", "hero-4"] as const;

// The three frames of the 5x15 strip, top to bottom: guests having fun.
const stripFrames = ["strip-couple", "strip-friends", "strip-girls"] as const;

type Props = {
  dict: Dictionary;
};

export default function Hero({ dict }: Props) {
  const { hero } = dict;

  return (
    <section aria-labelledby="hero-title" className="relative isolate grid min-h-[min(calc(100svh-var(--header-h)),860px)] items-center overflow-hidden border-b border-line">
      <HeroSlides />
      <FairyLights />

      <div className="wrap relative grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12">
        <div className="grid gap-6">
          <h1 id="hero-title" className="neon max-w-[12ch] font-display text-step-4 leading-[0.92] font-black text-balance">
            {hero.title}
          </h1>
          <p className="max-w-[34ch] text-step-1 text-haze">
            <strong className="font-normal text-ink">{hero.leadStrong}</strong> {hero.lead}
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#contact">{dict.quoteCta}</ButtonLink>
            <ButtonLink href="#services" variant="ghost" className="bg-night/40 backdrop-blur-sm">
              {hero.servicesCta}
            </ButtonLink>
          </div>
          <p className="text-step--1 text-haze">{hero.area}</p>
        </div>

        <figure
          aria-label={hero.stripLabel}
          className="hero-strip grid w-[min(190px,50vw)] gap-2 justify-self-center bg-[#fbf8ff] p-2.5 pb-0 lg:w-[240px]"
        >
          <p lang="en" className="pt-1 text-center font-display text-lg leading-none font-extrabold tracking-wide text-on-violet/80">drinks &amp; smiles</p>
          {stripFrames.map((id) => (
            <Photo key={id} id={id} locale={dict.locale} sizes="240px" className="aspect-[3/2] w-full rounded-[2px] object-cover" />
          ))}
          <figcaption className="grid place-items-center py-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
            <img src="/logo-112.webp" alt="GO! Van" width={56} height={56} className="size-12 invert brightness-[0.25]" />
          </figcaption>
        </figure>
      </div>

      <span className="scroll-cue hidden lg:block" aria-hidden="true" />
    </section>
  );
}

// Crossfading photos behind the hero, with a slow zoom. Decorative: the text carries the meaning, so alt is empty.
// Phones in portrait get the tall crop, everything else the wide one. Only the first photo loads with high priority.
// On phones the photos fill only the first screen and fade into the night below, where the strip sits: stretched over
// the whole hero they would be zoomed in and lose their sides.
function HeroSlides() {
  return (
    <div
      className="hero-slides absolute inset-x-0 top-0 -z-10 h-[min(calc(100svh-var(--header-h)),860px)] overflow-hidden lg:inset-0 lg:h-auto"
      aria-hidden="true"
    >
      {slides.map((id, i) => {
        const wide = media[`${id}-wide`];
        const tall = media[`${id}-tall`];
        return (
          <picture key={id}>
            <source media="(orientation: landscape)" srcSet={wide.srcSet} sizes="100vw" width={wide.width} height={wide.height} />
            <img
              src={tall.src}
              srcSet={tall.srcSet}
              sizes="100vw"
              width={tall.width}
              height={tall.height}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              className="hero-slide absolute inset-0 size-full object-cover"
              style={{ animationDelay: `${i * 6 - 1.2}s` }}
            />
          </picture>
        );
      })}
    </div>
  );
}
