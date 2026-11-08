import type { Metadata, Viewport } from "next";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

// The picture shown when a link to the site is shared (Viber, WhatsApp, Facebook...): public/og.jpg, 1200x630,
// the logo, three booth prints and the party around them, the same for both languages (npm run og, scripts/og.mjs).
export const shareImage = { url: "/og.jpg", width: 1200, height: 630, alt: "GO! Van, drinks & smiles" };

// Shared <head> data for both languages. `path` is this language's home page.
export function pageMetadata(dict: Dictionary, path: string): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: path,
      languages: { el: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      locale: dict.meta.ogLocale,
      url: path,
      siteName: site.name,
      title: dict.meta.title,
      description: dict.meta.description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", images: [shareImage.url] },
  };
}

// The privacy policy, in either language: its own title and address, and hreflang to the other language's page.
export function privacyMetadata(dict: Dictionary, text: { title: string; intro: string }, path: string): Metadata {
  const title = `${text.title} · ${site.name}`;
  return {
    title,
    description: text.intro,
    alternates: {
      canonical: path,
      languages: { el: "/privacy", en: "/en/privacy", "x-default": "/privacy" },
    },
    openGraph: {
      type: "website",
      locale: dict.meta.ogLocale,
      url: path,
      siteName: site.name,
      title,
      description: text.intro,
      images: [shareImage],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#120c22",
};

// Runs before first paint: lets CSS hide [data-reveal] elements only when JavaScript is available.
export const jsFlagScript =
  "var d=document.documentElement;d.classList.add('js');try{var n=performance.getEntriesByType('navigation')[0];" +
  // The hero's lights come on only for someone arriving from elsewhere: not on a reload, "back", or a link within the site.
  "if(n&&n.type==='navigate'&&document.referrer.indexOf(location.origin)!==0)d.classList.add('hero-intro')}catch(e){}";
