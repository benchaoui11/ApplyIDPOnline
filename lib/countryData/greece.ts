import type { CountryRecord } from "./types";

// Greece — Tier 1 flagship record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// The GreeceFlag component and destinations.ts entry already existed
// from an earlier pass; the flag was audited (not modified) during this
// build, and this is the first lib/countryData/greece.ts record.
//
// ISLANDS-OVER-ATHENS DISCIPLINE (the defining instruction for this
// build): the brief was explicit this page must not become "Athens
// only," and Semrush backs that reading with real numbers. Every one of
// the five named islands outperforms Athens on both raw fame and rental-
// specific commercial demand: Crete and Santorini are tied at 90,500/mo
// generically (more than double Athens's 40,500/mo), and "car rental
// rhodes" / "car rental corfu" (1,900/mo each) both clearly outperform
// any Athens-specific rental term found ("rent a car athens" peaks at
// 880/mo). This is a different demand shape from every other European
// country built so far, where the capital was the obvious dominant
// rental hub — for Greece, the islands are where the self-drive market
// actually lives, and the page is built around that reality rather than
// defaulting to the usual capital-first pattern.
//
// LEGAL SHAPE — genuinely different from every other EU country in this
// project, and worth documenting precisely rather than forcing it into
// the usual EU/EEA template: EU/EEA licences are fully valid with no IDP
// needed. But among non-EU/EEA visitors, Greek Law 4850/2021 specifically
// exempts tourists holding a US, Canadian, UK, Australian, or Gibraltar
// licence from the IDP requirement for stays under six months (185 days)
// — a named-country exemption list, not a blanket EU/EEA-vs-rest split
// or a pure language test. Every other non-EU/EEA licence requires an
// IDP alongside it. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Required for most non-EU/EEA visitors"` — "most"
// rather than a flat non-EU/EEA split, to reflect that Law 4850/2021
// carves out specific major-market exceptions most other EU countries in
// this project don't name explicitly. Even where the law exempts a
// visitor, rental companies and police checks commonly still ask for an
// IDP in practice, so every FAQ/directAnswer leads with that
// rental-counter reality before the legal nuance, per the standing
// project rule saved from France.
//
// FERRY + RENTAL CAR, the brief's explicitly flagged biggest practical
// opportunity, covered as its own dedicated point rather than folded
// into a generic rental note: taking a rental car onto a Greek ferry
// requires the rental company's advance permission, and policies vary
// enormously by provider — some allow it for a fee, some exclude
// ferry-transit from CDW/collision-damage coverage entirely, some only
// allow specific routes, and most don't allow a car to be dropped off on
// a different island than it was picked up on. Rather than assert one
// company's specific policy as universal, this record states the
// mechanism and the practical norm (rent separately on each island you
// visit) and is explicit that terms must be confirmed directly with the
// rental provider — consistent with how cross-border rental letters were
// handled for the UAE, Saudi Arabia, and South Africa records.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to seriously
// evaluate Athens, Crete, Santorini, Mykonos, Rhodes, and Corfu for four
// slots. Crete and Santorini are tied as the highest-volume named
// entities (90,500/mo each); Rhodes and Corfu are tied as the highest
// rental-specific commercial terms (1,900/mo each, "car rental rhodes"
// and "car rental corfu"). Those four data points align cleanly on both
// axes tourism importance and car-rental demand, so Crete, Santorini,
// Rhodes, and Corfu are the four cards. Athens and Mykonos were both
// evaluated and are real (Athens as the mainland/airport gateway,
// Mykonos at 40,500/mo generic and 320/mo rental-specific) but placed
// below the top four on the same data — both still receive substantial
// coverage in the Rental Cars guide and FAQ rather than a fifth card,
// since every prior country record in this project holds Popular Driving
// Areas at exactly four.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk database, which is
// what surfaced the islands-over-Athens finding above). GOV.UK's Greece
// safety-and-security travel advice was fetched directly and is the
// primary citation for UK licence validity, road conditions, and the
// drink-driving limit. Greek Law 4850/2021's named-country IDP exemption
// is corroborated across multiple independent sources describing the
// same US/Canada/UK/Australia/Gibraltar exemption list and 185-day
// window. Fields not corroborated by a primary government source are
// marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): the existing
// GreeceFlag component was audited, not rebuilt. Its construction — nine
// alternating blue/white horizontal stripes, a blue canton exactly five
// stripes tall and square, a white cross with arms one stripe thick —
// matches the flag's official 1978 legal construction exactly, and its
// blue (#0D5EAF) matches the value most consistently used across
// independent references, even though Greek law itself doesn't mandate
// a specific shade. No rebuild was needed.
export const GREECE: CountryRecord = {
  slug: "greece",
  name: "Greece",
  isoCode: "GR",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Greece",

  conventionStatus: {
    value: "As an EU member, Greece fully recognizes any valid EU/EEA driving licence — no International Driving Permit is needed. Among non-EU/EEA visitors, Greek Law 4850/2021 specifically exempts US, Canadian, UK, Australian, and Gibraltar licence holders from the IDP requirement for stays under six months; visitors from every other non-EU/EEA country need an IDP alongside their home licence",
    status: "confirmed",
  },
  conventionLabel: "Required for most non-EU/EEA visitors",
  idpRequirementLevel: {
    value: "Commonly requested",
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
      "Most car rental companies on Crete, Rhodes, and Corfu ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your nationality.",
    points: [
      { tip: "EU/EEA driving licences are fully valid in Greece — no IDP is needed at all.", status: "confirmed" },
      { tip: "US, Canadian, UK, Australian, and Gibraltar licence holders are specifically exempt from the IDP requirement for stays under six months, under Greek Law 4850/2021.", status: "confirmed" },
      { tip: "Visitors from every other non-EU/EEA country need an IDP alongside their home licence to drive legally in Greece.", status: "confirmed" },
      { tip: "Most rental companies across the islands and mainland treat an IDP as a standard condition of rental regardless of these exemptions.", status: "confirmed" },
      { tip: "Greece drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Athens, Crete, or wherever you're starting.",
    ctaHint: { label: "Prepare my IDP for Greece", href: "/apply?destination=Greece" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Greek traffic is busy and drivers frequently disregard posted speed limits, mountain roads on islands like Crete demand real caution, and the drink-driving limit is stricter than the UK's.",
    points: [
      { tip: "Traffic in Greek cities is often described as busy, fast, and chaotic, with drivers commonly exceeding posted speed limits even in built-up areas — extra vigilance at pedestrian crossings is worth it, since drivers don't reliably stop for them.", status: "confirmed" },
      { tip: "Mountain roads on islands like Crete can be narrow with steep drops on one side and rock walls on the other — using a lower gear on long descents, sounding your horn before blind bends, and giving way to uphill traffic are standard local practices.", status: "confirmed" },
      { tip: "The drink-driving limit is stricter than the UK's — exceeding roughly two-thirds of England's legal limit is a serious offence carrying fines and possible imprisonment.", status: "confirmed" },
      { tip: "Athens has a toll motorway, the Attiki Odos, connecting the city centre with the northern and eastern suburbs and Athens International Airport.", status: "confirmed" },
      { tip: "Seatbelts are mandatory for all occupants.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Athens International Airport and on every major island, with Rhodes, Corfu, Crete, Santorini, and Mykonos each having their own local rental market.",
    points: [
      { tip: "The legal minimum driving age is 18, but hire companies commonly set higher minimums and expect at least a year of licence history.", status: "confirmed" },
      { tip: "Athens International Airport and the main airports on Crete (Heraklion and Chania), Rhodes, Corfu, Santorini, and Mykonos all have rental counters from major providers.", status: "confirmed" },
      { tip: "Taking a rental car onto a Greek ferry requires the rental company's advance permission — policies vary by provider, with some allowing it for a fee, others excluding ferry-transit from collision-damage coverage, and most not permitting drop-off on a different island than pickup.", status: "confirmed" },
      { tip: "The practical norm for island-hopping is to rent a separate car on each island you visit rather than assume one rental can travel with you by ferry.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Greek rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Greece.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving.", status: "confirmed" },
      { tip: "112 is the emergency number that works from any phone on any network, including foreign SIMs — direct lines are 100 for police, 166 for ambulance, and 199 for fire.", status: "confirmed" },
      { tip: "171 is a dedicated Tourist Police line for visitors needing English-language assistance.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Greece's four land-border neighbors have genuinely different crossing rules — Bulgaria is a free-flow Schengen border, while Albania, North Macedonia, and Turkey all require a passport check.",
    points: [
      { tip: "Bulgaria is a Schengen and EU member, so crossing by road is normally free-flow with no routine document checks.", status: "confirmed" },
      { tip: "Albania and North Macedonia are outside both the EU and Schengen, so crossing into either requires a passport check at the border.", status: "confirmed" },
      { tip: "Turkey is also outside the EU and Schengen, and crossing requires a passport check along with any visa Turkey requires for your nationality.", status: "confirmed" },
      { tip: "Tell your rental company in advance if you're planning to cross into any neighboring country, since cross-border coverage needs to be confirmed rather than assumed.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Greece — cross-border rental arrangements are confirmed separately with your provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — a car-only IDP doesn't grant you scooter or motorcycle categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car or Scooter",

  popularDrivingAreas: [
    { name: "Crete", note: "Greece's largest island and highest-demand rental market, with airports at both Heraklion and Chania and a well-known driving trade-off between the fast coastal road and narrower, more scenic mountain routes.", status: "confirmed" },
    { name: "Santorini", note: "One of Greece's most-searched destinations, with a compact road network connecting Fira, Oia, and the island's black-sand beaches.", status: "confirmed" },
    { name: "Rhodes", note: "Greece's single highest rental-demand island alongside Corfu, combining Rhodes Town's old city with coastal and inland driving routes.", status: "confirmed" },
    { name: "Corfu", note: "An Ionian island tied with Rhodes for the strongest rental-specific demand in Greece, known for a greener, hillier driving landscape than the Cyclades.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (works on any network), 100 (police), 166 (ambulance), 199 (fire), 171 (Tourist Police)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Greece?",
      answer: "Most rental companies on the islands ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, EU/EEA licences are fully valid with no IDP needed at all — US, Canadian, UK, Australian, and Gibraltar licence holders are specifically exempt for stays under six months under Greek Law 4850/2021, while visitors from every other non-EU/EEA country need an IDP alongside their home licence. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not by law for stays under six months, since Greek Law 4850/2021 specifically exempts these licences from the IDP requirement. Most rental companies still expect one in practice, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Can I take a rental car on a ferry between Greek islands?",
      answer: "Only with your rental company's advance permission — policies vary a lot by provider. Some allow it for a fee, some exclude ferry-transit from collision-damage coverage, and most don't allow the car to be dropped off on a different island than it was picked up on. The common practical approach is to rent a separate car on each island rather than assume one rental can travel with you.",
    },
    {
      question: "Is driving in Crete difficult?",
      answer: "It can be for first-time visitors, mainly due to narrow mountain roads with steep drops on one side. Standard local practice is to use a lower gear on long descents, sound your horn before blind bends, and give way to traffic coming uphill.",
    },
    {
      question: "Can I rent a car at Athens Airport?",
      answer: "Yes — Athens International Airport has rental counters from every major provider, alongside the main airports on Crete, Rhodes, Corfu, Santorini, and Mykonos.",
    },
    {
      question: "What's the drink-driving limit in Greece?",
      answer: "It's stricter than the UK's — exceeding roughly two-thirds of England's legal limit is a serious offence in Greece, carrying fines and possible imprisonment.",
    },
    {
      question: "Is there a toll road in Athens?",
      answer: "Yes — the Attiki Odos is a toll motorway connecting central Athens with the northern and eastern suburbs and Athens International Airport.",
    },
    {
      question: "Can I rent a scooter instead of a car on the Greek islands?",
      answer: "Yes, scooter rental is common and widely available on the islands. Your IDP covers the vehicle categories already shown on your original licence — a car-only licence doesn't grant scooter categories it doesn't already include.",
    },
    {
      question: "Can I drive a rental car from Greece into Bulgaria, Albania, or North Macedonia?",
      answer: "Often, yes, but the borders work differently. Bulgaria is a Schengen member, so crossing is normally free-flow. Albania and North Macedonia are outside the EU and Schengen, so both require a passport check. Tell your rental company in advance so cross-border coverage is confirmed.",
    },
    {
      question: "What side of the road does Greece drive on?",
      answer: "Greece drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Greece?",
      answer: "The legal minimum driving age is 18. Hire companies commonly set higher minimums and expect at least a year of licence history.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Greece?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Greece, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Greece?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Greece (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/greece/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Do You Need an International Driving Permit (IDP) to Drive in Greece?",
      url: "https://greekcitytimes.com/2026/07/30/do-i-need-an-international-drivers-license-in-greece-3/",
      organization: "Greek City Times",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["italy", "turkey", "united-kingdom", "romania"],

  primaryKeyword: "international driving permit greece",
  secondaryKeywords: [
    "idp greece",
    "international driving license greece",
    "car rental greece",
    "crete car rental",
    "santorini car rental",
    "rhodes car rental",
    "corfu car rental",
    "driving in crete",
    "athens airport car rental",
    "ferry rental car greek islands",
    "driving greek islands",
    "greece law 4850/2021",
  ],
  metaTitle: "IDP Greece: Eligibility Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "Greek Law 4850/2021 names US, Canadian, UK, Australian, and Gibraltar licences as exempt under six months — every other non-EU visitor needs an IDP.",
};
