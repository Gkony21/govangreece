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
    facebook: "https://www.facebook.com/profile.php?id=61571209124874",
    tiktok: "https://www.tiktok.com/@govangreece",
  },
  // The Google Business Profile: rating and number of reviews, updated by hand when they change.
  google: {
    rating: 5,
    count: 10,
    url: "https://www.google.com/maps/place/?q=place_id:ChIJNwC17o2gp0YRExafiWn9kLk",
  },
} as const;

export const links = {
  call: `tel:${site.phone.e164}`,
  viber: `viber://chat?number=${encodeURIComponent(site.phone.e164)}`,
  whatsapp: `https://wa.me/${site.phone.e164.slice(1)}`,
  email: `mailto:${site.email}`,
} as const;

// The phone number as each language's visitors need it: Greeks dial it as is, everyone else needs the +30.
export function phoneFor(locale: string) {
  return locale === "el" ? site.phone.display : site.phone.international;
}
