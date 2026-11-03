// Every piece of text on the site lives in content/el.ts and content/en.ts.
// Both must satisfy this type, so a missing translation fails the build instead of shipping an empty spot.

export type Locale = "el" | "en";

// Page sections in order. The ids are the #anchors in the URL, shared by both languages.
export const sectionIds = ["services", "cocktails", "why", "gallery", "reviews", "about", "faq", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

// The five services, in menu order. Also the values of the quote form's checkboxes.
export const serviceIds = ["mirror", "360", "guestbook", "van", "bar"] as const;
export type ServiceId = (typeof serviceIds)[number];

type Service = {
  id: ServiceId;
  name: string;
  // Short name, for the band under the hero and the package bar.
  short: string;
  // The client's own product name, shown small under the name.
  alias: string;
  text: string;
  // Two ways to book it, side by side (360 classic or overhead, van full or semi service).
  options?: { title: string; text: string }[];
  facts: string[];
  gift?: string;
};

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
    // Shown bold, then the rest of the sentence in a lighter colour.
    leadStrong: string;
    lead: string;
    servicesCta: string;
    area: string;
  };
  sections: Record<SectionId, { title: string }>;
  services: {
    lead: string;
    pick: string;
    items: Service[];
    // The bar at the bottom of the screen once something is picked. {list} becomes the picked names, {count} how many.
    bag: { one: string; many: string; label: string };
  };
  cocktails: {
    lead: string;
    nameLabel: string;
    namePlaceholder: string;
    nameHint: string;
    // Quote marks around a cocktail named by the visitor: «» in Greek, “” in English.
    quotes: [string, string];
    // Name and ingredients, in the order of the watercolours. Signatures first: the visitor names those.
    signatures: { name: string; text: string }[];
    classicsTitle: string;
    classics: { name: string; text: string }[];
    note: string;
    pick: string;
  };
  footer: {
    tagline: string;
    socialLabel: string;
  };
};
