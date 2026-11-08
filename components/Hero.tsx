import ButtonLink from "@/components/ButtonLink";
import FairyLights from "@/components/FairyLights";
import Photo from "@/components/Photo";
import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
};

// Photos printed like booth prints, scattered around the text (positions in app/globals.css, .hero-print-*).
// The client's photos are all portrait: as prints they show whole, where a full-screen background cropped them.
const prints = [
  { id: "hero-360", shape: "aspect-[3/4]", priority: true },
  { id: "hero-couple", shape: "aspect-[3/2]", caption: true },
  { id: "hero-friends", shape: "aspect-[3/2]" },
  { id: "hero-van", shape: "aspect-[3/4]", priority: true },
] as const;

export default function Hero({ dict }: Props) {
  const { hero } = dict;

  return (
    <section aria-labelledby="hero-title" className="hero relative isolate flex flex-col overflow-hidden border-b border-line">
      <FairyLights />

      <div className="hero-layout wrap relative flex-1 pt-8 lg:py-12">
        <h1 id="hero-title" className="neon [grid-area:title] max-w-[12ch] font-display text-step-4 leading-[0.92] font-black text-balance">
          {hero.title}
        </h1>
        <p className="[grid-area:lead] max-w-[34ch] text-step-1 text-haze">
          <strong className="font-normal text-ink">{hero.leadStrong}</strong> {hero.lead}
        </p>

        <div className="[grid-area:cta] grid content-start gap-6">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#contact">{dict.quoteCta}</ButtonLink>
            <ButtonLink href="#services" variant="ghost" className="bg-night/40 backdrop-blur-sm">
              {hero.servicesCta}
            </ButtonLink>
          </div>
          <p className="text-step--1 text-haze">{hero.area}</p>
        </div>

        <div className="hero-prints">
          {prints.map((print, i) => (
            <figure key={print.id} className={`hero-print hero-print-${print.id.slice(5)}`} style={{ animationDelay: `${0.3 + i * 0.15}s` }}>
              <Photo
                id={print.id}
                locale={dict.locale}
                sizes="(min-width: 1024px) 260px, 40vw"
                priority={"priority" in print}
                className={`${print.shape} w-full rounded-[1px] object-cover`}
              />
              {"caption" in print && (
                <figcaption lang="en" className="absolute inset-x-0 bottom-1.5 text-center font-display text-xs font-extrabold tracking-wide text-on-violet/70 lg:bottom-2.5 lg:text-sm">
                  drinks &amp; smiles
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>

      <span className="scroll-cue hidden lg:block" aria-hidden="true" />
    </section>
  );
}
