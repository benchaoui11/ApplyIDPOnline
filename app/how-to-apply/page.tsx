import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScreenshotFrame from "@/components/ScreenshotFrame";
import StatRow from "@/components/content/StatRow";
import DirectAnswerBox from "@/components/content/DirectAnswerBox";
import FaqAccordion from "@/components/FaqAccordion";
import Breadcrumb from "@/components/country/Breadcrumb";
import IconBadge from "@/components/IconBadge";

const SITE_URL = "https://applyidponline.com";
const PAGE_URL = `${SITE_URL}/how-to-apply`;
const HOW_TO_APPLY_DESCRIPTION =
  "How to apply for an International Driving Permit online: eligibility, required documents, processing time, and digital vs. printed delivery explained.";
const OG_IMAGE = {
  url: `${SITE_URL}/images/applyidponline-approved-travel-permit-package.webp`,
  width: 640,
  height: 429,
  alt: "An approved International Driving Permit package, ready for travel",
};

export const metadata: Metadata = {
  title: { absolute: "How to Get an International Driver's License Online" },
  description: HOW_TO_APPLY_DESCRIPTION,
  alternates: { canonical: "/how-to-apply" },
  openGraph: {
    title: "How to Get an International Driver's License Online",
    description: HOW_TO_APPLY_DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Get an International Driver's License Online",
    description: HOW_TO_APPLY_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const NEED_ITEMS = [
  {
    number: "01",
    title: "Valid driver's license",
    body: "Your document is created from the details on your original, unexpired license.",
    icon: "id" as const,
  },
  {
    number: "02",
    title: "Selfie",
    body: "A clear, front-facing photo with good light and a plain background.",
    icon: "camera" as const,
  },
  {
    number: "03",
    title: "Signature",
    body: "Draw it on screen or upload a photo — it's added to the prepared document.",
    icon: "signature" as const,
  },
];

const PHOTO_TIPS = [
  "Photograph your license flat and out of any plastic sleeve or wallet — sleeves cause glare that obscures details.",
  "Keep all four corners and edges of the license visible in the frame.",
  "Use a photo taken specifically for this application — old, scanned, or screenshotted photos are usually rejected.",
  "Avoid heavy compression — if text on the license looks blurry or pixelated once uploaded, retake it.",
  "Photocopies aren't accepted — the license must be photographed or scanned directly.",
];

const ELIGIBILITY_ITEMS = [
  "You must be 18 years of age or older.",
  "You need a valid, unexpired driver's license issued in your name.",
  "Provisional, learner, and expired licenses generally aren't eligible — see the FAQ below.",
];

// Rendered visibly as the numbered steps AND used verbatim to build the
// page's HowTo schema, so the two can never drift apart.
const DETAILED_STEPS = [
  {
    number: "01",
    title: "Enter your driver details",
    body: "Fill in your name, date of birth, license categories, and where you're travelling. The form is a single guided flow — no account or password needed.",
    image: "/images/applyidponline-secure-driver-details-form.webp",
    alt: "Apply IDP Online form step for entering traveler and driver license details",
  },
  {
    number: "02",
    title: "Upload your documents",
    body: "Add a photo of the front and back of your license, a selfie, and a signature. You can draw your signature directly on screen.",
    image: "/images/applyidponline-selfie-upload-checkpoint.webp",
    alt: "Apply IDP Online selfie upload step with applicant photo guidance",
  },
  {
    number: "03",
    title: "Pay and let our team review",
    body: "Pay the one-time fee for your chosen format, then a person checks your details and documents for anything that could cause a delay before your permit is approved and prepared.",
    image: "/images/applyidponline-approved-travel-permit-package.webp",
    alt: "Apply IDP Online permit package prepared for international travel",
  },
];

const MISTAKES = [
  { title: "Plastic-sleeve glare", body: "Take the license out of any wallet or sleeve before photographing it.", icon: "blur" as const },
  { title: "Cropped or cut-off edges", body: "Keep all four corners of the license visible in the frame.", icon: "crop" as const },
  { title: "Blurry or compressed uploads", body: "Retake the photo if any number, name, or expiry date is unreadable.", icon: "photo" as const },
  { title: "Old, scanned, or screenshotted photos", body: "Use a fresh photo taken for this application, not a saved image.", icon: "photo" as const },
  { title: "Missing signature", body: "The application can't be reviewed until a signature is added.", icon: "sign" as const },
  { title: "Details that don't match your license", body: "Double-check spelling, dates, and license number against the original.", icon: "sign" as const },
];

const HOW_FAQ = [
  {
    q: "How do I apply for an International Driving Permit?",
    a: "Complete a short guided form with your driver details, upload a photo of your license and a selfie, add your signature, choose digital or printed delivery, and pay the one-time fee. Our team reviews every application before your permit is prepared — the whole process happens online, with no office visit or appointment.",
  },
  {
    q: "What documents do I need?",
    a: "A photo of the front and back of your valid, unexpired driver's license, a clear front-facing selfie, and your signature (drawn on screen or uploaded as a photo). You don't need a passport.",
  },
  {
    q: "How long does processing take?",
    a: "There's no time limit to complete the guided form — take as long as you need. Once your application is submitted, paid, and approved, your digital IDP is typically delivered in approximately 8 minutes; a printed booklet is also available and ships after your application is reviewed and approved.",
  },
  {
    q: "Can I apply completely online?",
    a: "Yes. The entire process — form, document upload, payment, and review — happens online. There's no office visit, no appointment, and nothing to mail in.",
  },
  {
    q: "Do I need to mail anything?",
    a: "No. Unlike some in-person or mail-in application processes, everything is submitted digitally through the online form.",
  },
  {
    q: "How do I check my application status?",
    a: "We don't have a separate status portal. If your application needs anything — a clearer photo or a correction — our team contacts you directly using the details you provided. You're welcome to reach out anytime through our contact page for an update.",
  },
  {
    q: "What happens if my documents are rejected?",
    a: "Your application isn't simply rejected outright — our team reviews it before your permit is prepared and flags anything that needs attention, such as an unreadable photo or a missing signature. You'll be contacted with what to fix before your permit is approved.",
  },
  {
    q: "Can I correct a mistake after submission?",
    a: "Yes. Contact us as soon as possible — corrections can usually be handled by replying to our review message rather than starting a new application.",
  },
  {
    q: "Should I choose digital or printed delivery?",
    a: "Digital delivery is typically the faster option, ready to show on your phone soon after approval. A printed booklet is available if you want a physical copy, but shipping adds time on top of review and approval. Many travelers choose digital first and add printed as a backup.",
  },
  {
    q: "How much does the application cost?",
    a: "Pricing depends on whether you choose digital, printed, or both — see our pricing page for current, published rates. It's a one-time payment with no subscriptions or hidden fees.",
  },
  {
    q: "Can I apply with a temporary or expiring licence?",
    a: "Generally, provisional or learner licenses aren't eligible, since an International Driving Permit is a translation of a full, valid license. If your license is close to expiring, it may not remain valid for your entire trip — apply with a license that will stay valid throughout your travel dates.",
  },
  {
    q: "When should I apply before travelling?",
    a: "There's no fixed minimum, but applying a few weeks ahead gives time for review and, if you choose printed delivery, shipping — since we don't guarantee a specific delivery date for printed booklets.",
  },
  {
    q: "Is an International Driving Permit the same as an International Driver's License?",
    a: "Yes. \"International Driving Permit\" is the official term defined by the 1949 Geneva and 1968 Vienna Conventions on Road Traffic. \"International Driver's License\" is the common name most travelers search for and use interchangeably — it refers to the same document.",
  },
  {
    q: "Do rental car companies require an International Driving Permit?",
    a: "It depends on both the destination country's law and the individual rental company's policy. Some countries legally require an IDP to rent or drive a car; separately, many rental companies request one as their own policy — for example when a license isn't printed in the Latin alphabet — even where local law doesn't strictly require it. Check your destination's requirements and your rental company's terms before you travel.",
  },
  {
    q: "Is Apply IDP Online affiliated with AAA, AATA, or any government agency?",
    a: "No. Apply IDP Online is a private, independent service. We are not affiliated with AAA, AATA, FIA, AIT, or the United Nations, and we are not a government agency, embassy, or motoring authority.",
  },
];

function HowToApplySchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "How to Apply", item: PAGE_URL },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "How to Apply for an International Driving Permit",
        description:
          "How to apply for an International Driving Permit online: eligibility, required documents, processing time, and digital vs. printed delivery explained.",
        breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
        mainEntity: { "@id": `${PAGE_URL}#howto` },
      },
      {
        "@type": "HowTo",
        "@id": `${PAGE_URL}#howto`,
        name: "How to apply for an International Driving Permit online",
        step: DETAILED_STEPS.map((step) => ({
          "@type": "HowToStep",
          position: Number(step.number),
          name: step.title,
          text: step.body,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: HOW_FAQ.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function HowToApplyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "How to Apply" }]} />

      <HowToApplySchema />

      {/* Hero */}
      <section className="section" style={{ paddingTop: "36px", paddingBottom: "40px" }}>
        <div className="container widp-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "center" }}>
          <div>
            <p className="section-kicker-blue">How to apply</p>
            <h1>How to Apply for an International Driving Permit</h1>
            <p style={{ marginTop: "16px", fontSize: "16px", color: "var(--text-light)" }}>
              Everything you need to get an International Driving Permit online — eligibility,
              required documents, processing time, and how digital and printed delivery work. No
              office visit, no appointment, and nothing to mail in.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "26px", flexWrap: "wrap" }}>
              <Link href="/apply" className="btn btn-primary btn-lg">
                Start application
              </Link>
              <Link href="/pricing" className="btn btn-secondary btn-lg">
                View pricing
              </Link>
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "22px", flexWrap: "wrap" }}>
              {["Three simple steps", "Digital or printed", "Reviewed before dispatch"].map((label) => (
                <span key={label} style={{ display: "flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "var(--text-light)", fontWeight: 500 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="7" fill="var(--blue-50)" />
                    <path d="M4 7.3l2 2 3.5-4" stroke="var(--blue)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="card-elevated" style={{ width: "100%", maxWidth: "420px", margin: "0 auto", borderRadius: "var(--radius)", overflow: "hidden", padding: "8px" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "1624 / 969" }}>
              <Image
                src="/images/applyidponline-permit-booklet-details-categories.webp"
                alt="Apply IDP Online permit booklet preview with identity page and vehicle categories"
                fill
                style={{ objectFit: "cover", borderRadius: "calc(var(--radius) - 8px)" }}
                sizes="(max-width: 880px) 92vw, 420px"
                priority
              />
            </div>
          </div>
        </div>

        <div className="container" style={{ marginTop: "40px", maxWidth: "620px" }}>
          <StatRow
            stats={[
              { value: "3", label: "steps to apply" },
              { value: "2", label: "delivery formats" },
              { value: "0", label: "office visits" },
            ]}
          />
        </div>
      </section>

      {/* Direct answer / GEO box */}
      <section className="section" style={{ paddingTop: "24px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <DirectAnswerBox kicker="DIRECT ANSWER" links={[{ href: "/apply", label: "Start application" }, { href: "/pricing", label: "Compare pricing" }]}>
            To apply for an International Driving Permit online — sometimes searched as getting an
            International Driver&apos;s License — complete a guided form with your driver details, upload
            a photo of your license and a selfie, add your signature, and choose digital or printed
            delivery. Our team reviews every submission before your permit is prepared; once your
            application is submitted, paid, and approved, your digital IDP is typically delivered in
            approximately 8 minutes, and a printed booklet ships afterward if you chose that option.
            Apply IDP Online is a private application-assistance service — you must still carry your
            original, valid driver&apos;s license when you drive abroad.
          </DirectAnswerBox>
        </div>
      </section>

      {/* Eligibility */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Before you start</p>
          <h2 style={{ textAlign: "center" }}>Who can apply</h2>
          <ul style={{ listStyle: "none", margin: "28px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {ELIGIBILITY_ITEMS.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  background: "var(--white)",
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
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Three things you need + photo requirements */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center" }}>Required documents</h2>
          <p style={{ textAlign: "center", marginTop: "10px", color: "var(--text-light)", maxWidth: "560px", margin: "10px auto 0" }}>
            The application stays simple — these are the standard items based on your original
            driver&apos;s license.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginTop: "36px" }} className="grid-3">
            {NEED_ITEMS.map((item) => (
              <div key={item.number} className="card-elevated" style={{ padding: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="field-tag">{item.number}</span>
                  <NeedIcon icon={item.icon} />
                </div>
                <h3 style={{ marginTop: "14px", fontSize: "16px" }}>{item.title}</h3>
                <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--text-light)" }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="card-elevated" style={{ padding: "26px", marginTop: "32px", maxWidth: "760px", marginLeft: "auto", marginRight: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <IconBadge name="document" />
              <h3 style={{ fontSize: "16px" }}>Photo requirements that prevent delays</h3>
            </div>
            <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {PHOTO_TIPS.map((tip) => (
                <li key={tip} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "var(--text)", alignItems: "flex-start" }}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginTop: "3px", flexShrink: 0 }} aria-hidden="true">
                    <path d="M2.5 8l3 3 6.5-7" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Step by step */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ textAlign: "center", marginBottom: "16px" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Step by step</p>
          <h2>How to Get Your International Driving Permit — Step by Step</h2>
        </div>
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "64px", marginTop: "32px" }}>
          {DETAILED_STEPS.map((step, i) => (
            <div
              key={step.number}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "48px",
                alignItems: "center",
                direction: i % 2 === 1 ? "rtl" : "ltr",
              }}
              className="how-step"
            >
              <div style={{ direction: "ltr" }}>
                <span className="field-tag">STEP {step.number}</span>
                <h3 style={{ fontSize: "22px", marginTop: "16px" }}>{step.title}</h3>
                <p style={{ marginTop: "12px", fontSize: "15px", color: "var(--text-light)" }}>{step.body}</p>
              </div>
              <div style={{ direction: "ltr" }}>
                <ScreenshotFrame src={step.image} alt={step.alt} priority={i === 0} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Payment */}
      <section className="section">
        <div className="container" style={{ maxWidth: "720px", textAlign: "center" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Payment</p>
          <h2>One-time payment, no subscriptions</h2>
          <p style={{ marginTop: "14px", fontSize: "15px", color: "var(--text-light)" }}>
            You pay once, after completing the guided form, for whichever format you choose —
            digital, printed, or both. There are no subscriptions or recurring charges.
          </p>
          <Link href="/pricing" className="btn btn-secondary" style={{ marginTop: "20px" }}>
            View pricing
          </Link>
        </div>
      </section>

      {/* Review, approval, processing time */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Review & approval</p>
          <h2 style={{ textAlign: "center" }}>Review, approval, and processing time</h2>
          <p style={{ marginTop: "14px", fontSize: "15px", color: "var(--text-light)", textAlign: "center" }}>
            A member of our team reviews your details and uploaded documents before your permit is
            approved and prepared — this catches issues like an unreadable photo before they cause a
            delay. We can&apos;t guarantee approval; an application can be sent back for a quick correction
            if something doesn&apos;t check out. Once your application is submitted, paid, and approved,
            your digital IDP is typically delivered in approximately 8 minutes.
          </p>
        </div>
      </section>

      {/* Digital vs printed */}
      <section className="section">
        <div className="container widp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <p className="section-kicker-blue">Delivery</p>
            <h2 style={{ fontSize: "22px" }}>Digital vs. printed permit</h2>
            <p style={{ marginTop: "12px", fontSize: "14.5px", color: "var(--text-light)" }}>
              A digital copy is a downloadable, travel-ready document you can show on your phone at a
              rental counter or roadside check — typically emailed in approximately 8 minutes once
              your application is submitted, paid, and approved. A printed booklet in the standard IDP
              format is also available, shipped after your application is reviewed and approved.
            </p>
            <Link href="/pricing" className="btn btn-secondary" style={{ marginTop: "20px" }}>
              Compare document options
            </Link>
          </div>
          <div className="card-elevated" style={{ borderRadius: "var(--radius)", overflow: "hidden" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "1200 / 960" }}>
              <Image
                src="/images/applyidponline-digital-print-permit-options.webp"
                alt="Apply IDP Online digital and printed permit options displayed together"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 880px) 92vw, 460px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Printed delivery */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "720px", textAlign: "center" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Printed delivery</p>
          <h2>Shipping for a printed booklet</h2>
          <p style={{ marginTop: "14px", fontSize: "15px", color: "var(--text-light)" }}>
            If you choose a printed booklet, it ships after your application has been reviewed and
            approved — not before. We don&apos;t promise a specific delivery date, since shipping time
            depends on your destination and local postal handling. Your digital copy, if you selected
            one, is typically available well before a printed booklet arrives, so many travelers use it
            to start and treat the printed booklet as a backup.
          </p>
          <Link href="/legal/shipping" style={{ display: "inline-block", marginTop: "16px", fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
            Read our shipping & delivery policy →
          </Link>
        </div>
      </section>

      {/* Common mistakes */}
      <section className="section">
        <div className="container">
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Avoid delays</p>
          <h2 style={{ textAlign: "center" }}>Common mistakes and how corrections work</h2>
          <p style={{ textAlign: "center", marginTop: "10px", color: "var(--text-light)" }}>Most delays come from images that are hard to read. These checks keep things moving.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginTop: "36px" }} className="grid-2">
            {MISTAKES.map((m) => (
              <div key={m.title} className="card-elevated" style={{ padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--error-bg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <MistakeIcon icon={m.icon} />
                </span>
                <div>
                  <h3 style={{ fontSize: "15px" }}>{m.title}</h3>
                  <p style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--text-light)" }}>{m.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "28px", fontSize: "14px", color: "var(--text-light)", maxWidth: "640px", marginLeft: "auto", marginRight: "auto" }}>
            If something in your application needs attention, our team contacts you using the details
            you provided so you can fix it before your permit is prepared — you don&apos;t need to start
            over.
          </p>
        </div>
      </section>

      {/* Does / doesn't */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ textAlign: "center" }}>What the document does — and doesn&apos;t do</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginTop: "32px" }} className="grid-2">
            <div className="card-elevated" style={{ padding: "22px", borderTop: "2px solid var(--success)" }}>
              <h3 style={{ fontSize: "15px", color: "var(--success)" }}>What it does</h3>
              <DoDontList
                items={["Translates your license details into multiple languages", "Helps border staff and rental counters understand your license", "Gives you a digital and, optionally, a printed copy"]}
                positive
              />
            </div>
            <div className="card-elevated" style={{ padding: "22px", borderTop: "2px solid var(--error)" }}>
              <h3 style={{ fontSize: "15px", color: "var(--error)" }}>What it doesn&apos;t do</h3>
              <DoDontList
                items={["Replace your original driver's license", "Independently grant driving rights", "Guarantee acceptance by every police officer or rental company"]}
                positive={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* After approval / before travel */}
      <section className="section">
        <div className="container" style={{ maxWidth: "720px", textAlign: "center" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Before you travel</p>
          <h2>After approval and before you travel</h2>
          <p style={{ marginTop: "14px", fontSize: "15px", color: "var(--text-light)" }}>
            Once your permit is prepared, carry it together with your original, valid driver&apos;s
            license every time you drive abroad — it&apos;s a companion document, not a replacement.
            Requirements differ by destination, so check your destination&apos;s guide for what&apos;s
            typically expected there before you go.
          </p>
          <Link href="/countries" style={{ display: "inline-block", marginTop: "16px", fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
            Browse destination guides →
          </Link>
        </div>
      </section>

      {/* Practical tips */}
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="container" style={{ maxWidth: "720px" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>Expert tips</p>
          <h2 style={{ textAlign: "center" }}>Practical tips before you apply</h2>
          <ul style={{ listStyle: "none", margin: "28px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Apply before your final week of travel prep, not the night before you fly, in case anything needs correcting.",
              "Make sure the name and details you enter match your driver's license exactly — small mismatches are a common reason for a follow-up request.",
              "If you're choosing printed delivery, start well ahead of your trip — see the shipping section above.",
              "Keep a digital copy accessible on your phone even if you also choose printed, so you always have a backup on hand.",
            ].map((tip) => (
              <li
                key={tip}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  background: "var(--white)",
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
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container" style={{ maxWidth: "760px" }}>
          <p className="section-kicker-blue" style={{ justifyContent: "center" }}>FAQ</p>
          <h2 style={{ textAlign: "center" }}>Application questions, answered</h2>
          <div style={{ marginTop: "28px" }}>
            <FaqAccordion items={HOW_FAQ} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: "var(--navy)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#FFFFFF" }}>
            Ready to <span style={{ color: "#85B7EB" }}>start your application?</span>
          </h2>
          <p style={{ marginTop: "12px", color: "#B8C6D9" }}>
            The guided form has no time limit — complete it at your own pace.
          </p>
          <Link href="/apply" className="btn btn-primary btn-lg" style={{ marginTop: "24px" }}>
            Start application
          </Link>
        </div>
      </section>

      {/* Related guides and trust links */}
      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <p className="section-kicker-blue">Related</p>
          <h2 style={{ fontSize: "20px" }}>Guides and resources</h2>
          <p style={{ marginTop: "10px", fontSize: "14.5px", color: "var(--text-light)" }}>
            Everything referenced on this page, in one place.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", marginTop: "18px" }}>
            {[
              { href: "/countries", label: "Browse destination guides" },
              { href: "/pricing", label: "Compare pricing" },
              { href: "/faq", label: "Read the full FAQ" },
              { href: "/what-is-idp", label: "What is an IDP" },
              { href: "/contact", label: "Contact us" },
              { href: "/sources", label: "Our sources" },
              { href: "/editorial-policy", label: "Editorial policy" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--blue)" }}>
                {l.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 880px) {
          .how-step { grid-template-columns: 1fr !important; direction: ltr !important; }
          .widp-grid { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

function NeedIcon({ icon }: { icon: "id" | "camera" | "signature" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" aria-hidden="true">
      {icon === "id" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
          <circle cx="9" cy="11" r="2" strokeWidth="1.6" />
          <path d="M6 16c0-1.7 1.3-3 3-3s3 1.3 3 3M14 9h4M14 13h4" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {icon === "camera" && (
        <>
          <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="13.5" r="3.2" strokeWidth="1.6" />
        </>
      )}
      {icon === "signature" && <path d="M3 17c2-6 4-2 6-8 1.5 4 2-2 4 3 1-2 2-1 3 0M3 20h18" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function MistakeIcon({ icon }: { icon: "blur" | "crop" | "photo" | "sign" }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--error)" aria-hidden="true">
      {icon === "blur" && <><circle cx="12" cy="12" r="8" strokeWidth="1.6" strokeDasharray="2 3" /><circle cx="12" cy="12" r="2.5" strokeWidth="1.6" /></>}
      {icon === "crop" && <><path d="M6 3v14a2 2 0 002 2h14M18 21V7a2 2 0 00-2-2H2" strokeWidth="1.6" strokeLinecap="round" /></>}
      {icon === "photo" && <><rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" /><circle cx="12" cy="12" r="3.5" strokeWidth="1.6" /></>}
      {icon === "sign" && <><path d="M4 16c2-5 3-1 5-6 1 3 2-1 3 2M4 20h16" strokeWidth="1.6" strokeLinecap="round" /><path d="M4 4l16 16" strokeWidth="1.6" strokeLinecap="round" /></>}
    </svg>
  );
}

function DoDontList({ items, positive }: { items: string[]; positive: boolean }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((item) => (
        <li key={item} style={{ display: "flex", gap: "9px", fontSize: "13.5px", color: "var(--text)", alignItems: "flex-start" }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ marginTop: "2px", flexShrink: 0 }} aria-hidden="true">
            {positive ? (
              <path d="M2.5 8l3 3 6.5-7" stroke="var(--success)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M3 3l9 9M12 3l-9 9" stroke="var(--error)" strokeWidth="1.6" strokeLinecap="round" />
            )}
          </svg>
          {item}
        </li>
      ))}
    </ul>
  );
}
