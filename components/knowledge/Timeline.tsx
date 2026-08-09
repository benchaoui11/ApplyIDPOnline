export type TimelineEntry = { year: string; title: string; body: string; status?: "superseded" | "current" };

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="kh-timeline" style={{ position: "relative" }}>
      <div
        aria-hidden="true"
        className="kh-timeline-rail"
        style={{ position: "absolute", background: "var(--border)" }}
      />
      <div className="kh-timeline-items" style={{ display: "flex" }}>
        {entries.map((e) => (
          <div key={e.year} className="kh-timeline-item" style={{ position: "relative" }}>
            <div
              aria-hidden="true"
              className="kh-timeline-dot"
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: e.status === "superseded" ? "var(--border)" : "var(--blue)",
                border: "2px solid var(--white)",
                boxShadow: "0 0 0 2px var(--border)",
              }}
            />
            <div className="card-elevated" style={{ padding: "16px 18px", marginTop: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 700, color: "var(--navy)" }}>{e.year}</span>
                {e.status === "superseded" && (
                  <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--text-light)", background: "var(--surface)", borderRadius: "999px", padding: "2px 8px" }}>
                    Superseded
                  </span>
                )}
                {e.status === "current" && (
                  <span style={{ fontSize: "10px", fontWeight: 600, color: "var(--success)", background: "var(--success-bg)", borderRadius: "999px", padding: "2px 8px" }}>
                    Currently in force
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: "14.5px", marginTop: "8px" }}>{e.title}</h3>
              <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.55 }}>{e.body}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .kh-timeline-items {
          flex-direction: column;
          gap: 4px;
        }
        .kh-timeline-rail {
          top: 6px;
          bottom: 6px;
          left: 5px;
          width: 2px;
        }
        .kh-timeline-item {
          padding-left: 26px;
        }
        .kh-timeline-item .kh-timeline-dot {
          position: absolute;
          left: 0;
          top: 6px;
        }
        @media (min-width: 880px) {
          .kh-timeline-items {
            flex-direction: row;
            gap: 20px;
          }
          .kh-timeline-rail {
            top: 6px;
            left: 6%;
            right: 6%;
            bottom: auto;
            width: auto;
            height: 2px;
          }
          .kh-timeline-item {
            padding-left: 0;
            flex: 1;
          }
          .kh-timeline-item .kh-timeline-dot {
            position: static;
            margin: 0 auto;
          }
          .kh-timeline-item .card-elevated {
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
