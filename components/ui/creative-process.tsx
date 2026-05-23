"use client";

import { useRef } from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";

const sections = [
  {
    id: "discover",
    leftLabel: "Research",
    title: "Discover",
    rightLabel: "Listen",
    background:
      "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "design",
    leftLabel: "Wireframe",
    title: "Design",
    rightLabel: "Refine",
    background:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "build",
    leftLabel: "Code",
    title: "Build",
    rightLabel: "Iterate",
    background:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: "ship",
    leftLabel: "Deploy",
    title: "Ship",
    rightLabel: "Grow",
    background:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
  },
];

export function CreativeProcess() {
  const apiRef = useRef<FullScreenFXAPI>(null);

  return (
    <FullScreenScrollFX
      sections={sections}
      apiRef={apiRef}
      header={
        <>
          <div>The Creative</div>
          <div>Process</div>
        </>
      }
      footer={<div />}
      showProgress
      durations={{ change: 0.7, snap: 800 }}
      colors={{
        text: "rgba(245,245,245,0.92)",
        overlay: "rgba(0,0,0,0.4)",
        pageBg: "#080808",
        stageBg: "#000000",
      }}
    />
  );
}
