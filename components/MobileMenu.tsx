"use client";

import { useRef } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  header: Dictionary["header"];
};

// Phone menu built on the native popover: opens and closes without JavaScript, closes on Esc or a tap outside.
// The one script here closes it after a link is followed.
export default function MobileMenu({ header }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const { switchLanguage } = header;

  function closeOnLink(event: React.MouseEvent) {
    if ((event.target as HTMLElement).closest("a")) panel.current?.hidePopover();
  }

  return (
    <>
      <button
        type="button"
        popoverTarget="mobile-menu"
        aria-label={header.menuLabel}
        className="grid size-11 place-items-center rounded-full border border-line text-ink lg:hidden"
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 5h14M3 10h14M3 15h14" />
        </svg>
      </button>

      <div
        id="mobile-menu"
        ref={panel}
        popover="auto"
        onClick={closeOnLink}
        className="inset-x-0 top-(--header-h) bottom-auto m-0 w-full border-b border-line bg-night-2 p-0 text-ink backdrop:bg-night/60"
      >
        <nav aria-label={header.navLabel} className="wrap grid gap-1 py-4">
          {header.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="py-3 font-display text-3xl font-extrabold no-underline">
              {item.label}
            </a>
          ))}
          <a
            href={switchLanguage.href}
            hrefLang={switchLanguage.hrefLang}
            lang={switchLanguage.hrefLang}
            aria-label={switchLanguage.ariaLabel}
            className="mt-2 justify-self-start rounded-full border border-line px-4 py-2 text-haze no-underline"
          >
            {switchLanguage.label}
          </a>
        </nav>
      </div>
    </>
  );
}
