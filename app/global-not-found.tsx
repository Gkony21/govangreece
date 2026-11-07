import type { Metadata } from "next";
import ButtonLink from "@/components/ButtonLink";
import FairyLights from "@/components/FairyLights";
import { fontVariables } from "@/lib/fonts";
import { links, site } from "@/lib/site";
import "./globals.css";

// The 404 page for any address the site does not have, in both languages (the site has two root layouts, so Next.js
// needs this global page instead of a not-found.tsx). Static export writes it to out/404.html, which Cloudflare Pages
// sends with status 404. The "404" is a neon sign with its zero gone out, flickering now and then (.sign-404 in
// globals.css). Greek first, with one line in English that leads to /en.
export const metadata: Metadata = {
  title: `Η σελίδα δεν βρέθηκε · ${site.name}`,
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="el" className={fontVariables}>
      <body className="min-h-dvh font-sans">
        <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-4 py-16 text-center">
          <FairyLights />
          <div className="grid justify-items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a full load, as everywhere on this static site */}
            <a href="/" aria-label={`${site.name}, αρχική σελίδα`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
              <img src="/logo-112.webp" alt="" width={72} height={72} className="size-18" />
            </a>
            <p aria-hidden="true" className="sign-404 font-display text-[clamp(7rem,32vw,14rem)] leading-[0.85] font-black">
              4<span className="sign-404-out">0</span>4
            </p>
            <h1 className="font-display text-step-3 leading-none font-extrabold text-balance">Εδώ δεν έχει πάρτι.</h1>
            <p className="max-w-[34ch] text-step-1 text-haze">
              Η σελίδα που ψάχνετε δεν υπάρχει ή άλλαξε διεύθυνση. Το event σας όμως το περιμένουμε.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/">Στην αρχική</ButtonLink>
              <ButtonLink href="/#contact" variant="ghost">
                Ζητήστε προσφορά
              </ButtonLink>
            </div>
            <p className="text-step--1 text-haze">
              Ή πάρτε μας τηλέφωνο:{" "}
              <a href={links.call} className="whitespace-nowrap text-ink">
                {site.phone.display}
              </a>
            </p>
            <p lang="en" className="text-step--1 text-haze">
              Page not found. <a href="/en" className="text-ink">Go to the English site</a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
