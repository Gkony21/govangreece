import type { Metadata } from "next";
import PrivacyPage from "@/components/PrivacyPage";
import { el } from "@/content/el";
import { privacyEl } from "@/content/privacy-el";
import { site } from "@/lib/site";

const title = `${privacyEl.title} · ${site.name}`;
const description = privacyEl.intro;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", locale: el.meta.ogLocale, url: "/privacy", siteName: site.name, title, description },
};

export default function Page() {
  return <PrivacyPage dict={el} text={privacyEl} homeHref="/" />;
}
