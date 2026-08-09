import IconBadge from "@/components/IconBadge";
import type { Mistake } from "@/lib/cityData/types";

const ICON_CYCLE = ["calendar", "document", "route", "pin"] as const;

export default function MistakesGrid({ mistakes }: { mistakes: Mistake[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "20px" }} className="mistakes-grid">
      {mistakes.map((m, i) => (
        <div key={m.title} className="card-elevated" style={{ padding: "18px 20px" }}>
          <IconBadge name={ICON_CYCLE[i % ICON_CYCLE.length]} />
          <h3 style={{ fontSize: "14.5px", marginTop: "12px" }}>{m.title}</h3>
          <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>{m.body}</p>
        </div>
      ))}
      <style>{`
        @media (max-width: 720px) {
          .mistakes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
