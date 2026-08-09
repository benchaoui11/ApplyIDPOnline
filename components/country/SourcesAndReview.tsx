import Link from "next/link";
import IconBadge from "@/components/IconBadge";
import { GLOBAL_CONSTANTS } from "@/lib/countryData/globalConstants";
import type { CountryRecord } from "@/lib/countryData/types";

export default function SourcesAndReview({ country }: { country: CountryRecord }) {
  return (
    <section className="section" style={{ paddingTop: "48px", paddingBottom: "64px" }}>
      <div className="container" style={{ maxWidth: "680px" }}>
        <div className="card-elevated" style={{ padding: "26px 28px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <IconBadge name="check" size={20} />
            <div>
              <h3 style={{ fontSize: "15.5px" }}>Information reviewed for accuracy</h3>
              <p style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--text-light)", lineHeight: 1.6 }}>
                Destination guidance is reviewed regularly against reliable travel and road-authority references.
                Last reviewed {country.lastVerifiedDate}.
              </p>
            </div>
          </div>

          {country.sourceCitations.length > 0 && (
            <details style={{ marginTop: "14px" }}>
              <summary style={{ cursor: "pointer", fontSize: "12.5px", fontWeight: 600, color: "var(--text-light)" }}>
                View reference sources
              </summary>
              <p style={{ marginTop: "8px", fontSize: "12px", color: "var(--text-light)" }}>
                {country.sourceCitations.map((c, i) => (
                  <span key={c.url}>
                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-light)", textDecoration: "underline" }}>
                      {c.label}
                    </a>
                    {i < country.sourceCitations.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </details>
          )}

          <p style={{ marginTop: "16px", fontSize: "12px", color: "var(--text-light)", borderTop: "1px solid var(--border)", paddingTop: "14px", lineHeight: 1.6 }}>
            {GLOBAL_CONSTANTS.trustDisclosureCopy} Always confirm current rules with {country.name}&apos;s official
            road authority before you travel.
          </p>

          <p style={{ marginTop: "10px", fontSize: "12.5px", color: "var(--text-light)" }}>
            <Link href="/sources" style={{ color: "var(--blue)", fontWeight: 600 }}>Our sources</Link>
            {" · "}
            <Link href="/editorial-policy" style={{ color: "var(--blue)", fontWeight: 600 }}>Editorial policy</Link>
            {" · "}
            <Link href="/content-review" style={{ color: "var(--blue)", fontWeight: 600 }}>Content-review methodology</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
