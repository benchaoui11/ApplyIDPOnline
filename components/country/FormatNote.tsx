import Image from "next/image";
import Link from "next/link";
import type { CountryRecord } from "@/lib/countryData/types";
import ConfidenceMarker from "./ConfidenceMarker";

const PLANS = [
  {
    key: "digital",
    title: "Digital IDP",
    tag: "Fastest option",
    image: "/images/applyidponline-mobile-digital-permit-preview.webp",
    alt: "Apply IDP Online digital permit preview on a mobile phone",
    objectFit: "contain" as const,
    objectPosition: "center",
    benefits: [
      "Emailed as a downloadable document",
      "Ready to show on your phone",
      "Included in every plan",
    ],
    format: "digital",
    cta: "Choose Digital IDP",
  },
  {
    key: "both",
    title: "Print + Digital",
    tag: null,
    image: "/images/applyidponline-digital-print-permit-options.webp",
    alt: "Apply IDP Online printed permit booklet option",
    objectFit: "cover" as const,
    objectPosition: "78% center",
    benefits: [
      "Printed booklet shipped to your address",
      "Digital copy included as well",
      "A physical document for travelers who prefer paper",
    ],
    format: "both",
    cta: "Choose Print + Digital",
  },
];

export default function FormatNote({ country }: { country: CountryRecord }) {
  return (
    <section className="section" id="choose-format" style={{ paddingTop: "78px" }}>
      <div className="container" style={{ maxWidth: "980px" }}>
        <div style={{ textAlign: "center" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Choose your format</p>
          <h2 style={{ fontSize: "28px" }}>Digital or printed — you choose</h2>
          <p style={{ marginTop: "10px", fontSize: "15px", color: "var(--text-light)", maxWidth: "520px", margin: "10px auto 0" }}>
            Both formats are prepared from the same reviewed application — pick what suits your trip to {country.name}.
          </p>
        </div>

        <div className="format-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginTop: "36px" }}>
          {PLANS.map((plan) => (
            <div key={plan.key} className="format-card card-elevated" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10", background: plan.key === "digital" ? "var(--blue-50)" : "var(--surface)" }}>
                <Image
                  src={plan.image}
                  alt={plan.alt}
                  fill
                  style={{ objectFit: plan.objectFit, objectPosition: plan.objectPosition, padding: plan.objectFit === "contain" ? "22px" : 0 }}
                  sizes="(max-width: 720px) 90vw, 460px"
                />
                {plan.tag && (
                  <span
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "14px",
                      background: "var(--navy)",
                      color: "#FFFFFF",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.03em",
                      padding: "5px 12px",
                      borderRadius: "999px",
                    }}
                  >
                    {plan.tag}
                  </span>
                )}
              </div>

              <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "17.5px" }}>{plan.title}</h3>

                <ul style={{ listStyle: "none", margin: "14px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "9px", flex: 1 }}>
                  {plan.benefits.map((b) => (
                    <li key={b} style={{ display: "flex", gap: "9px", alignItems: "flex-start", fontSize: "13.5px", color: "var(--text-light)", lineHeight: 1.5 }}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginTop: "3px", flexShrink: 0 }} aria-hidden="true">
                        <path d="M2.5 8l3 3 6.5-7" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: "20px" }}>
                  <Link
                    href={`/apply?destination=${encodeURIComponent(country.name)}&format=${plan.format}`}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {country.digitalIdpAcceptance && (
          <div style={{ marginTop: "22px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", textAlign: "center" }}>
            <p style={{ fontSize: "13.5px", color: "var(--text-light)" }}>
              <strong style={{ color: "var(--navy)" }}>For {country.name}: </strong>
              {country.digitalIdpAcceptance.value}
            </p>
            <ConfidenceMarker status={country.digitalIdpAcceptance.status} />
          </div>
        )}

        <div style={{ marginTop: "18px", textAlign: "center" }}>
          <Link href="/pricing" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
            Compare full pricing &amp; formats →
          </Link>
        </div>
      </div>
      <style>{`
        .format-card {
          transition: box-shadow 0.15s ease, transform 0.15s ease, border-color 0.15s ease;
        }
        .format-card:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-2px);
        }
        .format-card:focus-within {
          border-color: var(--blue);
          box-shadow: var(--shadow-lg);
        }
        @media (max-width: 720px) {
          .format-grid { grid-template-columns: 1fr !important; }
          #choose-format { padding-top: 56px !important; }
        }
      `}</style>
    </section>
  );
}
