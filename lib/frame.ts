/**
 * One requestAnimationFrame loop for the whole page.
 * Each subscriber gets the scroll position once per frame and returns true
 * while it still has a spring settling, so the loop stops when nothing moves.
 */

export interface Frame {
  /** window.scrollY */
  y: number;
  /** Viewport height and width. */
  vh: number;
  vw: number;
  /** Seconds since the previous frame, capped. */
  dt: number;
}

type Subscriber = (frame: Frame) => boolean;

const subscribers = new Set<Subscriber>();
let raf = 0;
let last = 0;
let listening = false;

function tick(now: number) {
  raf = 0;
  const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
  last = now;
  const frame: Frame = { y: window.scrollY, vh: window.innerHeight, vw: window.innerWidth, dt };
  let again = false;
  Array.from(subscribers).forEach((subscriber) => {
    if (subscriber(frame)) again = true;
  });
  if (again) raf = requestAnimationFrame(tick);
  else last = 0;
}

export function kick() {
  if (!raf && subscribers.size) raf = requestAnimationFrame(tick);
}

export function subscribe(subscriber: Subscriber) {
  subscribers.add(subscriber);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
  }
  kick();
  return () => {
    subscribers.delete(subscriber);
  };
}

/** A spring that follows a target. Returns true once it has settled. */
export interface SpringState {
  x: number;
  v: number;
}

export function step(state: SpringState, target: number, dt: number, stiffness = 170, damping = 0.86): boolean {
  const c = 2 * damping * Math.sqrt(stiffness);
  const n = Math.max(1, Math.ceil(dt * 240));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    const a = stiffness * (target - state.x) - c * state.v;
    state.v += a * h;
    state.x += state.v * h;
  }
  if (Math.abs(target - state.x) < 1e-4 && Math.abs(state.v) < 1e-3) {
    state.x = target;
    state.v = 0;
    return true;
  }
  return false;
}

export const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Which way the sheet folds: sideways on wide screens, up and down on tall ones. */
export const TALL_QUERY = "(max-width: 760px), (max-aspect-ratio: 9/10)";

export function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Top of an element in page coordinates, ignoring transforms on it. */
export function pageTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}
