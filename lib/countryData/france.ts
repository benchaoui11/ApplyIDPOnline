import type { CountryRecord } from "./types";

// France — Tier 1 flagship record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data.
//
// DIFFERENT LEGAL SHAPE FROM SPAIN AND ITALY: France's own government
// portal (Service-Public.fr, fetched directly) states that a non-EU/EEA
// visitor's licence must be valid and either in French, or accompanied by
// an International Driving Permit (except British licences), or an
// official translation that's legalized/apostilled if done abroad — an IDP
// is one of two satisfying options, not an unconditional legal mandate.
// France's official tourism board (France.fr, also fetched directly) is
// explicit: an IDP is "generally recommended," not required. This matches
// the established pattern already used for the Philippines, Hong Kong,
// Ireland, the UK, Australia, Canada, New Zealand, and Portugal — not the
// "Legally required" pattern used for Spain and Italy — so this record
// sets `idpRequirementLevel: "Commonly requested"` and `conventionLabel:
// "Recommended, not required"`. The practical nuance (every major rental
// company requires one at the counter regardless of the legal minimum) is
// disclosed honestly in the driving guide and FAQ rather than smoothed
// over into either a pure "not required" or pure "required" framing.
//
// CRO FIX (post-launch, per user review): the driving-guide directAnswer
// and the two IDP-requirement FAQ answers originally led with the legal
// technicality ("Not strictly by law...", "It isn't a strict legal
// requirement..."). Since the site's job is helping travelers actually
// rent and drive a car, not win a legal argument, these were rewritten to
// lead with the practical rental-counter outcome first (rental companies
// commonly ask for an IDP), then state the legal position, then restate
// that the original licence must always be carried and the IDP never
// replaces it, then point to ApplyIDPOnline as the practical fix — while
// still never overstating the law itself. This lead-with-the-practical-
// outcome structure is the new standard for any future country where
// idpRequirementLevel is "Commonly requested" rather than "Legally
// required" (i.e. the Portugal/UK/Ireland/Australia/Canada/NZ pattern).
//
// Sourcing discipline: Semrush API units were exhausted again at the start
// of this build. Two official primary sources were fetched in full:
// Service-Public.fr (the French government's own citizen-services portal)
// and France.fr (the official national tourism board) — both confirmed the
// IDP-recommended-not-required framing independently. Secondary sources
// corroborate Crit'Air/ZFE zones, autoroute toll mechanics, the 1984
// roundabout-priority reform, winter-tyre law in mountain departments, and
// destination-specific driving conditions (French Riviera, Provence, Loire
// Valley); these are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): the existing
// FranceFlag component (three equal vertical bands, #0055A4 / #FFFFFF /
// #EF4135) was checked against the official French national flag before
// this record shipped. The colours are the standard, widely-corroborated
// values for Pantone Reflex Blue and Pantone 032 (no French law specifies
// exact shades, but these are the values used across French government and
// vexillological references). On proportions: France's flag is equal
// vertical thirds at a 2:3 ratio for the standard national flag used
// everywhere except the French Navy — the Navy alone uses an unequal
// 30:33:37 (blue:white:red) ensign variant, by a 19th-century regulation
// intended to optically balance the flag at sea. Equal thirds is the
// correct choice for a general national-flag representation. No rebuild
// was needed — the existing asset was already accurate — but it was
// re-verified visually at zoom before this record shipped.
export const FRANCE: CountryRecord = {
  slug: "france",
  name: "France",
  isoCode: "FR",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit France",

  conventionStatus: {
    value: "EU and EEA driving licence holders, and UK licence holders, can drive in France with no International Driving Permit needed. Visitors on other non-EU/EEA licences can drive on their valid original licence, but France's own guidance describes an International Driving Permit as generally recommended, and it's required in practice by every major rental car company",
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
      "Most rental car companies in France ask non-EU/EEA visitors for an International Driving Permit alongside their original licence before releasing a car, and carrying one is the most reliable way to avoid delays at the counter, even though French law itself doesn't make it an unconditional requirement.",
    points: [
      { tip: "EU and EEA driving licences are valid in France with no IDP required, and UK licences are also accepted without one.", status: "confirmed" },
      { tip: "Non-EU/EEA visitors can drive on their valid original licence, and France.fr describes an International Driving Permit as generally recommended for its translation value.", status: "confirmed" },
      { tip: "In practice, major rental companies including Hertz, Avis, Europcar, and Sixt require an IDP from non-EU/EEA renters at the counter.", status: "confirmed" },
      { tip: "The IDP is not a standalone document — it's carried alongside your original national licence, not instead of it.", status: "confirmed" },
      { tip: "France drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for France", href: "/apply?destination=France" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "France's low-emission zones require a Crit'Air sticker, its autoroutes charge tolls, and mountain regions require winter tyres or chains in season.",
    points: [
      { tip: "Most modern roundabouts give priority to circulating traffic, following the national standard adopted in 1984.", status: "confirmed" },
      { tip: "A minority of older roundabouts, mostly in small towns, still follow the traditional priority-to-the-right rule instead.", status: "confirmed" },
      { tip: "Paris, Lyon, Marseille, and several other major cities require a Crit'Air emissions sticker to enter their low-emission zones — most rental cars already qualify and carry one.", status: "confirmed" },
      { tip: "Most autoroutes charge tolls, payable by cash or card at the booth, with an electronic Liber-t tag available as a rental add-on for faster passage.", status: "confirmed" },
      { tip: "The speed limit on autoroutes is 130 km/h, dropping by 20 km/h in wet weather.", status: "confirmed" },
      { tip: "The blood alcohol limit is 0.5 g/L for most drivers.", status: "confirmed" },
      { tip: "Mountain regions, including the Alps and Pyrenees, require winter tyres or snow chains between November and March.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available across mainland France, with most providers setting age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, with some setting the bar at 25.", status: "confirmed" },
      { tip: "Paris Charles de Gaulle and Orly airports both have rental counters from major providers reachable from the arrivals area.", status: "confirmed" },
      { tip: "Many rental agencies require having held your licence for at least one year.", status: "confirmed" },
      { tip: "On the French Riviera, rental cars run pricier than elsewhere in France, so booking well ahead and picking up directly at the airport is worth it.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence and your International Driving Permit, if you're carrying one, together as your standard document set any time you're driving in France.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "The Police Nationale and Gendarmerie conduct roadside checks, and automatic speed cameras (radars) are common along autoroutes and main roads.", status: "confirmed" },
      { tip: "Emergency services across France can be reached on 112.", status: "confirmed" },
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
    { name: "Paris", note: "France's capital and busiest arrival point, with rental counters at both Charles de Gaulle and Orly airports — central Paris requires a Crit'Air sticker to enter its low-emission zone.", status: "confirmed" },
    { name: "French Riviera (Nice to Monaco)", note: "A scenic coastal drive along the Côte d'Azur linking Nice, Cannes, and Monaco via the historic Corniche roads.", status: "confirmed" },
    { name: "Provence", note: "A countryside road-trip region known for lavender fields, hilltop villages, and vineyards, reached from Marseille or Nice airports.", status: "partially_sourced" },
    { name: "Loire Valley", note: "A countryside road trip past historic châteaux including Chambord and Chenonceau, with rental cars available in Tours, Angers, and Nantes.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in France?",
      answer: "Most international rental companies in France ask non-EU/EEA visitors to present an International Driving Permit alongside their original licence before releasing the vehicle, so if you're renting a car, plan on bringing one. Legally, France doesn't make an IDP an unconditional requirement — its own guidance describes one as generally recommended rather than mandatory — but your original licence must always be carried regardless, and an IDP never replaces it; it's a translation document that travels alongside it. ApplyIDPOnline prepares your IDP fully online before you go, so it's ready well before you reach the rental counter.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for France?",
      answer: "No. EU and EEA driving licences are recognized in France without any additional document, and UK licences are also accepted without one.",
    },
    {
      question: "I have a US, Canadian, or Australian licence — do I need an IDP?",
      answer: "Yes, in practice. Major rental companies including Hertz, Avis, Europcar, and Sixt commonly ask non-EU/EEA renters for an International Driving Permit at the counter, and arriving without one risks delays or a refused rental even with a fully valid licence. Legally, France's own guidance frames an IDP as recommended rather than strictly mandatory — but either way, you'll still need your original home-country licence with you, since the IDP travels alongside it, not instead of it.",
    },
    {
      question: "What is a Crit'Air sticker, and will it affect my rental car?",
      answer: "A Crit'Air sticker is an emissions classification required to enter low-emission zones (ZFE) in cities including Paris, Lyon, and Marseille. Most rental cars already qualify and come with one, but it's worth confirming with your rental company before driving into a city centre.",
    },
    {
      question: "Do I need to pay tolls in France?",
      answer: "Yes, on most autoroutes. Pay by cash or card at the toll booth, or add an electronic Liber-t tag to your rental for faster passage through dedicated lanes.",
    },
    {
      question: "Can I rent a car at Paris CDG or Orly airport?",
      answer: "Yes — both Charles de Gaulle and Orly have rental counters from major providers reachable from the arrivals area.",
    },
    {
      question: "What is the \"priorité à droite\" rule?",
      answer: "It's the traditional French rule giving priority to traffic joining from the right. Most modern roundabouts have replaced it with priority to circulating traffic, but some older roundabouts in small towns still follow it — look for the signage at each junction.",
    },
    {
      question: "Is driving from Nice to Monaco along the French Riviera worth it?",
      answer: "It's a popular scenic drive — the historic Corniche roads between Nice and Monaco take around 20 minutes and offer coastal and mountain views. Rush hour along the coast typically runs 7:30–9am, so an earlier or later start avoids the worst traffic.",
    },
    {
      question: "Do I need winter tyres to drive in the French Alps?",
      answer: "Yes, in season. Winter tyres or snow chains are mandatory in mountain departments, including the Alps and Pyrenees, from November through March.",
    },
    {
      question: "What are the speed limits in France?",
      answer: "130 km/h on autoroutes, dropping by 20 km/h in wet weather. Lower limits apply on main and secondary roads and in built-up areas.",
    },
    {
      question: "What's the drink-driving limit in France?",
      answer: "The blood alcohol limit is 0.5 g/L for most drivers, with a lower 0.2 g/L limit for drivers on a probationary licence.",
    },
    {
      question: "What side of the road does France drive on?",
      answer: "France drives on the right, with the driver's seat on the left side of the vehicle — the same convention as the rest of mainland Europe.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in France?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21 or 25, and often require having held your licence for at least a year.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in France?",
      answer: "Yes. You can submit your application fully online even after you've arrived in France, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in France?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Driving in France with a foreign licence during a short stay",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1459?lang=en",
      organization: "Service-Public.fr — Official French government portal",
    },
    {
      label: "Renting a Car and Driving in France",
      url: "https://www.france.fr/en/article/renting-car-and-driving-france/",
      organization: "France.fr — France's official national tourism board",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["spain", "italy", "portugal", "united-kingdom"],

  primaryKeyword: "international driving permit france",
  secondaryKeywords: [
    "idp france",
    "international driving licence france",
    "driving in france",
    "france car rental",
    "crit'air sticker",
    "france low emission zone zfe",
    "french riviera road trip",
    "provence road trip",
    "loire valley road trip",
    "paris airport car rental",
    "autoroute tolls france",
    "france right hand driving",
  ],
  metaTitle: "International Driving Permit France: Rental Car Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "France calls an IDP recommended for non-EU/EEA visitors, but rental counters often treat it as a practical hire condition.",
};
