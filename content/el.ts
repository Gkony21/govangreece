import type { Dictionary } from "./types";

// Greek text. Draft copy written by us: the client's own texts replace it as they arrive.
// The reader is addressed in the plural (σας, Ζητήστε), except the client's own slogans, like the hero title.
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
    leadStrong: "Photo booth, 360 video, τηλέφωνο για ευχές και cocktail bar σε VW van.",
    lead: "Όλα από μία ομάδα, σε καλύτερη τιμή από το να τα κλείσετε χωριστά.",
    servicesCta: "Δείτε τις υπηρεσίες",
    area: "Γάμοι, βαφτίσεις, πάρτι και εταιρικά. Σπάρτη, Λακωνία και όλη η Πελοπόννησος.",
  },
  sections: {
    services: { title: "Διαλέξτε τι θέλετε στο event σας" },
    cocktails: { title: "Το κοκτέιλ με το όνομά σας" },
    why: { title: "Γιατί GO! Van" },
    gallery: { title: "Από τα events μας" },
    reviews: { title: "Τι λένε στη Google" },
    about: { title: "Λίγα λόγια για εμάς" },
    faq: { title: "Συχνές ερωτήσεις" },
    contact: { title: "Πείτε μας για το event σας" },
  },
  services: {
    lead: "Πάρτε μία υπηρεσία ή συνδυάστε όσες θέλετε. Όσο περισσότερες μαζί, τόσο καλύτερη η τιμή.",
    pick: "Το θέλω",
    items: [
      {
        id: "mirror",
        name: "Mirror Photo Booth",
        short: "Mirror Booth",
        alias: "GO! Magic Mirror",
        text: "Ένας καθρέφτης με οθόνη αφής. Οι καλεσμένοι φωτογραφίζονται, παίρνουν αμέσως την εκτύπωση και κατεβάζουν τη φωτογραφία με QR.",
        facts: ["Βασικό πακέτο 4 ωρών", "Απεριόριστες εκτυπώσεις 5x15", "Props", "Δικό σας σχέδιο εκτύπωσης", "Χειριστής"],
        gift: "Δώρο: μαγνητικές εκτυπώσεις ή κουτί «Memories»",
      },
      {
        id: "360",
        name: "360 Video Booth",
        short: "360 Video",
        alias: "GO! 360",
        text: "Η κάμερα γυρίζει γύρω σας και βγαίνει slow-motion βίντεο με το τραγούδι που διαλέξατε, έτοιμο να το στείλετε.",
        options: [
          { title: "Classic", text: "Ανεβαίνετε στην πλατφόρμα. Έως 4 άτομα." },
          { title: "Overhead", text: "Η κάμερα γυρίζει από πάνω σας. 10 και παραπάνω άτομα μαζί." },
        ],
        facts: ["Βασικό πακέτο 4 ωρών", "Απεριόριστα βίντεο", "Ονόματα, logo και μουσική σας", "Χειριστής"],
      },
      {
        id: "guestbook",
        name: "Audio Guestbook",
        short: "Audio Guestbook",
        alias: "GO! Guestbook",
        text: "Ένα vintage τηλέφωνο. Οι καλεσμένοι το σηκώνουν, ακούνε το μήνυμά σας και αφήνουν τις ευχές τους με τη φωνή τους.",
        facts: ["Για όλο το event", "Δεν θέλει ρεύμα", "Απεριόριστες ηχογραφήσεις", "Δικό σας μήνυμα υποδοχής"],
        gift: "Δώρο: USB με όλες τις ευχές",
      },
      {
        id: "van",
        name: "Cocktail Van Bar",
        short: "Cocktail Van",
        alias: "GO! Van bar",
        text: "Το VW van γίνεται μπαρ μέσα στο event σας, για όλη τη βραδιά.",
        options: [
          { title: "Full service", text: "Barmen, υλικά και ποτά από εμάς. Κοκτέιλ με ή χωρίς αλκοόλ, όσα θέλετε." },
          { title: "Semi service", text: "Μόνο το van με τη μπάρα και τον εξοπλισμό, για τους δικούς σας barmen." },
        ],
        facts: ["Για όλο το event", "Signature κοκτέιλ με τα ονόματά σας"],
      },
      {
        id: "bar",
        name: "Portable Bar",
        short: "Portable Bar",
        alias: "Μπάρα χωρίς το van",
        text: "Η μπάρα με την πρόσοψη του VW, για χώρους όπου δεν μπαίνει το van.",
        facts: ["Για όλο το event", "Με ή χωρίς barman", "Φέρνουμε και ποτά, αν θέλετε"],
      },
    ],
    bag: {
      one: "Διαλέξατε: {list}. Προσθέστε κι άλλη για καλύτερη τιμή.",
      many: "Το πακέτο σας: {list}. {count} υπηρεσίες, μία προσφορά.",
      label: "Το πακέτο σας",
    },
  },
  cocktails: {
    lead: "Ένα μοναδικό μείγμα που αφηγείται τη δική σας ιστορία: διαλέξτε από τα signature κοκτέιλ μας και δώστε τους το δικό σας όνομα. Στους γάμους συνήθως επιλέγονται 2 με 3.",
    nameLabel: "Όνομα για το {cocktail}",
    namePlaceholder: "Το όνομά σας",
    nameHint: "✎ Πατήστε πάνω στο όνομα κάθε κοκτέιλ και γράψτε το δικό σας.",
    signatures: [
      { name: "Cocktail #1", text: "Τζιν, τζίντζερ, lime, πράσινο μήλο, αγγούρι" },
      { name: "Cocktail #2", text: "Aperol, ροδάκινο, σόδα γκρέιπφρουτ, βασιλικός" },
      { name: "Cocktail #3", text: "Βότκα, ράσμπερι, τσιχλόφουσκα, lime" },
      { name: "Cocktail #4", text: "Ρούμι, passion fruit ή μάνγκο, καραμέλα, lime, δυόσμος" },
    ],
    classicsTitle: "Ή τα κλασικά",
    classics: [
      { name: "Margarita", text: "Τεκίλα, lime, triple sec, αλάτι στο ποτήρι" },
      { name: "Paloma", text: "Τεκίλα, lime, σόδα γκρέιπφρουτ, αλάτι στο ποτήρι" },
      { name: "Mai Tai", text: "Ρούμι, lime, σιρόπι πικραμύγδαλο, triple sec, bitters" },
      { name: "Mojito", text: "Ρούμι, lime, μαύρη ζάχαρη, δυόσμος, σόδα" },
    ],
    note: "Όλα γίνονται και χωρίς αλκοόλ, σε όση ποσότητα θέλετε. Αν έχετε κάτι άλλο στο μυαλό σας, το φτιάχνουμε.",
    pick: "Θέλω κοκτέιλ στο event",
  },
  why: {
    lead: "Είμαστε οι μόνοι στη Λακωνία που τα κάνουμε όλα μαζί.",
    stats: [
      { value: "5", label: "υπηρεσίες" },
      { value: "1", label: "ομάδα" },
      { value: "1", label: "προσφορά" },
    ],
    points: [
      { title: "Ένα τηλέφωνο για όλα", text: "Booths, ευχές και ποτό, με μία συνεννόηση και μία προσφορά." },
      {
        title: "Καλύτερη τιμή στο πακέτο",
        text: "Όσο περισσότερα παίρνετε μαζί, τόσο λιγότερα πληρώνετε από το να τα κλείσετε χωριστά.",
      },
      { title: "Άνθρωπος δίπλα στο booth", text: "Επαγγελματίας χειριστής σε όλη τη διάρκεια, για να μην ασχοληθείτε εσείς." },
      { title: "Όλο το υλικό σε 1–2 μέρες", text: "Φωτογραφίες, βίντεο και ευχές σας περιμένουν στο cloud λίγο μετά το event." },
    ],
  },
  breaths: {
    bar: "Το μπαρ έρχεται σε εσάς.",
    memories: "Κάθε καλεσμένος φεύγει με μια ανάμνηση.",
    date: "Πείτε μας την ημερομηνία. Τα υπόλοιπα τα αναλαμβάνουμε.",
  },
  gallery: {
    lead: "Από γάμους, πάρτι και εγκαίνια. Πατήστε σε μια φωτογραφία για να τη δείτε μεγάλη.",
    more: "Δείτε κι άλλες φωτογραφίες",
    instagram: "Περισσότερα στο Instagram",
    open: "Μεγέθυνση: {alt}",
    dialogLabel: "Φωτογραφίες από τα events μας",
    counter: "{n} από {total}",
    close: "Κλείσιμο",
    prev: "Προηγούμενη φωτογραφία",
    next: "Επόμενη φωτογραφία",
  },
  footer: {
    tagline: "drinks & smiles",
    socialLabel: "Social media",
  },
} satisfies Dictionary;
