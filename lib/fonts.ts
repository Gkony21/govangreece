import { Didact_Gothic, Sofia_Sans_Extra_Condensed } from "next/font/google";

// Fonts are downloaded at build time and served from our own domain: visitors make no requests to Google.
// Didact Gothic is a free font drawn after Century Gothic, the font on the client's flyers. It has one weight only,
// so anything that needs weight (titles, buttons, labels) uses the display font instead of a fake bold.
const didact = Didact_Gothic({
  variable: "--font-didact",
  weight: "400",
  subsets: ["greek", "latin"],
});

const sofia = Sofia_Sans_Extra_Condensed({
  variable: "--font-sofia",
  subsets: ["greek", "latin"],
});

export const fontVariables = `${didact.variable} ${sofia.variable}`;
