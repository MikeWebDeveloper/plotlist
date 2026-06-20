import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#2f6b3f",
          color: "#f7f6f1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.85, marginBottom: 8 }}>▦ {site.name}</div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{site.tagline}</div>
        <div style={{ fontSize: 32, opacity: 0.85, marginTop: 24 }}>
          UK allotments: waiting lists & how to apply, council by council.
        </div>
      </div>
    ),
    { ...size }
  );
}
