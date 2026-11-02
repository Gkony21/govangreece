import type { Locale } from "@/content/types";
import { media, type MediaId } from "@/lib/media";

type PhotoId = { [K in MediaId]: (typeof media)[K]["kind"] extends "photo" ? K : never }[MediaId];

type Props = {
  id: PhotoId;
  locale: Locale;
  // Rendered width, for the browser to pick a file from srcSet, e.g. "(min-width: 1024px) 33vw, 100vw".
  sizes: string;
  className?: string;
  // Above the fold: load right away instead of lazily.
  priority?: boolean;
};

// A photo from lib/media.ts in the right size for the screen. Width and height are set so the page doesn't jump.
export default function Photo({ id, locale, sizes, className, priority = false }: Props) {
  const photo = media[id];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export: the files are already resized by scripts/media.mjs
    <img
      src={photo.src}
      srcSet={photo.srcSet}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt[locale]}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
