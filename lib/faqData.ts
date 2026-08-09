// FAQ / Help Center data — single source of truth for /faq. The same
// flattened array drives the visible accordion content AND the FAQPage
// JSON-LD, so the two can never drift apart. Country-specific questions
// are generated from COUNTRY_REGISTRY (never hand-typed), so every link
// always resolves to a real page and the list updates automatically as
// countries are added.
//
// Every answer here follows the ratified Business Truth Layer conventions
// already established elsewhere on the site (Home, /how-to-apply):
// - digital delivery is described only as "~8 minutes after submission,
//   payment, and approval" — never a submission-duration promise
// - printed delivery carries no invented timeframe
// - legal requirement is always kept distinct from rental-company policy
// - no AAA/AATA/FIA/AIT/UN/government affiliation is ever implied
// - no fine amounts, impoundment claims, or specific legal penalties are
//   stated (unverifiable at this depth — country guides carry sourced
//   specifics where available)
// - the IDP-vs-IADP question for South America is deliberately absent:
//   research surfaced a genuine, unresolved conflict between AAA's own
//   guidance and treaty-based legal analysis for Brazil, so per the
//   "omit rather than speculate" rule it is not included here.

import { COUNTRY_REGISTRY } from "./countryData/registry";

export type FaqCategoryId =
  | "what-is-idp"
  | "eligibility-documents"
  | "application-processing"
  | "validity-renewal"
  | "countries-recognition"
  | "driving-abroad"
  | "rental-motorcycles"
  | "police-fines"
  | "insurance"
  | "digital-printed-delivery"
  | "payments-refunds"
  | "special-travelers-countries";

export type FaqLink = { href: string; label: string };
export type FaqItem = {
  id: string;
  category: FaqCategoryId;
  q: string;
  a: string;
  links?: FaqLink[];
  // Extra search-only terms (e.g. country abbreviations) that should match
  // this item without being printed in the visible question/answer text.
  aliases?: string[];
};

// Common alternate country names, mirrored from lib/countryData/directory.ts
// so a search for "usa" or "uae" finds the right country question — kept as
// a small local copy rather than an import so this file has no dependency
// on the directory module's popularity/traffic-sort concerns.
const COUNTRY_ALIASES: Record<string, string[]> = {
  "united-states": ["usa", "us"],
  "united-kingdom": ["uk"],
  "united-arab-emirates": ["uae"],
};

export type FaqIcon = "document" | "check" | "link" | "calendar" | "globe" | "steering" | "route" | "shield" | "layers" | "phone" | "tag" | "plane";

export const FAQ_CATEGORIES: { id: FaqCategoryId; label: string; description: string; icon: FaqIcon }[] = [
  { id: "what-is-idp", label: "What Is an IDP?", description: "Definitions, terminology, and legitimacy", icon: "document" },
  { id: "eligibility-documents", label: "Eligibility & Documents", description: "Who can apply and what you need", icon: "check" },
  { id: "application-processing", label: "Application & Processing", description: "How the online process works", icon: "link" },
  { id: "validity-renewal", label: "Validity, Expiry & Renewal", description: "How long it lasts", icon: "calendar" },
  { id: "countries-recognition", label: "Countries & Recognition", description: "Where it's used and under which convention", icon: "globe" },
  { id: "driving-abroad", label: "Driving Abroad & Local Rules", description: "Using it once you're there", icon: "steering" },
  { id: "rental-motorcycles", label: "Rental Cars, Motorcycles & Scooters", description: "Vehicle-specific questions", icon: "route" },
  { id: "police-fines", label: "Police Checks, Fines & Traffic Stops", description: "What to expect if you're stopped", icon: "shield" },
  { id: "insurance", label: "Insurance", description: "How it relates to coverage", icon: "layers" },
  { id: "digital-printed-delivery", label: "Digital, Printed & Delivery", description: "Formats, shipping, and lost permits", icon: "phone" },
  { id: "payments-refunds", label: "Payments, Refunds & Corrections", description: "Cost, billing, and fixing mistakes", icon: "tag" },
  { id: "special-travelers-countries", label: "Special Travelers & Country-Specific", description: "Students, military, residents, and destination guides", icon: "plane" },
];

const WHAT_IS_IDP: FaqItem[] = [
  {
    id: "wii-1",
    category: "what-is-idp",
    q: "What is an International Driving Permit?",
    a: "An International Driving Permit (IDP) is a standardized, multi-language translation of your existing driver's license, issued under the 1949 Geneva Convention or 1968 Vienna Convention on Road Traffic where applicable. It lets traffic officers and rental counters abroad read your license details in their own language. It doesn't replace your domestic license — you carry both together.",
  },
  {
    id: "wii-2",
    category: "what-is-idp",
    q: "Is an International Driving Permit the same as an International Driver's License?",
    a: "Yes. \"International Driving Permit\" is the official term defined by the 1949 Geneva and 1968 Vienna Conventions. \"International Driver's License\" is the common name most travelers search for and use interchangeably — it refers to the same document, not a separate product.",
    links: [{ href: "/what-is-idp", label: "Full IDP guide" }],
  },
  {
    id: "wii-3",
    category: "what-is-idp",
    q: "What does IDP stand for?",
    a: "IDP stands for International Driving Permit — the translation and identity document that accompanies a valid driver's license for use abroad.",
  },
  {
    id: "wii-4",
    category: "what-is-idp",
    q: "Is an International Driving Permit a real driving license on its own?",
    a: "No. An IDP is a translation and identity document, not a standalone license. It has no authority by itself — it must be carried together with your valid original driver's license at all times.",
  },
  {
    id: "wii-5",
    category: "what-is-idp",
    q: "What is an International Driving Permit used for?",
    a: "It's used to help traffic officers, rental counters, and other officials abroad read and verify your license details in a language they understand, when your original license isn't written in a language or script they recognize.",
  },
  {
    id: "wii-6",
    category: "what-is-idp",
    q: "What languages does an International Driving Permit translate my license into?",
    a: "The standardized IDP format includes your license details set out in multiple languages, following the format defined by the Geneva and Vienna road traffic conventions, so the same document is readable across many destinations without needing a country-specific translation.",
  },
  {
    id: "wii-7",
    category: "what-is-idp",
    q: "Who issues International Driving Permits?",
    a: "In many countries, IDPs are issued by government authorities or authorized motoring organizations. Apply IDP Online is a separate, private application-assistance service — we guide you through preparing your application and documents rather than acting as a government issuing body.",
  },
  {
    id: "wii-8",
    category: "what-is-idp",
    q: "Is Apply IDP Online a government service?",
    a: "No. Apply IDP Online is an independent, private company that helps travelers prepare an International Driving Permit application. We are not affiliated with any government, embassy, or motor vehicle authority.",
  },
  {
    id: "wii-9",
    category: "what-is-idp",
    q: "Is Apply IDP Online affiliated with AAA or AATA?",
    a: "No. Apply IDP Online is a private, independent service. We are not affiliated with AAA, AATA, FIA, AIT, or the United Nations, and we are not a government agency, embassy, or motoring authority.",
  },
  {
    id: "wii-10",
    category: "what-is-idp",
    q: "How can I tell whether an IDP service is legitimate?",
    a: "Check for a clear statement that the company is independent and not a government agency or embassy, published contact details you can reach a person through, upfront pricing with no hidden fees, a stated refund policy, and cited sources for any legal or requirement claims it makes.",
    links: [{ href: "/sources", label: "Our sources" }, { href: "/editorial-policy", label: "Editorial policy" }],
  },
];

const ELIGIBILITY_DOCUMENTS: FaqItem[] = [
  {
    id: "ed-1",
    category: "eligibility-documents",
    q: "Who is eligible to apply for an International Driving Permit?",
    a: "You must be 18 years of age or older and hold a valid, unexpired driver's license issued in your name. Provisional, learner, and expired licenses generally aren't eligible.",
  },
  {
    id: "ed-2",
    category: "eligibility-documents",
    q: "What is the minimum age to apply for an International Driving Permit?",
    a: "18 years old. This matches the minimum age most driver's licenses require, since an IDP is a translation of an existing license rather than a separate credential with its own age rules.",
  },
  {
    id: "ed-3",
    category: "eligibility-documents",
    q: "What documents do I need to apply?",
    a: "A photo of the front and back of your valid, unexpired driver's license, a clear front-facing selfie, and your signature (drawn on screen or uploaded as a photo). You don't need a passport.",
    links: [{ href: "/how-to-apply", label: "Full application guide" }],
  },
  {
    id: "ed-4",
    category: "eligibility-documents",
    q: "Do I need a passport to apply for an International Driving Permit?",
    a: "No. The application is based on your driver's license, a selfie, and your signature — not your passport.",
  },
  {
    id: "ed-5",
    category: "eligibility-documents",
    q: "Can I apply with a temporary or provisional license?",
    a: "Generally, no. Provisional or learner licenses aren't eligible, since an International Driving Permit is a translation of a full, valid license rather than a document that grants driving rights on its own.",
  },
  {
    id: "ed-6",
    category: "eligibility-documents",
    q: "Can I apply if my license is close to expiring?",
    a: "You can, but if your license expires before or during your trip, it may not remain valid for your full travel dates — and an IDP can't stay valid past your underlying license's expiry. Apply with a license that will stay valid throughout your travel.",
  },
  {
    id: "ed-7",
    category: "eligibility-documents",
    q: "What are the photo requirements for my license upload?",
    a: "Photograph your license flat and out of any plastic sleeve or wallet, keep all four corners visible, avoid heavy compression that blurs the text, and use a photo taken specifically for this application — not an old, scanned, or screenshotted image.",
    links: [{ href: "/how-to-apply", label: "Photo requirements in full" }],
  },
  {
    id: "ed-8",
    category: "eligibility-documents",
    q: "Why was my license photo rejected or flagged?",
    a: "The most common causes are glare from a plastic sleeve, cropped or cut-off edges, blurry or over-compressed images, and photos that don't match your license (old, scanned, or screenshotted). Our team flags these before your permit is prepared so you can fix them.",
  },
  {
    id: "ed-9",
    category: "eligibility-documents",
    q: "Can I use a scanned or screenshotted photo of my license?",
    a: "It's best to avoid this. Old, scanned, or screenshotted photos are a common reason applications need a follow-up — a fresh photo taken directly of the physical license is more likely to be clear enough on the first try.",
  },
  {
    id: "ed-10",
    category: "eligibility-documents",
    q: "Do I need a passport-style photo of myself?",
    a: "You need a clear, front-facing selfie with good lighting and a plain background — not a formal passport photo, though similar standards (face fully visible, no filters or heavy shadows) help avoid delays.",
  },
];

const APPLICATION_PROCESSING: FaqItem[] = [
  {
    // Highest measured search volume in this entire dataset (~5,400/mo for
    // "how to get an international driving permit" vs. ~480 for the
    // "apply" phrasing below) — added as its own entry rather than folded
    // into ap-1 so the page can target both real phrasings distinctly.
    id: "ap-13",
    category: "application-processing",
    q: "How do I get an International Driving Permit?",
    a: "You get an International Driving Permit by applying online: complete a guided form with your driver details, upload a photo of your license and a selfie, add your signature, and choose digital or printed delivery. Our team reviews the application before your permit is prepared — there's no office visit or appointment required.",
    links: [{ href: "/how-to-apply", label: "Step-by-step guide" }],
  },
  {
    id: "ap-1",
    category: "application-processing",
    q: "How do I apply for an International Driving Permit?",
    a: "You apply for an International Driving Permit entirely online: complete a guided form with your driver details, upload a photo of your license and a selfie, add your signature, choose digital or printed delivery, and pay the one-time fee. Our team reviews every application before your permit is prepared.",
    links: [{ href: "/how-to-apply", label: "Step-by-step guide" }],
  },
  {
    id: "ap-2",
    category: "application-processing",
    q: "Can I apply completely online?",
    a: "Yes. The entire process — form, document upload, payment, and review — happens online. There's no office visit, no appointment, and nothing to mail in.",
  },
  {
    id: "ap-3",
    category: "application-processing",
    q: "How long does the application form take to complete?",
    a: "There's no time limit — the guided form is designed to be completed in one sitting, but you can take as long as you need.",
  },
  {
    id: "ap-4",
    category: "application-processing",
    q: "Do I need to mail anything to apply?",
    a: "No. Unlike some in-person or mail-in application processes, everything is submitted digitally through the online form.",
  },
  {
    id: "ap-5",
    category: "application-processing",
    q: "How long does processing take?",
    a: "Once your application is submitted, paid, and approved, your digital IDP is typically delivered in approximately 8 minutes; a printed booklet is also available and ships after your application is reviewed and approved.",
  },
  {
    id: "ap-6",
    category: "application-processing",
    q: "Who reviews my application?",
    a: "A member of our team reviews your details and uploaded documents before your permit is approved and prepared — checking for issues like an unreadable photo before they cause a delay. We can't guarantee approval.",
  },
  {
    id: "ap-7",
    category: "application-processing",
    q: "Can I apply from a phone?",
    a: "Yes. The application works on mobile browsers, including uploading photos directly from your camera roll.",
  },
  {
    id: "ap-8",
    category: "application-processing",
    q: "What happens after I submit my application?",
    a: "Your application moves into review. A person checks your details and documents, you complete payment for your chosen format, and once approved, your permit is prepared and delivered according to the format you selected.",
  },
  {
    id: "ap-9",
    category: "application-processing",
    q: "Can I correct a mistake after submitting?",
    a: "Yes. Contact us as soon as possible — corrections can usually be handled by replying to our review message rather than starting a new application.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    id: "ap-10",
    category: "application-processing",
    q: "What happens if my documents need attention?",
    a: "Your application isn't simply rejected outright — our team flags anything that needs attention, such as an unreadable photo or a missing signature, and contacts you with what to fix before your permit is approved.",
  },
  {
    id: "ap-11",
    category: "application-processing",
    q: "How do I check my application status?",
    a: "We don't have a separate status portal. If your application needs anything, our team contacts you directly using the details you provided. You're welcome to reach out anytime through our contact page for an update.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    id: "ap-12",
    category: "application-processing",
    q: "Can I apply on behalf of someone else, like a family member?",
    a: "The application asks for the license holder's own details, photo, and signature, since the permit is prepared from that specific person's license. You can help someone complete their own application, but the documents uploaded need to belong to the applicant.",
  },
];

const VALIDITY_RENEWAL: FaqItem[] = [
  {
    id: "vr-1",
    category: "validity-renewal",
    q: "How long is an International Driving Permit valid?",
    a: "Validity depends on the issuing convention: a permit issued under the 1949 Geneva Convention is valid for up to 1 year, while one issued under the 1968 Vienna Convention can be valid for up to 3 years. Either way, it stops being valid once your underlying driver's license expires, whichever comes first.",
  },
  {
    id: "vr-2",
    category: "validity-renewal",
    q: "Does my IDP expire if my driver's license expires first?",
    a: "Yes. An International Driving Permit can never remain valid longer than the original driver's license it translates — if your license expires, your IDP stops being valid at the same time, regardless of the date printed on it.",
  },
  {
    id: "vr-3",
    category: "validity-renewal",
    q: "Can I renew an International Driving Permit?",
    a: "There's no separate \"renewal\" process — once your IDP's validity period ends, you apply again as a new application using your (still valid) original driver's license.",
    links: [{ href: "/apply", label: "Start a new application" }],
  },
  {
    id: "vr-4",
    category: "validity-renewal",
    q: "Does an International Driving Permit replace my regular license?",
    a: "No. It's a translation and identity document that accompanies your existing license — it does not replace it. Carry both together whenever you drive abroad.",
  },
  {
    id: "vr-5",
    category: "validity-renewal",
    q: "Can I use one International Driving Permit for multiple trips?",
    a: "Yes, as long as it's still within its validity period and your original driver's license is still valid, the same IDP can be used across multiple trips to different destinations rather than needing a new one per trip.",
  },
  {
    id: "vr-6",
    category: "validity-renewal",
    q: "Is an International Driving Permit valid in the country that issued it?",
    a: "No. An IDP is intended for use abroad — it's not meant to be used for driving within the country whose license it translates, since your original license already serves that purpose there.",
  },
  {
    id: "vr-7",
    category: "validity-renewal",
    q: "What happens if my International Driving Permit expires while I'm traveling?",
    a: "Once it expires, you'd need to rely on your original driver's license and any locally accepted alternative, since an expired IDP no longer serves its translation purpose. Plan your validity period to comfortably cover your full trip before you travel.",
  },
  {
    id: "vr-8",
    category: "validity-renewal",
    q: "Do I need a new International Driving Permit for every country I visit?",
    a: "No. A single valid IDP is generally usable across the countries that recognize the convention it was issued under — you don't need a separate one per destination, though requirements can still vary by country.",
    links: [{ href: "/countries", label: "Browse destination guides" }],
  },
  {
    id: "vr-9",
    category: "validity-renewal",
    q: "Is there a difference in validity between digital and printed permits?",
    a: "No. The validity period is tied to the permit itself and the convention it's issued under, not to whether you hold a digital or printed copy — both formats carry the same validity dates.",
  },
];

const COUNTRIES_RECOGNITION: FaqItem[] = [
  {
    id: "cr-1",
    category: "countries-recognition",
    q: "Which countries require an International Driving Permit?",
    a: "Requirement levels vary by country: some countries legally require an International Driving Permit, others commonly request one without a strict legal mandate, and requirements can change over time. Your license's origin and language also affect which applies to you — check your specific destination's guide for its current, verified classification.",
    links: [{ href: "/countries", label: "Browse all destinations" }],
  },
  {
    id: "cr-2",
    category: "countries-recognition",
    q: "Is an International Driving Permit recognized worldwide?",
    a: "No single document is recognized absolutely everywhere. An IDP is recognized across the countries that are party to the 1949 Geneva Convention or 1968 Vienna Convention on Road Traffic, which together cover a large majority of countries, but recognition and local requirements still vary by destination.",
  },
  {
    id: "cr-3",
    category: "countries-recognition",
    q: "What is the 1949 Geneva Convention on Road Traffic?",
    a: "It's one of two international treaties (alongside the 1968 Vienna Convention) that establish the standardized International Driving Permit format. Countries that are party to the Geneva Convention recognize IDPs issued under its format, typically valid for up to 1 year.",
  },
  {
    id: "cr-4",
    category: "countries-recognition",
    q: "What is the 1968 Vienna Convention on Road Traffic?",
    a: "It's the later of the two international road traffic conventions that define the International Driving Permit format, adopted by a different (and in some regions overlapping) set of countries than the 1949 Geneva Convention, typically allowing validity of up to 3 years.",
  },
  {
    id: "cr-5",
    category: "countries-recognition",
    q: "What's the difference between the Geneva and Vienna Conventions for IDPs?",
    a: "Both establish a standardized IDP format, but they're separate treaties with different member countries and different maximum validity periods — up to 1 year under Geneva (1949) versus up to 3 years under Vienna (1968). Which one applies depends on the issuing country and destination.",
  },
  {
    id: "cr-6",
    category: "countries-recognition",
    q: "Do all countries recognize the same International Driving Permit?",
    a: "Not exactly — recognition depends on which convention (if any) a country has signed. A country party to the Vienna Convention recognizes Vienna-format IDPs; the same isn't automatically true for a country that's only party to Geneva, or to neither.",
  },
  {
    id: "cr-7",
    category: "countries-recognition",
    q: "Can I use an International Driving Permit in a country not party to either convention?",
    a: "It depends entirely on that country's own rules — without a shared treaty basis, recognition isn't guaranteed. Some non-signatory countries still accept the document in practice; check your specific destination before relying on it.",
  },
  {
    id: "cr-8",
    category: "countries-recognition",
    q: "What if my destination isn't listed on your site?",
    a: "You can still apply — enter your destination during the application even if it doesn't yet have a dedicated guide on our site. We just won't have destination-specific requirement details published for it yet.",
    links: [{ href: "/apply", label: "Start application" }],
  },
  {
    id: "cr-9",
    category: "countries-recognition",
    q: "Is an International Driving Permit valid in more than one country on the same trip?",
    a: "Yes — a single valid IDP can generally be used across multiple countries during the same trip, as long as each destination recognizes the convention it was issued under and your underlying license remains valid.",
  },
  {
    id: "cr-10",
    category: "countries-recognition",
    q: "How do I find out if my destination requires an International Driving Permit?",
    a: "Check that destination's dedicated guide, which sets out its typical requirement level, alongside your original license's origin and language, since requirements can hinge on those factors even within the same country.",
    links: [{ href: "/countries", label: "Browse destination guides" }],
  },
];

const DRIVING_ABROAD: FaqItem[] = [
  {
    id: "da-1",
    category: "driving-abroad",
    q: "Do I still need my regular driver's license if I have an IDP?",
    a: "Yes. An International Driving Permit is a translation and identity document that accompanies your existing license — it does not replace it. Carry both together whenever you drive abroad.",
  },
  {
    id: "da-2",
    category: "driving-abroad",
    q: "What should I carry with me when driving abroad?",
    a: "Your original, valid driver's license and your International Driving Permit together — an IDP alone, without the original license, generally isn't sufficient, since it's a translation of that license rather than a standalone credential.",
  },
  {
    id: "da-3",
    category: "driving-abroad",
    q: "Does an International Driving Permit guarantee I can drive in every country?",
    a: "No. It doesn't guarantee acceptance by every official, rental company, or police officer, and it doesn't override a destination's own eligibility rules. It supports your original license — it isn't a universal driving right.",
  },
  {
    id: "da-4",
    category: "driving-abroad",
    q: "What vehicle categories does an International Driving Permit cover?",
    a: "It reflects the vehicle categories already listed on your original driver's license — it doesn't add categories you're not already licensed for at home. If your license only covers cars, your IDP won't grant motorcycle privileges abroad.",
  },
  {
    id: "da-5",
    category: "driving-abroad",
    q: "Can local traffic laws override what's on my International Driving Permit?",
    a: "Yes. Local traffic laws always apply regardless of what's shown on an IDP — the permit helps officials read your license details, but it doesn't exempt you from local rules, speed limits, or road regulations.",
  },
  {
    id: "da-6",
    category: "driving-abroad",
    q: "Do I need an International Driving Permit for a short day trip across a border?",
    a: "Possibly — requirement levels can apply regardless of trip length in many destinations, since the rule is usually based on driving in the country at all, not the duration of the visit. Check your specific destination's guide.",
    links: [{ href: "/countries", label: "Browse destination guides" }],
  },
  {
    id: "da-7",
    category: "driving-abroad",
    q: "Can I drive on the opposite side of the road with an International Driving Permit?",
    a: "An IDP itself doesn't teach or certify driving-side familiarity — it's a translation document. If your destination drives on the opposite side from what you're used to, that's a practical driving skill to prepare for separately, not something the permit addresses.",
  },
  {
    id: "da-8",
    category: "driving-abroad",
    q: "Does an International Driving Permit help if I don't speak the local language?",
    a: "It helps specifically with your license details — since those are translated into multiple languages on the permit, officials who don't read your license's original language can still verify who you are and what you're licensed to drive.",
  },
  {
    id: "da-9",
    category: "driving-abroad",
    q: "What should I do before driving in an unfamiliar country?",
    a: "Confirm whether an IDP is typically expected there, check that destination's road-rules basics (driving side, common local requirements), and make sure your original license and IDP will both remain valid for your entire trip.",
    links: [{ href: "/countries", label: "Browse destination guides" }],
  },
  {
    id: "da-10",
    category: "driving-abroad",
    q: "Does an International Driving Permit help me take a local driving test or convert my license?",
    a: "No. An IDP is a temporary translation document for visitors, not a step toward converting your license to a local one or a substitute for a country's own driving-test or residency-based licensing process.",
  },
];

const RENTAL_MOTORCYCLES: FaqItem[] = [
  {
    id: "rm-1",
    category: "rental-motorcycles",
    q: "Do rental car companies require an International Driving Permit?",
    a: "It depends on both the destination country's law and the individual rental company's policy. Some countries legally require an IDP to rent or drive a car; separately, many rental companies request one as their own policy — for example when a license isn't printed in the Latin alphabet — even where local law doesn't strictly require it.",
  },
  {
    id: "rm-2",
    category: "rental-motorcycles",
    q: "Why would a rental company ask for an IDP if it's not legally required?",
    a: "Rental companies set their own documentation policies on top of (or sometimes instead of) what local law requires, often to make sure staff can read a foreign license. A company's request isn't the same as a legal requirement, and the reverse is also true.",
  },
  {
    id: "rm-3",
    category: "rental-motorcycles",
    q: "Can a rental company refuse to rent me a car without an IDP?",
    a: "Yes, a rental company can decline to hand over a vehicle based on its own documentation policy, even in countries where an IDP isn't strictly a legal requirement. Confirm what a specific rental company expects before you arrive at the counter.",
  },
  {
    id: "rm-4",
    category: "rental-motorcycles",
    q: "Do I need an International Driving Permit to rent a motorcycle or scooter?",
    a: "The same legal-versus-company-policy distinction applies to motorcycles and scooters as to cars — some destinations and rental operators expect an IDP for two-wheeled rentals specifically. Check the vehicle categories on your license and destination requirements before booking.",
  },
  {
    id: "rm-5",
    category: "rental-motorcycles",
    q: "Does an International Driving Permit cover motorcycle and scooter categories?",
    a: "Only if your original driver's license already includes a motorcycle or scooter category — the IDP translates whatever categories are on your existing license; it doesn't add new ones.",
  },
  {
    id: "rm-6",
    category: "rental-motorcycles",
    q: "Can I use an International Driving Permit for a one-way rental across borders?",
    a: "An IDP itself doesn't restrict or permit cross-border one-way rentals — that's governed by the rental company's own cross-border policy, which varies. Confirm cross-border terms with the rental company directly, separate from your IDP.",
  },
  {
    id: "rm-7",
    category: "rental-motorcycles",
    q: "Do rental companies accept a digital International Driving Permit?",
    a: "Acceptance varies by company and location — some accept a digital copy shown on your phone, others prefer or require a printed booklet. If you're unsure, having both formats removes the uncertainty.",
  },
  {
    id: "rm-8",
    category: "rental-motorcycles",
    q: "Should I bring a printed copy even if I have a digital IDP?",
    a: "It can help. Since acceptance of digital-only copies varies by rental company and destination, a printed booklet as a backup avoids being turned away over a format preference rather than an actual eligibility issue.",
    links: [{ href: "/how-to-apply", label: "Digital vs. printed permit" }],
  },
  {
    id: "rm-9",
    category: "rental-motorcycles",
    q: "Does my IDP need to match the vehicle class I'm renting?",
    a: "The vehicle you rent should match a category your original license (and therefore your IDP) actually covers. Renting a vehicle class you're not licensed for at home isn't something an IDP can authorize.",
  },
  {
    id: "rm-10",
    category: "rental-motorcycles",
    q: "Can I rent a car in one country and drive it into another?",
    a: "That depends on the rental company's cross-border policy, not on your IDP — some rental agreements restrict which countries a vehicle can be taken into. Confirm this with the rental company before crossing a border.",
  },
];

const POLICE_FINES: FaqItem[] = [
  {
    id: "pf-1",
    category: "police-fines",
    q: "What should I show if I'm stopped by police while driving abroad?",
    a: "Your original, valid driver's license together with your International Driving Permit, if your destination typically expects one. The IDP supports your license — it isn't a substitute for it during a stop.",
  },
  {
    id: "pf-2",
    category: "police-fines",
    q: "Is it illegal to drive without an International Driving Permit where one is required?",
    a: "Where a destination legally requires an IDP, driving without one can be treated as a documentation violation under that country's own traffic laws. The specific consequences are set by local law, not by Apply IDP Online, so check your destination's official guidance for specifics.",
  },
  {
    id: "pf-3",
    category: "police-fines",
    q: "Can I be fined for not having an International Driving Permit?",
    a: "In destinations where one is legally required, failing to present it during a stop can be treated the same as any other documentation issue under that country's traffic law. Exact penalties are set locally and vary by country — we don't publish specific fine amounts since they're outside our control and change by jurisdiction.",
  },
  {
    id: "pf-4",
    category: "police-fines",
    q: "Does an International Driving Permit protect me from traffic violations?",
    a: "No. An IDP is a translation and identity document — it has no bearing on whether you've committed a traffic violation. Local traffic laws and penalties apply the same way they would to any driver.",
  },
  {
    id: "pf-5",
    category: "police-fines",
    q: "What happens if I'm involved in an accident without an International Driving Permit?",
    a: "How an accident is handled depends on local law and the specific circumstances, not solely on whether you were carrying an IDP. If your destination typically expects one, not having it could complicate the documentation process. Check official guidance for your destination.",
  },
  {
    id: "pf-6",
    category: "police-fines",
    q: "Should I carry a copy of my International Driving Permit separately from the original?",
    a: "It's a reasonable precaution — keeping a digital copy accessible on your phone, in addition to a printed original, means you're not left without any version if the physical booklet is misplaced during your trip.",
  },
  {
    id: "pf-7",
    category: "police-fines",
    q: "Do traffic authorities accept a digital International Driving Permit during a stop?",
    a: "This varies by country and by the individual officer or authority — some destinations are more accustomed to reviewing digital documents than others. A printed booklet remains the more universally recognized format if you want to minimize uncertainty.",
  },
  {
    id: "pf-8",
    category: "police-fines",
    q: "What should I do if local police don't recognize my International Driving Permit?",
    a: "Stay calm and present your original driver's license alongside the IDP — local officials make the final call on the spot based on their own country's rules. This is a local-law situation outside what any private application service can resolve directly.",
  },
];

const INSURANCE: FaqItem[] = [
  {
    id: "in-1",
    category: "insurance",
    q: "Does having an International Driving Permit affect my car insurance abroad?",
    a: "It can, depending on your specific insurance provider and policy — some insurers reference IDP status when reviewing a claim involving a foreign license. Check your policy's terms or ask your insurer directly, since this varies by provider.",
  },
  {
    id: "in-2",
    category: "insurance",
    q: "Can driving without an International Driving Permit affect an insurance claim?",
    a: "It's possible, depending on your insurer and destination — some policies treat a missing legally-required document as a factor in a claim. This is set by your insurance provider's own terms, not by Apply IDP Online, so review your policy before you travel.",
  },
  {
    id: "in-3",
    category: "insurance",
    q: "Does rental car insurance require an International Driving Permit?",
    a: "Some rental insurance and coverage terms reference the same documentation the rental company itself requires at pickup. Check both the rental company's IDP policy and the specific insurance terms offered with the rental.",
  },
  {
    id: "in-4",
    category: "insurance",
    q: "Does travel insurance require an International Driving Permit?",
    a: "Some travel insurance policies include driving-related coverage that references holding valid, legally required documentation for the country you're driving in. Check your specific policy's wording rather than assuming coverage either way.",
  },
  {
    id: "in-5",
    category: "insurance",
    q: "Is an International Driving Permit the same as driving insurance?",
    a: "No. An IDP is a translation and identity document — it provides no financial or liability coverage on its own. Insurance is a separate product you arrange through an insurer or as part of a rental agreement.",
  },
  {
    id: "in-6",
    category: "insurance",
    q: "Should I check my insurance policy before driving abroad?",
    a: "Yes. Insurance terms around foreign licenses, IDPs, and driving abroad vary significantly by provider and policy, so it's worth confirming coverage details with your insurer before your trip rather than assuming standard coverage applies.",
  },
  {
    id: "in-7",
    category: "insurance",
    q: "Does an International Driving Permit come with its own insurance coverage?",
    a: "No. An IDP doesn't include or provide any insurance coverage — it's strictly a translation and identity document. Any driving insurance you need is arranged separately.",
  },
];

const DIGITAL_PRINTED_DELIVERY: FaqItem[] = [
  {
    id: "dpd-1",
    category: "digital-printed-delivery",
    q: "What's the difference between a digital and printed International Driving Permit?",
    a: "A digital copy is a downloadable, travel-ready document you can show on your phone at a rental counter or roadside check. A printed booklet is the same document in the standard IDP physical format, shipped to you after approval.",
    links: [{ href: "/pricing", label: "Compare pricing" }],
  },
  {
    id: "dpd-2",
    category: "digital-printed-delivery",
    q: "How long does digital delivery take?",
    a: "Once your application is submitted, paid, and approved, your digital IDP is typically delivered in approximately 8 minutes.",
  },
  {
    id: "dpd-3",
    category: "digital-printed-delivery",
    q: "How is a printed International Driving Permit delivered?",
    a: "A printed booklet ships after your application has been reviewed and approved — not before. We don't promise a specific delivery date, since shipping time depends on your destination and local postal handling.",
    links: [{ href: "/legal/shipping", label: "Shipping & delivery policy" }],
  },
  {
    id: "dpd-4",
    category: "digital-printed-delivery",
    q: "Can I get both a digital and printed International Driving Permit?",
    a: "Yes. You can choose digital, printed, or both when you apply — many travelers choose digital to have something ready quickly and add printed as a backup.",
    links: [{ href: "/pricing", label: "View pricing" }],
  },
  {
    id: "dpd-5",
    category: "digital-printed-delivery",
    q: "Is a digital International Driving Permit accepted everywhere a printed one is?",
    a: "No — acceptance of a digital-only International Driving Permit isn't guaranteed everywhere a printed booklet would be accepted; it varies by country, rental company, and individual official. A printed copy remains the more universally recognized format if you want to reduce that uncertainty.",
  },
  {
    id: "dpd-6",
    category: "digital-printed-delivery",
    q: "Do I need to print my digital IDP myself?",
    a: "You can choose to print it yourself for a physical backup, but the digital copy is designed to be shown directly from your phone or another device — self-printing isn't required to use it.",
  },
  {
    id: "dpd-7",
    category: "digital-printed-delivery",
    q: "What happens if my printed IDP doesn't arrive?",
    a: "Contact us through our contact page — our team can look into your shipment and next steps. We don't publish a guaranteed delivery window, since shipping timing depends on destination and postal handling outside our direct control.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    id: "dpd-8",
    category: "digital-printed-delivery",
    q: "Can I track my printed International Driving Permit shipment?",
    a: "Tracking availability depends on the shipping method used for your destination. Contact us for the current status of your specific shipment if you need an update.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    id: "dpd-9",
    category: "digital-printed-delivery",
    q: "What should I do if I lose my International Driving Permit while traveling?",
    a: "If you have a digital copy, you can access it directly from your account or email. If you only had a printed booklet, contact us to discuss your options — we don't offer an automatic instant reissue, since a replacement follows our standard application and review process.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    id: "dpd-10",
    category: "digital-printed-delivery",
    q: "Can I get a replacement digital copy if I lose my printed IDP?",
    a: "If you originally selected digital delivery alongside printed, your digital copy remains accessible independent of the physical booklet. If you only chose printed, contact us to discuss replacement options.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
];

const PAYMENTS_REFUNDS: FaqItem[] = [
  {
    id: "pr-1",
    category: "payments-refunds",
    q: "When do I pay for my International Driving Permit?",
    a: "You pay once, after completing the guided form, for whichever format you choose — digital, printed, or both.",
  },
  {
    id: "pr-2",
    category: "payments-refunds",
    q: "How much does an International Driving Permit cost?",
    a: "Pricing depends on whether you choose digital, printed, or both — see our pricing page for current, published rates. It's a one-time payment with no subscriptions or hidden fees.",
    links: [{ href: "/pricing", label: "View pricing" }],
  },
  {
    id: "pr-3",
    category: "payments-refunds",
    q: "Do you offer refunds?",
    a: "Yes, in specific circumstances. See our refund policy for the full conditions and how to request one.",
    links: [{ href: "/legal/refund-policy", label: "Refund policy" }],
  },
  {
    id: "pr-4",
    category: "payments-refunds",
    q: "What if I entered the wrong details on my application?",
    a: "Contact us as soon as possible — corrections can usually be handled by replying to our review message rather than paying again or starting a new application.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    id: "pr-5",
    category: "payments-refunds",
    q: "Can I change my delivery format after paying?",
    a: "Contact us as soon as possible if you need to change from digital to printed (or add a format) — depending on how far your application has progressed, we can often accommodate the change.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
  {
    id: "pr-6",
    category: "payments-refunds",
    q: "Are there subscriptions or recurring charges?",
    a: "No. It's a one-time payment per application. Apply IDP Online doesn't use subscriptions or automatically recurring charges.",
  },
  {
    id: "pr-7",
    category: "payments-refunds",
    q: "What payment methods are accepted?",
    a: "Accepted payment methods are shown during checkout on the application form. See our pricing page for the most current details.",
    links: [{ href: "/pricing", label: "View pricing" }],
  },
  {
    id: "pr-8",
    category: "payments-refunds",
    q: "Will I be charged again for a correction or replacement?",
    a: "A straightforward correction to your existing application (like fixing a typo before your permit is prepared) doesn't require a new payment. A full replacement after your permit has already been delivered may be treated as a new application — contact us to discuss your specific situation.",
    links: [{ href: "/contact", label: "Contact us" }],
  },
];

const SPECIAL_TRAVELERS: FaqItem[] = [
  {
    id: "st-1",
    category: "special-travelers-countries",
    q: "Can students apply for an International Driving Permit?",
    a: "Yes, as long as you're 18 or older and hold a valid, unexpired driver's license — student status itself doesn't change eligibility. International students should also check their host country's specific rules for foreign licenses.",
  },
  {
    id: "st-2",
    category: "special-travelers-countries",
    q: "Can military personnel apply for an International Driving Permit?",
    a: "Yes, using the same eligibility rules as any applicant — a valid, unexpired driver's license and age 18 or older. If you're stationed abroad long-term, also check whether your specific installation or host country has additional documentation requirements.",
  },
  {
    id: "st-3",
    category: "special-travelers-countries",
    q: "Do children need an International Driving Permit?",
    a: "No. An IDP translates an existing driver's license, and eligibility requires being 18 or older with a valid license — it isn't a document children can hold or need.",
  },
  {
    id: "st-4",
    category: "special-travelers-countries",
    q: "Can I apply if I'm moving abroad long-term rather than just visiting?",
    a: "Yes, the application itself doesn't distinguish between short trips and long-term moves. Keep in mind an IDP is generally intended to support visitors — many countries require converting to a local license after establishing residency, which is a separate process from applying for an IDP.",
  },
  {
    id: "st-5",
    category: "special-travelers-countries",
    q: "Do I need an International Driving Permit for a work-visa trip?",
    a: "Possibly, depending on your destination's typical requirement and how long you'll be there. A work visa itself doesn't change IDP eligibility or requirement — check your specific destination's guide alongside your visa's terms.",
    links: [{ href: "/countries", label: "Browse destination guides" }],
  },
  {
    id: "st-6",
    category: "special-travelers-countries",
    q: "Do international students need an International Driving Permit to drive in their host country?",
    a: "It depends on the host country's rules for foreign students and how long the student plans to stay and drive there. Some countries treat students similarly to tourists for a limited period, then expect a local license afterward — check your host country's specific guidance.",
  },
  {
    id: "st-7",
    category: "special-travelers-countries",
    q: "Can non-citizens apply through Apply IDP Online?",
    a: "Yes — eligibility is based on holding a valid, unexpired driver's license, not citizenship or nationality. Your IDP is prepared from the license you actually hold, regardless of which country issued it.",
  },
  {
    id: "st-8",
    category: "special-travelers-countries",
    q: "Do I need an International Driving Permit as a long-term resident rather than a tourist?",
    a: "Many countries expect visitors to convert to a local license after a certain length of stay, at which point an IDP is no longer the relevant document. Check your destination's residency and licensing rules alongside its tourist-specific IDP guidance.",
  },
  {
    id: "st-9",
    category: "special-travelers-countries",
    q: "Can I apply if I'm currently traveling and don't have a fixed address?",
    a: "Yes — the application doesn't require a fixed home address, since delivery can be arranged digitally. If you select printed delivery, make sure you provide an address where you can actually receive mail during your trip.",
  },
  {
    id: "st-10",
    category: "special-travelers-countries",
    q: "Does business travel require different documentation than tourism?",
    a: "An IDP application itself doesn't distinguish between business and leisure travel — the same eligibility and document requirements apply. Some destinations have separate visa or work-authorization rules for business travel, which are handled outside the IDP application process.",
  },
];

function requirementSentence(level: string, name: string): string {
  if (level === "Legally required") {
    return `Yes — an International Driving Permit is generally required to drive in ${name}. Requirements can still depend on where your licence was issued, its language, and whether you're renting a vehicle, so review the full ${name} guide before you travel.`;
  }
  if (level === "Commonly requested") {
    return `An International Driving Permit isn't always a strict legal requirement in ${name}, but it's commonly requested by rental counters and can be checked by local authorities. Whether you're asked for one can depend on your licence's origin and language — see the full ${name} guide for details.`;
  }
  return `Requirements in ${name} can depend on your licence's origin, language, and how you plan to drive there. See the full ${name} guide for verified, destination-specific details.`;
}

function countryFaqItems(): FaqItem[] {
  return Object.values(COUNTRY_REGISTRY)
    .map((record) => ({
      id: `country-${record.slug}`,
      category: "special-travelers-countries" as const,
      q: `Do I need an International Driving Permit in ${record.name}?`,
      a: requirementSentence(record.idpRequirementLevel.value, record.name),
      links: [{ href: `/countries/${record.slug}`, label: `${record.name} driving guide` }],
      aliases: COUNTRY_ALIASES[record.slug],
    }))
    .sort((a, b) => a.q.localeCompare(b.q));
}

export function getAllFaqItems(): FaqItem[] {
  return [
    ...WHAT_IS_IDP,
    ...ELIGIBILITY_DOCUMENTS,
    ...APPLICATION_PROCESSING,
    ...VALIDITY_RENEWAL,
    ...COUNTRIES_RECOGNITION,
    ...DRIVING_ABROAD,
    ...RENTAL_MOTORCYCLES,
    ...POLICE_FINES,
    ...INSURANCE,
    ...DIGITAL_PRINTED_DELIVERY,
    ...PAYMENTS_REFUNDS,
    ...SPECIAL_TRAVELERS,
    ...countryFaqItems(),
  ];
}

// Most Searched Questions — ranked by verified Semrush US search volume
// (re-checked at time of this pass), not guessed. No public-facing number
// is shown for any of these; the volumes below are documented here only
// so the selection itself is auditable.
//   1. ap-13  "how to get an international driving permit"      ~5,400/mo
//   2. ap-2   "international driving permit online" (can I apply)  ~880/mo
//   3. ap-1   "how to apply for international driving permit"      ~480/mo
//   4. wii-1  "what is an international driving permit"             ~320/mo
//   5. vr-1   "how long does an international driving permit last"  ~210/mo
//   6. cr-1   "what countries require an international driving permit" ~140/mo
//   7. wii-2  "what is an international driver's license" (equivalence)~110/mo
//   8. rm-1   rental-car + IDP — no standalone volume, but confirmed real
//             intent via AAA's own FAQ and Reddit/PAA research
//   9. ed-3   "documents required for international driving permit"  ~20/mo
//  10. dpd-5  digital-acceptance — no standalone volume, explicitly
//             requested topic with confirmed real-world intent
export const MOST_SEARCHED_QUESTION_IDS = ["ap-13", "ap-2", "ap-1", "wii-1", "vr-1", "cr-1", "wii-2", "rm-1", "ed-3", "dpd-5"];

// The six topics Featured Guidance highlights as expanded, always-open
// editorial blocks — pulled from this same dataset, never re-authored.
export const FEATURED_GUIDANCE_IDS = ["wii-1", "ap-1", "vr-1", "cr-1", "rm-1", "dpd-1"];
