import type { CountryRecord } from "./types";

// Portugal — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. Treated
// as a flagship European market per the user's explicit brief.
//
// EIGHTH RECORD (after the Philippines, Hong Kong, Ireland, the United
// Kingdom, Australia, Canada, and New Zealand) where idpRequirementLevel
// is NOT "Legally required." Portugal lets non-resident visitors drive
// on a valid foreign licence — issued by a recognised country — for up
// to 185 days, without needing to exchange it. An IDP is recommended
// (not mandatory) if that licence isn't in English, Portuguese, French,
// or Spanish. `idpRequirementLevel: "Commonly requested"` / `
// conventionLabel: "Recommended, not required"` match the established
// labeling for this pattern.
//
// A distinction worth being precise about, since two different 183-ish
// day rules exist and are easy to conflate: GOV.UK's own guidance
// discusses a SEPARATE 183-day rule for importing a personal vehicle
// into Portugal (a customs question), which is NOT the same rule as the
// 185-day foreign-licence driving allowance this record focuses on. This
// record does not merge the two.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Foreign Travel Advice for Portugal was
// directly fetched and is the primary citation. Practical details (Via
// Verde mechanics, Lisbon parking, rental age norms, Azores/Madeira
// self-drive practicalities) are corroborated across multiple
// independent secondary sources and marked partially_sourced where a
// primary government fetch wasn't independently achieved.
//
// FLAG VERIFICATION (mandatory per the user's brief for this build): the
// existing PortugalFlag component was audited before this record was
// written and found to render only a plain gold circle in place of the
// entire national coat of arms — missing the armillary sphere, the
// shield, all 7 castles, and all 5 quinas entirely. It has been rebuilt
// with every one of those elements at the correct count and position:
// the armillary sphere as its outer meridian ring plus three crossing
// great-circle rings; the shield's red border carrying all 7 gold
// three-towered castles (3 along the top edge, 2 per side); and all 5
// blue quinas arranged in the correct cross pattern, each bearing its
// full 5 white bezants (25 total, matching the coat of arms' actual
// blazon). Fine historical engraving detail is simplified at this icon
// scale — consistent with this file's long-standing, previously-accepted
// standard for complex crests — but no element category, count, or
// position is invented or omitted. See the comment on PortugalFlag in
// flagIcons.tsx for the full derivation, and this record's own build
// process for the visual zoom-verification performed before this record
// shipped.
export const PORTUGAL: CountryRecord = {
  slug: "portugal",
  name: "Portugal",
  isoCode: "PT",
  region: "Europe",
  tier: 1,

  h1: "International Driver's License Portugal",

  conventionStatus: {
    value: "Portugal lets non-resident visitors drive on a valid foreign licence, issued by a recognised country, for up to 185 days without needing to exchange it. An International Driving Permit is recommended, not mandatory, if that licence isn't in English, Portuguese, French, or Spanish",
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
      "Portugal lets non-resident visitors drive on a valid foreign licence for up to 185 days, with an International Driving Permit recommended if that licence isn't in English, Portuguese, French, or Spanish.",
    points: [
      { tip: "Visitors can drive on a valid foreign licence, issued by a recognised country, for up to 185 days without needing to exchange it for a Portuguese one.", status: "confirmed" },
      { tip: "An International Driving Permit is recommended if your licence isn't in English, Portuguese, French, or Spanish, since it acts as an official translation.", status: "partially_sourced" },
      { tip: "Once you become a resident of Portugal, an IDP doesn't extend your driving entitlement — separate exchange rules apply.", status: "confirmed" },
      { tip: "Portuguese licence holders travelling abroad can obtain a Portuguese-issued IDP through the IMT or ACP — a different situation from visiting Portugal on a foreign licence.", status: "confirmed" },
      { tip: "Portugal drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so you have it ready either way.",
    ctaHint: { label: "Prepare my IDP for Portugal", href: "/apply?destination=Portugal" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Portugal's motorways are modern and well signed, with an electronic tolling system and driving conditions that shift noticeably between Lisbon's narrow historic streets and the open roads of the Algarve or the islands.",
    points: [
      { tip: "A number of Portuguese toll roads are fully electronic with no barrier or booth — cameras read your plate, and rental cars need a linked payment device like Via Verde to avoid a post-trip surcharge.", status: "confirmed" },
      { tip: "At roundabouts, stay in your lane until you exit — cutting across from an inner lane to exit isn't allowed.", status: "confirmed" },
      { tip: "Lisbon's older districts, including Alfama, Chiado, and Baixa, have narrow, hilly streets with very limited parking — many visitors park in a garage and continue on foot.", status: "confirmed" },
      { tip: "Speed limits are typically 50 km/h in towns, 90-100 km/h on national roads, and 120 km/h on motorways, unless otherwise signed.", status: "partially_sourced" },
      { tip: "Roads in Madeira and the Azores include steep gradients and winding mountain sections, so allow extra time and drive with caution.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available across mainland Portugal, Madeira, and the Azores, with most providers setting age and licence-history requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, and most rental companies accept drivers from that age, though a young-driver surcharge commonly applies under 25.", status: "partially_sourced" },
      { tip: "Lisbon and Faro airports both have rental counters from major providers reachable directly from the arrivals area.", status: "partially_sourced" },
      { tip: "Rental cars on mainland Portugal typically include a Via Verde-compatible toll device — confirm it's active before driving on an electronic-only toll road.", status: "confirmed" },
      { tip: "In the Azores, a rental car is generally the only practical way to explore beyond the main towns, since public transport is limited.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your IDP if you're carrying one, together as your standard document set any time you're driving in Portugal.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible.", status: "confirmed" },
      { tip: "Carry proof of your rental agreement or vehicle registration alongside your licence.", status: "partially_sourced" },
      { tip: "Emergency services across Portugal, as in the rest of the EU, can be reached on 112.", status: "confirmed" },
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
    { name: "Algarve (Lagos & Albufeira)", note: "Portugal's most popular coastal self-drive region, well served by motorways from Faro Airport and equipped with electronic toll roads throughout.", status: "confirmed" },
    { name: "Lisbon & Sintra", note: "Lisbon's historic centre is dense and hilly with limited parking — many visitors park outside the centre and drive out to Sintra and Cascais instead.", status: "confirmed" },
    { name: "Douro Valley", note: "A scenic wine-region drive from Porto, with winding roads along the river valley that reward an unhurried pace.", status: "partially_sourced" },
    { name: "Madeira", note: "Dramatic coastal and mountain roads reached by air rather than the mainland ferry network — a rental car is the practical way to see the island beyond Funchal.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "112 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Portugal?",
      answer: "Many rental companies in Portugal ask to see an International Driving Permit before releasing a car — particularly if your licence isn't in English, Portuguese, French, or Spanish, or simply as their own standard policy — so travelling with one helps you avoid unnecessary friction at the counter. Legally, non-resident visitors can drive on a valid foreign licence alone for up to 185 days; an IDP is recommended but not mandatory. ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready either way.",
    },
    {
      question: "How long can I drive in Portugal on my foreign licence?",
      answer: "Up to 185 days as a non-resident visitor, as long as your licence was issued by a recognised country and stays valid for that period. Longer stays or residency involve a separate licence-exchange process.",
    },
    {
      question: "Will my rental company still ask for an IDP even if it's not legally required?",
      answer: "Often, yes. Even when Portuguese law doesn't require one for your specific situation, individual rental companies commonly request an IDP alongside your original licence as their own policy. It's worth having one ready regardless of the legal minimum.",
    },
    {
      question: "Can I rent a car at Lisbon or Faro airport?",
      answer: "Yes — both airports have rental counters from major providers reachable directly from the arrivals area.",
    },
    {
      question: "What is Via Verde, and do I need it for toll roads?",
      answer: "Via Verde is Portugal's electronic toll system, used on many motorways that have no toll booths at all — cameras read your licence plate automatically. Most rental cars include a compatible device, but it's worth confirming it's active at pickup, since driving through without one can mean a toll plus an administration fee arriving after your trip.",
    },
    {
      question: "Is Lisbon difficult to drive in?",
      answer: "The historic centre can be — narrow, hilly streets in areas like Alfama, Chiado, and Baixa have very limited parking. Many visitors park in a garage on the edge of the centre and explore on foot, saving the car for day trips to Sintra, Cascais, or further afield.",
    },
    {
      question: "Can I drive in Madeira or the Azores on the same IDP?",
      answer: "Yes — Madeira and the Azores are part of Portugal, so the same national licence and IDP rules apply. You'll typically fly to these islands rather than drive, and rent a car locally once you arrive.",
    },
    {
      question: "What are Portugal's roundabout rules?",
      answer: "Stay in your lane through the roundabout until you're ready to exit — moving from an inner lane straight across to an outside exit isn't allowed. Signal your exit as you approach it, the same as most of continental Europe.",
    },
    {
      question: "What side of the road does Portugal drive on?",
      answer: "Portugal drives on the right, with the driver's seat on the left side of the vehicle — the same convention as the rest of mainland Europe.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Portugal?",
      answer: "The legal minimum driving age is 18. Most rental companies accept drivers from 18, though a young-driver surcharge commonly applies under 25.",
    },
    {
      question: "Is the Algarve easy to self-drive?",
      answer: "Yes — it's Portugal's most popular self-drive region, well connected by motorway from Faro Airport, with electronic tolls throughout and generally straightforward coastal roads between towns like Lagos and Albufeira.",
    },
    {
      question: "Is the Douro Valley worth driving yourself?",
      answer: "Many visitors think so — it's a scenic route from Porto along the river, though the roads wind through hills and vineyard terraces, so it suits an unhurried pace rather than a quick there-and-back trip.",
    },
    {
      question: "What happens if my rental car doesn't have a toll device?",
      answer: "You can still be charged — electronic toll gantries read your licence plate regardless. Without a linked payment device, the rental company typically pays the toll and passes it back to you afterward, usually with an added administration fee, so it's worth confirming your car's toll setup before you drive off.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Portugal?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Portugal. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Portugal?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Portugal (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/portugal/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["spain", "france", "italy", "united-kingdom"],

  primaryKeyword: "international driving permit portugal",
  secondaryKeywords: [
    "idp portugal",
    "international driving licence portugal",
    "driving in portugal",
    "portugal car rental",
    "algarve road trip",
    "via verde toll",
    "lisbon airport car rental",
    "faro airport car rental",
    "driving in madeira",
    "driving in the azores",
    "douro valley driving",
    "portugal right hand driving",
  ],
  metaTitle: "International Driver's License Portugal: Requirements",
  metaTitleAbsolute: true,
  metaDescription:
    "An IDP is recommended rather than mandatory here, and mainly matters if your original licence isn't already in English, Portuguese, French, or Spanish.",
};
