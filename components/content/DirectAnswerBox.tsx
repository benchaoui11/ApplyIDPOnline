import Link from "next/link";

export default function DirectAnswerBox({
  kicker,
  children,
  links,
}: {
  kicker: string;
  children: React.ReactNode;
  links?: { href: string; label: string }[];
}) {
  return (
    <div style={{ background: "var(--navy)", borderRadius: "var(--radius)", padding: "32px", boxShadow: "var(--shadow-lg)" }}>
      <p style={{ fontSize: "11.5px", fontWeight: 700, color: "#85B7EB", letterSpacing: "0.08em", textAlign: "center" }}>{kicker}</p>
      <div style={{ marginTop: "14px", fontSize: "15.5px", lineHeight: 1.7, color: "#E4ECF6", maxWidth: "720px", margin: "14px auto 0" }}>
        {children}
      </div>
      {links && links.length > 0 && (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "22px", flexWrap: "wrap" }}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: "13.5px",
                fontWeight: 600,
                color: "#FFFFFF",
                background: "rgba(255,255,255,0.12)",
                padding: "9px 16px",
                borderRadius: "999px",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
