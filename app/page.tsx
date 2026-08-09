import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import ScreenshotFrame from "@/components/ScreenshotFrame";
import { flagEmoji } from "@/lib/destinations";
import IconBadge from "@/components/IconBadge";
import EligibilityChecker from "@/components/EligibilityChecker";
import WhyChooseUsWheel from "@/components/WhyChooseUsWheel";
import NetworkGlobe from "@/components/illustrations/NetworkGlobe";
import { SITE_URL, ORGANIZATION_ID, ORGANIZATION_NODE, WEBSITE_ID, WEBSITE_NODE, getAggregateOfferNode } from "@/lib/schema";

const OG_IMAGE = {
  url: `${SITE_URL}/images/applyidponline-permit-booklet-details-categories.webp`,
  width: 1624,
  height: 969,
  alt: "Apply IDP Online — International Driving Permit booklet showing personal details and vehicle categories",
};

export const metadata: Metadata = {
  title: "Apply IDP Online | International Driving Permit Application",
  description:
    "Apply for your International Driving Permit online in three simple steps. A private, guided application service — no embassy visit, no appointment required.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Apply IDP Online | International Driving Permit Application",
    description:
      "Apply for your International Driving Permit online in three simple steps.",
    url: SITE_URL,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply IDP Online | International Driving Permit Application",
    description:
      "Apply for your International Driving Permit online in three simple steps.",
    images: [OG_IMAGE.url],
  },
};

const TRUST_POINTS = [
  {
    icon: "shield" as const,
    title: "Clear about who we are",
    body: "An independent, private service — not a government office. We prepare your permit in the internationally recognised booklet format to carry alongside your valid licence.",
  },
  {
    icon: "check" as const,
    title: "Documents checked by a person",
    body: "A member of our team reviews every upload before your permit is prepared, and flags issues before they cause delays.",
  },
  {
    icon: "tag" as const,
    title: "Clear, published pricing",
    body: "One-time price shown up front on our pricing page. No subscriptions, no hidden add-ons at checkout.",
  },
  {
    icon: "message" as const,
    title: "Real support channel",
    body: "Reach a person by email or live chat if your application needs attention — see our contact page for response times.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Enter your driver details",
    body: "Fill a short, guided form with your license details and travel destination.",
    chip: "Guided form",
    image: "/images/applyidponline-secure-driver-details-form.webp",
    alt: "Apply IDP Online form step for entering traveler and driver license details",
  },
  {
    number: "02",
    title: "Upload your documents",
    body: "Add a photo of your license, a selfie, and your signature.",
    chip: "Secure upload",
    image: "/images/applyidponline-selfie-upload-checkpoint.webp",
    alt: "Apply IDP Online selfie upload step with applicant photo guidance",
  },
  {
    number: "03",
    title: "We prepare your permit",
    body: "Our team reviews your application and prepares your digital and/or printed IDP.",
    chip: "Reviewed by our team",
    image: "/images/applyidponline-approved-travel-permit-package.webp",
    alt: "Apply IDP Online permit package prepared for international travel",
  },
];

const REQUIREMENTS = [
  "A valid, unexpired driver's license from your home country",
  "You must be 18 years of age or older",
  "A clear photo of the front and back of your license",
  "A recent selfie",
  "A photo or scan of your signature",
];

const DESTINATIONS = [
  { name: "Thailand", code: "TH", slug: "thailand", note: "Scooter and car rentals across the islands" },
  { name: "United States", code: "US", slug: "united-states", note: "Cross-state road trips and rental pickups" },
  { name: "Spain", code: "ES", slug: "spain", note: "Mainland driving and island car hire" },
  { name: "Italy", code: "IT", slug: "italy", note: "Coastal drives and city rental counters" },
  { name: "Japan", code: "JP", slug: "japan", note: "Rural touring routes by car" },
  { name: "United Arab Emirates", code: "AE", slug: "united-arab-emirates", note: "City and desert rental agreements" },
];

const HOME_FAQ = [
  {
    q: "Is Apply IDP Online a government website?",
    a: "No. Apply IDP Online is an independent, private company that helps travelers prepare an International Driving Permit application. We are not affiliated with any government, embassy, or motor vehicle authority.",
  },
  {
    q: "Do I need an International Driving Permit?",
    a: "It depends on your destination, where your license was issued, and sometimes a rental company's own policy — not every traveler needs one. Check your specific destination rather than assuming either way.",
    links: [{ href: "/countries", label: "Check your destination" }],
  },
  {
    q: "How much does an International Driving Permit cost?",
    a: "Pricing starts from $39 for a digital-only permit, with print + digital bundles from $69 — the exact price depends on your chosen validity length.",
    links: [{ href: "/pricing", label: "See pricing" }],
  },
  {
    q: "How long does the application take?",
    a: "There's no time limit to complete the guided form — take as long as you need. Once your application is submitted, paid, and approved, your digital IDP is typically delivered in approximately 8 minutes; a printed booklet is also available and ships after your application is reviewed and approved.",
  },
  {
    q: "Do I still need my regular driver's license?",
    a: "Yes. An International Driving Permit is a translation and identity document that accompanies your existing license — it does not replace it. Carry both when driving abroad.",
  },
  {
    q: "What if my details are entered incorrectly?",
    a: "Our team checks each submission before your permit is prepared. If something looks off, we'll contact you using the details you provide before proceeding.",
  },
  {
    q: "Is an International Driving Permit the same as an International Driver's License?",
    a: "Yes. \"International Driving Permit\" is the official term defined by the 1949 Geneva and 1968 Vienna Conventions on Road Traffic. \"International Driver's License\" is the common name most travelers search for and use interchangeably — it refers to the same document, not a separate product.",
  },
  {
    q: "What does an International Driving Permit look like?",
    a: "It's a standardized booklet showing your photo, personal details, and licensed vehicle categories printed in multiple languages — the same document shown in the photo above on this page.",
    links: [{ href: "/what-is-idp", label: "See the full guide" }],
  },
  {
    q: "How long is an International Driving Permit valid?",
    a: "Validity depends on the issuing convention: a permit issued under the 1949 Geneva Convention is valid for up to 1 year, while one issued under the 1968 Vienna Convention can be valid for up to 3 years. Either way, it stops being valid once your underlying driver's license expires, whichever comes first.",
  },
  {
    q: "Do rental car companies require an International Driving Permit?",
    a: "It depends on both the destination country's law and the individual rental company's policy. Some countries legally require an IDP to rent or drive a car; separately, many rental companies request one as their own policy — for example when a license isn't printed in the Latin alphabet — even where local law doesn't strictly require it. Check your destination's requirements and your rental company's terms before you travel.",
  },
  {
    q: "How can I tell whether an IDP service is legitimate?",
    a: "Check for a clear statement that the company is independent and not a government agency or embassy, published contact details you can reach a person through, upfront pricing with no hidden fees, a stated refund policy, and cited sources for any legal or requirement claims it makes. A legitimate service discloses all of this openly rather than implying official status.",
  },
  {
    q: "Is Apply IDP Online affiliated with AAA or AATA?",
    a: "No. Apply IDP Online is a private, independent service. We are not affiliated with AAA, AATA, FIA, AIT, or the United Nations, and we are not a government agency, embassy, or motoring authority.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningSection />
      <TrustStripSection />
      <TrustSection />
      <ProcessSection />
      <BenefitsSection />
      <RequirementsSection />
      <DestinationsSection />
      <WhatIsIdpSection />
      <FaqSection />
      <FinalCtaSection />
      <JsonLd />
    </>
  );
}

function HeroSection() {
  return (
    <section className="section home-hero" style={{ paddingTop: "72px", paddingBottom: "72px", position: "relative", overflow: "hidden" }}>
      <NetworkGlobe
        className="hero-globe"
        style={{
          position: "absolute",
          bottom: "-200px",
          right: "-180px",
          width: "660px",
          height: "660px",
          color: "var(--navy)",
          opacity: 0.38,
          pointerEvents: "none",
        }}
      />
      <div
        className="container hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: "56px",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div>
          <p className="section-kicker-blue">Private application service</p>
          <h1>International Driving Permit Online — Apply in 3 Simple Steps</h1>
          <p style={{ marginTop: "20px", fontSize: "17px", color: "var(--text-light)", maxWidth: "480px" }}>
            Confirm your eligibility, upload your documents, and let our team prepare your permit.
            No appointments, no embassy visit — most applications take under 8 minutes to submit.
          </p>
          <div style={{ display: "flex", gap: "14px", marginTop: "32px", flexWrap: "wrap" }}>
            <Link href="/apply" className="btn btn-primary btn-lg">
              Start application
            </Link>
          </div>
          <div className="hero-tags">
            <Link href="/pricing" className="field-tag">
              From $39
            </Link>
            {["1–3 year validity", "Digital or printed"].map((label) => (
              <span key={label} className="field-tag">
                {label}
              </span>
            ))}
          </div>
        </div>

        <EligibilityChecker />
      </div>
      <style>{`
        @media (max-width: 880px) {
          .hero-globe { width: 440px !important; height: 440px !important; right: -140px !important; bottom: -160px !important; }
        }
        @media (max-width: 480px) {
          .hero-globe { width: 320px !important; height: 320px !important; right: -100px !important; bottom: -110px !important; }
        }
      `}</style>
    </section>
  );
}


function PositioningSection() {
  const points = [
    "An International Driving Permit (IDP) is a multi-language translation of your existing driver's licence, made to be shown alongside it when you drive abroad.",
    "We are a private, independent service that guides you through the application and prepares your permit. We are not a government agency, embassy, or motoring authority.",
    "You must hold a valid driver's licence and carry it together with your IDP at all times — an IDP never replaces your original licence.",
    "Requirements vary by destination country, where your licence was issued, the rental company, and local authorities. We help you prepare, but we can't guarantee any authority's decision.",
  ];
  return (
    <section className="section positioning-section" style={{ paddingTop: "8px", paddingBottom: "56px" }}>
      <div className="container">
        <div
          className="positioning-box"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "28px 30px",
          }}
        >
          <p className="section-kicker-blue">What this service is — in plain terms</p>
          <div
            className="positioning-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 40px", marginTop: "18px" }}
          >
            {points.map((point) => (
              <div key={point} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "3px" }} aria-hidden="true">
                  <circle cx="9" cy="9" r="9" fill="var(--blue-50)" />
                  <path d="M5.5 9l2.3 2.3L13 6.8" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p style={{ margin: 0, fontSize: "14.5px", color: "var(--text)" }}>{point}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "20px", fontSize: "13.5px", color: "var(--text-light)" }}>
            Read our{" "}
            <Link href="/legal/disclaimer" style={{ color: "var(--blue)", fontWeight: 600 }}>full disclaimer</Link>{" "}
            or the{" "}
            <Link href="/what-is-idp" style={{ color: "var(--blue)", fontWeight: 600 }}>complete guide to IDPs</Link>.
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .positioning-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function TrustStripSection() {
  const items: { icon: "globe" | "map" | "check" | "mail"; label: string }[] = [
    { icon: "globe", label: "Multi-language licence translation" },
    { icon: "map", label: "28+ destinations covered" },
    { icon: "check", label: "Reviewed by our team" },
    { icon: "mail", label: "Support by email" },
  ];

  return (
    <section style={{ background: "var(--navy)", padding: "22px 0" }}>
      <div className="container trust-strip" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#85B7EB" aria-hidden="true">
              {item.icon === "globe" && (
                <>
                  <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
                  <path d="M3 12h18M12 3c2.6 2.4 2.6 15.6 0 18M12 3c-2.6 2.4-2.6 15.6 0 18" strokeWidth="1.6" />
                </>
              )}
              {item.icon === "map" && (
                <path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z M9 4v14 M15 6v14" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              )}
              {item.icon === "check" && (
                <>
                  <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
              {item.icon === "mail" && (
                <>
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" strokeWidth="1.6" />
                  <path d="M4 7l8 6 8-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </>
              )}
            </svg>
            <span style={{ fontSize: "13.5px", color: "#FFFFFF", fontWeight: 600 }}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="section" style={{ background: "var(--surface)", paddingTop: "64px", paddingBottom: "64px" }}>
      <div className="container">
        <p className="section-kicker-blue">Transparency</p>
        <h2 style={{ maxWidth: "640px" }}>Is Apply IDP Online a Legitimate Service?</h2>
        <p style={{ marginTop: "14px", maxWidth: "640px", fontSize: "15.5px", color: "var(--text-light)" }}>
          Yes — Apply IDP Online discloses clearly that it&apos;s an independent, private service, not
          a government agency or embassy, with published pricing and a real support channel.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            marginTop: "40px",
          }}
          className="grid-4"
        >
          {TRUST_POINTS.map((point) => (
            <div key={point.title} style={{ background: "var(--white)", border: "1px solid var(--border)", borderTop: "2px solid var(--blue)", borderRadius: "var(--radius)", padding: "24px", boxShadow: "var(--shadow-card)" }}>
              <IconBadge name={point.icon} />
              <h3 style={{ fontSize: "16px", marginTop: "16px" }}>{point.title}</h3>
              <p style={{ marginTop: "10px", fontSize: "14px", color: "var(--text-light)" }}>{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <p className="section-kicker-blue">How it works</p>
        <h2 style={{ maxWidth: "680px" }}>How to get your International Driving Permit in 3 simple steps</h2>
        <p style={{ marginTop: "16px", maxWidth: "560px", color: "var(--text-light)", fontSize: "16px" }}>
          A guided flow from your driver details to a travel-ready document.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "28px", marginTop: "48px" }} className="grid-3">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number}>
              <ScreenshotFrame src={step.image} alt={step.alt} />
              <div style={{ padding: "20px 4px 0" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="field-tag">FIELD {step.number}</span>
                  <span style={{ fontSize: "12px", color: "var(--text-light)", fontWeight: 500 }}>{step.chip}</span>
                </div>
                <h3 style={{ marginTop: "14px" }}>{step.title}</h3>
                <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text-light)" }}>{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/apply" className="btn btn-primary btn-lg">
            Start application
          </Link>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Why travelers use us</p>
        <h2 style={{ maxWidth: "640px", margin: "0 auto" }}>Why Travelers Apply for Their IDP Online</h2>
        <div style={{ marginTop: "48px" }}>
          <WhyChooseUsWheel />
        </div>
      </div>
    </section>
  );
}

function RequirementsSection() {
  return (
    <section className="section">
      <div className="container two-col-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
        <div>
          <p className="section-kicker-blue">Before you start</p>
          <h2 style={{ maxWidth: "480px" }}>International Driving Permit Requirements</h2>
          <p style={{ marginTop: "16px", color: "var(--text-light)", fontSize: "16px", maxWidth: "460px" }}>
            To apply, you need a valid driver&apos;s license, a clear license photo, a selfie, and
            your signature — most applicants have everything ready in under a minute.
          </p>
          <Link href="/apply" className="btn btn-primary" style={{ marginTop: "28px" }}>
            Start application
          </Link>
        </div>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
          {REQUIREMENTS.map((req) => (
            <li
              key={req}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)",
                padding: "16px 18px",
                fontSize: "14.5px",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: "2px" }} aria-hidden="true">
                <circle cx="9" cy="9" r="9" fill="var(--blue-50)" />
                <path d="M5.5 9l2.3 2.3L13 6.8" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {req}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DestinationsSection() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p className="section-kicker-blue">Popular destinations</p>
            <h2 style={{ maxWidth: "520px" }}>Popular International Driving Permit Destinations</h2>
          </div>
          <Link href="/countries" style={{ fontWeight: 600, color: "var(--blue)", fontSize: "14.5px" }}>
            View all countries →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "40px" }} className="grid-3">
          {DESTINATIONS.map((d) => (
            <Link
              key={d.name}
              href={`/countries/${d.slug}`}
              className="destination-card"
              style={{ display: "flex", gap: "14px", background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "22px", color: "inherit" }}
            >
              <span
                aria-hidden="true"
                style={{
                  fontSize: "22px",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {flagEmoji(d.code)}
              </span>
              <div>
                <h3 style={{ fontSize: "16px" }}>{d.name}</h3>
                <p style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--text-light)" }}>{d.note}</p>
                <span style={{ display: "inline-block", marginTop: "10px", fontSize: "12.5px", fontWeight: 600, color: "var(--blue)" }}>
                  View guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .destination-card { transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease; }
        .destination-card:hover { border-color: var(--blue); box-shadow: var(--shadow-card); transform: translateY(-2px); }
      `}</style>
    </section>
  );
}

function WhatIsIdpSection() {
  return (
    <section className="section">
      <div className="container two-col-mobile" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
        <div className="card-elevated" style={{ borderRadius: "var(--radius)", overflow: "hidden", padding: "8px" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "1624 / 969" }}>
            <Image
              src="/images/applyidponline-permit-booklet-details-categories.webp"
              alt="Apply IDP Online permit booklet preview with identity page and vehicle categories"
              fill
              style={{ objectFit: "cover", borderRadius: "calc(var(--radius) - 8px)" }}
              sizes="(max-width: 880px) 92vw, 460px"
            />
          </div>
        </div>
        <div>
          <p className="section-kicker-blue">What is an IDP</p>
          <h2 style={{ maxWidth: "480px" }}>What Is an International Driving Permit?</h2>
          <p style={{ marginTop: "16px", color: "var(--text-light)", fontSize: "16px", maxWidth: "460px" }}>
            An International Driving Permit — often called an International Driver&apos;s License — is a
            standardized, multi-language translation of your driver&apos;s license, issued under the 1949
            Geneva Convention or 1968 Vienna Convention on Road Traffic where applicable. It lets traffic
            officers and rental counters abroad read your license details in their own language. It
            doesn&apos;t replace your domestic license — you carry both together.
          </p>
          <Link href="/what-is-idp" className="btn btn-secondary" style={{ marginTop: "24px", gap: "8px" }}>
            Read the full guide
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7h8M8 3.5L11.5 7 8 10.5" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section" style={{ background: "var(--surface)" }}>
      <div className="container" style={{ maxWidth: "760px" }}>
        <p className="section-kicker-blue">FAQ</p>
        <h2>International Driving Permit FAQ</h2>
        <div style={{ marginTop: "36px" }}>
          <FaqAccordion items={HOME_FAQ} />
        </div>
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link href="/faq" style={{ fontWeight: 600, color: "var(--blue)", fontSize: "14.5px" }}>
            View all FAQs →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="section" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <h2 style={{ color: "#FFFFFF" }}>Ready to prepare your International Driving Permit?</h2>
        <p style={{ marginTop: "14px", color: "#B8C6D9", fontSize: "16px" }}>
          Most applications take under 8 minutes to submit.
        </p>
        <div style={{ marginTop: "28px" }}>
          <Link href="/apply" className="btn btn-primary btn-lg">
            Start application
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .two-col-mobile { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function JsonLd() {
  const webpageId = `${SITE_URL}/#webpage`;
  const serviceId = `${SITE_URL}/#service`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION_NODE,
      WEBSITE_NODE,
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: SITE_URL,
        name: "International Driving Permit Online — Apply in 3 Simple Steps",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": serviceId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: "International Driving Permit application-assistance service",
        description:
          "An independent service that helps travelers prepare and submit an International Driving Permit application. Not a government agency, embassy, or motoring authority, and not affiliated with AAA, AATA, FIA, AIT, or the United Nations.",
        provider: { "@id": ORGANIZATION_ID },
        offers: getAggregateOfferNode(),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faqpage`,
        mainEntity: HOME_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
