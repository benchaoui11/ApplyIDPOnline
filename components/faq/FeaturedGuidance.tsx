import Link from "next/link";
import IconBadge from "@/components/IconBadge";
import type { FaqIcon, FaqItem } from "@/lib/faqData";

export default function FeaturedGuidance({ items, iconFor }: { items: FaqItem[]; iconFor: (item: FaqItem) => FaqIcon }) {
  return (
    <section style={{ marginTop: "44px" }}>
      <p style={{ fontSize: "12.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-light)" }}>
        Featured guidance
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginTop: "14px" }} className="featured-grid">
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "24px",
              background: "var(--white)",
              border: "1px solid var(--border)",
              borderTop: "3px solid var(--blue)",
              borderRadius: "var(--radius)",
            }}
          >
            <IconBadge name={iconFor(item)} />
            <h3 style={{ fontSize: "16px", marginTop: "14px" }}>{item.q}</h3>
            <p style={{ marginTop: "8px", fontSize: "13.5px", color: "var(--text-light)", lineHeight: 1.6 }}>{item.a}</p>
            {item.links && item.links.length > 0 && (
              <div style={{ display: "flex", gap: "16px", marginTop: "12px", flexWrap: "wrap" }}>
                {item.links.map((l) => (
                  <Link key={l.href} href={l.href} style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--blue)" }}>
                    {l.label} →
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 720px) { .featured-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
