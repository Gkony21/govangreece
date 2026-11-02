import type { Dictionary } from "./types";

// English text. Written by us (adapted from the Greek), not supplied by the client.
export const en = {
  locale: "en",
  meta: {
    title: "GO! Van | 360 Video Booth, Mirror Booth & Cocktail Van in Laconia, Greece",
    description:
      "360 Video Booth, Mirror Photo Booth, Audio Guestbook and a Cocktail Van Bar for weddings, christenings and events in Laconia, Greece.",
    ogLocale: "en_US",
  },
  skipToContent: "Skip to content",
  quoteCta: "Get a quote",
  header: {
    homeLabel: "GO! Van, home",
    navLabel: "Sections",
    nav: [
      { id: "services", label: "Services" },
      { id: "cocktails", label: "Cocktails" },
      { id: "gallery", label: "Gallery" },
      { id: "faq", label: "FAQ" },
    ],
    menuLabel: "Menu",
    switchLanguage: { label: "ΕΛ", href: "/", ariaLabel: "Ελληνική έκδοση", hrefLang: "el" },
  },
  hero: {
    title: "Planning an event in Laconia?",
  },
  sections: {
    services: { title: "Pick what you want at your event" },
    cocktails: { title: "A cocktail with your name on it" },
    why: { title: "Why GO! Van" },
    gallery: { title: "From our events" },
    reviews: { title: "What people say on Google" },
    about: { title: "About us" },
    faq: { title: "Frequently asked questions" },
    contact: { title: "Tell us about your event" },
  },
  footer: {
    tagline: "drinks & smiles",
    socialLabel: "Social media",
  },
} satisfies Dictionary;
