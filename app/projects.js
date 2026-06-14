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
      "Real paying local clients",
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
      "A client website delivered through OrbitBoyzz — a clean, responsive marketing site for a local bowling center, built on a component-driven design system with shadcn/ui and smooth motion. Shipped and client-ready.",
    tech: ["React", "Tailwind CSS", "shadcn/ui", "Framer Motion"],
    highlights: [
      "Component-driven design system",
      "Fully responsive, motion-enhanced UI",
      "Delivered to a real client",
    ],
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
