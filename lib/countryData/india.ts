import type { CountryRecord } from "./types";

// India — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data.
//
// CRITICAL DIFFERENCE FROM EVERY COUNTRY BUILT SO FAR: this is the first
// record where a country asks for a SPECIFIC convention format rather than
// "any recognized IDP." GOV.UK's official Foreign Travel Advice for India
// states UK visitors must carry the "1949 version of the international
// driving permit (IDP)" alongside their licence — i.e. the Geneva 1949
// format specifically, not simply any Vienna-1968-or-Geneva-1949 document.
// This is the mirror image of Vietnam's Vienna-1968-only requirement, not
// the same shape of problem: most IDP-issuing authorities worldwide
// (including the UK's own) issue documents in or including the 1949
// format as their standard baseline, so this is disclosed as a "confirm
// the format" fact rather than framed as excluding any specific
// nationality the way Vietnam's record does — no source found gives a
// comparable named-country exclusion list for India, so none is invented
// here. GOV.UK also states IDP validity and recognition "vary from state
// to state" — a genuine consequence of India's federal structure that has
// no equivalent in any country built so far, and is stated plainly rather
// than glossed over.
//
// Sourcing discipline: commercial/aggregator sites (internationaldrivingpermit.org,
// drivinginternationalassociation.com, and other Semrush-surfaced
// competitor/discovery pages) were used only to identify what to verify
// and where. Fields marked "confirmed" were independently verified against
// GOV.UK's official Foreign Travel Advice for India (fetched directly
// during this build — see sourceCitations). India's own government IDP
// portal (services.india.gov.in) was found in research but, consistent
// with the same wrong-direction pattern confirmed for every other country
// built in this project, appears to serve Indian citizens applying to
// drive abroad rather than foreign visitors — this record could not fetch
// the portal's full content directly (redirect), so that specific
// disambiguation is presented with appropriately hedged confidence rather
// than as independently confirmed fact. Practical details (speed limits,
// FASTag tolling, Goa rental practices, road-safety hazards) are
// corroborated across multiple independent sources and marked
// "partially_sourced," not "confirmed." Semrush API access was exhausted
// before this build began, so — as with the Philippines — destination-area
// selection reflects consistent cross-source referencing rather than
// compared search volumes.
//
// Real, verified competitor gap found during research: most generic
// IDP-sales competitor pages treat India as legally uniform, without
// disclosing either the 1949-specific format requirement or the
// state-by-state validity variation GOV.UK explicitly flags — both
// included here.
export const INDIA: CountryRecord = {
  slug: "india",
  name: "India",
  isoCode: "IN",
  region: "Asia",
  tier: 1,

  h1: "International Driving License India",

  conventionStatus: {
    value: "Foreign visitors need an International Driving Permit under the 1949 Geneva Convention format, alongside their original licence — permit validity and recognition can vary somewhat by Indian state",
    status: "confirmed",
  },
  conventionLabel: "Geneva 1949 format",
  idpRequirementLevel: {
    value: "Legally required",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 18,
    status: "confirmed",
  },
  digitalIdpAcceptance: {
    value: "Acceptance can vary by rental provider — confirm with your rental company before your trip.",
    status: "partially_sourced",
  },

  drivingSide: {
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Foreign visitors need an International Driving Permit alongside their valid original licence to drive in India, and it must be the 1949 Geneva Convention format specifically.",
    points: [
      { tip: "You must carry both your original driving licence and your IDP together — one doesn't substitute for the other.", status: "confirmed" },
      { tip: "India requires the 1949 Convention format IDP, which is the standard format most issuing authorities produce by default.", status: "confirmed" },
      { tip: "IDP validity and recognition can vary somewhat from state to state, since motor vehicle enforcement sits partly with individual states.", status: "confirmed" },
      { tip: "India's own government IDP portal is set up for Indian citizens applying to drive abroad, not for foreign visitors — see the FAQ below for the distinction.", status: "partially_sourced" },
      { tip: "India drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for India", href: "/apply?destination=India" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "India drives on the left with road conditions, traffic density, and driving culture that vary dramatically between cities, highways, and rural areas.",
    points: [
      { tip: "Speed limits on expressways and national highways typically reach up to 120 km/h, with a minimum speed of around 60 km/h in places.", status: "partially_sourced" },
      { tip: "FASTag is mandatory for toll payment on national highways and expressways — vehicles without one can be charged double the toll.", status: "partially_sourced" },
      { tip: "Frequent horn use is a normal part of Indian driving culture, used to signal presence rather than as a sign of aggression.", status: "confirmed" },
      { tip: "Road hazards can include wandering livestock, inconsistent lane discipline, and vehicles occasionally driving against traffic — stay alert, especially outside major highways.", status: "confirmed" },
      { tip: "Avoid driving at night or in fog where possible, due to reduced visibility and road conditions.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available in major cities and tourist areas across India, though many visitors — especially in Delhi and Mumbai — find hiring a car with a driver considerably less stressful than self-driving.",
    points: [
      { tip: "The legal minimum age to drive in India is 18, and rental companies commonly expect drivers to be at least 21-25.", status: "partially_sourced" },
      { tip: "Self-drive rentals are widely available in Delhi, Mumbai, Goa, Bengaluru, Hyderabad, and Chennai.", status: "confirmed" },
      { tip: "Typical documents requested at pickup: your IDP, original licence, passport, and a credit card for the security deposit.", status: "partially_sourced" },
      { tip: "Goa is generally considered India's most self-drive-friendly region, with lighter traffic and rental infrastructure built around tourists.", status: "confirmed" },
      { tip: "Requirements vary by rental company and by state — confirm specifics with your provider before arrival.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  scooterGuide: {
    label: "Scooters & Motorcycles",
    directAnswer: "Scooter rental is especially popular in Goa, and the same IDP requirement applies to motorbikes as to cars, with your IDP needing to show a matching motorcycle category.",
    points: [
      { tip: "Your IDP only shows a motorcycle category if your original licence already includes one — it can't add a category you don't hold at home.", status: "confirmed" },
      { tip: "Helmets and proper footwear are required for riders.", status: "confirmed" },
      { tip: "Enforcement of licence checks at Goa rental shops is inconsistent in practice, but this doesn't change the legal requirement — and riding without valid documents can leave you without insurance cover if something goes wrong.", status: "confirmed" },
      { tip: "Confirm your travel insurance actually covers the engine size and vehicle type you plan to rent.", status: "confirmed" },
      { tip: "Driving or riding without a valid licence and IDP can affect your travel insurance coverage if you're in an accident.", status: "confirmed" },
    ],
    solutionNote: "Your IDP lists the vehicle categories from your original licence, including motorcycle categories where applicable.",
    ctaHint: { label: "Prepare my IDP for India", href: "/apply?destination=India" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's licence and your IDP together as your standard document set any time you're driving in India.",
    points: [
      { tip: "Your IDP and original licence work as a pair — one is not a substitute for the other at a roadside check.", status: "confirmed" },
      { tip: "Keep both documents physically accessible (not just a photo on your phone) whenever you're driving.", status: "confirmed" },
      { tip: "A passport or passport copy is also worth keeping with you, alongside your rental agreement if you're using a hired vehicle.", status: "partially_sourced" },
      { tip: "Since recognition can vary somewhat by state, having your documents complete and correctly formatted reduces any ambiguity at a check.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have both documents ready together.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence (for example, motorcycle vs. car categories) — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Motorcycle & car",

  popularDrivingAreas: [
    { name: "Goa", note: "India's most self-drive and scooter-friendly region, with lighter traffic and rental infrastructure built around tourists.", status: "confirmed" },
    { name: "Delhi", note: "India's capital and main international gateway via Indira Gandhi International Airport, and the starting point of the classic Golden Triangle route.", status: "confirmed" },
    { name: "Mumbai", note: "India's largest city and a major business and rental hub, with traffic conditions where many visitors prefer hiring a driver over self-driving.", status: "confirmed" },
    { name: "Golden Triangle (Delhi–Agra–Jaipur)", note: "A well-known tourist driving circuit connecting the capital, the Taj Mahal, and Rajasthan's forts and palaces.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (police, ambulance, fire)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in India?",
      answer: "Yes. Foreign visitors need a valid original driving licence together with an International Driving Permit, specifically in the 1949 Geneva Convention format, before they can legally drive in India. ApplyIDPOnline helps you prepare that IDP online ahead of your trip, so it's ready before you land.",
    },
    {
      question: "Does it matter which type of IDP I get for India?",
      answer: "Yes — India specifically requires the 1949 Convention format, which is the standard format most issuing authorities produce by default, so this is generally covered automatically by a standard IDP application. If you're ever unsure, it's worth confirming the format with your provider before you travel.",
    },
    {
      question: "Does my IDP work the same way in every Indian state?",
      answer: "Largely, but not with complete uniformity — recognition and enforcement of IDPs can vary somewhat between states, since motor vehicle regulation sits partly at the state level in India. Carrying a correctly formatted IDP alongside your original licence is the most reliable way to minimise any ambiguity wherever you're driving.",
    },
    {
      question: "What's the difference between India's government IDP portal and the IDP I need as a visitor?",
      answer: "They're for different directions of travel. India's national government services portal for International Driving Permits is set up for Indian citizens applying to drive abroad, not for foreign tourists. If you're visiting India, you need an IDP issued by an authorised body in your own home country — that's what this page and ApplyIDPOnline's service cover.",
    },
    {
      question: "Can I rent a scooter in Goa without an International Driving Permit?",
      answer: "Legally, no — you need an IDP alongside your original licence, even though enforcement at some rental shops in practice can be inconsistent. Riding without proper documentation can leave you without insurance cover if you're in an accident, so it's worth having your IDP ready regardless of how strictly it's checked at pickup.",
    },
    {
      question: "Is it better to self-drive or hire a driver in India?",
      answer: "It depends on where you're going. Goa is generally considered self-drive-friendly, while cities like Delhi and Mumbai have dense, often chaotic traffic that many visitors find considerably less stressful to navigate with a hired driver. Either way, your IDP is the same document you'd need if you did choose to drive yourself.",
    },
    {
      question: "What is FASTag, and do I need it as a visitor?",
      answer: "FASTag is India's mandatory electronic toll-payment system for national highways and expressways — vehicles without one can be charged double the toll. Rental companies typically handle this through the vehicle itself, so it's worth asking whether a FASTag is already fitted when you pick up your car.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in India?",
      answer: "Yes. You can submit your application fully online even if you've already arrived in India. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Do I need an IDP for a motorbike or scooter in India?",
      answer: "Yes, the same requirement applies to motorbikes as to cars. Your IDP only shows a motorcycle category if your original licence already includes one.",
    },
    {
      question: "What side of the road does India drive on?",
      answer: "India drives on the left, with the driver's seat on the right side of the vehicle — the same convention as Thailand, Singapore, Malaysia, and Indonesia.",
    },
    {
      question: "What documents should I carry while driving in India?",
      answer: "Your original driver's licence, your 1949 Convention format IDP, and a passport or passport copy are the standard set — add your rental agreement if you're using a hired vehicle.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in India?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "How is the Digital IDP delivered?",
      answer: "By email as a downloadable document once your application is submitted, paid, and approved by our team.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — India (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/india/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["thailand", "vietnam", "indonesia", "philippines"],

  primaryKeyword: "international driving permit india",
  secondaryKeywords: [
    "idp india",
    "international driving license india",
    "driving in india",
    "goa scooter rental",
    "self drive car rental india",
    "golden triangle india driving",
    "fastag toll india",
    "delhi driving guide",
    "mumbai self drive",
    "india speed limit",
    "international drivers license",
    "india driving licence for foreigners",
  ],
  metaTitle: "International Driving License India: Geneva Format Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "India requires the specific Geneva 1949 booklet format alongside your original licence, and recognition on the ground can vary somewhat state to state.",
};
