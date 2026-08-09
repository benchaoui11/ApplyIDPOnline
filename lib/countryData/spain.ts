import type { CountryRecord } from "./types";

// Spain — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. Treated
// as a flagship European market per the user's explicit brief.
//
// GENUINELY DIFFERENT SHAPE FROM THE PRECEDING EIGHT "NOT STRICTLY
// REQUIRED" RECORDS: Spain isn't a single-answer country either way — it
// splits cleanly by licence origin. EU/EEA driving licences (and UK
// licences, under a bilateral arrangement independently confirmed by
// GOV.UK) are recognized in Spain with no IDP needed at all. Visitors on
// a non-EU/EEA licence, by contrast, are consistently and independently
// described across multiple sources as needing to "obtain" an IDP —
// stronger, mandatory-sounding language than the "recommended" framing
// used for the Philippines, Hong Kong, Ireland, the UK, Australia,
// Canada, New Zealand, or Portugal. Since most of this service's actual
// customers hold non-EU/EEA licences (the eligibility checker defaults
// to a United States licence), this record sets `idpRequirementLevel:
// "Legally required"` — matching the majority-pattern countries — with
// `conventionLabel: "Required for non-EU/EEA visitors"`, a label used
// nowhere else in this project, chosen because neither the standard
// "Legally required" framing (which would misrepresent the EU/EEA
// exemption) nor the "Recommended, not required" framing (which would
// understate the real requirement facing most of our own customers) is
// individually accurate here.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Foreign Travel Advice for Spain was
// directly fetched. The DGT's own official information sheet on
// International Driving Permits (a PDF, sede.dgt.gob.es) was located and
// is cited, but its content could not be extracted through direct fetch
// — this is disclosed rather than hidden. The EU/EEA-exempt vs.
// non-EU/EEA-must-obtain distinction is corroborated independently and
// consistently across multiple secondary sources and is marked
// confirmed; softer practical details (exact day-count validity, rental
// norms) are marked partially_sourced.
//
// FLAG VERIFICATION (mandatory per the user's brief for this build, then
// escalated after review): an initial hand-geometric reconstruction of
// the coat of arms (correct elements, count, and position) was built and
// visually verified, but was rejected on review as not accurate enough.
// SpainFlag was rebuilt a second time using the exact official artwork
// instead of an approximation: the source SVG (Wikimedia Commons'
// File:Flag_of_Spain.svg, a vetted reproduction of the Boletín Oficial
// del Estado's official design) was downloaded directly via curl —
// bypassing AI-summarized extraction, which proved unreliable on a file
// this complex — and its coat-of-arms group was isolated with Python's
// xml.etree.ElementTree (parsing the full document, then extracting the
// element by DOM position) to guarantee valid, complete, balanced
// markup. All 602 descendant elements (494 paths, 98 groups, plus
// ellipses/rects/circles) covering the crown, both Pillars of Hercules,
// and the quartered shield (Castile, León, Aragón, Navarre, Granada's
// pomegranate, and the Bourbon-Anjou inescutcheon) are reproduced
// verbatim via dangerouslySetInnerHTML, wrapped in a uniform scale(1.2)
// to map the source's 750x500 canvas onto this file's 900x600 flag
// convention (900/750 = 600/500 = 1.2 exactly) without recomputing any
// coordinate — preserving the artwork's calibrated proportions and
// position (coat of arms height 2/5 of the flag's hoist, axis at 1/2 the
// flag's height from the hoist edge, per Spain's constitutional flag
// description, Article 4.1). No element is simplified, approximated, or
// omitted. Verified visually at zoom before this record shipped.
export const SPAIN: CountryRecord = {
  slug: "spain",
  name: "Spain",
  isoCode: "ES",
  region: "Europe",
  tier: 1,

  h1: "International Driving Permit Spain",

  conventionStatus: {
    value: "EU and EEA driving licence holders (and UK licence holders, under a bilateral arrangement) can drive in Spain with no International Driving Permit needed. Visitors on a non-EU/EEA licence must carry a valid IDP alongside their original licence to drive legally",
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
      "Non-EU/EEA visitors need an International Driving Permit alongside their valid original licence to drive legally in Spain, while EU/EEA (and UK) licence holders don't need one at all.",
    points: [
      { tip: "EU and EEA driving licences are valid in Spain with no IDP required, and UK licences are recognized under a separate bilateral arrangement.", status: "confirmed" },
      { tip: "Visitors on a non-EU/EEA licence must obtain an International Driving Permit before travelling — Spain does not issue IDPs to foreign visitors.", status: "confirmed" },
      { tip: "The IDP is not a standalone document — it's only valid when carried together with your original national licence.", status: "confirmed" },
      { tip: "The DGT does not allow an IDP to be exchanged for a Spanish licence — it's a translation aid, not a substitute.", status: "confirmed" },
      { tip: "Spain drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Spain", href: "/apply?destination=Spain" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Spain's motorway network is extensive, with electronic tolls on some routes, low emission zones in major cities, and strict, consistently enforced drink-driving laws.",
    points: [
      { tip: "Drivers already inside a roundabout have the right of way over those entering it.", status: "confirmed" },
      { tip: "Madrid and Barcelona both operate camera-enforced Low Emission Zones (ZBE) — rental cars carry the correct DGT environmental badge automatically, but it's worth confirming with your provider.", status: "confirmed" },
      { tip: "AP-toll motorways charge a fee, while other motorways (autovías) are typically free — check your route in advance if you want to avoid tolls.", status: "partially_sourced" },
      { tip: "Guardia Civil checkpoints on tourist routes like the AP-7 commonly check for mandatory equipment, including a hi-vis vest and a warning triangle.", status: "confirmed" },
      { tip: "Using a handheld phone while driving is illegal, and hands-free use is restricted as well — pull over if you need to use it.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available across mainland Spain, the Balearic Islands, and the Canary Islands, with most providers setting age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but most rental companies require drivers to be at least 21, with some setting the bar at 23.", status: "confirmed" },
      { tip: "Madrid and Barcelona airports both have rental counters from major providers reachable directly from the arrivals area.", status: "partially_sourced" },
      { tip: "In the Canary and Balearic Islands, a rental car is generally the practical way to reach beaches and towns not well served by public transport.", status: "partially_sourced" },
      { tip: "Confirm your rental car's DGT environmental badge status before driving into a city's Low Emission Zone, since fines for non-compliance start around €90.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence and your International Driving Permit, if you need one, together as your standard document set any time you're driving in Spain.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "Carry valid ID alongside your licence, since officers can request both.", status: "confirmed" },
      { tip: "Emergency services across Spain can be reached on 112, with English-speaking operators generally available.", status: "confirmed" },
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
    { name: "Costa del Sol (Málaga & Marbella)", note: "A popular coastal self-drive region reachable from Málaga Airport, with motorways connecting towns along the Andalusian coast.", status: "confirmed" },
    { name: "Madrid", note: "Spain's capital operates a camera-enforced Low Emission Zone within the M-30 ring road, so confirm your rental car's environmental badge before driving into the centre.", status: "confirmed" },
    { name: "Barcelona", note: "Spain's second-largest city and a major road-trip gateway to the Catalan coast and Costa Brava, with its own camera-enforced Low Emission Zone (Rondes de Barcelona) — confirm your rental car's environmental badge before driving into the centre.", status: "confirmed" },
    { name: "Mallorca & Ibiza", note: "Reached by air or ferry rather than a mainland road connection, with a rental car the practical way to explore beyond the main resort towns.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Spain?",
      answer: "It depends on where your licence is from. EU and EEA licence holders, and UK licence holders under a separate arrangement, can drive in Spain without one. If your licence is from outside the EU/EEA — including the US, Canada, or Australia — you'll need to obtain an IDP before you travel, since Spain doesn't issue them to visitors on arrival. ApplyIDPOnline prepares your IDP fully online before your trip, so it's ready either way.",
    },
    {
      question: "Do EU or EEA licence holders need an IDP for Spain?",
      answer: "No. EU and EEA driving licences are recognized in Spain without any additional document. UK licence holders are also covered under a separate bilateral arrangement.",
    },
    {
      question: "I have a US, Canadian, or Australian licence — do I need an IDP?",
      answer: "Yes. Visitors driving on a non-EU/EEA licence are required to carry a valid International Driving Permit alongside their original licence. You'll need to apply for it in your home country before travelling, since Spain does not issue IDPs to foreign visitors.",
    },
    {
      question: "Can I rent a car at Madrid or Barcelona airport?",
      answer: "Yes — both airports have rental counters from major providers reachable directly from the arrivals area.",
    },
    {
      question: "What is a ZBE, and will it affect my rental car?",
      answer: "A ZBE (Zona de Bajas Emisiones) is a Low Emission Zone found in Spanish cities including Madrid and Barcelona, enforced automatically by cameras. Spanish rental cars already carry the correct DGT environmental badge, but it's worth checking with your rental company that your specific vehicle is cleared for the city you're visiting.",
    },
    {
      question: "Do I need to pay tolls in Spain?",
      answer: "Only on certain motorways. Spain has a mix of toll motorways (marked AP) and free motorways (autovías) — many popular tourist routes are free, but it's worth checking your specific route, particularly around the coasts, in advance.",
    },
    {
      question: "What are Guardia Civil checks like on Spanish roads?",
      answer: "On busy tourist routes like the AP-7 along the Costa Blanca, checks commonly focus on mandatory safety equipment — a hi-vis vest and a warning triangle are standard requirements, and rental cars typically already include them.",
    },
    {
      question: "Can I drive in Mallorca, Ibiza, or the Canary Islands on the same IDP?",
      answer: "Yes — the Balearic and Canary Islands are part of Spain, so the same licence and IDP rules apply. You'll fly or take a ferry to reach them and rent a car locally once you arrive.",
    },
    {
      question: "What side of the road does Spain drive on?",
      answer: "Spain drives on the right, with the driver's seat on the left side of the vehicle — the same convention as the rest of mainland Europe.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Spain?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, with some requiring drivers to be 23 or older.",
    },
    {
      question: "How do Spanish roundabouts work?",
      answer: "Traffic already inside the roundabout has the right of way over vehicles entering it — yield before you enter, and signal as you exit.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Spain?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Spain, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Spain?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Spain (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/spain/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "International Driving Permit — official information sheet",
      url: "https://sede.dgt.gob.es/.galleries/hojas-informativas/conductores/16/16_Permiso_internacional_conduccion_EN.pdf",
      organization: "Dirección General de Tráfico (DGT)",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["portugal", "france", "italy", "united-kingdom"],

  primaryKeyword: "international driving permit spain",
  secondaryKeywords: [
    "idp spain",
    "international driving licence spain",
    "driving in spain",
    "spain car rental",
    "costa del sol road trip",
    "madrid low emission zone",
    "barcelona zbe",
    "ap toll roads spain",
    "mallorca driving",
    "canary islands car rental",
    "madrid airport car rental",
    "spain right hand driving",
  ],
  metaTitle: "International Driving Permit Spain: Legal Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "A bilateral arrangement lets UK licences drive without an IDP — every other non-EU/EEA visitor legally needs one carried alongside their original licence.",
};
