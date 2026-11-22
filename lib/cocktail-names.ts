"use client";

import { useSyncExternalStore } from "react";

// The names the visitor gave the signature cocktails, by cocktail. Shared by the menu cards and the quote form, which
// adds them to the message. Kept in memory: it only has to last until the form is sent.
type Names = Readonly<Record<string, string>>;

let names: Names = {};
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setCocktailName(cocktail: string, name: string) {
  names = { ...names, [cocktail]: name };
  listeners.forEach((listener) => listener());
}

const none: Names = {};

export function useCocktailNames() {
  return useSyncExternalStore(subscribe, () => names, () => none);
}
