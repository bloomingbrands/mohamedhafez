"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const milestones = [
  {
    year: "2016",
    title: "Enterprise Roots",
    description:
      "Exchange migrations at Microsoft. Automation via PowerShell. The moment scripting stopped feeling like a shortcut and started feeling like craft.",
  },
  {
    year: "2019",
    title: "Infrastructure at Scale",
    description:
      "Led 14+ IT acquisition projects coast to coast at OneDigital — network cutovers, cloud migrations, and the discipline of zero-downtime handoffs.",
  },
  {
    year: "2022",
    title: "Full-Spectrum Engineering",
    description:
      "Network Systems Engineer at Cisco. Endpoint management at Karuna Therapeutics. Saw the full picture: hardware, cloud identity, and the APIs binding it all together.",
  },
  {
    year: "2023",
    title: "The Code Switch",
    description:
      "Shipped first production Next.js apps. Built AI-powered chat agents on OpenAI. Systems thinking met frontend craft, and nothing was ever the same.",
  },
  {
    year: "2024",
    title: "Builder Mode",
    description:
      "Launched ontargetbrands.com — an AI-powered ERP anchored to the Hedera blockchain for immutable, tamper-proof business records. Real clients. Real production.",
  },
  {
    year: "2025",
    title: "Now",
    description:
      "Senior contracts by day, builder by night. Crafting production-grade web experiences at the intersection of infrastructure depth and frontend craft.",
  },
];

const COUNT = milestones.length;

export function JourneySection() {
  // Ratchets upward only — once a stop is lit it stays lit
  const [reachedIndex, setReachedIndex] = useState(-1);

  const handleReached = useCallback((index: number) => {
    setReachedIndex((prev) => Math.max(prev, index));
  }, []);

  // The lit line fills from 0 → the active dot's position along the track.
  // (reachedIndex / (COUNT - 1)) maps [0 … COUNT-1] → [0% … 100%].
  const lineProgress =
    reachedIndex < 0 ? 0 : (reachedIndex / (COUNT - 1)) * 100;

  return (
    <section className="relative w-full bg-[#080808]">
      <div className="relative mx-auto max-w-6xl px-6 py-32 md:px-12 lg:px-16">
        {/* Section header */}
        <div className="mb-24">
          <p className="text-xs uppercase tracking-widest text-white/30 font-medium">
            The Journey
          </p>
          <h2 className="mt-2 text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl">
            How I Got{" "}
            <span className="text-white/40">Here</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Dim track — always full height */}
          <div className="absolute left-[19px] top-0 h-full w-[2px] bg-white/[0.07] md:left-1/2 md:-translate-x-px" />

          {/* Lit fill — grows to the active dot */}
          <motion.div
            className="absolute left-[19px] top-0 w-[2px] md:left-1/2 md:-translate-x-px"
            animate={{
              height: `${lineProgress}%`,
              boxShadow:
                lineProgress > 0
                  ? "0 0 8px 2px rgba(255,255,255,0.25)"
                  : "none",
            }}
            style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          />

          {milestones.map((m, i) => (
            <TimelineItem
              key={m.year}
              milestone={m}
              index={i}
              isLast={i === COUNT - 1}
              isActive={i === reachedIndex}
              isPast={i < reachedIndex}
              onReached={handleReached}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  milestone,
  index,
  isLast,
  isActive,
  isPast,
  onReached,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isLast: boolean;
  isActive: boolean;
  isPast: boolean;
  onReached: (index: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  // Fire once when this item scrolls into the upper-center of the viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onReached(index);
      },
      // Detection band: 25% from top, 55% from bottom → fires when
      // the item is in the top ~20% of the visible viewport
      { rootMargin: "-25% 0px -55% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index, onReached]);

  return (
    <div ref={ref} className={isLast ? "" : "mb-20 md:mb-28"}>
      {/* Mobile: left-aligned */}
      <div className="flex items-start gap-5 md:hidden">
        <TimelineDot isActive={isActive} isPast={isPast} />
        <MilestoneCard milestone={milestone} align="left" isActive={isActive} isPast={isPast} />
      </div>

      {/* Desktop: alternating sides */}
      <div className="hidden md:grid md:grid-cols-[1fr_3rem_1fr] md:items-start">
        <div className="flex justify-end pr-10">
          {isLeft && (
            <MilestoneCard milestone={milestone} align="right" isActive={isActive} isPast={isPast} />
          )}
        </div>
        <div className="flex justify-center pt-1">
          <TimelineDot isActive={isActive} isPast={isPast} />
        </div>
        <div className="pl-10">
          {!isLeft && (
            <MilestoneCard milestone={milestone} align="left" isActive={isActive} isPast={isPast} />
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineDot({
  isActive,
  isPast,
}: {
  isActive: boolean;
  isPast: boolean;
}) {
  return (
    <motion.div
      className="relative z-10 mt-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-[#080808] md:mt-0"
      animate={{
        borderColor: isActive
          ? "rgba(255,255,255,0.75)"
          : isPast
            ? "rgba(255,255,255,0.3)"
            : "rgba(255,255,255,0.1)",
        boxShadow: isActive
          ? "0 0 0 6px rgba(255,255,255,0.06), 0 0 20px rgba(255,255,255,0.2)"
          : "none",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.span
        className="rounded-full"
        animate={{
          width: isActive ? 10 : isPast ? 7 : 4,
          height: isActive ? 10 : isPast ? 7 : 4,
          backgroundColor: isActive
            ? "rgba(255,255,255,1)"
            : isPast
              ? "rgba(255,255,255,0.5)"
              : "rgba(255,255,255,0.15)",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
}

function MilestoneCard({
  milestone,
  align,
  isActive,
  isPast,
}: {
  milestone: (typeof milestones)[0];
  align: "left" | "right";
  isActive: boolean;
  isPast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Entrance fires once; after that, opacity is driven by active/past state
  const hasEntered = useInView(ref, { once: true, margin: "-5% 0px -5% 0px" });

  return (
    <motion.div
      ref={ref}
      className={align === "right" ? "text-right" : "text-left"}
      animate={{
        y: hasEntered ? 0 : 32,
        filter: hasEntered ? "blur(0px)" : "blur(8px)",
        opacity: hasEntered
          ? isActive
            ? 1
            : isPast
              ? 0.45
              : 0.2
          : 0,
      }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono tracking-widest text-white/50 uppercase sm:text-xs">
        {milestone.year}
      </span>
      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">
        {milestone.title}
      </h3>
      <p
        className={`mt-2 text-sm leading-relaxed text-white/50 sm:text-base max-w-sm ${
          align === "right" ? "ml-auto" : ""
        }`}
      >
        {milestone.description}
      </p>
    </motion.div>
  );
}
