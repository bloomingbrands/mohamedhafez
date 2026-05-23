"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "About",    id: "about"    },
  { label: "Work",     id: "work"     },
  { label: "Projects", id: "projects" },
  { label: "Skills",   id: "skills"   },
  { label: "Contact",  id: "contact"  },
];

export function Navbar() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-35% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div className="flex items-center gap-5 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 shadow-lg backdrop-blur-md sm:gap-7 md:gap-10 md:px-7 lg:gap-12">
        {navItems.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`relative text-[10px] font-medium uppercase tracking-widest transition-colors duration-200 sm:text-xs ${
              active === id ? "text-white" : "text-white/45 hover:text-white/75"
            }`}
          >
            {label}
            {active === id && (
              <span className="absolute -bottom-1 left-0 right-0 h-px rounded-full bg-white/50" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
