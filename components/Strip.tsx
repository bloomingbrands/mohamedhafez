"use client";

import { useEffect, useRef } from "react";
import { clamp, kick, pageTop, reducedMotion, step, subscribe } from "@/lib/frame";

/** How far a panel hangs back before it unfolds, in degrees. */
const FOLDED = 84;

/**
 * The rest of the sheet, panel after panel. Each panel is hinged on the crease
 * above it: it hangs back out of sight until its crease rises into the screen,
 * then swings down and lies flat, settling with a little give.
 */
export default function Strip({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    if (reducedMotion()) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-fold]")).map((el) => ({
      el,
      inner: el.firstElementChild as HTMLElement,
      shade: el.querySelector<HTMLElement>("[data-fold-shade]")!,
      top: 0,
      h: 0,
      angle: { x: FOLDED, v: 0 },
      shown: NaN,
    }));

    const measure = () => {
      for (const it of items) {
        it.top = pageTop(it.el);
        it.h = it.el.offsetHeight;
      }
      kick();
    };
    measure();

    const stop = subscribe((f) => {
      let moving = false;
      for (const it of items) {
        const t = it.top - f.y;
        const open = clamp((f.vh * 0.985 - t) / (f.vh * 0.46));
        const target = FOLDED * Math.pow(1 - open, 1.35);
        if (t > f.vh * 1.15 || t + it.h < 0) {
          it.angle.x = target;
          it.angle.v = 0;
        } else if (!step(it.angle, target, f.dt, 105, 0.74)) {
          moving = true;
        }
        const a = it.angle.x;
        if (Math.abs(a - it.shown) < 0.01) continue;
        it.shown = a;
        if (Math.abs(a) < 0.02) {
          it.inner.style.transform = "";
          it.shade.style.opacity = "0";
          it.el.style.perspectiveOrigin = "";
        } else {
          it.el.style.perspectiveOrigin = `50% ${(f.vh / 2 - t).toFixed(1)}px`;
          it.inner.style.transform = `rotateX(${(-a).toFixed(3)}deg)`;
          it.shade.style.opacity = (0.62 * Math.sin((Math.abs(a) * Math.PI) / 180)).toFixed(3);
        }
      }
      return moving;
    });

    const resize = new ResizeObserver(measure);
    resize.observe(root);
    window.addEventListener("load", measure);
    return () => {
      stop();
      resize.disconnect();
      window.removeEventListener("load", measure);
    };
  }, []);

  return (
    <div className="strip" ref={ref}>
      {children}
    </div>
  );
}
