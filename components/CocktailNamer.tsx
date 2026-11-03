"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  cocktails: Dictionary["cocktails"];
  // One watercolour per signature cocktail, rendered on the server.
  images: ReactNode[];
};

// Slight tilts, like menu cards laid on a table.
const tilts = ["-1.5deg", "1deg", "-0.8deg", "1.6deg"];

// The signature cocktails as menu cards. Each card's title is a text field: the visitor types a name and the cocktail
// takes it on. On phones the field sits inside the card, so the card stays in view above the keyboard.
// The condensed display face fits about 20 letters across a card; longer names drop to a smaller size.
export default function CocktailNamer({ cocktails, images }: Props) {
  const [names, setNames] = useState(() => cocktails.signatures.map(() => ""));

  return (
    <ul className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-3 pb-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
      {cocktails.signatures.map((signature, i) => (
        <li key={signature.name} className="cocktail-card w-[72%] shrink-0 snap-start sm:w-[44%] lg:w-auto" style={{ rotate: tilts[i] }}>
          {images[i]}
          <p className="mx-1 mt-3 flex justify-between gap-2 text-xs tracking-wide text-[#5d5378] uppercase">
            {signature.name}
            <span aria-hidden="true">✎</span>
          </p>
          <input
            value={names[i]}
            onChange={(e) => setNames((all) => all.map((name, j) => (j === i ? e.target.value : name)))}
            maxLength={26}
            placeholder={cocktails.namePlaceholder}
            autoComplete="off"
            aria-label={cocktails.nameLabel.replace("{cocktail}", signature.name)}
            className={`mt-1 h-12 w-full border-b border-dashed border-[#2a1d44]/30 bg-transparent px-1 font-display leading-tight font-extrabold text-[#6a4bd8] placeholder:text-[#2a1d44]/35 focus:border-solid focus:border-[#6a4bd8] focus:outline-none ${names[i].length > 16 ? "text-[1.45rem]" : "text-[1.9rem]"}`}
          />
          <p className="mx-1 mt-2 text-step--1 text-[#5d5378]">{signature.text}</p>
        </li>
      ))}
    </ul>
  );
}
