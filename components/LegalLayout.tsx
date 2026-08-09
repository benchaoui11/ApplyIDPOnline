export default function LegalLayout({
  title,
  updated,
  kicker = "Legal",
  dateLabel = "Last updated",
  children,
}: {
  title: string;
  updated: string;
  kicker?: string;
  dateLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section" style={{ paddingTop: "64px" }}>
      <div className="container" style={{ maxWidth: "760px" }}>
        <p className="section-kicker-blue">{kicker}</p>
        <h1 style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>{title}</h1>
        <p style={{ marginTop: "10px", fontSize: "13.5px", color: "var(--text-light)" }}>{dateLabel} {updated}</p>

        <div className="legal-body" style={{ marginTop: "36px" }}>
          {children}
        </div>
      </div>

      <style>{`
        .legal-body h2 {
          font-size: 18px;
          margin-top: 32px;
          margin-bottom: 12px;
        }
        .legal-body p {
          font-size: 14.5px;
          color: var(--text-light);
          margin-bottom: 14px;
        }
        .legal-body ul {
          margin: 0 0 14px;
          padding-left: 20px;
          color: var(--text-light);
          font-size: 14.5px;
        }
        .legal-body li {
          margin-bottom: 8px;
        }
      `}</style>
    </section>
  );
}
