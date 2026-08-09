import type { CountryRecord } from "./types";

// Hong Kong — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data.
//
// CRITICAL DIFFERENCE FROM EVERY COUNTRY BUILT SO FAR: this is only the
// second record (after the Philippines) where idpRequirementLevel is NOT
// "Legally required," but the underlying mechanism is genuinely different
// from the Philippines' 90-day tourist rule. Hong Kong's own Transport
// Department states directly (fetched during this build) that visitors —
// defined as people not taking up residence for over 12 months — may
// drive using EITHER "a valid international driving permit OR a domestic
// driving licence issued in a place outside Hong Kong," for up to 12
// months from their last entry. Multiple independent sources converge on
// the practical condition: if your home licence is already in English or
// Chinese, an IDP isn't strictly mandatory; if it isn't, an IDP (or an
// official translation) is required, and rental companies commonly ask
// for one regardless of licence language to standardize their paperwork.
// This record states that condition honestly rather than defaulting to
// "Legally required" the way most countries in this project do.
//
// THREE GENUINELY IMPORTANT, NON-OBVIOUS FINDINGS surfaced during
// research, none of which any competitor page checked here covers:
//
// 1. Hong Kong International Airport has NO on-site rental car counters.
//    Rental offices are in Kowloon and on Hong Kong Island; visitors
//    expecting airport pickup (the norm in every other country built in
//    this project) will not find it here. Confirmed across multiple
//    independent sources.
//
// 2. The famous South Lantau sights — Tai O fishing village, the Ngong
//    Ping Big Buddha, Mui Wo — sit on CLOSED ROADS under the official
//    "Driving on Lantau Island" Scheme (Lantau Closed Road Permit,
//    directly confirmed via gov.hk). A Legislative Council reply
//    (search-summarized, not independently re-confirmed by direct fetch)
//    states the permit requires a full Hong Kong driving licence — which
//    would rule out casual tourist self-drive access entirely. That
//    specific eligibility detail is marked partially_sourced rather than
//    confirmed, since the primary gov.hk page itself doesn't state it
//    directly, but the closed-road status and permit/quota system are
//    independently confirmed. Either way, this record does NOT claim
//    tourists can simply drive themselves to the Big Buddha or Tai O —
//    that would be actively misleading. North Lantau (Disneyland, Tung
//    Chung, the airport corridor) is on ordinary open roads and is not
//    affected by this restriction.
//
// 3. Driving across the Hong Kong-Zhuhai-Macao Bridge into mainland China
//    is not a standard tourist option. The official HZMB government page
//    (directly fetched) describes a permit process — a Closed Road
//    Permit, a Mainland Approval Notice from Guangdong authorities,
//    vehicle inspection, and mainland insurance — built around Hong
//    Kong-registered vehicles and residents, not short-term visitors in
//    a rental car. This record covers cross-border driving honestly, as
//    the user's special-focus brief requested, without implying it's
//    something a standard IDP application unlocks.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build — research proceeded via WebSearch/WebFetch. Three
// official Hong Kong government sources were directly fetched (Transport
// Department's overseas-licence page, the Lantau Island driving scheme
// page, and the HZMB private-cars page) and are the primary citations.
// Practical details corroborated only across independent commercial/
// travel-guide sources (speed limits, tunnel toll amounts, rental age
// norms) are marked partially_sourced, not confirmed.
export const HONG_KONG: CountryRecord = {
  slug: "hong-kong",
  name: "Hong Kong",
  isoCode: "HK",
  region: "Asia",
  tier: 1,

  h1: "International Driving License Hong Kong",

  conventionStatus: {
    value: "Hong Kong lets visitors drive on a valid foreign driving licence for up to 12 months if it's in English or Chinese — an International Driving Permit isn't strictly mandatory in that case, but is required if your licence isn't in English or Chinese, and is commonly requested by rental companies regardless",
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
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "Visitors can drive in Hong Kong on a valid foreign driving licence for up to 12 months, and while an International Driving Permit isn't always strictly mandatory, it's commonly requested and the simpler, safer document to carry.",
    points: [
      { tip: "If your foreign licence is already in English or Chinese, Hong Kong law lets you drive on it alone for up to 12 months from your last entry.", status: "confirmed" },
      { tip: "If your licence isn't in English or Chinese, an International Driving Permit is required alongside it.", status: "confirmed" },
      { tip: "Many rental companies request an IDP regardless of your licence's language, since it standardizes your details for their paperwork.", status: "partially_sourced" },
      { tip: "Hong Kong issues its own IDPs under the 1949 Geneva Convention format, valid for one year from issue.", status: "confirmed" },
      { tip: "Hong Kong drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so you have it ready either way.",
    ctaHint: { label: "Prepare my IDP for Hong Kong", href: "/apply?destination=Hong Kong" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Hong Kong's roads are dense and strictly enforced, with numerous toll tunnels and one of the world's most efficient public transport networks as a genuine alternative to driving.",
    points: [
      { tip: "Speed limits are typically 50 km/h on urban streets, rising to 70-80 km/h on major roads and up to 100-110 km/h on some expressways.", status: "partially_sourced" },
      { tip: "Cross-harbour tunnels between Hong Kong Island and Kowloon charge time-varying tolls, roughly HK$20 to HK$60 for a private car.", status: "partially_sourced" },
      { tip: "Most rental cars come fitted with an electronic toll tag, with tunnel charges generally billed to you automatically after your trip.", status: "partially_sourced" },
      { tip: "On-street parking is metered and time-limited in most urban areas, and illegally parked cars are ticketed or towed.", status: "partially_sourced" },
      { tip: "Hong Kong's drink-driving limit is strictly enforced, with significant penalties for exceeding it.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental exists in Hong Kong, but it isn't the typical way visitors get around — most rental offices are in the city rather than at the airport, since public transport already covers the urban core well.",
    points: [
      { tip: "Hong Kong International Airport has no on-site rental car counters — most providers operate from offices in Kowloon or on Hong Kong Island instead.", status: "partially_sourced" },
      { tip: "Rental companies commonly require drivers to be at least 25 and to have held a licence for 1-2 years, even though the legal minimum driving age is 18.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if your licence needs one, your passport, and a credit card for the deposit.", status: "partially_sourced" },
      { tip: "A rental car is most useful for reaching the New Territories or North Lantau — Hong Kong Island and Kowloon are usually faster and cheaper by train.", status: "partially_sourced" },
      { tip: "Confirm whether tunnel tolls and any admin fees are already included in your rental quote before you book.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your IDP if your licence needs one, together as your standard document set any time you're driving in Hong Kong.",
    points: [
      { tip: "Your original licence, and your IDP if your licence isn't in English or Chinese, should be kept together and accessible.", status: "confirmed" },
      { tip: "Your passport is also worth carrying, since it confirms your entry date and the 12-month window you're allowed to drive within.", status: "partially_sourced" },
      { tip: "Hong Kong's traffic enforcement is consistent and strict, particularly around speeding and drink-driving.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving across the Hong Kong-Zhuhai-Macao Bridge into mainland China is a separate, complex process built around Hong Kong-registered vehicles and residents, not something available through a standard tourist rental car and IDP.",
    points: [
      { tip: "Private cars crossing into mainland China via the bridge need a Closed Road Permit from Hong Kong's Transport Department and a Mainland Approval Notice from Guangdong authorities, arranged well in advance.", status: "confirmed" },
      { tip: "This process is built around Hong Kong-registered vehicles and residents, not short-term visitors or rental cars.", status: "partially_sourced" },
      { tip: "Most Hong Kong rental agreements don't permit taking the vehicle into mainland China at all — confirm this directly with your rental provider if it matters to your trip.", status: "partially_sourced" },
      { tip: "Crossing by train, ferry, or coach is the more practical option for most visitors wanting to see mainland China or Macau.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, only covers driving within Hong Kong — it has no bearing on mainland Chinese driving rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares the document for driving within Hong Kong — cross-border vehicle permits into mainland China are handled entirely separately, through Hong Kong and Guangdong authorities.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Hong Kong Island (Central & Causeway Bay)", note: "Dense traffic and limited, expensive parking make this one of the least car-friendly parts of Hong Kong — the MTR is usually faster, with a car more useful for airport or cross-harbour transfers.", status: "partially_sourced" },
    { name: "Kowloon (Tsim Sha Tsui)", note: "Similarly congested and well served by the MTR — driving here mainly makes sense for reaching a hotel or continuing into the New Territories rather than for sightseeing.", status: "partially_sourced" },
    { name: "New Territories (Sai Kung)", note: "Hong Kong's most genuinely self-drive-friendly area, with scenic countryside roads and lighter MTR coverage than the urban core.", status: "partially_sourced" },
    { name: "Lantau Island (Disneyland & Tung Chung)", note: "Reachable by ordinary road via the North Lantau Highway, though South Lantau's roads to Tai O and the Big Buddha are closed roads requiring a separate local permit not available to visiting self-drive tourists.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "999 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Hong Kong?",
      answer: "Not always. Hong Kong lets visitors drive on a valid foreign licence alone for up to 12 months, as long as it's in English or Chinese. If your licence isn't in English or Chinese, an IDP is required. ApplyIDPOnline helps you prepare an IDP either way, so you're covered whichever situation applies to you.",
    },
    {
      question: "Can I really drive in Hong Kong on just my home licence, with no IDP at all?",
      answer: "Yes, if your licence is already in English or Chinese and remains valid for the length of your stay — Hong Kong's Transport Department confirms visitors can drive on a foreign licence alone for up to 12 months from their last entry. Many travellers still choose to carry an IDP anyway, since it's a standardized document that's easy for staff and officials to read.",
    },
    {
      question: "Will rental companies still ask for an IDP even if it's not legally required for me?",
      answer: "Often, yes. Even when Hong Kong law doesn't strictly require one, individual rental companies commonly ask for an IDP alongside your original licence, since it standardizes your details for their paperwork. It's worth having one ready regardless of your legal minimum.",
    },
    {
      question: "Is Hong Kong's IDP requirement the same 1949 Geneva Convention format as other countries?",
      answer: "Yes — Hong Kong issues its own IDPs under the 1949 Geneva Convention format, and this is the format a standard IDP application covers by default.",
    },
    {
      question: "Can I rent a car at Hong Kong International Airport?",
      answer: "Not directly on-site — Hong Kong International Airport doesn't have rental car counters in the terminal. Most rental providers operate from offices in Kowloon or on Hong Kong Island, so plan for a short transfer to pick up your car.",
    },
    {
      question: "What side of the road does Hong Kong drive on?",
      answer: "Hong Kong drives on the left, with the driver's seat on the right side of the vehicle — the same convention as Thailand, Japan, and the United Kingdom.",
    },
    {
      question: "Do I need to pay tolls for Hong Kong's tunnels and bridges?",
      answer: "Yes, if you use them. Cross-harbour tunnels between Hong Kong Island and Kowloon charge time-varying tolls, and most rental cars come fitted with an electronic toll tag that bills charges to you automatically after your trip — worth confirming with your rental company before you set off.",
    },
    {
      question: "Can I drive from Hong Kong into mainland China in my rental car?",
      answer: "Realistically, no. Crossing the Hong Kong-Zhuhai-Macao Bridge by private car requires a Closed Road Permit and mainland approvals built around Hong Kong-registered vehicles and residents, and most rental agreements don't allow the car to leave Hong Kong at all. Train, ferry, or coach is the practical option for most visitors wanting to see mainland China or Macau.",
    },
    {
      question: "Can I drive to see the Big Buddha and Tai O on Lantau Island myself?",
      answer: "Not in a typical self-drive rental. The roads to Tai O, Ngong Ping, and Mui Wo on South Lantau are closed roads under a permit scheme that isn't set up for visiting tourists. North Lantau — including Disneyland and Tung Chung — is on ordinary open roads and doesn't have this restriction.",
    },
    {
      question: "Is it worth renting a car for Hong Kong Island or Kowloon?",
      answer: "For most visitors, not really — both areas are dense, traffic-heavy, and well served by the MTR, which is usually faster and cheaper than driving. A rental car becomes more useful once you're heading out to the New Territories or North Lantau.",
    },
    {
      question: "Where can I park in Hong Kong's city areas?",
      answer: "On-street parking is metered and time-limited in most urban areas, and illegally parked cars are ticketed or towed. Commercial car parks at malls and hotels are generally the more practical option for visitors.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Hong Kong?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Hong Kong. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Hong Kong?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Driving in Hong Kong for holders of a driving licence issued outside Hong Kong",
      url: "https://www.td.gov.hk/en/public_services/licences_and_permits/driving_licences/how_to_apply_for_a_driving_licence/driving_in_hong_kong_for_overseas_driving_licence_/index.html",
      organization: "Transport Department, Hong Kong SAR Government",
    },
    {
      label: "\"Driving on Lantau Island\" Scheme",
      url: "https://www.gov.hk/en/residents/transport/roadandtraffic/lantaupermit.htm",
      organization: "GovHK — Hong Kong SAR Government",
    },
    {
      label: "Hong Kong-Zhuhai-Macao Bridge — Private Cars",
      url: "https://www.hzmb.gov.hk/en/private-cars.html",
      organization: "Hong Kong-Zhuhai-Macao Bridge Authority",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["singapore", "japan", "thailand", "vietnam"],

  primaryKeyword: "international driving permit hong kong",
  secondaryKeywords: [
    "idp hong kong",
    "international driving licence hong kong",
    "driving in hong kong",
    "hong kong car rental",
    "lantau island driving",
    "new territories self drive",
    "hong kong tunnel toll",
    "cross harbour tunnel",
    "hong kong airport car rental",
    "hong kong zhuhai macau bridge",
    "sai kung driving",
    "hong kong left hand driving",
  ],
  metaTitle: "International Driving License Hong Kong: Rental Car Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "An English or Chinese licence is technically enough on its own for 12 months, but most rental counters ask for an IDP as a standard condition regardless.",
};
