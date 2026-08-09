import type { VerificationStatus } from "@/lib/countryData/types";

export default function ConfidenceMarker({ status }: { status: VerificationStatus }) {
  if (status !== "partially_sourced") return null;

  return (
    <span
      data-confidence="partially_sourced"
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        border: "1px solid var(--border)",
        borderRadius: "999px",
        padding: "2px 7px",
        color: "var(--text-light)",
        background: "var(--surface)",
        fontSize: "10.5px",
        fontWeight: 700,
        lineHeight: 1.3,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      Commonly reported
    </span>
  );
}
