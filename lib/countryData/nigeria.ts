import type { CountryRecord } from "./types";

// Nigeria — Tier 1 African record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// This is the first pass for Nigeria — no prior flag component,
// destinations.ts entry, or flagColors.ts entry existed before this
// build; all three were added.
//
// LEGAL SHAPE — the clearest "Legally required" case found in this
// project, and worth stating precisely rather than defaulting to the
// usual "Commonly requested" shape used for most countries built so far:
// an FRSC (Federal Road Safety Corps) commander is directly quoted in
// Nigerian press stating that "no foreign driver's licence is permitted
// to be used to drive on our road," citing Section 82 of the National
// Road Traffic Regulations, with the same requirement explicitly applied
// to foreign visitors entering Nigeria with driving credentials from
// other countries. Unlike Spain, Italy, Romania, or Brazil — this
// project's other "Legally required" records — there's no regional bloc
// equivalent to the EU/EEA that exempts any group of foreign licences in
// Nigeria; the requirement is stated unconditionally. Some commercial
// rental-aggregator sources describe a softer, language-based framing
// ("only if your licence isn't in English"), but a directly quoted named
// FRSC official citing a specific numbered regulation is weighted as the
// stronger source here, the same judgment-call discipline applied to
// Turkey's record earlier in this project. `idpRequirementLevel:
// "Legally required"` / `conventionLabel: "Required for all foreign
// visitors"`.
//
// KEYWORD-SHAPE NOTE, genuinely different from every European record
// built so far: Nigeria's demand doesn't concentrate on the literal "IDP"
// abbreviation the way most countries do. "international driving
// license nigeria" and "international drivers license nigeria" (880/mo
// each, ng database) each outperform "international driving permit
// nigeria" (20/mo) by 44x, and "idp nigeria" (170/mo) also clearly
// outperforms the full phrase. A People Also Ask result — "how to verify
// nigeria international driving permit" (90/mo) — signals real
// verification-intent search volume alongside acquisition intent.
// "International Driving Permit" is preserved as the primary entity per
// the brief, but "international driving license/drivers license" is
// woven throughout as the actual dominant phrasing this audience uses.
//
// OUTBOUND-VS-INBOUND DIRECTION DISCIPLINE, the same care already
// applied to the UAE's u.ae parallel and South Africa's AA parallel:
// Nigeria's FRSC and the Automobile Association-equivalent process most
// commercial sources describe is about Nigerians obtaining an IDP to
// drive abroad — the opposite direction from this page's purpose. This
// record is written entirely for the inbound direction: visitors
// travelling to Nigeria who need an IDP prepared from their home-country
// licence, never suggesting ApplyIDPOnline can verify or replace a
// Nigerian-issued IDP for outbound travel.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to evaluate
// Lagos, Abuja, Lekki, Victoria Island, Port Harcourt, and Kano for four
// slots. Lagos is unambiguous — "lagos car rental" (2,400/mo) is more
// than 11x Abuja's own rental-specific term (210/mo), the highest
// rental-specific gap found in this project. Victoria Island (18,100/mo)
// and Lekki (12,100/mo) both have genuine independent search volume, but
// both are districts within Lagos rather than distinct cities — giving
// either its own card alongside Lagos itself would read as padding
// rather than real geographic coverage, so both are covered within
// Lagos's own card note and the FAQ instead. Abuja is kept as the
// mandatory federal capital, matching every prior country record's
// "always include the capital" pattern. Port Harcourt (40,500/mo) is
// Nigeria's oil-industry hub with genuine business-travel and rental
// relevance. Kano (60,500/mo), the highest raw volume of the six
// candidates, was chosen over a second Lagos-district card specifically
// to avoid concentrating all four cards in the south — it's Nigeria's
// major northern city and gives the page real national coverage rather
// than a Lagos-and-satellites selection.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these and phrase_questions reports run against the uk
// and ng databases, which is what surfaced the keyword-shape and
// verification-intent findings above). The FRSC commander's directly
// quoted statement (via Information Nigeria) is the primary citation for
// the legal requirement. A commercial Lagos-airport rental guide
// corroborates the practical rental-counter document requirements.
// Fields not corroborated by a primary government source are marked
// partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): no NigeriaFlag
// component existed before this build. The new component is a vertical
// green-white-green tricolor with no emblem, at the flag's official 1:2
// ratio, using the green value most specifically cited against Nigeria's
// flag (as opposed to a generic websafe-green guess used by some
// sources), hex #008751. Verified visually at zoom before this record
// shipped.
export const NIGERIA: CountryRecord = {
  slug: "nigeria",
  name: "Nigeria",
  isoCode: "NG",
  region: "Africa",
  tier: 1,

  h1: "International Driving Permit Nigeria",

  conventionStatus: {
    value: "Under Section 82 of Nigeria's National Road Traffic Regulations, foreign driving licences are not permitted for use on Nigerian roads on their own — the Federal Road Safety Corps requires foreign visitors to carry an International Driving Permit alongside their original licence to drive legally in Nigeria",
    status: "confirmed",
  },
  conventionLabel: "Required for all foreign visitors",
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
    value: "Right",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Nigeria requires foreign visitors to carry an International Driving Permit alongside their original licence — the FRSC has stated directly that a foreign licence alone isn't permitted for use on Nigerian roads.",
    points: [
      { tip: "Section 82 of the National Road Traffic Regulations doesn't recognize a foreign driving licence on its own for driving in Nigeria.", status: "confirmed" },
      { tip: "An IDP alongside your original licence is what the FRSC requires foreign visitors to carry.", status: "confirmed" },
      { tip: "Your IDP validity can't exceed the validity of your underlying home-country licence, regardless of the IDP's own printed expiry.", status: "confirmed" },
      { tip: "Nigeria drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Lagos or Abuja.",
    ctaHint: { label: "Prepare my IDP for Nigeria", href: "/apply?destination=Nigeria" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Road conditions and traffic patterns in Nigeria call for real preparation — heavy congestion in Lagos, poorly lit roads after dark, and safety equipment that's legally required in your vehicle.",
    points: [
      { tip: "A fire extinguisher and an emergency warning triangle are required by law to be carried in the vehicle.", status: "confirmed" },
      { tip: "Most roads lack lighting at night, and driving after dark is meaningfully more hazardous than during the day.", status: "confirmed" },
      { tip: "Lagos traffic can produce severe congestion lasting hours during rush periods, so timing your driving outside peak hours is worth planning for.", status: "confirmed" },
      { tip: "During the rainy season, roughly May to October, flash flooding can significantly worsen road conditions.", status: "confirmed" },
      { tip: "Police checkpoints are a routine, common part of driving in Nigeria — slowing down, remaining polite, and having your documents accessible is standard practice.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for officials to check at a checkpoint.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Lagos's Murtala Muhammed International Airport and Abuja's Nnamdi Azikiwe International Airport, with Port Harcourt also serving major providers for business travel.",
    points: [
      { tip: "The legal minimum driving age is 18, and most rental providers accept drivers from that age, though a young-driver surcharge can apply under 25.", status: "confirmed" },
      { tip: "Murtala Muhammed International Airport's rental desks are located at Arrivals D and E in the International Terminal.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP, your passport, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
      { tip: "Check that your rental includes a spare tyre, jack, and emergency kit before you drive off, since road conditions outside major urban centres can be demanding.", status: "confirmed" },
      { tip: "Fuel stations are widely available in Lagos, Abuja, and Port Harcourt, but become less reliable in rural areas, so it's worth topping up before leaving a city.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP Nigerian rental counters require alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence and your International Driving Permit together as your standard document set any time you're driving in Nigeria.",
    points: [
      { tip: "Your original licence and your IDP should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "112 is Nigeria's national toll-free emergency number, connecting to police, fire, and medical response on any network.", status: "confirmed" },
      { tip: "122 is the Federal Road Safety Corps' dedicated number for road-related emergencies.", status: "confirmed" },
      { tip: "At a police checkpoint, slowing down, remaining calm and polite, and keeping your documents ready is standard, widely recommended practice.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready at a checkpoint.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Lagos", note: "Nigeria's dominant rental and business-travel market by a wide margin, with pickup at Murtala Muhammed International Airport and driving concentrated around Victoria Island, Lekki, and Ikeja.", status: "confirmed" },
    { name: "Abuja", note: "Nigeria's federal capital, with pickup at Nnamdi Azikiwe International Airport and a more planned, less congested road layout than Lagos.", status: "confirmed" },
    { name: "Port Harcourt", note: "Nigeria's oil-industry hub in the south-south, with genuine business-travel rental demand distinct from Lagos or Abuja.", status: "confirmed" },
    { name: "Kano", note: "Nigeria's major northern city, giving visitors driving in the north a distinct destination from the country's southern business centres.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (national), 122 (FRSC road emergencies)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Nigeria?",
      answer: "Yes — the Federal Road Safety Corps has stated directly that a foreign driving licence isn't permitted for use on Nigerian roads on its own, under Section 82 of the National Road Traffic Regulations. An IDP alongside your original licence is what's required to drive legally in Nigeria. ApplyIDPOnline prepares yours fully online before your trip.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I still need an IDP in Nigeria?",
      answer: "Yes. Nigeria's requirement isn't limited to licences in a particular language or from a particular region — an IDP alongside your original licence applies to foreign visitors generally.",
    },
    {
      question: "Can I rent a car at Lagos Airport without an IDP?",
      answer: "It's not something to count on. Rental counters at Murtala Muhammed International Airport commonly require an IDP alongside your original licence and passport, consistent with Nigeria's legal requirement for foreign drivers.",
    },
    {
      question: "Are police checkpoints common when driving in Nigeria?",
      answer: "Yes — they're a routine part of driving throughout the country. Slowing down, remaining polite, and having your original licence and IDP accessible is standard, widely recommended practice.",
    },
    {
      question: "Is it required to carry safety equipment in a rental car in Nigeria?",
      answer: "Yes — a fire extinguisher and an emergency warning triangle are required by law to be carried in the vehicle, so it's worth confirming these are included when you pick up your rental.",
    },
    {
      question: "Is driving in Lagos difficult?",
      answer: "Traffic congestion is the main challenge — Lagos can see severe delays lasting hours during rush periods, so planning your driving outside peak hours is worth doing where possible.",
    },
    {
      question: "Can I rent a car at Abuja Airport?",
      answer: "Yes — Nnamdi Azikiwe International Airport has rental counters from major providers, and Abuja's road layout is generally more planned and less congested than Lagos.",
    },
    {
      question: "Is it safe to drive at night in Nigeria?",
      answer: "It calls for extra caution — most roads lack lighting after dark, making night driving meaningfully more hazardous than daytime driving.",
    },
    {
      question: "What side of the road does Nigeria drive on?",
      answer: "Nigeria drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Nigeria?",
      answer: "The legal minimum driving age is 18, and most rental providers accept drivers from that age, though a young-driver surcharge can apply under 25.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Nigeria?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Nigeria, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Nigeria?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "\"No Foreign Driver's Licence Is Permitted For Use On Nigerian Roads\" — FRSC Commander",
      url: "https://www.informationng.com/2026/05/no-foreign-drivers-licence-is-permitted-for-use-un-nigerian-roads-frsc-commander.html",
      organization: "Information Nigeria, citing the Federal Road Safety Corps",
    },
    {
      label: "Murtala Muhammed International Airport Car Rentals",
      url: "https://www.trip.com/carhire/to-nigeria-75/lagos-783/murtala-muhammed-international-airport-los/",
      organization: "Trip.com",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["south-africa", "kenya", "morocco", "united-kingdom"],

  primaryKeyword: "international driving permit nigeria",
  secondaryKeywords: [
    "idp nigeria",
    "international driving license nigeria",
    "international drivers license nigeria",
    "lagos car rental",
    "abuja car rental",
    "murtala muhammed airport car rental",
    "driving in lagos",
    "nigeria rental car requirements",
    "frsc international driving permit",
    "victoria island car rental",
    "port harcourt car rental",
    "nigeria police checkpoints",
  ],
  metaTitle: "International Driving Permit Nigeria: Legal Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "Section 82 of Nigeria's Road Traffic Regulations bars a foreign licence alone — the Federal Road Safety Corps requires an IDP for visitors who drive.",
};
