import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

type Props = {
  dict: Dictionary;
  // This language's home page, e.g. "/" or "/en".
  path: string;
};

// The business for search engines (schema.org JSON-LD), in the page's language. A service-area business: no street
// address, since there is no shop, but the areas it serves, in the order the client gave. No prices and no rating:
// Google ignores ratings a business publishes about itself, and the reviews live on the Google Business Profile.
export default function BusinessJsonLd({ dict, path }: Props) {
  const el = dict.locale === "el";
  const url = new URL(path, site.url).href;
  const place = (type: string, name: string) => ({ "@type": type, name });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: ["el", "en"],
      },
      {
        "@type": ["LocalBusiness", "EntertainmentBusiness"],
        "@id": `${site.url}/#business`,
        name: site.name,
        slogan: site.tagline,
        description: dict.meta.description,
        url,
        logo: `${site.url}/logo.webp`,
        image: `${site.url}/og.jpg`,
        telephone: site.phone.e164,
        email: site.email,
        areaServed: [
          place("City", el ? "Σπάρτη" : "Sparta"),
          place("AdministrativeArea", el ? "Λακωνία" : "Laconia"),
          place("City", el ? "Καλαμάτα" : "Kalamata"),
          place("City", el ? "Τρίπολη" : "Tripoli"),
          place("AdministrativeArea", el ? "Πελοπόννησος" : "Peloponnese"),
          place("Country", el ? "Ελλάδα" : "Greece"),
        ],
        sameAs: [site.social.instagram, site.social.tiktok, site.google.url],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: dict.sections.services.title,
          itemListElement: dict.services.items.map((service) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: service.name, alternateName: service.alias, description: service.text },
          })),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // < escaped, so no text in it can close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
