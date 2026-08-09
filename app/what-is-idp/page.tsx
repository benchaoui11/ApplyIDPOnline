import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/country/Breadcrumb";
import StatRow from "@/components/content/StatRow";
import DirectAnswerBox from "@/components/content/DirectAnswerBox";
import FaqAccordion from "@/components/FaqAccordion";
import IconBadge from "@/components/IconBadge";
import Callout from "@/components/knowledge/Callout";
import MythVsFact from "@/components/knowledge/MythVsFact";
import Timeline from "@/components/knowledge/Timeline";
import KeyFacts from "@/components/knowledge/KeyFacts";
import VehicleCategoryGrid from "@/components/knowledge/VehicleCategoryGrid";
import TableOfContents from "@/components/knowledge/TableOfContents";

const SITE_URL = "https://applyidponline.com";
const PAGE_URL = `${SITE_URL}/what-is-idp`;
const WHAT_IS_IDP_DESCRIPTION =
  "The complete, sourced guide to the International Driving Permit: definition, the 1949 and 1968 UN conventions, vehicle categories, recognition, and how to spot a fake.";
const OG_IMAGE = {
  url: `${SITE_URL}/images/applyidponline-multilingual-driving-categories.webp`,
  width: 1804,
  height: 872,
  alt: "An International Driving Permit showing multilingual translations and vehicle categories",
};

export const metadata: Metadata = {
  title: "What is an International Driving Permit (IDP)?",
  description: WHAT_IS_IDP_DESCRIPTION,
  alternates: { canonical: "/what-is-idp" },
  openGraph: {
    title: "What is an International Driving Permit (IDP)?",
    description: WHAT_IS_IDP_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "What is an International Driving Permit (IDP)?",
    description: WHAT_IS_IDP_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const TOC = [
  { id: "what-is-it", label: "What is an IDP?" },
  { id: "do-you-need-one", label: "Do you need one?" },
  { id: "how-to-get-one", label: "How to get one" },
  { id: "validity", label: "Validity" },
  { id: "how-it-works", label: "How it works" },
  { id: "how-it-compares", label: "IDP vs. other documents" },
  { id: "why-it-exists", label: "Why it exists" },
  { id: "where-recognized", label: "Where it's recognized" },
  { id: "real-life-use", label: "Using it on a trip" },
  { id: "common-mistakes", label: "Common mistakes" },
  { id: "common-myths", label: "Common myths" },
  { id: "before-your-trip", label: "Before your trip" },
  { id: "faq", label: "FAQ" },
];

const CONVENTIONS = [
  {
    year: "1926",
    title: "Paris — International Convention relative to Motor Traffic",
    body: "The original international framework for cross-border driving documents. Superseded by the Geneva Convention in the countries that later adopted it.",
    status: "superseded" as const,
  },
  {
    year: "1949",
    title: "Geneva Convention on Road Traffic",
    body: "Replaced the 1926 Paris convention. Currently has 102 contracting parties — still the version most widely recognized worldwide.",
    status: "current" as const,
  },
  {
    year: "1968",
    title: "Vienna Convention on Road Traffic",
    body: "A newer treaty that, between its own contracting parties, supersedes Geneva. Added vehicle subcategories and modernized formatting the 1949 version didn't have.",
    status: "current" as const,
  },
];

const COMPARISON_ROWS: { doc: string; what: string; difference: string }[] = [
  {
    doc: "Your driver's license",
    what: "The actual legal credential that gives you driving rights.",
    difference: "An IDP has no independent authority — it only translates what your license already grants.",
  },
  {
    doc: "A certified translation",
    what: "A one-off translation from a translator, consulate, or notary.",
    difference: "Not standardized or treaty-backed, so recognition varies far more widely than an IDP's.",
  },
  {
    doc: "A digital copy of your license",
    what: "A photo or scan of your original license.",
    difference: "Still in its original language — it doesn't solve the legibility problem an IDP solves.",
  },
  {
    doc: "A temporary or provisional license",
    what: "A domestic document issued while you wait for your permanent license.",
    difference: "A domestic-only document — it has no international translation function at all.",
  },
  {
    doc: "A compliant foreign license alone",
    what: "Your original license, used abroad without any IDP.",
    difference: "Accepted without an IDP only in specific Vienna Convention cases — the exception, not the default.",
  },
];

const MISTAKES = [
  {
    icon: "calendar" as const,
    title: "Applying too close to your license's expiry",
    body: "Your IDP's validity is capped by your original license's expiry date, whichever comes first. A permit issued days before your license expires won't cover a return trip months later.",
  },
  {
    icon: "document" as const,
    title: "Leaving the original license at home",
    body: "Officials and rental agents can refuse to proceed without it — some will hold your booking while you sort it out, others will decline the rental outright, and neither outcome is guaranteed reversible on the spot.",
  },
  {
    icon: "route" as const,
    title: "Assuming a rental company's request is a legal requirement",
    body: "A rental company can ask for an IDP as its own policy even where local law doesn't require one, and vice versa. Check both separately rather than assuming one implies the other.",
  },
  {
    icon: "pin" as const,
    title: "Trusting a seller that promises validity beyond 3 years",
    body: "No convention allows more than 3 years of validity. A longer promise isn't a better deal — it's a reason to double-check who you're buying from.",
  },
];

const MYTHS = [
  {
    myth: "An International Driving Permit is a license you can drive on by itself.",
    fact: "It has no independent authority. It's a translation and identity document that must be carried together with your valid original driver's license at all times.",
  },
  {
    myth: "\"International Driver's License\" is a different, possibly fake document from an IDP.",
    fact: "It's the same document. \"International Driving Permit\" is the official term from the Geneva and Vienna conventions; \"International Driver's License\" is simply the common phrase most people search for.",
  },
  {
    myth: "It has security features like holograms to prevent forgery, similar to a passport.",
    fact: "It doesn't. Legitimacy relies on the issuing organization and the standardized format, not physical security features — which is exactly why checking who issued yours matters more than what it looks like.",
  },
  {
    myth: "Any IDP is accepted everywhere in the world.",
    fact: "Recognition depends on which convention (if any) your destination is party to, and on local or rental-company policy. Coverage is wide but not universal.",
  },
];

const IDP_FAQ = [
  {
    q: "Is an International Driving Permit the same as an International Driver's License?",
    a: "Yes. \"International Driving Permit\" is the official term defined by the 1949 Geneva and 1968 Vienna Conventions. \"International Driver's License\" is the common name most travelers search for and use interchangeably — it refers to the same document.",
  },
  {
    q: "Does an IDP replace my regular driver's license?",
    a: "No. It's a translation and identity document that accompanies your existing license — it does not replace it. Carry both together whenever you drive abroad.",
  },
  {
    q: "Do I need one for every country I visit?",
    a: "No. A single valid IDP is generally usable across the countries that recognize the convention it was issued under, though requirements can still vary by destination.",
    links: [{ href: "/countries", label: "Browse destination guides" }],
  },
  {
    q: "Can I apply for an International Driving Permit online?",
    a: "Yes. Apply IDP Online reviews your license and documents and prepares your application without a branch visit or appointment — an alternative to applying in person through AAA or AATA.",
    links: [{ href: "/apply", label: "Start your application" }],
  },
  {
    q: "How much does an International Driving Permit cost, and how long does it take?",
    a: "Cost and fees depend on the service you use and whether you choose a digital or printed copy. See our pricing page for exact figures — most applicants finish the application itself in a few minutes.",
    links: [{ href: "/pricing", label: "Compare pricing" }],
  },
  {
    q: "Is Apply IDP Online affiliated with AAA or AATA?",
    a: "No. Apply IDP Online is a private, independent service. We are not affiliated with AAA, AATA, FIA, AIT, or the United Nations, and we are not a government agency, embassy, or motoring authority.",
  },
  {
    q: "What vehicle categories does an IDP cover?",
    a: "Whatever categories your original driver's license already includes — the IDP translates them, it doesn't add new ones. Common categories are A (motorcycles), B (cars), C (trucks), D (buses), and E (trailers).",
  },
];

function NextStepCta({ text, href, label }: { text: string; href: string; label: string }) {
  return (
    <div
      className="card-elevated"
      style={{
        marginTop: "22px",
        padding: "18px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        background: "var(--blue-50)",
      }}
    >
      <p style={{ fontSize: "14px", color: "var(--navy)", fontWeight: 500, margin: 0, maxWidth: "460px" }}>{text}</p>
      <Link href={href} className="btn btn-secondary" style={{ flexShrink: 0, whiteSpace: "nowrap" }}>
        {label}
      </Link>
    </div>
  );
}

function KnowledgeHubSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "What is an IDP", item: PAGE_URL },
        ],
      },
      {
        "@type": "Article",
        "@id": `${PAGE_URL}#article`,
        headline: "What is an International Driving Permit (IDP)?",
        description:
          "The complete, sourced guide to the International Driving Permit: definition, the 1949 and 1968 UN conventions, vehicle categories, recognition, and how to spot a fake.",
        inLanguage: "en",
        mainEntityOfPage: PAGE_URL,
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "What is an International Driving Permit (IDP)?",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        mainEntity: { "@id": `${PAGE_URL}#article` },
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faqpage`,
        mainEntity: IDP_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function WhatIsIdpPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "What is an IDP" }]} />
      <KnowledgeHubSchema />

      {/* Hero */}
      <section className="section" style={{ paddingTop: "36px", paddingBottom: "32px" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Knowledge center</p>
          <h1>What is an International Driving Permit?</h1>
          <p style={{ marginTop: "14px", fontSize: "15.5px", color: "var(--text-light)" }}>
            An International Driving Permit translates your driver&apos;s license into a
            standardized, multi-language format for driving abroad. It&apos;s typically needed for
            renting a car or driving in countries that require one, works alongside your original
            license, is recognized under the Geneva and Vienna Conventions, and can be applied for
            online instead of visiting an office in person.
          </p>
          <div style={{ marginTop: "24px", maxWidth: "560px", margin: "24px auto 0" }}>
            <StatRow
              stats={[
                { value: "2", label: "governing conventions" },
                { value: "A–E", label: "vehicle categories" },
                { value: "≤3 yrs", label: "maximum validity" },
              ]}
            />
          </div>
        </div>
      </section>

      {/* In this guide */}
      <section className="section" style={{ paddingTop: 0, paddingBottom: "8px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card-elevated" style={{ padding: "18px 22px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-light)" }}>
              In this guide
            </p>
            <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
              {TOC.filter((t) => t.id !== "faq").map((t) => (
                <a key={t.id} href={`#${t.id}`} style={{ fontSize: "13px", fontWeight: 600, color: "var(--blue)" }}>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="section" style={{ paddingTop: "16px", paddingBottom: "24px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <DirectAnswerBox kicker="QUICK ANSWER" links={[{ href: "/how-to-apply", label: "How to apply" }, { href: "/countries", label: "Check your destination" }]}>
            An International Driving Permit (IDP) — often called an International Driver&apos;s
            License — translates your existing driver&apos;s license into a standardized,
            multi-language format recognized under international road-traffic treaties. It has no
            authority on its own: you carry it together with your valid original license, never
            instead of it. In practice, that means a police officer or rental agent abroad can read
            your license at a glance, even if they don&apos;t read its original language.
          </DirectAnswerBox>
        </div>
      </section>

      {/* Body: TOC + content */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container kh-layout" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "48px", alignItems: "start" }}>
          <div className="kh-toc">
            <TableOfContents entries={TOC} />
          </div>

          <div className="kh-content" style={{ minWidth: 0 }}>
            {/* 1. What is an IDP */}
            <div id="what-is-it" style={{ scrollMarginTop: "96px" }}>
              <h2>What is an International Driving Permit?</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                An International Driving Permit — sometimes searched as an international permit to
                drive, or simply an IDP — translates the details on your existing driver&apos;s
                license into a standardized, multi-language booklet: your name, photo, license
                number, and vehicle categories. Its meaning is narrow and specific: it exists so a
                traffic officer, rental-counter employee, or border official who can&apos;t read
                your license&apos;s original language can still verify who you are and what
                you&apos;re licensed to drive.
              </p>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                It doesn&apos;t test your driving ability, and it doesn&apos;t grant driving rights on
                its own — it&apos;s a translation and identity layer that sits alongside your real
                license, not a replacement for it.
              </p>
              <Callout variant="important" title="Same document, several names">
                &ldquo;International Driving Permit&rdquo; is the precise term used in the Geneva and
                Vienna Conventions. &ldquo;International Driver&apos;s License,&rdquo;
                &ldquo;international driving license,&rdquo; and — outside the US — &ldquo;international
                driving licence&rdquo; are all what most people actually type into a search bar.
                They&apos;re the same document.
              </Callout>
              <div style={{ marginTop: "18px", maxWidth: "420px" }}>
                <KeyFacts
                  title="At a glance"
                  facts={[
                    { label: "Grants driving rights alone", value: "No" },
                    { label: "Must be carried with", value: "Original license" },
                    { label: "Languages", value: "Multiple" },
                    { label: "Vehicle categories covered", value: "Same as your license" },
                  ]}
                />
              </div>
            </div>

            {/* 2. Do you need one */}
            <div id="do-you-need-one" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>Do you need an International Driving Permit?</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                It depends on three things: your destination&apos;s law, your rental company&apos;s
                own policy, and whether your license is already in a widely-read format — not
                everyone needs one, and there&apos;s no single global rule.
              </p>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                <strong style={{ color: "var(--navy)" }}>Rental companies</strong> often request one
                as their own policy, independent of local law — a company that can&apos;t read a
                foreign license has no fast way to confirm it&apos;s valid or match the name against
                a passport. <strong style={{ color: "var(--navy)" }}>Some countries</strong> write the
                requirement directly into traffic law, so driving without one can mean being treated
                as unlicensed. <strong style={{ color: "var(--navy)" }}>Travelers whose license
                isn&apos;t in a widely-read format</strong> — different alphabet, no photo, no Latin
                transliteration — tend to need one even in places where it isn&apos;t strictly
                required, simply so the license itself is legible.
              </p>
              <Callout variant="important" title="A real exception worth knowing">
                Some countries that are party to the 1968 Vienna Convention accept a domestic
                license directly if that license already meets the convention&apos;s own format
                requirements — without a separate IDP. This is a genuine, destination-specific
                exception, not a general rule, so confirm it against your specific license and
                destination rather than assuming it applies to you.
              </Callout>
              <NextStepCta
                text="Requirements are set per destination, not by a single global rule."
                href="/countries"
                label="Check your destination"
              />
            </div>

            {/* 3. How to get one */}
            <div id="how-to-get-one" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>How to get an International Driving Permit</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                In the United States, you can get one two ways: in person through AAA or AATA, the
                two organizations authorized to issue them, or online through an independent
                preparation service like Apply IDP Online.
              </p>
              <div style={{ marginTop: "18px", maxWidth: "460px" }}>
                <KeyFacts
                  title="What you need to apply"
                  facts={[
                    { label: "Valid driver's license", value: "Required" },
                    { label: "Recent photo", value: "Required" },
                    { label: "Signature", value: "Required" },
                    { label: "Minimum age", value: "18" },
                  ]}
                />
              </div>
              <p style={{ marginTop: "16px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                The online route is fully remote: securely upload your documents, choose a digital
                permit or a printed booklet shipped to you, and reach a real person if anything
                needs attention. Fees and delivery times vary by provider and format.
              </p>
              <NextStepCta
                text="See the complete step-by-step process, from documents to delivery."
                href="/how-to-apply"
                label="See the full application guide"
              />
            </div>

            {/* 4. Validity */}
            <div id="validity" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>International Driving Permit validity</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                A permit issued under the 1949 Geneva Convention is valid for up to 1 year; one
                issued under the 1968 Vienna Convention can be valid for up to 3 years. Either way,
                it stops being valid the moment your underlying driver&apos;s license expires,
                whichever comes first — a longer-validity permit doesn&apos;t extend your
                license&apos;s own expiry date.
              </p>
              <div style={{ marginTop: "16px", maxWidth: "420px" }}>
                <KeyFacts
                  facts={[
                    { label: "Geneva Convention format", value: "Up to 1 year" },
                    { label: "Vienna Convention format", value: "Up to 3 years" },
                    { label: "Always capped by", value: "Your license's expiry" },
                  ]}
                />
              </div>
            </div>

            {/* 5. How it works */}
            <div id="how-it-works" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>How an International Driving Permit works</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                The booklet&apos;s layout is standardized so it reads the same way anywhere in the
                world: an identity page, a vehicle-categories page, and — on a printed copy — a
                cover stating the validity period and issuing convention.
              </p>
              <div className="card-elevated" style={{ width: "100%", maxWidth: "620px", borderRadius: "var(--radius)", overflow: "hidden", padding: "8px", marginTop: "20px" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "1624 / 969" }}>
                  <Image
                    src="/images/applyidponline-permit-booklet-details-categories.webp"
                    alt="Apply IDP Online permit booklet preview with identity page and vehicle categories"
                    fill
                    style={{ objectFit: "cover", borderRadius: "calc(var(--radius) - 8px)" }}
                    sizes="(max-width: 880px) 92vw, 620px"
                  />
                </div>
              </div>

              <h3 style={{ fontSize: "17px", marginTop: "36px" }}>What the booklet actually looks like</h3>
              <p style={{ marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)", lineHeight: 1.65 }}>
                It&apos;s a small booklet, roughly passport-photo-page-sized, with a plain cover
                printed in the issuing country&apos;s language, shown above. Open it and the first
                page is your identity page — name, photo, date of birth, and license number — followed
                by a vehicle-categories page marking which of A–E your license covers. Both repeat
                across several language pages, which is exactly what lets the same booklet read
                correctly whether it&apos;s checked in Lisbon or Osaka: the officer isn&apos;t
                translating anything, just reading the language page that matches their own.
              </p>

              <h3 style={{ fontSize: "17px", marginTop: "36px" }}>Vehicle categories</h3>
              <p style={{ marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)", lineHeight: 1.65 }}>
                It lists whatever categories your original license already covers — nothing more. If
                your license doesn&apos;t include motorcycles, your IDP won&apos;t either; the permit
                translates your existing rights, it doesn&apos;t expand them.
              </p>
              <div style={{ marginTop: "18px" }}>
                <VehicleCategoryGrid />
              </div>

              <h3 style={{ fontSize: "17px", marginTop: "36px" }}>Digital vs. printed</h3>
              <p style={{ marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)", lineHeight: 1.65 }}>
                Both formats carry identical legal content and validity dates — the difference is
                only how you present it. A digital copy travels on your phone and is often enough
                for identification; some rental counters and traffic officers, especially outside
                major cities, still prefer the traditional printed booklet. If you&apos;re unsure
                which your destination expects, printed works everywhere digital does, plus a few
                places it doesn&apos;t — and it&apos;s a choice you make when you apply, not
                something your destination locks you into in advance.
              </p>
              <div className="card-elevated" style={{ width: "100%", maxWidth: "420px", borderRadius: "var(--radius)", overflow: "hidden", marginTop: "16px" }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "1200 / 960" }}>
                  <Image
                    src="/images/applyidponline-digital-print-permit-options.webp"
                    alt="Apply IDP Online digital and printed permit options displayed together"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 880px) 92vw, 420px"
                  />
                </div>
              </div>
            </div>

            {/* 6. How it compares */}
            <div id="how-it-compares" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>IDP vs. other travel documents</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                An IDP differs from a certified translation, a digital copy of your license, a
                temporary license, and a foreign license used alone — each solves a different
                problem, or none at all.
              </p>
              <div className="card-elevated" style={{ marginTop: "20px", padding: "8px 20px 12px" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", padding: "14px 8px", fontSize: "12.5px", color: "var(--text-light)", fontWeight: 600 }}>Document</th>
                        <th style={{ textAlign: "left", padding: "14px 8px", fontSize: "12.5px", color: "var(--text-light)", fontWeight: 600 }}>What it is</th>
                        <th style={{ textAlign: "left", padding: "14px 8px", fontSize: "12.5px", color: "var(--text-light)", fontWeight: 600 }}>Key difference from an IDP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON_ROWS.map((row, i) => (
                        <tr key={row.doc} style={{ borderTop: "1px solid var(--border)", background: i % 2 === 0 ? "transparent" : "var(--surface)" }}>
                          <td style={{ padding: "13px 8px", fontSize: "13.5px", fontWeight: 600, color: "var(--navy)", verticalAlign: "top" }}>{row.doc}</td>
                          <td style={{ padding: "13px 8px", fontSize: "13px", color: "var(--text-light)", verticalAlign: "top" }}>{row.what}</td>
                          <td style={{ padding: "13px 8px", fontSize: "13px", color: "var(--text-light)", verticalAlign: "top" }}>{row.difference}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p style={{ marginTop: "14px", fontSize: "13.5px", color: "var(--text-light)" }}>
                Which of these actually applies to your trip depends on your destination —{" "}
                <Link href="/countries" style={{ fontWeight: 600, color: "var(--blue)" }}>check its specific requirements</Link>.
              </p>
            </div>

            {/* 7. Why it exists */}
            <div id="why-it-exists" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>Why the International Driving Permit exists</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                It exists because different countries use different alphabets, formats, and
                languages on their driver&apos;s licenses, so governments agreed on a shared,
                treaty-based translation format instead of leaving every officer or agent abroad to
                guess. It isn&apos;t a product a company invented — it&apos;s a document format
                governments recognize by agreement, which is what makes it work at all.
              </p>
              <div style={{ marginTop: "24px" }}>
                <Timeline entries={CONVENTIONS} />
              </div>
              <p style={{ marginTop: "20px", fontSize: "14px", color: "var(--text-light)", lineHeight: 1.65 }}>
                Vienna succeeded Geneva to reflect growing international travel and more detailed
                vehicle categories — but since both treaties are still active today, the same
                question, &ldquo;is my IDP valid here?&rdquo;, can have a different answer depending
                on which one your destination is party to.
              </p>
            </div>

            {/* 8. Where it's recognized */}
            <div id="where-recognized" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>Where it&apos;s recognized</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                Recognition follows the same convention logic explained above: a country party to
                the Vienna Convention recognizes Vienna-format IDPs; that isn&apos;t automatically
                true for a country that&apos;s only party to Geneva, or to neither. Local practice
                and rental-company policy add a further layer on top of that legal baseline.
              </p>
              <div style={{ marginTop: "16px", maxWidth: "420px" }}>
                <KeyFacts
                  title="Recognition at a glance"
                  facts={[
                    { label: "Vienna Convention destinations", value: "Recognize Vienna-format IDPs" },
                    { label: "Geneva-only destinations", value: "May not recognize Vienna format" },
                    { label: "Rental-company policy", value: "Can require more than local law" },
                  ]}
                />
              </div>
              <Link href="/countries" className="btn btn-secondary" style={{ marginTop: "16px" }}>
                Check your destination
              </Link>
            </div>

            {/* 9. How it's used in real life */}
            <div id="real-life-use" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>How travelers actually use an International Driving Permit during a trip</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                It comes into play at specific points on a trip, not continuously — here&apos;s the
                order they actually happen in.
              </p>
              <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { text: "Before you travel: pack it with your original license and keep a digital backup of both — nothing to declare or activate before departure." },
                  { text: "At airline check-in: airlines check your passport and visa, not your IDP. It isn't a boarding requirement, so there's nothing to show until you're actually driving." },
                  { text: "Crossing a border: an officer may glance at it alongside your passport, but it's rarely scrutinized closely since it isn't an entry or visa document — its role starts once you're behind the wheel." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ marginTop: "1px" }}>
                      <IconBadge name="check" size={16} />
                    </span>
                    <p style={{ fontSize: "14.5px", color: "var(--text)", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "20px" }} className="wiu-grid">
                <div className="card-elevated" style={{ padding: "20px" }}>
                  <IconBadge name="tag" />
                  <h3 style={{ fontSize: "15px", marginTop: "14px" }}>At the rental counter</h3>
                  <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>
                    The agent checks the name and photo match and that your IDP&apos;s vehicle
                    category covers the car you&apos;re renting — it just makes the license part of
                    check-in fast.
                  </p>
                </div>
                <div className="card-elevated" style={{ padding: "20px" }}>
                  <IconBadge name="shield" />
                  <h3 style={{ fontSize: "15px", marginTop: "14px" }}>During a police stop</h3>
                  <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>
                    If the officer can&apos;t read your license, your IDP is what lets them verify
                    your name, photo, and categories without a translator. Local traffic law still
                    applies exactly as it would for a resident driver.
                  </p>
                </div>
                <div className="card-elevated" style={{ padding: "20px" }}>
                  <IconBadge name="layers" />
                  <h3 style={{ fontSize: "15px", marginTop: "14px" }}>For your insurance file</h3>
                  <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>
                    An IDP itself provides no coverage. If a claim ever involves a foreign license,
                    some insurers do reference IDP status, so check your specific policy rather than
                    assuming either way.
                  </p>
                </div>
              </div>
              <Callout variant="expert" title="What verification actually checks">
                Whether it&apos;s a rental agent, a police officer, or a border official, none of
                these checks rely on physical security features — an IDP has no hologram or
                watermark the way a passport does. What&apos;s actually being verified is that the
                name and photo match your original license, and that the booklet was issued by a
                recognized authority.
              </Callout>
            </div>

            {/* 10. Common mistakes */}
            <div id="common-mistakes" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>Common mistakes</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                Most problems travelers run into aren&apos;t about the document itself — they&apos;re
                about timing and assumptions. These four account for nearly everything that goes
                wrong.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "20px" }} className="mistakes-grid">
                {MISTAKES.map((m) => (
                  <div key={m.title} className="card-elevated" style={{ padding: "18px 20px" }}>
                    <IconBadge name={m.icon} />
                    <h3 style={{ fontSize: "14.5px", marginTop: "12px" }}>{m.title}</h3>
                    <p style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-light)", lineHeight: 1.6 }}>{m.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 11. Common myths */}
            <div id="common-myths" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>Common myths</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                These four misconceptions cause most of the confusion — and the most avoidable
                mistakes.
              </p>
              <div style={{ marginTop: "20px" }}>
                <MythVsFact items={MYTHS} />
              </div>
            </div>

            {/* 12. Before your trip */}
            <div id="before-your-trip" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>What to do before your trip</h2>
              <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)", lineHeight: 1.7 }}>
                Getting ready comes down to five checks.
              </p>
              <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { text: "Confirm what your destination actually requires — legal requirement, common request, or neither.", href: "/countries", label: "Check" },
                  { text: "Make sure your original license has enough validity left to cover your entire trip, not just the day you apply." },
                  { text: "Decide digital or printed based on where you're going — printed covers a few more places, digital is faster to have on hand." },
                  { text: "If your destination cares which convention issued your IDP, confirm which format your provider uses before you apply." },
                  { text: "Keep a photo or digital backup of both documents somewhere separate from the originals." },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <span style={{ marginTop: "1px" }}>
                      <IconBadge name="check" size={16} />
                    </span>
                    <p style={{ fontSize: "14.5px", color: "var(--text)", lineHeight: 1.6, margin: 0 }}>
                      {item.text}
                      {item.href && (
                        <>
                          {" "}
                          <Link href={item.href} style={{ fontWeight: 600, color: "var(--blue)" }}>
                            {item.label} →
                          </Link>
                        </>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <NextStepCta
                text="You've covered the fundamentals — starting your application takes about the same time as reading this page."
                href="/apply"
                label="Start your application"
              />
            </div>

            {/* FAQ */}
            <div id="faq" style={{ marginTop: "48px", scrollMarginTop: "96px" }}>
              <h2>FAQ</h2>
              <div style={{ marginTop: "20px" }}>
                <FaqAccordion items={IDP_FAQ} />
              </div>
              <Link href="/faq" style={{ display: "inline-block", marginTop: "18px", fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
                See the full FAQ (150+ questions) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related guides */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <p className="section-kicker-blue">Related</p>
          <h2 style={{ fontSize: "20px" }}>Guides and resources</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: "18px" }}>
            {[
              { href: "/how-to-apply", label: "How to apply" },
              { href: "/countries", label: "Browse destination guides" },
              { href: "/pricing", label: "Compare pricing" },
              { href: "/faq", label: "Full FAQ library" },
              { href: "/sources", label: "Our sources" },
              { href: "/editorial-policy", label: "Editorial policy" },
              { href: "/contact", label: "Contact us" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF" }}>Ready to prepare your International Driving Permit?</h2>
          <p style={{ marginTop: "12px", color: "#B8C6D9" }}>
            You know what it is, why it exists, and what to check before your trip. The
            application itself takes just a few minutes.
          </p>
          <Link href="/apply" className="btn btn-primary btn-lg" style={{ marginTop: "24px" }}>
            Start application
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .kh-layout { grid-template-columns: 1fr !important; }
          .kh-toc { order: -1; margin-bottom: 8px; }
        }
        @media (max-width: 720px) {
          .wiu-grid { grid-template-columns: 1fr !important; }
          .mistakes-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
