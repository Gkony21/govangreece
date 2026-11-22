import type { Dictionary } from "@/content/types";
import { links, phoneFor, site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

export default function SiteFooter({ dict }: Props) {
  return (
    <footer className="border-t border-line text-step--1 text-haze">
      <div className="wrap flex flex-wrap items-center gap-x-8 py-8 lg:gap-y-4">
        <span>
          {site.name}, {dict.footer.tagline}
        </span>
        <nav aria-label={dict.footer.socialLabel} className="flex gap-5">
          <a href={site.social.instagram} rel="noopener" className="no-underline hover:text-ink max-lg:inline-block max-lg:py-[11px]">
            Instagram
          </a>
          <a href={site.social.facebook} rel="noopener" className="no-underline hover:text-ink max-lg:inline-block max-lg:py-[11px]">
            Facebook
          </a>
          <a href={site.social.tiktok} rel="noopener" className="no-underline hover:text-ink max-lg:inline-block max-lg:py-[11px]">
            TikTok
          </a>
        </nav>
        <a href={links.email} className="no-underline hover:text-ink max-lg:inline-block max-lg:py-[11px]">
          {site.email}
        </a>
        <a href={links.call} className="no-underline hover:text-ink max-lg:inline-block max-lg:py-[11px]">
          {phoneFor(dict.locale)}
        </a>
        <a href={dict.contact.form.privacyHref} className="no-underline hover:text-ink max-lg:inline-block max-lg:py-[11px]">
          {dict.contact.form.privacyLink}
        </a>
        <span className="lg:ml-auto">
          © {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
