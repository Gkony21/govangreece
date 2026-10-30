import FairyLights from "@/components/FairyLights";
import { links, site } from "@/lib/site";

// Temporary "coming soon" page, live on the domain until the full site launches.
const services = ["360 Video Booth", "Mirror Photo Booth", "Audio Guestbook", "Cocktail Van Bar"];

const contact = [
  { label: "Κλήση", href: links.call },
  { label: "Viber", href: links.viber },
  { label: "WhatsApp", href: links.whatsapp },
  { label: "Email", href: links.email },
];

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden px-4 text-center">
      <FairyLights />

      <div className="relative flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-8 pt-28 pb-12">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, the image is already optimized */}
        <img
          src="/logo.webp"
          alt={`${site.name}, ${site.tagline}`}
          width={640}
          height={640}
          className="w-52 sm:w-64"
        />

        <div className="flex flex-col gap-4">
          <h1 className="neon font-display text-[clamp(2.75rem,15vw,6rem)] font-black leading-none">Έρχεται σύντομα</h1>
          <p className="text-lg text-haze">
            Το νέο μας site ετοιμάζεται. Μέχρι τότε, είμαστε ένα μήνυμα μακριά για το event σας στη Λακωνία.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center gap-2 text-sm text-violet" aria-label="Υπηρεσίες">
          {services.map((s) => (
            <li key={s} className="rounded-full bg-night-2 px-3 py-1">
              {s}
            </li>
          ))}
        </ul>

        <div className="flex flex-col items-center gap-3">
          <a
            href={links.call}
            className="font-display text-4xl font-extrabold tracking-wide text-ink no-underline hover:text-neon"
          >
            {site.phone.display}
          </a>
          <div className="flex flex-wrap justify-center gap-2">
            {contact.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="rounded-full border border-line px-5 py-2.5 text-ink transition-colors hover:border-violet hover:bg-night-2"
              >
                {c.label}
              </a>
            ))}
          </div>
        </div>

        <p className="flex gap-5 text-sm text-haze">
          <a href={site.social.instagram} className="underline-offset-4 hover:text-ink hover:underline" rel="noopener">
            Instagram
          </a>
          <a href={site.social.tiktok} className="underline-offset-4 hover:text-ink hover:underline" rel="noopener">
            TikTok
          </a>
        </p>

        <p lang="en" className="max-w-md border-t border-line pt-6 text-sm text-haze">
          Our new website is coming soon. Call, Viber or WhatsApp us at {site.phone.international}, or
          email {site.email}.
        </p>
      </div>

      <footer className="relative pb-6 text-xs text-haze/70">
        © {new Date().getFullYear()} {site.name}
      </footer>
    </main>
  );
}
