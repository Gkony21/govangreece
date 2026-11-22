import type { CSSProperties } from "react";
import Clip from "@/components/Clip";
import CocktailNamer from "@/components/CocktailNamer";
import NeonTitle from "@/components/NeonTitle";
import Photo from "@/components/Photo";
import PickButton from "@/components/PickButton";
import type { Dictionary } from "@/content/types";

// Watercolours from the client's cocktail menu, in the order of the texts in content/.
const signatureImages = ["cocktail-signature-1", "cocktail-signature-2", "cocktail-signature-3", "cocktail-signature-4"] as const;
const classicImages = ["cocktail-margarita", "cocktail-paloma", "cocktail-mai-tai", "cocktail-mojito"] as const;

type Props = {
  dict: Dictionary;
};

// "A cocktail with your name on it": the signature cocktails as menu cards the visitor can name, then the classics.
export default function Cocktails({ dict }: Props) {
  const { cocktails } = dict;
  const van = dict.services.items.find((s) => s.id === "van")!;

  return (
    <section id="cocktails" aria-labelledby="cocktails-title" style={{ "--halo": "213 140 255" } as CSSProperties} className="border-b border-line bg-night-2 py-20 lg:py-24">
      <div className="wrap">
        <div className="mb-8 grid max-w-[46rem] gap-4">
          <h2 id="cocktails-title" data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            <NeonTitle {...dict.sections.cocktails} />
          </h2>
          <p data-reveal className="text-step-1 text-haze">
            {cocktails.lead}
          </p>
          <p data-reveal className="text-step--1 font-bold text-amber">
            {cocktails.nameHint}
          </p>
        </div>

        <CocktailNamer
          cocktails={cocktails}
          images={signatureImages.map((id) => (
            <Photo key={id} id={id} locale={dict.locale} sizes="(min-width: 1024px) 270px, 72vw" className="aspect-[4/5] w-full object-cover" />
          ))}
        />

        {/* The title sits above the list and the clip, so both start level. */}
        <h3 className="mt-8 mb-5 font-display text-step-2 leading-none font-extrabold lg:mt-12">{cocktails.classicsTitle}</h3>
        <div className="grid grid-cols-[minmax(0,1fr)_38%] gap-x-5 gap-y-6 sm:grid-cols-[minmax(0,1fr)_14rem] lg:gap-x-12">
          <ul className="grid content-start gap-4 lg:grid-cols-2 lg:gap-x-8">
            {cocktails.classics.map((classic, i) => (
              <li key={classic.name} className="flex min-w-0 items-center gap-3">
                <Photo id={classicImages[i]} locale={dict.locale} sizes="64px" className="aspect-[4/5] w-16 shrink-0 rounded-md object-cover" />
                <span className="grid min-w-0 text-step--1 text-haze">
                  <b className="text-step-0 font-normal text-ink">{classic.name}</b>
                  {classic.text}
                </span>
              </li>
            ))}
          </ul>
          <Clip id="clip-cocktails" locale={dict.locale} className="aspect-[9/16] w-full self-start rounded-md bg-night object-cover sm:row-span-2" />
          <div className="col-span-2 grid content-start gap-5 sm:col-span-1">
            <p className="text-haze">{cocktails.note}</p>
            <PickButton id="van" label={cocktails.pick} name={van.name} />
          </div>
        </div>
      </div>
    </section>
  );
}
