import { en } from "@/content/en";
import { fontVariables } from "@/lib/fonts";
import { jsFlagScript, pageMetadata } from "@/lib/metadata";
import "../../globals.css";

// Root layout for the English site at /en.
export const metadata = pageMetadata(en, "/en");
export { viewport } from "@/lib/metadata";

export default function EnglishLayout({ children }: LayoutProps<"/en">) {
  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates.
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
      </head>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
