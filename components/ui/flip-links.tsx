"use client";

import React from "react";
import { Download } from "lucide-react";

const links = [
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/mnhafez1978" },
  { label: "Github",    href: "https://github.com/mhafez1978" },
  { label: "X",         href: "https://x.com/jamstack_blocks" },
];

export const FlipLinks = () => {
  return (
    <section className="grid place-content-center gap-1 bg-[#0a0a0a] w-full py-24 px-8">
      <p className="text-xs uppercase tracking-widest text-white/30 mb-4 font-medium text-center">
        Find me online
      </p>
      {links.map(({ label, href }) => (
        <FlipLink key={label} href={href}>
          {label}
        </FlipLink>
      ))}

      {/* Resume Download */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="h-px w-12 bg-white/10" />
        <a
          href="/resume.pdf"
          download
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white hover:bg-white/5"
        >
          <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          Download Resume
        </a>
        <p className="text-[10px] text-white/20 font-mono">
          PDF &middot; Last updated 2025
        </p>
      </div>
    </section>
  );
};

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden whitespace-nowrap text-6xl font-black uppercase text-white/20 hover:text-white transition-colors duration-300 sm:text-7xl md:text-8xl lg:text-9xl mx-auto"
      style={{ lineHeight: 0.82 }}
    >
      <div className="flex">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex text-white">
        {children.split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </a>
  );
};
