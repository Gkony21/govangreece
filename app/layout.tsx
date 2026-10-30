import type { Metadata, Viewport } from "next";
import { Didact_Gothic, Sofia_Sans_Extra_Condensed } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Fonts are downloaded at build time and served from our own domain: visitors make no requests to Google.
const didact = Didact_Gothic({
  variable: "--font-didact",
  weight: "400",
  subsets: ["greek", "latin"],
});

const sofia = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia",
  subsets: ["greek", "latin"],
});

const description =
  "360 Video Booth, Mirror Photo Booth, Audio Guestbook και Cocktail Van Bar για γάμους, βαφτίσεις και events στη Λακωνία.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.tagline}`,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "el_GR",
    url: "/",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#120c22",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="el" className={`${didact.variable} ${sofia.variable} h-full`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
