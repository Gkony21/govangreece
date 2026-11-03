"use client";

import { useEffect } from "react";

// Parallax for the breath photos in browsers without CSS scroll timelines (Firefox, for now). The others run it
// in CSS (globals.css), off the main thread. Same motion: 8% of the photo's height either way.
export default function ParallaxFallback() {
  useEffect(() => {
    if (CSS.supports("animation-timeline: view()") || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const photos = [...document.querySelectorAll<HTMLElement>(".breath-photo")];
    let frame = 0;

    function update() {
      frame = 0;
      const height = innerHeight;
      for (const photo of photos) {
        const box = photo.closest(".breath")!.getBoundingClientRect();
        if (box.bottom < 0 || box.top > height) continue;
        // 0 → 1 while the breath crosses the screen.
        const progress = (height - box.top) / (height + box.height);
        photo.style.translate = `0 ${((progress - 0.5) * 16).toFixed(2)}%`;
      }
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
