// Project data — single source of truth for the portfolio grid.
// Ordered strongest / most-finished first.

export const projects = [
  {
    name: "MoodSpace",
    type: "Full-Stack Product",
    year: "2026",
    tagline: "A private daily mental-health check-in app for high school students.",
    description:
      "Full-stack wellness app: students log a mood, journal, and get warm AI support from Gemini, while a counselor dashboard surfaces anonymized, aggregate signal for schools. Built in 24 hours for a hackathon, then hardened into a real product — JWT-secured API routes, Supabase Row-Level Security, Stripe Pro subscriptions, and streak tracking.",
    tech: ["JavaScript", "Supabase", "Gemini AI", "Stripe", "Vercel"],
    highlights: [
      "JWT auth + Supabase RLS on every endpoint",
      "Stripe webhook signature verification",
      "Anonymized counselor analytics dashboard",
    ],
    links: [
      { label: "Live site", href: "https://moodspace-lac.vercel.app" },
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/moodspace" },
    ],
    featured: true,
  },
  {
    name: "GreenLedger",
    type: "Hackathon · OrionHackathon 2026",
    year: "2026",
    tagline: "Offline OCR agent that turns receipts into a household carbon footprint.",
    description:
      "An offline agent that OCRs grocery and utility receipts, classifies line items, and estimates household carbon footprint over time — no cloud OCR, no paid API keys, works fully on-device.",
    tech: ["Python", "OCR"],
    highlights: ["Fully offline pipeline", "Zero paid API dependencies"],
    links: [
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/greenledger-carbon-agent" },
    ],
    featured: false,
  },
  {
    name: "StudyLoop",
    type: "Hackathon · Code for Humanity",
    year: "2026",
    tagline: "Offline PDF-to-flashcards with spaced repetition.",
    description:
      "Turns any PDF into flashcards and schedules review with the SM-2 spaced-repetition algorithm, running fully offline so it works without reliable internet access. Built for the Code for Humanity Devpost hackathon.",
    tech: ["Python", "SM-2 algorithm"],
    highlights: ["Offline PDF-to-flashcard pipeline", "SM-2 spaced repetition"],
    links: [
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/studyloop-flashcards" },
    ],
    featured: false,
  },
  {
    name: "SchemaSense",
    type: "Hackathon · Evorozen Apex",
    year: "2026",
    tagline: "Ask a SQLite database plain-English questions.",
    description:
      "Ask a SQLite database a question in plain English and get back the answer plus an ER diagram highlighting exactly which tables and relationships were used to derive it. Built for the Evorozen Apex: NextGen AI Buildathon.",
    tech: ["Python", "SQLite", "ER diagramming"],
    highlights: ["NL-to-SQL with explainable joins", "Auto-generated ER diagrams"],
    links: [
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/schemasense-db-explorer" },
    ],
    featured: false,
  },
  {
    name: "DevRadar",
    type: "Hackathon · Code Carnage 2026",
    year: "2026",
    tagline: "Static-analysis security scanner with plain-English fixes.",
    description:
      "Finds common misconfigurations via static analysis, explains each one in plain English, and drafts a real fix — with zero paid API keys required.",
    tech: ["Python", "Static analysis"],
    highlights: ["Plain-English vulnerability explanations", "Zero paid API keys"],
    links: [
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/devradar-security-agent" },
    ],
    featured: false,
  },
  {
    name: "Inference Orchestrator",
    type: "Hackathon · AI Infra Summit",
    year: "2026",
    tagline: "Cost/latency/quality-aware LLM request router.",
    description:
      "An auto-scaling inference orchestrator that routes LLM requests across providers based on live cost, latency, and quality signals. Built for the AI Infra Summit Hackathon.",
    tech: ["JavaScript", "LLM routing"],
    highlights: ["Multi-provider auto-scaling router", "Cost/latency/quality-aware routing"],
    links: [
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/inference-orchestrator" },
    ],
    featured: false,
  },
  {
    name: "DataHub SQL Agent",
    type: "Hackathon",
    year: "2026",
    tagline: "Metadata-aware SQL agent with lineage explanation.",
    description:
      "A natural-language-to-SQL agent that explains query results with DataHub-shaped data lineage and flags anomalies — no paid API keys required.",
    tech: ["Python", "SQL", "Data lineage"],
    highlights: ["NL-to-SQL", "Lineage-aware anomaly flagging"],
    links: [
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/datahub-sql-agent" },
    ],
    featured: false,
  },
  {
    name: "Agentic Supply Chain Optimizer",
    type: "Hackathon · AI Genesis 2026",
    year: "2026",
    tagline: "Autonomous reroute/renegotiation agent for supply chains.",
    description:
      "Pulls live free weather and news signals into a rule-based risk engine, then an autonomous agent reroutes or renegotiates shipments in response — visualized on a real-time Streamlit dashboard. Built for AI Genesis 2026.",
    tech: ["Python", "Streamlit"],
    highlights: ["Live weather/news risk signals", "Autonomous reroute/renegotiation agent", "Real-time dashboard"],
    links: [
      { label: "Code", href: "https://github.com/orbitwebsites-cloud/agentic-supply-chain-optimizer" },
    ],
    featured: false,
  },
  {
    name: "After the Tornado",
    type: "Game",
    year: "2026",
    tagline: "A top-down survival shooter with zero external assets.",
    description:
      "A complete desktop game in Python + pygame-ce. Every sprite is drawn procedurally and every sound is synthesized at runtime, so it runs anywhere and can never crash on a missing file. Packaged into a single ~27 MB Windows .exe with PyInstaller — double-click and play, no install.",
    tech: ["Python", "pygame-ce", "PyInstaller"],
    highlights: [
      "100% procedural graphics + runtime audio synthesis",
      "Single-file distributable .exe",
      "Waypoint-driven objective system",
    ],
    links: [],
    featured: true,
  },
  {
    name: "OrbitBoyzz",
    type: "Founder · Web Agency",
    year: "2025 — present",
    tagline: "A web-design agency building hand-coded sites for local businesses.",
    description:
      "My web agency. I find local New Jersey businesses that lack a real web presence and build them fast, modern, hand-coded websites — no page-builders. Runs the full pipeline from outreach to design, build, and deployment on Vercel. The agency's own site is built in React + Tailwind with Framer Motion.",
    tech: ["React", "Tailwind CSS", "Framer Motion", "Vercel"],
    highlights: [
      "End-to-end: outreach → design → build → deploy",
      "Hand-coded, performance-first sites",
      "Spec client sites (Slocum's Bowling Center)",
    ],
    links: [],
    featured: true,
  },
  {
    name: "Slocum's Bowling Center",
    type: "Client Website",
    year: "2026",
    tagline: "A modern, responsive site for a local bowling center.",
    description:
      "A spec site built through OrbitBoyzz — a clean, responsive marketing site for a local bowling center, built on a component-driven design system with shadcn/ui and smooth motion.",
    tech: ["React", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    highlights: [
      "Component-driven design system",
      "Fully responsive, motion-enhanced UI",
      "Concept build — spec site for a local business",
    ],
    spec: true,
    links: [],
    featured: true,
  },
  {
    name: "Trust-OS",
    type: "Prototype",
    year: "2026",
    tagline: "An interactive dashboard concept for trust & data flows.",
    description:
      "A Next.js dashboard prototype exploring node-based flow visualization (React Flow), live charts (Recharts), and lightweight client state with Zustand. A sandbox for interactive data-heavy UI patterns.",
    tech: ["Next.js", "React Flow", "Recharts", "Zustand"],
    highlights: ["Node-based flow canvas", "Real-time data viz"],
    links: [],
    featured: false,
  },
  {
    name: "AI Company Builder",
    type: "Prototype",
    year: "2026",
    tagline: "An agentic app-builder workspace.",
    description:
      "A Next.js workspace for an agentic app builder, with a provider-router design over fast inference backends (Groq, Cerebras) and a health-checked API layer. An experiment in agent orchestration and model routing.",
    tech: ["Next.js", "React", "Groq", "Cerebras"],
    highlights: ["Multi-provider model routing", "Agentic build workflow"],
    links: [],
    featured: false,
  },
  {
    name: "OpenJarvis",
    type: "Prototype",
    year: "2026",
    tagline: "A personal AI assistant shared across browser + WhatsApp.",
    description:
      "A zero-cost assistant hub that keeps one shared conversation store and is reachable from both a PC browser and WhatsApp (via Baileys), with pluggable model adapters so different AI backends share the same reply flow.",
    tech: ["TypeScript", "Node.js", "Baileys"],
    highlights: ["Shared context across channels", "Pluggable model adapters"],
    links: [],
    featured: false,
  },
];
