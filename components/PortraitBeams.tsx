"use client";

import { useEffect, useRef } from "react";

type Beam = {
  x: number;
  y: number;
  width: number;
  length: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
};

export default function PortraitBeams() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let beams: Beam[] = [];
    let frame = 0;
    let last = 0;
    let visible = true;

    const makeBeam = (i: number): Beam => ({
      x: ((i + 0.5) / 14) * width + (Math.random() - 0.5) * width * 0.16,
      y: Math.random() * height * 1.8 - height * 0.45,
      width: 12 + Math.random() * 24,
      length: height * (0.85 + Math.random() * 0.65),
      speed: 12 + Math.random() * 16,
      opacity: 0.16 + Math.random() * 0.14,
      hue: 188 + Math.random() * 55,
      pulse: Math.random() * Math.PI * 2,
    });

    const size = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: 14 }, (_, i) => makeBeam(i));
      draw(0);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.filter = "blur(12px)";
      ctx.globalCompositeOperation = "screen";
      beams.forEach((beam, i) => {
        beam.y -= beam.speed * dt;
        beam.pulse += dt * 0.8;
        if (beam.y + beam.length < -height * 0.2) {
          beams[i] = { ...makeBeam(i), y: height + Math.random() * height * 0.5 };
        }
        const alpha = beam.opacity * (0.85 + Math.sin(beam.pulse) * 0.15);
        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate((-35 * Math.PI) / 180);
        const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
        gradient.addColorStop(0, `hsla(${beam.hue}, 90%, 65%, 0)`);
        gradient.addColorStop(0.25, `hsla(${beam.hue}, 90%, 65%, ${alpha})`);
        gradient.addColorStop(0.7, `hsla(${beam.hue}, 90%, 65%, ${alpha})`);
        gradient.addColorStop(1, `hsla(${beam.hue}, 90%, 65%, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
      });
      ctx.restore();
    };

    const animate = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      draw(dt);
      frame = requestAnimationFrame(animate);
    };

    const sync = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (visible && !document.hidden && !reduceMotion.matches && width && height) {
        frame = requestAnimationFrame(animate);
      } else if (width && height) {
        draw(0);
      }
    };

    const resize = new ResizeObserver(() => { size(); sync(); });
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    reduceMotion.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduceMotion.removeEventListener("change", sync);
    };
  }, []);

  return <canvas ref={canvasRef} className="in-photo-canvas" aria-hidden="true" />;
}
