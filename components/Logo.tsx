"use client";

import { useId } from "react";

/**
 * Official-style circular seal. The top label rides a smaller radius (its
 * caps ascend outward) and the bottom label a larger one (its caps ascend
 * inward), so both sit cleanly in the same band between the two rings.
 */
function SealEmblem({
  size = 42,
  ink,
  globeFill,
}: {
  size?: number;
  ink: string;
  globeFill: string;
}) {
  const uid = useId().replace(/:/g, "");
  const topId = `top-${uid}`;
  const botId = `bot-${uid}`;
  const clipId = `globe-${uid}`;

  return (
    <svg className="seal-emblem" width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" role="img">
      <defs>
        <path id={topId} d="M 10,50 A 40,40 0 0 1 90,50" fill="none" />
        <path id={botId} d="M 6,50 A 44,44 0 0 0 94,50" fill="none" />
        <clipPath id={clipId}>
          <circle cx="50" cy="50" r="30" />
        </clipPath>
      </defs>

      {/* Double outer ring */}
      <circle cx="50" cy="50" r="48" fill="none" stroke={ink} strokeWidth="1.7" />
      <circle cx="50" cy="50" r="37" fill="none" stroke={ink} strokeWidth="1.1" />

      {/* Curved text */}
      <text fill={ink} fontFamily="Arial, Helvetica, sans-serif" fontSize="6" fontWeight={700} letterSpacing="0.5">
        <textPath href={`#${topId}`} startOffset="50%" textAnchor="middle">
          INTERNATIONAL DRIVING PERMIT
        </textPath>
      </text>
      <text fill={ink} fontFamily="Arial, Helvetica, sans-serif" fontSize="6" fontWeight={700} letterSpacing="2">
        <textPath href={`#${botId}`} startOffset="50%" textAnchor="middle">
          APPLY IDP ONLINE
        </textPath>
      </text>

      {/* Globe */}
      <g>
        <circle cx="50" cy="50" r="30" fill={globeFill} stroke={ink} strokeWidth="1.7" />
        <g clipPath={`url(#${clipId})`} fill="none" stroke={ink} strokeWidth="1.1" strokeOpacity="0.9">
          {/* meridians */}
          <line x1="50" y1="20" x2="50" y2="80" />
          <ellipse cx="50" cy="50" rx="11" ry="30" />
          <ellipse cx="50" cy="50" rx="21" ry="30" />
          {/* parallels */}
          <line x1="20" y1="50" x2="80" y2="50" />
          <line x1="24" y1="35" x2="76" y2="35" />
          <line x1="24" y1="65" x2="76" y2="65" />
        </g>
      </g>
    </svg>
  );
}

export default function Logo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  const wordColor = isDark ? "#FFFFFF" : "#003366";
  const idpColor = isDark ? "#85B7EB" : "#1D4ED8";
  const ink = isDark ? "#FFFFFF" : "#003366";
  const globeFill = isDark ? "rgba(255,255,255,0.04)" : "#F0F6FD";

  return (
    <span className="brand-lockup" style={{ display: "inline-flex", alignItems: "center", gap: "12px" }}>
      <SealEmblem size={56} ink={ink} globeFill={globeFill} />
      <span
        className="brand-wordmark"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          color: wordColor,
          letterSpacing: "0.03em",
          textTransform: "uppercase",
        }}
      >
        Apply <span style={{ color: idpColor }}>IDP</span> Online
      </span>
    </span>
  );
}
