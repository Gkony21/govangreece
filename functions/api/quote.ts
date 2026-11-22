// POST /api/quote: the quote form (components/QuoteForm.tsx), sent as an email to the client through Resend.
// A Cloudflare Pages Function, so it runs on Cloudflare, not in the static build. Checked in this order: same site,
// size, Turnstile, then the fields themselves (lib/quote.ts, as the form checks them).
//
// Settings, in the Cloudflare dashboard (Pages > Settings > Variables and Secrets), and in .dev.vars locally:
// - RESEND_API_KEY (secret): a Resend key that may only send.
// - TURNSTILE_SECRET_KEY (secret): the Turnstile widget's secret.
// - QUOTE_TO: who gets the email. govangreece@gmail.com on Production, the developer on Preview.
// - QUOTE_DRY_RUN: "1" logs the email instead of sending it (local tests).
import { checkQuote, isoDay, readQuote, type Quote, type QuoteResult } from "../../lib/quote";
import { quoteEmail } from "../../lib/quote-email";
import { site } from "../../lib/site";

type Env = {
  RESEND_API_KEY?: string;
  TURNSTILE_SECRET_KEY?: string;
  QUOTE_TO?: string;
  QUOTE_DRY_RUN?: string;
};

type Context = { request: Request; env: Env };

const maxBytes = 16 * 1024;

// _headers only covers the static files, so the answers carry their own.
const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Frame-Options": "DENY",
};

export async function onRequest({ request, env }: Context): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { ...headers, Allow: "POST" } });
  }

  // Only this site's own pages may send. Browsers always say where a POST comes from.
  if (request.headers.get("Origin") !== new URL(request.url).origin) return reply(request, 403, { ok: false, error: "failed" });

  if (Number(request.headers.get("Content-Length")) > maxBytes) return reply(request, 413, { ok: false, error: "failed" });
  const body = await request.arrayBuffer();
  if (body.byteLength > maxBytes) return reply(request, 413, { ok: false, error: "failed" });

  let data: FormData;
  try {
    data = await new Response(body, { headers: { "Content-Type": request.headers.get("Content-Type") ?? "" } }).formData();
  } catch {
    return reply(request, 400, { ok: false, error: "failed" });
  }
  const quote = readQuote(data);

  if (!(await human(data.get("cf-turnstile-response"), request, env))) return reply(request, 403, { ok: false, error: "check" }, quote);

  // A day of slack for the visitor's time zone: Greece is ahead of UTC, and the form checks against local today.
  const errors = checkQuote(quote, isoDay(new Date(Date.now() - 864e5)));
  if (Object.keys(errors).length > 0) return reply(request, 422, { ok: false, error: "invalid", errors }, quote);

  const email = quoteEmail(quote);

  if (env.QUOTE_DRY_RUN === "1") {
    console.log(`[dry run] To: ${env.QUOTE_TO ?? "(QUOTE_TO not set)"}\nSubject: ${email.subject}\n\n${email.text}`);
    return reply(request, 200, { ok: true }, quote);
  }

  const resendKey = env.RESEND_API_KEY?.trim();
  const to = env.QUOTE_TO?.trim();
  if (!resendKey || !to) {
    console.error("quote: RESEND_API_KEY or QUOTE_TO is not set");
    return reply(request, 500, { ok: false, error: "failed" }, quote);
  }

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "GO! Van site <forma@govangreece.gr>",
      to: [to],
      reply_to: quote.email || undefined,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });
  if (!sent.ok) {
    // The status and Resend's reason only, never the request itself: it holds the visitor's details.
    console.error(`quote: Resend answered ${sent.status}: ${(await sent.text()).slice(0, 300)}`);
    return reply(request, 502, { ok: false, error: "failed" }, quote);
  }

  return reply(request, 200, { ok: true }, quote);
}

// Asks Turnstile whether the token the widget gave the form is real, fresh, and from this site.
async function human(token: FormDataEntryValue | null, request: Request, env: Env) {
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  // Trimmed: a pasted secret easily brings a space or a line break along, and Turnstile then calls it invalid.
  const secret = env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    console.error("quote: TURNSTILE_SECRET_KEY is not set");
    return false;
  }
  const check = new FormData();
  check.append("secret", secret);
  check.append("response", token);
  const ip = request.headers.get("CF-Connecting-IP");
  if (ip) check.append("remoteip", ip);
  try {
    const answer = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: check });
    const result: { success?: boolean; "error-codes"?: string[] } = await answer.json();
    if (!result.success) {
      const codes = result["error-codes"] ?? [];
      // For a rejected secret, its shape only (never the secret): enough to tell a site key or a cut paste apart.
      const shape = codes.includes("invalid-input-secret")
        ? `; the secret has ${secret.length} characters, starts with "${secret.slice(0, 4)}", ${secret === env.TURNSTILE_SECRET_KEY ? "no" : "had"} spaces around it`
        : "";
      console.warn(`quote: Turnstile said no (${codes.join(", ") || "no reason"})${shape}`);
    }
    return result.success === true;
  } catch (error) {
    console.error("quote: Turnstile could not be reached", error);
    return false;
  }
}

// JSON for the form. A browser without JavaScript posts the form itself and gets a short page instead, in the
// form's language, with the way back and the phone number.
function reply(request: Request, status: number, result: QuoteResult, quote?: Quote) {
  if (request.headers.get("Accept")?.includes("application/json")) {
    return Response.json(result, { status, headers });
  }
  const en = quote?.locale === "en";
  const home = en ? "/en/#contact" : "/#contact";
  const [title, text] = result.ok
    ? en
      ? ["Thank you!", "We have your request and will call you soon."]
      : ["Ευχαριστούμε!", "Λάβαμε το αίτημά σας. Θα σας πάρουμε τηλέφωνο σύντομα."]
    : en
      ? ["We could not send your request", `Please call or message us: ${site.phone.international}.`]
      : ["Δεν μπορέσαμε να στείλουμε το αίτημα", `Πάρτε μας τηλέφωνο ή στείλτε μας μήνυμα: ${site.phone.display}.`];
  const page = `<!doctype html><html lang="${en ? "en" : "el"}"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} · GO! Van</title>
<body style="margin:0;min-height:100vh;display:grid;place-content:center;gap:1rem;padding:1.5rem;background:#120c22;color:#f1ecff;font-family:system-ui,sans-serif;text-align:center">
<h1 style="margin:0">${title}</h1><p style="margin:0">${text}</p>
<p style="margin:0"><a href="tel:${site.phone.e164}" style="color:#d58cff">${site.phone.display}</a> · <a href="${home}" style="color:#d58cff">${en ? "Back to the site" : "Πίσω στο site"}</a></p></body></html>`;
  return new Response(page, { status, headers: { ...headers, "Content-Type": "text/html; charset=utf-8" } });
}
