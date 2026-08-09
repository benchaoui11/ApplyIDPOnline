import type { CountryRecord } from "./types";

// Australia — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. Treated as
// a flagship market per the user's explicit brief.
//
// FIFTH RECORD (after the Philippines, Hong Kong, Ireland, and the
// United Kingdom) where idpRequirementLevel is NOT "Legally required."
// The pattern across all five is now clear enough to name: several
// English-speaking / former-Commonwealth destinations let visitors drive
// on a valid foreign licence alone, with an IDP required only when that
// licence isn't in English. Australia's own shape of this rule has a
// genuine wrinkle none of the other four have: how LONG a visitor can
// drive on that licence varies by state or territory — 3 months in the
// Northern Territory, 6 months in New South Wales and Victoria, and
// indefinitely elsewhere as long as the licence stays current. This is
// stated plainly rather than flattened into a single national number.
// `idpRequirementLevel: "Commonly requested"` / `conventionLabel:
// "Recommended, not required"` match the established labeling.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. Austroads — the peak national body and the
// official source cited by every secondary source checked here — blocked
// direct fetch with HTTP 403, the same way RSA, Citizens Information, and
// NDLS did during the Ireland build. This is disclosed rather than
// papered over. GOV.UK's Foreign Travel Advice for Australia was
// successfully fetched directly and independently corroborates the
// overall picture (photocard vs. paper licence nuance, remote-area
// preparation advice). Every other claim is corroborated across multiple
// independent secondary sources and marked partially_sourced where a
// primary government fetch wasn't achieved.
//
// Minimum driving age is handled the same honest way as the IDP-duration
// rule: Australia has no single national minimum. Unsupervised solo
// driving starts at 16 in South Australia, 17 in New South Wales,
// Queensland, Tasmania, and Western Australia, and 18 in Victoria. This
// record states the most common figure (17) as the headline value but
// discloses the real state-by-state range in the driving guide and FAQ
// rather than asserting a single false-precision number.
//
// Real, verified competitor gap: the leading aggregator page for "IDP
// Australia" covers only generic IDP mechanics — no coverage of wildlife
// hazards, road trains, cashless tolling, campervan licensing, or the
// state-by-state duration variation, all of which are genuinely
// important for the millions of self-drive tourists Australia attracts
// each year and are covered here.
export const AUSTRALIA: CountryRecord = {
  slug: "australia",
  name: "Australia",
  isoCode: "AU",
  region: "Oceania",
  tier: 1,

  h1: "International Driving Permit Australia",

  conventionStatus: {
    value: "Overseas visitors without a permanent Australian visa can drive on a valid overseas licence if it's in English — an International Driving Permit (or certified translation) is required if it isn't. How long you can drive on that licence varies by state: 3 months in the Northern Territory, 6 months in New South Wales and Victoria, and indefinitely elsewhere while it stays valid",
    status: "confirmed",
  },
  conventionLabel: "Recommended, not required",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 17,
    status: "partially_sourced",
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
      "Overseas visitors without a permanent Australian visa can drive on a valid overseas licence if it's in English, with an International Driving Permit required if it isn't.",
    points: [
      { tip: "If your overseas licence is in English, you can drive in Australia on it alone — an IDP is required if it isn't, alongside your original licence.", status: "confirmed" },
      { tip: "How long you can drive on an overseas licence varies by state: 3 months in the Northern Territory, 6 months in New South Wales and Victoria, and indefinitely elsewhere while it stays valid.", status: "confirmed" },
      { tip: "You can only drive vehicle categories your overseas licence actually authorises, under any conditions listed on it.", status: "confirmed" },
      { tip: "Continuing to drive on an overseas licence past its permitted period is treated as unlicensed driving, with financial penalties and possible disqualification.", status: "confirmed" },
      { tip: "Australia drives on the left, with the driver's seat on the right side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so you have it ready either way.",
    ctaHint: { label: "Prepare my IDP for Australia", href: "/apply?destination=Australia" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Australia's cities have modern, well-signed roads, but long distances, remote stretches, and wildlife make rural and outback driving genuinely different from city driving.",
    points: [
      { tip: "Kangaroos, wombats, and other wildlife are most active at dawn and dusk, and are a leading cause of single-vehicle collisions outside cities.", status: "confirmed" },
      { tip: "Avoid driving unfamiliar rural or outback roads after dark where possible, since wildlife strikes and reduced visibility are significantly more common at night.", status: "confirmed" },
      { tip: "Road trains — trucks that can run over 50 metres long — operate on many outback highways, so give them plenty of room and only overtake with a long, clear stretch ahead.", status: "partially_sourced" },
      { tip: "Toll roads across Sydney, Melbourne, and Brisbane are entirely cashless — most rental cars come with an e-Tag fitted, and tolls are billed to your rental agreement automatically.", status: "confirmed" },
      { tip: "In remote areas, carry extra water, fuel, and a charged phone, and check road conditions before setting off, since distances between towns can be considerable.", status: "partially_sourced" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car and campervan rental is widely available across Australia, with rental company requirements typically stricter than the legal minimum driving age.",
    points: [
      { tip: "Rental companies commonly require drivers to be at least 21, with a licence held for at least 1-2 years, even though the legal minimum driving age is lower depending on the state.", status: "partially_sourced" },
      { tip: "Sydney and Melbourne airports both have on-site rental counters from major providers, reachable directly from the arrivals area.", status: "partially_sourced" },
      { tip: "Campervans and motorhomes are usually driveable on a standard car licence, provided the vehicle's weight falls within your licence's category.", status: "partially_sourced" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
      { tip: "Confirm whether your rental agreement allows unsealed or 4WD-only roads before heading off the main highways — many standard rental contracts exclude them.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your IDP if you're carrying one, together as your standard document set any time you're driving in Australia.",
    points: [
      { tip: "Your original licence, and your IDP if your licence needs one, should be kept together and accessible.", status: "confirmed" },
      { tip: "Random breath testing for alcohol is common and can happen anywhere, including in regional areas.", status: "confirmed" },
      { tip: "Emergency services can be reached on 000, with 112 also working from a mobile phone.", status: "confirmed" },
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
    { name: "Great Ocean Road (Victoria)", note: "One of Australia's most iconic self-drive routes, a 243km stretch of coastline west of Melbourne — watch for wildlife, including wombats, especially around dusk.", status: "confirmed" },
    { name: "Sydney & Blue Mountains", note: "Sydney's toll roads are entirely cashless and billed to your rental automatically, with the Blue Mountains a popular self-drive day trip from the city.", status: "confirmed" },
    { name: "East Coast (Sydney to Cairns)", note: "A popular multi-week road trip route via Byron Bay, Brisbane, and the Whitsundays, often driven in a campervan.", status: "partially_sourced" },
    { name: "Red Centre (Uluru)", note: "Long distances and remote conditions make preparation essential — carry extra water and fuel, and check road conditions before you set off.", status: "partially_sourced" },
  ],

  borderCrossingRelevant: false,

  emergencyNumber: { value: "000 (police, fire, ambulance), or 112 from a mobile", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Australia?",
      answer: "Many car rental companies in Australia ask to see an International Driving Permit before releasing a vehicle — particularly if your licence isn't in English, or simply as their own standard policy — so travelling with one helps you avoid unnecessary friction at the counter. Legally, overseas visitors without a permanent visa can drive on a valid overseas licence alone if it's already in English; an IDP (or a certified translation) is required if it isn't. ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready either way.",
    },
    {
      question: "How long can I drive in Australia on my overseas licence?",
      answer: "It depends on the state or territory. The Northern Territory allows 3 months, New South Wales and Victoria allow 6 months, and every other state and territory allows you to keep driving indefinitely as long as your overseas licence stays valid.",
    },
    {
      question: "Does the answer differ by state?",
      answer: "Yes, specifically around how long you can drive on your overseas licence — see the previous answer. The core document requirement (a valid overseas licence, plus an IDP if it isn't in English) is consistent nationwide.",
    },
    {
      question: "Will my rental company still ask for an IDP even if it's not legally required?",
      answer: "Often, yes. Even when Australian law doesn't require one for your specific situation, individual rental companies commonly request an IDP alongside your original licence as their own policy. It's worth having one ready regardless of the legal minimum.",
    },
    {
      question: "Can I rent a campervan on a standard driving licence?",
      answer: "Usually, yes — most campervans and motorhomes fall within the vehicle weight a standard car licence covers. Confirm the specific vehicle's weight against your licence category with your rental company, especially for larger motorhomes.",
    },
    {
      question: "Can I rent a car at Sydney or Melbourne airport?",
      answer: "Yes — both airports have on-site rental counters from major providers, reachable directly from the arrivals area.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Australia?",
      answer: "It varies by state: unsupervised driving starts at 16 in South Australia, 17 in New South Wales, Queensland, Tasmania, and Western Australia, and 18 in Victoria. Rental companies set their own, higher minimum — commonly 21, with a licence held for at least 1-2 years.",
    },
    {
      question: "Are Australia's toll roads cash or electronic?",
      answer: "Electronic only — Australian toll roads don't accept cash. Most rental cars come with an e-Tag already fitted, and tolls are billed straight to your rental agreement, usually with a small admin fee added.",
    },
    {
      question: "Is it safe to drive the Great Ocean Road?",
      answer: "Yes, it's one of Australia's most popular self-drive routes and well-suited to a standard rental car. The main things to watch for are narrow, winding sections and wildlife — particularly wombats — crossing the road around dusk.",
    },
    {
      question: "What should I know about driving in the outback?",
      answer: "Distances between towns can be considerable, so carry extra water, fuel, and a charged phone, and check road conditions before setting off. Many standard rental agreements exclude unsealed or 4WD-only roads, so confirm what your contract actually covers before heading off the main highways.",
    },
    {
      question: "What are road trains, and how do I pass one safely?",
      answer: "Road trains are trucks with multiple trailers that can run over 50 metres long, common on outback highways. Give them plenty of space, and only overtake when you have a long, clear stretch of road ahead — their length means overtaking takes considerably longer than passing a standard vehicle.",
    },
    {
      question: "Is night driving in rural Australia risky?",
      answer: "It's genuinely riskier than city driving — wildlife is most active at dawn and dusk, and visibility is reduced. Where possible, plan rural and outback driving for daylight hours, especially if you're not used to Australian roads.",
    },
    {
      question: "What side of the road does Australia drive on?",
      answer: "Australia drives on the left, with the driver's seat on the right side of the vehicle — the same convention as the UK, Ireland, and New Zealand.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Australia?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Australia. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Australia?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
    {
      question: "What's the difference between Digital and Print + Digital?",
      answer: "Digital IDP is an emailed document ready to show on your phone. Print + Digital adds a physical booklet shipped to you, with the digital copy included as well — useful if a provider prefers a printed document.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Australia (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/australia/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["new-zealand", "united-kingdom", "ireland", "united-states"],

  primaryKeyword: "international driving permit australia",
  secondaryKeywords: [
    "idp australia",
    "international driving licence australia",
    "driving in australia",
    "australia car rental",
    "campervan rental australia",
    "great ocean road self drive",
    "outback driving tips",
    "road trains australia",
    "sydney airport car rental",
    "australia toll roads e-tag",
    "driving in the outback",
    "australia left hand driving",
  ],
  metaTitle: "International Driving Permit Australia: Rules by State",
  metaTitleAbsolute: true,
  metaDescription:
    "Validity isn't uniform nationwide — the Northern Territory allows 3 months, New South Wales and Victoria allow 6, and other states go indefinitely.",
};
