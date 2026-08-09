import Link from "next/link";
import { DESTINATIONS, flagEmoji } from "@/lib/destinations";
import { getCountryRecord } from "@/lib/countryData/registry";

export default function RelatedCountries({ slugs }: { slugs: string[] }) {
  const entries = slugs
    .map((slug) => {
      const record = getCountryRecord(slug);
      const destination = DESTINATIONS.find((d) => d.slug === slug);
      if (!destination) return null;
      return {
        name: destination.country,
        code: destination.code,
        // Only link to a dedicated page if one actually exists in the registry —
        // otherwise fall back to the same /apply?destination= pattern the
        // existing CountriesExplorer already uses, so nothing links to a 404.
        href: record ? `/countries/${slug}` : `/apply?destination=${encodeURIComponent(destination.country)}`,
      };
    })
    .filter((e): e is { name: string; code: string; href: string } => e !== null);

  if (entries.length === 0) return null;

  return (
    <section className="section" id="related-countries" style={{ background: "var(--surface)", paddingTop: "78px" }}>
      <div className="container" style={{ maxWidth: "820px" }}>
        <p className="section-kicker-blue">Explore more destinations</p>
        <h2 style={{ fontSize: "20px" }}>Other travelers also check</h2>
        <div
          className="related-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "14px", marginTop: "28px" }}
        >
          {entries.map((e) => (
            <Link
              key={e.name}
              href={e.href}
              className="card-elevated"
              style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px" }}
            >
              <span aria-hidden="true" style={{ fontSize: "18px" }}>{flagEmoji(e.code)}</span>
              <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--navy)" }}>{e.name}</span>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: "18px" }}>
          <Link href="/countries" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
            Browse all countries →
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .related-grid { grid-template-columns: repeat(2, 1fr) !important; }
          #related-countries { padding-top: 56px !important; }
        }
      `}</style>
    </section>
  );
}
