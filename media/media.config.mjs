// Every photo and video on the site. `npm run media` turns these entries into optimized files in public/media
// and writes lib/media.ts. The originals stay outside the repo (MEDIA_SOURCE, see README).
//
// Fields:
//   id       output name, used by components
//   ref      number on the client's contact sheets (P = photo, V = video), for us
//   src      original file name in MEDIA_SOURCE (an array joins several videos into one clip)
//   aspect   crop ratio [w, h]; focus is the crop centre as fractions of the photo [x, y]
//   widths   output widths in px (photos)
//   blur     areas to blur, as fractions of the photo [x, y, w, h]: number plates, other businesses' signs
//   trim     [start, length] in seconds (videos)
//   consent  "none"    no recognizable person
//            "pending" a recognizable adult: fine for previews, blocks the launch until the client has permission
//            "ok"      permission given
//   Children never appear on the site, not even in previews.

const wide = [16, 9];
const tall = [9, 16];
const card = [4, 5];
const square = [1, 1];
const band = [3, 2];

export const media = [
  // Hero: crossfading backgrounds. Each photo has a wide crop (desktop) and a tall crop (phones).
  ...[
    {
      id: "hero-van-night",
      ref: "P10",
      src: "IMG_2260.HEIC",
      wideFocus: [0.5, 0.62],
      tallFocus: [0.42, 0.5],
      // The wide crop shows two guests at the bar.
      wideConsent: "pending",
      alt: { el: "Το GO! Van με μωβ φώτα σε βραδινό event", en: "The GO! Van lit in purple at a night event" },
    },
    {
      id: "hero-360-fireworks",
      ref: "P28",
      src: "IMG_0241.HEIC",
      wideFocus: [0.5, 0.45],
      tallFocus: [0.5, 0.5],
      alt: { el: "Η πλατφόρμα 360 σε κήπο, με πυροτεχνήματα από πάνω", en: "The 360 platform in a garden under fireworks" },
    },
    {
      id: "hero-mirror-night",
      ref: "P41",
      src: "IMG_9933.HEIC",
      wideFocus: [0.5, 0.55],
      tallFocus: [0.35, 0.5],
      alt: { el: "Ο Magic Mirror με κόκκινο χαλί σε βραδινό event", en: "The Magic Mirror with a red carpet at a night event" },
    },
    {
      id: "hero-van-sunset",
      ref: "P82",
      src: "IMG_2799.heic",
      wideFocus: [0.5, 0.55],
      tallFocus: [0.3, 0.5],
      alt: { el: "Το GO! Van στο ηλιοβασίλεμα", en: "The GO! Van at sunset" },
    },
  ].flatMap(({ wideFocus, tallFocus, wideConsent = "none", ...photo }) => [
    { ...photo, id: `${photo.id}-wide`, kind: "photo", aspect: wide, focus: wideFocus, widths: [1280, 1920, 2560], quality: 68, consent: wideConsent },
    { ...photo, id: `${photo.id}-tall`, kind: "photo", aspect: tall, focus: tallFocus, widths: [720, 1080], quality: 68, consent: "none" },
  ]),

  // Hero: the three frames of the 5x15 photo strip.
  { id: "strip-van", ref: "P74", src: "IMG_2411.HEIC", kind: "photo", aspect: square, focus: [0.5, 0.5], widths: [240, 480], consent: "none",
    alt: { el: "Το van με μωβ φώτα", en: "The van in purple light" } },
  { id: "strip-360", ref: "P21", src: "IMG_0208.HEIC", kind: "photo", aspect: square, focus: [0.5, 0.62], widths: [240, 480], consent: "none",
    alt: { el: "Η πλατφόρμα 360 με μπλε φως", en: "The 360 platform glowing blue" } },
  { id: "strip-phone", ref: "P35", src: "att.brXHUtjq7bwr0TVSAFEAq3_d_ERfvU1kVN9FJFbWOK0.JPG", kind: "photo", aspect: square, focus: [0.5, 0.58], widths: [240, 480], consent: "none",
    alt: { el: "Το vintage τηλέφωνο ευχών", en: "The vintage guestbook phone" } },

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

  // Full-width "breathers" between sections, with parallax.
  { id: "break-fireworks", ref: "P49", src: "IMG_2711.HEIC", kind: "photo", aspect: band, focus: [0.5, 0.35], widths: [960, 1600, 2400], quality: 68, consent: "none",
    alt: { el: "Πυροτεχνήματα πάνω από γάμο δίπλα σε πισίνα", en: "Fireworks over a poolside wedding" } },
  { id: "break-venue", ref: "P29", src: "IMG_2244.HEIC", kind: "photo", aspect: band, focus: [0.5, 0.55], widths: [960, 1600, 2400], quality: 68, consent: "none",
    alt: { el: "Η πλατφόρμα 360 στημένη σε κτήμα γάμου το σούρουπο", en: "The 360 platform at a wedding venue at dusk" } },
  { id: "break-van-night", ref: "P83", src: "IMG_4292.HEIC", kind: "photo", aspect: band, focus: [0.5, 0.5], widths: [960, 1600, 2400], quality: 68, consent: "none",
    alt: { el: "Η μπάρα του van με κόκκινα και μωβ φώτα τη νύχτα", en: "The van's bar in red and purple light at night" } },

  // Gallery.
  ...[
    ["gallery-360-terrace", "P03", "IMG_2246.HEIC", [0.5, 0.55], { el: "Η πλατφόρμα 360 σε ταράτσα κτήματος", en: "The 360 platform on a venue terrace" }],
    ["gallery-360-night", "P12", "IMG_0211.HEIC", [0.5, 0.6], { el: "Η πλατφόρμα 360 σε κήπο τη νύχτα", en: "The 360 platform in a garden at night" }],
    ["gallery-van-bar-red", "P22", "CD217B30-3E2B-44AE-BF05-BFFFC7C48A19.JPG", [0.5, 0.5], { el: "Η μπάρα του van με κόκκινα φώτα", en: "The van's bar in red light" }],
    ["gallery-phone-stone", "P26", "IMG_9700.HEIC", [0.5, 0.5], { el: "Το τηλέφωνο ευχών σε πέτρινο χώρο", en: "The guestbook phone in a stone-walled room" }],
    ["gallery-mirror-garden", "P30", "IMG_9867.HEIC", [0.5, 0.55], { el: "Ο Magic Mirror και props σε κήπο τη νύχτα", en: "The Magic Mirror and props in a garden at night" }],
    ["gallery-mirror-xmas", "P40", "CAE23400-BE20-4EA9-B1B2-BED35120FF13.JPG", [0.5, 0.55], { el: "Ο Magic Mirror δίπλα σε χριστουγεννιάτικο δέντρο", en: "The Magic Mirror next to a Christmas tree" }],
    ["gallery-360-props", "P42", "69D13F77-71F3-4C48-B8F7-9E3BF11A7A86.JPG", [0.5, 0.6], { el: "Η πλατφόρμα 360 με props τη νύχτα", en: "The 360 platform with props at night" }],
    ["gallery-van-purple", "P51", "IMG_4288.HEIC", [0.5, 0.55], { el: "Το GO! Van με μωβ φώτα", en: "The GO! Van in purple light" }],
    ["gallery-360-heart", "P55", "IMG_9642.HEIC", [0.5, 0.6], { el: "Η πλατφόρμα 360 με φωτεινή καρδιά", en: "The 360 platform with a neon heart" }],
    ["gallery-phone-gold", "P71", "IMG_0550.JPG", [0.5, 0.55], { el: "Το τηλέφωνο ευχών με χρυσές λεπτομέρειες", en: "The guestbook phone with gold details" }],
    ["gallery-phone-flowers", "P76", "IMG_2447.HEIC", [0.5, 0.6], { el: "Το τηλέφωνο ευχών ανάμεσα σε λουλούδια", en: "The guestbook phone among flowers" }],
    ["gallery-props", "P50", "IMG_0287.HEIC", [0.5, 0.6], { el: "Βαλίτσα με props για τις φωτογραφίες", en: "A suitcase full of photo props" }],
  ].map(([id, ref, src, focus, alt]) => ({ id, ref, src, kind: "photo", aspect: card, focus, widths: [400, 800], consent: "none", alt })),

  { id: "gallery-van-dusk", ref: "P63", src: "IMG_2800.heic", kind: "photo", aspect: square, focus: [0.5, 0.35], widths: [400, 800], consent: "none",
    // Square crop from the top keeps the number plate out of the frame.
    alt: { el: "Το GO! Van στο σούρουπο με τα βουνά πίσω", en: "The GO! Van at dusk with the mountains behind" } },
  { id: "gallery-mirror-stone", ref: "P77", src: "IMG_0556.JPG", kind: "photo", aspect: band, focus: [0.5, 0.5], widths: [600, 1200], consent: "none",
    alt: { el: "Ο Magic Mirror μπροστά σε πέτρινο σπίτι", en: "The Magic Mirror in front of a stone house" } },
  { id: "gallery-van-crowd", ref: "P38", src: "IMG_3261.JPG", kind: "photo", aspect: band, focus: [0.5, 0.5], widths: [600, 1200], consent: "pending",
    alt: { el: "Καλεσμένοι γύρω από το van σε γλέντι", en: "Guests gathered around the van at a party" } },
];
