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

      {/* Phones: title and text across, then the buttons with the strip beside them, all on the photo in one screen.
          Wide screens: text on the left, a bigger strip on the right. */}
      <div className="wrap relative grid grid-cols-[minmax(0,1fr)_auto] items-end gap-x-4 gap-y-6 py-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:items-center lg:gap-x-12 lg:py-16">
        <div className="col-span-2 grid gap-6 lg:col-span-1 lg:self-end">
          <h1 id="hero-title" className="neon max-w-[12ch] font-display text-step-4 leading-[0.92] font-black text-balance">
            {hero.title}
          </h1>
          <p className="max-w-[34ch] text-step-1 text-haze [text-shadow:0_1px_14px_rgb(18_12_34/0.9)]">
            <strong className="font-normal text-ink">{hero.leadStrong}</strong> {hero.lead}
          </p>
        </div>

        <div className="grid gap-6 lg:self-start">
          <div className="flex flex-col items-start gap-3 lg:flex-row lg:flex-wrap">
            <ButtonLink href="#contact">{dict.quoteCta}</ButtonLink>
            <ButtonLink href="#services" variant="ghost" className="bg-night/40 backdrop-blur-sm">
              {hero.servicesCta}
            </ButtonLink>
          </div>
          <p className="text-step--1 text-haze [text-shadow:0_1px_10px_rgb(18_12_34/0.9)]">{hero.area}</p>
        </div>

        <figure
          aria-label={hero.stripLabel}
          className="hero-strip mr-1 grid w-[clamp(104px,30vw,140px)] gap-1.5 self-end bg-[#fbf8ff] p-1.5 pb-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mr-0 lg:w-[240px] lg:gap-2 lg:self-center lg:justify-self-center lg:p-2.5 lg:pb-0"
        >
          <p lang="en" className="pt-0.5 text-center font-display text-[0.7rem] leading-none font-extrabold tracking-wide text-on-violet/80 lg:pt-1 lg:text-lg">
            drinks &amp; smiles
          </p>
          {stripFrames.map((id) => (
            <Photo key={id} id={id} locale={dict.locale} sizes="(min-width: 1024px) 240px, 140px" className="aspect-[3/2] w-full rounded-[2px] object-cover" />
          ))}
          <figcaption className="grid place-items-center py-1 lg:py-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
            <img src="/logo-112.webp" alt="GO! Van" width={56} height={56} className="size-7 invert brightness-[0.25] lg:size-12" />
          </figcaption>
        </figure>
      </div>

      <span className="scroll-cue hidden lg:block" aria-hidden="true" />
    </section>
  );
}

// Crossfading photos behind the hero, with a slow zoom. Decorative: the text carries the meaning, so alt is empty.
// Phones in portrait get the tall crop, everything else the wide one. Only the first photo loads with high priority.
function HeroSlides() {
  return (
    <div className="hero-slides absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
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
