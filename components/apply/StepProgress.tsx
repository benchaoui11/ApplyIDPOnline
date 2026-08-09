const STEP_LABELS = ["Driver details", "Upload documents", "Review & submit"];

export default function StepProgress({ step }: { step: number }) {
  return (
    <div className="step-progress" style={{ display: "flex", alignItems: "flex-start", marginBottom: "40px" }}>
      {STEP_LABELS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < STEP_LABELS.length - 1 ? 1 : "0 0 auto", minWidth: 0 }}>
            <div className="step-progress-col" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", width: "120px", maxWidth: "100%" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done ? "var(--success)" : active ? "var(--blue)" : "var(--white)",
                  border: active || done ? "none" : "1px solid var(--border)",
                  color: done || active ? "#FFFFFF" : "var(--text-light)",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  fontSize: "14px",
                  flexShrink: 0,
                }}
              >
                {done ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M3 8.5l3.2 3.2L13 5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                style={{
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: active || done ? "var(--navy)" : "var(--text-light)",
                  textAlign: "center",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div style={{ flex: 1, height: "2px", background: done ? "var(--success)" : "var(--border)", marginTop: "-24px" }} />
            )}
          </div>
        );
      })}
      <style>{`
        @media (max-width: 420px) {
          .step-progress-col { width: 74px !important; }
          .step-progress-col span { font-size: 10.5px !important; line-height: 1.3; }
        }
      `}</style>
    </div>
  );
}
