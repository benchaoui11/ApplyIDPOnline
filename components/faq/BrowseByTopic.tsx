import type { FaqCategoryId, FaqIcon, FaqItem } from "@/lib/faqData";
import IconBadge from "@/components/IconBadge";

type Category = { id: FaqCategoryId; label: string; description: string; icon: FaqIcon };

export default function BrowseByTopic({ categories, items }: { categories: Category[]; items: FaqItem[] }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <p style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-light)" }}>
        Browse by topic
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginTop: "14px" }} className="topic-grid">
        {categories.map((c) => {
          const count = items.filter((i) => i.category === c.id).length;
          return (
            <a
              key={c.id}
              href={`#category-${c.id}`}
              className="topic-card"
              style={{
                display: "block",
                padding: "20px",
                background: "var(--white)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
              }}
            >
              <IconBadge name={c.icon} />
              <p style={{ fontSize: "14.5px", fontWeight: 700, color: "var(--navy)", marginTop: "14px" }}>{c.label}</p>
              <p style={{ marginTop: "5px", fontSize: "12.5px", color: "var(--text-light)", lineHeight: 1.5 }}>{c.description}</p>
              <p style={{ marginTop: "12px", fontSize: "12px", fontWeight: 600, color: "var(--blue)" }}>
                {count} question{count === 1 ? "" : "s"}
              </p>
            </a>
          );
        })}
      </div>
      <style>{`
        .topic-card { transition: transform 0.12s ease, box-shadow 0.12s ease, border-color 0.12s ease; }
        .topic-card:hover, .topic-card:focus-visible { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--blue); outline: none; }
        @media (max-width: 880px) { .topic-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .topic-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
