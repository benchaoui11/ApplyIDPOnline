export type Stat = { value: string; label: string };

export default function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${stats.length}, 1fr)`, gap: "14px" }} className="stat-row">
      {stats.map((s) => (
        <div key={s.label} className="card-elevated stat-row-card" style={{ padding: "18px 14px", textAlign: "center" }}>
          <p className="stat-row-value" style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--navy)" }}>{s.value}</p>
          <p className="stat-row-label" style={{ fontSize: "12px", color: "var(--text-light)", marginTop: "4px" }}>{s.label}</p>
        </div>
      ))}
      <style>{`
        @media (max-width: 480px) {
          .stat-row { gap: 8px; }
          .stat-row-card { padding: 12px 6px !important; }
          .stat-row-value { font-size: 17px !important; }
          .stat-row-label { font-size: 10px !important; line-height: 1.3; }
        }
      `}</style>
    </div>
  );
}
