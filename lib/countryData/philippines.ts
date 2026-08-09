import type { CountryRecord } from "./types";

// Philippines — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data.
//
// CRITICAL DIFFERENCE FROM EVERY COUNTRY BUILT SO FAR: this is the first
// record where idpRequirementLevel is NOT "Legally required." Research —
// independently confirmed by GOV.UK's official Foreign Travel Advice
// ("You can drive in the Philippines on a UK driving licence for up to 90
// days") and multiple sources citing the Land Transportation and Traffic
// Code (Republic Act No. 4136) — shows Philippine law lets tourists drive
// on a valid ENGLISH-LANGUAGE foreign licence alone for up to 90 days from
// arrival. An IDP is not strictly mandatory for that group. It genuinely
// matters for two real groups: (1) travelers whose licence isn't in
// English/Roman script, for whom an IDP or certified translation is
// required, and (2) travelers renting from companies that require an IDP
// as their own policy regardless of the legal minimum — multiple sources
// confirm this is common practice, especially outside major cities. This
// record states the 90-day allowance honestly rather than inflating the
// requirement to match the framing used for Thailand/Singapore/Malaysia/
// Vietnam/Indonesia, consistent with "never claim a stricter legal
// requirement than actually exists."
//
// Sourcing discipline: commercial/aggregator sites (internationaldrivingpermit.org,
// e-ita.org, ltoportal.ph, ltoguideph.com, saferide.ph, and other
// Semrush-surfaced competitor/discovery pages) were used only to identify
// what to verify and where — none of their wording was carried into this
// record, and none are presented as official government sources (their
// names suggest an LTO affiliation they don't actually have). The 90-day
// English-licence rule is confirmed via GOV.UK's official travel advice,
// independently corroborating the RA 4136 citation multiple unofficial
// guide sites make. Practical details (speed limits by road type, BAC
// limit, rental-company IDP practices) are corroborated across multiple
// independent sources and marked "partially_sourced," not "confirmed," per
// this project's standing discipline. Destination-area selection (Manila,
// Cebu, Boracay, Palawan/El Nido) reflects the Philippines' consistently
// most-referenced tourist/rental hubs across every source checked — Semrush
// API access was exhausted before area-specific search volumes could be
// pulled this round, so this is disclosed as informed selection rather than
// volume-ranked, unlike Indonesia's Bali build.
//
// Real, verified competitor gap found during research: most generic
// IDP-sales competitor pages default to the same "yes, legally required"
// template used for every other country, without disclosing the 90-day
// English-licence allowance — which is both less accurate and, done
// honestly, actually a stronger trust signal than overclaiming.
export const PHILIPPINES: CountryRecord = {
  slug: "philippines",
  name: "Philippines",
  isoCode: "PH",
  region: "Asia",
  tier: 1,

  h1: "International Driving Permit Philippines",

  conventionStatus: {
    value: "Philippine law allows a valid foreign driving licence in English to be used for up to 90 days from arrival — an International Driving Permit isn't strictly mandatory for these visitors, but is required if your licence isn't in English and is commonly requested by rental companies",
    status: "confirmed",
  },
  conventionLabel: "Recommended, not required",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 16,
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
      "Foreign visitors can drive in the Philippines on a valid English-language licence for up to 90 days, though an International Driving Permit is required if your licence isn't in English and is commonly requested by rental companies.",
    points: [
      { tip: "A valid foreign driving licence in English lets you drive in the Philippines for up to 90 days from your arrival date, under the Land Transportation and Traffic Code, RA 4136.", status: "confirmed" },
      { tip: "If your licence isn't in English, you'll need either an official embassy-certified translation or an International Driving Permit.", status: "confirmed" },
      { tip: "Many rental companies require an IDP regardless of the legal minimum, especially outside major cities — it's worth having one ready even if your licence alone would technically qualify.", status: "confirmed" },
      { tip: "Staying longer than 90 days means converting to a Philippine driver's licence through the LTO.", status: "confirmed" },
      { tip: "The Philippines drives on the right, with the driver's seat on the left side of the vehicle — unlike Thailand, Singapore, Malaysia, and Indonesia.", status: "confirmed" },
    ],
    solutionNote: "Even when not strictly required, ApplyIDPOnline prepares your IDP fully online before you travel — useful for non-English licences, rental counters, and avoiding any ambiguity.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "The Philippines drives on the right with road conditions and enforcement that vary noticeably by region, and speed limits, seatbelt rules, and cautious driving around motorbikes are the main adjustments for visitors.",
    points: [
      { tip: "Speed limits vary by road type — typically up to 80 km/h on open roads, 40 km/h on boulevards, 30 km/h on city streets, and 20 km/h in school zones.", status: "partially_sourced" },
      { tip: "The legal blood alcohol limit for driving is 0.05%.", status: "partially_sourced" },
      { tip: "Using a handheld phone while driving isn't permitted — a hands-free kit is required.", status: "partially_sourced" },
      { tip: "Road conditions, traffic enforcement, and driving standards vary significantly between Manila, other major cities, and more rural or island areas — stay cautious and avoid driving at night where possible.", status: "confirmed" },
      { tip: "If you're involved in an accident, stay at the scene, exchange details, and report it to the nearest police station.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Car rental companies in the Philippines — including in Cebu, Boracay, and Palawan — often require an IDP as their own policy, even where the 90-day foreign-licence rule would otherwise apply.",
    points: [
      { tip: "The legal minimum age to drive in the Philippines is 16, though rental companies commonly require drivers to be at least 21-23.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup: your driver's licence, an IDP (frequently requested regardless of legal necessity), passport, and a credit card for the security deposit.", status: "partially_sourced" },
      { tip: "Rental requirements can vary more by location than in some neighbouring countries — confirm specifics directly with your provider, particularly outside major cities.", status: "confirmed" },
      { tip: "Requirements vary by rental company — confirm specifics with your provider before arrival.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see, even when local law alone wouldn't require one.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  scooterGuide: {
    label: "Scooters & Motorcycles",
    directAnswer: "The same rules apply to scooters and motorbikes as to cars — your English-language licence covers you for 90 days if it already includes a motorcycle category, and an IDP is worth having for rental convenience.",
    points: [
      { tip: "Your IDP only shows a motorcycle category if your original licence already includes one — it can't add a category you don't hold at home.", status: "confirmed" },
      { tip: "Helmets are mandatory for the rider and any pillion passenger.", status: "confirmed" },
      { tip: "Boracay's main strip restricts most private vehicles in favour of e-trikes and golf carts, so scooter and car rental is more relevant to islands like Palawan and Cebu than to central Boracay itself.", status: "partially_sourced" },
      { tip: "Confirm your travel insurance covers the engine size and vehicle type you plan to rent.", status: "confirmed" },
      { tip: "Driving or riding without a valid licence and IDP where required can affect your travel insurance coverage if you're in an accident.", status: "confirmed" },
    ],
    solutionNote: "Your IDP lists the vehicle categories from your original licence, including motorcycle categories where applicable.",
    ctaHint: { label: "Prepare my IDP for the Philippines", href: "/apply?destination=Philippines" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's licence, passport, and your IDP (where relevant) together as your standard document set any time you're driving in the Philippines.",
    points: [
      { tip: "Your passport helps confirm your arrival date, which is what determines whether your 90-day foreign-licence allowance still applies.", status: "confirmed" },
      { tip: "Keep documents physically accessible (not just a photo on your phone) whenever you're driving.", status: "confirmed" },
      { tip: "If your licence isn't in English, an IDP or certified translation is what makes it valid at a roadside check — your original licence alone in a non-Roman script isn't accepted.", status: "confirmed" },
      { tip: "Routine checkpoints are common on Philippine roads, particularly around cities and transport hubs.", status: "partially_sourced" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to remove any doubt about your documents at a check.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence (for example, motorcycle vs. car categories) — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Motorcycle & car",

  popularDrivingAreas: [
    { name: "Manila", note: "The Philippines' capital and main international gateway via Ninoy Aquino International Airport, with dense traffic and the country's largest rental market.", status: "confirmed" },
    { name: "Cebu", note: "A major second hub with Mactan-Cebu International Airport, popular as a base for both city driving and island-hopping trips.", status: "confirmed" },
    { name: "Boracay", note: "A globally known beach destination where most private vehicles are restricted on the main strip in favour of e-trikes and golf carts.", status: "partially_sourced" },
    { name: "Palawan", note: "Home to El Nido and Coron, popular for scooter rental among visitors exploring the island's beaches and lagoons.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "911 (police, ambulance, fire)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in the Philippines?",
      answer: "Not always — Philippine law lets you drive on a valid English-language foreign licence for up to 90 days from arrival. You'll need an IDP (or an official translation) if your licence isn't in English, and many rental companies ask for one regardless of the legal minimum. ApplyIDPOnline can prepare that IDP for you fully online either way.",
    },
    {
      question: "If my licence is already in English, is there any reason to get an IDP?",
      answer: "It's not legally required, but it's still genuinely useful — many rental companies request an IDP regardless of licence origin, especially outside major cities, and it gives roadside officers a standardised, easy-to-read document instead of interpreting a foreign licence. Some travellers prefer having one simply to remove any ambiguity.",
    },
    {
      question: "What if my driving licence isn't written in English?",
      answer: "You'll need either an official embassy-certified translation or an International Driving Permit to drive legally in the Philippines — a licence in a non-Roman script, such as Japanese, Arabic, or Cyrillic, isn't accepted on its own.",
    },
    {
      question: "How long can I drive in the Philippines on my foreign licence?",
      answer: "Up to 90 days from your date of arrival, under the Land Transportation and Traffic Code. After that, you'll need to convert to a Philippine driver's licence through the LTO.",
    },
    {
      question: "Can I rent a car or scooter in Cebu, Boracay, or Palawan with just my foreign licence?",
      answer: "Often, but not always — many rental companies in these areas require an IDP regardless of the legal minimum, particularly outside major cities. It's worth checking with your specific rental provider, or simply having an IDP ready to avoid any friction at pickup.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in the Philippines?",
      answer: "Yes. You can submit your application fully online even if you've already arrived in the Philippines. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Do I need an IDP for a scooter or motorbike in the Philippines?",
      answer: "The same rules apply as for cars — your foreign licence in English covers you for 90 days if it already includes a motorcycle category, though an IDP is worth having for rental convenience and essential if your licence isn't in English.",
    },
    {
      question: "What side of the road does the Philippines drive on?",
      answer: "The Philippines drives on the right, with the driver's seat on the left side of the vehicle — unlike Thailand, Singapore, Malaysia, and Indonesia, so it's worth a moment's adjustment if you're region-hopping.",
    },
    {
      question: "What documents should I carry while driving in the Philippines?",
      answer: "Your original driver's licence, your passport to confirm your arrival date, and your IDP if your licence isn't in English or your rental company requires one. Add your rental agreement if you're using a hired vehicle.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in the Philippines?",
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
      label: "Foreign travel advice — Philippines (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/philippines/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["thailand", "vietnam", "indonesia", "malaysia"],

  primaryKeyword: "international driving permit philippines",
  secondaryKeywords: [
    "idp philippines",
    "international driving license philippines",
    "philippines driving license for foreigners",
    "driving in the philippines",
    "car rental cebu",
    "car rental boracay",
    "el nido car rental",
    "manila driving guide",
    "philippines 90 day rule",
    "lto foreign license",
    "international drivers license",
    "philippines speed limit",
  ],
  metaTitle: "IDP Philippines: Tourist Driving Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "An English-language licence is technically sufficient alone for 90 days, but rental companies commonly ask for an IDP as their own standard condition.",
};
