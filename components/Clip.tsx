"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/content/types";
import { media, type MediaId } from "@/lib/media";

type ClipId = { [K in MediaId]: (typeof media)[K]["kind"] extends "video" ? K : never }[MediaId];

type Props = {
  id: ClipId;
  locale: Locale;
  className?: string;
};

// A short silent loop. It downloads and plays only while on screen, and never plays with "reduce motion" on:
// then the poster frame stays as a still photo.
export default function Clip({ id, locale, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const clip = media[id];
  // next dev runs no Functions, so there the clips come straight from public/media (functions/video/[name].ts).
  const src = process.env.NODE_ENV === "development" ? clip.src.replace("/video/", "/media/") : clip.src;

  useEffect(() => {
    const video = ref.current;
    if (!video || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={clip.poster}
      width={clip.width}
      height={clip.height}
      aria-label={clip.alt[locale]}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
