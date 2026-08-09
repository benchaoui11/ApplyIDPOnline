import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/country/Breadcrumb";
import IconBadge from "@/components/IconBadge";
import KeyFacts from "@/components/knowledge/KeyFacts";
import FaqAccordion from "@/components/FaqAccordion";
import PricingCards from "@/components/PricingCards";
import { SITE_URL, ORGANIZATION_ID, ORGANIZATION_NODE, WEBSITE_ID, getAggregateOfferNode } from "@/lib/schema";

// Daily regeneration so the validity pills' relative "Expires {year}" labels
// (components/PricingCards.tsx) never drift more than a day out of date on
// this statically-generated page.
export const revalidate = 86400;

const PAGE_URL = `${SITE_URL}/pricing`;

const TITLE = "International Driving Permit Pricing & Cost";
const DESCRIPTION =
  "Digital IDP from $39, Print + Digital from $69 — one-time payment, no subscriptions. Compare formats, shipping, and validity options before you apply.";
const OG_IMAGE = {
  url: `${SITE_URL}/images/applyidponline-digital-print-permit-options.webp`,
  width: 1200,
  height: 960,
  alt: "Apply IDP Online — Digital and Print + Digital International Driving Permit formats",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const IN_THIS_GUIDE = [
  { id: "packages", label: "Compare packages" },
  { id: "buying-guide", label: "Which one should I choose?" },
  { id: "price-explained", label: "Why prices differ" },
  { id: "compare", label: "Full comparison table" },
  { id: "trust", label: "Payment & trust" },
  { id: "faq", label: "FAQ" },
];

const COMPARISON_ROWS: { label: string; digital: boolean | string; both: boolean | string }[] = [
  { label: "Digital IDP delivered by email", digital: true, both: true },
  { label: "Valid for 1, 2, or 3 years", digital: true, both: true },
  { label: "Translated into 11 languages", digital: true, both: true },
  { label: "Reviewed by our team before dispatch", digital: true, both: true },
  { label: "Printed booklet shipped to your address", digital: false, both: true },
  { label: "Tracked delivery", digital: false, both: true },
  { label: "Backup digital copy while you wait for the post", digital: false, both: true },
  { label: "Best for", digital: "Quick trips, tight timelines", both: "Longer trips, backup format" },
  { label: "Typical traveller", digital: "Finalizing plans within 1–2 weeks", both: "Planning well ahead, or wanting a physical backup" },
  { label: "Delivery method", digital: "Email only", both: "Email, plus tracked worldwide mail" },
  { label: "Availability", digital: "Accepted anywhere a digital copy is shown", both: "Accepted everywhere, including print-preferring locations" },
  { label: "Value", digital: "Lower cost, same legal content", both: "Most complete option, modest premium over digital" },
];

const PRICING_FAQ = [
  {
    q: "Is this a one-time price?",
    a: "Yes. Both packages are a single one-time price. There is no subscription and no recurring charge.",
  },
  {
    q: "Which package do most travelers choose?",
    a: "Print + Digital is our most commonly chosen package, mainly for the physical backup and broader acceptance — though Digital only is a fully legitimate choice for travelers who don't need a printed booklet.",
  },
  {
    q: "What are the fees for an International Driving Permit?",
    a: "Digital Only runs from $39 to $59 and Print + Digital from $69 to $89, depending on validity length (1, 2, or 3 years). That's the full fee — no hidden add-ons at checkout.",
  },
  {
    q: "Why does the price change with validity?",
    a: "Longer validity means your permit stays usable across more trips, so the 2 and 3-year options cost modestly more than 1 year. There's no separate renewal fee during that period.",
  },
  {
    q: "When do I pay?",
    a: "You submit your application and documents first. Our team reviews everything, then follows up by email with payment instructions before your permit is prepared.",
  },
  {
    q: "Can I change validity after applying?",
    a: "Contact us as soon as possible after submitting — we can usually update the validity period before your permit is prepared.",
  },
  {
    q: "Can I upgrade from Digital Only to Print + Digital after applying?",
    a: "Yes, if you contact us before your permit is prepared — we can switch your package and adjust payment accordingly. Once a printed booklet has shipped, it can't be added retroactively to a digital-only order.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    q: "Do you offer refunds?",
    a: "Yes, in specific cases.",
    links: [{ href: "/legal/refund-policy", label: "Read our refund policy" }],
  },
];

function PricingSchema() {
  const serviceId = `${PAGE_URL}#service`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_NODE,
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Pricing", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        mainEntity: { "@id": `${PAGE_URL}#faqpage` },
        about: { "@id": serviceId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "International Driving Permit application-assistance service",
        provider: { "@id": ORGANIZATION_ID },
        url: PAGE_URL,
        offers: getAggregateOfferNode(),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faqpage`,
        mainEntity: PRICING_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function PricingPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
      <PricingSchema />

      {/* Hero */}
      <section className="section" style={{ paddingTop: "36px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Pricing</p>
          <h1>How Much Does an International Driving Permit Cost?</h1>
          <p style={{ marginTop: "14px", color: "var(--text-light)", fontSize: "16px", maxWidth: "620px", margin: "14px auto 0" }}>
            An International Driving Permit costs $39–59 for Digital only, or $69–89 for Print +
            Digital, depending on validity length (1, 2, or 3 years) — Digital covers just the
            phone-ready document, Print + Digital adds a physical booklet by mail. The entire
            process, from application to payment, happens online. Payment itself is one-time and
            collected only after your application is reviewed and approved, not upfront.
          </p>
        </div>
      </section>

      {/* In this guide */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: "8px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card-elevated" style={{ padding: "18px 22px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-light)" }}>
              In this guide
            </p>
            <div style={{ marginTop: "12px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "8px 16px" }}>
              {IN_THIS_GUIDE.map((t) => (
                <a key={t.id} href={`#${t.id}`} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--blue)" }}>
                  <span aria-hidden="true" style={{ color: "var(--border)" }}>—</span>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Package cards */}
      <section className="section" id="packages" style={{ scrollMarginTop: "96px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Digital or Print + Digital — Compare the Two Packages</h2>
          <p style={{ marginTop: "10px", color: "var(--text-light)", fontSize: "15px", maxWidth: "560px", margin: "10px auto 0" }}>
            Both packages carry identical legal content — the difference is delivery format, not
            what the document says. Pick a validity period to see the exact total.
          </p>
        </div>

        <div className="container" style={{ marginTop: "32px" }}>
          <PricingCards />
        </div>

        <p style={{ textAlign: "center", marginTop: "28px", fontSize: "13px", color: "var(--text-light)" }}>
          Prices shown in USD. Payment is collected after your application is reviewed — see the FAQ below.
        </p>
      </section>

      {/* Buying guide */}
      <section className="section" id="buying-guide" style={{ background: "var(--surface)", scrollMarginTop: "96px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ textAlign: "center" }}>Which Package Should You Choose?</h2>
          <p style={{ marginTop: "10px", color: "var(--text-light)", fontSize: "15px", textAlign: "center" }}>
            It comes down to your travel timeline and what your destination or rental company
            expects — not one option being objectively better than the other.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "32px" }} className="grid-2">
            <div className="card-elevated" style={{ padding: "22px" }}>
              <h3 style={{ fontSize: "16px" }}>Choose Digital if...</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Your trip is coming up soon and you don't want to wait on the mail.",
                  "You're comfortable showing a document on your phone at a rental counter.",
                  "Neither your destination nor your rental company has specifically asked for a printed booklet.",
                  "You want the lower-cost option and don't need a physical backup.",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ marginTop: "1px" }}>
                      <IconBadge name="check" size={16} />
                    </span>
                    <span style={{ fontSize: "13.5px", color: "var(--text)", lineHeight: 1.55 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated" style={{ padding: "22px", borderTop: "2px solid var(--blue)" }}>
              <h3 style={{ fontSize: "16px" }}>Choose Print + Digital if...</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  "Your trip is longer, or involves multiple countries with different expectations.",
                  "Your destination or rental company has told you a printed booklet is expected.",
                  "You want a physical backup in case your phone is lost, dead, or unreachable.",
                  "You're applying with enough lead time for shipping.",
                ].map((t) => (
                  <li key={t} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <span style={{ marginTop: "1px" }}>
                      <IconBadge name="check" size={16} />
                    </span>
                    <span style={{ fontSize: "13.5px", color: "var(--text)", lineHeight: 1.55 }}>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p style={{ textAlign: "center", marginTop: "22px", fontSize: "13.5px", color: "var(--text-light)" }}>
            Still unsure?{" "}
            <Link href="/countries" style={{ fontWeight: 600, color: "var(--blue)" }}>Check your destination&apos;s guide →</Link>
          </p>
        </div>
      </section>

      {/* Price explanation */}
      <section className="section" id="price-explained" style={{ scrollMarginTop: "96px" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2 style={{ textAlign: "center" }}>Why Do the Two Packages Cost Different Amounts?</h2>
          <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7, textAlign: "center" }}>
            Digital costs less because there&apos;s nothing to print or ship — the price covers
            document preparation and review only. Print + Digital costs more because it adds
            booklet production, worldwide shipping, and tracked delivery on top of that same
            review process. Validity length (1, 2, or 3 years) adds a modest amount within either
            package, since a longer-validity permit stays usable across more future trips with no
            separate renewal fee. Both packages are a one-time payment — neither is a subscription.
          </p>
          <div style={{ marginTop: "24px", maxWidth: "460px", marginLeft: "auto", marginRight: "auto" }}>
            <KeyFacts
              title="At a glance"
              facts={[
                { label: "Digital cost covers", value: "Preparation & review" },
                { label: "Print + Digital also covers", value: "Booklet, shipping & tracking" },
                { label: "Subscriptions", value: "None — one-time payment" },
                { label: "Payment collected", value: "After review & approval" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section" id="compare" style={{ background: "var(--surface)", scrollMarginTop: "96px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2>Digital vs. Print + Digital — Full Comparison</h2>
        </div>
        <div className="container card-elevated" style={{ maxWidth: "780px", padding: "8px 24px 16px", marginTop: "28px" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "480px" }}>
              <caption className="visually-hidden">Comparison of what&apos;s included in the Digital Only and Print + Digital International Driving Permit packages</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ textAlign: "left", padding: "16px 8px", fontSize: "13px", color: "var(--text-light)", fontWeight: 600 }}>What&apos;s included</th>
                  <th scope="col" style={{ textAlign: "center", padding: "16px 8px", fontSize: "13.5px", color: "var(--navy)", fontWeight: 700 }}>Digital only</th>
                  <th scope="col" style={{ textAlign: "center", padding: "16px 8px", fontSize: "13.5px", color: "var(--blue)", fontWeight: 700 }}>Print + digital</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={row.label} style={{ borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface)" }}>
                    <td style={{ padding: "13px 8px", fontSize: "13.5px", color: "var(--text)" }}>{row.label}</td>
                    <td style={{ textAlign: "center", padding: "13px 8px", fontSize: "12.5px", color: "var(--text-light)" }}>
                      {typeof row.digital === "boolean" ? <CheckOrDash included={row.digital} /> : row.digital}
                    </td>
                    <td style={{ textAlign: "center", padding: "13px 8px", fontSize: "12.5px", color: "var(--text-light)" }}>
                      {typeof row.both === "boolean" ? <CheckOrDash included={row.both} /> : row.both}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section" id="trust" style={{ scrollMarginTop: "96px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ textAlign: "center" }}>Payment Is Secure and Straightforward</h2>
          <p style={{ marginTop: "10px", color: "var(--text-light)", fontSize: "15px", textAlign: "center" }}>
            No subscriptions, transparent published pricing, and a human review before anything
            is prepared.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "12px", marginTop: "26px" }}>
            {[
              { icon: "shield" as const, label: "Secure payment" },
              { icon: "check" as const, label: "One-time payment, no subscriptions" },
              { icon: "tag" as const, label: "Transparent pricing" },
              { icon: "route" as const, label: "Application review" },
              { icon: "globe" as const, label: "Worldwide shipping" },
              { icon: "document" as const, label: "Refund policy" },
              { icon: "message" as const, label: "Customer support" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "13px 16px",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-sm)",
                  background: "var(--white)",
                }}
              >
                <IconBadge name={item.icon} size={16} />
                <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--navy)" }}>{item.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 22px", marginTop: "24px" }}>
            <Link href="/legal/refund-policy" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>Refund policy →</Link>
            <Link href="/legal/shipping" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>Shipping policy →</Link>
            <Link href="/how-to-apply" style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>How application review works →</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq" style={{ background: "var(--surface)", scrollMarginTop: "96px" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2 style={{ textAlign: "center" }}>International Driving Permit Pricing FAQ</h2>
          <div style={{ marginTop: "28px" }}>
            <FaqAccordion items={PRICING_FAQ.map((f) => ({ q: f.q, a: f.a, links: f.links }))} />
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <p className="section-kicker-blue">Related</p>
          <h2 style={{ fontSize: "20px" }}>Guides and resources</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: "18px" }}>
            {[
              { href: "/how-to-apply", label: "How to apply" },
              { href: "/what-is-idp", label: "What is an IDP" },
              { href: "/countries", label: "Browse destination guides" },
              { href: "/faq", label: "Full FAQ library" },
              { href: "/legal/refund-policy", label: "Refund policy" },
              { href: "/legal/shipping", label: "Shipping policy" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function CheckOrDash({ included }: { included: boolean }) {
  if (!included) {
    return <span style={{ color: "var(--border)", fontSize: "14px" }}>—</span>;
  }
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" style={{ display: "inline-block" }} aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="8.5" fill="var(--success-bg)" />
      <path d="M5 8.6l2.2 2.2L12 6" stroke="var(--success)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
