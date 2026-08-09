import type { CountryRecord } from "./types";

// Saudi Arabia — Tier 1 flagship record, built on Master Country Template
// v1.0. No template/component changes made for this record, only data.
// Already present in lib/destinations.ts from an earlier pass.
//
// LEGAL SHAPE: matches the Netherlands/Germany/Belgium/Sweden/Switzerland
// language-based "Commonly requested" pattern. Foreign visitors can drive
// on a valid original licence for a period set by Article 42 of Saudi
// Arabia's Traffic Law — generally up to one year or until the licence
// expires, whichever comes first. An IDP isn't universally mandated, but
// becomes a genuine requirement if the licence isn't in English or
// Arabic, or uses a non-Latin script — and most rental companies expect
// an IDP at the counter regardless of language, since it provides a
// standard Arabic/English translation. `idpRequirementLevel: "Commonly
// requested"` / `conventionLabel: "Required for non-English licences"`.
// Every FAQ/directAnswer touching the requirement leads with the
// practical rental-counter outcome before the legal nuance, per the
// standing project rule saved from France.
//
// ALCOHOL LAW, stated precisely rather than framed as a numeric BAC
// limit like every other country in this project: Saudi Arabia bans the
// possession, consumption, sale, and import of alcohol outright for
// everyone, including visitors — there is no legal blood-alcohol
// threshold because any detectable amount is already an offence. This
// record deliberately does not present a "0.0%" figure as if it were a
// comparable driving-specific BAC limit, since that would understate the
// actual legal position (a nationwide prohibition, not a traffic rule).
//
// DOCUMENTATION RULE worth flagging clearly: digital copies or
// photographs of a driving licence are not accepted at rental counters
// or police checkpoints in Saudi Arabia — only original physical
// documents. This is stated explicitly since it's a genuine practical
// trap for travellers used to phone-based digital documents elsewhere.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Saudi Arabia safety-and-security travel
// advice was fetched directly and is the primary citation for UK licence
// validity, road-safety conditions, and the Absher/automated-fine system.
// Secondary sources corroborate Article 42 of the Traffic Law, the Saher
// camera-enforcement system, King Fahd Causeway cross-border driving
// mechanics, and destination-specific driving conditions; these are
// marked partially_sourced where a single strong primary citation wasn't
// available.
//
// FLAG VERIFICATION (mandatory per the user's brief, and the most
// consequential fix in this build): the existing SaudiArabiaFlag
// component was audited before this record was written and found to be
// an explicitly self-documented placeholder — a plain green field with a
// white bar standing in for both the Shahada and the sword, with
// "calligraphy cannot be faithfully reproduced at icon scale" stated
// directly in its own code comment. Given the religious significance of
// the Shahada ("There is no god but God; Muhammad is the Messenger of
// God"), hand-approximating this text was never attempted. Using the
// same technique established for Spain, Brazil, and Mexico, the official
// reference SVG (Wikimedia Commons' File:Flag_of_Saudi_Arabia.svg) was
// downloaded directly via curl and its calligraphy-and-sword group
// re-serialized with Python's xml.etree.ElementTree, then embedded
// verbatim via dangerouslySetInnerHTML — every stroke reproduced exactly
// as in the source, not redrawn. Green is #005430, the value published by
// Saudi Arabia's own flag specification (saudiflag.sa), more precise than
// the #006C35 approximation the placeholder previously used. Verified
// visually at zoom before this record shipped.
export const SAUDI_ARABIA: CountryRecord = {
  slug: "saudi-arabia",
  name: "Saudi Arabia",
  isoCode: "SA",
  region: "Middle East",
  tier: 1,

  h1: "International Driving License Saudi Arabia",

  conventionStatus: {
    value: "Foreign visitors can drive in Saudi Arabia on a valid original licence for a period set by Article 42 of the Traffic Law — generally up to one year or until the licence expires. An International Driving Permit isn't universally mandated, but if your licence isn't in English or Arabic, or uses a non-Latin script, an IDP or notarized Arabic translation is required — and most rental companies expect an IDP regardless of language",
    status: "confirmed",
  },
  conventionLabel: "Required for non-English licences",
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
      "Most rental companies in Saudi Arabia expect an International Driving Permit alongside your original licence, so carrying one helps avoid delays even where the legal requirement depends on your licence's language.",
    points: [
      { tip: "Foreign visitors can drive in Saudi Arabia on a valid original licence for up to a year, under Article 42 of the Traffic Law.", status: "confirmed" },
      { tip: "An IDP becomes a genuine requirement if your licence isn't already in English or Arabic, or uses a non-Latin script.", status: "confirmed" },
      { tip: "Most rental companies expect an IDP regardless of your licence's language, since it provides a standard Arabic and English translation.", status: "confirmed" },
      { tip: "Only original physical documents are accepted — digital copies or photographs of your licence aren't accepted at rental counters or police checkpoints.", status: "confirmed" },
      { tip: "Saudi Arabia drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Saudi Arabia", href: "/apply?destination=Saudi%20Arabia" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Saudi Arabia enforces traffic rules through an extensive automated camera network, bans alcohol outright rather than setting a driving-specific limit, and desert routes call for extra planning.",
    points: [
      { tip: "The Saher system uses AI-powered cameras nationwide to detect speeding, red-light violations, seatbelt and phone-use infractions, and lane violations.", status: "confirmed" },
      { tip: "Traffic fines are issued automatically and appear on the Absher platform, linked to your entry details — unpaid fines can prevent you from leaving the country.", status: "confirmed" },
      { tip: "Alcohol is banned outright in Saudi Arabia — its possession, consumption, sale, and import are illegal for everyone, including visitors, so there is no separate driving-specific limit to stay under.", status: "confirmed" },
      { tip: "Police checkpoints are common on highways between cities and near sensitive areas.", status: "confirmed" },
      { tip: "Seatbelts are mandatory, and official guidance recommends sticking to major roads and travelling in daylight when possible in desert areas.", status: "confirmed" },
      { tip: "Fuel stations become sparser on remote stretches, such as between Ha'il and AlUla, so filling up in advance is worth planning for.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Riyadh and Jeddah's international airports and across major Saudi cities, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but most rental companies set their minimum at 25, higher than the 21 common in many other countries.", status: "confirmed" },
      { tip: "King Khalid International Airport (Riyadh) and King Abdulaziz International Airport (Jeddah) both have rental counters from major providers.", status: "confirmed" },
      { tip: "AlUla has its own airport with rental desks, useful for road trips without starting from Riyadh or Jeddah.", status: "confirmed" },
      { tip: "Only original physical documents are accepted at pickup — bring your original licence, IDP if applicable, and passport rather than relying on digital copies.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Saudi Arabia.",
    points: [
      { tip: "Your original licence, and your IDP if you're carrying one, should be kept together and accessible at all times — only physical originals are accepted.", status: "confirmed" },
      { tip: "Police checkpoints are common on highways between cities, and traffic violations are also enforced automatically through the Saher camera network.", status: "confirmed" },
      { tip: "Emergency services can be reached on 911 in Riyadh, Makkah, Madinah, and the Eastern Province, or on 999 (police), 997 (ambulance), and 998 (civil defence) elsewhere.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving from Saudi Arabia into Bahrain via the King Fahd Causeway is common, but it requires advance authorization from your rental company and cross-border insurance.",
    points: [
      { tip: "The King Fahd Causeway is a 25km series of bridges connecting Saudi Arabia to Bahrain, with a one-stop border crossing for passport, vehicle, and customs checks.", status: "confirmed" },
      { tip: "Taking a rental car across the causeway requires a letter of authorization from your rental company and cross-border insurance coverage, checked at the crossing.", status: "confirmed" },
      { tip: "The causeway toll is SAR 35 (or the equivalent in Bahraini dinar from the Bahrain side).", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Saudi Arabia — Bahrain, the UAE, and Jordan each have their own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Saudi Arabia — causeway tolls and cross-border rental authorization are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Riyadh", note: "Saudi Arabia's capital and main business gateway, with rental counters at King Khalid International Airport — the starting point for the scenic Riyadh–AlUla route north.", status: "confirmed" },
    { name: "Jeddah", note: "The kingdom's main Red Sea gateway, with rental counters at King Abdulaziz International Airport and routes north toward Yanbu and AlUla.", status: "confirmed" },
    { name: "AlUla", note: "A flagship heritage and desert tourism destination with its own airport and rental counters, reached by a multi-day road trip from either Riyadh or Jeddah.", status: "confirmed" },
    { name: "Dammam & Khobar", note: "The Eastern Province's business and expat hub, with strong car rental demand and the King Fahd Causeway to Bahrain nearby.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "911 (Riyadh, Makkah, Madinah, Eastern Province) or 999 police / 997 ambulance / 998 fire elsewhere", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Saudi Arabia?",
      answer: "Most rental companies expect an IDP alongside your original licence, so carrying one helps avoid delays at the counter. Legally, foreign visitors can drive on a valid original licence for up to a year under Article 42 of the Traffic Law — an IDP becomes a genuine requirement mainly if your licence isn't already in English or Arabic, or uses a non-Latin script. ApplyIDPOnline prepares yours fully online before your trip either way.",
    },
    {
      question: "I have a US, UK, EU, Canadian, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, since an English-language licence already satisfies the core language requirement — but most rental companies expect an IDP regardless, so it's worth having one ready rather than finding out at the counter.",
    },
    {
      question: "Can I use a digital copy of my driving licence in Saudi Arabia?",
      answer: "No. Only original physical documents are accepted at rental counters and police checkpoints — digital copies or photographs of your licence, or your IDP, aren't accepted, so bring the originals with you.",
    },
    {
      question: "What is the Saher system?",
      answer: "Saher is Saudi Arabia's nationwide network of AI-powered traffic cameras, detecting speeding, red-light violations, seatbelt and phone-use infractions, and lane violations. Fines are issued automatically and appear on the Absher platform.",
    },
    {
      question: "What's the drink-driving limit in Saudi Arabia?",
      answer: "There isn't a numeric limit — alcohol is banned outright for everyone in Saudi Arabia, including visitors, so any presence of it is an offence regardless of the amount.",
    },
    {
      question: "Can I rent a car at Riyadh or Jeddah airport?",
      answer: "Yes — King Khalid International Airport (Riyadh) and King Abdulaziz International Airport (Jeddah) both have rental counters from major providers.",
    },
    {
      question: "Is AlUla accessible by rental car?",
      answer: "Yes — AlUla has its own airport with rental desks, and it's also reachable by a multi-day road trip from Riyadh (around 1,100km) or Jeddah (around 700km).",
    },
    {
      question: "Can I drive a rental car from Saudi Arabia into Bahrain?",
      answer: "Often, yes, via the King Fahd Causeway — but you'll need advance authorization from your rental company and cross-border insurance, both checked at the one-stop border crossing. The causeway toll is SAR 35.",
    },
    {
      question: "What side of the road does Saudi Arabia drive on?",
      answer: "Saudi Arabia drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Saudi Arabia?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum of 25, above the 21 common in many other countries.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Saudi Arabia?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Saudi Arabia, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Saudi Arabia?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one, and Saudi rental counters and checkpoints are generally described as expecting original physical documents. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Saudi Arabia (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Saher System",
      url: "https://en.wikipedia.org/wiki/Saher_System",
      organization: "Wikipedia, citing the General Directorate of Traffic (Ministry of Interior)",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["united-arab-emirates", "qatar", "jordan", "united-kingdom"],

  primaryKeyword: "international driving permit saudi arabia",
  secondaryKeywords: [
    "idp saudi arabia",
    "international driving license saudi arabia",
    "driving in saudi arabia",
    "car rental saudi arabia",
    "riyadh airport car rental",
    "jeddah airport car rental",
    "alula road trip",
    "saher system fines",
    "absher traffic fines",
    "king fahd causeway driving",
    "saudi arabia speed limits",
    "saudi arabia right hand driving",
  ],
  metaTitle: "International Driving License Saudi Arabia: Validity Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "Article 42 sets foreign licence validity up to a year, with an IDP or Arabic translation when the licence is not English or Arabic.",
};
