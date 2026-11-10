"use client";

import { useRef } from "react";
import ButtonLink from "@/components/ButtonLink";
import LanguageLink from "@/components/LanguageLink";
import PhoneIcon from "@/components/PhoneIcon";
import type { Dictionary } from "@/content/types";
import { links, phoneFor } from "@/lib/site";

type Props = {
  dict: Dictionary;
  homeHref: string;
  // Put before the #section links: "" on the home page, the home page's address on other pages.
  sectionBase?: string;
  // The same page in the other language, when it is not the home page.
  switchHref?: string;
};

// The string of lights across the top of the menu: where each bulb sits, in % across and px down.
const BULBS = 11;
const bulbs = Array.from({ length: BULBS + 1 }, (_, i) => ({
  x: ((i / BULBS) * 96 + 2).toFixed(2),
  y: (8 + Math.sin((Math.PI * i) / BULBS) * 14).toFixed(1),
}));
const wire = `M-3 8 ${bulbs.map((b) => `L${b.x} ${b.y}`).join(" ")} L103 8`;

// Full-screen phone menu built on the native popover: opens and closes without JavaScript, closes on Esc. A neon line
// comes down the screen and meets the panel with the phone numbers rising from below; then the lights and the links
// switch on one by one (CSS in app/globals.css, .menu). The script here closes it after a link is followed, and keeps
// Tab inside it while it is open, so the keyboard never lands on the page behind.
export default function MobileMenu({ dict, homeHref, sectionBase = "", switchHref }: Props) {
  const panel = useRef<HTMLDivElement>(null);
  const { header, contact } = dict;

  function closeOnLink(event: React.MouseEvent) {
    if ((event.target as HTMLElement).closest("a")) panel.current?.hidePopover();
  }

  function keepFocusInside(event: React.KeyboardEvent) {
    if (event.key !== "Tab" || !panel.current) return;
    const stops = panel.current.querySelectorAll<HTMLElement>("a[href], button");
    const first = stops[0];
    const last = stops[stops.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
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

      <div id="mobile-menu" ref={panel} popover="auto" onClick={closeOnLink} onKeyDown={keepFocusInside} className="menu">
        <div className="menu-sheet menu-sheet-top" />
        <div className="menu-sheet menu-sheet-bottom" />
        <svg className="menu-seam" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <line x1="-2" y1="102" x2="102" y2="-2" />
        </svg>

        <div className="menu-bar wrap">
          <a href={homeHref} aria-label={header.homeLabel} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
            <img src="/logo-136.webp" alt="" width={68} height={68} className="size-17" />
          </a>
          <button
            type="button"
            popoverTarget="mobile-menu"
            popoverTargetAction="hide"
            aria-label={header.closeLabel}
            className="menu-close ml-auto grid size-11 place-items-center rounded-full border border-line text-ink"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4.5 4.5l11 11M15.5 4.5l-11 11" />
            </svg>
          </button>
        </div>

        <div className="menu-lights" aria-hidden="true">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d={wire} />
          </svg>
          {bulbs.map((b, i) => (
            <i key={b.x} style={{ left: `${b.x}%`, top: `${b.y}px`, animationDelay: `${(0.35 + i * 0.045).toFixed(2)}s` }} />
          ))}
        </div>

        <nav aria-label={header.navLabel} className="menu-links">
          {header.nav.map((item) => (
            <a key={item.id} href={`${sectionBase}#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="menu-contact">
          <p className="flex items-center justify-between gap-3 text-sm text-haze">
            {contact.directPhone}
            <LanguageLink link={header.switchLanguage} href={switchHref} className="grid h-11 min-w-12 place-items-center rounded-full border border-line px-3 text-haze no-underline" />
          </p>
          <a href={links.call} className="menu-number">
            {phoneFor(dict.locale)}
          </a>
          <div className="flex gap-2">
            <ButtonLink href={links.call} variant="neon" size="sm" className="min-h-12 flex-1 px-2">
              <PhoneIcon size={18} />
              {contact.call}
            </ButtonLink>
            <ButtonLink href={links.viber} variant="ghost" size="sm" className="min-h-12 flex-1 px-2">
              Viber
            </ButtonLink>
            <ButtonLink href={links.whatsapp} variant="ghost" size="sm" rel="noopener" className="min-h-12 flex-1 px-2">
              WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
