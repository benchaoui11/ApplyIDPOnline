import Image from "next/image";
import ContextualCta from "@/components/country/ContextualCta";
import { GLOBAL_CONSTANTS } from "@/lib/countryData/globalConstants";
import type { CountryRecord } from "@/lib/countryData/types";

export default function ProcessJourney({ country }: { country: CountryRecord }) {
  const steps = GLOBAL_CONSTANTS.applicationProcessSteps;

  return (
    <section className="section" id="how-it-works" style={{ background: "var(--surface)", paddingTop: "78px" }}>
      <div className="container">
        <div className="process-cols" style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr", gap: "56px", alignItems: "center" }}>
          {/* LEFT — the steps */}
          <div>
            <p className="section-kicker-blue">How it works</p>
            <h2 style={{ fontSize: "26px", maxWidth: "480px" }}>
              How ApplyIDPOnline works for {country.name}
            </h2>

            <div style={{ position: "relative", marginTop: "36px" }}>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "22px",
                  bottom: "22px",
                  left: "21px",
                  width: "2px",
                  background: "repeating-linear-gradient(180deg, var(--blue) 0 8px, transparent 8px 16px)",
                  opacity: 0.4,
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                {steps.map((step) => (
                  <div key={step.stage} style={{ display: "flex", gap: "20px", position: "relative" }}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "var(--navy)",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 700,
                        fontSize: "15px",
                        boxShadow: "var(--shadow-md)",
                        flexShrink: 0,
                      }}
                    >
                      {step.stage}
                    </div>
                    <div className="card-elevated" style={{ padding: "20px 22px", flex: 1 }}>
                      <h3 style={{ fontSize: "16.5px" }}>{step.title}</h3>
                      <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text-light)", lineHeight: 1.6 }}>{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: "36px" }}>
              <ContextualCta variant="apply" countryName={country.name} />
            </div>
          </div>

          {/* RIGHT — product showcase: what the customer actually receives */}
          <div className="process-visual">
            <div
              className="card-elevated"
              style={{
                padding: "28px",
                background: "linear-gradient(180deg, var(--blue-50) 0%, var(--white) 60%)",
                textAlign: "center",
              }}
            >
              <div style={{ position: "relative", width: "100%", maxWidth: "280px", aspectRatio: "1024 / 1536", margin: "0 auto" }}>
                <Image
                  src="/images/applyidponline-mobile-digital-permit-preview.webp"
                  alt="Apply IDP Online digital permit preview on a mobile phone"
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 880px) 60vw, 280px"
                />
              </div>
              <p style={{ marginTop: "16px", fontSize: "13.5px", fontWeight: 600, color: "var(--navy)" }}>
                Your digital IDP, ready on your phone
              </p>
              <p style={{ marginTop: "6px", fontSize: "12.5px", color: "var(--text-light)" }}>
                A downloadable document you can show at a rental counter or roadside check.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .process-cols { grid-template-columns: 1fr !important; }
          .process-visual { order: -1; max-width: 320px; margin: 0 auto 8px; }
        }
        @media (max-width: 720px) {
          #how-it-works { padding-top: 56px !important; }
        }
      `}</style>
    </section>
  );
}
