/**
 * x402 bot paywall.
 *
 * Humans browse free. AI crawlers / scrapers (matched by User-Agent) get an
 * HTTP 402 with x402 payment requirements; if they send a valid payment
 * header it is verified + settled via the facilitator and the page is served.
 *
 * Built on the official x402 v2 libraries (@x402/core + @x402/evm, plus
 * @coinbase/x402 for the CDP facilitator). @x402/next is not used directly
 * because every v2 release requires Next >= 16 and this site is on Next 15;
 * this module is a thin Next 15 middleware adapter over the same core API
 * that @x402/next wraps.
 *
 * FAIL OPEN: any exception or facilitator outage serves the page normally.
 */
import { NextResponse } from "next/server";
import {
  HTTPFacilitatorClient,
  x402HTTPResourceServer,
  x402ResourceServer,
  withPrivateCacheControl,
} from "@x402/core/server";
import { decodePaymentRequiredHeader } from "@x402/core/http";
import { ExactEvmScheme } from "@x402/evm/exact/server";

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const DEFAULTS = {
  payTo: "0x0ba3b8796ce61ef8Cbd11A7F33Be31F1Fd4A03B3",
  price: "$0.001",
  network: "eip155:8453", // Base mainnet, USDC
  facilitatorUrl: "https://x402.org/facilitator",
};

const DESCRIPTION = "Paid access for automated agents";
const FACILITATOR_TIMEOUT_MS = 10_000;
const INIT_RETRY_MS = 60_000;

export function getPaywallConfig() {
  return {
    enabled: (process.env.X402_ENABLED ?? "true").trim().toLowerCase() !== "false",
    payTo: process.env.X402_PAY_TO || DEFAULTS.payTo,
    price: process.env.X402_PRICE || DEFAULTS.price,
    network: process.env.X402_NETWORK || DEFAULTS.network,
    facilitatorUrl: process.env.X402_FACILITATOR_URL || DEFAULTS.facilitatorUrl,
    cdpKeyId: process.env.CDP_API_KEY_ID || "",
    cdpKeySecret: process.env.CDP_API_KEY_SECRET || "",
  };
}

/* ------------------------------------------------------------------ */
/* Bot detection (case-insensitive substring match on User-Agent)      */
/* ------------------------------------------------------------------ */

export const BOT_UA_PATTERNS = {
  /** Never charged. Checked first. */
  allow: [
    "googlebot",
    "bingbot",
    "duckduckbot",
    "slurp",
    "applebot", // plain Applebot only; "applebot-extended" is excluded below
    "twitterbot",
    "facebookexternalhit",
    "linkedinbot",
    "slackbot",
    "discordbot",
    "whatsapp",
    "telegrambot",
    "vercel",
    // uptime monitors
    "uptimerobot",
    "pingdom",
    "statuscake",
    "betteruptime",
    "better uptime",
    "betterstack",
    "site24x7",
    "datadogsynthetics",
    "checkly",
    "freshping",
    "hetrixtools",
    "updown.io",
    "uptime-kuma",
    "uptime kuma",
  ],
  /** Charged via x402. */
  charge: [
    "gptbot",
    "chatgpt-user",
    "oai-searchbot",
    "claudebot",
    "claude-user",
    "claude-searchbot",
    "anthropic-ai",
    "ccbot",
    "perplexitybot",
    "perplexity-user",
    "bytespider",
    "amazonbot",
    "applebot-extended",
    "google-extended",
    "meta-externalagent",
    "meta-externalfetcher",
    "facebookbot",
    "diffbot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "youbot",
    "ai2bot",
    "ai2bot-dolma",
    "timpibot",
    "imagesiftbot",
    "omgili",
    "petalbot",
    "scrapy",
    "python-requests",
    "aiohttp",
    "go-http-client",
    "curl",
    "wget",
    "headlesschrome",
    "phantomjs",
  ],
};

function isAllowedBot(ua) {
  for (const p of BOT_UA_PATTERNS.allow) {
    if (!ua.includes(p)) continue;
    if (p === "applebot" && ua.includes("applebot-extended")) continue;
    return true;
  }
  return false;
}

/** True when the request should be charged. */
export function isChargeableBot(userAgent) {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  if (isAllowedBot(ua)) return false;
  return BOT_UA_PATTERNS.charge.some((p) => ua.includes(p));
}

/* ------------------------------------------------------------------ */
/* Always-free paths                                                   */
/* ------------------------------------------------------------------ */

const STATIC_EXT =
  /\.(?:css|js|mjs|map|json|txt|xml|webmanifest|png|jpe?g|gif|webp|avif|svg|ico|bmp|tiff?|woff2?|ttf|otf|eot|mp4|webm|mp3|wav|ogg|pdf)$/i;

export function isFreePath(pathname) {
  return (
    pathname === "/robots.txt" ||
    pathname === "/llms.txt" ||
    /^\/sitemap[^/]*\.xml$/i.test(pathname) ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/.well-known/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname === "/api" ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/fonts/") ||
    STATIC_EXT.test(pathname)
  );
}

/* ------------------------------------------------------------------ */
/* x402 server (lazy singleton, created on first bot request)          */
/* ------------------------------------------------------------------ */

class NextRequestAdapter {
  constructor(req) {
    this.req = req;
  }
  getHeader(name) {
    return this.req.headers.get(name) || undefined;
  }
  getMethod() {
    return this.req.method;
  }
  getPath() {
    return this.req.nextUrl.pathname;
  }
  getUrl() {
    return this.req.url;
  }
  getAcceptHeader() {
    return this.req.headers.get("accept") || "";
  }
  getUserAgent() {
    return this.req.headers.get("user-agent") || "";
  }
  getQueryParams() {
    const out = {};
    this.req.nextUrl.searchParams.forEach((v, k) => {
      const cur = out[k];
      out[k] = cur === undefined ? v : Array.isArray(cur) ? [...cur, v] : [cur, v];
    });
    return out;
  }
  getQueryParam(name) {
    const all = this.req.nextUrl.searchParams.getAll(name);
    return all.length === 0 ? undefined : all.length === 1 ? all[0] : all;
  }
}

let state = null; // { key, httpServer, ready: Promise|null, initialized, retryAt }

async function createFacilitatorClient(cfg) {
  if (cfg.cdpKeyId && cfg.cdpKeySecret) {
    // Coinbase CDP facilitator (authenticated) via the official helper.
    const { createFacilitatorConfig } = await import("@coinbase/x402");
    return new HTTPFacilitatorClient({
      ...createFacilitatorConfig(cfg.cdpKeyId, cfg.cdpKeySecret),
      timeoutMs: FACILITATOR_TIMEOUT_MS,
    });
  }
  return new HTTPFacilitatorClient({
    url: cfg.facilitatorUrl,
    timeoutMs: FACILITATOR_TIMEOUT_MS,
  });
}

async function getHttpServer(cfg) {
  const key = JSON.stringify([
    cfg.payTo,
    cfg.price,
    cfg.network,
    cfg.facilitatorUrl,
    cfg.cdpKeyId,
  ]);
  if (!state || state.key !== key) {
    const facilitator = await createFacilitatorClient(cfg);
    const resourceServer = new x402ResourceServer(facilitator).register(
      cfg.network,
      new ExactEvmScheme(),
    );
    const httpServer = new x402HTTPResourceServer(resourceServer, {
      "/*": {
        accepts: {
          scheme: "exact",
          price: cfg.price,
          network: cfg.network,
          payTo: cfg.payTo,
        },
        description: DESCRIPTION,
        mimeType: "text/html",
        // resource omitted -> defaults to the full request URL
      },
    });
    state = { key, httpServer, ready: null, initialized: false, retryAt: 0 };
  }

  if (!state.initialized) {
    if (Date.now() < state.retryAt) {
      throw new Error("x402 facilitator init backing off");
    }
    const s = state;
    s.ready ??= s.httpServer.initialize();
    try {
      await s.ready;
      s.initialized = true;
    } catch (err) {
      s.ready = null;
      s.retryAt = Date.now() + INIT_RETRY_MS;
      throw err;
    }
  }
  return state.httpServer;
}

function paymentRequiredResponse(instr) {
  const headers = new Headers(instr.headers || {});
  let body = instr.body;
  const encoded = headers.get("PAYMENT-REQUIRED");
  if (encoded) {
    // Expose the standard v2 PaymentRequired object as the JSON body too.
    try {
      body = decodePaymentRequiredHeader(encoded);
    } catch {
      /* keep library body */
    }
  }
  headers.set("Content-Type", "application/json");
  return new NextResponse(JSON.stringify(body ?? {}), {
    status: instr.status,
    headers,
  });
}

/**
 * Runs the paywall for a request.
 * Returns a NextResponse when the paywall decides the response (402, or
 * page + settlement header), or null to let the request through untouched.
 */
export async function x402BotPaywall(req) {
  const cfg = getPaywallConfig();
  if (!cfg.enabled) return null;
  if (isFreePath(req.nextUrl.pathname)) return null;
  if (!isChargeableBot(req.headers.get("user-agent"))) return null;

  try {
    const httpServer = await getHttpServer(cfg);
    const adapter = new NextRequestAdapter(req);
    let decodedPath = req.nextUrl.pathname;
    try {
      decodedPath = decodeURIComponent(decodedPath);
    } catch {
      /* keep raw */
    }
    const context = {
      adapter,
      path: req.nextUrl.pathname,
      decodedPath,
      method: req.method,
      paymentHeader:
        adapter.getHeader("payment-signature") || adapter.getHeader("x-payment"),
    };

    const result = await httpServer.processHTTPRequest(context);

    if (result.type === "no-payment-required") return null;
    if (result.type === "payment-error") return paymentRequiredResponse(result.response);

    // payment-verified -> settle, then serve the page with the settlement header.
    const settle = await httpServer.processSettlement(
      result.paymentPayload,
      result.paymentRequirements,
      result.declaredExtensions,
      { request: context, responseBody: Buffer.alloc(0), responseHeaders: {} },
      undefined,
      result.beforeHandlerSettlement,
    );
    if (!settle.success) return paymentRequiredResponse(settle.response);

    const res = NextResponse.next();
    for (const [k, v] of Object.entries(settle.headers || {})) res.headers.set(k, v);
    res.headers.set("Cache-Control", withPrivateCacheControl(res.headers.get("Cache-Control")));
    return res;
  } catch (err) {
    // FAIL OPEN: never break the site.
    console.error("[x402-bot-paywall] failing open:", err?.message || err);
    return null;
  }
}
