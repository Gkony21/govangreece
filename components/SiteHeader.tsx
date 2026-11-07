import ButtonLink from "@/components/ButtonLink";
import MobileMenu from "@/components/MobileMenu";
import type { Dictionary } from "@/content/types";

type Props = {
  dict: Dictionary;
  homeHref: string;
  // Put before the #section links: "" on the home page, the home page's address on other pages.
  sectionBase?: string;
};

// Sticky header: logo, section links and language switch on desktop, a menu button on phones. The quote button stays on both.
export default function SiteHeader({ dict, homeHref, sectionBase = "" }: Props) {
  const { header } = dict;
  const { switchLanguage } = header;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-night/85 backdrop-blur-md">
      <div className="wrap flex h-(--header-h) items-center gap-3">
        <a href={homeHref} aria-label={header.homeLabel} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
          <img src="/logo-112.webp" alt="" width={56} height={56} className="size-14" />
        </a>

        <nav aria-label={header.navLabel} className="ml-auto hidden gap-7 text-haze lg:flex">
          {header.nav.map((item) => (
            <a key={item.id} href={`${sectionBase}#${item.id}`} className="no-underline transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={switchLanguage.href}
          hrefLang={switchLanguage.hrefLang}
          lang={switchLanguage.hrefLang}
          aria-label={switchLanguage.ariaLabel}
          className="hidden rounded-full border border-line px-3 py-1 text-sm text-haze no-underline hover:text-ink lg:inline-block"
        >
          {switchLanguage.label}
        </a>

        <ButtonLink href={`${sectionBase}#contact`} size="sm" className="ml-auto lg:ml-0">
          {dict.quoteCta}
        </ButtonLink>

        <MobileMenu header={header} sectionBase={sectionBase} />
      </div>
    </header>
  );
}
