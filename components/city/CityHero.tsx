import type { CityRecord } from "@/lib/cityData/types";
import StatRow from "@/components/content/StatRow";

export default function CityHero({ city }: { city: CityRecord }) {
  const airportCodes = city.airports.map((a) => a.code).join(" · ");
  return (
    <section className="section" style={{ paddingTop: "36px", paddingBottom: "32px" }}>
      <div className="container" style={{ maxWidth: "780px", textAlign: "center" }}>
        <p className="section-kicker-blue" style={{ justifyContent: "center" }}>City guide — {city.name}</p>
        <h1>{city.h1}</h1>
        <p style={{ marginTop: "14px", fontSize: "15.5px", color: "var(--text-light)" }}>
          Flying out of {airportCodes}? Prepare your International Driving Permit online before
          you go — no branch visit, no appointment, from anywhere in {city.name}.
        </p>
        <div style={{ marginTop: "24px", maxWidth: "560px", margin: "24px auto 0" }}>
          <StatRow
            stats={[
              { value: String(city.airports.length), label: "international airports" },
              { value: String(city.boroughs.length), label: "boroughs served" },
              { value: "100%", label: "online application" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
