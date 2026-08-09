export type KeyFact = { label: string; value: string };

export default function KeyFacts({ facts, title }: { facts: KeyFact[]; title?: string }) {
  return (
    <div className="card-elevated" style={{ padding: "20px 22px" }}>
      {title && (
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: "14px" }}>
          {title}
        </p>
      )}
      <dl style={{ display: "flex", flexDirection: "column", gap: "12px", margin: 0 }}>
        {facts.map((f) => (
          <div key={f.label} style={{ display: "flex", justifyContent: "space-between", gap: "16px", borderBottom: "1px solid var(--border)", paddingBottom: "10px" }}>
            <dt style={{ fontSize: "13px", color: "var(--text-light)" }}>{f.label}</dt>
            <dd style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "var(--navy)", textAlign: "right" }}>{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
