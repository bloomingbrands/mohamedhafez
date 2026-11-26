"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/urls";
import { TALL_QUERY, clamp, easeOut, kick, pageTop, reducedMotion, step, subscribe } from "@/lib/frame";

interface Photo {
  src: string;
  alt: string;
  place: string;
  date: string;
}

/** Angle each card keeps from flat once it is open, and while still folded. */
const REST = 22;
const SHUT = 80;
const RAD = Math.PI / 180;

/**
 * A concertina of photo cards lying on the sheet. It arrives pressed shut and
 * opens out as it scrolls into view, peaks catching the lamp, valleys in shade.
 */
export default function Concertina({ photos }: { photos: readonly Photo[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current!;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
    const shades = cards.map((c) => c.querySelector<HTMLElement>("[data-card-shade]")!);
    const grounds = Array.from(root.querySelectorAll<HTMLElement>("[data-card-ground]"));
    const tallQuery = window.matchMedia(TALL_QUERY);
    const n = cards.length;
    const still = reducedMotion();

    let top = 0;
    let w = 0;
    let h = 0;
    let cw = 0;
    let ch = 0;
    let tall = false;
    const angle = { x: SHUT, v: 0 };
    let last = -1;

    const measure = () => {
      tall = tallQuery.matches;
      top = pageTop(root);
      w = root.clientWidth;
      h = root.clientHeight;
      cw = cards[0].offsetWidth;
      ch = cards[0].offsetHeight;
      last = -1;
      kick();
    };

    const place = (deg: number) => {
      if (Math.abs(deg - last) < 0.01) return;
      last = deg;
      const a = deg * RAD;
      const cos = Math.cos(a);
      const sin = Math.sin(a);
      if (!tall) {
        const span = n * cw * cos;
        const x0 = (w - span) / 2;
        cards.forEach((card, i) => {
          const x = x0 + i * cw * cos;
          const z = i % 2 ? cw * sin : 0;
          card.style.transform = `translate3d(${x.toFixed(2)}px,0,${z.toFixed(2)}px) rotateY(${i % 2 ? deg : -deg}deg)`;
          shades[i].style.opacity = (i % 2 ? 0.34 * sin + 0.04 : 0.05 * sin).toFixed(3);
          const g = grounds[i];
          if (g) {
            // Each raised card throws a soft shadow down and to the right.
            const lift = (cw * sin) / 2;
            g.style.transform = `translate3d(${(x + lift * 0.22).toFixed(2)}px,${(lift * 0.12).toFixed(2)}px,0) scaleX(${cos.toFixed(4)})`;
            g.style.opacity = (0.25 + 0.55 * sin).toFixed(3);
          }
        });
      } else {
        cards.forEach((card, i) => {
          const y = i * ch * cos;
          const z = i % 2 ? ch * sin : 0;
          card.style.transform = `translate3d(0,${y.toFixed(2)}px,${z.toFixed(2)}px) rotateX(${i % 2 ? -deg : deg}deg)`;
          shades[i].style.opacity = (i % 2 ? 0.3 * sin + 0.04 : 0.04 * sin).toFixed(3);
          const g = grounds[i];
          if (g) {
            const lift = (ch * sin) / 2;
            g.style.transform = `translate3d(${(lift * 0.14).toFixed(2)}px,${(y + lift * 0.2).toFixed(2)}px,0) scaleY(${cos.toFixed(4)})`;
            g.style.opacity = (0.25 + 0.55 * sin).toFixed(3);
          }
        });
      }
    };

    measure();
    if (still) {
      place(REST);
      const onResize = () => {
        measure();
        last = -1;
        place(REST);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const stop = subscribe((f) => {
      const t = top - f.y;
      const c = clamp((f.vh * 0.95 - t) / (f.vh * 0.55));
      const target = SHUT - (SHUT - REST) * easeOut(c);
      let done = true;
      if (t > f.vh * 1.4 || t < -h - f.vh) {
        angle.x = target;
        angle.v = 0;
      } else {
        done = step(angle, target, f.dt, 90, 0.8);
      }
      place(angle.x);
      return !done;
    });

    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    tallQuery.addEventListener("change", measure);
    return () => {
      stop();
      resize.disconnect();
      tallQuery.removeEventListener("change", measure);
    };
  }, []);

  return (
    <div className="cc" ref={ref} style={{ "--n": photos.length } as React.CSSProperties}>
      <div className="cc-ground" aria-hidden>
        {photos.map((p) => (
          <i key={p.src} data-card-ground />
        ))}
      </div>
      <ol className="cc-cards">
        {photos.map((p, i) => (
          <li className="cc-card paper" key={p.src} data-card style={{ zIndex: photos.length - i }}>
            <Image src={asset(p.src)} alt={p.alt} width={800} height={1000} loading="lazy" draggable={false} />
            <p className="cc-cap">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <span className="cc-place">{p.place}</span>
              <span className="cc-date">{p.date}</span>
            </p>
            <i className="cc-shade" data-card-shade aria-hidden />
          </li>
        ))}
      </ol>
    </div>
  );
}
