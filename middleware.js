import { NextResponse } from "next/server";
import { x402BotPaywall } from "./lib/x402-bot-paywall";

// Humans pass straight through (UA check only). AI crawlers/scrapers get an
// x402 402 unless they pay. See lib/x402-bot-paywall.js and README.
export async function middleware(req) {
  const paid = await x402BotPaywall(req);
  return paid ?? NextResponse.next();
}

export const config = {
  // Node runtime: the x402 / CDP libraries need Node APIs (Buffer, crypto).
  runtime: "nodejs",
  // Skip static assets and always-free paths (also enforced in code).
  matcher: [
    "/((?!_next/static|_next/image|api/|\\.well-known/|favicon|robots\\.txt|llms\\.txt|sitemap[^/]*\\.xml|.*\\.(?:css|js|map|png|jpe?g|gif|webp|avif|svg|ico|woff2?|ttf|otf|eot)$).*)",
  ],
};
