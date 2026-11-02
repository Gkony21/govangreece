// Every piece of text on the site lives in content/el.ts and content/en.ts.
// Both must satisfy this type, so a missing translation fails the build instead of shipping an empty spot.

export type Locale = "el" | "en";

// Page sections in order. The ids are the #anchors in the URL, shared by both languages.
export const sectionIds = ["services", "cocktails", "why", "gallery", "reviews", "about", "faq", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

export type Dictionary = {
  locale: Locale;
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  skipToContent: string;
  quoteCta: string;
  header: {
    homeLabel: string;
    navLabel: string;
    nav: { id: SectionId; label: string }[];
    menuLabel: string;
    // Link to the same page in the other language.
    switchLanguage: { label: string; href: string; ariaLabel: string; hrefLang: Locale };
  };
  hero: {
    title: string;
  };
  sections: Record<SectionId, { title: string }>;
  footer: {
    tagline: string;
    socialLabel: string;
  };
};
