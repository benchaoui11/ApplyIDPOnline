export type MythFactItem = { myth: string; fact: string };

export default function MythVsFact({ items }: { items: MythFactItem[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {items.map((item) => (
        <div
          key={item.myth}
          className="myth-fact-row"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}
        >
          <div style={{ background: "var(--error-bg)", borderRadius: "var(--radius-sm)", padding: "16px 18px" }}>
            <p style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--error)" }}>Myth</p>
            <p style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--text)", lineHeight: 1.55 }}>{item.myth}</p>
          </div>
          <div style={{ background: "var(--success-bg)", borderRadius: "var(--radius-sm)", padding: "16px 18px" }}>
            <p style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--success)" }}>Fact</p>
            <p style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--text)", lineHeight: 1.55 }}>{item.fact}</p>
          </div>
        </div>
      ))}
      <style>{`
        @media (max-width: 640px) {
          .myth-fact-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
