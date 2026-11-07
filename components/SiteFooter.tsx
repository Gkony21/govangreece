import type { Dictionary } from "@/content/types";
import { links, phoneFor, site } from "@/lib/site";

type Props = {
  dict: Dictionary;
};

export default function SiteFooter({ dict }: Props) {
  return (
    <footer className="border-t border-line text-step--1 text-haze">
      <div className="wrap flex flex-wrap items-center gap-x-8 gap-y-4 py-8">
        <span>
          {site.name}, {dict.footer.tagline}
        </span>
        <nav aria-label={dict.footer.socialLabel} className="flex gap-5">
          <a href={site.social.instagram} rel="noopener" className="no-underline hover:text-ink">
            Instagram
          </a>
          <a href={site.social.tiktok} rel="noopener" className="no-underline hover:text-ink">
            TikTok
          </a>
        </nav>
        <a href={links.email} className="no-underline hover:text-ink">
          {site.email}
        </a>
        <a href={links.call} className="no-underline hover:text-ink">
          {phoneFor(dict.locale)}
        </a>
        <a href={dict.contact.form.privacyHref} className="no-underline hover:text-ink">
          {dict.contact.form.privacyLink}
        </a>
        <span className="lg:ml-auto">
          © {new Date().getFullYear()} {site.name}
        </span>
      </div>
    </footer>
  );
}
