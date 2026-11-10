import { Fragment } from "react";
import About from "@/components/About";
import Breath from "@/components/Breath";
import BusinessJsonLd from "@/components/BusinessJsonLd";
import Cocktails from "@/components/Cocktails";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import NeonSeam, { type NeonSeamProps } from "@/components/NeonSeam";
import PackageBar from "@/components/PackageBar";
import ParallaxFallback from "@/components/ParallaxFallback";
import Reviews from "@/components/Reviews";
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

// The neon lines, by the section they come after. Sections that meet a breath are already parted by its cut.
const seamAfter: Partial<Record<SectionId, NeonSeamProps>> = {
  services: { from: "night", to: "night-2", climbs: "up" },
  why: { from: "night-2", to: "night", climbs: "down" },
  reviews: { from: "night", to: "night-2", climbs: "up" },
  about: { from: "night-2", to: "night", climbs: "down" },
};

type Props = {
  dict: Dictionary;
  homeHref: string;
};

// The one-page site, in either language.
export default function HomePage({ dict, homeHref }: Props) {
  return (
    <>
      <BusinessJsonLd dict={dict} path={homeHref} />
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
        <ServiceBand items={dict.services.items.map((s) => s.name)} />

        {sectionIds.map((id) => {
          const breath = breathBefore[id];
          const seam = seamAfter[id];
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
              ) : id === "reviews" ? (
                <Reviews dict={dict} />
              ) : id === "about" ? (
                <About dict={dict} />
              ) : id === "faq" ? (
                <Faq dict={dict} />
              ) : (
                <Contact dict={dict} />
              )}
              {seam && <NeonSeam {...seam} />}
            </Fragment>
          );
        })}
      </main>

      <NeonSeam from="night" to="night" climbs="up" />
      <SiteFooter dict={dict} />
      <PackageBar services={dict.services} quoteCta={dict.quoteCta} />
      <ParallaxFallback />
    </>
  );
}
