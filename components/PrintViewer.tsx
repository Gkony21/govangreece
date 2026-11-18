"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { media } from "@/lib/media";

type Props = {
  labels: Dictionary["prints"];
  locale: Locale;
  // "link": the small violet link of the breaths. "tube": the quiet button beside "I want it" (.btn-pick).
  look: "link" | "tube";
  className?: string;
};

const designs = [
  media["print-burgundy"],
  media["print-fairies"],
  media["print-terracotta"],
  media["print-parrot"],
  media["print-glitter"],
  media["print-christmas"],
  media["print-infinity"],
  media["print-shell"],
  media["print-safari"],
  media["print-wreath"],
  media["print-rainbow"],
  media["print-olive"],
  media["print-moon"],
  media["print-heart"],
  media["print-leaf"],
];

// Temporary: the three desktop layouts to choose from (2026-11-18). A: a ribbon with arrows. B: all of them on a
// table. C: one at a time, big, the others small at its sides. Phones always get the swipeable ribbon.
const looks = ["a", "b", "c"] as const;

// "See the designs": the client's 5x15 print designs over the page. They stay out of the page itself (their pastel
// colours clash with the night) and load only on the first click. They drop from above like prints tossed on a table,
// then swipe sideways one by one. A native <dialog>: Esc or a tap outside closes it, and focus goes back to the button.
export default function PrintViewer({ labels, locale, look, className = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [armed, setArmed] = useState(false);
  const [current, setCurrent] = useState(0);
  const [edge, setEdge] = useState<"start" | "end" | null>("start");
  const [desk, setDesk] = useState<(typeof looks)[number]>("a");

  // After the first click the first few render; wait until they can be drawn, so the animation never runs empty.
  useEffect(() => {
    if (!armed || !track.current) return;
    const first = [...track.current.querySelectorAll("img")].slice(0, 5);
    // decode() can stall (a slow network, a tab in the background): never wait more than 2s for it.
    const ready = Promise.all(first.map((img) => img.decode().catch(() => {})));
    Promise.race([ready, new Promise((r) => setTimeout(r, 2000))]).then(show);
  }, [armed]);

  function show() {
    track.current?.scrollTo({ left: 0 });
    setCurrent(0);
    setEdge("start");
    dialog.current?.showModal();
  }

  function open() {
    if (armed) show();
    else setArmed(true);
  }

  // The design nearest the middle of the ribbon is the current one.
  function follow() {
    const list = track.current;
    if (!list) return;
    const middle = list.scrollLeft + list.clientWidth / 2;
    let best = 0;
    [...list.children].forEach((item, i) => {
      const el = item as HTMLElement;
      const top = list.children[best] as HTMLElement;
      if (Math.abs(el.offsetLeft + el.offsetWidth / 2 - middle) < Math.abs(top.offsetLeft + top.offsetWidth / 2 - middle)) best = i;
    });
    setCurrent(best);
    setEdge(list.scrollLeft < 2 ? "start" : list.scrollLeft + list.clientWidth > list.scrollWidth - 2 ? "end" : null);
  }

  // One design along, whatever the layout; the snapping settles it in place.
  function go(step: number) {
    const list = track.current;
    if (!list) return;
    const [a, b] = list.children as unknown as HTMLElement[];
    list.scrollBy({ left: step * (b.offsetLeft - a.offsetLeft), behavior: "smooth" });
  }

  function keys(e: KeyboardEvent) {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={
          look === "tube"
            ? `btn-pick min-h-11 rounded-full px-5 py-2.5 font-display text-lg leading-none font-extrabold tracking-wide ${className}`
            : `breath-link inline-flex min-h-11 items-center font-display text-[1.2rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon lg:text-[1.3rem] ${className}`
        }
      >
        {labels.open}
      </button>

      <dialog
        ref={dialog}
        aria-label={labels.title}
        data-desk={desk}
        onKeyDown={keys}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="lightbox prints"
      >
        <div className="prints-body">
          <ul ref={track} onScroll={follow} className="prints-track">
            {armed &&
              designs.map((design, i) => (
                <li key={design.src} className={i === current ? "is-current" : undefined} style={{ "--i": Math.min(i, 6) } as CSSProperties}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
                  <img
                    src={design.src}
                    srcSet={design.srcSet}
                    sizes="(min-width: 1024px) 20rem, 64vw"
                    width={design.width}
                    height={design.height}
                    alt={design.alt[locale]}
                    loading={i < 5 ? "eager" : "lazy"}
                    className="prints-strip"
                  />
                </li>
              ))}
          </ul>

          <div className="prints-bar">
            <button type="button" onClick={() => go(-1)} disabled={edge === "start"} aria-label={labels.prev} className="prints-arrow">
              <span aria-hidden="true">‹</span>
            </button>
            <p className="prints-count font-display text-lg font-extrabold tracking-wide" aria-live="polite">
              {labels.counter.replace("{n}", String(current + 1)).replace("{total}", String(designs.length))}
            </p>
            <button type="button" onClick={() => go(1)} disabled={edge === "end"} aria-label={labels.next} className="prints-arrow">
              <span aria-hidden="true">›</span>
            </button>
          </div>
          <p className="prints-caption mx-auto max-w-[34rem] px-4 text-center text-step--1 text-haze">{labels.caption}</p>
        </div>

        <div className="prints-switch" aria-hidden="true">
          {looks.map((l) => (
            <button key={l} type="button" tabIndex={-1} onClick={() => setDesk(l)} aria-pressed={desk === l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => dialog.current?.close()} aria-label={labels.close} className="lightbox-button top-4 right-4 z-10">
          <span aria-hidden="true">✕</span>
        </button>
      </dialog>
    </>
  );
}
