"use client";

import { useState } from "react";
import Link from "next/link";
import IconBadge from "@/components/IconBadge";

export default function EligibilityGate({ children }: { children: React.ReactNode }) {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (confirmed) {
    return <>{children}</>;
  }

  return (
    <div className="card-elevated" style={{ padding: "40px 32px", maxWidth: "640px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <IconBadge name="document" size={26} />
      </div>
      <p className="section-kicker-blue" style={{ justifyContent: "center", marginTop: "16px" }}>Before you begin</p>
      <h2 style={{ textAlign: "center", fontSize: "22px", maxWidth: "480px", margin: "0 auto" }}>
        Do you have a valid driver&apos;s license from your home country?
      </h2>
      <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)" }}>
        An International Driving Permit translates an existing license — it can&apos;t be issued without one.
      </p>

      <div className="gate-choice-row" style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
        <ChoiceCard label="Yes, I have one" active={answer === "yes"} onClick={() => setAnswer("yes")} />
        <ChoiceCard label="No, I don't" active={answer === "no"} onClick={() => setAnswer("no")} />
      </div>

      {answer === "no" && (
        <div
          role="alert"
          style={{
            marginTop: "20px",
            background: "var(--error-bg)",
            border: "1px solid var(--error)",
            borderRadius: "var(--radius-sm)",
            padding: "22px 24px",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontSize: "16px", color: "var(--navy)" }}>International Driving Permit</h3>
          <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text)", lineHeight: 1.6 }}>
            Sorry — you need a valid driver&apos;s license from your home country to apply for an
            International Driving Permit. It translates an existing license; it can&apos;t replace
            one you don&apos;t have.
          </p>
          <Link
            href="/what-is-idp"
            style={{ display: "inline-block", marginTop: "12px", fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}
          >
            Learn more about International Driving Permits →
          </Link>
        </div>
      )}

      {answer === "yes" && (
        <div style={{ textAlign: "center", marginTop: "22px" }}>
          <button type="button" onClick={() => setConfirmed(true)} className="btn btn-primary btn-lg">
            Continue
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          .gate-choice-row { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

function ChoiceCard({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="gate-choice-card"
      onClick={onClick}
      aria-pressed={active}
      style={{
        flex: 1,
        minWidth: 0,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 18px",
        borderRadius: "var(--radius-sm)",
        border: active ? "1.5px solid var(--blue)" : "1px solid var(--border)",
        background: active ? "var(--blue-50)" : "var(--white)",
        cursor: "pointer",
        textAlign: "left",
        transition: "border-color 0.15s ease, background 0.15s ease",
      }}
    >
      <span
        aria-hidden="true"
        className="gate-choice-check"
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "5px",
          border: active ? "none" : "1.5px solid var(--border)",
          background: active ? "var(--blue)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {active && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6l2.5 2.5L10 3" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className="gate-choice-label" style={{ fontWeight: 700, fontSize: "14.5px", color: "var(--navy)", overflowWrap: "break-word" }}>{label}</span>
    </button>
  );
}
