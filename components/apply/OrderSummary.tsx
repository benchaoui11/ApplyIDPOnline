import { getPrice, getSecondTravelerPrice, type Format, type ValidityYears } from "@/lib/pricing";

const PLAN_LABELS: Record<Format, string> = { digital: "Digital only", both: "Print + digital" };

export default function OrderSummary({
  format,
  validityYears,
  secondTraveler = false,
}: {
  format: Format;
  validityYears: ValidityYears;
  secondTraveler?: boolean;
}) {
  const price = getPrice(format, validityYears);
  const secondPrice = getSecondTravelerPrice(format, validityYears);
  const total = secondTraveler ? price + secondPrice : price;

  return (
    <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "22px", boxShadow: "var(--shadow-card)" }}>
      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--navy)", marginBottom: "14px" }}>Order summary</p>

      <SummaryRow label={`${PLAN_LABELS[format]} IDP`} value={`$${price}`} />
      {secondTraveler && (
        <SummaryRow label="Second traveler IDP (20% off)" value={`$${secondPrice}`} />
      )}
      <SummaryRow label={`${validityYears}-year validity`} value="" />
      <SummaryRow label="Processing & review" value="Free" />

      <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px", paddingTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--navy)" }}>Estimated total</span>
        <span style={{ fontSize: "22px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--navy)" }}>
          ${total} <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-light)" }}>USD</span>
        </span>
      </div>

      <p style={{ marginTop: "14px", fontSize: "12.5px", color: "var(--text-light)" }}>
        You won't be charged now. Our team reviews your application first, then sends payment
        instructions by email.
      </p>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "13.5px" }}>
      <span style={{ color: "var(--text-light)" }}>{label}</span>
      {value && <span style={{ fontWeight: 600, color: "var(--navy)" }}>{value}</span>}
    </div>
  );
}
