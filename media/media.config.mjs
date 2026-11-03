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
  // Hero: photos printed like booth prints, scattered around the text. The client's photos are all portrait, so as a
  // full-screen background they always lost a third or more; as prints they show whole.
  { id: "hero-van", ref: "P74", src: "IMG_2411.HEIC", kind: "photo", aspect: print, focus: [0.5, 0.5], widths: [320, 640], consent: "none",
    alt: { el: "Το GO! Van με μωβ φώτα τη νύχτα", en: "The GO! Van in purple light at night" } },
  { id: "hero-360", ref: "P55", src: "IMG_9642.HEIC", kind: "photo", aspect: print, focus: [0.4, 0.5], widths: [320, 640], consent: "none",
    alt: { el: "Η πλατφόρμα 360 με μια φωτεινή καρδιά τη νύχτα", en: "The 360 platform with a neon heart at night" } },
  // Two frames of the client's own 5x15 print of one wedding (P01), landscape like the real print. Recognizable people.
  ...[
    ["hero-couple", [0.316, 0.722, 0.37, 0.201], [0.5, 0.5], { el: "Νύφη και γαμπρός με καπέλα από τα props", en: "A bride and groom in hats from the props" }],
    ["hero-friends", [0.01, 0.38, 0.26, 0.2], [0.5, 0.45], { el: "Φίλοι με γυαλιά και πινακίδες από τα props", en: "Friends posing with glasses and signs from the props" }],
  ].map(([id, region, focus, alt]) => ({
    id, ref: "P01", src: "att.tUQ0oIDTb6SQKmDbcXStPjgOO44DNr42bWWrkqTr3IU.JPG", kind: "photo",
    region, aspect: band, focus, widths: [320, 640], consent: "pending", alt,
  })),

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
    alt: { el: "Ο Magic Mirror στημένος σε κήπο το σούρουπο", en: "The Magic Mirror set up in a garden at dusk" } },
  { id: "service-360", ref: "P15", src: "IMG_3353.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.62], widths: [480, 960], consent: "none",
    alt: { el: "Η πλατφόρμα 360 σε γκαζόν δίπλα σε λίμνη", en: "The 360 platform on a lawn by a pond" } },
  { id: "service-guestbook", ref: "P46", src: "11F982D2-C9BC-425D-93E3-A8D47D3BD867.JPG", kind: "photo", aspect: card, focus: [0.5, 0.5], widths: [480, 960], consent: "none",
    alt: { el: "Το λευκό vintage τηλέφωνο ευχών", en: "The white vintage audio guestbook phone" } },
  { id: "service-van", ref: "P66", src: "IMG_3388.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.6], widths: [480, 960], consent: "none",
    alt: { el: "Το GO! Van με ανοιχτή τη μπάρα", en: "The GO! Van with its bar open" } },
  { id: "service-bar", ref: "P69", src: "IMG_9835.HEIC", kind: "photo", aspect: card, focus: [0.5, 0.55], widths: [480, 960], consent: "none",
    alt: { el: "Η φορητή μπάρα με πρόσοψη VW και μωβ φώτα", en: "The portable bar with a VW front in purple light" } },

  { id: "clip-van", ref: "V05", src: "IMG_1635.MOV", kind: "video", trim: [5, 6], consent: "none", // starts after the number plate leaves the frame
    alt: { el: "Το van με τη μπάρα ανοιχτή, από κοντά", en: "A close look at the van with its bar open" } },
  { id: "clip-mirror", ref: "V06", src: "4f523286234648adb452931bd46dccf5.MOV", kind: "video", trim: [0, 4.3], consent: "pending", // a guest photo on the mirror's screen
    alt: { el: "Ο Magic Mirror σε λειτουργία", en: "The Magic Mirror in action" } },
  { id: "clip-360", ref: "V11", src: "IMG_4436.MP4", kind: "video", trim: [0, 6], consent: "none",
    alt: { el: "Η πλατφόρμα 360 στημένη με θέα", en: "The 360 platform set up with a view" } },
  { id: "clip-cocktails", ref: "V13+V20", src: ["IMG_1676.MOV", "d8c1b430392c4c8d81a2fc86a0dd9128.MOV"], kind: "video", consent: "none",
    alt: { el: "Κοκτέιλ σερβίρονται στη μπάρα", en: "Cocktails being poured at the bar" } },
  { id: "clip-guestbook", ref: "V12", src: "4a00da921a2c408fb6c74d80c6ca502e.MOV", kind: "video", trim: [0, 5.9], consent: "pending",
    alt: { el: "Καλεσμένη αφήνει ευχή στο τηλέφωνο", en: "A guest leaving a message on the guestbook phone" } },

  // Full-width "breathers" between sections, with parallax. On computers the photo fills one side of the screen,
  // near square: the client's photos are mostly portrait, so a wide strip cut away most of them.
  ...[
    ["break-van-sunset", "P82", "IMG_2799.heic", [0.5, 0.6], { el: "Το GO! Van στο ηλιοβασίλεμα", en: "The GO! Van at sunset" }],
    ["break-360-fireworks", "P28", "IMG_0241.HEIC", [0.5, 0.52], { el: "Η πλατφόρμα 360 με πράσινα φώτα και πυροτεχνήματα τη νύχτα", en: "The 360 platform glowing green under fireworks at night" }],
    ["break-van-night", "P83", "IMG_4292.HEIC", [0.6, 0.5], { el: "Η μπάρα του van με κόκκινα και μωβ φώτα τη νύχτα", en: "The van's bar in red and purple light at night" }],
  ].flatMap(([id, ref, src, focus, alt]) => [
    { id, ref, src, kind: "photo", aspect: square, focus, widths: [900, 1400, 1800], quality: 68, consent: "none", alt },
    // The same photo cut tall for phones, where the breath covers most of the screen.
    { id: `${id}-tall`, ref, src, kind: "photo", aspect: tall, focus, widths: [640, 1080], quality: 68, consent: "none",
      alt: { el: "", en: "" } }, // the computer entry's alt is used: the two are one picture
  ]),

  // Gallery. The largest size is for the lightbox.
  ...[
    ["gallery-360-terrace", "P03", "IMG_2246.HEIC", [0.5, 0.55], { el: "Η πλατφόρμα 360 σε ταράτσα κτήματος", en: "The 360 platform on a venue terrace" }],
    ["gallery-360-night", "P12", "IMG_0211.HEIC", [0.5, 0.6], { el: "Η πλατφόρμα 360 σε κήπο τη νύχτα", en: "The 360 platform in a garden at night" }],
    ["gallery-van-bar-red", "P22", "CD217B30-3E2B-44AE-BF05-BFFFC7C48A19.JPG", [0.5, 0.5], { el: "Η μπάρα του van με κόκκινα φώτα", en: "The van's bar in red light" }],
    ["gallery-phone-stone", "P26", "IMG_9700.HEIC", [0.5, 0.5], { el: "Το τηλέφωνο ευχών σε πέτρινο χώρο", en: "The guestbook phone in a stone-walled room" }],
    ["gallery-mirror-garden", "P30", "IMG_9867.HEIC", [0.5, 0.55], { el: "Ο Magic Mirror και props σε κήπο τη νύχτα", en: "The Magic Mirror and props in a garden at night" }],
    ["gallery-mirror-xmas", "P40", "CAE23400-BE20-4EA9-B1B2-BED35120FF13.JPG", [0.5, 0.55], { el: "Ο Magic Mirror δίπλα σε χριστουγεννιάτικο δέντρο", en: "The Magic Mirror next to a Christmas tree" }],
    ["gallery-360-props", "P42", "69D13F77-71F3-4C48-B8F7-9E3BF11A7A86.JPG", [0.5, 0.6], { el: "Η πλατφόρμα 360 με props τη νύχτα", en: "The 360 platform with props at night" }],
    ["gallery-van-neon", "P59", "IMG_4291.HEIC", [0.5, 0.55], { el: "Το GO! Van με κόκκινα και μπλε φώτα", en: "The GO! Van in red and blue light" }],
    ["gallery-props-neon", "P80", "IMG_0209.HEIC", [0.5, 0.6], { el: "Props και φωτεινή επιγραφή «Let's Party» τη νύχτα", en: "Props and a \"Let's Party\" neon sign at night" }],
    ["gallery-phone-gold", "P71", "IMG_0550.JPG", [0.5, 0.55], { el: "Το τηλέφωνο ευχών με χρυσές λεπτομέρειες", en: "The guestbook phone with gold details" }],
    ["gallery-phone-flowers", "P76", "IMG_2447.HEIC", [0.5, 0.6], { el: "Το τηλέφωνο ευχών ανάμεσα σε λουλούδια", en: "The guestbook phone among flowers" }],
  ].map(([id, ref, src, focus, alt]) => ({ id, ref, src, kind: "photo", aspect: card, focus, widths: [400, 800, 1200], consent: "none", alt })),

  { id: "gallery-van-dusk", ref: "P63", src: "IMG_2800.heic", kind: "photo", aspect: square, focus: [0.5, 0.35], widths: [400, 800, 1200], consent: "none",
    // Square crop from the top keeps the number plate out of the frame.
    alt: { el: "Το GO! Van στο σούρουπο με τα βουνά πίσω", en: "The GO! Van at dusk with the mountains behind" } },
  { id: "gallery-mirror-stone", ref: "P77", src: "IMG_0556.JPG", kind: "photo", aspect: band, focus: [0.5, 0.5], widths: [600, 1200, 1800], consent: "none",
    alt: { el: "Ο Magic Mirror μπροστά σε πέτρινο σπίτι", en: "The Magic Mirror in front of a stone house" } },
  { id: "gallery-van-crowd", ref: "P38", src: "IMG_3261.JPG", kind: "photo", aspect: band, focus: [0.5, 0.5], widths: [600, 1200, 1800], consent: "pending",
    alt: { el: "Καλεσμένοι γύρω από το van σε γλέντι", en: "Guests gathered around the van at a party" } },
];
