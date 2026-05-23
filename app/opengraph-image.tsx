import { ImageResponse } from "next/og";

export const alt = "Mohamed Hafez — Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#080808",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top label */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "13px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </span>
        </div>

        {/* Name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <div
            style={{
              fontSize: "96px",
              fontWeight: "900",
              color: "white",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
            }}
          >
            Mohamed
          </div>
          <div
            style={{
              fontSize: "96px",
              fontWeight: "900",
              color: "rgba(255,255,255,0.22)",
              lineHeight: 0.88,
              letterSpacing: "-0.04em",
            }}
          >
            Hafez
          </div>
          <div
            style={{
              marginTop: "28px",
              fontSize: "21px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.5,
              maxWidth: "620px",
            }}
          >
            Full Stack Developer · AI Integrations · Blockchain · Systems Engineering
          </div>
        </div>

        {/* Bottom row — URL + tech tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "14px",
              letterSpacing: "0.08em",
            }}
          >
            beingmohamedhafez.com
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            {["React", "Next.js", "Node.js", "TypeScript", "OpenAI"].map((tag) => (
              <div
                key={tag}
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "100px",
                  padding: "6px 18px",
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.35)",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
