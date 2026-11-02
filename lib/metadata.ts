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

export const viewport: Viewport = {
  themeColor: "#120c22",
};

// Runs before first paint: lets CSS hide [data-reveal] elements only when JavaScript is available.
export const jsFlagScript = "document.documentElement.classList.add('js')";
