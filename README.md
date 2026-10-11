# Ritvik Thakur

**Student Developer & Founder** · New Jersey, USA
Full-stack developer · Founder of [OrbitBoyzz](https://github.com/orbitwebsites-cloud) · Top 1% TypeScript open-source contributor

📫 rrus3676@gmail.com · 🌐 [Portfolio](https://ritvik-portfolio-hazel.vercel.app) · 💻 [GitHub](https://github.com/orbitwebsites-cloud)

---

## About

I'm a high-school student who builds and ships real software — full-stack products, a from-scratch desktop game, and client websites through my web agency. I work across the stack: front-end interfaces, secure back-end APIs, databases, auth, payments, and deployment.

- 🟢 **142 open-source contributions** in the last year — **top 1% of TypeScript engineers** (Algora ranking)
- 💼 **Inbound recruiting** from Algora's Founder & CTO for senior backend roles at venture-backed startups (CodeRabbit, ComfyUI) in the $300k+ range
- 🚀 Founder of **OrbitBoyzz**, a web-design agency with paying local clients

## Tech

`TypeScript` · `JavaScript` · `Python` · `Java` · `React` · `Next.js` · `Tailwind CSS` · `Node.js` · `Supabase` · `PostgreSQL` · `Stripe` · `Vercel`

## Selected Projects

| Project | What it is | Stack | Links |
|--------|-----------|-------|-------|
| **MoodSpace** | Full-stack teen mental-wellness app — AI journaling, counselor analytics, Stripe Pro, JWT auth + RLS security | JS, Supabase, Gemini AI, Stripe | [Live](https://moodspace-lac.vercel.app) · [Code](https://github.com/orbitwebsites-cloud/moodspace) |
| **After the Tornado** | Top-down survival shooter — 100% procedural graphics + runtime audio, shipped as a single Windows .exe | Python, pygame-ce, PyInstaller | — |
| **OrbitBoyzz** | My web-design agency — hand-coded sites for local businesses, outreach → design → deploy | React, Tailwind, Framer Motion | — |
| **Slocum's Bowling Center** | Client website — responsive, component-driven, motion-enhanced | React, Tailwind, shadcn/ui | — |
| **Trust-OS** | Interactive dashboard prototype — node-based flows + live charts | Next.js, React Flow, Recharts | — |
| **AI Company Builder** | Agentic app-builder workspace with multi-provider model routing | Next.js, Groq, Cerebras | — |
| **OpenJarvis** | Personal AI assistant shared across browser + WhatsApp | TypeScript, Node, Baileys | — |

## This repo

The source for my portfolio site, built with **Next.js (App Router) + Tailwind CSS**, deployed on **Vercel**.

```bash
npm install
npm run dev   # http://localhost:3000
```

Project data lives in [`app/projects.js`](app/projects.js); identity/contact in the `ME` object atop [`app/page.js`](app/page.js).

### x402 bot paywall

Humans browse free. AI crawlers and scrapers (matched by User-Agent, see `BOT_UA_PATTERNS` in [`lib/x402-bot-paywall.js`](lib/x402-bot-paywall.js)) get `HTTP 402` with [x402](https://x402.org) payment requirements ($0.001 USDC on Base per request). If they pay, they get the page, plus a `PAYMENT-RESPONSE` settlement header. Search engines, link-preview bots, uptime monitors, `/robots.txt`, sitemaps, `/llms.txt`, `/.well-known/*`, static assets and `/api/*` are always free. Any error or facilitator outage fails open, so the page is served normally.

- Code: [`middleware.js`](middleware.js) (Node runtime) and [`lib/x402-bot-paywall.js`](lib/x402-bot-paywall.js), built on `@x402/core`, `@x402/evm` and `@coinbase/x402`
- Config: see [`.env.example`](.env.example). `X402_ENABLED=false` turns it off.
- Base mainnet needs `CDP_API_KEY_ID` + `CDP_API_KEY_SECRET` (Coinbase CDP facilitator). Without them, the paywall uses `X402_FACILITATOR_URL` (default `https://x402.org/facilitator`, which supports testnets only), so on mainnet it fails open.
- Quick check: `curl -i -A GPTBot http://localhost:3000/` should return 402.

---

© Ritvik Thakur
