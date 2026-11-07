import PrivacyPage from "@/components/PrivacyPage";
import { el } from "@/content/el";
import { privacyEl } from "@/content/privacy-el";
import { privacyMetadata } from "@/lib/metadata";

export const metadata = privacyMetadata(el, privacyEl, "/privacy");

export default function Page() {
  return <PrivacyPage dict={el} text={privacyEl} homeHref="/" otherLanguageHref="/en/privacy" />;
}
