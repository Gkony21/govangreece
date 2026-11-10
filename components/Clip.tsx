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

// A short silent loop. Its poster frame and then the video start downloading as it comes near (so the first load of
// the page carries none of them), and it plays only while on screen. It never plays with "reduce motion" on: then the
// poster frame stays as a still photo.
export default function Clip({ id, locale, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const clip = media[id];
  // next dev runs no Functions, so there the clips come straight from public/media (functions/video/[name].ts).
  const src = process.env.NODE_ENV === "development" ? clip.src.replace("/video/", "/media/") : clip.src;

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The poster well ahead; the video itself (a few hundred KB) only just before it shows, so a visitor who never
    // scrolls that far never downloads it.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.poster = clip.poster;
        near.disconnect();
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(video);
    if (still) return () => near.disconnect();

    const closer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        video.preload = "auto";
        closer.disconnect();
      },
      { rootMargin: "200px 0px" },
    );
    closer.observe(video);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => {
      near.disconnect();
      closer.disconnect();
      observer.disconnect();
    };
  }, [clip.poster]);

  return (
    <video
      ref={ref}
      src={src}
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
