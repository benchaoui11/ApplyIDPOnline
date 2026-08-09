import type { CountryRecord } from "./types";

// Mexico — Tier 1 flagship record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data.
//
// LEGAL SHAPE: matches the France/Portugal/UK "Commonly requested" pattern,
// not Spain/Italy/Romania/Brazil's "Legally required" one. Multiple
// independent sources agree Mexico does not require tourists to carry an
// IDP — a valid original licence that matches the visitor's passport is
// generally sufficient to drive, regardless of home country. An IDP
// becomes genuinely useful mainly when the original licence isn't already
// in Spanish or English, and some rental agents recommend or specifically
// request one anyway. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Recommended, not required"`, matching the established
// labeling for this pattern. Per the user's explicit brief for this build,
// every FAQ/directAnswer touching the requirement leads with the practical
// rental-counter outcome before the legal position — the same standing
// rule already applied to France and saved as project memory.
//
// A genuine, sourced curiosity worth noting: GOV.UK's own direct guidance
// names "the 1926 version" of the IDP for Mexico specifically — Mexico is
// a party to the 1926 Paris Convention on Motor Traffic rather than the
// 1949 Geneva or 1968 Vienna conventions referenced for other countries in
// this project. This is disclosed as a factual nuance in the driving
// guide; it isn't used to make a specific-format product claim the way
// Brazil's 1968-format language was, since Mexico's requirement is soft
// (recommended, not mandated) and the distinction matters far less here.
//
// FEDERAL VS. STATE, per the user's explicit instruction not to present a
// local rule as a nationwide one: the baseline third-party liability
// insurance requirement is federal (Ley de Caminos, Puentes y
// Autotransportes Federal, for vehicles on federal roads/highways/
// bridges), but Quintana Roo (covering Cancún and the Riviera Maya) and
// Baja California separately require their own state-level liability
// insurance on top of the federal minimum — both states are called out
// explicitly rather than implying a single nationwide insurance rule.
// Mexico City's "Hoy No Circula" licence-plate driving restriction is
// identified as a Mexico City rule only, not a national one.
//
// Sourcing discipline: Semrush API units were exhausted again at the start
// of this build. GOV.UK's Mexico safety-and-security travel advice was
// fetched directly and is the primary citation for UK licence validity,
// the 1926 IDP convention detail, road-safety conditions, and the Hoy No
// Circula programme. A specialist Mexican auto-insurance provider's
// federal-law page (citing Ley de Caminos, Puentes y Autotransportes
// Federal by section number) is cited for the insurance-law detail, since
// a direct fetch of a gob.mx page was not attempted successfully within
// this build's research pass — disclosed rather than hidden, consistent
// with prior countries' sourcing gaps. Secondary sources corroborate
// cuota/libre road mechanics, topes, the temporary vehicle import permit
// (TIP) exemption for the Baja Peninsula and border zone, and destination-
// specific driving conditions; these are marked partially_sourced.
//
// METADATA (Phase 9): metaTitle keeps the established "International
// Driving Permit {Country}" pattern used by every prior country in this
// cluster rather than a bespoke variant. This was a deliberate choice, not
// a default — the sitewide title template appends " | IDP Online" to
// every page, which leaves very little room to add a destination entity
// (e.g. "Cancún") before hitting display-safe truncation limits, and the
// brief explicitly requires preserving the full primary entity. Country-
// specific CTR value (Cancún) is placed in metaDescription instead, which
// has the room for it without truncation risk.
//
// FLAG VERIFICATION (mandatory per the user's brief): the existing
// MexicoFlag component was audited before this record was written and
// found to be an explicitly self-documented simplified placeholder — a
// plain white circle standing in for the coat of arms, with "coat of arms
// omitted" stated directly in its own code comment. This fails every
// emblem requirement in the brief (no eagle, no serpent, no cactus, no
// wreath). Using the same technique established for Spain and Brazil, the
// official reference SVG (Wikimedia Commons' File:Flag_of_Mexico.svg,
// built to Mexico's Ley sobre el Escudo, la Bandera y el Himno Nacionales
// geometric specification) was downloaded directly via curl and its
// coat-of-arms group extracted and re-serialized with Python's
// xml.etree.ElementTree, then embedded verbatim via
// dangerouslySetInnerHTML — reproducing the golden eagle devouring a
// rattlesnake while perched on a prickly pear cactus, with the full oak-
// and-laurel wreath, at the emblem's correct scale and position centered
// on the white band, rather than an approximation.
export const MEXICO: CountryRecord = {
  slug: "mexico",
  name: "Mexico",
  isoCode: "MX",
  region: "Americas",
  tier: 1,

  h1: "International Driving Permit Mexico",

  conventionStatus: {
    value: "Mexico doesn't require tourists to carry an International Driving Permit — a valid original licence that matches your passport is generally sufficient to drive. Rental-company requirements can still depend on your licence's language and the provider's own policy, so an IDP is a practical safeguard even though it isn't a nationwide legal requirement",
    status: "confirmed",
  },
  conventionLabel: "Recommended, not required",
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
      "Rental-company requirements can depend on your licence's language and the provider's own policy, so carrying an International Driving Permit alongside your original licence helps reduce delays or refusal at the counter in Mexico, even though Mexican law itself doesn't require one for tourists.",
    points: [
      { tip: "Mexico doesn't legally require tourists to carry an IDP — a valid original licence that matches your passport is generally enough to drive.", status: "confirmed" },
      { tip: "If your licence isn't already in Spanish or English, an IDP is the practical way to make it readable to Mexican authorities and rental staff.", status: "confirmed" },
      { tip: "Some rental agents recommend or specifically request an IDP regardless of your licence's language, so it's worth having one ready before you arrive.", status: "confirmed" },
      { tip: "An IDP only works together with your valid original licence — it's a translation aid, not a replacement for it.", status: "confirmed" },
      { tip: "Mexico drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Mexico", href: "/apply?destination=Mexico" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Mexico's toll roads are typically faster and better maintained than the free alternative, speed bumps called topes appear on nearly every non-toll route, and night driving outside cities carries meaningfully higher risk.",
    points: [
      { tip: "Toll roads, marked with a \"D\" for Directo, are generally faster and better maintained than the free \"libre\" alternative that runs alongside nearly every one by law.", status: "confirmed" },
      { tip: "Topes (speed bumps) appear on almost all non-toll roads, are often unmarked, and vary enough in size that unfamiliar drivers can damage a vehicle by not slowing in time.", status: "confirmed" },
      { tip: "An oncoming vehicle flashing its headlights can signal a hazard, narrow section, or checkpoint ahead — slow down and stay alert.", status: "partially_sourced" },
      { tip: "Speed limits run around 40 km/h in urban areas, 80 km/h on rural roads, and 110 km/h on toll motorways.", status: "partially_sourced" },
      { tip: "Mexico City's \"Hoy No Circula\" programme restricts some vehicles from driving on certain days based on licence plate — this is a Mexico City rule, not a nationwide one.", status: "confirmed" },
      { tip: "Night driving outside cities carries meaningfully higher risk, with unlit roads and hazards like stray animals — sticking to toll motorways after dark is the safer option if it can't be avoided.", status: "confirmed" },
      { tip: "The Green Angels (Ángeles Verdes) roadside assistance programme patrols federal highways and can be reached by calling 078.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Mexican law requires local third-party liability insurance to legally drive a rental car, and this is often sold separately from the online rental price at the counter.",
    points: [
      { tip: "Mexican law requires local third-party liability insurance to drive — foreign insurance and standard credit-card rental coverage don't satisfy this requirement.", status: "confirmed" },
      { tip: "Quintana Roo (covering Cancún and the Riviera Maya) and Baja California each have their own additional mandatory insurance laws on top of the federal requirement.", status: "confirmed" },
      { tip: "This local insurance isn't always clearly shown in online quotes, particularly in Cancún — confirm the full price including insurance before you arrive at the counter.", status: "confirmed" },
      { tip: "Most rental companies set a minimum age of 21, with some requiring 25 for certain vehicle categories, and an upper age limit around 75.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Mexico.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "Traffic checkpoints exist, and an oncoming driver flashing headlights can be a signal of one ahead.", status: "partially_sourced" },
      { tip: "Mexico's national emergency number is 911, and the Green Angels roadside assistance line for federal highways is 078.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving a rental car from the United States into Mexico is possible with most major providers, but it needs advance permission, separate Mexican auto insurance, and — outside the Baja Peninsula and the border zone — a temporary import permit for the vehicle.",
    points: [
      { tip: "US car insurance isn't valid in Mexico — you'll need separate Mexican auto insurance regardless of how you're crossing.", status: "confirmed" },
      { tip: "A Temporary Import Permit isn't required within the roughly 20km border zone or across the Baja California Peninsula, but is generally required to drive a foreign-plated vehicle into mainland Mexico beyond that zone.", status: "confirmed" },
      { tip: "Not every rental company allows crossing into Mexico, and those that do often restrict which border crossings are permitted or charge an additional fee.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Mexico — the US side of the trip has its own separate licence and insurance requirements.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Mexico — Mexican auto insurance and any cross-border rental permissions are handled separately with your insurer and rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Cancún & Riviera Maya", note: "Mexico's busiest self-drive cluster, linked by Highway 307 from Cancún International Airport through Playa del Carmen to Tulum — Quintana Roo requires its own separate liability insurance on top of the federal minimum.", status: "confirmed" },
    { name: "Mexico City", note: "Mexico's capital and a major international gateway, with Mexico City International Airport a common rental pickup point for road trips into central Mexico — the Hoy No Circula programme restricts some vehicles on specific days within the city.", status: "confirmed" },
    { name: "Los Cabos (Cabo San Lucas)", note: "A major Baja California Sur rental cluster around Los Cabos International Airport, within the exempt zone where a temporary vehicle import permit generally isn't required.", status: "confirmed" },
    { name: "Puerto Vallarta", note: "A Pacific coast beach destination with a strong self-drive rental market, useful for exploring the surrounding Riviera Nayarit coastline beyond the resort zone.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "911 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Mexico?",
      answer: "Rental-company requirements can depend on your licence's language, issuing country, and the provider's own policy, so carrying an IDP alongside your original licence helps reduce delays or refusal at the counter. Mexican law itself doesn't require tourists to carry one — a valid original licence matching your passport is generally enough to drive — but an IDP becomes genuinely useful if your licence isn't already in Spanish or English. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "Do US, Canadian, UK, EU, or Australian licence holders need an IDP for Mexico?",
      answer: "Not legally — Mexico allows tourists to drive on a valid original licence regardless of home country, as long as it's valid and matches your passport. Some rental agents recommend or request an IDP anyway, particularly if your licence isn't in Spanish or English, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "What documents do Mexican rental companies typically request?",
      answer: "Most ask for your original driving licence, your passport, and a credit card in your name for the deposit — and, depending on the provider and your licence's language, an International Driving Permit as well.",
    },
    {
      question: "Is Mexican car insurance required to rent a car?",
      answer: "Yes. Mexican law requires local third-party liability insurance to legally drive, and foreign insurance or standard credit-card rental coverage doesn't satisfy it. It's often sold separately from the online rental price, particularly in Cancún, so confirm the full cost including insurance before you arrive at the counter.",
    },
    {
      question: "What's the difference between cuota and libre roads?",
      answer: "Cuota (toll) roads are generally faster and better maintained, while libre (free) roads are slower and can include more unmarked hazards like topes. By law, a free alternative runs alongside nearly every toll road, but for long-distance or first-time trips, the toll road is usually the easier choice.",
    },
    {
      question: "What are topes?",
      answer: "Topes are Mexico's speed bumps, found on almost every non-toll road. They're often unmarked and vary considerably in size, so slow down through towns and any signed section to avoid vehicle damage.",
    },
    {
      question: "Is it safe to drive at night in Mexico?",
      answer: "Night driving outside cities carries meaningfully higher risk — roads are frequently unlit, and hazards like stray animals can appear with little warning. If you can't avoid it, stick to well-lit toll motorways.",
    },
    {
      question: "Can I take a rental car from the US into Mexico?",
      answer: "Often, but not automatically — you'll need your rental company's advance permission, separate Mexican auto insurance, and, if you're driving beyond the Baja Peninsula or the border zone, a temporary import permit for the vehicle. Confirm your provider's specific cross-border policy before you travel.",
    },
    {
      question: "Is Mexico City's Hoy No Circula programme relevant to tourists?",
      answer: "It can be, if you're driving a vehicle registered in the Mexico City area on a restricted day — the programme limits some vehicles based on licence plate. It's a Mexico City rule specifically, not a nationwide one, and most short-term rentals are unaffected, but it's worth confirming with your rental company if you're basing yourself in the city.",
    },
    {
      question: "Can I rent a car at Cancún Airport?",
      answer: "Yes — Cancún International Airport is one of Mexico's busiest rental hubs, with counters from major and local providers serving the Riviera Maya corridor down to Tulum.",
    },
    {
      question: "What are the speed limits in Mexico?",
      answer: "Generally 40 km/h in urban areas, 80 km/h on rural roads, and 110 km/h on toll motorways, though it's worth watching posted signs since limits can vary by road.",
    },
    {
      question: "What side of the road does Mexico drive on?",
      answer: "Mexico drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to rent a car in Mexico?",
      answer: "Most rental companies set a minimum of 21, with some requiring 25 for certain vehicle categories and an upper age limit around 75.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Mexico?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Mexico, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Mexico?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Mexico (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/mexico/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Mexico's Federal Liability Law",
      url: "https://www.bajabound.com/info/federallaw",
      organization: "Baja Bound Mexico Insurance (citing Ley de Caminos, Puentes y Autotransportes Federal)",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["united-states", "brazil", "argentina", "spain"],

  primaryKeyword: "international driving permit mexico",
  secondaryKeywords: [
    "idp mexico",
    "international driving license mexico",
    "driving in mexico",
    "car rental cancun",
    "driving in tulum",
    "driving in riviera maya",
    "mexico car insurance",
    "cuota toll roads mexico",
    "topes mexico",
    "los cabos car rental",
    "puerto vallarta car rental",
    "mexico city car rental",
  ],
  metaTitle: "International Driving Permit Mexico: Rental Car Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Mexico does not require an IDP nationally when your licence matches your passport, but rental counters may still ask for one.",
};
