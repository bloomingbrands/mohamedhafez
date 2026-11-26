"use client";

import { useEffect, useRef } from "react";
import site from "@/site.config";
import { TALL_QUERY, clamp, easeInOut, kick, pageTop, reducedMotion, step, subscribe } from "@/lib/frame";
import { drive, gateParts } from "@/lib/gate";

/**
 * The ending: the whole sheet seen at once, folding itself back up from the
 * last panel to the first, and closing into the cover it started as.
 */
export default function Finale({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const world = worldRef.current!;
    const chainRoot = world.querySelector<HTMLElement>("[data-chain]")!;
    const minis = Array.from(world.querySelectorAll<HTMLElement>("[data-mini]"));
    const parts = gateParts(world.querySelector("[data-gate]") as HTMLElement);
    const tallQuery = window.matchMedia(TALL_QUERY);
    const n = minis.length;

    let top = 0;
    let travel = 1;
    let H = 1;
    let headH = 64;
    let pad = 32;
    let stageH = 800;
    let tall = tallQuery.matches;

    const measure = () => {
      tall = tallQuery.matches;
      top = pageTop(section);
      stageH = stage.offsetHeight;
      travel = Math.max(1, section.offsetHeight - stageH);
      H = world.offsetHeight;
      const css = getComputedStyle(document.documentElement);
      headH = parseFloat(css.getPropertyValue("--head-h")) || 64;
      pad = Math.max(16, (stageH - headH - H) / 2);
      kick();
    };

    /** q: 0 = the whole sheet open, 1 = shut into the cover. */
    const pose = (q: number) => {
      // Creases fold from the bottom panel up, one after another.
      let angle = 0;
      let y = H;
      let minY = 0;
      let maxY = H;
      const folds: number[] = [];
      for (let k = 1; k <= n; k++) {
        const start = 0.06 + (n - k) * 0.075;
        folds.push(easeInOut(clamp((q - start) / 0.15)));
      }
      for (let k = 1; k <= n; k++) {
        const rel = (k % 2 ? -1 : 1) * 180 * folds[k - 1];
        minis[k - 1].style.transform = `rotateX(${rel.toFixed(3)}deg)`;
        angle += rel;
        const rad = (angle * Math.PI) / 180;
        y += H * Math.cos(rad);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
      const folded = folds[0] >= 0.999;
      chainRoot.style.visibility = folded ? "hidden" : "visible";

      const shut = easeInOut(clamp((q - 0.62) / 0.24));
      drive(parts, 1 - shut, tall);

      const extent = maxY - minY;
      const room = stageH - headH - pad * 2;
      const s = Math.min(1, room / extent);
      const ty = headH + (stageH - headH - extent * s) / 2 - minY * s;
      world.style.transform = `translate3d(0,${ty.toFixed(2)}px,0) scale(${s.toFixed(5)})`;
    };

    measure();

    if (reducedMotion()) {
      section.dataset.still = "";
      const settle = () => {
        measure();
        pose(1);
      };
      settle();
      window.addEventListener("resize", settle);
      return () => window.removeEventListener("resize", settle);
    }

    const q = { x: 0, v: 0 };
    let seen = false;
    const stop = subscribe((f) => {
      const target = clamp((f.y - top) / (travel * 0.9));
      // Far from the stage, just hold the right pose without animating.
      const near = f.y + f.vh > top - f.vh && f.y < top + section.offsetHeight + f.vh;
      let done = true;
      if (!near || !seen) {
        q.x = target;
        q.v = 0;
        seen = near;
      } else {
        done = step(q, target, f.dt, 120, 0.9);
      }
      pose(q.x);
      return !done;
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

  return (
    <section className="finale" ref={sectionRef} aria-label="Contact">
      <div className="finale-stage" ref={stageRef}>
        <header className="finale-head">
          <p>
            <b>{site.finale.line}</b>
            <span>{site.finale.sub}</span>
          </p>
          <a href="#top">Back to the top ↑</a>
        </header>
        <div className="f-camera">
          <div className="f-world" ref={worldRef}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
