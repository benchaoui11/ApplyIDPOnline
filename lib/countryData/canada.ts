import type { CountryRecord } from "./types";

// Canada — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. Treated as
// a flagship market per the user's explicit brief.
//
// SIXTH RECORD (after the Philippines, Hong Kong, Ireland, the United
// Kingdom, and Australia) where idpRequirementLevel is NOT "Legally
// required." Canada recognizes a valid foreign driving licence for
// visitors, with an IDP (or certified translation) needed only if that
// licence isn't in English or French. Like Australia, the DURATION a
// visitor can drive on that licence is set province by province rather
// than nationally — and Canada's spread is wider than Australia's: 60
// days in Ontario, 3 months in Manitoba, 6 months in British Columbia and
// Quebec, and up to a year in Alberta. This is stated plainly rather than
// flattened into one number. `idpRequirementLevel: "Commonly requested"`
// / `conventionLabel: "Recommended, not required"` match the established
// labeling for this now clearly recurring pattern.
//
// A genuinely important, Canada-specific fact not seen in any other
// record so far: only the Canadian Automobile Association (CAA) is
// authorized to issue Canadian IDPs, under a UN-approved mandate — but
// that fact concerns CANADIANS travelling abroad, not foreign visitors
// coming to Canada, whose IDP would be issued by their own home country's
// authorized body instead. This record states that distinction clearly
// rather than letting it create confusion.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. Two official sources were directly fetched:
// GOV.UK's Foreign Travel Advice for Canada (which corroborates the
// province-by-province IDP/duration picture, winter highway closures,
// and wildlife guidance) and travel.gc.ca's own International Driving
// Permit page — the latter is disclosed honestly as covering Canadians
// driving ABROAD, not foreign visitors driving in Canada, the same
// wrong-direction government-portal pattern already documented in
// India's and the Philippines' records. Every other claim is corroborated
// across multiple independent secondary sources and marked
// partially_sourced where a primary fetch wasn't achieved.
export const CANADA: CountryRecord = {
  slug: "canada",
  name: "Canada",
  isoCode: "CA",
  region: "Americas",
  tier: 1,

  h1: "International Driving Permit Canada",

  conventionStatus: {
    value: "Canada recognizes a valid foreign driving licence for visitors, with an International Driving Permit (or certified translation) needed if it isn't in English or French. How long you can drive on it varies by province — from 60 days in Ontario up to a year in Alberta — and only CAA is authorized to issue Canadian IDPs for Canadians travelling abroad, a separate question from what visitors to Canada need",
    status: "confirmed",
  },
  conventionLabel: "Recommended, not required",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 16,
    status: "partially_sourced",
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
      "Canada recognizes a valid foreign driving licence for visitors, with an International Driving Permit required if it isn't in English or French, and how long you can drive on it varies by province.",
    points: [
      { tip: "If your foreign licence is in English or French, you can drive in Canada on it alone — an IDP or certified translation is needed if it isn't.", status: "confirmed" },
      { tip: "How long you can drive on a foreign licence varies by province: 60 days in Ontario, 3 months in Manitoba, 6 months in British Columbia and Quebec, and up to a year in Alberta.", status: "confirmed" },
      { tip: "Only the Canadian Automobile Association (CAA) is authorized to issue Canadian IDPs — this applies to Canadians planning to drive abroad, not to visitors coming to Canada.", status: "confirmed" },
      { tip: "Rental companies commonly ask for an IDP regardless of your licence's language, as their own standard policy.", status: "partially_sourced" },
      { tip: "Canada drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so you have it ready either way.",
    ctaHint: { label: "Prepare my IDP for Canada", href: "/apply?destination=Canada" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Canada's highways are well maintained, but winter conditions, long distances, and wildlife make rural and mountain driving genuinely different from city driving.",
    points: [
      { tip: "Winter tires are legally required on Alberta's Icefields Parkway from November 1 to April 1, and recommended or required on many other routes in winter.", status: "confirmed" },
      { tip: "Black ice can form on roads, bridges, and overpasses at temperatures around freezing, and is hardest to spot on bridges and overpasses specifically.", status: "confirmed" },
      { tip: "Moose, deer, and elk are most active at dawn and dusk, and collisions are a genuine hazard on rural highways, especially in Ontario, Alberta, and British Columbia.", status: "confirmed" },
      { tip: "Some highways close temporarily in winter due to snowstorms or avalanches, particularly in Alberta and British Columbia — check conditions before a mountain drive.", status: "confirmed" },
      { tip: "Right turns on a red light are generally permitted after a full stop, except in parts of Quebec — check local signage rather than assuming one national rule.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is widely available across Canada, with rental company requirements typically stricter than the legal minimum driving age.",
    points: [
      { tip: "Rental companies commonly require drivers to be at least 21, with a young-driver surcharge often applied under 25.", status: "partially_sourced" },
      { tip: "Toronto Pearson and Vancouver airports both have on-site rental counters from major providers, reachable directly from the arrivals area.", status: "partially_sourced" },
      { tip: "A Parks Canada pass is required to drive routes like the Icefields Parkway through Banff and Jasper National Parks, available at park gates or online.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
      { tip: "If you plan to cross into the United States, confirm your rental agreement and insurance cover this in writing before you travel.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your IDP if you're carrying one, together as your standard document set any time you're driving in Canada.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible.", status: "confirmed" },
      { tip: "Traffic and safety laws vary by province, including rules like turning right on red — check local signage rather than assuming your home rules apply everywhere.", status: "confirmed" },
      { tip: "Emergency services can be reached on 911 nationwide.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving a rental car between Canada and the United States is common and usually straightforward, but you'll need your rental company's written permission and proof of insurance valid on both sides of the border.",
    points: [
      { tip: "A valid passport is required to cross the border in either direction, even in a rental car.", status: "confirmed" },
      { tip: "Confirm with your rental company in advance that cross-border travel is permitted — most major providers allow it, but require notice and sometimes a cross-border authorization letter.", status: "confirmed" },
      { tip: "US insurance is generally recognized in Canada, and rental companies typically provide a non-resident insurance card to keep in the vehicle as proof.", status: "partially_sourced" },
      { tip: "If renting in Canada to drive into the US, confirm your liability coverage meets the requirements of the specific state you're visiting.", status: "partially_sourced" },
      { tip: "Your IDP requirement, where it applies, covers driving within Canada — US entry and driving requirements are separate.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Canada — cross-border insurance and rental permissions for the US side are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Banff & the Icefields Parkway (Alberta)", note: "One of Canada's most iconic self-drive routes through the Rockies — a Parks Canada pass and, in winter, proper snow tires are both required.", status: "confirmed" },
    { name: "Toronto & Niagara Falls (Ontario)", note: "A popular short self-drive route from Toronto, with your foreign licence valid for 60 days in Ontario before other arrangements apply.", status: "confirmed" },
    { name: "Vancouver & Whistler (British Columbia)", note: "A scenic mountain drive along the Sea-to-Sky Highway, with winter tires strongly recommended for the return leg in snow season.", status: "partially_sourced" },
    { name: "Vancouver Island", note: "A popular ferry-and-drive route reached from Vancouver, with a quieter pace than the mainland's major highways.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "911 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Canada?",
      answer: "Many Canadian rental companies ask to see an International Driving Permit before releasing a car — particularly if your licence isn't in English or French, or simply as their own standard policy — so travelling with one helps you avoid unnecessary friction at the counter. Legally, Canada recognizes a valid foreign licence in English or French alone; an IDP or certified translation is needed only if it's in another language. ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready either way.",
    },
    {
      question: "How long can I drive in Canada on my foreign licence?",
      answer: "It depends on the province: 60 days in Ontario, 3 months in Manitoba, 6 months in British Columbia and Quebec, and up to a year in Alberta. Check the specific rule for wherever you're spending most of your trip.",
    },
    {
      question: "Does the answer differ by province?",
      answer: "Yes, specifically around how long you can drive on your foreign licence — see the previous answer. The core document requirement (a valid foreign licence, plus an IDP if it isn't in English or French) is consistent nationwide.",
    },
    {
      question: "Will my rental company still ask for an IDP even if it's not legally required?",
      answer: "Often, yes. Even when Canadian law doesn't require one for your specific situation, individual rental companies commonly request an IDP alongside your original licence as their own policy. It's worth having one ready regardless of the legal minimum.",
    },
    {
      question: "Can I rent a car at Toronto Pearson or Vancouver airport?",
      answer: "Yes — both airports have on-site rental counters from major providers, reachable directly from the arrivals area.",
    },
    {
      question: "Do I need a pass to drive the Icefields Parkway through Banff?",
      answer: "Yes — a Parks Canada pass is required to drive this route through Banff and Jasper National Parks, available at park gates near Lake Louise, Jasper, and Saskatchewan River Crossing, or online in advance.",
    },
    {
      question: "Are winter tires required in Canada?",
      answer: "On some routes, yes by law — winter tires are mandatory on Alberta's Icefields Parkway from November 1 to April 1, for example. On many other winter roads they're strongly recommended rather than strictly required, but conditions can turn dangerous quickly without them.",
    },
    {
      question: "What should I know about black ice?",
      answer: "Black ice forms on roads at temperatures around freezing and is often invisible until you're on it. It's especially common on bridges and overpasses, which freeze before the road surface does, so slow down earlier than you think you need to when crossing one in cold weather.",
    },
    {
      question: "Are wildlife collisions a real risk on Canadian highways?",
      answer: "Yes, particularly with moose, deer, and elk on rural highways in Ontario, Alberta, and British Columbia. They're most active at dawn and dusk, so extra caution during those hours on rural roads is worthwhile.",
    },
    {
      question: "Can I drive a rental car across the border into the United States?",
      answer: "Usually yes, but confirm it with your rental company first and carry a valid passport. Most major rental providers allow cross-border travel with advance notice, and some require a written cross-border authorization letter — don't rely on a verbal confirmation at the counter.",
    },
    {
      question: "Can I turn right on a red light in Canada?",
      answer: "Generally yes, after a full stop, but this varies — it's restricted in parts of Quebec, particularly on the island of Montreal. Check local signage rather than assuming one nationwide rule applies everywhere.",
    },
    {
      question: "What side of the road does Canada drive on?",
      answer: "Canada drives on the right, with the driver's seat on the left side of the vehicle — the same convention as the United States.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Canada?",
      answer: "It varies by province, generally starting around 16 for a full licence. Rental companies set their own, higher minimum — commonly 21, with a young-driver surcharge often applied under 25.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Canada?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Canada. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Canada?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Canada (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/canada/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "International Driving Permit (for Canadians travelling abroad)",
      url: "https://travel.gc.ca/travelling/documents/international-driving-permit",
      organization: "Government of Canada",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["united-states", "united-kingdom", "ireland", "australia"],

  primaryKeyword: "international driving permit canada",
  secondaryKeywords: [
    "idp canada",
    "international driving licence canada",
    "driving in canada",
    "canada car rental",
    "banff icefields parkway driving",
    "winter driving canada",
    "snow tires canada",
    "black ice driving",
    "toronto pearson car rental",
    "vancouver airport car rental",
    "cross border driving canada usa",
    "canada wildlife crossings",
  ],
  metaTitle: "International Driving Permit Canada: Rules Vary by Province",
  metaTitleAbsolute: true,
  metaDescription:
    "There's no single national validity window — Ontario allows 60 days on a foreign licence alone, while Alberta allows up to a year before other rules apply.",
};
