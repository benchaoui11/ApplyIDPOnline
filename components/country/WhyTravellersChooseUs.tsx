import IconBadge from "@/components/IconBadge";
import { GLOBAL_CONSTANTS } from "@/lib/countryData/globalConstants";

export default function WhyTravellersChooseUs() {
  return (
    <section className="section" style={{ paddingTop: "12px", paddingBottom: "56px" }}>
      <div className="container" style={{ maxWidth: "1040px" }}>
        <p className="section-kicker-blue">Why travelers choose us</p>
        <h2 style={{ fontSize: "26px", maxWidth: "560px" }}>A private service built for clarity, not paperwork</h2>
        <div
          className="why-us-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "32px" }}
        >
          {GLOBAL_CONSTANTS.trustCards.map((card) => (
            <div
              key={card.title}
              className="card-elevated"
              style={{ padding: "28px", borderTop: "3px solid var(--blue)", display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <IconBadge name={card.icon} size={26} />
              <div>
                <h3 style={{ fontSize: "17px" }}>{card.title}</h3>
                <p style={{ marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)", lineHeight: 1.6 }}>{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .why-us-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
