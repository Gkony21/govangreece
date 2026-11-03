import { Fragment } from "react";
import Breath from "@/components/Breath";
import Cocktails from "@/components/Cocktails";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import PackageBar from "@/components/PackageBar";
import ParallaxFallback from "@/components/ParallaxFallback";
import RevealObserver from "@/components/RevealObserver";
import ServiceBand from "@/components/ServiceBand";
import Services from "@/components/Services";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import Why from "@/components/Why";
import { sectionIds, type BreathId, type Dictionary, type SectionId } from "@/content/types";

// The full-width photo breaths, by the section they come before.
const breathBefore: Partial<Record<SectionId, BreathId>> = {
  why: "bar",
  reviews: "memories",
  contact: "date",
};

// Which build step fills each section. Temporary: the labels disappear as the real sections land.
const comingInStep: Partial<Record<SectionId, number>> = {
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

        {sectionIds.map((id) => {
          const breath = breathBefore[id];
          return (
            <Fragment key={id}>
              {breath && <Breath id={breath} line={dict.breaths[breath]} locale={dict.locale} />}
              {id === "services" ? (
                <Services dict={dict} />
              ) : id === "cocktails" ? (
                <Cocktails dict={dict} />
              ) : id === "why" ? (
                <Why dict={dict} />
              ) : id === "gallery" ? (
                <Gallery dict={dict} />
              ) : (
                <section id={id} aria-labelledby={`${id}-title`} className="border-b border-line py-20 lg:py-24">
                  <div className="wrap grid gap-4">
                    <h2 id={`${id}-title`} data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
                      {dict.sections[id].title}
                    </h2>
                    <StepNote step={comingInStep[id]} />
                  </div>
                </section>
              )}
            </Fragment>
          );
        })}
      </main>

      <SiteFooter dict={dict} />
      <PackageBar services={dict.services} quoteCta={dict.quoteCta} />
      <RevealObserver />
      <ParallaxFallback />
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
