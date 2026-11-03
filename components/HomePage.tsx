import Clip from "@/components/Clip";
import Cocktails from "@/components/Cocktails";
import Hero from "@/components/Hero";
import PackageBar from "@/components/PackageBar";
import Photo from "@/components/Photo";
import RevealObserver from "@/components/RevealObserver";
import ServiceBand from "@/components/ServiceBand";
import Services from "@/components/Services";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { sectionIds, type Dictionary, type Locale, type SectionId } from "@/content/types";
import { media, type MediaId } from "@/lib/media";

// Step 3 review: the processed photos and videos, shown raw in the section they belong to. Replaced as sections land.
const previewMedia: Partial<Record<SectionId, string[]>> = {
  why: ["break-"],
  gallery: ["gallery-"],
};

// Which build step fills each section. Temporary: the labels disappear as the real sections land.
const comingInStep: Partial<Record<SectionId, number>> = {
  why: 7,
  gallery: 7,
  reviews: 8,
  about: 8,
  faq: 8,
  contact: 9,
};

type Props = {
  dict: Dictionary;
  homeHref: string;
};

// The one-page site, in either language.
export default function HomePage({ dict, homeHref }: Props) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-amber px-4 py-2 text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {dict.skipToContent}
      </a>
      <div className="scroll-progress" aria-hidden="true" />
      <SiteHeader dict={dict} homeHref={homeHref} />

      <main id="main">
        <Hero dict={dict} />
        <ServiceBand items={dict.services.items.map((s) => s.short)} />

        {sectionIds.map((id) =>
          id === "services" ? (
            <Services key={id} dict={dict} />
          ) : id === "cocktails" ? (
            <Cocktails key={id} dict={dict} />
          ) : (
            <section key={id} id={id} aria-labelledby={`${id}-title`} className="border-b border-line py-20 lg:py-24">
              <div className="wrap grid gap-4">
                <h2 id={`${id}-title`} data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
                  {dict.sections[id].title}
                </h2>
                <StepNote step={comingInStep[id]} />
                <MediaPreview prefixes={previewMedia[id]} locale={dict.locale} />
              </div>
            </section>
          ),
        )}
      </main>

      <SiteFooter dict={dict} />
      <PackageBar services={dict.services} quoteCta={dict.quoteCta} />
      <RevealObserver />
    </>
  );
}

function StepNote({ step }: { step?: number }) {
  if (!step) return null;
  return (
    <p lang="el" className="justify-self-start rounded-full border border-amber/40 px-3 py-1 text-sm text-amber">
      Έρχεται στο Βήμα {step}
    </p>
  );
}

function MediaPreview({ prefixes, locale }: { prefixes?: string[]; locale: Locale }) {
  if (!prefixes) return null;
  const ids = (Object.keys(media) as MediaId[]).filter(
    (id) => prefixes.some((p) => id.startsWith(p)) && !id.endsWith("-tall"),
  );
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {ids.map((id) => {
        const item = media[id];
        return (
          <li key={id} className="grid content-start gap-1 text-xs text-haze">
            {item.kind === "video" ? (
              <Clip id={id as never} locale={locale} className="h-auto w-full rounded-md bg-night-2" />
            ) : (
              <Photo id={id as never} locale={locale} sizes="(min-width: 1024px) 25vw, 50vw" className="h-auto w-full rounded-md bg-night-2" />
            )}
            <span>
              {id}
              {item.consent === "pending" && <b className="ml-1 text-amber">· θέλει άδεια</b>}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
