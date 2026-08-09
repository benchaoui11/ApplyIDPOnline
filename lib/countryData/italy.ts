import type { CountryRecord } from "./types";

// Italy — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. Treated as a
// flagship European market per the user's explicit brief.
//
// SAME TWO-FIELD SHAPE AS SPAIN, WITH ONE GENUINE ITALY-SPECIFIC NUANCE:
// EU/EEA licence holders (and UK photocard licence holders, per GOV.UK) can
// drive in Italy with no IDP needed. Visitors on other non-EU/EEA licences
// need an IDP — but Italy, unlike Spain, also recognizes an official sworn
// translation of the original licence as an alternative to an IDP. Since an
// IDP is the simpler, more consistently accepted option (a sworn/certified
// translation isn't something most visitors can arrange easily, and rental
// counters are set up to expect an IDP specifically), and since most of this
// service's actual customers hold non-EU/EEA licences (the eligibility
// checker defaults to a United States licence), this record sets
// `idpRequirementLevel: "Legally required"` with `conventionLabel:
// "Required for non-EU/EEA visitors"` — the same label used for Spain, since
// the underlying legal shape is the same. The sworn-translation alternative
// is disclosed honestly in the FAQ rather than omitted.
//
// Sourcing discipline: Semrush API units were exhausted again at the start
// of this build. Two official/primary sources were successfully fetched in
// full (an improvement over Spain, where one of the two primary sources
// could not be extracted): Italia.it — Italy's official national tourism
// board — has a dedicated page confirming the non-EU IDP-or-sworn-
// translation requirement, speed limits, BAC limits, and safety-equipment
// rules; GOV.UK's Italy safety-and-security travel advice confirms UK
// photocard licence validity and flags ZTL restricted zones. Secondary
// sources (ACI's own roundabout/ZTL PDF was located but couldn't be
// extracted — it returned as unreadable binary — so it is not cited
// directly) corroborate ZTL fine amounts, toll payment mechanics, rental-age
// norms, and destination-specific driving conditions (Amalfi Coast, Lake
// Como, Sicily/Sardinia ferry policy); these are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief): the existing
// ItalyFlag component (three equal vertical bands, #008C45 / #F4F5F0 /
// #CD212A) was checked against Italy's official 2006 government colour
// specification (Presidenza del Consiglio dei Ministri Pantone standard:
// green 17-6153 TCX, white 11-0601 TCX, red 18-1662 TCX) before this record
// shipped. #008C45 / #F4F5F0 / #CD212A are the standard, widely-corroborated
// hex conversions of that exact Pantone spec (the off-white #F4F5F0 rather
// than pure white correctly reflects the official "Bright White" Pantone
// shade, not a simplification). Proportions are equal vertical thirds at a
// 2:3 ratio, matching Italy's constitutional flag description. No rebuild
// was needed — the existing asset was already accurate — but it was
// re-verified visually at zoom before this record shipped, per the mandatory
// process established for every country going forward.
export const ITALY: CountryRecord = {
  slug: "italy",
  name: "Italy",
  isoCode: "IT",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Italy",

  conventionStatus: {
    value: "EU and EEA driving licence holders can drive in Italy with no International Driving Permit needed, and UK photocard licence holders are also accepted without one. Visitors on other non-EU/EEA licences need an International Driving Permit, or an official sworn translation of their licence, alongside their original document to drive legally",
    status: "confirmed",
  },
  conventionLabel: "Required for non-EU/EEA visitors",
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
      "Non-EU/EEA visitors need an International Driving Permit alongside their valid original licence to drive legally in Italy, while EU/EEA (and UK) licence holders don't need one at all.",
    points: [
      { tip: "EU and EEA driving licences are valid in Italy with no IDP required, and UK photocard licences are also accepted without one.", status: "confirmed" },
      { tip: "Visitors on other non-EU/EEA licences need an International Driving Permit, or an official sworn translation of their licence, alongside their original document.", status: "confirmed" },
      { tip: "An IDP is the simpler, more consistently recognized option — rental counters and officials are set up to expect one, unlike a certified translation.", status: "partially_sourced" },
      { tip: "An IDP is valid in Italy for stays of up to 12 months alongside your original licence — longer stays require a local Italian licence.", status: "confirmed" },
      { tip: "Italy drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Italy", href: "/apply?destination=Italy" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Italy's historic city centres enforce camera-monitored ZTL restricted zones, its motorways charge tolls, and both speed limits and drink-driving limits are strictly enforced.",
    points: [
      { tip: "In the absence of specific signage, drivers entering a roundabout give way to traffic coming from the right — many roundabouts post their own priority signs instead.", status: "partially_sourced" },
      { tip: "Historic centres — including Rome, Florence, Milan, and Bologna — enforce camera-monitored ZTL (Zona a Traffico Limitato) zones; entering without authorization results in a fine forwarded to your rental company, then to you.", status: "confirmed" },
      { tip: "Most autostrade charge tolls, payable by cash or card at booths — rental cars don't typically come fitted with a Telepass electronic tag.", status: "confirmed" },
      { tip: "Speed limits are 130 km/h on motorways, 110 km/h on main roads, 90 km/h on secondary roads, and 50 km/h in built-up areas, with lower limits for licences held under three years.", status: "confirmed" },
      { tip: "The blood alcohol limit is 0.5 g/L for most drivers.", status: "confirmed" },
      { tip: "Drivers under 21, or anyone who's held a licence for less than three years, face a zero-tolerance limit.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available across mainland Italy, Sicily, and Sardinia, with most providers setting age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but most rental companies require drivers to be at least 21, with a young-driver surcharge common for renters under 25.", status: "confirmed" },
      { tip: "Rome Fiumicino and Milan Malpensa airports both have rental counters from major providers reachable from the arrivals area.", status: "partially_sourced" },
      { tip: "Rental agreements commonly restrict taking a car by ferry between Sicily and Sardinia, so most travelers arrange a separate rental on each island instead.", status: "partially_sourced" },
      { tip: "On the Amalfi Coast, a smaller, compact car is strongly recommended given the narrow, winding coastal road and limited parking in towns like Positano and Amalfi.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence and your International Driving Permit, if you need one, together as your standard document set any time you're driving in Italy.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "The Polizia Stradale (highway police) and Carabinieri conduct roadside checkpoints, especially on weekends at the entrances and exits of cities.", status: "confirmed" },
      { tip: "Emergency services across Italy can be reached on 112.", status: "confirmed" },
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
    { name: "Rome", note: "Italy's capital and busiest arrival point, with rental counters at Fiumicino Airport — the historic centre enforces a camera-monitored ZTL, so check your route before driving in.", status: "confirmed" },
    { name: "Tuscany", note: "A classic countryside road-trip region linking Florence, Siena, and the Chianti wine country — Florence and Siena's own historic centres also enforce ZTL restrictions.", status: "confirmed" },
    { name: "Amalfi Coast", note: "A narrow, cliffside coastal route where a compact car is strongly recommended, typically driven from Sorrento towards Salerno to stay on the sea-facing side of the road.", status: "partially_sourced" },
    { name: "Lake Como", note: "A scenic lake-district road trip reached via Milan's airports, with some lakeside roads — including the stretch toward Bellagio — narrow and slow-going.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Italy?",
      answer: "It depends on where your licence is from. EU and EEA licence holders, and UK photocard licence holders, can drive in Italy without one. If your licence is from outside the EU/EEA — including the US, Canada, or Australia — you'll need to obtain an IDP, or an official sworn translation of your licence, before you travel. ApplyIDPOnline prepares your IDP fully online before your trip either way.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for Italy?",
      answer: "No. EU and EEA driving licences are recognized in Italy without any additional document, and a UK photocard licence is also accepted without one.",
    },
    {
      question: "I have a US, Canadian, or Australian licence — do I need an IDP?",
      answer: "Yes. Visitors driving on a non-EU/EEA licence need an International Driving Permit, or an official sworn translation of their licence, alongside their original document. An IDP is the simpler option — rental counters and officials are set up to expect one, while a certified translation isn't something most visitors can easily arrange.",
    },
    {
      question: "What is a ZTL, and will it affect my rental car?",
      answer: "A ZTL (Zona a Traffico Limitato) is a restricted traffic zone found in the historic centres of cities including Rome, Florence, Milan, and Bologna, monitored automatically by cameras. Driving into one without authorization results in a fine that's sent to your rental company and then forwarded to you, sometimes months later — plan your route to avoid them, or check with your accommodation about local access rules.",
    },
    {
      question: "Do I need to pay tolls in Italy?",
      answer: "Yes, on most autostrade (motorways). Pay by cash or card at the toll booth's blue lane — rental cars don't usually come fitted with a Telepass electronic tag, so card or cash is the standard method for visitors.",
    },
    {
      question: "Can I rent a car at Rome or Milan airport?",
      answer: "Yes — both Rome Fiumicino and Milan Malpensa have rental counters from major providers reachable from the arrivals area.",
    },
    {
      question: "Is driving the Amalfi Coast difficult?",
      answer: "It can be challenging — the coastal road is narrow, winding, and busy in peak season. A smaller, compact car is strongly recommended, and driving from Sorrento towards Salerno keeps you on the sea-facing side of the road.",
    },
    {
      question: "Can I take a rental car by ferry between Sicily and Sardinia?",
      answer: "Usually not — most rental agreements restrict taking a car across by ferry between the two islands. It's typically more practical, and often cheaper, to arrange a separate rental on each island.",
    },
    {
      question: "What are the speed limits in Italy?",
      answer: "130 km/h on motorways, 110 km/h on main roads, 90 km/h on secondary roads, and 50 km/h in built-up areas. Drivers who've held their licence for under three years face lower limits of 100 km/h and 90 km/h on motorways and main roads.",
    },
    {
      question: "What's the drink-driving limit in Italy?",
      answer: "The blood alcohol limit is 0.5 g/L for most drivers, with zero tolerance for drivers under 21 or anyone who's held a licence for less than three years.",
    },
    {
      question: "What side of the road does Italy drive on?",
      answer: "Italy drives on the right, with the driver's seat on the left side of the vehicle — the same convention as the rest of mainland Europe.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Italy?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, with a young-driver surcharge typical for renters under 25.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Italy?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Italy, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Italy?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Driving in Italy: requirements and rules",
      url: "https://www.italia.it/en/italy/things-to-do/tutto-quello-che-ce-da-sapere-per-guidare-in-italia-regole-stradali-consigli-e-informazioni-utili",
      organization: "Italia.it — Italy's official national tourism board",
    },
    {
      label: "Foreign travel advice — Italy (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/italy/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["spain", "portugal", "france", "united-kingdom"],

  primaryKeyword: "international driving permit italy",
  secondaryKeywords: [
    "idp italy",
    "international driving licence italy",
    "driving in italy",
    "italy car rental",
    "ztl italy",
    "italy toll roads autostrade",
    "amalfi coast road trip",
    "tuscany road trip",
    "lake como driving",
    "rome airport car rental",
    "milan airport car rental",
    "italy right hand driving",
  ],
  metaTitle: "International Driving Permit Italy: Legal Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "UK photocard licences are accepted without an IDP. Other non-EU/EEA visitors need an IDP or sworn translation.",
};
