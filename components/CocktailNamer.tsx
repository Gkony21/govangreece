"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  cocktails: Dictionary["cocktails"];
  // The section title and text, laid out beside the name field.
  header: ReactNode;
  // One watercolour per signature cocktail, rendered on the server.
  images: ReactNode[];
};

// Slight tilts, like menu cards laid on a table.
const tilts = ["-1.5deg", "1deg", "-0.8deg", "1.6deg"];

// "Maria & Nikos" becomes three cocktails: Maria, Nikos, and Maria & Nikos. Names split on &, +, commas, "και" and "and".
// One name names one cocktail. The remaining cards keep their menu names.
function cocktailNames(value: string) {
  const all = value.trim().replace(/\s+/g, " ");
  if (!all) return [];
  const parts = all.split(/\s*[&+,]\s*|\s+(?:και|κι|and)\s+/iu).filter(Boolean);
  return (parts.length > 1 ? [...parts, all] : [all]).slice(0, tilts.length);
}

// The visitor types their names and the signature cocktails take them on.
export default function CocktailNamer({ cocktails, header, images }: Props) {
  const [value, setValue] = useState("");
  const names = cocktailNames(value);
  const [open, close] = cocktails.quotes;

  return (
    // Phones: the name field comes after the cards, so they stay in view above the keyboard while typing.
    // Wide screens: the field sits beside the title, the cards below both.
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-x-12 lg:gap-y-10">
      {header}
      <div className="order-last grid gap-2 lg:order-none">
        <label htmlFor="cocktail-names" className="text-step--1 font-bold text-amber">
          {cocktails.nameLabel}
        </label>
        <input
          id="cocktail-names"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={40}
          placeholder={cocktails.namePlaceholder}
          autoComplete="off"
          aria-describedby="cocktail-names-hint"
          className="w-full rounded-lg border border-violet bg-night px-4 py-3 text-step-1 text-ink placeholder:text-haze/60 focus:shadow-[0_0_0_3px_rgb(169_139_255/0.25)] focus:outline-none"
        />
        <p id="cocktail-names-hint" className="text-step--1 text-haze">
          {cocktails.nameHint}
        </p>
      </div>

      <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-3 pb-8 lg:col-span-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
        {cocktails.signatures.map((signature, i) => {
          const name = names[i];
          return (
            <li key={signature.name} className="cocktail-card w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto" style={{ rotate: tilts[i] }}>
              {images[i]}
              {name && <p className="mx-1 mt-3 text-xs tracking-wide text-[#5d5378] uppercase">{signature.name}</p>}
              <h3 className={`mx-1 font-display text-[1.9rem] leading-none font-extrabold [overflow-wrap:anywhere] ${name ? "mt-1 text-[#6a4bd8]" : "mt-3 text-[#2a1d44]"}`}>
                {name ? open + name + close : signature.name}
              </h3>
              <p className="mx-1 mt-2 text-step--1 text-[#5d5378]">{signature.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
