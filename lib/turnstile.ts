// Cloudflare Turnstile: the check that a person, not a bot, sends the quote form. The widget gives the form a token,
// and the server asks Cloudflare whether it is real (functions/api/quote.ts). It stays hidden unless Cloudflare is
// unsure, and then shows a box to tick. Loaded only when the form comes near, so the page never waits for it.

type Turnstile = {
  render(container: HTMLElement, options: Record<string, unknown>): string;
  reset(id: string): void;
  remove(id: string): void;
};

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}

// Cloudflare's test key, which always passes. Used on this computer, where the real key does not work.
const testKey = "1x00000000000000000000AA";
// The widget's site key, public by design (the secret lives on Cloudflare only). It works on govangreece.gr and
// every *.govangreece.pages.dev preview.
const siteKey = "0x4AAAAAAFztYOKddLrEZ5nv";

// How long a send waits for the token before giving up, a box to tick included.
const patience = 20_000;

let loading: Promise<Turnstile> | undefined;

function load() {
  loading ??= new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile did not start")));
    script.onerror = () => reject(new Error("Turnstile did not load"));
    document.head.append(script);
  });
  return loading;
}

export type HumanCheck = {
  // The current token, or the next one; fails when Turnstile cannot give one.
  token(): Promise<string>;
  // A token works once: after each send, ask for a new one.
  reset(): void;
  remove(): void;
};

type Waiter = { resolve: (token: string) => void; reject: (error: Error) => void; timer: ReturnType<typeof setTimeout> };

// onAsk: Cloudflare is unsure and shows its box to tick.
export function humanCheck(container: HTMLElement, language: string, onAsk: () => void): HumanCheck {
  let current = "";
  // Set when Turnstile cannot work here (blocked, offline, an old browser): every send fails at once.
  let broken: Error | undefined;
  let waiting: Waiter[] = [];
  let id: string | undefined;
  let removed = false;

  function settle(result: string | Error) {
    for (const waiter of waiting) {
      clearTimeout(waiter.timer);
      if (typeof result === "string") waiter.resolve(result);
      else waiter.reject(result);
    }
    waiting = [];
  }

  function fail(error: Error) {
    broken = error;
    settle(error);
  }

  const ready = load().then((turnstile) => {
    if (removed) return turnstile;
    const local = ["localhost", "127.0.0.1"].includes(location.hostname);
    id = turnstile.render(container, {
      sitekey: local ? testKey : siteKey,
      action: "quote",
      theme: "dark",
      language,
      appearance: "interaction-only",
      // flexible fills the form, but is never narrower than 300px: the smallest phones get the compact one.
      size: container.clientWidth < 300 ? "compact" : "flexible",
      callback: (token: string) => {
        current = token;
        settle(token);
      },
      "expired-callback": () => {
        current = "";
      },
      // Turnstile tries again by itself, so only the sends waiting now fail.
      "error-callback": () => {
        current = "";
        settle(new Error("Turnstile failed"));
      },
      "unsupported-callback": () => fail(new Error("Turnstile is not supported here")),
      "before-interactive-callback": onAsk,
    });
    return turnstile;
  });
  ready.catch(fail);

  return {
    token() {
      if (current) return Promise.resolve(current);
      if (broken) return Promise.reject(broken);
      return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          waiting = waiting.filter((waiter) => waiter.timer !== timer);
          reject(new Error("Turnstile took too long"));
        }, patience);
        waiting.push({ resolve, reject, timer });
      });
    },
    reset() {
      current = "";
      ready.then((turnstile) => id && turnstile.reset(id)).catch(() => {});
    },
    remove() {
      removed = true;
      settle(new Error("Turnstile removed"));
      ready.then((turnstile) => id && turnstile.remove(id)).catch(() => {});
    },
  };
}
