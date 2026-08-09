import type { CountryRecord } from "./types";

// Singapore — Tier 1 record.
//
// Sourcing discipline (same standard as thailand.ts): commercial/aggregator
// sites (motorist.sg, e-ita.org, aas.com.sg, and other Semrush-surfaced
// competitor/discovery pages) were used only to identify what to verify and
// where, and to find real content gaps — none of their wording or specific
// figures were carried into this record. Fields marked "confirmed" were
// independently verified against primary sources fetched directly during
// this build: Singapore Police Force Traffic Police ("Singapore Driving
// Licence"), GOV.UK Foreign Travel Advice for Singapore, Singapore Civil
// Defence Force / gov.sg (emergency numbers), and Singapore's Land
// Transport Authority (LTA/OneMotoring, Vehicle Entry Permit rules) — see
// sourceCitations. Fields marked "partially_sourced" are corroborated but
// not checked against a primary government source, worded conservatively.
// Fields with no corroboration are omitted, not invented.
//
// Real, verified competitor gap found during research: the top-ranking
// "IDP Singapore" article from a major local competitor (motorist.sg)
// actually describes a Singapore-issued IDP for outbound Singaporean
// citizens/PRs travelling abroad — not the IDP a foreign visitor needs to
// drive IN Singapore. This record is deliberately precise about which
// direction it's answering (FAQ "difference-between" entry addresses this
// directly), and states the ASEAN-citizen IDP exemption and the 12-month
// stay threshold explicitly — neither was clearly stated on any competitor
// page checked (motorist.sg, e-ita.org).
export const SINGAPORE: CountryRecord = {
  slug: "singapore",
  name: "Singapore",
  isoCode: "SG",
  region: "Asia",
  tier: 1,

  h1: "International Driving Permit Singapore",

  conventionStatus: {
    value: "Foreign IDPs issued by an authorised body in your home country are accepted for visitors staying under 12 months",
    status: "confirmed",
  },
  conventionLabel: "Policy-based acceptance",
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
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Most foreign visitors need an International Driving Permit alongside their valid original licence to drive in Singapore, and eligibility can vary depending on where your licence was issued.",
    points: [
      { tip: "Foreign visitors staying under 12 months may drive with a foreign licence and an IDP issued by an authorised body in their home country.", status: "confirmed" },
      { tip: "If you're a citizen of an ASEAN member state, you're exempt from the IDP requirement and can drive on your home licence alone.", status: "confirmed" },
      { tip: "If an IDP isn't available to you, an official English translation of your foreign licence is accepted instead.", status: "confirmed" },
      { tip: "Staying in Singapore longer than 12 months means converting to a Singapore driving licence, not continuing on a foreign one.", status: "confirmed" },
      { tip: "Singapore drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Singapore", href: "/apply?destination=Singapore" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Singapore's roads are well-signed and closely monitored — the main adjustments for visitors are traffic camera density, strict drink-driving enforcement, and the ERP electronic toll system.",
    points: [
      { tip: "Speed limits are typically 50 km/h on ordinary roads and up to 90 km/h on expressways, posted on standard road signage.", status: "partially_sourced" },
      { tip: "Drink-driving is strictly enforced with regular roadside breath tests, and penalties for exceeding the legal alcohol limit are severe, including imprisonment.", status: "confirmed" },
      { tip: "Electronic Road Pricing (ERP) charges apply automatically via an in-vehicle unit on gantries during operating hours — rental companies generally bill these charges to your account afterward.", status: "partially_sourced" },
      { tip: "If you're involved in an accident causing damage or injury, you must remain at the scene, exchange particulars, and report it to the police within 24 hours.", status: "confirmed" },
      { tip: "Seatbelts are mandatory for drivers and all passengers, front and rear.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your license details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Car rental companies in Singapore generally ask for your IDP alongside your original licence, and many apply their own minimum-age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The minimum age to hold a Singapore driving licence is 18, and rental companies commonly expect drivers to be at least 21, with some requiring 23-25 for certain vehicle categories.", status: "partially_sourced" },
      { tip: "Rental providers often expect a licence held for at least 1-2 years with a clean driving record.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup: your IDP, original licence, passport, and a credit card for the security deposit.", status: "partially_sourced" },
      { tip: "Most Singapore rental agreements do not permit taking the vehicle across the border into Malaysia — confirm this specifically with your provider if you're planning a cross-border trip.", status: "partially_sourced" },
      { tip: "Requirements vary by rental company — confirm specifics with your provider before arrival.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  scooterGuide: {
    label: "Scooters & Motorcycles",
    directAnswer: "Motorcycle and scooter licensing in Singapore is stricter and more locally regulated than in many neighboring countries, and casual short-term tourist rental is far less common than car rental.",
    points: [
      { tip: "Your IDP only shows a motorcycle category if your original licence already includes one — it can't add a category you don't hold at home.", status: "confirmed" },
      { tip: "Singapore licenses motorcycles by engine capacity under its own class system (Class 2B, 2A, and 2), which affects what a visiting rider may be permitted to operate.", status: "partially_sourced" },
      { tip: "Helmets are legally required for the rider and any pillion passenger.", status: "confirmed" },
      { tip: "Short-term motorcycle or scooter rental for tourists is limited compared to car rental — confirm availability and requirements directly with a licensed rental operator before planning around it.", status: "partially_sourced" },
      { tip: "Driving or riding without a valid licence and IDP can affect your travel insurance coverage if you're in an accident.", status: "confirmed" },
    ],
    solutionNote: "Your IDP lists the vehicle categories from your original licence, including motorcycle categories where applicable.",
    ctaHint: { label: "Prepare my IDP for Singapore", href: "/apply?destination=Singapore" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's licence and your IDP together as your standard document set any time you're driving — Singapore's traffic enforcement, including speed and red-light cameras, is extensive.",
    points: [
      { tip: "Your IDP and original licence work as a pair — one is not a substitute for the other at a roadside check.", status: "confirmed" },
      { tip: "Keep both documents physically accessible (not just a photo on your phone) whenever you're driving.", status: "confirmed" },
      { tip: "A passport or passport copy is also worth keeping with you, alongside your rental agreement if you're using a hired vehicle.", status: "partially_sourced" },
      { tip: "Singapore uses extensive speed and traffic camera enforcement on expressways and major roads, in addition to roadside checks.", status: "partially_sourced" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have both documents ready together.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Border Crossing",
    directAnswer: "Driving your own or a Malaysian-registered vehicle between Singapore and Malaysia is a separate process from renting a car locally, and involves Singapore's Vehicle Entry Permit (VEP) system rather than just your IDP.",
    points: [
      { tip: "Foreign-registered vehicles (including Malaysian-plated cars) need a Vehicle Entry Permit and an Autopass card to enter Singapore, applied for in advance through LTA's OneMotoring system.", status: "confirmed" },
      { tip: "VEP applications are recommended at least two weeks ahead of travel.", status: "confirmed" },
      { tip: "Outstanding traffic, parking, or emissions fines on a foreign-registered vehicle can result in a VEP application being denied.", status: "confirmed" },
      { tip: "Your IDP requirement still applies for the Singapore portion of a cross-border trip — VEP covers the vehicle, not your licence.", status: "confirmed" },
      { tip: "Most locally rented Singapore cars are not permitted to be driven into Malaysia under the rental agreement — this is a separate question from VEP, and worth confirming directly with your rental provider.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP is part of your document set for the Singapore side of the trip regardless of which direction you're crossing — VEP and Autopass are handled separately, through LTA.",
    ctaHint: { label: "Prepare my IDP for Singapore", href: "/apply?destination=Singapore" },
  },

  motorcycleScooterRelevant: true,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence (for example, motorcycle vs. car categories) — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Motorcycle & car",

  popularDrivingAreas: [
    { name: "Changi Airport", note: "Singapore's main international gateway and the starting point for most visitors — major rental operators have counters on site for airport pickup and drop-off.", status: "confirmed" },
    { name: "Orchard Road", note: "Singapore's central shopping and hotel district — expect ERP charges during operating hours and metered or mall parking rather than street parking.", status: "confirmed" },
    { name: "Sentosa Island", note: "A leisure island connected by a causeway with its own entry toll for vehicles, popular for a self-drive day trip from central Singapore.", status: "confirmed" },
    { name: "East Coast Park", note: "A coastal stretch with dedicated car parks, a common self-drive destination away from the busier central expressways.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "999 (police)", status: "confirmed" },
  roadsideAssistanceNumber: { value: "995 — Singapore Civil Defence Force (fire and ambulance), 24 hours", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Singapore?",
      answer: "Yes, in most cases. Foreign visitors staying under 12 months need a valid foreign driving licence together with an IDP issued by an authorised body in their home country before they can drive in Singapore. ApplyIDPOnline helps you prepare that IDP online ahead of your trip, so it's ready before you land. Eligibility can vary depending on where your licence was issued — for example, ASEAN licence holders are exempt — so it's worth confirming your specific eligibility before you travel.",
    },
    {
      question: "Am I exempt from needing an IDP if I'm from an ASEAN country?",
      answer: "Yes. Singapore's Traffic Police specifically exempt foreign visitors holding a licence from an ASEAN member state from the IDP requirement — you can drive on your home licence alone during your visit. If you're unsure whether your licence qualifies, it's worth confirming your specific situation before you travel.",
    },
    {
      question: "Can I drive in Singapore with just my home country's licence if I'm not from ASEAN?",
      answer: "Your original licence alone isn't enough for most non-ASEAN visitors — Singapore requires an International Driving Permit alongside it, and ApplyIDPOnline prepares this IDP for you fully online. Carry both documents together once you have them.",
    },
    {
      question: "What's the difference between a Singapore-issued IDP and the IDP I need to drive in Singapore?",
      answer: "They're two different documents for two different directions of travel. A Singapore-issued IDP (available to Singapore citizens and PRs through the Automobile Association of Singapore) is for Singaporeans driving abroad. If you're a foreign visitor coming to drive in Singapore, you need an IDP issued by an authorised body in your own home country — that's what this page and ApplyIDPOnline's service cover.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Singapore?",
      answer: "Yes. You can submit your application fully online even if you've already arrived in Singapore. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available. You'll still need to carry your original driving licence alongside your IDP, and rental-company or local acceptance requirements can vary, so it's worth confirming these where relevant.",
    },
    {
      question: "Can I rent a car in Singapore with a foreign licence and IDP?",
      answer: "Most rental companies accept a foreign licence alongside an IDP, though many also set their own minimum age and licence-history requirements above the legal minimum. Confirm specifics with your rental provider.",
    },
    {
      question: "Do I need an IDP for a scooter or motorcycle in Singapore?",
      answer: "The same visitor requirements apply to motorcycles as to cars, though short-term tourist motorcycle rental is much less common in Singapore than car rental. Your IDP only shows a motorcycle category if your original licence already includes one.",
    },
    {
      question: "What side of the road does Singapore drive on?",
      answer: "Singapore drives on the left, with the driver's seat on the right side of the vehicle — the same convention as the UK, Japan, and much of Southeast Asia.",
    },
    {
      question: "What is Singapore's ERP system, and do I need to worry about it as a visitor?",
      answer: "Electronic Road Pricing (ERP) is Singapore's automatic toll system, charged via an in-vehicle unit as you pass through gantries on certain roads during operating hours. In a rental car, these charges are typically billed to your rental account rather than something you need to pay manually at the time.",
    },
    {
      question: "Can I drive a Singapore rental car into Malaysia?",
      answer: "Most Singapore rental agreements don't permit taking the vehicle across the border into Malaysia. If you're planning a Singapore-Malaysia trip, confirm this directly with your rental provider, or look into a rental specifically set up for cross-border use.",
    },
    {
      question: "What is a Vehicle Entry Permit (VEP), and does it replace my IDP?",
      answer: "VEP and your IDP cover different things. VEP is required for foreign-registered vehicles (like a Malaysian-plated car) entering Singapore, applied for in advance through LTA's OneMotoring system. Your IDP is still required separately for the Singapore portion of your trip if you're not exempt.",
    },
    {
      question: "What documents should I carry while driving in Singapore?",
      answer: "Your original driver's licence, your IDP (unless you're ASEAN-exempt), and a passport or passport copy are the standard set — add your rental agreement if you're using a hired vehicle.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Singapore?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "How is the Digital IDP delivered?",
      answer: "By email as a downloadable document once your application is submitted, paid, and approved by our team.",
    },
  ],

  sourceCitations: [
    {
      label: "Singapore Driving Licence — foreign visitor requirements",
      url: "https://www.police.gov.sg/Knowledge-Hub/Traffic/Traffic-Matters/Singapore-Driving-Licence",
      organization: "Singapore Police Force — Traffic Police",
    },
    {
      label: "Foreign travel advice — Singapore (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/singapore/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Vehicle Entry Permit and Autopass — foreign-registered vehicles",
      url: "https://onemotoring.lta.gov.sg/content/onemotoring/home/driving/entering_and_exiting_singapore/foreign-vehicles-not-registered-in-malaysia.html",
      organization: "Land Transport Authority (LTA), Singapore",
    },
  ],
  lastVerifiedDate: "2026-08-01",

  relatedCountrySlugs: ["malaysia", "thailand", "indonesia", "vietnam"],

  primaryKeyword: "international driving permit singapore",
  secondaryKeywords: [
    "idp singapore",
    "international driving license singapore",
    "international driving permit",
    "singapore driving license for foreigners",
    "drive in singapore",
    "driving in singapore",
    "car rental singapore",
    "international drivers license",
    "vehicle entry permit singapore",
    "driving from singapore to malaysia",
    "speed limit singapore",
    "singapore driving side",
  ],
  metaTitle: "International Driving Permit Singapore for Foreign Visitors",
  metaTitleAbsolute: true,
  metaDescription:
    "For foreign visitors to Singapore: ASEAN exemptions, IDP needs, and Vehicle Entry Permit rules explained before you drive.",
};
