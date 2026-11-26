"use client";

import { useEffect, useRef } from "react";
import site from "@/site.config";
import { TALL_QUERY, clamp, kick, pageTop, reducedMotion, step, subscribe } from "@/lib/frame";
import { drive, gateParts } from "@/lib/gate";

/**
 * First screen: the sheet arrives folded shut, cover up, and sits ajar.
 * Scrolling opens the gatefold; the stage holds still until the spread lies flat.
 */
export default function Hero({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const hint = hintRef.current!;
    const parts = gateParts(section.querySelector("[data-gate]") as HTMLElement);
    const tallQuery = window.matchMedia(TALL_QUERY);
    let tall = tallQuery.matches;

    if (reducedMotion()) {
      section.dataset.still = "";
      drive(parts, 1, tall);
      return;
    }

    let top = 0;
    let travel = 1;
    const measure = () => {
      top = pageTop(section);
      travel = Math.max(1, section.offsetHeight - stage.offsetHeight);
      tall = tallQuery.matches;
      kick();
    };
    measure();

    const open = { x: 0, v: 0 };
    const ajar = { x: 0, v: 0 };
    const born = performance.now();

    const stop = subscribe((f) => {
      const target = clamp((f.y - top) / (travel * 0.72));
      const age = (performance.now() - born) / 1000;
      // A moment after it lands, the cover lifts open a crack and settles.
      const ajarDone = step(ajar, age > 0.45 ? 12 : 0, f.dt, 70, 0.38);
      const openDone = step(open, target, f.dt, 120, 0.92);
      drive(parts, clamp(open.x), tall, ajar.x);
      hint.style.opacity = clamp(1 - open.x * 12).toFixed(3);
      return !openDone || !ajarDone || age < 0.5;
    });

    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    tallQuery.addEventListener("change", measure);
    window.addEventListener("load", measure);
    return () => {
      stop();
      resize.disconnect();
      tallQuery.removeEventListener("change", measure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const print = () => window.print();

  return (
    <section className="hero" ref={sectionRef} aria-label="Cover">
      <div className="hero-stage" ref={stageRef}>
        <header className="hero-head">
          <p className="hero-mast">
            <b>{site.person.name}</b>
            <span>{site.edition}</span>
          </p>
          <nav className="hero-nav" aria-label="Quick links">
            <a href={`mailto:${site.person.email}`}>Email</a>
            <button type="button" onClick={print}>
              Print
            </button>
          </nav>
        </header>
        <div className="gate-world">{children}</div>
        <p className="hero-hint" ref={hintRef} aria-hidden>
          Scroll to unfold
        </p>
      </div>
    </section>
  );
}
