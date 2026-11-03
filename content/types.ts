// Every piece of text on the site lives in content/el.ts and content/en.ts.
// Both must satisfy this type, so a missing translation fails the build instead of shipping an empty spot.

export type Locale = "el" | "en";

// Page sections in order. The ids are the #anchors in the URL, shared by both languages.
export const sectionIds = ["services", "cocktails", "why", "gallery", "reviews", "about", "faq", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

// The full-width photos between sections ("breaths"), each with a line of text.
export type BreathId = "bar" | "memories" | "date";

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
    // Screen-reader label of each card's name field; {cocktail} becomes its menu name.
    nameLabel: string;
    namePlaceholder: string;
    nameHint: string;
    // Name and ingredients, in the order of the watercolours. Signatures first: the visitor names those.
    signatures: { name: string; text: string }[];
    classicsTitle: string;
    classics: { name: string; text: string }[];
    note: string;
    pick: string;
  };
  why: {
    lead: string;
    // Big numbers beside the points: 5 services, 1 team, 1 quote.
    stats: { value: string; label: string }[];
    points: { title: string; text: string }[];
  };
  // Lines over the full-width photos between sections. The neon words end the line and glow on computers;
  // link: a small link under the line, on computers.
  breaths: Record<BreathId, { lead: string; neon: string; link: string }>;
  gallery: {
    lead: string;
    // Phones show the first photos only; this button shows the rest.
    more: string;
    instagram: string;
    // Lightbox: {alt} is the photo's description; {n} and {total} its place in the gallery.
    open: string;
    dialogLabel: string;
    counter: string;
    close: string;
    prev: string;
    next: string;
  };
  reviews: {
    // {rating} and {count} come from lib/site.ts (google), updated by hand.
    summary: string;
    // Screen-reader label of a row of stars; {n} becomes the number of stars.
    stars: string;
    all: string;
    // Real Google reviews only, picked by hand: first name and initial of the surname, as Google shows them.
    // On the English page the text is our translation, and note says so.
    items: { name: string; text: string; event: string }[];
    note?: string;
  };
  about: {
    // The neon words end the line and glow on computers.
    lead: string;
    neon: string;
    text: string;
    // Where we go, from home outwards: rings around Sparta.
    areaTitle: string;
    home: string;
    areas: string[];
    areaNote: string;
  };
  faq: {
    items: { q: string; a: string }[];
    // Under the questions: call or message us. {phone} becomes the phone number, as a link.
    moreTitle: string;
    moreText: string;
    call: string;
  };
  footer: {
    tagline: string;
    socialLabel: string;
  };
};
