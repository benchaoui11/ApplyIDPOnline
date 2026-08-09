"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EligibilityChecker from "@/components/EligibilityChecker";
import type { CountryRecord } from "@/lib/countryData/types";

export default function EligibilitySection({ country }: { country: CountryRecord }) {
  const countryName = country.name;
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    let cancelled = false;
    import("@/lib/detectCountry").then(({ detectVisitorCountry }) => {
      detectVisitorCountry().then((guess) => {
        if (!cancelled && guess) setOrigin(guess);
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section" id="eligibility" style={{ paddingTop: "16px", paddingBottom: "44px" }}>
      <div className="container" style={{ maxWidth: "560px", textAlign: "center" }}>
        <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Check your eligibility</p>
        <h2 style={{ fontSize: "22px" }}>Applying for {countryName}?</h2>
        <p style={{ marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)" }}>
          Tell us where your license was issued and we&apos;ll get you started.
        </p>

        {origin && (
          <p style={{ marginTop: "14px", fontSize: "13px", color: "var(--text-light)" }}>
            Applying with a {origin} license?{" "}
            <Link
              href={`/apply?destination=${encodeURIComponent(countryName)}&licenseCountry=${encodeURIComponent(origin)}`}
              style={{ color: "var(--blue)", fontWeight: 600 }}
            >
              Go straight to the application →
            </Link>
          </p>
        )}

        <div style={{ marginTop: "28px", textAlign: "left" }}>
          <EligibilityChecker prefilledDestination={countryName} />
        </div>

        <p style={{ marginTop: "22px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>
          Holding a foreign driving licence and heading to {countryName}? You&apos;ll need a valid, unexpired
          original licence from your home country — your IDP is prepared to accompany it, not replace it.
        </p>
      </div>
    </section>
  );
}
