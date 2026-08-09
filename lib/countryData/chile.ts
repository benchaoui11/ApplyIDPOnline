import type { CountryRecord } from "./types";

// Chile — Tier 1 record, built on Master Country Template v1.0. No
// template/component changes made for this record, only data. First
// country added to lib/destinations.ts specifically for this build, and
// the first new flag built since Turkey.
//
// LEGAL SHAPE: matches the France/Mexico/Portugal "Commonly requested"
// pattern, not Spain/Italy/Romania/Brazil/Turkey's "Legally required" one.
// Multiple corroborating sources agree tourists can drive in Chile on a
// valid original licence for up to 90 days (GOV.UK confirms a UK
// photocard licence specifically for 3 months), and an International
// Driving Permit isn't strictly mandated by law — but it becomes the
// practical requirement in two overlapping ways: Chilean rule expects a
// licence to be in Spanish or accompanied by a certified translation or
// IDP, and rental agencies — particularly in Santiago and Punta Arenas —
// frequently require one at pickup regardless. `idpRequirementLevel:
// "Commonly requested"` / `conventionLabel: "Recommended for non-Spanish
// licences"`, and every FAQ/directAnswer touching the requirement leads
// with the practical rental-counter outcome before the legal nuance, per
// the standing project rule saved from France.
//
// PATAGONIA & ATACAMA FOCUS (Phase 5's explicit emphasis): this record
// covers the Carretera Austral's largely unpaved surface and four
// required ferry crossings, fuel-planning realities in remote stretches,
// and the advance-notice requirement (commonly two weeks, sometimes
// longer) rental companies impose before allowing a car across the
// Chile–Argentina border — concrete, sourced specifics rather than
// generic "plan ahead" advice.
//
// Sourcing discipline: Semrush API units were exhausted again at the
// start of this build. GOV.UK's Chile safety-and-security travel advice
// was fetched directly and is the primary citation for UK licence
// validity, required tourist documentation, and the seasonal Andes
// border-crossing closures. Secondary sources corroborate the TAG
// electronic-only toll system on Santiago's urban highways, BAC limits,
// speed limits, and destination-specific driving conditions; these are
// marked partially_sourced where a single strong primary citation wasn't
// available.
//
// FLAG VERIFICATION (mandatory per the user's brief): Chile had no
// existing flag component in this codebase, so ChileFlag was built new.
// Colors and layout follow Law 2597 (1912) and Supreme Decree No. 5805
// (1927): white #FFFFFF, red #DA291C, blue #0032A0, equal white/red
// horizontal bands with a blue square canton (matching the white band's
// height) bearing a white five-pointed star, at the flag's official 3:2
// ratio. The star's point geometry is taken directly from the official
// reference construction used on Wikipedia/Wikimedia Commons
// (File:Flag_of_Chile.svg) — a precise five-fold rotational construction
// — rather than a hand-estimated polygon. Verified visually at zoom
// before this record shipped.
export const CHILE: CountryRecord = {
  slug: "chile",
  name: "Chile",
  isoCode: "CL",
  region: "Americas",
  tier: 1,

  h1: "International Driving Permit Chile",

  conventionStatus: {
    value: "Tourists can drive in Chile on a valid original licence for up to 90 days. An International Driving Permit isn't strictly mandated by law, but Chilean practice expects a licence to be in Spanish or accompanied by a certified translation or IDP, and rental agencies — particularly in Santiago and Punta Arenas — frequently require one at pickup regardless",
    status: "confirmed",
  },
  conventionLabel: "Recommended for non-Spanish licences",
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
      "Rental agencies in Chile, particularly in Santiago and Punta Arenas, commonly require an International Driving Permit alongside your original licence, so it's worth carrying one even though Chilean law doesn't strictly mandate it for short stays.",
    points: [
      { tip: "Tourists can drive in Chile on a valid original licence for up to 90 days from entry.", status: "confirmed" },
      { tip: "Chilean practice expects your licence to be in Spanish, or accompanied by a certified translation or an International Driving Permit.", status: "confirmed" },
      { tip: "Rental agencies frequently require an IDP at pickup regardless of your licence's language, especially in Santiago and Punta Arenas.", status: "confirmed" },
      { tip: "An IDP only works together with your valid original licence — it's a translation aid, not a replacement for it.", status: "confirmed" },
      { tip: "Chile drives on the right, with the driver's seat on the left side of the vehicle.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP fully online before you travel, so it's ready before you land.",
    ctaHint: { label: "Prepare my IDP for Chile", href: "/apply?destination=Chile" },
  },

  roadRulesGuide: {
    label: "Road Rules",
    directAnswer: "Santiago's urban highways run on an electronic-only toll system with no cash option, road conditions shift dramatically between paved highways and remote gravel routes, and drink-driving is actively enforced.",
    points: [
      { tip: "Santiago's main urban highways operate exclusively through the electronic TAG toll system, with no toll booths, cash lanes, or card payment at the gantry.", status: "confirmed" },
      { tip: "Most rental cars already carry a working TAG device, billed to you afterward as a flat daily fee rather than per-trip charges.", status: "confirmed" },
      { tip: "Toll roads are increasingly common on intercity routes beyond Santiago as well.", status: "partially_sourced" },
      { tip: "Speed limits are 50 km/h in built-up areas, 100 km/h on rural highways, and 120 km/h on motorways.", status: "partially_sourced" },
      { tip: "Drivers are considered under the influence at a blood alcohol level between 0.3 and 0.8 g/L, with 0.8 g/L or above treated as a more serious offence.", status: "confirmed" },
      { tip: "Carabineros (national police) set up routine roadside checkpoints across the country, including random checks.", status: "confirmed" },
      { tip: "Winter weather between June and September can temporarily close Andes border crossings into Argentina.", status: "confirmed" },
    ],
    solutionNote: "Your IDP presents your licence details in a standardized, multi-language format that's easier for local staff and officials to read.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  rentalGuide: {
    label: "Rental Cars",
    directAnswer: "Self-drive car rental is available at Santiago's international airport and across Chile's main tourist regions, with most providers setting age requirements above the legal minimum.",
    points: [
      { tip: "The legal minimum driving age is 18, but rental companies typically require drivers to be at least 21, often with a young-driver surcharge.", status: "confirmed" },
      { tip: "Santiago's Arturo Merino Benítez International Airport has rental counters from major providers reachable from the arrivals area.", status: "confirmed" },
      { tip: "Adequate insurance, including windscreen coverage, is worth confirming given the cost of repairs on gravel routes like the Carretera Austral.", status: "confirmed" },
      { tip: "Taking a rental car across the Chile–Argentina border requires advance notice to your rental company, commonly at least two weeks, to prepare the necessary documents.", status: "confirmed" },
      { tip: "Typical documents requested at pickup include your original licence, an IDP if applicable, your passport, and a credit card for the deposit.", status: "partially_sourced" },
    ],
    solutionNote: "ApplyIDPOnline prepares the IDP most rental counters expect to see alongside your original licence.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  policeGuide: {
    label: "Police & Roadside Checks",
    directAnswer: "Keep your original driving licence, and your International Driving Permit if you're carrying one, together as your standard document set any time you're driving in Chile.",
    points: [
      { tip: "Your original licence, your IDP if you're carrying one, and your passport should be kept together and accessible at all times.", status: "confirmed" },
      { tip: "Carry proof of your tourist status, such as your entry stamp or tourist card, alongside your driving documents.", status: "confirmed" },
      { tip: "Emergency services across Chile can be reached on 133 for police (Carabineros) or 131 for ambulance.", status: "confirmed" },
    ],
    solutionNote: "A calmly prepared, correctly formatted IDP is the most straightforward way to have your documents ready if you're ever asked.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  borderCrossingGuide: {
    label: "Cross-Border Driving",
    directAnswer: "Driving a rental car from Chile into Argentina is common on routes like San Pedro de Atacama, but it requires advance notice to your rental company and extra insurance, and Andes crossings can close in winter.",
    points: [
      { tip: "Rental companies require advance notice before allowing a car across the Chile–Argentina border — commonly two weeks, sometimes longer for remote crossings like San Pedro de Atacama.", status: "confirmed" },
      { tip: "Crossing usually means extra insurance charges, since standard rental cover often doesn't extend across the border automatically.", status: "confirmed" },
      { tip: "Winter weather between June and September can temporarily close Andes mountain crossings, including popular routes near Santiago and Mendoza.", status: "confirmed" },
      { tip: "Your IDP requirement, where it applies, covers driving within Chile — Argentina has its own separate licence and document rules.", status: "confirmed" },
    ],
    solutionNote: "ApplyIDPOnline prepares your IDP for driving in Chile — cross-border insurance and rental permissions for Argentina are handled separately with your rental provider.",
    ctaHint: { label: "Check your eligibility", href: "#eligibility" },
  },

  motorcycleScooterRelevant: false,
  vehicleCategoryNote: {
    value: "Your IDP lists the vehicle categories shown on your original licence — it doesn't grant categories your original licence doesn't already include.",
    status: "confirmed",
  },
  vehicleCategoryLabel: "Car",

  popularDrivingAreas: [
    { name: "Santiago", note: "Chile's capital and main international gateway, with rental counters at Arturo Merino Benítez Airport — the city's urban highways run entirely on the electronic TAG toll system.", status: "confirmed" },
    { name: "San Pedro de Atacama", note: "Gateway to the Atacama Desert and high-altitude routes toward the Argentina border, with rental counters serving self-drive desert exploring.", status: "confirmed" },
    { name: "Puerto Varas & the Lake District", note: "A volcano-and-lake region in southern Chile reached through Puerto Montt, popular for self-drive touring beyond the main towns.", status: "partially_sourced" },
    { name: "Carretera Austral", note: "A roughly 1,300km route through Patagonia, mostly unpaved gravel south of Coyhaique, requiring four ferry crossings and careful fuel planning.", status: "confirmed" },
  ],

  borderCrossingRelevant: true,

  emergencyNumber: { value: "133 (police), 131 (ambulance)", status: "confirmed" },

  faq: [
    {
      question: "Do I need an International Driving Permit to drive in Chile?",
      answer: "Rental agencies in Chile, particularly in Santiago and Punta Arenas, commonly require an IDP alongside your original licence, so it's worth having one ready even though it isn't strictly mandated by Chilean law for short stays. Chilean practice expects your licence to be in Spanish or accompanied by a certified translation or IDP. ApplyIDPOnline prepares yours fully online before your trip.",
    },
    {
      question: "How long can I drive in Chile on my foreign licence?",
      answer: "Up to 90 days from entry as a tourist. UK photocard licence holders are specifically confirmed valid for 3 months under official guidance.",
    },
    {
      question: "I have a US, Canadian, UK, or Australian licence — do I need an IDP?",
      answer: "Not always strictly by law, but many rental companies expect one regardless of your licence's language or country of issue — without it, you risk being turned away at the counter even if you're technically allowed to drive.",
    },
    {
      question: "What is the TAG toll system in Santiago?",
      answer: "TAG is Santiago's electronic-only toll system on its main urban highways — there are no toll booths, cash lanes, or card payment options at the gantry. Most rental cars already carry a working TAG device, typically billed to you as a flat daily fee.",
    },
    {
      question: "What is the Carretera Austral like to drive?",
      answer: "It's a roughly 1,300km route through Chilean Patagonia, mostly paved in the north but largely unpaved gravel south of Coyhaique. Expect a slower pace, four required ferry crossings, and the need to plan fuel stops carefully in remote stretches.",
    },
    {
      question: "Can I take a rental car from Chile into Argentina?",
      answer: "Often, yes, but you need to notify your rental company well in advance — commonly at least two weeks — so they can prepare the required documents and extra insurance. Andes crossings can also close temporarily in winter between June and September.",
    },
    {
      question: "Can I rent a car at Santiago airport?",
      answer: "Yes — Arturo Merino Benítez International Airport has rental counters from major providers reachable from the arrivals area.",
    },
    {
      question: "Is San Pedro de Atacama a good base for a rental car?",
      answer: "Yes — it's a common starting point for exploring the Atacama Desert and, with advance notice to your rental company, for crossing into Argentina via nearby Andes passes.",
    },
    {
      question: "What's the drink-driving limit in Chile?",
      answer: "Drivers are considered under the influence between 0.3 and 0.8 g/L blood alcohol, with 0.8 g/L or above treated as a more serious offence. Carabineros conduct routine roadside checks nationwide.",
    },
    {
      question: "What side of the road does Chile drive on?",
      answer: "Chile drives on the right, with the driver's seat on the left side of the vehicle.",
    },
    {
      question: "What's the minimum age to drive, and to rent a car, in Chile?",
      answer: "The legal minimum driving age is 18. Most rental companies set a higher minimum, commonly 21, often with a young-driver surcharge.",
    },
    {
      question: "Can I apply for an IDP after I've already arrived in Chile?",
      answer: "Yes. You can submit your application fully online even after you've arrived in Chile, since it's prepared based on your home-country licence rather than issued in person. Eligible digital documents are typically prepared in about 8 minutes after successful submission, payment, and approval, and printed documents are also available.",
    },
    {
      question: "Is a Digital IDP accepted by every rental company in Chile?",
      answer: "Not universally — some rental providers prefer a printed copy over a digital one. It's worth checking with your specific rental company before your trip, or choosing the Print + Digital option for broader coverage.",
    },
  ],

  sourceCitations: [
    {
      label: "Foreign travel advice — Chile (Safety and security)",
      url: "https://www.gov.uk/foreign-travel-advice/chile/safety-and-security",
      organization: "GOV.UK — Foreign, Commonwealth & Development Office",
    },
    {
      label: "Driving in Chile",
      url: "https://cl.usembassy.gov/driving-in-chile/",
      organization: "U.S. Embassy in Chile",
    },
  ],
  lastVerifiedDate: "2026-08-02",

  relatedCountrySlugs: ["argentina", "brazil", "mexico", "united-states"],

  primaryKeyword: "international driving permit chile",
  secondaryKeywords: [
    "idp chile",
    "international driving license chile",
    "driving in chile",
    "car rental chile",
    "santiago airport car rental",
    "carretera austral road trip",
    "atacama desert driving",
    "patagonia road trip",
    "chile toll tag system",
    "san pedro de atacama car rental",
    "chile argentina border crossing",
    "chile right hand driving",
  ],
  metaTitle: "International Driving Permit Chile: Self-Drive Trips",
  metaTitleAbsolute: true,
  metaDescription:
    "Chile does not legally mandate an IDP for tourists, but rental agencies in Santiago and Punta Arenas often ask for one at pickup.",
};
