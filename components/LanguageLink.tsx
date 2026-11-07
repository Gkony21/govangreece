"use client";

import type { MouseEvent } from "react";
import type { Dictionary } from "@/content/types";

type Props = {
  link: Dictionary["header"]["switchLanguage"];
  // The same page in the other language, when it is not the home page (the privacy policy).
  href?: string;
  className?: string;
};

// The language switch. It leads to the same page in the other language and, on the home page, to the section being
// read: someone halfway down the questions lands on the questions, not back at the top. Without JavaScript it is a
// plain link to the page.
export default function LanguageLink({ link, href = link.href, className }: Props) {
  function keepSection(event: MouseEvent<HTMLAnchorElement>) {
    // The section whose top has passed the upper third of the screen last.
    const line = window.innerHeight / 3;
    let current: string | undefined;
    for (const section of document.querySelectorAll<HTMLElement>("main section[id]")) {
      if (section.getBoundingClientRect().top <= line) current = section.id;
    }
    // Set every time: after "back", the link may still hold the section of an earlier click.
    event.currentTarget.href = current ? `${href}#${current}` : href;
  }

  return (
    <a href={href} hrefLang={link.hrefLang} lang={link.hrefLang} aria-label={link.ariaLabel} onClick={keepSection} className={className}>
      {link.label}
    </a>
  );
}
