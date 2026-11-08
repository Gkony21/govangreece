// The email a quote request becomes (functions/api/quote.ts). Always in Greek, for the client, whichever language the
// form was filled in; an English one says so in the subject. Relative imports: bundled by Cloudflare.
import { el } from "../content/el";
import type { Quote } from "./quote";

// The dates come as YYYY-MM-DD and are read as UTC days, so no time zone moves them.
const longDate = new Intl.DateTimeFormat("el-GR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("el-GR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" });

function escape(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

// The visitor's phone as an international number, digits only, for the call and WhatsApp links. A Greek number written
// without a country code (10 digits, starting 2 or 6) gets +30.
export function internationalPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (phone.trim().startsWith("+")) return digits;
  if (digits.startsWith("00")) return digits.slice(2);
  if (digits.length === 10 && /^[26]/.test(digits)) return `30${digits}`;
  return digits;
}

export function quoteEmail(quote: Quote) {
  const day = quote.date ? new Date(`${quote.date}T00:00:00Z`) : undefined;
  const event = quote.event ? el.contact.form.eventTypes[quote.event] : "";
  const services = quote.services.map((id) => el.services.items.find((s) => s.id === id)?.name).join(", ");
  const phone = internationalPhone(quote.phone);

  const rows: [string, string][] = [
    ["Όνομα", quote.name],
    ["Τηλέφωνο", quote.phone],
    ["Email", quote.email || "Χωρίς email"],
    ["Ημερομηνία", day ? longDate.format(day) : "Δεν έχει κλειστεί ακόμα"],
    ["Event", event || "—"],
    ["Πού", quote.place || "—"],
    ["Καλεσμένοι", quote.guests || "—"],
    ["Υπηρεσίες", services || "Καμία επιλογή"],
    ["Μήνυμα", quote.message || "—"],
    ["Γλώσσα φόρμας", quote.locale === "en" ? "Αγγλικά" : "Ελληνικά"],
  ];

  const about = [event, day ? shortDate.format(day) : ""].filter(Boolean).join(", ");
  const subject = `${quote.locale === "en" ? "[EN] " : ""}Αίτημα προσφοράς: ${quote.name}${about ? ` · ${about}` : ""}`;

  const replyNote = quote.email
    ? "Αν πατήσετε «Απάντηση», το email πηγαίνει κατευθείαν στον πελάτη."
    : "Ο πελάτης δεν έδωσε email: απαντήστε στο τηλέφωνο.";

  const actions = [
    [`tel:+${phone}`, "Κλήση"],
    [`https://wa.me/${phone}`, "WhatsApp"],
    ...(quote.email ? [[`mailto:${quote.email}`, "Email"]] : []),
  ];

  const html = `<!doctype html>
<html lang="el"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body style="margin:0;padding:24px;background:#f4f1fb;font-family:Arial,Helvetica,sans-serif;color:#1c1335">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:16px;padding:28px">
<h1 style="margin:0 0 4px;font-size:22px">Νέο αίτημα προσφοράς</h1>
<p style="margin:0 0 20px;color:#6b6290">Από τη φόρμα του govangreece.gr</p>
<p style="margin:0 0 24px">${actions
    .map(([href, label]) => `<a href="${escape(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:10px 18px;border-radius:999px;background:#a98bff;color:#160d2b;font-weight:bold;text-decoration:none">${label}</a>`)
    .join("")}</p>
<table style="width:100%;border-collapse:collapse;font-size:15px">${rows
    .map(
      ([label, value]) =>
        `<tr><th style="text-align:left;vertical-align:top;padding:8px 12px 8px 0;border-top:1px solid #e6e1f5;color:#6b6290;font-weight:normal;white-space:nowrap">${label}</th><td style="padding:8px 0;border-top:1px solid #e6e1f5;overflow-wrap:anywhere">${escape(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>
<p style="margin:24px 0 0;color:#6b6290;font-size:13px">${replyNote}</p>
</div></body></html>`;

  const text = [
    "Νέο αίτημα προσφοράς από τη φόρμα του govangreece.gr",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Κλήση: tel:+${phone}`,
    `WhatsApp: https://wa.me/${phone}`,
    "",
    replyNote,
  ].join("\n");

  return { subject, html, text };
}
