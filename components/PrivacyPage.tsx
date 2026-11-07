import { Fragment, type ReactNode } from "react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import type { PrivacyText } from "@/content/privacy-el";
import type { Dictionary } from "@/content/types";
import { links, site } from "@/lib/site";

type Props = {
  dict: Dictionary;
  text: PrivacyText;
  homeHref: string;
};

const linkClass = "text-ink underline decoration-violet underline-offset-4 hover:text-neon";

// {email}, {phone} and {dpa} in the text, as links.
const placeholders: Record<string, ReactNode> = {
  "{email}": (
    <a href={links.email} className={linkClass}>
      {site.email}
    </a>
  ),
  "{phone}": (
    <a href={links.call} className={`${linkClass} whitespace-nowrap`}>
      {site.phone.display}
    </a>
  ),
  "{dpa}": (
    <a href="https://www.dpa.gr" rel="noopener" className={linkClass}>
      www.dpa.gr
    </a>
  ),
};

function withLinks(line: string) {
  return line.split(/(\{email\}|\{phone\}|\{dpa\})/).map((part, i) => <Fragment key={i}>{placeholders[part] ?? part}</Fragment>);
}

// The privacy policy: the site's header and footer around one narrow column of text, easy to read on a phone.
export default function PrivacyPage({ dict, text, homeHref }: Props) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-amber px-4 py-2 text-night focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {dict.skipToContent}
      </a>
      <SiteHeader dict={dict} homeHref={homeHref} sectionBase={homeHref} />

      <main id="main" className="wrap max-w-[46rem] py-14 lg:py-20">
        <h1 className="neon font-display text-step-3 leading-none font-black">{text.title}</h1>
        <p className="mt-4 text-step--1 text-haze">{text.updated}</p>
        <p className="mt-8 text-step-1 text-ink">{text.intro}</p>

        {text.sections.map((section) => (
          <section key={section.title} className="mt-12 grid gap-4">
            <h2 className="font-display text-step-2 leading-none font-extrabold text-violet">{section.title}</h2>
            {section.body.map((block, i) =>
              typeof block === "string" ? (
                <p key={i} className="text-haze">
                  {withLinks(block)}
                </p>
              ) : (
                <ul key={i} className="grid list-disc gap-2 pl-5 text-haze marker:text-violet">
                  {block.map((item) => (
                    <li key={item}>{withLinks(item)}</li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
      </main>

      <SiteFooter dict={dict} />
    </>
  );
}
