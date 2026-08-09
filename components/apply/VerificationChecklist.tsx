type ChecklistItem = { label: string; done: boolean };

export default function VerificationChecklist({ items }: { items: ChecklistItem[] }) {
  const doneCount = items.filter((i) => i.done).length;
  const pct = Math.round((doneCount / items.length) * 100);

  return (
    <div style={{ background: "var(--navy)", borderRadius: "var(--radius)", padding: "22px", color: "#FFFFFF", boxShadow: "var(--shadow-lg)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ position: "relative", width: "48px", height: "48px" }}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
            <circle
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeDasharray={`${(pct / 100) * 125.6} 125.6`}
              strokeLinecap="round"
              transform="rotate(-90 24 24)"
            />
          </svg>
          <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>
            {pct}%
          </span>
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 700 }}>{doneCount === items.length ? "All set" : "Verification status"}</p>
          <p style={{ fontSize: "12px", color: "#9DB6D2" }}>
            {doneCount} of {items.length} items complete
          </p>
        </div>
      </div>

      <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                border: item.done ? "none" : "1px solid rgba(255,255,255,0.35)",
                background: item.done ? "var(--success)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {item.done && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M2 5l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span style={{ fontSize: "13px", color: item.done ? "#FFFFFF" : "#9DB6D2" }}>{item.label}</span>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "18px", fontSize: "11.5px", color: "#7C93B3", borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: "14px" }}>
        Your documents are encrypted in transit and only used to prepare your permit.
      </p>
    </div>
  );
}
