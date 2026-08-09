import Link from "next/link";
import type { PopularDestination } from "@/lib/cityData/types";

export default function PopularDestinationsGrid({ destinations }: { destinations: PopularDestination[] }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginTop: "20px" }} className="pd-grid">
      {destinations.map((d) => (
        <Link
          key={d.slug}
          href={`/countries/${d.slug}`}
          className="card-elevated"
          style={{ padding: "16px 18px", display: "block", color: "inherit" }}
        >
          <p style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--navy)" }}>{d.name}</p>
          <p style={{ marginTop: "6px", fontSize: "12.5px", color: "var(--text-light)", lineHeight: 1.55 }}>{d.note}</p>
          <span style={{ display: "inline-block", marginTop: "10px", fontSize: "12.5px", fontWeight: 600, color: "var(--blue)" }}>
            View guide →
          </span>
        </Link>
      ))}
      <style>{`
        @media (max-width: 880px) {
          .pd-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .pd-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
