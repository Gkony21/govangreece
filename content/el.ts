import type { Dictionary } from "./types";

// Greek text. Draft copy from design concept v3: the client's corrections replace it as they arrive.
export const el = {
  locale: "el",
  meta: {
    title: "GO! Van | 360 Video Booth, Mirror Booth & Cocktail Van στη Λακωνία",
    description:
      "360 Video Booth, Mirror Photo Booth, Audio Guestbook και Cocktail Van Bar για γάμους, βαφτίσεις και events στη Λακωνία.",
    ogLocale: "el_GR",
  },
  skipToContent: "Μετάβαση στο περιεχόμενο",
  quoteCta: "Ζητήστε προσφορά",
  header: {
    homeLabel: "GO! Van, αρχή",
    navLabel: "Ενότητες",
    nav: [
      { id: "services", label: "Υπηρεσίες" },
      { id: "cocktails", label: "Κοκτέιλ" },
      { id: "gallery", label: "Γκαλερί" },
      { id: "faq", label: "Ερωτήσεις" },
    ],
    menuLabel: "Μενού",
    switchLanguage: { label: "EN", href: "/en", ariaLabel: "English version", hrefLang: "en" },
  },
  hero: {
    title: "Έχεις event στη Λακωνία;",
  },
  sections: {
    services: { title: "Διάλεξε τι θέλεις στο event σου" },
    cocktails: { title: "Το κοκτέιλ με το όνομά σας" },
    why: { title: "Γιατί GO! Van" },
    gallery: { title: "Από τα events μας" },
    reviews: { title: "Τι λένε στη Google" },
    about: { title: "Λίγα λόγια για εμάς" },
    faq: { title: "Συχνές ερωτήσεις" },
    contact: { title: "Πείτε μας για το event σας" },
  },
  footer: {
    tagline: "drinks & smiles",
    socialLabel: "Social media",
  },
} satisfies Dictionary;
