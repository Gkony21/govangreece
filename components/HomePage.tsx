import ButtonLink from "@/components/ButtonLink";
import RevealObserver from "@/components/RevealObserver";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { sectionIds, type Dictionary, type SectionId } from "@/content/types";

// Which build step fills each section. Temporary: the labels disappear as the real sections land.
const comingInStep: Record<SectionId, number> = {
  services: 5,
  cocktails: 6,
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
        <section aria-labelledby="hero-title" className="border-b border-line">
          <div className="wrap grid min-h-[min(80vh,760px)] content-center gap-8 py-16">
            <h1 id="hero-title" className="neon max-w-[12ch] font-display text-step-4 leading-[0.95] font-black text-balance">
              {dict.hero.title}
            </h1>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#contact">{dict.quoteCta}</ButtonLink>
              <ButtonLink href="#services" variant="ghost">
                {dict.header.nav[0].label}
              </ButtonLink>
            </div>
            <StepNote step={4} />
          </div>
        </section>

        {sectionIds.map((id) => (
          <section key={id} id={id} aria-labelledby={`${id}-title`} className="border-b border-line py-20 lg:py-24">
            <div className="wrap grid gap-4">
              <h2 id={`${id}-title`} data-reveal className="font-display text-step-3 leading-[0.95] font-extrabold text-balance">
                {dict.sections[id].title}
              </h2>
              <StepNote step={comingInStep[id]} />
            </div>
          </section>
        ))}
      </main>

      <SiteFooter dict={dict} />
      <RevealObserver />
    </>
  );
}

function StepNote({ step }: { step: number }) {
  return (
    <p lang="el" className="justify-self-start rounded-full border border-amber/40 px-3 py-1 text-sm text-amber">
      Έρχεται στο Βήμα {step}
    </p>
  );
}
