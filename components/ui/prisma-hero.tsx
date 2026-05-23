"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- ShutterName ---------------- */
const ShutterName = ({ text }: { text: string }) => {
  const [key, setKey] = useState(0);
  const chars = text.split("");

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        className="flex flex-wrap items-end"
        onClick={() => setKey((k) => k + 1)}
        style={{ cursor: "default" }}
      >
        {chars.map((char, i) => (
          <div key={i} className="relative overflow-hidden">
            {/* Main character — blur fade in */}
            <motion.span
              initial={{ opacity: 0, filter: "blur(12px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: i * 0.04 + 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block font-medium leading-[0.85] tracking-[-0.07em] text-white text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
            >
              {char}
            </motion.span>

            {/* Top slice — sweeps right */}
            <motion.span
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: i * 0.04, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 block font-medium leading-[0.85] tracking-[-0.07em] text-white/60 text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)" }}
            >
              {char}
            </motion.span>

            {/* Middle slice — sweeps left */}
            <motion.span
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "-100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: i * 0.04 + 0.1, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 block font-medium leading-[0.85] tracking-[-0.07em] text-white/40 text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              style={{ clipPath: "polygon(0 33%, 100% 33%, 100% 66%, 0 66%)" }}
            >
              {char}
            </motion.span>

            {/* Bottom slice — sweeps right */}
            <motion.span
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.65, delay: i * 0.04 + 0.2, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 block font-medium leading-[0.85] tracking-[-0.07em] text-white/60 text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              style={{ clipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)" }}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

/* ---------------- Hero ---------------- */
const PrismaHero = () => {
  return (
    <section className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-near-black/30 via-transparent to-near-black/70" />

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 pl-8 pr-4 pb-2">
          <div className="flex flex-col">

            {/* Description + CTA */}
            <div className="flex flex-col gap-5 pb-6 pl-2 max-w-sm lg:max-w-md 2xl:pl-10">

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/70 text-xs leading-[1.5] sm:text-sm md:text-base"
              >
                Frontend developer & UI designer crafting thoughtful digital
                experiences. Focused on clean code, bold visuals, and interfaces
                that feel as good as they look.
              </motion.p>

              <motion.a
                href="#work"
                aria-label="See my work"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="group inline-flex items-center gap-2 self-start rounded-full border border-white py-1 pl-5 pr-1 text-sm font-medium bg-white text-black transition-all hover:gap-3 sm:text-base"
              >
                See my work
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-black" />
                </span>
              </motion.a>

            </div>

            {/* Full-width display name */}
            <h1>
              <ShutterName text="Mohamed" />
            </h1>

          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
