import PrivacyPage from "@/components/PrivacyPage";
import { en } from "@/content/en";
import { privacyEn } from "@/content/privacy-en";
import { privacyMetadata } from "@/lib/metadata";

export const metadata = privacyMetadata(en, privacyEn, "/en/privacy");

export default function Page() {
  return <PrivacyPage dict={en} text={privacyEn} homeHref="/en" otherLanguageHref="/privacy" />;
}
