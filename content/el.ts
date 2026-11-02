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
    leadStrong: "Photo booth, 360 video, τηλέφωνο για ευχές και cocktail bar σε VW van.",
    lead: "Όλα από μία ομάδα, σε καλύτερη τιμή από το να τα κλείσεις χωριστά.",
    servicesCta: "Δείτε τις υπηρεσίες",
    area: "Γάμοι, βαφτίσεις, πάρτι και εταιρικά. Σπάρτη, Λακωνία και όλη η Πελοπόννησος.",
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
  services: {
    lead: "Πάρε μία υπηρεσία ή συνδύασε όσες θέλεις. Όσο περισσότερες μαζί, τόσο καλύτερη η τιμή.",
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
      one: "Διάλεξες: {list}. Πρόσθεσε κι άλλη για καλύτερη τιμή.",
      many: "Το πακέτο σου: {list}. {count} υπηρεσίες, μία προσφορά.",
      label: "Το πακέτο σου",
    },
  },
  footer: {
    tagline: "drinks & smiles",
    socialLabel: "Social media",
  },
} satisfies Dictionary;
