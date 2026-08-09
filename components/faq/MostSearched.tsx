import IconBadge from "@/components/IconBadge";
import type { FaqIcon, FaqItem } from "@/lib/faqData";

export default function MostSearched({ items, iconFor }: { items: FaqItem[]; iconFor: (item: FaqItem) => FaqIcon }) {
  return (
    <section style={{ marginTop: "4px" }}>
      <p style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-light)" }}>
        Most searched questions
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginTop: "14px" }} className="most-searched-grid">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#faq-${item.id}`}
            className="most-searched-card"
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
              padding: "18px",
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <IconBadge name={iconFor(item)} />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--navy)" }}>{item.q}</p>
              <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.5 }}>
                {item.a.length > 96 ? `${item.a.slice(0, 96).trim()}…` : item.a}
              </p>
            </div>
          </a>
        ))}
      </div>
      <style>{`
        .most-searched-card { transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease; }
        .most-searched-card:hover, .most-searched-card:focus-visible { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--blue); outline: none; }
        @media (max-width: 720px) { .most-searched-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
