import { VEHICLE_CATEGORIES, VehicleIcon } from "@/components/VehicleIcons";

const DESCRIPTIONS: Record<string, string> = {
  A: "Mopeds and motorcycles — only shown on your IDP if your original license already covers this category.",
  B: "Standard passenger cars — the category most travelers use for rental cars.",
  C: "Trucks and heavy goods vehicles above the standard car weight threshold.",
  D: "Buses and vehicles designed to carry passengers beyond a standard car.",
  E: "A trailer combination attached to a category from your original license.",
};

export default function VehicleCategoryGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }} className="vc-grid">
      {VEHICLE_CATEGORIES.map((c) => (
        <div key={c.code} className="card-elevated" style={{ padding: "16px 12px", textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--blue-50)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              color: "var(--blue)",
            }}
          >
            <VehicleIcon code={c.code} size={20} />
          </div>
          <p style={{ marginTop: "10px", fontSize: "15px", fontWeight: 700, color: "var(--navy)" }}>
            {c.code} — {c.label}
          </p>
          <p style={{ marginTop: "6px", fontSize: "12px", color: "var(--text-light)", lineHeight: 1.5 }}>{DESCRIPTIONS[c.code]}</p>
        </div>
      ))}
      <style>{`
        @media (max-width: 880px) {
          .vc-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .vc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
