// Public business details, shown on the site. Only what GO! Van already publishes
// (business card, Instagram, email signature) belongs here.

export const site = {
  name: "GO! Van",
  tagline: "drinks & smiles",
  url: "https://govangreece.gr",
  email: "govangreece@gmail.com",
  phone: {
    display: "698 784 0740",
    international: "+30 698 784 0740",
    e164: "+306987840740",
  },
  social: {
    instagram: "https://www.instagram.com/govan.official/",
    tiktok: "https://www.tiktok.com/@govangreece",
  },
} as const;

export const links = {
  call: `tel:${site.phone.e164}`,
  viber: `viber://chat?number=${encodeURIComponent(site.phone.e164)}`,
  whatsapp: `https://wa.me/${site.phone.e164.slice(1)}`,
  email: `mailto:${site.email}`,
} as const;
