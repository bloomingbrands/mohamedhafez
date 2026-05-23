"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";

const tools = [
  { name: "React",          category: "Frontend"     },
  { name: "Next.js",        category: "Frontend"     },
  { name: "TypeScript",     category: "Language"     },
  { name: "JavaScript",     category: "Language"     },
  { name: "Tailwind CSS",   category: "Frontend"     },
  { name: "Framer Motion",  category: "Frontend"     },
  { name: "Node.js",        category: "Backend"      },
  { name: "Express",        category: "Backend"      },
  { name: "Prisma",         category: "Backend"      },
  { name: "MySQL",          category: "Database"     },
  { name: "PostgreSQL",     category: "Database"     },
  { name: "MongoDB",        category: "Database"     },
  { name: "AWS",            category: "DevOps"       },
  { name: "Azure",          category: "DevOps"       },
  { name: "Docker",         category: "DevOps"       },
  { name: "Vercel",         category: "DevOps"       },
  { name: "OpenAI",         category: "AI"           },
  { name: "Anthropic",      category: "AI"           },
  { name: "DeepSeek",       category: "AI"           },
  { name: "Hedera",         category: "Blockchain"   },
  { name: "JWT",            category: "Auth"         },
  { name: "OAuth 2.0",      category: "Auth"         },
  { name: "Okta",           category: "Auth"         },
  { name: "PowerShell",     category: "Scripting"    },
  { name: "Bash",           category: "Scripting"    },
  { name: "Git",            category: "Tools"        },
  { name: "Figma",          category: "Tools"        },
];

const categories = [
  "Frontend",
  "Language",
  "Backend",
  "Database",
  "DevOps",
  "AI",
  "Blockchain",
  "Auth",
  "Scripting",
  "Tools",
];

export default function FeatureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full overflow-hidden bg-[#060606]">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-6xl px-6 py-32 md:px-12 md:py-40 lg:px-16"
      >
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-widest text-white/30 font-medium"
          >
            Toolbox
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            What I{" "}
            <span className="text-white/25">Use</span>
          </motion.h2>
        </div>

        {/* AI + Blockchain callouts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-4 sm:grid-cols-2"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">AI Integrations</p>
            <h4 className="text-lg font-bold text-white mb-2">Shipped AI agents to production</h4>
            <p className="text-sm leading-relaxed text-white/45">
              Built real-time chat agents powered by OpenAI, Anthropic, and DeepSeek — with custom prompts, conversation memory, contextual routing, and full UI/UX integration. Not demos. Live, client-facing features.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">Blockchain</p>
            <h4 className="text-lg font-bold text-white mb-2">Immutable records on Hedera</h4>
            <p className="text-sm leading-relaxed text-white/45">
              Integrated Hedera public distributed ledger into a production ERP platform — anchoring business transactions to an immutable, tamper-proof chain. A real-world breakthrough into what blockchain actually enables.
            </p>
          </div>
        </motion.div>

        {/* Tool grid */}
        <div className="mb-24 space-y-5">
          {categories.map((cat, catIdx) => {
            const items = tools.filter((t) => t.category === cat);
            if (!items.length) return null;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIdx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-baseline gap-x-5 gap-y-2"
              >
                <span className="w-24 shrink-0 text-[10px] font-mono tracking-widest text-white/20 uppercase">
                  {cat}
                </span>
                <div className="flex flex-wrap gap-2">
                  {items.map((tool) => (
                    <span
                      key={tool.name}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm text-white/55 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white/90"
                    >
                      {tool.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-7 border-t border-white/10 pt-14"
        >
          <p className="text-xs uppercase tracking-widest text-white/30 font-medium">
            Open to opportunities
          </p>
          <h3 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Available for freelance, consulting, full-time, or creative collaborations.
          </h3>
          <p className="max-w-md text-sm leading-relaxed text-white/40">
            Looking for a developer who brings infrastructure depth to the frontend — and ships AI agents, blockchain integrations, and production-grade web apps? Let&apos;s talk.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-white px-6 text-[#060606] hover:bg-white/90"
            >
              <Link href="mailto:mohamedhafez@outlook.com">Hire Me</Link>
            </Button>
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/40 hover:bg-white/5 hover:text-white"
            >
              <Download className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              Download Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
