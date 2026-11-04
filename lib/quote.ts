// The quote request, as both the form (components/QuoteForm.tsx) and the server (functions/api/quote.ts) read and
// check it, so the two never disagree. Relative imports: the server is bundled by Cloudflare, without the @/ paths.
import { eventTypes, serviceIds, type EventType, type Locale, type ServiceId } from "../content/types";

// The longest each field may be. The form says so too (maxLength), the server cuts anything longer.
export const quoteLimits = {
  name: 80,
  phone: 30,
  email: 120,
  place: 120,
  guests: 12,
  message: 2000,
} as const;

export type Quote = {
  name: string;
  phone: string;
  email: string;
  // YYYY-MM-DD, or empty when the date is not set yet (noDate).
  date: string;
  noDate: boolean;
  event?: EventType;
  place: string;
  guests: string;
  services: ServiceId[];
  message: string;
  locale: Locale;
};

// What can be wrong, by field. The codes are also the keys of the form's error messages (content, contact.form.errors).
export type QuoteErrors = Partial<{
  name: "name";
  phone: "phone" | "phoneInvalid";
  email: "email";
  date: "date" | "datePast";
}>;

// What the server answers. "invalid" comes with what is wrong, "check" means Turnstile said no, "failed" is our side.
export type QuoteResult =
  | { ok: true }
  | { ok: false; error: "invalid"; errors: QuoteErrors }
  | { ok: false; error: "check" | "failed" };

// A day as YYYY-MM-DD, the format of <input type="date">, in the time zone the Date is read in.
export function isoDay(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function text(data: FormData, name: keyof typeof quoteLimits) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim().slice(0, quoteLimits[name]) : "";
}

// The form's fields, trimmed and cut to size; choices outside the lists are dropped. A disabled date field is left out
// of the form data, which is how "not set yet" leaves no date.
export function readQuote(data: FormData): Quote {
  const event = data.get("event");
  const date = data.get("date");
  const noDate = data.has("noDate");
  return {
    name: text(data, "name"),
    phone: text(data, "phone"),
    email: text(data, "email"),
    date: !noDate && typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : "",
    noDate,
    event: eventTypes.find((type) => type === event),
    place: text(data, "place"),
    guests: text(data, "guests"),
    services: serviceIds.filter((id) => data.getAll("services").includes(id)),
    message: text(data, "message"),
    locale: data.get("locale") === "en" ? "en" : "el",
  };
}

// Only what is needed to call back: a name, a phone that looks like one (10 to 15 digits, a country code allowed), and
// a date no earlier than earliest, or "not set yet". An email is optional, but has to look like one when given.
export function checkQuote(quote: Quote, earliest: string): QuoteErrors {
  const errors: QuoteErrors = {};
  const digits = quote.phone.replace(/\D/g, "").length;

  if (!quote.name) errors.name = "name";
  if (!quote.phone) errors.phone = "phone";
  else if (digits < 10 || digits > 15 || /[^\d\s+().-]/.test(quote.phone)) errors.phone = "phoneInvalid";
  if (quote.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email)) errors.email = "email";
  if (!quote.noDate) {
    if (!quote.date) errors.date = "date";
    else if (quote.date < earliest) errors.date = "datePast";
  }
  return errors;
}
