import type { CountryRecord } from "./types";

// New Zealand — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. Treated as
// a flagship market per the user's explicit brief.
//
// SEVENTH RECORD (after the Philippines, Hong Kong, Ireland, the United
// Kingdom, Australia, and Canada) where idpRequirementLevel is NOT
// "Legally required." New Zealand Transport Agency (NZTA / Waka Kotahi),
// fetched directly, confirms visitors can drive on a valid overseas car
// licence for up to 18 months from last entry, with an IDP required only
// if that licence isn't in English (an approved English translation is
// an accepted alternative). `idpRequirementLevel: "Commonly requested"`
// / `conventionLabel: "Recommended, not required"` match the established
// labeling for this pattern.
//
// A genuinely time-sensitive fact, current as of this record's
// verification date (2026-08-02): NZTA's own page states the 18-month
// window is being REDUCED to 12 months, effective 1 November 2026 — three
// months out at the time of writing. This is stated plainly as an
// upcoming change, not glossed over as if the 18-month rule were
// permanent.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. NZTA's own "Driving on NZ roads" page was
// directly fetched and is the primary citation for the IDP/duration
// rules. Practical details (rental age norms, ferry logistics, snow
// chain requirements on named alpine passes) are corroborated across
// multiple independent secondary sources and marked partially_sourced
// where a primary fetch wasn't independently achieved.
//
// FLAG VERIFICATION (per explicit user mandate for this build): the
// existing NewZealandFlag component was audited BEFORE this record was
// written, not assumed correct. It used approximate, uniformly-sized
// stars in a symmetric cross at arbitrary positions — inaccurate on
// every count the user flagged. It has been rebuilt from the exact
// geometric construction specified in the New Zealand Gazette (27 June
// 1902): star positions, the deliberate 82° (not 90°) short-limb angle,
// individual star sizes (5/60, 6/60, 6/60, 7/60 of the flag's hoist), and
// the 1/120-hoist white border width are all reproduced from that
// primary specification, not estimated. See the comment on
// NewZealandFlag in flagIcons.tsx for the full derivation.
export const NEW_ZEALAND: CountryRecord = {
  slug: "new-zealand",
  name: "New Zealand",
  isoCode: "NZ",
  region: "Oceania",
  tier: 1,

  h1: "International Drivers License New Zealand",

  conventionStatus: {
    value: "New Zealand lets visitors drive on a valid overseas car licence for up to 18 months from their last entry, with an International Driving Permit (or an approved English translation) needed only if that licence isn't in English. This 18-month window reduces to 12 months from 1 November 2026",
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
    value: "Left",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "New Zealand lets visitors drive on a valid overseas licence for up to 18 months, with an International Driving Permit needed only if that licence isn't in English.",
    points: [
      { tip: "Visitors can currently drive on a valid overseas car licence for up to 18 months from their last entry into New Zealand — this reduces to 12 months from 1 November 2026.", status: "confirmed" },
      { tip: "An International Driving Permit is required only if your overseas licence isn't in English; an approved English translation is an accepted alternative.", status: "confirmed" },
      { tip: "Motorcycle and truck licences follow a shorter 12-month window regardless of language.", status: "confirmed" },
      { tip: "You must carry your current overseas licence with you at all times while driving, alongside your IDP if you need one.", status: "confirmed" },
      { tip: "New Zealand drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so you have it ready either way.",
    ctaHint: { label: "Prepare my IDP for New Zealand", href: "/apply?destination=New Zealand" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "New Zealand's roads are well maintained but mostly two-lane, and mountain passes, one-lane bridges, and gravel stretches make rural driving slower and more demanding than many visitors expect.",
    points: [
      { tip: "One-lane bridges are common, especially in the South Island — a sign indicates which direction has priority, and it's the law to give way accordingly.", status: "confirmed" },
      { tip: "Gravel roads appear in rural areas, so slow down and drive with extra caution, since traction and stopping distance both change.", status: "confirmed" },
      { tip: "Snow chains are legally required on several alpine routes in winter, including the Milford Road, Lindis Pass, Crown Range, Lewis Pass, and Arthur's Pass, with fines for non-compliance when chain signage is active.", status: "confirmed" },
      { tip: "Mountain passes can be affected by snow and ice outside the depths of winter too — check conditions before driving routes like the Crown Range or Milford Road.", status: "partially_sourced" },
      { tip: "Distances that look short on a map often take longer than expected, since much of the network is two-lane road through hills and small towns.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car and campervan rental is one of the most popular ways to see New Zealand, with rental company requirements typically stricter than the legal minimum driving age.",
    points: [
      { tip: "The legal minimum driving age is 16, but rental companies commonly require drivers to be at least 21, with a young-driver surcharge often applied under 25.", status: "confirmed" },
      { tip: "Auckland and Christchurch airports both have rental counters from major providers reachable directly from the arrivals area.", status: "partially_sourced" },
      { tip: "The Interislander and Bluebridge ferries carry vehicles, including campervans, across Cook Strait between the North and South Islands — book ahead, especially in peak season.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
      { tip: "If touring in winter, ask whether your rental includes snow chains for alpine routes, since several passes legally require them.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your IDP if you're carrying one, together as your standard document set any time you're driving in New Zealand.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible.", status: "confirmed" },
      { tip: "You must not have been disqualified or suspended from driving in New Zealand, and shouldn't have obtained a New Zealand licence since you last entered the country.", status: "confirmed" },
      { tip: "Emergency services can be reached on 111 nationwide.", status: "confirmed" },
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
    { name: "Milford Sound Road (Fiordland)", note: "One of New Zealand's most scenic drives from Queenstown or Te Anau, fully sealed and suitable for campervans, though snow chains are required on this route in winter.", status: "confirmed" },
    { name: "Queenstown & the Crown Range", note: "New Zealand's self-drive hub, with the high-altitude Crown Range road to Wanaka among the routes that can require snow chains in winter.", status: "confirmed" },
    { name: "Franz Josef & Fox Glacier (West Coast)", note: "A scenic stretch of State Highway 6 connecting glacier access points, popular on longer South Island road trips.", status: "partially_sourced" },
    { name: "Bay of Islands (Northland)", note: "A popular North Island road trip from Auckland, with a more relaxed coastal driving pace than the mountain routes further south.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "111 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in New Zealand?",
      answer: "Many New Zealand rental companies ask to see an International Driving Permit before releasing a vehicle — particularly if your licence isn't in English, or simply as their own standard policy — so travelling with one helps you avoid unnecessary friction at the counter. Legally, NZTA confirms visitors can drive on a valid overseas licence alone if it's already in English; an IDP or approved translation is needed only if it isn't. ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready either way.",
    },
    {
      question: "How long can I drive in New Zealand on my overseas licence?",
      answer: "Currently up to 18 months from your last entry into New Zealand, for a car licence. Motorcycle and truck licences are limited to 12 months.",
    },
    {
      question: "Is the 18-month rule changing?",
      answer: "Yes — from 1 November 2026, the window for driving on an overseas car licence reduces from 18 months to 12 months from your last entry date. If your trip falls close to that date, it's worth checking which rule applies to you.",
    },
    {
      question: "Will my rental company still ask for an IDP even if it's not legally required?",
      answer: "Often, yes. Even when NZTA doesn't require one for your specific situation, individual rental companies commonly request an IDP alongside your original licence as their own policy. It's worth having one ready regardless of the legal minimum.",
    },
    {
      question: "Can I rent a car at Auckland or Christchurch airport?",
      answer: "Yes — both airports have rental counters from major providers reachable directly from the arrivals area.",
    },
    {
      question: "How do I get a campervan across Cook Strait between the islands?",
      answer: "The Interislander and Bluebridge ferries both carry vehicles, including campervans, between Wellington and Picton across Cook Strait. Book ahead, especially in peak summer season, as sailings can sell out.",
    },
    {
      question: "What are one-lane bridges, and how do they work?",
      answer: "They're common on New Zealand's rural roads, especially in the South Island — a single lane crosses in both directions, and a sign at each end tells you whether you have priority or need to give way to oncoming traffic.",
    },
    {
      question: "Do I need snow chains to drive in New Zealand?",
      answer: "Not everywhere, but on named alpine routes in winter, yes — the Milford Road, Lindis Pass, Crown Range, Lewis Pass, and Arthur's Pass all legally require chains when signage indicates conditions call for them, with fines for driving up without a fitted set.",
    },
    {
      question: "Is the drive from Queenstown to Milford Sound difficult?",
      answer: "Not technically — the road is fully sealed and suitable for standard rental cars and campervans. It's simply long (around 290 km each way, roughly four and a half hours), so most visitors treat it as a full day trip or an overnight stop in Te Anau rather than a quick there-and-back.",
    },
    {
      question: "What should I know about gravel roads?",
      answer: "You'll encounter them in rural parts of New Zealand — slow down and increase your following distance, since braking and cornering both behave differently on gravel than on sealed roads.",
    },
    {
      question: "Are New Zealand's driving distances longer than they look on a map?",
      answer: "Often, yes — much of the road network is two-lane and winds through hills, small towns, and mountain passes, so journeys typically take longer than the same distance would on a motorway. Build extra time into your itinerary rather than relying on a straight-line estimate.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in New Zealand?",
      answer: "The legal minimum driving age is 16. Rental companies set their own, higher minimum — commonly 21, with a young-driver surcharge often applied under 25.",
    },
    {
      question: "What side of the road does New Zealand drive on?",
      answer: "New Zealand drives on the left, with the driver's seat on the right side of the vehicle — the same convention as Australia and the United Kingdom.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in New Zealand?",
      answer: "Yes. You can submit your application fully online even after you've arrived in New Zealand. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in New Zealand?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Driving on NZ roads — visitors and new residents",
      url: "https://www.nzta.govt.nz/travelling-on-our-roads/visitors-and-new-residents/driving-on-nz-roads",
      organization: "NZ Transport Agency Waka Kotahi",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["australia", "united-kingdom", "ireland", "canada"],

  primaryKeyword: "international driving permit new zealand",
  secondaryKeywords: [
    "idp new zealand",
    "international driving licence new zealand",
    "driving in new zealand",
    "new zealand campervan rental",
    "milford sound driving",
    "queenstown road trip",
    "one lane bridges new zealand",
    "snow chains new zealand",
    "interislander ferry car",
    "auckland airport car rental",
    "new zealand gravel roads",
    "new zealand left hand driving",
  ],
  metaTitle: "IDP New Zealand: Licence Validity Rules",
  metaTitleAbsolute: true,
  metaDescription:
    "The current 18-month window on a foreign licence shortens to 12 months from 1 November 2026 — a change worth checking before you book a longer trip.",
};
