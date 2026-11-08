"use client";

import { useEffect, useState } from "react";
import ButtonLink from "@/components/ButtonLink";
import type { Dictionary } from "@/content/types";
import { usePicked } from "@/lib/package";

type Props = {
  services: Dictionary["services"];
  quoteCta: string;
};

// Slides up from the bottom of the screen once a service is picked: what is in the package, and the way to the form.
// It steps aside while the form is on screen, where the checkboxes show the same package and the bar would cover the
// button. A separate status line tells screen readers about each change, since the bar itself is hidden while empty.
export default function PackageBar({ services, quoteCta }: Props) {
  const picked = usePicked();
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const form = document.getElementById("contact");
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setAtForm(entry.isIntersecting));
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const list = services.items.filter((s) => picked.includes(s.id)).map((s) => s.name).join(", ");
  const template = picked.length === 1 ? services.bag.one : services.bag.many;
  const [before, after = ""] = template.replace("{count}", String(picked.length)).split("{list}");
  const text = picked.length ? before + list + after : "";

  return (
    <>
      <p role="status" className="sr-only">
        {text}
      </p>
      <aside aria-label={services.bag.label} data-on={(picked.length > 0 && !atForm) || undefined} className="package-bar fixed inset-x-0 bottom-0 z-30 border-t border-violet bg-night-2/95 pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-md">
        <div className="wrap flex items-center gap-4 py-3">
          <p aria-hidden="true" className="min-w-0 flex-1 text-step--1 text-haze">
            {before}
            <b className="font-normal text-ink">{list}</b>
            {after}
          </p>
          <ButtonLink href="#contact" size="sm" className="shrink-0">
            {quoteCta}
          </ButtonLink>
        </div>
      </aside>
    </>
  );
}
