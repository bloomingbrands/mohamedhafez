"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    index: "01",
    name: "On Target Brands",
    domain: "ontargeterp.netlify.app",
    url: "https://ontargeterp.netlify.app",
    description:
      "AI-powered ERP platform — orders, invoices, and transactions anchored to the Hedera blockchain. Immutable records. No manipulation. Integrates OpenAI, Anthropic, and DeepSeek for intelligent front-store generation.",
    tags: ["Next.js", "Prisma", "MySQL", "Hedera", "OpenAI", "Anthropic", "DeepSeek", "JWT"],
    status: "live" as const,
  },
  {
    index: "02",
    name: "Blooming Brands",
    domain: "blooming-brands.com",
    url: "https://blooming-brands.com",
    description:
      "Brand identity and digital presence for growing businesses. Fast, responsive, built to convert.",
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    status: "live" as const,
  },
  {
    index: "03",
    name: "Nodes Unlimited",
    domain: "nodesunlimited.com",
    url: "https://nodesunlimited.com",
    description:
      "Node.js development agency — scalable APIs, backend systems, and full-stack web applications.",
    tags: ["Next.js", "Node.js", "Express", "TypeScript", "REST APIs"],
    status: "live" as const,
  },
  {
    index: "04",
    name: "Prestige Worldwide Limos",
    domain: "glittering-biscuit-572c74.netlify.app",
    url: "https://glittering-biscuit-572c74.netlify.app",
    description:
      "Luxury limousine company website — elegant design built to convert visitors into bookings. Fast, responsive, and built to reflect the premium brand experience.",
    tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    status: "live" as const,
  },
  {
    index: "05",
    name: "Sword Circle Pen",
    domain: "swordcirclepen.com",
    url: "https://swordcirclepen.com",
    description: "Something new. Currently being built.",
    tags: ["Next.js", "React", "TypeScript"],
    status: "in-progress" as const,
  },
];

export function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="relative w-full bg-[#080808]">
      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay" />

      <div className="relative mx-auto max-w-6xl px-6 py-32 md:px-12 lg:px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-widest text-white/30 font-medium"
          >
            Selected Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Projects I&apos;ve{" "}
            <span className="text-white/25">Built</span>
          </motion.h2>
        </div>

        {/* Project list */}
        <div className="border-t border-white/10">
          {projects.map((project, i) => (
            <ProjectRow key={project.index} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const isLive = project.status === "live";

  const inner = (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative border-b border-white/10 py-10 md:py-12 transition-colors duration-300 ${
        isLive ? "cursor-pointer hover:bg-white/[0.025]" : ""
      }`}
    >
      {/* Background index number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-black text-white/[0.04] font-mono leading-none text-[5rem] md:text-[7rem] lg:text-[8rem]"
      >
        {project.index}
      </span>

      <div className="relative flex items-start justify-between gap-6 md:items-center">
        {/* Left: name + meta */}
        <div className="min-w-0 flex-1">
          {/* Name row */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <h3 className="text-2xl font-bold text-white/75 transition-colors duration-200 group-hover:text-white sm:text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight">
              {project.name}
            </h3>
            {project.status === "in-progress" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest text-amber-400/70">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400/70" />
                In Progress
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/40 md:text-base">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
            {project.tags.map((tag, ti) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-white/25 uppercase tracking-wider">
                  {tag}
                </span>
                {ti < project.tags.length - 1 && (
                  <span className="h-px w-2 bg-white/10" />
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Right: domain + arrow */}
        {isLive ? (
          <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
            <span className="text-xs font-mono text-white/25 transition-colors duration-200 group-hover:text-white/50">
              {project.domain}
            </span>
            <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/60" />
          </div>
        ) : (
          <div className="hidden shrink-0 sm:block">
            <span className="text-xs font-mono text-white/20">{project.domain}</span>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (isLive) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block">
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}
