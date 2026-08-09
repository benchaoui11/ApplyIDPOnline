import Link from "next/link";
import Logo from "./Logo";

const COLUMNS = [
  {
    title: "Service",
    links: [
      { href: "/apply", label: "Start application" },
      { href: "/pricing", label: "Pricing" },
      { href: "/how-to-apply", label: "How to apply" },
      { href: "/countries", label: "Countries" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About us" },
      { href: "/what-is-idp", label: "What is an IDP" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Trust & editorial",
    links: [
      { href: "/editorial-policy", label: "Editorial policy" },
      { href: "/sources", label: "Our sources" },
      { href: "/content-review", label: "Content-review methodology" },
      { href: "/legal/disclaimer", label: "Disclaimer" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/terms", label: "Terms of service" },
      { href: "/legal/privacy", label: "Privacy policy" },
      { href: "/legal/refund-policy", label: "Refund policy" },
      { href: "/legal/shipping", label: "Shipping & delivery" },
      { href: "/legal/cookies", label: "Cookie policy" },
      { href: "/legal/accessibility", label: "Accessibility" },
      { href: "/legal/dmca", label: "DMCA & IP" },
      { href: "/legal/acceptable-use", label: "Acceptable use" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--navy)", color: "#FFFFFF", paddingTop: "64px" }}>
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
            gap: "40px",
            paddingBottom: "48px",
          }}
          className="footer-grid"
        >
          <div>
            <Link href="/" aria-label="Apply IDP Online home">
              <Logo variant="dark" />
            </Link>
            <p style={{ marginTop: "16px", fontSize: "14px", color: "#B8C6D9", maxWidth: "320px" }}>
              Apply IDP Online helps travelers prepare an International Driving Permit application
              from home. We are an independent service, not a government body or embassy.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "#7C93B3",
                  marginBottom: "16px",
                }}
              >
                {col.title}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontSize: "14px", color: "#DCE6F2" }}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            padding: "24px 0",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "13px",
            color: "#7C93B3",
          }}
        >
          <span>© {new Date().getFullYear()} Apply IDP Online. All rights reserved.</span>
          <span style={{ maxWidth: "560px" }}>
            Apply IDP Online is an independent private company preparing a multi-language translation
            of your valid driver&apos;s license, in the spirit of the 1949 Geneva and 1968 Vienna
            Conventions. It supplements — never replaces — your original license. Not a government
            agency; not affiliated with AAA, AATA, FIA, AIT, or the United Nations.
          </span>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            padding: "16px 0 4px",
            fontSize: "12px",
            color: "#7C93B3",
          }}
        >
          ApplyIDP International LLC · 129 N Higgins Ave STE 309D, Missoula, MT 59802, USA
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
