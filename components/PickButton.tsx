"use client";

import type { ServiceId } from "@/content/types";
import { togglePick, usePicked } from "@/lib/package";

type Props = {
  id: ServiceId;
  label: string;
  // The service's name, for screen readers: five buttons all saying "I want it" need telling apart.
  name: string;
};

// "I want it": adds the service to the package, or takes it out again. aria-pressed carries the state.
export default function PickButton({ id, label, name }: Props) {
  const on = usePicked().includes(id);

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => togglePick(id)}
      className="btn-neon min-h-11 justify-self-start rounded-full px-5 py-2.5 font-display text-lg leading-none font-extrabold tracking-wide transition-colors"
    >
      {on && <span aria-hidden="true">✓ </span>}
      {label}
      <span className="sr-only"> {name}</span>
    </button>
  );
}
