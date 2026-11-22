import type { PrivacyText } from "./privacy-el";

// The privacy policy in English (app/(en)/en/privacy), adapted from the Greek one (content/privacy-el.ts).
// Keep the two saying the same thing.
export const privacyEn: PrivacyText = {
  title: "Privacy policy",
  updated: "Last updated: 7 November 2026",
  intro:
    "We collect as little as we can, and only to reply to you about your event. Here is what we keep, where it goes and how to have it deleted.",
  sections: [
    {
      title: "Who is responsible",
      body: [
        "The data controller is Golemis Vrasidas Panagiotis, a sole proprietorship trading as GO! Van, in Greece.",
        "For anything about your details: {email} or {phone}.",
      ],
    },
    {
      title: "What we collect",
      body: [
        "Only what you write in the «Get a quote» form:",
        [
          "your name and phone number",
          "your email, if you give it",
          "the date, type and place of your event and roughly how many guests",
          "the services you are interested in and anything you write in the message",
        ],
        "If you call us or message us on Viber, WhatsApp, email or social media, we have what you tell us there. Please don't send us anything the event doesn't need.",
      ],
    },
    {
      title: "Why we use it",
      body: [
        "To reply to you, send you a quote and, if we work together, to organise your event. The legal basis is that you ask for it, before an agreement with us (Article 6(1)(b) of the General Data Protection Regulation).",
        "We don't use it for advertising or newsletters, and we never give or sell it to anyone.",
      ],
    },
    {
      title: "Where it goes",
      body: [
        "The site doesn't keep what you send through the form. It sends it once, as an email, to our inbox. For that we work with three companies, which handle it only on our behalf:",
        [
          "Cloudflare: hosts the site and sends the form. With Cloudflare Turnstile it checks that the form is sent by a person and not a spam program, from technical details of your browser and your IP address.",
          "Resend: delivers the form's email.",
          "Google (Gmail): the inbox the email arrives in.",
        ],
        "Some of them may handle data outside the European Union, for example in the USA, with the safeguards the Regulation requires (such as standard contractual clauses).",
      ],
    },
    {
      title: "How long we keep it",
      body: [
        "As long as we need to talk about your event. If we don't end up working together, we delete your request within 12 months. If we do, we keep only what the law requires, for example for tax purposes.",
      ],
    },
    {
      title: "Cookies and visitor counts",
      body: [
        "The site sets no cookies, so you won't see a cookie banner. It has no ads, Facebook Pixel or Google Analytics.",
        "To know how many people visit, we use Cloudflare Web Analytics, which counts visits without cookies and without identifying you.",
        "If you follow a link to Instagram, TikTok, Viber, WhatsApp or Google, you leave the site and their terms apply.",
      ],
    },
    {
      title: "Your rights",
      body: [
        "You can ask us to see, correct or delete your details, to limit how we use them, to object to their use, or to get them in a file. Write to us at {email} and we will reply within one month.",
        "If you think we haven't respected your data, you can complain to the Hellenic Data Protection Authority ({dpa}), or to the authority in your own country.",
      ],
    },
    {
      title: "Changes",
      body: ["If anything changes, we'll update this page and the date at the top."],
    },
  ],
};
