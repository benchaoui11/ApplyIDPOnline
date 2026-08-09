import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ padding: "18px 0 0" }}>
      <div className="container">
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontSize: "13px",
            color: "var(--text-light)",
          }}
        >
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {item.href && !isLast ? (
                  <Link href={item.href} style={{ color: "var(--text-light)", fontWeight: 500 }}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current={isLast ? "page" : undefined} style={{ color: isLast ? "var(--navy)" : "var(--text-light)", fontWeight: isLast ? 600 : 500 }}>
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M4.5 2.5l4 3.5-4 3.5" stroke="var(--border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
