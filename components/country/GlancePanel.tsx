import Link from "next/link";
import IconBadge from "@/components/IconBadge";
import { GLOBAL_CONSTANTS } from "@/lib/countryData/globalConstants";
import type { CountryRecord, VerificationStatus } from "@/lib/countryData/types";
import ConfidenceMarker from "./ConfidenceMarker";

export default function GlancePanel({ country }: { country: CountryRecord }) {
  const primaryCards: { label: string; value: string; icon: "steering" | "shield"; status: VerificationStatus; note?: string }[] = [
    { label: "Driving side", value: country.drivingSide.value, icon: "steering", status: country.drivingSide.status, note: "Confirm you're comfortable with local traffic flow before you set off." },
    { label: "IDP requirement", value: country.idpRequirementLevel.value, icon: "shield", status: country.idpRequirementLevel.status, note: "The clearest legal answer for driving in " + country.name + "." },
  ];

  const secondaryCards: { label: string; value: string; icon: "document" | "calendar" | "check" | "layers"; status?: VerificationStatus; note?: string }[] = [
    { label: "Convention", value: country.conventionLabel, icon: "document", status: country.conventionStatus.status, note: country.conventionStatus.value },
    { label: "Minimum age", value: `${country.minimumDrivingAge.value}`, icon: "calendar", status: country.minimumDrivingAge.status },
    { label: "Original license", value: "Required alongside IDP", icon: "check", status: "confirmed" },
  ];

  if (country.vehicleCategoryNote) {
    secondaryCards.push({
      label: "Vehicle categories",
      value: country.vehicleCategoryLabel ?? "As on your license",
      icon: "layers",
      status: country.vehicleCategoryNote.status,
      note: "Matches categories on your original license",
    });
  }

  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container" style={{ maxWidth: "1040px" }}>
        <p className="section-kicker-blue">{country.name} at a glance</p>
        <h2 style={{ fontSize: "28px" }}>{country.name} at a Glance</h2>
        <p style={{ marginTop: "10px", fontSize: "15px", color: "var(--text-light)", maxWidth: "600px" }}>
          A quick reference for driving in {country.name} — every fact here is checked against the sources
          listed at the bottom of this page.
        </p>

        {/* Primary — the two facts that matter most */}
        <div className="glance-primary" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginTop: "32px" }}>
          {primaryCards.map((card) => (
            <div
              key={card.label}
              className="card-elevated"
              style={{ padding: "30px", display: "flex", flexDirection: "column", gap: "18px", borderTop: "4px solid var(--blue)" }}
            >
              <IconBadge name={card.icon} size={32} />
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "11.5px", letterSpacing: "0.07em", color: "var(--text-light)", textTransform: "uppercase" }}>
                  {card.label}
                </p>
                <p style={{ marginTop: "10px", fontSize: "25px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.25 }}>{card.value}</p>
                <div style={{ marginTop: "8px" }}>
                  <ConfidenceMarker status={card.status} />
                </div>
                {card.note && (
                  <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.55 }}>{card.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Secondary — supporting facts */}
        <div className="glance-secondary" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", marginTop: "16px" }}>
          {secondaryCards.map((card) => (
            <div
              key={card.label}
              className="card-elevated"
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <IconBadge name={card.icon} size={20} />
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.06em", color: "var(--text-light)", textTransform: "uppercase" }}>
                  {card.label}
                </p>
                <p style={{ marginTop: "6px", fontSize: "15px", fontWeight: 700, color: "var(--navy)", lineHeight: 1.3 }}>{card.value}</p>
                {card.status && (
                  <div style={{ marginTop: "7px" }}>
                    <ConfidenceMarker status={card.status} />
                  </div>
                )}
                {card.note && (
                  <p style={{ marginTop: "5px", fontSize: "11.5px", color: "var(--text-light)", lineHeight: 1.5 }}>{card.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--text-light)" }}>
          {GLOBAL_CONSTANTS.originalLicenseRequirementCopy}
        </p>

        {country.popularDrivingAreas.length > 0 && (
          <div style={{ marginTop: "44px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, color: "var(--navy)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Popular driving areas in {country.name}
            </p>
            <div
              className="areas-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px", marginTop: "16px" }}
            >
              {country.popularDrivingAreas.map((area) => (
                <div key={area.name} className="card-elevated" style={{ padding: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconBadge name="pin" size={16} />
                  <p style={{ fontSize: "15.5px", fontWeight: 700, color: "var(--navy)" }}>{area.name}</p>
                </div>
                <p style={{ marginTop: "10px", fontSize: "12.5px", color: "var(--text-light)", lineHeight: 1.55 }}>{area.note}</p>
                <div style={{ marginTop: "8px" }}>
                  <ConfidenceMarker status={area.status} />
                </div>
                <Link
                    href={`/apply?destination=${encodeURIComponent(country.name)}`}
                    style={{ display: "inline-block", marginTop: "10px", fontSize: "12px", fontWeight: 600, color: "var(--blue)" }}
                  >
                    Prepare for {area.name} →
                  </Link>
                </div>
              ))}
            </div>
            <p style={{ marginTop: "14px", fontSize: "12px", color: "var(--text-light)" }}>
              The same national requirements apply across {country.name}, including these popular areas — driving rules aren&apos;t set city by city.
            </p>
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 880px) {
          .glance-primary { grid-template-columns: 1fr !important; }
          .glance-secondary { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .glance-secondary { grid-template-columns: 1fr !important; }
          .areas-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
