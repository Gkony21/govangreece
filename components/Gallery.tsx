import GalleryGrid from "@/components/GalleryGrid";
import Photo from "@/components/Photo";
import type { Dictionary } from "@/content/types";
import { media } from "@/lib/media";
import { site } from "@/lib/site";

// In grid order. Four columns from tablets up, four rows: the wide (landscape) photos take two columns each.
const photos = [
  { id: "gallery-van-neon" },
  { id: "gallery-360-terrace" },
  { id: "gallery-mirror-stone", wide: true },
  { id: "gallery-phone-gold" },
  { id: "gallery-van-crowd", wide: true },
  { id: "gallery-mirror-garden" },
  { id: "gallery-360-night" },
  { id: "gallery-van-bar-red" },
  { id: "gallery-phone-flowers" },
  { id: "gallery-van-dusk" },
  { id: "gallery-mirror-xmas" },
  { id: "gallery-props-neon" },
  { id: "gallery-phone-stone" },
  { id: "gallery-360-props" },
] as const;

type Props = {
  dict: Dictionary;
};

// Photos from events. Each opens larger in a lightbox (components/GalleryGrid.tsx).
export default function Gallery({ dict }: Props) {
  const { gallery } = dict;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="border-b border-line py-20 lg:py-24">
      <div className="wrap">
        <div className="mb-10 grid max-w-[46rem] gap-4">
          <h2 id="gallery-title" data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
            {dict.sections.gallery.title}
          </h2>
          <p data-reveal className="text-step-1 text-haze">
            {gallery.lead}
          </p>
        </div>

        <GalleryGrid
          labels={gallery}
          items={photos.map(({ id, ...photo }) => {
            const wide = "wide" in photo;
            const { src, srcSet, width, height, alt } = media[id];
            return {
              wide,
              full: { src, srcSet, width, height, alt: alt[dict.locale] },
              thumb: (
                <Photo
                  id={id}
                  locale={dict.locale}
                  sizes={wide ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
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
          {gallery.instagram} <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
