import { ImageResponse } from "next/og";

/**
 * iOS home-screen icon. Apple does not accept SVG here, so the mark from
 * app/icon.svg is rebuilt with plain boxes and rendered to a PNG at build
 * time. Geometry is the 32-unit mark scaled by 180/32.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const DIM = "rgba(255,255,255,0.62)";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1257f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* cleared */}
        <div
          style={{
            width: 21,
            height: 21,
            borderRadius: 21,
            background: DIM,
          }}
        />
        <div
          style={{
            width: 27,
            height: 11,
            borderRadius: 11,
            background: DIM,
            marginLeft: -2,
            marginRight: -2,
          }}
        />
        {/* where the claim is now */}
        <div
          style={{
            width: 41,
            height: 41,
            borderRadius: 41,
            background: "#ffffff",
          }}
        />
        <div
          style={{
            width: 27,
            height: 11,
            borderRadius: 11,
            background: DIM,
            marginLeft: -2,
            marginRight: -2,
          }}
        />
        {/* still open */}
        <div
          style={{
            width: 23,
            height: 23,
            borderRadius: 23,
            border: `9px solid ${DIM}`,
          }}
        />
      </div>
    </div>,
    size,
  );
}
