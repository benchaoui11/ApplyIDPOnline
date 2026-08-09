// Shared callout block for the knowledge-hub pages — three variants, all
// server-rendered, no client JS. Deliberately restrained styling (a left
// border + tinted background, not a loud banner) to match the calm,
// institutional tone established across Home/Countries/How-to-Apply/FAQ.

const VARIANTS = {
  important: { label: "Important", border: "var(--blue)", bg: "var(--blue-50)", labelColor: "var(--blue)" },
  expert: { label: "Expert note", border: "var(--navy)", bg: "var(--surface)", labelColor: "var(--navy)" },
  mistake: { label: "Common mistake", border: "#B45309", bg: "#FEF3E2", labelColor: "#B45309" },
} as const;

export default function Callout({
  variant,
  title,
  children,
}: {
  variant: keyof typeof VARIANTS;
  title?: string;
  children: React.ReactNode;
}) {
  const v = VARIANTS[variant];
  return (
    <div
      style={{
        borderLeft: `3px solid ${v.border}`,
        background: v.bg,
        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
        padding: "16px 20px",
        margin: "20px 0",
      }}
    >
      <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: v.labelColor }}>
        {v.label}
        {title ? ` — ${title}` : ""}
      </p>
      <div style={{ marginTop: "6px", fontSize: "14px", color: "var(--text)", lineHeight: 1.65 }}>{children}</div>
    </div>
  );
}
