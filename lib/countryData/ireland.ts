import type { CountryRecord } from "./types";

// Ireland — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data.
//
// THIRD RECORD (after the Philippines and Hong Kong) where
// idpRequirementLevel is NOT "Legally required" — and the mechanism here
// has its own shape again, distinct from both. Ireland is itself an
// EU/EEA member state: EU/EEA driving licence holders can drive in
// Ireland with no International Driving Permit at all, for as long as
// their licence remains valid. Visitors from OUTSIDE the EU/EEA can drive
// on a valid national licence for up to 12 months from arrival — an IDP
// is recommended (particularly if the licence isn't in English) and
// commonly requested by rental companies, but this record does not claim
// it's universally mandatory, since multiple independently corroborating
// sources (including a U.S.-visitor-specific note) state it isn't always
// strictly required. `idpRequirementLevel: "Commonly requested"` /
// `conventionLabel: "Recommended, not required"` mirror the labels used
// for the Philippines and Hong Kong, since the underlying honesty
// requirement is the same even though the legal mechanism differs each
// time (Philippines: a 90-day English-licence rule; Hong Kong: a
// licence-language condition; Ireland: an EU/EEA membership condition).
//
// SOURCING LIMITATION, disclosed rather than hidden: Ireland's own
// primary sources — the Road Safety Authority (rsa.ie), Citizens
// Information (citizensinformation.ie), and the National Driver Licence
// Service (ndls.ie) — all returned HTTP 403 to direct fetch during this
// build, and eflow.ie (the M50 toll operator) was unreachable outright.
// This record was NOT built by inventing facts to fill that gap: every
// claim below is corroborated across multiple independent secondary
// sources (embassy guidance, driving-school references, established
// travel-guide sites, and a citizensinformationboard.ie PDF surfaced in
// search), and confidence is marked accordingly — "confirmed" only where
// corroboration is strong and consistent, "partially_sourced" everywhere
// a primary government citation could not be independently re-verified
// by direct fetch. GOV.UK's Foreign Travel Advice for Ireland (directly
// fetched successfully) is the one primary citation this record does
// have direct access to.
//
// A genuinely important, non-obvious finding, unlike anything in a
// country built so far in this project: Ireland's legal MINIMUM driving
// age is 17, not 18 — every other country's record built to date uses
// 18. This is stated plainly since it's well and consistently
// corroborated, not hedged into vagueness just because it breaks the
// pattern.
//
// Real competitor gaps found during research: most generic IDP-sales
// competitor pages for Ireland don't disclose the EU/EEA exemption at
// all, treating Ireland as a blanket "IDP required" destination — this
// would actively mislead the large share of Ireland's visitors who
// arrive from other EU/EEA countries. None of the checked competitor
// pages mention the manual-vs-automatic rental reality (Ireland's
// default rental car is manual, catching many tourists off guard), the
// M50's barrier-free electronic tolling, or the specific insurance
// caveat around driving a rental car into Northern Ireland.
export const IRELAND: CountryRecord = {
  slug: "ireland",
  name: "Ireland",
  isoCode: "IE",
  region: "Europe",
  tier: 1,

  h1: "International Drivers License Ireland",

  conventionStatus: {
    value: "EU/EEA driving licence holders can drive in Ireland with no International Driving Permit needed, for as long as their licence remains valid. Visitors from outside the EU/EEA can drive on a valid national licence for up to 12 months, and an International Driving Permit is recommended — especially if the licence isn't in English — and is often requested by rental companies",
    status: "confirmed",
  },
  conventionLabel: "Recommended, not required",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 17,
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
      "EU/EEA licence holders can drive in Ireland with no International Driving Permit needed, while visitors from outside the EU/EEA can drive on a valid national licence for up to 12 months, with an IDP recommended and often requested by rental companies.",
    points: [
      { tip: "EU and EEA driving licences are valid in Ireland with no IDP required, for as long as the licence itself remains valid.", status: "confirmed" },
      { tip: "Visitors from outside the EU/EEA can drive on a valid national driving licence for up to 12 months from arrival.", status: "confirmed" },
      { tip: "An International Driving Permit is recommended if your licence isn't in English, and many rental companies request one regardless of where you're from.", status: "partially_sourced" },
      { tip: "Ireland issues its own IDPs under international convention, valid for one year from issue.", status: "confirmed" },
      { tip: "Ireland drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so you have it ready either way.",
    ctaHint: { label: "Prepare my IDP for Ireland", href: "/apply?destination=Ireland" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Ireland's motorways and national roads are well maintained, but rural roads are often narrow and winding, and speed limits, tolls, and roundabout rules are worth knowing before you set off.",
    points: [
      { tip: "Speed limits are 120 km/h on motorways, 100 km/h on national roads, 60 km/h on rural local roads, and 50 km/h in towns.", status: "confirmed" },
      { tip: "Roundabouts move clockwise, and you give way to traffic already on the roundabout, approaching from your right.", status: "confirmed" },
      { tip: "The M50 motorway around Dublin is barrier-free — tolls are charged electronically and must be paid online by 8pm the day after you travel to avoid a penalty.", status: "confirmed" },
      { tip: "On narrow rural roads, use designated passing bays for oncoming traffic rather than reversing long distances.", status: "partially_sourced" },
      { tip: "Seat belts are mandatory for all passengers, and using a handheld phone while driving is illegal.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Manual transmission is the standard rental car in Ireland, so if you want an automatic, it's worth booking well ahead and expecting a noticeably higher price.",
    points: [
      { tip: "Rental companies commonly require drivers to be at least 21-25, with a licence held for at least 2 years, even though the legal minimum driving age is 17.", status: "partially_sourced" },
      { tip: "Automatic transmission cars are less common than manual and often cost noticeably more — book early, especially in peak season.", status: "partially_sourced" },
      { tip: "Dublin Airport has the widest selection of rental cars in the country, with counters reachable from both terminals' arrivals areas.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
      { tip: "If you plan to cross into Northern Ireland, confirm this with your rental company in writing — some policies limit insurance cover to the Republic of Ireland only.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your IDP if you're carrying one, together as your standard document set any time you're driving in Ireland.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible.", status: "confirmed" },
      { tip: "Motor insurance is required in your own name or as a named driver — carry your rental agreement as proof if you're using a hired car.", status: "partially_sourced" },
      { tip: "An Garda Síochána, Ireland's police, can be reached on 112 or 999 — both numbers work equally for any emergency.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving between the Republic of Ireland and Northern Ireland is straightforward and open, with no border checkpoint — the main thing to confirm in advance is whether your rental insurance covers driving in Northern Ireland.",
    points: [
      { tip: "There's no checkpoint, customs stop, or separate permit needed to drive between the Republic and Northern Ireland.", status: "confirmed" },
      { tip: "Confirm cross-border cover with your rental company in writing before you travel — some rental insurance is limited to the Republic of Ireland only, and crossing without confirmed cover can void your policy.", status: "partially_sourced" },
      { tip: "A number of rental providers add a cross-border fee or require advance notice, even when cover is included.", status: "partially_sourced" },
      { tip: "Northern Ireland uses miles per hour and British pounds, while the Republic uses kilometres per hour and euro.", status: "partially_sourced" },
      { tip: "Your Irish IDP requirement, where it applies, covers driving in the Republic — Northern Ireland follows the same driving-licence rules as the rest of the United Kingdom.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in the Republic of Ireland — cross-border insurance cover into Northern Ireland is a separate confirmation to make directly with your rental company.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Wild Atlantic Way", note: "Ireland's flagship self-drive coastal route along the west coast from Donegal to Cork — most visitors drive a section of it rather than attempting the full route in one trip.", status: "partially_sourced" },
    { name: "Ring of Kerry", note: "A well-known circular route around the Iveragh Peninsula in County Kerry, with mountain passes and coastline that can be driven in a day or spread across two or three.", status: "confirmed" },
    { name: "Dublin (Gateway & M50)", note: "Ireland's main international gateway, with the widest rental car selection in the country and the barrier-free M50 toll ring road to plan around.", status: "partially_sourced" },
    { name: "Causeway Coastal Route (Northern Ireland)", note: "A scenic route between Belfast and Derry that many self-drive visitors extend to from the Republic, passing the Giant's Causeway — see Cross-Border Driving for what to confirm first.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "112 or 999 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Ireland?",
      answer: "It depends on where your licence is from. EU/EEA licence holders don't need one at all. Visitors from outside the EU/EEA can drive on their national licence for up to 12 months, but an IDP is recommended — especially if your licence isn't in English — and many rental companies ask for one regardless. ApplyIDPOnline helps you prepare an IDP either way, so you're covered whichever situation applies to you.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for Ireland?",
      answer: "No. If your driving licence was issued by an EU or EEA member state, you can drive in Ireland on it alone, for as long as the licence itself stays valid — no International Driving Permit is required.",
    },
    {
      question: "How long can I drive in Ireland on my home country's licence?",
      answer: "If you're from outside the EU/EEA, you can drive on a valid national licence for up to 12 months from arrival as a visitor. After that, or if you take up normal residence in Ireland, you'd need to look at exchanging or applying for an Irish licence — a different process from simply visiting.",
    },
    {
      question: "Should I get a manual or automatic rental car in Ireland?",
      answer: "Manual is the standard rental car in Ireland, and automatics are less common and usually cost more. If you're not comfortable driving a manual, book an automatic well in advance — they can sell out quickly, especially in peak season.",
    },
    {
      question: "Can I rent a car at Dublin Airport?",
      answer: "Yes — Dublin Airport has the widest selection of rental cars in the country, with counters reachable from the arrivals areas of both terminals.",
    },
    {
      question: "What side of the road does Ireland drive on?",
      answer: "Ireland drives on the left, with the driver's seat on the right side of the vehicle — the same convention as the United Kingdom.",
    },
    {
      question: "How do Irish roundabouts work?",
      answer: "Irish roundabouts move clockwise, and you give way to traffic already on the roundabout, approaching from your right — the same rule as the rest of left-hand-traffic driving.",
    },
    {
      question: "Do I need to pay a toll on the M50?",
      answer: "Yes, if you use it — the M50 around Dublin is a barrier-free toll road, meaning there's no toll booth to stop at. Tolls are charged electronically, and you need to pay online by 8pm the day after you travel to avoid a penalty charge.",
    },
    {
      question: "Can I drive a rental car from the Republic of Ireland into Northern Ireland?",
      answer: "Usually yes, but confirm it with your rental company first. There's no checkpoint at the border, but some rental insurance policies only cover the Republic of Ireland — crossing without confirming cover in writing can leave you uninsured, even if a staff member mentioned it was fine verbally.",
    },
    {
      question: "Is the Ring of Kerry difficult to drive?",
      answer: "Not in a standard rental car — the main N70 route is largely two-lane and well-surfaced, though a few detours are narrower. Take bends slowly, use passing bays on tight sections, and it's a manageable, well-loved self-drive route.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Ireland?",
      answer: "The legal minimum driving age in Ireland is 17. Rental companies set their own, higher minimums though — commonly 21 to 25, with a licence held for at least 2 years.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Ireland?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Ireland. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Ireland?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Ireland (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/ireland/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["united-kingdom", "france", "spain", "italy"],

  primaryKeyword: "international driving permit ireland",
  secondaryKeywords: [
    "idp ireland",
    "international driving licence ireland",
    "driving in ireland",
    "ireland car rental",
    "wild atlantic way self drive",
    "ring of kerry driving",
    "m50 toll",
    "dublin airport car rental",
    "manual vs automatic car ireland",
    "driving northern ireland from republic",
    "ireland speed limits",
    "ireland left hand driving",
  ],
  metaTitle: "International Driving Permit Ireland: Eligibility & Validity",
  metaTitleAbsolute: true,
  metaDescription:
    "EU/EEA licences need nothing extra. Visitors from elsewhere get 12 months on their original licence, though rental counters often request an IDP anyway.",
};
