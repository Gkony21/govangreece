import type { Metadata, Viewport } from "next";
import type { Dictionary } from "@/content/types";
import { site } from "@/lib/site";

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
    },
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
    openGraph: { type: "website", locale: dict.meta.ogLocale, url: path, siteName: site.name, title, description: text.intro },
  };
}

export const viewport: Viewport = {
  themeColor: "#120c22",
};

// Runs before first paint: lets CSS hide [data-reveal] elements only when JavaScript is available.
export const jsFlagScript = "document.documentElement.classList.add('js')";
