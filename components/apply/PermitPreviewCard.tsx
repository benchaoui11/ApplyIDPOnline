export default function PermitPreviewCard({
  fullName,
  destinationCountry,
  licenseCategories,
  validityYears,
}: {
  fullName: string;
  destinationCountry: string;
  licenseCategories: string[];
  validityYears: string;
}) {
  const validUntilYear = new Date().getFullYear() + Number(validityYears || "1");

  return (
    <div
      style={{
        background: "var(--navy)",
        borderRadius: "var(--radius)",
        padding: "26px",
        color: "#FFFFFF",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.08em", color: "#85B7EB" }}>
            LIVE PREVIEW
          </p>
          <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", marginTop: "6px" }}>
            Apply IDP Online
          </p>
        </div>
        <span
          style={{
            background: "rgba(255,255,255,0.12)",
            fontSize: "10.5px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "999px",
          }}
        >
          Draft
        </span>
      </div>

      <div style={{ marginTop: "22px", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
        <PreviewRow label="Holder" value={fullName || "Your name appears here"} />
        <PreviewRow label="Issued for" value={destinationCountry || "—"} />
        <PreviewRow label="Category" value={licenseCategories.length ? licenseCategories.join(", ") : "—"} />
        <PreviewRow label="Valid until" value={String(validUntilYear)} last />
      </div>
    </div>
  );
}

function PreviewRow({ label, value, last }: { label: string; value: string; last?: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: last ? "none" : "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <span style={{ fontSize: "12px", color: "#9DB6D2" }}>{label}</span>
      <span style={{ fontSize: "13.5px", fontWeight: 600, maxWidth: "60%", textAlign: "right" }}>{value}</span>
    </div>
  );
}
