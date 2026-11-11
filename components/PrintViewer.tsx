"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary, Locale } from "@/content/types";
import { media } from "@/lib/media";

type Props = {
  labels: Dictionary["prints"];
  locale: Locale;
  // "link": the small violet link of the breaths. "tube": the thin neon button of the services.
  look: "link" | "tube";
  className?: string;
};

const strips = [media["print-party"], media["print-tropical"]];

// "See the prints": opens two real 5x15 prints from the Mirror Photo Booth over the page. They stay out of the page
// itself (their pastel designs clash with the night colours) and load only on the first click. A native <dialog>:
// Esc or a tap outside closes it, and focus goes back to the button.
export default function PrintViewer({ labels, locale, look, className = "" }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  // After the first click the images render; wait until they can be drawn, so the animation never runs empty.
  useEffect(() => {
    if (!armed || !row.current) return;
    const imgs = [...row.current.querySelectorAll("img")];
    // decode() can stall (a slow network, a tab in the background): never wait more than 2s for it.
    const ready = Promise.all(imgs.map((img) => img.decode().catch(() => {})));
    Promise.race([ready, new Promise((r) => setTimeout(r, 2000))]).then(show);
  }, [armed]);

  function show() {
    dialog.current?.showModal();
  }

  function open() {
    if (armed) show();
    else setArmed(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={
          look === "tube"
            ? `btn-tube min-h-11 rounded-full px-5 py-2.5 font-display text-lg leading-none font-extrabold tracking-wide ${className}`
            : `breath-link inline-flex min-h-11 items-center font-display text-[1.2rem] leading-none font-extrabold tracking-wide text-violet hover:text-neon lg:text-[1.3rem] ${className}`
        }
      >
        {labels.open}
      </button>

      <dialog
        ref={dialog}
        aria-label={labels.title}
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="lightbox prints"
      >
        <div className="grid justify-items-center gap-6">
          <div ref={row} className="prints-row">
            {armed &&
              strips.map((strip) => (
                // eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized
                <img
                  key={strip.src}
                  src={strip.src}
                  srcSet={strip.srcSet}
                  sizes="(min-width: 768px) 15rem, 42vw"
                  width={strip.width}
                  height={strip.height}
                  alt={strip.alt[locale]}
                  className="prints-strip"
                />
              ))}
          </div>
          <p className="prints-caption max-w-[30rem] text-center text-step--1 text-haze">{labels.caption}</p>
        </div>
        <button type="button" onClick={() => dialog.current?.close()} aria-label={labels.close} className="lightbox-button top-4 right-4">
          <span aria-hidden="true">✕</span>
        </button>
      </dialog>
    </>
  );
}
