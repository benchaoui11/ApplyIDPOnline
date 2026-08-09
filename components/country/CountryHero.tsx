import Link from "next/link";
import { flagEmoji } from "@/lib/destinations";
import { getAccentColor } from "@/lib/countryData/flagColors";
import { FlagIcon } from "@/lib/countryData/flagIcons";
import type { CountryRecord } from "@/lib/countryData/types";

export default function CountryHero({ country }: { country: CountryRecord }) {
  const accent = getAccentColor(country.isoCode);

  // h1 falls back to the shared template pattern when a country record
  // doesn't override it. When it does, the country name (wherever it
  // appears in the override string) still gets the same blue-accent
  // treatment as the template default, so a custom H1 doesn't lose the
  // established visual style. Some overrides use an abbreviation instead
  // of the full name (e.g. "USA", "UK", "UAE" for "United States"/"United
  // Kingdom"/"United Arab Emirates") — country.name won't be found as a
  // substring in those cases, so this falls back to highlighting the
  // trailing word instead, since every h1 in this project ends with the
  // country's display term either way.
  const h1Text = country.h1 ?? `International Driving Permit for ${country.name}`;
  const nameIndex = h1Text.indexOf(country.name);
  let h1Before: string;
  let h1Highlight: string;
  let h1After: string;
  if (nameIndex >= 0) {
    h1Before = h1Text.slice(0, nameIndex);
    h1Highlight = country.name;
    h1After = h1Text.slice(nameIndex + country.name.length);
  } else {
    const lastSpace = h1Text.lastIndexOf(" ");
    h1Before = h1Text.slice(0, lastSpace + 1);
    h1Highlight = h1Text.slice(lastSpace + 1);
    h1After = "";
  }

  return (
    <section className="section country-hero" style={{ paddingTop: "44px", paddingBottom: "48px" }}>
      <div
        className="container hero-cols"
        style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "48px", alignItems: "center" }}
      >
        {/* LEFT — message */}
        <div>
          <p className="section-kicker-blue">
            <span aria-hidden="true" style={{ fontSize: "15px" }}>{flagEmoji(country.isoCode)}</span>
            {country.name} Driving Guide
          </p>
          <h1>
            {h1Before}
            <span style={{ color: "var(--blue)" }}>{h1Highlight}</span>
            {h1After}
          </h1>
          <p style={{ marginTop: "18px", fontSize: "16.5px", color: "var(--text-light)", maxWidth: "540px", lineHeight: 1.65 }}>
            Apply IDP Online is a fully online, private application-assistance service — no office visit, no
            appointment. Confirm your eligibility and prepare the document {country.name}
            {" "}rental counters and traffic officials expect to see alongside your original license
            {country.motorcycleScooterRelevant ? ", whether you're renting a car or riding a scooter." : "."}
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
            <Link href="#eligibility" className="btn btn-primary btn-lg hero-cta">
              Check eligibility for {country.name}
            </Link>
          </div>
          <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--text-light)", display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
              <circle cx="8" cy="8" r="8" fill="var(--success-bg)" />
              <path d="M4.5 8.2l2.2 2.2L11.5 5.8" stroke="var(--success)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Reviewed by our team before your permit is prepared.
          </p>
        </div>

        {/* RIGHT — Destination Profile */}
        <div
          className="destination-profile"
          style={{
            position: "relative",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-lg)",
            background: "var(--white)",
            overflow: "hidden",
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 0" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.14em", color: "var(--text-light)" }}>
              DESTINATION PROFILE
            </span>
            <span
              className="iso-pill"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: accent,
                background: `${accent}17`,
                borderRadius: "999px",
                padding: "5px 12px",
              }}
            >
              {country.isoCode}
            </span>
          </div>

          {/* Flag — a small supporting identity mark, not the card's focal point */}
          <div style={{ padding: "18px 24px 0" }}>
            <FlagIcon
              isoCode={country.isoCode}
              title={`Flag of ${country.name}`}
              className="destination-flag-banner"
              style={{
                height: "44px",
                width: "auto",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(15, 23, 42, 0.18)",
                border: "1px solid rgba(15, 23, 42, 0.10)",
              }}
            />
          </div>

          {/* Identity */}
          <div style={{ padding: "20px 24px 0" }}>
            <p
              className="destination-name"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(24px, 3.4vw, 30px)",
                lineHeight: 1.1,
                color: "var(--navy)",
                letterSpacing: "-0.01em",
                overflowWrap: "break-word",
              }}
            >
              {country.name}
            </p>
            <p style={{ marginTop: "7px", display: "flex", alignItems: "center", gap: "6px", fontSize: "13.5px", color: "var(--text-light)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 12h18M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" stroke="currentColor" strokeWidth="1.6" />
              </svg>
              {country.region}
            </p>
          </div>

          {/* Verified quick facts */}
          <div
            className="destination-stats"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: "10px",
              padding: "20px 24px 24px",
              marginTop: "6px",
            }}
          >
            <StatTile accent={accent} label="Driving side" value={country.drivingSide.value} icon="steering" />
            <StatTile accent={accent} label="Minimum age" value={`${country.minimumDrivingAge.value}`} icon="calendar" />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .hero-cols { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .country-hero { padding-top: 32px !important; padding-bottom: 32px !important; }
          .hero-cta { width: 100%; text-align: center; }
          .destination-name { font-size: 24px !important; }
          .destination-stats { padding: 18px 18px 20px !important; }
        }
        @media (max-width: 360px) {
          .destination-stats { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
}

const STAT_ICONS: Record<"steering" | "calendar", React.ReactNode> = {
  steering: (
    <>
      <circle cx="12" cy="12" r="8" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.2" strokeWidth="1.6" />
      <path d="M12 4v5.8M6.3 15l4.9-2.8M17.7 15l-4.9-2.8" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" strokeWidth="1.6" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
};

function StatTile({ accent, icon, label, value }: { accent: string; icon: "steering" | "calendar"; label: string; value: string }) {
  return (
    <div
      className="destination-stat-tile"
      style={{
        position: "relative",
        padding: "14px 14px 13px",
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: accent }} />
      <span
        aria-hidden="true"
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "9px",
          background: `${accent}14`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent}>
          {STAT_ICONS[icon]}
        </svg>
      </span>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", fontWeight: 600, letterSpacing: "0.07em", color: "var(--text-light)", textTransform: "uppercase" }}>
        {label}
      </p>
      <p style={{ marginTop: "4px", fontSize: "17px", fontWeight: 800, color: "var(--navy)", lineHeight: 1.2 }}>{value}</p>
    </div>
  );
}
