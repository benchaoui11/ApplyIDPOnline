export default function PermitBadgeCard() {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        padding: "32px",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          background: "var(--navy)",
          borderRadius: "16px",
          padding: "28px",
          color: "#FFFFFF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.08em", color: "#85B7EB" }}>
              INTERNATIONAL DRIVING PERMIT
            </p>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "20px", marginTop: "6px" }}>
              Apply IDP Online
            </p>
          </div>
          <span
            style={{
              background: "var(--success-bg)",
              color: "var(--success)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "999px",
            }}
          >
            Approved
          </span>
        </div>

        <div style={{ display: "flex", gap: "16px", marginTop: "28px", alignItems: "center" }}>
          <div style={{ width: "56px", height: "56px", borderRadius: "10px", background: "rgba(255,255,255,0.12)" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#85B7EB" }}>
              IDP NO. AIO-2026-104782
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#85B7EB" }}>
              VALID UNTIL 07 / 2029
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {["A", "B", "C", "D", "E"].map((cat) => (
            <span
              key={cat}
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "-18px",
          right: "12px",
          background: "var(--white)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "var(--shadow-md)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="var(--success-bg)" />
          <path d="M6 10l2.5 2.5L14 7" stroke="var(--success)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--navy)" }}>Reviewed by our team</span>
      </div>
    </div>
  );
}
