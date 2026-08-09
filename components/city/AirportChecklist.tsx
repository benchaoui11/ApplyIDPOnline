import IconBadge from "@/components/IconBadge";
import type { Airport, ChecklistItem } from "@/lib/cityData/types";

export default function AirportChecklist({ airports, checklist }: { airports: Airport[]; checklist: ChecklistItem[] }) {
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${airports.length}, 1fr)`, gap: "14px", marginTop: "20px" }} className="airport-grid">
        {airports.map((a) => (
          <div key={a.code} className="card-elevated" style={{ padding: "18px 20px" }}>
            <IconBadge name="plane" />
            <p style={{ marginTop: "12px", fontSize: "14.5px", fontWeight: 700, color: "var(--navy)" }}>
              {a.code} <span style={{ fontWeight: 500, color: "var(--text-light)", fontSize: "12.5px" }}>— {a.name}</span>
            </p>
            <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>{a.note}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "10px" }}>
        {checklist.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <span style={{ marginTop: "1px" }}>
              <IconBadge name="check" size={16} />
            </span>
            <p style={{ fontSize: "14.5px", color: "var(--text)", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 720px) {
          .airport-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
