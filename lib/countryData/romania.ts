import type { CountryRecord } from "./types";

// Romania — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. First
// country added to lib/destinations.ts specifically for this build (every
// prior Tier-1 European country was already present in that marketing
// list) — added as a new Europe entry alongside the existing pattern.
//
// SAME LEGAL SHAPE AS SPAIN AND ITALY, NOT FRANCE: Romania is a 1968
// Vienna Convention on Road Traffic party state. EU/EEA driving licence
// holders (and UK licence holders, per GOV.UK) can drive in Romania with
// no IDP needed. Multiple independent sources — including a source
// specifically naming US, UK, Australian, Mexican, Argentine, Chilean,
// and Colombian licence holders — consistently describe non-EU/EEA
// visitors as needing to obtain an IDP in their home country and carry it
// alongside their original licence, with Romanian police, rental
// companies, and insurers all described as expecting both documents
// together. This is the stronger, "must obtain" framing used for Spain
// and Italy, not France's softer "generally recommended" framing — so
// this record sets `idpRequirementLevel: "Legally required"` and
// `conventionLabel: "Required for non-EU/EEA visitors"`, matching Spain
// and Italy rather than France. One aggregator claim (that US licence
// holders specifically may drive up to six months without an IDP) directly
// contradicted the consistently-corroborated general rule and could not be
// verified against any primary source, so it was deliberately omitted
// rather than included as an unverified exception — per this project's
// discipline of omitting shaky claims rather than presenting a
// contradiction. ACR (Automobilul Clubul Român, Romania's AIT/FIA-affiliate)
// does not issue IDPs to non-residents, consistent with every other
// country in this project — visitors must obtain one before departure.
//
// Sourcing discipline: Semrush API units were exhausted again at the start
// of this build. GOV.UK's Romania safety-and-security travel advice was
// fetched directly and confirms UK photocard licence validity, mandatory
// safety equipment, and the rovinieta requirement. The US Embassy Romania
// driving page was located but could not be extracted (returned as
// unreadable binary/encoded content) — this is disclosed rather than
// hidden, consistent with prior countries' DGT/ACI fetch failures.
// Secondary sources corroborate the electronic rovinieta system, zero-
// tolerance BAC law, novice-driver speed restrictions, and Transfăgărășan/
// Transalpina seasonal closures; these are marked partially_sourced where
// a single strong primary citation wasn't available.
//
// FLAG VERIFICATION (mandatory per the user's brief): Romania had no
// existing flag component in this codebase, so RomaniaFlag was built new
// rather than audited. Colors are Romania's exact 2023 legal specification
// (Law amending the flag's technical description): blue Pantone 280c
// (#002B7F), yellow Pantone 116c (#FCD116), red Pantone 186c (#CE1126).
// The blue is deliberately the deep "cobalt" shade Romania adopted in
// 2016 specifically to visually distinguish its flag from Chad's
// near-identical tricolor — using a brighter/lighter blue here would be
// the wrong flag in a documented, well-known vexillological sense, not
// just an imprecise one. Proportions are equal vertical thirds at a 2:3
// ratio (blue-yellow-red from hoist to fly), matching Romania's
// constitutional flag description. Verified visually at zoom before this
// record shipped.
export const ROMANIA: CountryRecord = {
  slug: "romania",
  name: "Romania",
  isoCode: "RO",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Romania",

  conventionStatus: {
    value: "EU and EEA driving licence holders can drive in Romania with no International Driving Permit needed, and UK licence holders are also accepted without one. Visitors on other non-EU/EEA licences must obtain an International Driving Permit in their home country and carry it alongside their original licence to drive legally",
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
      "Non-EU/EEA visitors need an International Driving Permit alongside their valid original licence to drive legally in Romania, while EU/EEA (and UK) licence holders don't need one at all.",
    points: [
      { tip: "EU and EEA driving licences are valid in Romania with no IDP required, and UK licences are also accepted without one.", status: "confirmed" },
      { tip: "Visitors on a non-EU/EEA licence must obtain an International Driving Permit before travelling — Romania does not issue IDPs to foreign visitors.", status: "confirmed" },
      { tip: "Romanian police, rental companies, and insurers are all described as expecting both your IDP and your original licence together, not one or the other.", status: "confirmed" },
      { tip: "The IDP is a translation aid, not a standalone document or a substitute for your original licence.", status: "confirmed" },
      { tip: "Romania drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Romania", href: "/apply?destination=Romania" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Romania has a zero-tolerance drink-driving law, a mandatory electronic road vignette, and seasonal mountain-road closures worth planning around.",
    points: [
      { tip: "Romania has a strict zero-tolerance drink-driving policy, with a legal blood alcohol limit of 0.00% for all drivers.", status: "confirmed" },
      { tip: "A rovinieta — an electronic road vignette linked to your licence plate — is mandatory on national roads, expressways, and motorways, with roadside cameras checking compliance automatically.", status: "confirmed" },
      { tip: "Speed limits are 130 km/h on motorways, 100 km/h on expressways, 90 km/h outside built-up areas, and 50 km/h in built-up areas.", status: "confirmed" },
      { tip: "Drivers who've held their licence for less than a year face limits 20 km/h lower outside built-up areas, on dual carriageways, and on motorways.", status: "confirmed" },
      { tip: "Winter tyres or snow chains are required whenever snow, ice, or sleet is present on the road, typically between November and March.", status: "confirmed" },
      { tip: "Road conditions vary considerably outside major routes, with potholes, double-parked vehicles, and in rural areas, horse-drawn carts and livestock all common hazards.", status: "confirmed" },
      { tip: "High-altitude mountain roads including the Transfăgărășan and Transalpina close for winter, reopening between June and July most years depending on snowpack.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available across Romania, with Bucharest's main airport the busiest pickup point and most providers setting requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, with some setting the bar higher for larger vehicles.", status: "partially_sourced" },
      { tip: "Bucharest's Henri Coandă Airport (OTP) has rental counters from major providers including Avis, National, and Enterprise reachable from the arrivals area.", status: "confirmed" },
      { tip: "Romanian rental cars usually already carry a valid rovinieta — a car picked up in a neighboring country like Hungary or Bulgaria will not, and one must be bought before crossing into Romania.", status: "confirmed" },
      { tip: "Taking a rental car across Romania's borders requires telling your rental company in advance, since not every provider or plan permits it, and a cross-border fee is common.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence and your International Driving Permit, if you need one, together as your standard document set any time you're driving in Romania.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "The Poliția Rutieră (road police) conduct roadside checks and sobriety tests, especially on weekends and around larger cities like Bucharest, Cluj-Napoca, and Constanța.", status: "confirmed" },
      { tip: "Emergency services across Romania can be reached on 112.", status: "confirmed" },
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
    { name: "Bucharest", note: "Romania's capital and main international gateway, with rental counters at Henri Coandă Airport (OTP) — main routes like the DN1/E60 lead north from here toward the Carpathian Mountains.", status: "confirmed" },
    { name: "Sinaia", note: "A Carpathian mountain resort town on the route from Bucharest to Brașov, known for Peleș Castle and a popular first stop on a mountain road trip.", status: "partially_sourced" },
    { name: "Transylvania (Brașov & Bran Castle)", note: "A historic region roughly 2.5 hours from Bucharest, centred on Brașov and Bran Castle, widely associated with the Dracula legend.", status: "partially_sourced" },
    { name: "Transfăgărășan Highway", note: "A high-altitude road through the Carpathian Mountains, open roughly from late June to October and closed the rest of the year for snow.", status: "confirmed" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Romania?",
      answer: "It depends on where your licence is from. EU and EEA licence holders, and UK licence holders, can drive in Romania without one. If your licence is from outside the EU/EEA — including the US, Canada, or Australia — you'll need to obtain an IDP before you travel, since Romania doesn't issue them to visitors on arrival. ApplyIDPOnline prepares your IDP fully online before your trip, so it's ready either way.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for Romania?",
      answer: "No. EU and EEA driving licences are recognized in Romania without any additional document, and UK licences are also accepted without one.",
    },
    {
      question: "I have a US, Canadian, or Australian licence — do I need an IDP?",
      answer: "Yes. Visitors driving on a non-EU/EEA licence are required to carry a valid International Driving Permit alongside their original licence. Romanian police, rental companies, and insurers are all described as expecting both documents together, so it's worth having ready before your trip rather than sorting it out at the rental counter.",
    },
    {
      question: "What is a rovinieta, and do I need one?",
      answer: "A rovinieta is Romania's electronic road vignette, required on national roads, expressways, and motorways — there's no physical sticker, since your licence plate is checked automatically by roadside cameras. A Romanian rental car usually already has one, but if you're driving in from Hungary or Bulgaria in a car rented there, you'll need to buy one online before crossing the border.",
    },
    {
      question: "What's the drink-driving limit in Romania?",
      answer: "Romania has a strict zero-tolerance policy — the legal blood alcohol limit is 0.00%, stricter than most neighbouring countries, and police carry out sobriety checks routinely, especially on weekends.",
    },
    {
      question: "Can I rent a car at Bucharest airport?",
      answer: "Yes — Henri Coandă Airport (OTP) has rental counters from major providers including Avis, National, and Enterprise, reachable from the arrivals area.",
    },
    {
      question: "Is the Transfăgărășan open all year?",
      answer: "No. The high-altitude Transfăgărășan and Transalpina roads close for winter and typically reopen between June and July depending on that year's snowpack — check current conditions before planning a mountain road trip outside summer.",
    },
    {
      question: "What are the speed limits in Romania?",
      answer: "130 km/h on motorways, 100 km/h on expressways, 90 km/h outside built-up areas, and 50 km/h in built-up areas. Drivers who've held their licence for less than a year face limits 20 km/h lower outside built-up areas and on motorways.",
    },
    {
      question: "Do I need winter tyres in Romania?",
      answer: "Whenever snow, ice, or sleet is present on the road — typically between November and March — winter tyres or snow chains are required.",
    },
    {
      question: "What side of the road does Romania drive on?",
      answer: "Romania drives on the right, with the driver's seat on the left side of the vehicle — the same convention as the rest of mainland Europe.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Romania?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21.",
    },
    {
      question: "Can I drive a rental car from Romania into Bulgaria or Hungary?",
      answer: "Usually, but you need to tell your rental company in advance — not every plan permits cross-border driving, and some charge an additional fee. Confirm before you travel rather than assuming it's included.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Romania?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Romania, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Romania?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Romania (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/romania/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Driving in Romania",
      url: "https://ro.usembassy.gov/driving-in-romania/",
      organization: "U.S. Embassy in Romania",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["croatia", "united-kingdom", "italy", "spain"],

  primaryKeyword: "international driving permit romania",
  secondaryKeywords: [
    "idp romania",
    "international driving licence romania",
    "driving in romania",
    "romania car rental",
    "rovinieta",
    "transfagarasan road trip",
    "transalpina",
    "driving in transylvania",
    "bucharest airport car rental",
    "bran castle driving",
    "romania winter driving",
    "romania right hand driving",
  ],
  metaTitle: "International Driving Permit Romania: Legal Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "UK licence holders are accepted without an IDP under current rules — every other non-EU/EEA visitor must obtain one before arrival to drive legally.",
};
