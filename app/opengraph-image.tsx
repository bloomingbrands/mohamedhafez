import { ImageResponse } from "next/og";

export const alt = "Mohamed Hafez — Web developer and cloud systems engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4f4f1", color: "#161616", position: "relative", padding: 66, flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 700 }}>
        <span>Mohamed Hafez</span><span style={{ color: "#b8005f" }}>PORTFOLIO / 01</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 82, fontWeight: 800, letterSpacing: -5, lineHeight: 0.96 }}>
          <span>Ideas into software</span><span>people can rely on.</span>
        </div>
        <div style={{ fontSize: 28, color: "#57575a" }}>Web developer &amp; cloud systems engineer</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, borderTop: "2px solid #161616", paddingTop: 22 }}>
        <span>Lowell, Massachusetts</span><span>beingmohamedhafez.com</span>
      </div>
    </div>,
    size,
  );
}
