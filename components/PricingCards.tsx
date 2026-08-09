"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPrice, BEST_SELLER_VALIDITY, type ValidityYears } from "@/lib/pricing";

// Computed inline per render rather than as a module-level constant, so it
// reflects whichever year this page was last generated in (see the
// `revalidate` export on app/pricing/page.tsx — without periodic ISR
// regeneration, a static page's module-level `new Date()` would freeze at
// the build year forever and go silently wrong the next calendar year).
function getValidityOptions(): { value: ValidityYears; label: string; expires: string }[] {
  const year = new Date().getFullYear();
  return [
    { value: "1", label: "1-Year valid", expires: `Expires ${year + 1}` },
    { value: "2", label: "2-Year valid", expires: `Expires ${year + 2}` },
    { value: "3", label: "3-Year valid", expires: `Expires ${year + 3}` },
  ];
}

const PLANS = [
  {
    name: "Digital IDP",
    format: "digital" as const,
    badgeLabel: "Fastest delivery",
    features: ["Emailed as a downloadable document", "Ready to show on your phone", "Translated into 11 languages"],
    featured: false,
    image: {
      src: "/images/applyidponline-mobile-digital-permit-preview.webp",
      alt: "Apply IDP Online digital permit preview on a mobile phone",
    },
  },
  {
    name: "Print + Digital",
    format: "both" as const,
    badgeLabel: "Most popular",
    features: ["Printed booklet shipped to your address", "Digital copy included as well", "Tracked worldwide delivery"],
    featured: true,
    image: {
      src: "/images/applyidponline-digital-print-permit-options.webp",
      alt: "Apply IDP Online digital and printed permit options displayed together",
    },
  },
];

export default function PricingCards() {
  const [validity, setValidity] = useState<ValidityYears>("1");
  const validityOptions = getValidityOptions();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", flexWrap: "wrap", marginTop: "16px" }} className="validity-pills">
        {validityOptions.map((opt) => {
          const active = validity === opt.value;
          const isBestSeller = opt.value === BEST_SELLER_VALIDITY;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => setValidity(opt.value)}
              className="validity-pill"
              style={{
                position: "relative",
                padding: "12px 22px",
                borderRadius: "999px",
                border: active ? "none" : "1px solid var(--border)",
                background: active ? "var(--blue)" : "var(--white)",
                color: active ? "#FFFFFF" : "var(--navy)",
                cursor: "pointer",
                textAlign: "center",
                minWidth: "140px",
              }}
              aria-pressed={active}
            >
              {isBestSeller && (
                <span
                  className="validity-best-seller"
                  style={{
                    position: "absolute",
                    top: "-11px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "var(--success)",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "2px 9px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                  }}
                >
                  BEST SELLER
                </span>
              )}
              <span className="validity-pill-label" style={{ display: "block", fontWeight: 700, fontSize: "14.5px" }}>{opt.label}</span>
              <span className="validity-pill-expires" style={{ display: "block", fontSize: "12px", opacity: 0.85, marginTop: "2px" }}>{opt.expires}</span>
            </button>
          );
        })}
      </div>

      <div
        className="container plans-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "36px", marginTop: "32px", maxWidth: "820px" }}
      >
        {PLANS.map((plan) => {
          const price = getPrice(plan.format, validity);
          return (
            <div
              key={plan.name}
              className="plan-card"
              style={{
                border: plan.featured ? "2px solid var(--blue)" : "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                background: "var(--white)",
                position: "relative",
                boxShadow: plan.featured ? "var(--shadow-lg)" : "var(--shadow-card)",
              }}
            >
              <div style={{ width: "100%", position: "relative", aspectRatio: "4 / 3", background: "var(--surface)" }}>
                <Image
                  src={plan.image.src}
                  alt={plan.image.alt}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 680px) 92vw, 380px"
                />
                <span
                  style={{
                    position: "absolute",
                    top: "14px",
                    left: "14px",
                    background: "var(--navy)",
                    color: "#FFFFFF",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "6px 14px",
                    borderRadius: "999px",
                  }}
                >
                  {plan.badgeLabel}
                </span>
              </div>

              <div style={{ padding: "24px 28px 28px" }}>
                <h3 style={{ fontSize: "18px" }}>{plan.name}</h3>
                <p style={{ marginTop: "10px", fontSize: "32px", fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--navy)" }}>
                  ${price}
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                  {plan.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "var(--text-light)", alignItems: "flex-start" }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: "3px", flexShrink: 0 }} aria-hidden="true">
                        <path d="M3 8.5l3 3 7-7" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={`/apply?validity=${validity}&format=${plan.format}`} className="btn btn-primary" style={{ marginTop: "22px", width: "100%" }}>
                  Choose {plan.name}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 680px) {
          .plans-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .validity-pills { gap: 5px !important; flex-wrap: nowrap !important; }
          .validity-pill { padding: 8px 4px !important; min-width: 0 !important; flex: 1 1 0; }
          .validity-pill-label { font-size: 11px !important; }
          .validity-pill-expires { font-size: 9px !important; }
          .validity-best-seller { font-size: 7.5px !important; padding: 2px 5px !important; }
        }
      `}</style>
    </div>
  );
}
