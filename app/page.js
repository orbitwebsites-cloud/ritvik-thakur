"use client";

import { useEffect, useRef } from "react";
import { projects } from "./projects";

// ---- contact / identity (edit these freely) ----
const ME = {
  name: "Ritvik Thakur",
  role: "Student Developer & Founder",
  location: "New Jersey, USA",
  email: "rrus3676@gmail.com",
  github: "https://github.com/orbitwebsites-cloud",
};

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal") ?? [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function ArrowUpRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="reveal group flex flex-col rounded-2xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:border-neutral-300 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.12)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-xs font-medium uppercase tracking-wider text-accent">
          {p.type}
        </span>
        <span className="text-xs text-neutral-400">{p.year}</span>
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
      <p className="mt-1 text-[15px] font-medium text-neutral-500">{p.tagline}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
        {p.description}
      </p>

      {p.highlights?.length > 0 && (
        <ul className="mt-5 space-y-1.5">
          {p.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-sm text-neutral-600"
            >
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
              {h}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-600"
          >
            {t}
          </span>
        ))}
      </div>

      {p.links?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-4 border-t border-neutral-100 pt-5">
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
            >
              {l.label}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Home() {
  const ref = useReveal();
  const featured = projects.filter((p) => p.featured);
  const experiments = projects.filter((p) => !p.featured);

  return (
    <main ref={ref}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/80 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between">
          <a href="#top" className="text-[15px] font-semibold tracking-tight">
            Ritvik Thakur
          </a>
          <nav className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="#work" className="hidden hover:text-ink sm:block">
              Work
            </a>
            <a href="#about" className="hidden hover:text-ink sm:block">
              About
            </a>
            <a
              href="#contact"
              className="rounded-full bg-ink px-4 py-1.5 font-medium text-white transition-colors hover:bg-neutral-700"
            >
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="container-page pt-24 pb-20 sm:pt-32 sm:pb-28">
        <p className="animate-rise text-sm font-medium text-accent">
          {ME.role}
        </p>
        <h1 className="mt-4 max-w-3xl animate-rise text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          I build full-stack products, ship client websites, and make games.
        </h1>
        <p className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-neutral-600">
          I&apos;m {ME.name} — a student developer and the founder of{" "}
          <span className="font-medium text-ink">OrbitBoyzz</span>, a web
          agency. I like taking an idea from a blank folder to a live, secure,
          production app — and I ship.
        </p>
        <div className="mt-9 flex animate-rise flex-wrap items-center gap-4">
          <a
            href="#work"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
          >
            See my work
          </a>
          <a
            href={`mailto:${ME.email}`}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
          >
            Get in touch
            <ArrowUpRight />
          </a>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-10 gap-y-3 border-t border-neutral-100 pt-8 text-sm text-neutral-500">
          <span>
            <span className="font-semibold text-ink">{projects.length}</span>{" "}
            projects shipped
          </span>
          <span>
            <span className="font-semibold text-ink">142</span> OSS
            contributions / yr
          </span>
          <span>
            <span className="font-semibold text-ink">Founder</span> · OrbitBoyzz
          </span>
          <span>
            Based in <span className="font-semibold text-ink">{ME.location}</span>
          </span>
        </div>
      </section>

      {/* Featured work */}
      <section id="work" className="container-page py-16">
        <div className="reveal mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Selected Work
            </h2>
            <p className="mt-2 text-neutral-500">
              Finished, shipped, and running in the real world.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {featured.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </section>

      {/* Experiments */}
      <section className="container-page py-16">
        <div className="reveal mb-10">
          <h2 className="text-2xl font-semibold tracking-tight">
            Experiments & Prototypes
          </h2>
          <p className="mt-2 text-neutral-500">
            Things I&apos;m exploring — agents, dashboards, and assistants.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {experiments.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className="container-page py-16">
        <div className="reveal rounded-3xl border border-neutral-200 bg-neutral-50 px-8 py-12 sm:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Open Source
              </h2>
              <p className="mt-2 text-neutral-500">
                I build in public and contribute to other developers&apos;
                codebases.
              </p>
            </div>
            <a
              href={ME.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-accent"
            >
              View contributions on GitHub
              <ArrowUpRight />
            </a>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { big: "142", small: "contributions in the last year" },
              { big: "Top 1%", small: "TypeScript engineers (Algora)" },
              { big: "4+", small: "languages used in the open" },
              { big: "Weekly", small: "active, including weekends" },
            ].map((s) => (
              <div
                key={s.small}
                className="rounded-2xl border border-neutral-200 bg-white p-5"
              >
                <div className="text-3xl font-semibold tracking-tight text-ink">
                  {s.big}
                </div>
                <div className="mt-1 text-sm leading-snug text-neutral-500">
                  {s.small}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["TypeScript", "Scala", "C++", "Python"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              Inbound recruiting
            </div>
            <p className="mt-2 text-[15px] leading-relaxed text-neutral-700">
              On the strength of my open-source profile, Algora&apos;s Founder
              &amp; CTO reached out about senior backend engineering roles at
              venture-backed startups — including{" "}
              <span className="font-medium text-ink">CodeRabbit</span> (Series
              C, $1B+ valuation) and{" "}
              <span className="font-medium text-ink">ComfyUI</span> (100k+
              GitHub stars) — in the $300k+ range.
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="container-page py-20">
        <div className="reveal grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr]">
          <h2 className="text-2xl font-semibold tracking-tight">About</h2>
          <div className="space-y-5 text-lg leading-relaxed text-neutral-600">
            <p>
              I&apos;m a high-school student who builds real software. I taught
              myself to code by shipping — a hackathon mental-health app that
              became a live product, a desktop game written from scratch in
              Python, and a web agency with paying clients.
            </p>
            <p>
              I work across the stack: front-end interfaces, secure back-end
              APIs, databases and auth, payments, and deployment. I care about
              security and details — JWT auth, row-level security, signed
              webhooks — not just making things that look good, but making
              things that hold up.
            </p>
            <p>
              Beyond my own projects, I&apos;m an active open-source
              contributor —{" "}
              <span className="font-medium text-ink">
                142 contributions in the last year
              </span>{" "}
              across repositories in TypeScript, Scala, C++, and Python, which
              puts me in the{" "}
              <span className="font-medium text-ink">
                top 1% of TypeScript engineers
              </span>{" "}
              by Algora&apos;s ranking. Working in public taught me to read
              large unfamiliar codebases, follow contribution guidelines, and
              write code other people have to maintain.
            </p>
            <p>
              Right now I&apos;m growing{" "}
              <span className="font-medium text-ink">OrbitBoyzz</span> and
              building products on the side.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="container-page py-24"
      >
        <div className="reveal rounded-3xl border border-neutral-200 bg-neutral-50 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&apos;s build something.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
            Open to internships, collaborations, and freelance website work for
            your business.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${ME.email}`}
              className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              {ME.email}
            </a>
            <a
              href={ME.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-ink hover:border-neutral-400"
            >
              GitHub
              <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-100">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-8 text-sm text-neutral-400 sm:flex-row">
          <span>© {new Date().getFullYear()} Ritvik Thakur</span>
          <span>Built with Next.js &amp; Tailwind · Deployed on Vercel</span>
        </div>
      </footer>
    </main>
  );
}
