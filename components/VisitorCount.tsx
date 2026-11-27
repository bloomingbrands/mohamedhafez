"use client";

import { useEffect, useRef, useState } from "react";

let countPromise: Promise<number | null> | undefined;
function loadCount() {
  countPromise ??= fetch("/api/visitors", { cache: "no-store" })
    .then((response) => response.ok ? response.json() : null)
    .then((data) => typeof data?.count === "number" ? data.count : null)
    .catch(() => null);
  return countPromise;
}

export default function VisitorCount() {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let active = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void loadCount().then((value) => { if (active) setCount(value); });
    }, { rootMargin: "200px" });
    observer.observe(element);
    return () => { active = false; observer.disconnect(); };
  }, []);
  return <span ref={ref} className="num" aria-label={count === null ? "Visitor count unavailable" : `${count.toLocaleString()} site visitors`}>{count === null ? "—" : count.toLocaleString()}</span>;
}
