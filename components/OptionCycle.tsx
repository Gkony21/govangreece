"use client";

import { useEffect, useRef } from "react";

const everyMs = 4500;

// Takes the two versions of a service in turns, by setting data-option on its scene (CSS in globals.css), only while the
// scene is on screen. With reduced motion nothing changes by itself: the second photo stays, since the clip shows the first.
export default function OptionCycle() {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const scene = marker.current?.closest("li");
    if (!scene) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scene.dataset.option = "1";
      return;
    }

    let timer: number | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer);
      if (entry.isIntersecting) {
        timer = window.setInterval(() => {
          scene.dataset.option = scene.dataset.option === "1" ? "0" : "1";
        }, everyMs);
      }
    });
    observer.observe(scene);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, []);

  return <span ref={marker} hidden />;
}
