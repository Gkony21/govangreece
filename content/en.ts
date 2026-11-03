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
  footer: {
    tagline: "drinks & smiles",
    socialLabel: "Social media",
  },
} satisfies Dictionary;
