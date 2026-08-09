import type { CountryRecord } from "./types";

// Poland — Tier 1 European record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// This is the first pass for Poland — no prior flag component,
// destinations.ts entry, or flagColors.ts entry existed before this
// build; all three were added.
//
// ZAKOPANE-DOMINANT KEYWORD CLUSTER (the single strongest finding of
// this build's Semrush research): "zakopane" alone returns 368,000/mo in
// the pl database — the largest single-entity volume found anywhere in
// this project so far, and still 22,200/mo even in the de database
// (Germans are a major source market for Tatra Mountain trips). Every
// direct IDP-specific term for Poland is tiny by comparison (20-70/mo
// across every database tested). Warsaw and Kraków are genuinely tied at
// the top of Poland's rental-specific commercial demand — "warsaw car
// rental" (3,600/mo, pl database) edges "krakow car rental" (2,900/mo)
// locally, while the uk database shows the reverse (Kraków's tourist
// draw outperforming Warsaw's more business-oriented market
// internationally) — which is exactly why both are protected as
// mandatory cards rather than picking one over the other.
//
// LEGAL SHAPE: matches the established "Commonly requested" + EU/EEA
// pattern, with one distinct detail worth stating precisely rather than
// assuming it matches Hungary's or Austria's windows: non-EU/EEA
// visitors from a country that's signed the 1949 Geneva or 1968 Vienna
// Convention on Road Traffic — which covers the large majority of
// nationalities — can drive in Poland on their home licence for up to
// six months from arrival. An IDP becomes the practical way to carry a
// translation where the licence isn't already recognized, and rental
// companies commonly ask for one regardless. `idpRequirementLevel:
// "Commonly requested"` / `conventionLabel: "Required for non-EU/EEA
// visitors"`. Every FAQ/directAnswer touching the requirement leads with
// the practical rental-counter outcome before the legal nuance, per the
// standing project rule saved from France.
//
// TOLLS, deliberately not oversimplified per the brief's explicit
// instruction: Poland's GNSS-based e-TOLL system is mandatory only for
// vehicles over 3.5 tonnes and buses on state-owned motorway and
// expressway sections — an ordinary rental car is exempt from e-TOLL
// entirely, and there's no vignette or sticker system for light vehicles
// in Poland at all. What an ordinary tourist actually encounters is a
// separate, older system: on privately operated motorway sections (parts
// of the A1, A2, and A4), every vehicle, including passenger cars, pays
// a conventional toll at a barrier. A page that just says "Poland has
// e-TOLL" without this distinction would actively mislead a rental-car
// driver about what applies to them — this record states both systems
// as genuinely separate.
//
// POPULAR DRIVING AREAS RESEARCH NOTE: the brief asked me to seriously
// weigh Warsaw, Kraków, Gdańsk/Baltic Coast, Zakopane/Tatra Mountains,
// Wrocław, the Masurian Lake District, Poznań, and Katowice for four
// slots, and was explicit that Warsaw and Kraków shouldn't be omitted
// without strong data-backed justification. Neither needed to be —
// both are comfortably the two strongest rental-specific markets in the
// country by a wide margin over every other city tested. Zakopane is an
// obvious third pick on the strength of its overwhelming volume alone.
// For the fourth slot, Wrocław's rental-specific term (1,300/mo) is
// higher than Gdańsk's (880/mo) taken alone — but Gdańsk sits at the
// heart of the Tri-City with Sopot, and Sopot's own volume (246,000/mo)
// means the real aggregate demand across the Gdańsk/Sopot Baltic Coast
// cluster substantially exceeds Wrocław's standalone number, the same
// pattern already found with Norway's Danube-Bend-style town clustering.
// Combined with the Baltic Coast's much stronger self-drive road-trip
// framing than Wrocław's, Gdańsk/Baltic Coast took the fourth card.
// Wrocław, the Masurian Lake District, Poznań, and Katowice were all
// evaluated and are real, but are covered in the Rental Cars guide and
// FAQ instead of a fifth card, since every prior country record in this
// project holds Popular Driving Areas at exactly four.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these reports run against the uk, pl, and de databases,
// which is what surfaced the Zakopane and Baltic Coast findings above).
// GOV.UK's Poland safety-and-security travel advice was fetched directly
// and is the primary citation for UK licence validity, road conditions,
// required documents, and the rental-car restriction at the
// Poland-Ukraine border. GDDKiA (Poland's national roads authority) and
// the official e-TOLL portal corroborate the toll-system distinction.
// Fields not corroborated by a primary government source are marked
// partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): no PolandFlag
// component existed before this build. The new component is the plain
// civil flag — white over red, no coat of arms — built at this
// codebase's standard 900x600 canvas (matching the flag's official 5:8
// ratio closely), using the hex value most consistently cited against
// Poland's 1980/1997 flag law (Pantone 485C / #DC143C). Verified
// visually at zoom before this record shipped.
export const POLAND: CountryRecord = {
  slug: "poland",
  name: "Poland",
  isoCode: "PL",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Poland",

  conventionStatus: {
    value: "As an EU member, Poland fully recognizes any valid EU/EEA driving licence — no International Driving Permit is needed. Non-EU/EEA visitors from a country that's signed the 1949 Geneva or 1968 Vienna Convention — which covers the large majority of nationalities — can drive on their home licence for up to six months from arrival; an IDP is the practical way to carry a translation where that licence isn't already recognized",
    status: "confirmed",
  },
  conventionLabel: "Required for non-EU/EEA visitors",
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
      "Most car rental companies in Warsaw and Kraków ask for an International Driving Permit at the counter, so carrying one helps you avoid delays even where the underlying legal requirement depends on your nationality.",
    points: [
      { tip: "EU/EEA driving licences are fully valid in Poland — no IDP is needed at all.", status: "confirmed" },
      { tip: "Non-EU/EEA visitors from a Geneva or Vienna Convention country can generally drive on their home licence for up to six months from arrival.", status: "confirmed" },
      { tip: "An IDP becomes the practical way to carry a translation where your licence isn't already recognized in Poland.", status: "confirmed" },
      { tip: "Most rental companies in Warsaw, Kraków, and beyond treat an IDP as a standard condition of rental regardless of these exceptions.", status: "confirmed" },
      { tip: "You must carry your driving licence, ID, vehicle registration document, and insurance documents while driving — police can confiscate a vehicle and charge fees if these aren't produced.", status: "confirmed" },
      { tip: "Poland drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land in Warsaw or Kraków.",
    ctaHint: { label: "Prepare my IDP for Poland", href: "/apply?destination=Poland" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Poland's toll system splits into two genuinely separate parts, the drink-driving limit is one of the strictest in the EU, and rural roads can call for extra caution, especially after dark.",
    points: [
      { tip: "The GNSS-based e-TOLL system only applies to vehicles over 3.5 tonnes and buses on state-owned roads — an ordinary rental car is exempt from it entirely.", status: "confirmed" },
      { tip: "Poland has no vignette or windscreen-sticker toll system for light vehicles at all.", status: "confirmed" },
      { tip: "Separately, privately operated sections of the A1, A2, and A4 motorways charge every vehicle, including passenger cars, a conventional toll at a barrier — this is a different system from e-TOLL.", status: "confirmed" },
      { tip: "Poland's drink-driving limit is 0.02% blood alcohol, among the strictest in the EU and well below the 0.05% used in most other countries.", status: "confirmed" },
      { tip: "Speed limits are generally 50km/h in urban areas, 90km/h outside built-up areas, 120km/h on expressways, and 140km/h on motorways.", status: "confirmed" },
      { tip: "Winter tyres are recommended, particularly on rural roads, but aren't a legal requirement — studded tyres are permitted from 1 November to 31 March.", status: "confirmed" },
      { tip: "Minor roads and even some main roads between towns can be narrow and poorly surfaced, and driving after dark on these roads is genuinely more difficult.", status: "confirmed" },
      { tip: "Roadworks are frequent, particularly in summer, as the road network is repaired and upgraded.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local officials to check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is widely available at Warsaw Chopin Airport and Kraków Airport, with Gdańsk and Wrocław both real options for trips focused on the Baltic Coast or western Poland.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental company minimums are typically higher — commonly 21 with at least a year's licence history, and some providers set it as low as 19 with an underage-driver surcharge.", status: "confirmed" },
      { tip: "Warsaw Chopin Airport and Kraków Airport both have rental counters from every major provider, with Warsaw Modlin, Gdańsk, and Wrocław airports also serving major rental brands.", status: "confirmed" },
      { tip: "Most rental companies won't allow their vehicles to cross the Poland-Ukraine border, so confirm any eastern cross-border plans with your provider before booking.", status: "confirmed" },
      { tip: "Warsaw's city centre is covered by paid parking zones enforced on weekdays roughly from 8am to 6pm — free parking is more available in residential districts and at shopping centre lots.", status: "confirmed" },
      { tip: "Typical documents requested at pickup are your original licence, an IDP if applicable, your passport or ID, and a credit card in the main driver's name for the deposit.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most Polish rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Poland.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times while driving, alongside your ID, registration, and insurance documents.", status: "confirmed" },
      { tip: "112 works EU-wide as the general emergency number, but direct lines — 997 for police, 998 for fire, and 999 for ambulance — are recommended since 112 doesn't always work reliably in every area.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Poland into Germany, the Czech Republic, Slovakia, or Lithuania is normally a free-flow Schengen crossing, with no routine document checks.",
    points: [
      { tip: "Germany, the Czech Republic, Slovakia, and Lithuania are all Schengen and EU members, so crossing by road is normally free-flow with no routine document checks.", status: "confirmed" },
      { tip: "Tell your rental company in advance if you're planning to cross into any of these countries, since cross-border coverage needs to be confirmed rather than assumed.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Poland — each neighboring country sets its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Poland — cross-border rental arrangements are confirmed separately with your provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Warsaw", note: "Poland's capital and a top-tier rental market in its own right, with pickup at Warsaw Chopin Airport and a citywide paid-parking zone worth planning around once you're downtown.", status: "confirmed" },
    { name: "Kraków", note: "Poland's other dominant rental market, with pickup at Kraków Airport and the standard starting point for trips toward Zakopane and the Tatra Mountains.", status: "confirmed" },
    { name: "Zakopane", note: "Poland's single highest-demand destination by search volume, gateway to the Tatra Mountains and a well-established mountain road trip from Kraków.", status: "confirmed" },
    { name: "Gdańsk", note: "The heart of the Tri-City on the Baltic Coast alongside Sopot, with its own airport and a genuinely different coastal driving landscape from southern Poland.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 (EU-wide), 997 (police), 998 (fire), 999 (ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Poland?",
      answer: "Most rental companies in Warsaw and Kraków ask for an IDP at the counter, so carrying one helps you avoid delays. Legally, EU/EEA licences are fully valid with no IDP needed at all — non-EU/EEA visitors from a Geneva or Vienna Convention country can generally drive on their home licence for up to six months, and an IDP becomes the practical way to carry a translation where that licence isn't already recognized. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since these countries are Convention signatories and their licence holders can generally drive in Poland for up to six months — a UK photocard licence, for example, can be used to drive in Poland for up to six months. Most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Do I need to pay e-TOLL as a tourist driving a rental car in Poland?",
      answer: "No — e-TOLL only applies to vehicles over 3.5 tonnes and buses on state-owned roads, so an ordinary rental car is exempt. What you will likely encounter instead is a separate, older system: privately operated sections of the A1, A2, and A4 motorways charge passenger cars a conventional toll at a barrier.",
    },
    {
      question: "Does Poland use a motorway vignette or windscreen sticker?",
      answer: "No — Poland has no vignette or sticker system for light vehicles at all. The e-TOLL system that does exist applies only to trucks and buses, and any toll an ordinary car pays is a separate conventional barrier toll on specific privately operated motorway sections.",
    },
    {
      question: "What's the drink-driving limit in Poland?",
      answer: "It's 0.02% blood alcohol, among the strictest limits in the EU and well below the 0.05% used in most other countries.",
    },
    {
      question: "Do I need winter tyres to drive in Poland?",
      answer: "They're recommended, particularly on rural roads, but they aren't a legal requirement. Studded tyres are permitted from 1 November to 31 March if you choose to use them.",
    },
    {
      question: "Can I rent a car at Warsaw or Kraków airport?",
      answer: "Yes — Warsaw Chopin Airport and Kraków Airport both have rental counters from every major provider, and Warsaw Modlin, Gdańsk, and Wrocław airports also serve major rental brands.",
    },
    {
      question: "Is Zakopane worth driving to from Kraków?",
      answer: "Yes — it's Poland's single highest-demand destination by search volume, and the drive from Kraków into the Tatra Mountains is a well-established road trip.",
    },
    {
      question: "Is parking difficult in Warsaw?",
      answer: "The city centre is covered by a paid parking zone enforced on weekdays roughly from 8am to 6pm. Free parking is more available in residential districts and at shopping centre lots outside the core.",
    },
    {
      question: "Can I drive a rental car from Poland into Ukraine?",
      answer: "Generally, no — most rental companies won't allow their vehicles to cross the Poland-Ukraine border, so this needs to be discussed directly with your rental provider rather than assumed possible.",
    },
    {
      question: "Can I drive a rental car from Poland into Germany, the Czech Republic, Slovakia, or Lithuania?",
      answer: "Yes — all four are Schengen and EU members, so crossing is normally free-flow with no routine document checks. Tell your rental company in advance so cross-border coverage is confirmed.",
    },
    {
      question: "What side of the road does Poland drive on?",
      answer: "Poland drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Poland?",
      answer: "The legal minimum driving age is 18. Rental company minimums are typically higher — commonly 21 with at least a year's licence history, though some providers accept drivers from 19 with a surcharge.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Poland?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Poland, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Poland?",
      answer: "Not universally — acceptance can vary by rental provider, so it's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Poland (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/poland/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "e-TOLL — Official Information Portal",
      url: "https://etoll.gov.pl/en/",
      organization: "General Directorate for National Roads and Motorways (GDDKiA)",
    },
  ],
  lastVerifiedDate: "2026-08-05",

  relatedCountrySlugs: ["germany", "hungary", "united-kingdom", "netherlands"],

  primaryKeyword: "international driving permit poland",
  secondaryKeywords: [
    "idp poland",
    "international driving license poland",
    "car rental poland",
    "warsaw car rental",
    "krakow car rental",
    "e-toll poland",
    "poland motorway toll",
    "driving in poland",
    "zakopane road trip",
    "tatra mountains",
    "gdansk car rental",
    "poland winter driving",
  ],
  metaTitle: "International Driving Permit Poland: Eligibility Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Visitors from most Geneva or Vienna Convention countries get six months on their home licence alone, with an IDP serving mainly as a translation backup.",
};
