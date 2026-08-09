"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CountryCombobox from "@/components/CountryCombobox";
import { detectVisitorCountry } from "@/lib/detectCountry";

export default function EligibilityChecker({
  prefilledDestination,
}: {
  prefilledDestination?: string;
} = {}) {
  const [licenseCountry, setLicenseCountry] = useState("United States");
  const [destination, setDestination] = useState(prefilledDestination ?? "");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    detectVisitorCountry().then((guess) => {
      if (cancelled || !guess) return;
      setLicenseCountry((current) => current || guess);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const ready = !!licenseCountry && !!destination;

  return (
    <div
      className="eligibility-card"
      style={{
        background: "var(--white)",
        border: "1px solid var(--border)",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <p className="section-kicker-blue" style={{ marginBottom: "6px" }}>
        Check your eligibility
      </p>
      <h2 style={{ fontSize: "19px", color: "var(--navy)" }}>Check your license country and travel destination</h2>

      <label htmlFor="license-country" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "var(--navy)", marginTop: "20px", marginBottom: "6px" }}>
        Where was your license issued?
      </label>
      <CountryCombobox
        id="license-country"
        value={licenseCountry}
        onChange={(c) => {
          setLicenseCountry(c);
          setChecked(false);
        }}
        placeholder="Select a country"
      />

      <label htmlFor="destination-country" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "var(--navy)", marginTop: "16px", marginBottom: "6px" }}>
        Where are you planning to drive?
      </label>
      <CountryCombobox
        id="destination-country"
        value={destination}
        onChange={(c) => {
          setDestination(c);
          setChecked(false);
        }}
        placeholder="Select your destination"
      />

      <button
        type="button"
        disabled={!ready}
        onClick={() => setChecked(true)}
        className="btn btn-primary"
        style={{ width: "100%", marginTop: "18px", opacity: ready ? 1 : 0.5, cursor: ready ? "pointer" : "not-allowed" }}
      >
        Check my eligibility
      </button>

      <div
        style={{
          maxHeight: checked ? "160px" : "0px",
          opacity: checked ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.25s ease",
          marginTop: checked ? "16px" : "0px",
        }}
      >
        <div
          style={{
            background: "var(--success-bg)",
            border: "1px solid rgba(25, 135, 84, 0.25)",
            borderRadius: "var(--radius-sm)",
            padding: "16px",
            display: "flex",
            gap: "12px",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: "1px" }} aria-hidden="true">
            <circle cx="11" cy="11" r="11" fill="var(--success)" />
            <path d="M6.5 11.2l2.8 2.8 6.2-6.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "14.5px" }}>You&apos;re all set</p>
            <p style={{ fontSize: "13px", color: "var(--text)", marginTop: "3px" }}>
              You&apos;re all set for {destination}. Continue to start your application.
            </p>
            <Link
              href={`/apply?destination=${encodeURIComponent(destination)}&licenseCountry=${encodeURIComponent(licenseCountry)}`}
              style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "10px", fontSize: "13.5px", fontWeight: 700, color: "var(--blue)" }}
            >
              Continue application
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
