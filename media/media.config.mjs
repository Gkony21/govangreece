// Every photo and video on the site. `npm run media` turns these entries into optimized files in public/media
// and writes lib/media.ts. The originals stay outside the repo (MEDIA_SOURCE, see README).
//
// Fields:
//   id       output name, used by components
//   ref      number on the client's contact sheets (P = photo, V = video), for us
//   src      original file name in MEDIA_SOURCE (an array joins several videos into one clip)
//   dir      optional folder to read src from instead, relative to the repo (our own crops, not the client's photos)
//   region   optional part of the photo to start from, as fractions [x, y, w, h], e.g. one frame of a printed strip
//   aspect   crop ratio [w, h]; focus is the crop centre as fractions of the photo (or region) [x, y]
//   widths   output widths in px (photos)
//   blur     areas to blur, as fractions of the photo [x, y, w, h]: number plates, other businesses' signs
//   trim     [start, length] in seconds (videos)
//   consent  "none"    no recognizable person
//            "pending" a recognizable adult: fine for previews, blocks the launch until the client has permission
//            "ok"      permission given
//   Children never appear on the site, not even in previews.

const card = [4, 5];
const square = [1, 1];
const band = [3, 2];
const print = [3, 4];
const tall = [2, 3];

export const media = [
  // Hero: the van at night with guests at its bar, whole, so each screen can crop it its own way. Recognizable people.
  { id: "hero-van", ref: "P10", src: "IMG_2260.HEIC", kind: "photo", aspect: print, focus: [0.5, 0.5], widths: [480, 828, 1200, 1600], consent: "ok",
    alt: { el: "Το GO! Van ανοιχτό τη νύχτα με μωβ φώτα και καλεσμένοι στη μπάρα του", en: "The GO! Van open at night in purple light, with guests at its bar" } },

  // Cocktails: the watercolours from the client's 2026 cocktail menu, cut out of the menu's PSD at full resolution.
  ...[
    ["cocktail-signature-1", "signature-1", { el: "Ακουαρέλα: ψηλό ποτήρι με αγγούρι, πράσινο μήλο και lime", en: "Watercolour: a tall glass with cucumber, green apple and lime" }],
    ["cocktail-signature-2", "signature-2", { el: "Ακουαρέλα: κολονάτο ποτήρι με ροδάκινο και βασιλικό", en: "Watercolour: a stemmed glass with peach and basil" }],
    ["cocktail-signature-3", "signature-3", { el: "Ακουαρέλα: κολονάτο ποτήρι με ράσμπερι και lime", en: "Watercolour: a stemmed glass with raspberry and lime" }],
    ["cocktail-signature-4", "signature-4", { el: "Ακουαρέλα: κοντό ποτήρι με passion fruit και δυόσμο", en: "Watercolour: a short glass with passion fruit and mint" }],
    ["cocktail-margarita", "margarita", { el: "Ακουαρέλα: Margarita", en: "Watercolour: a Margarita" }],
    ["cocktail-paloma", "paloma", { el: "Ακουαρέλα: Paloma", en: "Watercolour: a Paloma" }],
    ["cocktail-mai-tai", "mai-tai", { el: "Ακουαρέλα: Mai Tai", en: "Watercolour: a Mai Tai" }],
    ["cocktail-mojito", "mojito", { el: "Ακουαρέλα: Mojito", en: "Watercolour: a Mojito" }],
  ].map(([id, file, alt]) => ({
    id, ref: "menu", dir: "../design/assets/hd", src: `${file}.webp`, kind: "photo",
    aspect: card, focus: [0.5, 0.5], widths: id.includes("signature") ? [400, 800] : [160, 320], quality: 80, consent: "none", alt,
  })),

  // Services: one photo each, plus short silent clips.
  { id: "service-mirror", ref: "P65", src: "IMG_3139.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.6], widths: [480, 960], consent: "none",
    alt: { el: "Το Mirror Photo Booth στημένο σε κήπο το σούρουπο", en: "The Mirror Photo Booth set up in a garden at dusk" } },
  { id: "service-360", ref: "P15", src: "IMG_3353.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.62], widths: [480, 960], consent: "none",
    alt: { el: "Η πλατφόρμα 360 σε γκαζόν δίπλα σε λίμνη", en: "The 360 platform on a lawn by a pond" } },
  // Two guests far in the background are blurred.
  { id: "service-360-overhead", ref: "P27", src: "IMG_2785.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.42], widths: [480, 960], blur: [[0.325, 0.44, 0.07, 0.085]], consent: "none",
    alt: { el: "Το Overhead 360: μαύρη αψίδα με το logo του GO! Van και κάμερα που γυρίζει από πάνω", en: "The Overhead 360: a black arch with the GO! Van logo and a camera that circles from above" } },
  { id: "service-guestbook", ref: "P46", src: "11F982D2-C9BC-425D-93E3-A8D47D3BD867.JPG", kind: "photo", aspect: card, focus: [0.5, 0.5], widths: [480, 960], consent: "none",
    alt: { el: "Το λευκό vintage τηλέφωνο ευχών", en: "The white vintage audio guestbook phone" } },
  { id: "service-van", ref: "P66", src: "IMG_3388.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.6], widths: [480, 960], consent: "none",
    alt: { el: "Το GO! Van με ανοιχτή τη μπάρα", en: "The GO! Van with its bar open" } },
  { id: "service-bar", ref: "P69", src: "IMG_9835.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.55], widths: [480, 960], consent: "none",
    alt: { el: "Η φορητή μπάρα με πρόσοψη VW και μωβ φώτα", en: "The portable bar with a VW front in purple light" } },

  { id: "clip-van", ref: "V05", src: "IMG_1635.MOV", kind: "video", trim: [5, 6], consent: "none", // starts after the number plate leaves the frame
    alt: { el: "Το van με τη μπάρα ανοιχτή, από κοντά", en: "A close look at the van with its bar open" } },
  { id: "clip-mirror", ref: "V06", src: "4f523286234648adb452931bd46dccf5.MOV", kind: "video", trim: [0, 4.3], consent: "ok", // a guest photo on the mirror's screen
    alt: { el: "Το Mirror Photo Booth σε λειτουργία", en: "The Mirror Photo Booth in action" } },
  { id: "clip-360", ref: "V11", src: "IMG_4436.MP4", kind: "video", trim: [0, 6], consent: "none",
    alt: { el: "Η πλατφόρμα 360 στημένη με θέα", en: "The 360 platform set up with a view" } },
  { id: "clip-cocktails", ref: "V13+V20", src: ["IMG_1676.MOV", "d8c1b430392c4c8d81a2fc86a0dd9128.MOV"], kind: "video", consent: "none",
    alt: { el: "Κοκτέιλ σερβίρονται στη μπάρα", en: "Cocktails being poured at the bar" } },
  { id: "clip-bar", ref: "V25", src: "IMG_2083.mov", kind: "video", trim: [0, 4.8], consent: "ok",
    alt: { el: "Η φορητή μπάρα με την πρόσοψη VW και barman πίσω της", en: "The portable bar with its VW front and a barman behind it" } },
  { id: "clip-guestbook", ref: "V12", src: "4a00da921a2c408fb6c74d80c6ca502e.MOV", kind: "video", trim: [0, 5.9], consent: "ok",
    alt: { el: "Καλεσμένη αφήνει ευχή στο τηλέφωνο", en: "A guest leaving a message on the guestbook phone" } },

  // Full-width "breathers" between sections, with parallax. On computers the photo fills one side of the screen,
  // near square: the client's photos are mostly portrait, so a wide strip cut away most of them.
  ...[
    ["break-drinks-red", "P22", "CD217B30-3E2B-44AE-BF05-BFFFC7C48A19(1).JPG", [0.5, 0.72], { el: "Η μπάρα του van με κόκκινα ποτά και κόκκινα φώτα, στην οθόνη πέφτουν ροδοπέταλα", en: "The van's bar with red drinks and red lights, rose petals falling on its screen" }],
    ["break-mirror-stone", "P77", "IMG_0556.JPG", [0.42, 0.55], { el: "Το Mirror Photo Booth με κόκκινο χαλί και χρυσά κολωνάκια μπροστά σε πέτρινο τοίχο, δίπλα το τραπέζι με τα props", en: "The Mirror Photo Booth with a red carpet and gold posts by a stone wall, the props table beside it" }],
    ["break-van-night", "P83", "IMG_4292.HEIC", [0.6, 0.5], { el: "Η μπάρα του van με κόκκινα και μωβ φώτα τη νύχτα", en: "The van's bar in red and purple light at night" }],
  ].flatMap(([id, ref, src, focus, alt, consent = "none"]) => [
    { id, ref, src, kind: "photo", aspect: square, focus, widths: [900, 1400, 1800], quality: 68, consent, alt },
    // The same photo cut tall for phones, where the breath covers most of the screen.
    { id: `${id}-tall`, ref, src, kind: "photo", aspect: tall, focus, widths: [640, 1080], quality: 68, consent,
      alt: { el: "", en: "" } }, // the computer entry's alt is used: the two are one picture
  ]),

  // Gallery: moments with people first (the site sells the night, not the equipment). The largest size is for the lightbox.
  // The "frame-*" sources are single frames from the client's videos, kept in design/assets.
  ...[
    ["gallery-moment-green", "P84", "IMG_3493.HEIC", undefined, [0.5, 0.52], "ok", { el: "Ο barman σερβίρει καλεσμένο στο van με πράσινα φώτα", en: "The barman serving a guest at the van in green light" }],
    ["gallery-moment-cheers", "P14", "IMG_3111.JPG", undefined, [0.62, 0.45], "none", { el: "Χαμογελαστός καλεσμένος σηκώνει το ποτήρι του δίπλα στο van", en: "A smiling guest raising a glass beside the van" }],
    ["gallery-360-night", "P12", "IMG_0211.HEIC", undefined, [0.5, 0.6], "none", { el: "Το 360 Video Booth τη νύχτα, με μπλε φώτα και τα props σε βαλίτσα με neon επιγραφή", en: "The 360 Video Booth at night in blue light, with the props in a suitcase with a neon sign" }],
    ["gallery-phone-mirror", "P13", "IMG_9631.HEIC", undefined, [0.5, 0.6], "none", { el: "Το vintage τηλέφωνο ευχών με λουλούδια και καθρέφτη υποδοχής, με θέα τον κάμπο", en: "The vintage guestbook phone with flowers and a welcome mirror, overlooking the valley" }, [[0.595, 0.265, 0.22, 0.055]]],
  ].map(([id, ref, src, dir, focus, consent, alt, blur, region]) => ({ id, ref, src, ...(dir && { dir }), ...(blur && { blur }), ...(region && { region }), kind: "photo", aspect: card, focus, widths: [400, 800, 1080], consent, alt })),

  // Printed 5x15 strips from the Mirror Photo Booth, shown on request (components/PrintViewer.tsx). The print has two
  // identical columns: region keeps the left one. The child's name and the date are painted over with made-up ones
  // (design/assets/print-*-clean.jpg).
  { id: "print-party", ref: "print", src: "print-party-clean.jpg", dir: "../design/assets", kind: "photo", region: [0.015, 0, 0.49, 1], aspect: [588, 1800], focus: [0.5, 0.5], widths: [400, 700], consent: "ok",
    alt: { el: "Εκτύπωση 5x15 με τρεις λήψεις μιας παρέας με ροζ καπέλο και ντισκομπάλα, σε ροζ σχέδιο με ουράνιο τόξο", en: "A 5x15 print: three shots of friends with a pink hat and a disco ball, in a pink rainbow design" } },
  { id: "print-tropical", ref: "print", src: "print-tropical-clean.jpg", dir: "../design/assets", kind: "photo", region: [0.015, 0, 0.49, 1], aspect: [588, 1800], focus: [0.5, 0.5], widths: [400, 700], consent: "ok",
    alt: { el: "Εκτύπωση 5x15 με τρεις λήψεις ενός ζευγαριού μπροστά σε πέτρινο τοίχο, σε τροπικό σχέδιο με παπαγάλους", en: "A 5x15 print: three shots of a couple by a stone wall, in a tropical design with parrots" } },

  // Short loops straight from the booth, kept at their full width. "family" shows the client's own family, children
  // included: the one exception to "no children", decided by the developer on 2026-11-09.
  { id: "gallery-clip-friends", ref: "booth", src: "gallery-clip-friends.mp4", dir: "../design/assets", kind: "video", trim: [0, 6.5], videoWidth: 720, consent: "none",
    alt: { el: "Παρέα ποζάρει στο booth με ροζ καπέλο και ντισκομπάλα", en: "Friends posing at the booth with a pink hat and a disco ball" } },
  { id: "gallery-clip-family", ref: "booth", src: "gallery-clip-family.mp4", dir: "../design/assets", kind: "video", trim: [0, 6.5], videoWidth: 720, consent: "none",
    alt: { el: "Οικογένεια ποζάρει στο booth με γυαλιά και props", en: "A family posing at the booth with party glasses and props" } },

  { id: "gallery-moment-wedding", ref: "V32", src: "frame-wedding.jpg", dir: "../design/assets", kind: "photo", aspect: band, focus: [0.5, 0.7], widths: [600, 1080], consent: "none",
    alt: { el: "Γάμος κάτω από τα φωτάκια το σούρουπο", en: "A wedding under string lights at dusk" } },
  { id: "gallery-van-crowd", ref: "P86", src: "IMG_3262(1).JPG", kind: "photo", aspect: band, focus: [0.5, 0.45], widths: [600, 1200, 1800], region: [0.115, 0, 0.885, 1], blur: [[0.47, 0.105, 0.095, 0.095], [0.47, 0.33, 0.06, 0.066]], consent: "none",
    alt: { el: "Καλεσμένοι γύρω από το van σε γλέντι", en: "Guests gathered around the van at a party" } },
];
