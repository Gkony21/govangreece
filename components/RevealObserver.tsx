"use client";

import { useEffect } from "react";

// Marks [data-reveal] elements with data-in the first time they scroll into view; CSS in globals.css does the motion.
// Mounted once per page. It sets data-reveal-ready on <html> so the CSS failsafe stands down.
export default function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );

    items.forEach((el) => observer.observe(el));
    root.setAttribute("data-reveal-ready", "");
    return () => observer.disconnect();
  }, []);

  return null;
}
