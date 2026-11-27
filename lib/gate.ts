import { clamp, easeInOut } from "./frame";

export interface GateParts {
  root: HTMLElement;
  a: HTMLElement;
  b: HTMLElement;
  center: HTMLElement;
  shadow: HTMLElement;
  stack: HTMLElement;
  real: HTMLElement | null;
  shades: { aFront: HTMLElement; aBack: HTMLElement; bFront: HTMLElement; bBack: HTMLElement; center: HTMLElement };
}

export function gateParts(root: HTMLElement): GateParts {
  const q = (sel: string) => root.querySelector(sel) as HTMLElement;
  const a = q("[data-gate-a]");
  const b = q("[data-gate-b]");
  return {
    root,
    a,
    b,
    center: q("[data-gate-center]"),
    shadow: q("[data-gate-shadow]"),
    stack: q("[data-gate-stack]"),
    real: root.querySelector("[data-gate-real]"),
    shades: {
      aFront: a.querySelector("[data-shade-front]") as HTMLElement,
      aBack: a.querySelector("[data-shade-back]") as HTMLElement,
      bFront: b.querySelector("[data-shade-front]") as HTMLElement,
      bBack: b.querySelector("[data-shade-back]") as HTMLElement,
      center: root.querySelector("[data-shade-center]") as HTMLElement,
    },
  };
}

/** Light falls from above: a face darkens as it turns away from flat. */
function shadeFor(angle: number) {
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  return {
    front: angle < 90 ? 0.42 * (1 - cos) : 0.42,
    back: angle > 90 ? 0.4 * (1 + cos) : 0.4,
  };
}

/**
 * Turns the flaps. `p` is 0 for shut, 1 for lying open.
 * The second flap leads a little, the way a hand opens a gatefold.
 */
export function drive(parts: GateParts, p: number, tall: boolean, ajar = 0) {
  const reveal = clamp((p - 0.12) / 0.7);
  parts.root.style.setProperty("--headline-cover", `${((1 - reveal) * 100).toFixed(2)}%`);
  const pb = easeInOut(clamp(p / 0.82));
  const pa = easeInOut(clamp((p - 0.18) / 0.82));
  // `ajar` lifts the shut flaps a few degrees off the centre panel.
  const angA = Math.min(180 * (1 - pa), 180 - ajar * 0.4);
  const angB = Math.min(180 * (1 - pb), 180 - ajar);

  if (tall) {
    parts.a.style.transform = `translateZ(2px) rotateX(${-angA}deg)`;
    parts.b.style.transform = `translateZ(3px) rotateX(${angB}deg)`;
  } else {
    parts.a.style.transform = `translateZ(2px) rotateY(${angA}deg)`;
    parts.b.style.transform = `translateZ(3px) rotateY(${-angB}deg)`;
  }

  const sa = shadeFor(angA);
  const sb = shadeFor(angB);
  parts.shades.aFront.style.opacity = sa.front.toFixed(3);
  parts.shades.aBack.style.opacity = sa.back.toFixed(3);
  parts.shades.bFront.style.opacity = sb.front.toFixed(3);
  parts.shades.bBack.style.opacity = sb.back.toFixed(3);
  // The inside lies in the flaps' shadow until they lift well clear of it.
  const cover = clamp((Math.min(angA, angB) - 70) / 100);
  parts.shades.center.style.opacity = (0.82 * cover).toFixed(3);

  // The shadow on the table covers whatever is lying on it.
  const reachA = 0.25 * Math.max(0, Math.cos((angA * Math.PI) / 180));
  const reachB = 0.25 * Math.max(0, Math.cos((angB * Math.PI) / 180));
  const from = 0.25 - reachA;
  const span = 0.5 + reachA + reachB;
  parts.shadow.style.transform = tall
    ? `translateZ(-6px) translateY(${(from * 100).toFixed(3)}%) scaleY(${span.toFixed(4)})`
    : `translateZ(-6px) translateX(${(from * 100).toFixed(3)}%) scaleX(${span.toFixed(4)})`;

  parts.stack.style.opacity = clamp(1 - p * 5).toFixed(3);

  // Once it lies flat, the single accessible copy of the spread takes over.
  const open = p >= 0.999;
  if (parts.real) {
    parts.real.style.opacity = open ? "1" : "0";
    parts.real.style.pointerEvents = open ? "auto" : "none";
    const openValue = open ? "true" : "false";
    if (parts.real.dataset.open !== openValue) parts.real.dataset.open = openValue;
  }
  const panels = parts.real && open ? "hidden" : "visible";
  parts.a.style.visibility = panels;
  parts.b.style.visibility = panels;
  parts.center.style.visibility = panels;
}
