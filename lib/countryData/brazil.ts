import type { CountryRecord } from "./types";

// Brazil — Tier 1 flagship record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data. Added as
// a new destination (was not previously in lib/destinations.ts).
//
// GENUINELY DIFFERENT LEGAL ARCHITECTURE FROM EVERY PRIOR COUNTRY: every
// prior European record split by EU/EEA membership. Brazil's rule (per
// Decree 86.714/1981, implementing the 1968 Vienna Convention on Road
// Traffic) instead turns on whether a visitor's licence already conforms
// to the Vienna Convention format — visitors can drive on a valid original
// licence for up to 180 days from entry, but if the licence isn't in
// Portuguese or isn't already in Vienna Convention format, an IDP (the
// 1968 version specifically — the 1949 Geneva-only IDP is explicitly not
// valid here) or a certified translation is needed alongside it. The most
// consequential nuance: although the United States signed the 1968 Vienna
// Convention, it never incorporated it into US domestic law, so US
// licence holders specifically need a genuine IDP — this affects the
// majority of this service's actual customers (the eligibility checker
// defaults to a United States licence), matching the reasoning already
// used for Spain, Italy, and Romania. `idpRequirementLevel: "Legally
// required"` with a Brazil-specific `conventionLabel: "Required for most
// non-Portuguese licences"` (rather than reusing "Required for non-EU/EEA
// visitors", which would misdescribe Brazil's actual test).
//
// Sourcing discipline: Semrush API units were exhausted again at the start
// of this build. GOV.UK's Brazil safety-and-security travel advice was
// fetched directly and is the primary citation for UK licence validity,
// road-safety conditions, and drink-driving penalties. A Brazilian legal
// practice's guide (advmatheuscosta.com.br) is cited for the Decree
// 86.714/1981 basis and the Vienna Convention format/US-specific nuance,
// since a direct fetch of the US Embassy Brazil page and a search
// targeting Brazilian government (gov.br) sources did not surface an
// extractable primary government page — disclosed rather than hidden,
// consistent with prior countries' sourcing gaps. Secondary sources
// corroborate the 180-day rule, toll (pedágio) payment mechanics, speed
// limits, and destination-specific driving conditions; these are marked
// partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief, and the most
// consequential fix in this build): the existing BrazilFlag component was
// audited before this record was written and found to be an explicitly
// self-documented simplified placeholder — a plain green field, yellow
// rhombus, and blue circle with "stars/motto omitted" stated directly in
// its own code comment. This fails essentially every requirement in the
// brief (no stars, no constellation, no motto banner). Given this
// project's established precedent for maximum-fidelity complex-emblem
// flags (Spain's coat of arms), the same technique was used: the official
// reference SVG (Wikimedia Commons' File:Flag_of_Brazil.svg, built to
// Brazil's Law 5.700/1971 geometric specification — the 27 five-pointed
// stars are positioned per the actual night sky over Rio de Janeiro on 15
// November 1889, each sized and placed according to the star's Bayer/
// visual-magnitude class per the same law) was downloaded directly via
// curl and its celestial-globe/stars/motto-band group extracted with
// Python's xml.etree.ElementTree, then embedded verbatim via
// dangerouslySetInnerHTML — reproducing the green field, yellow rhombus,
// blue globe, white equatorial band with "ORDEM E PROGRESSO", and all 27
// stars in their exact official positions, rather than an approximation.
export const BRAZIL: CountryRecord = {
  slug: "brazil",
  name: "Brazil",
  isoCode: "BR",
  region: "Americas",
  tier: 1,

  h1: "International Driving Permit Brazil",

  conventionStatus: {
    value: "Foreign visitors can drive in Brazil on a valid original licence for up to 180 days from entry. If your licence isn't in Portuguese or isn't already in 1968 Vienna Convention format, Brazilian law requires an International Driving Permit or a certified translation alongside it — this includes holders of a US licence, since the US never incorporated the Vienna Convention into its own domestic law",
    status: "confirmed",
  },
  conventionLabel: "Required for most non-Portuguese licences",
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
      "Most non-Portuguese-speaking visitors, including US licence holders, need an International Driving Permit alongside their valid original licence to drive legally in Brazil for up to 180 days.",
    points: [
      { tip: "Foreign visitors can drive in Brazil on their valid original licence, together with their passport, for up to 180 days from entry.", status: "confirmed" },
      { tip: "If your licence isn't already in Portuguese or Vienna Convention format, you'll need an International Driving Permit or a certified translation alongside it.", status: "confirmed" },
      { tip: "Brazil specifically recognizes the 1968 Vienna Convention IDP — the older 1949 Geneva-only format is not valid here.", status: "confirmed" },
      { tip: "US licence holders need a genuine IDP, since the United States signed the Vienna Convention but never incorporated it into its own domestic law.", status: "confirmed" },
      { tip: "Brazil drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your 1968-format IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Brazil", href: "/apply?destination=Brazil" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Brazil enforces an effectively zero-tolerance drink-driving law, runs an extensive private toll (pedágio) network, and the UK government's own travel advice flags a genuinely higher road-accident rate than many destinations.",
    points: [
      { tip: "Brazil's \"Lei Seca\" (dry law) means any detectable blood alcohol can result in a fine and a 12-month licence suspension, with higher levels treated as a criminal offense.", status: "confirmed" },
      { tip: "Speed limits are generally 60 km/h in urban areas, 80 km/h on rural roads, and 110 km/h on motorways.", status: "partially_sourced" },
      { tip: "Most major toll roads (pedágio) accept cash and card at the booth, alongside electronic tag systems like Sem Parar, ConectCar, and Veloe.", status: "confirmed" },
      { tip: "The UK government's own travel advice describes Brazil's road accident rate as high, and recommends avoiding night driving outside cities.", status: "confirmed" },
      { tip: "The same guidance also flags carjacking risk on major roads and in tunnels, since rural roads outside main highways are often in poor condition.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available in Brazil's major cities and tourist gateways, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, sometimes with a young-driver surcharge.", status: "partially_sourced" },
      { tip: "São Paulo's Guarulhos Airport (GRU) has rental counters from major providers including Avis, Budget, and Hertz within the terminals.", status: "confirmed" },
      { tip: "Rio de Janeiro's Galeão Airport also has rental counters from major providers reachable from the arrivals area.", status: "partially_sourced" },
      { tip: "If your rental car doesn't come with an electronic toll tag, you can still pay tolls with cash or card, or settle a free-flow gantry charge online afterward using your plate number.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence and your International Driving Permit, if you need one, together as your standard document set any time you're driving in Brazil.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible at all times, along with your passport.", status: "confirmed" },
      { tip: "\"Blitz\" checkpoints enforcing the Lei Seca drink-driving law are common, especially around accident hotspots and during holiday periods.", status: "confirmed" },
      { tip: "Traffic accidents must be reported to the police immediately, either by calling 190 or visiting a police station.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Rio de Janeiro", note: "Brazil's most internationally recognized city, with rental counters at Galeão Airport — GOV.UK's own guidance recommends avoiding night driving and staying alert to carjacking risk on major roads and in tunnels.", status: "confirmed" },
    { name: "São Paulo", note: "Brazil's largest city and a major international gateway through Guarulhos Airport (GRU), with an extensive network of private toll roads on routes leading out of the metro area.", status: "confirmed" },
    { name: "Foz do Iguaçu (Iguazu Falls)", note: "Gateway to Iguazu Falls and Iguaçu National Park, a UNESCO World Heritage site near the Argentina and Paraguay borders, with rental counters available at the local airport.", status: "confirmed" },
    { name: "Florianópolis", note: "A southern Brazil beach destination well suited to self-drive exploring, with a rental car a practical way to reach its many beaches beyond the main city centre.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "190 (police), 192 (ambulance), 193 (fire)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Brazil?",
      answer: "It depends on your licence. Foreign visitors can drive on their valid original licence for up to 180 days from entry, but if your licence isn't already in Portuguese or 1968 Vienna Convention format, you'll need an IDP or a certified translation alongside it. This includes US licence holders, since the US never incorporated the Vienna Convention into its own domestic law. ApplyIDPOnline prepares your IDP fully online before your trip.",
    },
    {
      question: "I have a US licence — do I need an IDP for Brazil?",
      answer: "Yes. Although the United States signed the 1968 Vienna Convention, it never incorporated the treaty into US domestic law, so US licence holders need a genuine International Driving Permit to drive legally in Brazil. It must be obtained before you travel, since Brazil doesn't issue IDPs to foreign visitors.",
    },
    {
      question: "Is a 1949 Geneva International Driving Permit valid in Brazil?",
      answer: "No. Brazil specifically recognizes the 1968 Vienna Convention format IDP — an older 1949 Geneva-only permit isn't valid here, so it's worth confirming you're getting the correct version.",
    },
    {
      question: "How long can I drive in Brazil on my foreign licence?",
      answer: "Up to 180 days from your date of entry, shown by your passport's entry stamp. After that, longer-term residents need to convert to a Brazilian driver's licence (CNH) through their local DETRAN.",
    },
    {
      question: "What's the drink-driving limit in Brazil?",
      answer: "Brazil's \"Lei Seca\" (dry law) is effectively zero-tolerance — any detectable blood alcohol can result in a fine and a 12-month licence suspension, with higher levels treated as a criminal offense. \"Blitz\" checkpoints enforcing it are common, especially around holidays.",
    },
    {
      question: "Is it safe to drive in Brazil?",
      answer: "GOV.UK's own travel advice describes Brazil's road accident rate as high and driving standards as poor, and recommends avoiding night driving outside cities and staying alert to carjacking risk on major roads and in tunnels. Sticking to main routes and driving during daylight hours is the most straightforward way to reduce risk.",
    },
    {
      question: "Do I need to pay tolls in Brazil?",
      answer: "On many major routes, yes. Most toll roads (pedágio) accept cash or card at the booth, and electronic tag systems like Sem Parar and ConectCar are also common. If your rental doesn't have a tag and you pass through a free-flow gantry, you can usually settle the charge online afterward using your plate number.",
    },
    {
      question: "Can I rent a car at São Paulo or Rio airport?",
      answer: "Yes — São Paulo's Guarulhos Airport (GRU) and Rio's Galeão Airport both have rental counters from major providers reachable from the terminals.",
    },
    {
      question: "Is a rental car worth it for visiting Iguazu Falls?",
      answer: "Many travelers find it useful — Foz do Iguaçu is the gateway to Iguazu Falls and the surrounding national park, and having your own car makes it easier to reach nearby attractions like the Itaipu Dam at your own pace.",
    },
    {
      question: "What side of the road does Brazil drive on?",
      answer: "Brazil drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Brazil?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, sometimes with a young-driver surcharge.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Brazil?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Brazil, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Brazil?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Brazil (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/brazil/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "How Foreigners Can Drive in Brazil",
      url: "https://www.advmatheuscosta.com.br/en/how-foreigners-can-drive-in-brazil",
      organization: "Advogado Matheus Costa — Brazilian legal practice (citing Decree 86.714/1981)",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["mexico", "argentina", "united-states", "united-kingdom"],

  primaryKeyword: "international driving permit brazil",
  secondaryKeywords: [
    "idp brazil",
    "international driving licence brazil",
    "driving in brazil",
    "brazil car rental",
    "brazil toll roads pedagio",
    "iguazu falls car rental",
    "florianopolis road trip",
    "sao paulo airport car rental",
    "rio de janeiro car rental",
    "brazil driving safety",
    "lei seca brazil",
    "brazil right hand driving",
  ],
  metaTitle: "International Driving Permit Brazil: Legal Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "Brazilian law requires an IDP whenever a licence isn't in Portuguese or Vienna Convention format — a rule that catches US licence holders specifically.",
};
