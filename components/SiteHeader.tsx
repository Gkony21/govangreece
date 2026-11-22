import ButtonLink from "@/components/ButtonLink";
import LanguageLink from "@/components/LanguageLink";
import MobileMenu from "@/components/MobileMenu";
import PhoneIcon from "@/components/PhoneIcon";
import type { Dictionary } from "@/content/types";
import { links, phoneFor } from "@/lib/site";

type Props = {
  dict: Dictionary;
  homeHref: string;
  // Put before the #section links: "" on the home page, the home page's address on other pages.
  sectionBase?: string;
  // The same page in the other language, when it is not the home page.
  switchHref?: string;
};

// Sticky header: logo, section links and language switch on desktop, a menu button on phones. The quote button stays on both.
export default function SiteHeader({ dict, homeHref, sectionBase = "", switchHref }: Props) {
  const { header } = dict;
  const { switchLanguage } = header;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-night/85 backdrop-blur-md">
      <div className="wrap flex h-(--header-h) items-center gap-3">
        <a href={homeHref} aria-label={header.homeLabel} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
          <img src="/logo-136.webp" alt="" width={68} height={68} className="size-17" />
        </a>

        <nav aria-label={header.navLabel} className="ml-auto hidden gap-7 text-haze lg:flex">
          {header.nav.map((item) => (
            <a key={item.id} href={`${sectionBase}#${item.id}`} className="no-underline transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <LanguageLink
          link={switchLanguage}
          href={switchHref}
          className="hidden rounded-full border border-line px-3 py-1 text-sm text-haze no-underline hover:text-ink lg:inline-block"
        />

        {/* Computers: the phone as an icon, its number showing under it on hover or keyboard focus. */}
        <a href={links.call} aria-label={`${dict.contact.call} ${phoneFor(dict.locale)}`} className="header-call btn-neon relative hidden size-11 shrink-0 place-items-center rounded-full lg:grid">
          <PhoneIcon />
          <span aria-hidden="true" className="header-call-number">
            {phoneFor(dict.locale)}
          </span>
        </a>

        <ButtonLink href={`${sectionBase}#contact`} variant="neon" size="sm" className="ml-auto whitespace-nowrap max-[359px]:px-3 lg:ml-0">
          {dict.quoteCta}
        </ButtonLink>

        <MobileMenu dict={dict} homeHref={homeHref} sectionBase={sectionBase} switchHref={switchHref} />
      </div>
    </header>
  );
}
