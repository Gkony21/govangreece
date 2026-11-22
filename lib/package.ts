"use client";

import { useSyncExternalStore } from "react";
import type { ServiceId } from "@/content/types";

// The visitor's package: the services picked with "I want it". Shared by the service buttons, the bar at the bottom
// of the screen and the quote form's checkboxes. Kept in memory: it only has to last until the form is sent.
let picked: readonly ServiceId[] = [];
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function togglePick(id: ServiceId) {
  picked = picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id];
  listeners.forEach((listener) => listener());
}

// The form's "all of them" box: every service, or none.
export function setPicked(ids: readonly ServiceId[]) {
  picked = ids;
  listeners.forEach((listener) => listener());
}

const none: readonly ServiceId[] = [];

export function usePicked() {
  return useSyncExternalStore(subscribe, () => picked, () => none);
}
