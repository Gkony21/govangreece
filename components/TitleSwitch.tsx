"use client";

import { useEffect, useState } from "react";

const looks = ["a", "b", "c"] as const;
type Look = (typeof looks)[number];

// TEMPORARY, for choosing a look with the client: a small A / B / C switch in the corner that changes how the hero
// title looks (html[data-title] in globals.css). ?title=b opens on B. Goes away once one is picked.
export default function TitleSwitch() {
  const [look, setLook] = useState<Look>(() => {
    if (typeof location === "undefined") return "a";
    const asked = new URLSearchParams(location.search).get("title");
    return looks.includes(asked as Look) ? (asked as Look) : "a";
  });

  useEffect(() => {
    document.documentElement.dataset.title = look;
  }, [look]);

  return (
    <div className="fixed top-20 right-3 z-50 flex gap-1 rounded-full border border-line bg-night-2/95 p-1 text-sm shadow-lg">
      {looks.map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={look === l}
          onClick={() => setLook(l)}
          className={`size-9 rounded-full font-bold uppercase ${look === l ? "bg-amber text-night" : "text-haze"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
