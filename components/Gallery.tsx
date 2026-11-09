import type { CSSProperties } from "react";
import Clip from "@/components/Clip";
import GalleryGrid from "@/components/GalleryGrid";
import NeonTitle from "@/components/NeonTitle";
import Photo from "@/components/Photo";
import type { Dictionary } from "@/content/types";
import { media } from "@/lib/media";
import { site } from "@/lib/site";

// In grid order. One big scene across the top, then four columns from tablets up: the wide one takes two of them.
// A "clip" is a short silent loop in place of a photo.
const photos = [
  { id: "gallery-van-crowd", feature: true },
  { clip: "gallery-clip-friends", wide: true },
  { id: "gallery-moment-green" },
  { id: "gallery-moment-cheers" },
  { clip: "gallery-clip-family" },
  { id: "gallery-moment-wedding" },
  { id: "gallery-360-night" },
  { id: "gallery-phone-mirror" },
] as const;

type Props = {
  dict: Dictionary;
};

// Photos from events. Each opens larger in a lightbox (components/GalleryGrid.tsx).
export default function Gallery({ dict }: Props) {
  const { gallery } = dict;

  return (
    <section id="gallery" aria-labelledby="gallery-title" style={{ "--halo": "213 140 255" } as CSSProperties} className="border-b border-line py-20 lg:py-24">
      <div className="wrap">
        <div className="mb-10 grid max-w-[46rem] gap-4">
          <h2 id="gallery-title" data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            <NeonTitle {...dict.sections.gallery} />
          </h2>
          <p data-reveal className="text-step-1 text-haze">
            {gallery.lead}
          </p>
        </div>

        <GalleryGrid
          labels={gallery}
          items={photos.map((photo) => {
            const wide = "wide" in photo;
            const feature = "feature" in photo;
            if ("clip" in photo) {
              return { wide, feature, thumb: <Clip id={photo.clip} locale={dict.locale} className="absolute inset-0 size-full object-cover" /> };
            }
            const { id } = photo;
            const { src, srcSet, width, height, alt } = media[id];
            return {
              wide,
              feature,
              full: { src, srcSet, width, height, alt: alt[dict.locale] },
              thumb: (
                <Photo
                  id={id}
                  locale={dict.locale}
                  sizes={feature ? "(min-width: 1240px) 1200px, 100vw" : wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              ),
            };
          })}
        />

        <a
          href={site.social.instagram}
          className="mt-8 inline-flex items-center gap-2 font-display text-xl font-extrabold tracking-wide text-violet hover:text-neon"
        >
          {gallery.instagram}
        </a>
      </div>
    </section>
  );
}
