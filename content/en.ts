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
    leadStrong: "Photo booth, 360 video, an audio guestbook and a cocktail bar in a VW van.",
    lead: "All from one team, for less than booking each one separately.",
    servicesCta: "See the services",
    area: "Weddings, christenings, parties and corporate events. Sparta, Laconia and all of the Peloponnese.",
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
  services: {
    lead: "Book one service or combine as many as you like. The more you book together, the better the price.",
    pick: "I want it",
    items: [
      {
        id: "mirror",
        name: "Mirror Photo Booth",
        short: "Mirror Booth",
        alias: "GO! Magic Mirror",
        text: "A mirror with a touch screen. Guests take their photos, get the print right away and download the photo with a QR code.",
        facts: ["4-hour base package", "Unlimited 5x15 prints", "Props", "Your own print design", "Attendant"],
        gift: "Gift: magnetic prints or a «Memories» photo box",
      },
      {
        id: "360",
        name: "360 Video Booth",
        short: "360 Video",
        alias: "GO! 360",
        text: "The camera circles around you and makes a slow-motion video set to the song you picked, ready to share.",
        options: [
          { title: "Classic", text: "You step onto the platform. Up to 4 people." },
          { title: "Overhead", text: "The camera circles above you. 10 or more people at once." },
        ],
        facts: ["4-hour base package", "Unlimited videos", "Your names, logo and music", "Attendant"],
      },
      {
        id: "guestbook",
        name: "Audio Guestbook",
        short: "Audio Guestbook",
        alias: "GO! Guestbook",
        text: "A vintage phone. Guests pick it up, hear your greeting and leave their wishes in their own voice.",
        facts: ["For the whole event", "No power needed", "Unlimited recordings", "Your own greeting"],
        gift: "Gift: a USB stick with all the wishes",
      },
      {
        id: "van",
        name: "Cocktail Van Bar",
        short: "Cocktail Van",
        alias: "GO! Van bar",
        text: "The VW van turns into a bar at your event, for the whole night.",
        options: [
          { title: "Full service", text: "Bartenders, ingredients and drinks from us. Cocktails with or without alcohol, as many as you like." },
          { title: "Semi service", text: "Just the van with its bar and equipment, for your own bartenders." },
        ],
        facts: ["For the whole event", "Signature cocktails named after you"],
      },
      {
        id: "bar",
        name: "Portable Bar",
        short: "Portable Bar",
        alias: "The bar without the van",
        text: "The bar with the VW front, for venues where the van can't go.",
        facts: ["For the whole event", "With or without a bartender", "We can bring the drinks too"],
      },
    ],
    bag: {
      one: "You picked: {list}. Add another for a better price.",
      many: "Your package: {list}. {count} services, one quote.",
      label: "Your package",
    },
  },
  cocktails: {
    lead: "A one-of-a-kind mix that tells your story: pick from our signature cocktails and give them your own name. At weddings couples usually pick 2 or 3.",
    nameLabel: "Name for {cocktail}",
    namePlaceholder: "Your name",
    nameHint: "✎ Tap a cocktail's name and type your own.",
    signatures: [
      { name: "Cocktail #1", text: "Gin, ginger, lime, green apple, cucumber" },
      { name: "Cocktail #2", text: "Aperol, peach, grapefruit soda, basil" },
      { name: "Cocktail #3", text: "Vodka, raspberry, bubblegum, lime" },
      { name: "Cocktail #4", text: "Rum, passion fruit or mango, caramel, lime, mint" },
    ],
    classicsTitle: "Or the classics",
    classics: [
      { name: "Margarita", text: "Tequila, lime, triple sec, salt rim" },
      { name: "Paloma", text: "Tequila, lime, grapefruit soda, salt rim" },
      { name: "Mai Tai", text: "Rum, lime, orgeat, triple sec, bitters" },
      { name: "Mojito", text: "Rum, lime, brown sugar, mint, soda" },
    ],
    note: "All of them come alcohol-free too, in whatever quantity you need. Have something else in mind? We'll make it.",
    pick: "I want cocktails at my event",
  },
  why: {
    lead: "We're the only team in Laconia that does it all.",
    stats: [
      { value: "5", label: "services" },
      { value: "1", label: "team" },
      { value: "1", label: "quote" },
    ],
    points: [
      { title: "One call for everything", text: "Booths, wishes and drinks: one conversation, one quote." },
      { title: "A better price together", text: "The more you book together, the less you pay than booking each one separately." },
      { title: "Someone at the booth", text: "A professional attendant the whole time, so you don't have to lift a finger." },
      { title: "Everything in 1–2 days", text: "Photos, videos and messages wait for you in the cloud shortly after the event." },
    ],
  },
  breaths: {
    bar: { lead: "The bar comes", neon: "to you.", link: "See the Cocktail Van" },
    memories: { lead: "Every guest leaves with a", neon: "memory.", link: "See the Magic Mirror" },
    date: { lead: "Tell us the date. We'll take care of", neon: "the rest.", link: "Ask for a quote" },
  },
  gallery: {
    lead: "From weddings, parties and openings. Tap a photo to see it larger.",
    more: "See more photos",
    instagram: "More on Instagram",
    open: "Enlarge: {alt}",
    dialogLabel: "Photos from our events",
    counter: "{n} of {total}",
    close: "Close",
    prev: "Previous photo",
    next: "Next photo",
  },
  reviews: {
    summary: "{rating} out of 5 · {count} reviews on Google",
    stars: "{n} out of 5 stars",
    all: "See all reviews on Google",
    items: [],
    note: "Reviews translated from Greek.",
  },
  about: {
    lead: "We're from Sparta, and we bring your event",
    neon: "drinks & smiles.",
    text: "Mostly weddings and christenings, but also shop openings, corporate events and parties. We arrive early, set up, and make sure everyone has a great time until we pack up.",
    areaTitle: "Where we go",
    home: "Sparta",
    areas: ["All of Laconia", "Kalamata, Tripoli, the Peloponnese", "Athens and further"],
    areaNote: "Outside the Peloponnese, by arrangement.",
  },
  faq: {
    items: [
      {
        q: "Can we book just one service?",
        a: "Of course. And when you book two or more together, the price is always better than booking them separately.",
      },
      {
        q: "How long does it last?",
        a: "The Magic Mirror and the 360 come in a 4-hour package and can stay longer if you like. The guestbook phone, the bar and the van stay for the whole event.",
      },
      {
        q: "What does the venue need?",
        a: "A power socket near where we set up, for everything except the guestbook phone. If the event is outdoors and it rains, we need an indoor or covered space.",
      },
      {
        q: "How early do you arrive?",
        a: "At least an hour before the guests, so everything is set up and ready.",
      },
      {
        q: "Can the van go indoors?",
        a: "Most indoor venues don't allow it. That's where the Portable Bar fits in, with the same VW front. How much space each one needs we'll tell you on the phone, depending on your venue.",
      },
      {
        q: "Do you make alcohol-free cocktails?",
        a: "Yes. Any cocktail you like, with or without alcohol, in whatever quantity you need.",
      },
      {
        q: "Can it have our names or our logo?",
        a: "Yes. The Magic Mirror print design and the 360 videos are made with your names, logo, colours and music. And the signature cocktails take the names you choose.",
      },
      {
        q: "When do we get the photos and videos?",
        a: "Guests get them on the spot, by QR code. You get everything together, guestbook messages included, 1–2 days after the event.",
      },
      {
        q: "Do you travel outside Laconia?",
        a: "Yes. We cover Kalamata, Tripoli and the rest of the Peloponnese, and further by arrangement.",
      },
      {
        q: "How early should we book?",
        a: "We suggest at least six months ahead. If your event is sooner, ask us: we may still be free. The date is secured with a small deposit.",
      },
    ],
    moreTitle: "Didn't find your answer?",
    moreText: "Call us on {phone}, or message us on Viber or WhatsApp.",
    call: "Call",
  },
  footer: {
    tagline: "drinks & smiles",
    socialLabel: "Social media",
  },
} satisfies Dictionary;
