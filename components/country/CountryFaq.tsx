import FaqAccordion from "@/components/FaqAccordion";
import type { CountryRecord } from "@/lib/countryData/types";

export default function CountryFaq({ country }: { country: CountryRecord }) {
  const items = country.faq.map((f) => ({ q: f.question, a: f.answer }));

  return (
    <section className="section" id="country-faq" style={{ paddingBottom: "78px" }}>
      <div className="container" style={{ maxWidth: "720px" }}>
        <p className="section-kicker-blue">FAQ</p>
        <h2 style={{ fontSize: "22px" }}>Questions about {country.name}</h2>
        <div style={{ marginTop: "28px" }}>
          <FaqAccordion items={items} />
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          #country-faq { padding-bottom: 56px !important; }
        }
      `}</style>
    </section>
  );
}
