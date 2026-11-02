import { el } from "@/content/el";
import { fontVariables } from "@/lib/fonts";
import { jsFlagScript, pageMetadata } from "@/lib/metadata";
import "../globals.css";

// Root layout for the Greek site at /. The English site has its own root layout, so each page gets the right <html lang>.
export const metadata = pageMetadata(el, "/");
export { viewport } from "@/lib/metadata";

export default function GreekLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script adds the "js" class before React hydrates.
    <html lang="el" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlagScript }} />
      </head>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
