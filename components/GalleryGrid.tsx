"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { Dictionary } from "@/content/types";

type Item = {
  // Landscape photo: two columns wide.
  wide: boolean;
  // The thumbnail, rendered on the server.
  thumb: ReactNode;
  // The large version for the lightbox.
  full: { src: string; srcSet: string; width: number; height: number; alt: string };
};

type Props = {
  items: Item[];
  labels: Dictionary["gallery"];
};

// Phones show this many photos until "See more": the full gallery is a long scroll on a narrow screen.
const phoneFirst = 6;

// The smallest finger movement, in px, that counts as a swipe.
const swipe = 50;

// The gallery grid and its lightbox. The lightbox is a native <dialog>: focus stays inside, Esc closes it, and
// focus returns to the photo that opened it. Arrows or a sideways swipe move through the photos; a swipe down or
// a tap outside the photo closes it.
export default function GalleryGrid({ items, labels }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const current = items[index].full;

  function open(i: number) {
    setIndex(i);
    dialog.current?.showModal();
  }

  function step(by: number) {
    setIndex((i) => (i + by + items.length) % items.length);
  }

  function onPointerDown(e: PointerEvent) {
    start.current = { x: e.clientX, y: e.clientY };
    swiped.current = false;
  }

  function onPointerUp(e: PointerEvent) {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    start.current = null;
    if (Math.abs(dx) > swipe && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      step(dx < 0 ? 1 : -1);
    } else if (dy > swipe && dy > Math.abs(dx)) {
      swiped.current = true;
      dialog.current?.close();
    }
  }

  return (
    <>
      <ul className="grid grid-flow-dense grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
        {items.map((item, i) => (
          <li
            key={item.full.src}
            data-reveal
            style={{ transitionDelay: `${(i % 4) * 0.07}s` }}
            className={`relative overflow-hidden rounded-md bg-night-2 ${item.wide ? "col-span-2 aspect-[8/5] md:aspect-auto" : "aspect-[4/5]"} ${!showAll && i >= phoneFirst ? "max-md:hidden" : ""}`}
          >
            <button
              type="button"
              onClick={() => open(i)}
              aria-label={labels.open.replace("{alt}", item.full.alt)}
              className="group absolute inset-0 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-amber"
            >
              {item.thumb}
            </button>
          </li>
        ))}
      </ul>

      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-5 w-full rounded-full border border-line px-5 py-3 font-display text-lg leading-none font-extrabold tracking-wide hover:border-violet md:hidden"
        >
          {labels.more} <span className="text-haze">(+{items.length - phoneFirst})</span>
        </button>
      )}

      <dialog
        ref={dialog}
        aria-label={labels.dialogLabel}
        className="lightbox"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (start.current = null)}
        onClick={(e) => {
          // A tap on the dark area around the photo closes; the end of a swipe doesn't.
          if (e.target === e.currentTarget && !swiped.current) dialog.current?.close();
        }}
      >
        <figure className="grid justify-items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export: the files are already resized by scripts/media.mjs */}
          <img
            key={current.src}
            src={current.src}
            srcSet={current.srcSet}
            sizes="(min-width: 1024px) 80vw, 100vw"
            width={current.width}
            height={current.height}
            alt={current.alt}
            className="lightbox-photo"
          />
          <figcaption className="text-center text-step--1 text-haze">
            {current.alt}
            <span className="ml-2 text-ink">
              {labels.counter.replace("{n}", String(index + 1)).replace("{total}", String(items.length))}
            </span>
          </figcaption>
        </figure>

        <button type="button" onClick={() => dialog.current?.close()} aria-label={labels.close} className="lightbox-button top-4 right-4">
          <span aria-hidden="true">✕</span>
        </button>
        <button type="button" onClick={() => step(-1)} aria-label={labels.prev} className="lightbox-button top-1/2 left-3 -translate-y-1/2">
          <span aria-hidden="true">‹</span>
        </button>
        <button type="button" onClick={() => step(1)} aria-label={labels.next} className="lightbox-button top-1/2 right-3 -translate-y-1/2">
          <span aria-hidden="true">›</span>
        </button>
      </dialog>
    </>
  );
}
