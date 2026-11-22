import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// sitemap.xml: every page, with its other-language twin. Built once, as a static file.
export const dynamic = "force-static";

const pairs = [
  { el: "/", en: "/en", priority: 1 },
  { el: "/privacy", en: "/en/privacy", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, site.url).href;
  return pairs.flatMap(({ el, en, priority }) => {
    const languages = { el: url(el), en: url(en) };
    return [
      { url: url(el), priority, alternates: { languages } },
      { url: url(en), priority: priority * 0.8, alternates: { languages } },
    ];
  });
}
