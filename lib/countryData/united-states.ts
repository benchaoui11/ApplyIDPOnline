import type { CountryRecord } from "./types";

// United States — Tier 1 record, built on Master Country Template v1.0.
// No template/component changes made for this record, only data.
//
// KEYWORD-SHAPE NOTE — the one genuine outlier in this project's keyword
// research: every other country's demand is inbound ("what does a
// foreign visitor need to drive in Country X"). Semrush research for
// this build (phrase_these + phrase_questions, us database) shows US
// demand running almost entirely the other way: "aaa international
// driving permit" alone is 33,100/mo, and "how to get/do i get/where to
// get an international driving permit" variants add tens of thousands
// more — a US-licensed driver asking how to get a permit to drive
// abroad. Only "international driving permit usa" (1,000) and
// "international driving permit united states" (590) represent the
// inbound direction directly. This record is written hybrid — outbound
// content leads (drivingGuide, rentalGuide), inbound content is real and
// present but secondary (roadRulesGuide's state-by-state rules,
// popularDrivingAreas), matching what the data actually shows rather
// than forcing the same inbound-only shape used for every other country.
//
// THE AAA/AATA QUESTION: the FTC's own consumer-protection guidance
// states plainly that AAA and the American Automobile Touring Alliance
// (AATA) are the only two organizations the US government has designated
// to issue IDPs to holders of a US driver's license — and this site's
// own Footer already states, site-wide, that ApplyIDPOnline is "not
// affiliated with AAA, AATA, FIA, AIT, or the United Nations." This
// record states the AAA/AATA fact clearly and prominently (it's the
// single highest-value entity in the whole record) but never pairs
// ApplyIDPOnline's own name with "official," "authorized," or
// "government-approved" — those words describe AAA/AATA only. It uses
// the same "prepares your IDP application" phrasing already used on
// every other country page.
//
// POPULAR DRIVING AREAS: evaluated Route 66 (12,100/mo, the highest-
// volume road-trip entity found), Pacific Coast Highway (4,400), Las
// Vegas car rental (22,200/mo — the dominant rental-specific term
// nationwide), Miami car rental (4,400), New York and Los Angeles car
// rental (1,600 / 1,300), Grand Canyon and Florida road trip (720 each),
// California road trip (1,900), Yellowstone road trip (390). The four
// chosen — Las Vegas, Route 66, Pacific Coast Highway, Miami — combine
// individual volume strength with geographic spread across four
// genuinely distinct American driving regions (Southwest, cross-country,
// West Coast, Southeast). New York and LA were left out despite real
// volume since both skew far more airport-transfer/city-driving than
// road-trip; Grand Canyon, Yellowstone, and general Florida/California
// framing are covered in FAQ and guide content instead, consistent with
// this project's standing rule of exactly four cards.
//
// Sourcing discipline: Semrush's keyword_research tool succeeded this
// build (phrase_these and phrase_questions, us database, the source for
// every volume figure above). The AAA/AATA-sole-issuer fact is
// independently confirmed by both the FTC's own press releases (ftc.gov)
// and USAGov's international-drivers-license page — two primary US
// government sources agreeing, not one commercial aggregator. AAA's own
// published fee/process details were fetched directly from aaa.com;
// AATA's from public search results referencing aataidp.com. The US's
// Geneva-1949-party / Vienna-1968-non-party status is corroborated
// across Wikipedia's own treaty-status pages, consistent with how this
// project sources convention status for every other country.
// State-specific inbound requirements (Georgia, Massachusetts,
// Tennessee) are sourced from a single aggregator without independent
// primary corroboration from those states' own DMV sites, and are marked
// "partially_sourced" accordingly rather than "confirmed."
export const UNITED_STATES: CountryRecord = {
  slug: "united-states",
  name: "United States",
  isoCode: "US",
  region: "Americas",
  tier: 1,

  h1: "International Driving Permit USA",

  conventionStatus: {
    value: "AAA and the American Automobile Touring Alliance (AATA) are the only two organizations the US Department of State has designated to issue International Driving Permits to holders of a valid US driver's license, under the 1949 Geneva Convention on Road Traffic — the United States is not a party to the 1968 Vienna Convention. Foreign visitors driving in the US need an IDP issued by an authorized body in their own home country before arrival; the United States does not issue IDPs to non-US licence holders",
    status: "confirmed",
  },
  conventionLabel: "AAA & AATA Authorized Only",
  idpRequirementLevel: {
    value: "Commonly requested",
    status: "confirmed",
  },
  minimumDrivingAge: {
    value: 16,
    status: "partially_sourced",
  },
  digitalIdpAcceptance: {
    value: "AAA- and AATA-issued permits are physical booklets only — neither organization currently offers a digital version. Acceptance of a digital IDP abroad can vary by destination country and rental provider — confirm before your trip.",
    status: "confirmed",
  },

  drivingSide: {
    value: "Right",
    status: "confirmed",
  },

  drivingGuide: {
    label: "Driving",
    directAnswer:
      "AAA and AATA are the only two organizations the US Department of State authorizes to issue a genuine International Driving Permit to US license holders, and Apply IDP Online prepares your IDP application fully online for either direction of travel.",
    points: [
      { tip: "AAA and the American Automobile Touring Alliance (AATA) are the two organizations the US Department of State has designated to issue IDPs to holders of a valid US driver's license.", status: "confirmed" },
      { tip: "The Federal Trade Commission has warned that any other website claiming to sell or issue a legitimate International Driving Permit to a US license holder is not an authorized source.", status: "confirmed" },
      { tip: "You need to be at least 18 years old and hold a valid, unexpired US driver's license to apply for an IDP.", status: "confirmed" },
      { tip: "Foreign visitors driving in the United States need an IDP issued by an authorized body in their own home country — the United States does not issue IDPs to non-US license holders.", status: "confirmed" },
      { tip: "The United States drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "Apply IDP Online prepares your International Driving Permit application fully online, whether you're a US license holder traveling abroad or a visitor preparing to drive here.",
    ctaHint: { label: "Check my eligibility", href: "#eligibility" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Traffic law in the United States is set state by state, not nationally, so speed limits, phone laws, and IDP expectations can genuinely differ the moment you cross a state line.",
    points: [
      { tip: "Some states, including Georgia, Massachusetts, and Tennessee, specifically expect visiting drivers to carry an International Driving Permit alongside their original license.", status: "partially_sourced" },
      { tip: "Nearly every US rental company requires an IDP if your license isn't printed in the Roman alphabet, regardless of which state you're renting in.", status: "confirmed" },
      { tip: "Most states let a visitor drive on a valid foreign license alone for a short stay, typically up to a few months, before other rules apply — this is set individually by each state's motor vehicle agency, not by federal law.", status: "partially_sourced" },
      { tip: "Speed limits, right-turn-on-red rules, and handheld phone laws vary by state — check the specific states on your route rather than assuming one rule applies everywhere.", status: "confirmed" },
      { tip: "Seatbelt and child-seat laws are enforced in every state, though the exact requirements and fines differ from state to state.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your license details in a standardized, multi-language format that's easier for officers and rental staff to read in any state.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Car rental is straightforward for foreign visitors carrying an IDP in the US, and just as common for Americans renting abroad, who need their own AAA- or AATA-issued permit first.",
    points: [
      { tip: "US rental companies commonly ask foreign visitors for a passport, a valid foreign license, and an IDP, especially if the license isn't in English.", status: "confirmed" },
      { tip: "The minimum age to rent a car in the US is typically 21 to 25 depending on the company, with drivers under 25 often paying a young-renter surcharge.", status: "partially_sourced" },
      { tip: "Renting a car abroad as a US citizen almost always requires the IDP itself alongside your original US license and a credit card in the main driver's name.", status: "confirmed" },
      { tip: "Fuel, toll, and insurance policies differ by rental company on both sides of a trip — confirm coverage directly with your provider before driving off the lot.", status: "confirmed" },
    ],
    solutionNote: "Apply IDP Online prepares the IDP application US rental counters and many international rental counters expect to see alongside your original license.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driver's license and your IDP together as your standard document set any time you're driving in the United States — that applies to visitors and returning residents alike.",
    points: [
      { tip: "Your IDP and original license work as a pair — an officer or rental agent may ask to see both together.", status: "confirmed" },
      { tip: "911 reaches police, fire, and ambulance services anywhere in the United States.", status: "confirmed" },
      { tip: "If you're stopped, keep your hands visible and tell the officer before reaching for your documents — standard guidance regardless of where your license was issued.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP application is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "US citizens generally don't need an IDP to drive into Canada or Mexico on a short visit, which makes the two most common cross-border road trips from the US the two where an IDP actually matters least.",
    points: [
      { tip: "Canada accepts a valid US driver's license alone for visitors, with no IDP required for a typical short stay.", status: "confirmed" },
      { tip: "Mexico similarly allows US license holders to drive across the border on their original license for tourism, without requiring an IDP.", status: "confirmed" },
      { tip: "An IDP still adds value even where it isn't required — it presents your license in a standardized format that's easier for border and rental staff unfamiliar with US state-issued licenses to verify.", status: "confirmed" },
      { tip: "Rental cars picked up in the US often cannot be driven across the Canadian or Mexican border under the rental agreement — confirm this specifically with your provider before planning a cross-border route.", status: "confirmed" },
    ],
    solutionNote: "For destinations beyond Canada and Mexico, Apply IDP Online prepares the IDP application most other countries and rental counters expect to see.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original license — it doesn't grant categories your original license doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Las Vegas", note: "The single strongest car-rental market researched for this record, and the gateway to Southwest road trips including the Grand Canyon.", status: "confirmed" },
    { name: "Route 66", note: "America's classic cross-country road-trip route, the highest-volume self-drive entity researched for this record.", status: "confirmed" },
    { name: "Pacific Coast Highway", note: "California's iconic coastal driving route, anchoring the West Coast self-drive cluster from San Francisco to Los Angeles.", status: "confirmed" },
    { name: "Miami", note: "A strong rental market in its own right and the gateway to Florida's Overseas Highway and the Florida Keys.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "911 (police, fire, ambulance)", status: "confirmed" },

  faq: [
    {
      question: "What is an International Driving Permit (IDP)?",
      answer: "An IDP is a standardized booklet that translates the details on your original driver's license into multiple languages. It's not a license on its own — it's an identity and translation document you carry alongside your valid original license, recognized in roughly 150 countries under the 1949 Geneva Convention on Road Traffic format.",
    },
    {
      question: "Who can apply for a US International Driving Permit?",
      answer: "Anyone at least 18 years old with a valid, unexpired driver's license issued by a US state or territory. You don't need to be a US citizen — a valid US-issued license is what qualifies you, not your citizenship.",
    },
    {
      question: "What's the difference between AAA and AATA?",
      answer: "Both are the only two organizations the US Department of State authorizes to issue a genuine IDP to US license holders — neither is more \"official\" than the other. AAA offers applications online, in person at branches, or by mail, and doesn't require membership to apply. AATA processes applications online only. Fees and processing times differ slightly between the two, so comparing both before applying is worth the few minutes it takes.",
    },
    {
      question: "Do I need to be a AAA member to get an IDP from AAA?",
      answer: "No — AAA processes IDP applications for any eligible US license holder regardless of membership status. Membership isn't a requirement for this specific service.",
    },
    {
      question: "What documents do I need to apply for an International Driving Permit?",
      answer: "A valid, unexpired US driver's license and a passport-style photo are the core requirements across both authorized issuers. AAA's in-person and mail paths ask for two original passport photos; online applications typically use a digital photo upload instead.",
    },
    {
      question: "How much does an International Driving Permit cost?",
      answer: "AAA and AATA both charge in the neighborhood of $20 to $30 for the permit itself, with additional photo-processing and shipping fees depending on how you apply — these are their own published fees, not set by Apply IDP Online, and can change, so confirm the current amount directly with whichever organization you choose before applying.",
    },
    {
      question: "How long does it take to get an International Driving Permit?",
      answer: "Through AAA or AATA directly, processing is commonly a few business days plus shipping time for the physical booklet, faster in person than by mail. Apply IDP Online's own process is separate — a digital document is typically ready in about 8 minutes after successful submission, payment, and approval, with a printed option also available.",
    },
    {
      question: "How long is an International Driving Permit valid?",
      answer: "An IDP is generally valid for one to three years from issue, but only for as long as the original license it's based on also remains valid — whichever comes first. If your underlying US license expires or is suspended, the IDP tied to it is no longer valid either.",
    },
    {
      question: "Is a digital International Driving Permit accepted?",
      answer: "AAA and AATA currently issue physical booklets only — neither offers a digital version. Acceptance of any digital IDP format can vary by destination country and by rental provider, so it's worth confirming with your specific destination or rental company, or choosing a printed option for broader coverage.",
    },
    {
      question: "Which countries recognize a US-issued International Driving Permit?",
      answer: "Roughly 150 countries recognize IDPs issued in the Geneva 1949 Convention format, which is what AAA and AATA both issue. Recognition and local rules still vary by destination, so it's worth checking the specific country you're visiting rather than assuming universal acceptance.",
    },
    {
      question: "What is the Geneva Convention, and why does it matter for a US IDP?",
      answer: "The 1949 Geneva Convention on Road Traffic sets the standardized IDP format the United States uses — it's why a US-issued IDP follows a specific booklet layout recognized across roughly 150 countries rather than a design each country invents independently.",
    },
    {
      question: "Why doesn't the US recognize the 1968 Vienna Convention?",
      answer: "The United States is a party to the 1949 Geneva Convention on Road Traffic but never ratified the later 1968 Vienna Convention on Road Traffic. In practice this means a US-issued Geneva-format IDP isn't automatically valid in a small number of countries that recognize only the Vienna format — worth checking for your specific destination.",
    },
    {
      question: "Can I apply for an International Driving Permit online?",
      answer: "Yes. AAA offers a fully online application path directly, AATA processes applications online only, and Apply IDP Online separately offers a fully online, guided application-assistance process — none of these require an office visit to start.",
    },
    {
      question: "What are the most common mistakes people make when applying for an IDP?",
      answer: "The most common are applying through an unauthorized website that isn't AAA or AATA, submitting a photo that doesn't meet passport-style requirements, applying with a license that will expire before the trip, and assuming every country requires an IDP when some — including Canada and Mexico for US citizens — typically don't.",
    },
    {
      question: "How do I know if an International Driving Permit seller is legitimate?",
      answer: "The Federal Trade Commission has stated plainly that AAA and AATA are the only two organizations the US government has designated to issue IDPs to US license holders. Any other site claiming to be an official or government-authorized issuer for a US license is not one of the two recognized sources — the FTC has issued warning letters over exactly this pattern.",
    },
    {
      question: "Do I need an IDP to drive in Canada or Mexico?",
      answer: "Generally, no. Both countries accept a valid US driver's license alone for a typical short tourist visit, without requiring an IDP. An IDP still isn't a bad idea to carry, since it presents your license in a standardized format border and rental staff may find easier to verify.",
    },
    {
      question: "Do foreign visitors need an IDP to drive in the United States?",
      answer: "It depends on your license and the state you're driving in. Some states specifically expect one, and nearly every rental company will ask for one if your license isn't in English or the Roman alphabet. The United States doesn't issue IDPs to non-US license holders — you need to obtain one from an authorized body in your own home country before you arrive.",
    },
    {
      question: "Does my rental car company require an International Driving Permit?",
      answer: "It depends on the company, the state, and your license. Many US rental companies ask foreign visitors for an IDP as a standard condition, particularly if the license isn't in English — confirming directly with your specific rental provider is the most reliable way to know before you arrive.",
    },
    {
      question: "Does my car insurance cover driving abroad with an IDP?",
      answer: "Not automatically. An IDP is a translation document, not an insurance product, so it doesn't provide or extend coverage on its own. US auto insurance often covers Canada and sometimes Mexico depending on the insurer, but typically doesn't extend to Europe, Asia, or most other destinations — check directly with your insurer and rental company before you travel.",
    },
    {
      question: "What side of the road does the United States drive on?",
      answer: "The United States drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to get an International Driving Permit?",
      answer: "You need to be at least 18 years old and hold a valid US driver's license to apply, regardless of which authorized issuer you use.",
    },
  ],

  sourceCitations: [
    {
      label: "FTC Staff Sends Warning Letters to Online Marketers Claiming to Offer Legitimate Substitutes for International Driving Permits",
      url: "https://www.ftc.gov/news-events/news/press-releases/2012/10/ftc-staff-sends-warning-letters-online-marketers-claiming-offer-legitimate-substitutes-international",
      organization: "Federal Trade Commission",
    },
    {
      label: "International driver's license for US citizens",
      url: "https://www.usa.gov/international-drivers-license",
      organization: "USAGov",
    },
    {
      label: "Driving in the US if you are not a citizen",
      url: "https://www.usa.gov/non-citizen-driving",
      organization: "USAGov",
    },
    {
      label: "International Driving Permit (IDP) vs Driver's License",
      url: "https://www.statefarm.com/simple-insights/auto-and-vehicles/international-drivers-license",
      organization: "State Farm",
    },
  ],
  lastVerifiedDate: "2026-08-06",

  relatedCountrySlugs: ["canada", "mexico", "united-kingdom", "australia"],

  primaryKeyword: "international driving permit usa",
  secondaryKeywords: [
    "international driving permit",
    "international driving permit united states",
    "international driving permit application",
    "how to get an international driving permit",
    "how do i get an international driving permit",
    "where to get an international driving permit",
    "aaa international driving permit",
    "aata international driving permit",
    "american international driving license",
    "us citizen international driving license",
    "international driving permit cost",
    "international driving permit requirements",
    "digital international driving permit",
    "las vegas car rental",
    "route 66 road trip",
  ],
  metaTitle: "International Driving Permit USA: AAA vs AATA Guide",
  metaTitleAbsolute: true,
  metaDescription:
    "The complete guide to getting a US International Driving Permit through AAA or AATA, plus what foreign visitors need to drive legally in the United States.",
};
