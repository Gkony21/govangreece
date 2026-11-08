"use client";

import { useId, useState, type ReactNode } from "react";

type Props = {
  label: string;
  children: ReactNode;
};

// What a service includes. Always on show on computers; on phones it opens with a tap (.service-details in
// app/globals.css), and without JavaScript it simply stays open.
export default function ServiceDetails({ label, children }: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <button type="button" className="service-more" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span aria-hidden="true" className="service-more-mark">
          +
        </span>
        {label}
      </button>
      <div id={id} className="service-details grid gap-5" data-open={open || undefined}>
        {children}
      </div>
    </>
  );
}
