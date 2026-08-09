export type Destination = {
  // Canonical slug — the same value a CountryRecord in the country-data
  // registry uses (lib/countryData/registry.ts). This is what any
  // slug-based lookup (e.g. RelatedCountries) should match against, never
  // a lowercased display name — display names collide across formatting
  // (spaces vs hyphens) for any multi-word country.
  slug: string;
  country: string;
  code: string;
  region: string;
  note: string;
  popular?: boolean;
};

export const DESTINATIONS: Destination[] = [
  { slug: "thailand", country: "Thailand", code: "TH", region: "Asia", note: "Scooter and car rentals across the islands and mainland.", popular: true },
  { slug: "japan", country: "Japan", code: "JP", region: "Asia", note: "Rural touring routes and city car rentals.", popular: true },
  { slug: "vietnam", country: "Vietnam", code: "VN", region: "Asia", note: "Motorbike and car hire in major cities." },
  { slug: "philippines", country: "Philippines", code: "PH", region: "Asia", note: "Island-hopping self-drive and scooter rentals.", popular: true },
  { slug: "india", country: "India", code: "IN", region: "Asia", note: "Self-drive and scooter rentals, from Goa to the Golden Triangle.", popular: true },
  { slug: "hong-kong", country: "Hong Kong", code: "HK", region: "Asia", note: "City-edge self-drive, from Lantau to the New Territories.", popular: true },
  { slug: "ireland", country: "Ireland", code: "IE", region: "Europe", note: "Self-drive touring along the Wild Atlantic Way and Ring of Kerry.", popular: true },
  { slug: "indonesia", country: "Indonesia", code: "ID", region: "Asia", note: "Scooter rentals in Bali and neighbouring islands.", popular: true },
  { slug: "malaysia", country: "Malaysia", code: "MY", region: "Asia", note: "Self-drive touring between cities." },
  { slug: "singapore", country: "Singapore", code: "SG", region: "Asia", note: "City rentals and short causeway trips into Malaysia.", popular: true },
  { slug: "united-states", country: "United States", code: "US", region: "Americas", note: "Cross-state road trips and rental pickups.", popular: true },
  { slug: "canada", country: "Canada", code: "CA", region: "Americas", note: "Long-distance touring and rental agreements." },
  { slug: "mexico", country: "Mexico", code: "MX", region: "Americas", note: "Coastal and city car rentals.", popular: true },
  { slug: "brazil", country: "Brazil", code: "BR", region: "Americas", note: "City rentals and coastal road trips." },
  { slug: "argentina", country: "Argentina", code: "AR", region: "Americas", note: "Buenos Aires rentals and Patagonia road trips.", popular: true },
  { slug: "peru", country: "Peru", code: "PE", region: "Americas", note: "Lima and Cusco rentals and Sacred Valley road trips.", popular: true },
  { slug: "spain", country: "Spain", code: "ES", region: "Europe", note: "Mainland driving and island car hire.", popular: true },
  { slug: "italy", country: "Italy", code: "IT", region: "Europe", note: "Coastal drives and city rental counters.", popular: true },
  { slug: "france", country: "France", code: "FR", region: "Europe", note: "Countryside touring and city rentals.", popular: true },
  { slug: "portugal", country: "Portugal", code: "PT", region: "Europe", note: "Coastal and countryside self-drive routes." },
  { slug: "greece", country: "Greece", code: "GR", region: "Europe", note: "Island and mainland car and scooter hire.", popular: true },
  { slug: "germany", country: "Germany", code: "DE", region: "Europe", note: "Motorway touring and city rentals." },
  { slug: "united-kingdom", country: "United Kingdom", code: "GB", region: "Europe", note: "Rental pickups from major airports.", popular: true },
  { slug: "croatia", country: "Croatia", code: "HR", region: "Europe", note: "Coastal touring routes along the Adriatic." },
  { slug: "iceland", country: "Iceland", code: "IS", region: "Europe", note: "Ring Road self-drive touring." },
  { slug: "norway", country: "Norway", code: "NO", region: "Europe", note: "Fjord-side scenic routes and Lofoten road trips.", popular: true },
  { slug: "romania", country: "Romania", code: "RO", region: "Europe", note: "Carpathian mountain roads and city rentals.", popular: true },
  { slug: "hungary", country: "Hungary", code: "HU", region: "Europe", note: "Budapest rentals and Lake Balaton road trips." },
  { slug: "austria", country: "Austria", code: "AT", region: "Europe", note: "Alpine road trips and Vienna and Salzburg rentals.", popular: true },
  { slug: "poland", country: "Poland", code: "PL", region: "Europe", note: "Warsaw and Kraków rentals and Tatra Mountain road trips.", popular: true },
  { slug: "belgium", country: "Belgium", code: "BE", region: "Europe", note: "City rentals and short cross-border road trips.", popular: true },
  { slug: "sweden", country: "Sweden", code: "SE", region: "Europe", note: "Winter driving and long-distance self-drive touring.", popular: true },
  { slug: "denmark", country: "Denmark", code: "DK", region: "Europe", note: "Copenhagen rentals and cross-bridge road trips.", popular: true },
  { slug: "turkey", country: "Turkey", code: "TR", region: "Europe", note: "Coastal road trips and city rental counters.", popular: true },
  { slug: "chile", country: "Chile", code: "CL", region: "Americas", note: "Desert, lake district, and Patagonia self-drive routes.", popular: true },
  { slug: "switzerland", country: "Switzerland", code: "CH", region: "Europe", note: "Alpine passes and scenic mountain road trips.", popular: true },
  { slug: "netherlands", country: "Netherlands", code: "NL", region: "Europe", note: "City rentals and countryside touring.", popular: true },
  { slug: "united-arab-emirates", country: "United Arab Emirates", code: "AE", region: "Middle East", note: "City and desert rental agreements.", popular: true },
  { slug: "saudi-arabia", country: "Saudi Arabia", code: "SA", region: "Middle East", note: "Inter-city rentals and business travel." },
  { slug: "qatar", country: "Qatar", code: "QA", region: "Middle East", note: "City rentals and short business trips." },
  { slug: "jordan", country: "Jordan", code: "JO", region: "Middle East", note: "Desert touring and cross-country routes." },
  { slug: "south-africa", country: "South Africa", code: "ZA", region: "Africa", note: "Self-drive safaris and coastal routes." },
  { slug: "morocco", country: "Morocco", code: "MA", region: "Africa", note: "City rentals and countryside touring." },
  { slug: "kenya", country: "Kenya", code: "KE", region: "Africa", note: "Safari transfers and self-drive routes." },
  { slug: "nigeria", country: "Nigeria", code: "NG", region: "Africa", note: "Lagos and Abuja business travel and airport rentals.", popular: true },
  { slug: "sri-lanka", country: "Sri Lanka", code: "LK", region: "Asia", note: "Hill country road trips and southern coast self-drive.", popular: true },
  { slug: "australia", country: "Australia", code: "AU", region: "Oceania", note: "Long-distance road trips and coastal touring.", popular: true },
  { slug: "new-zealand", country: "New Zealand", code: "NZ", region: "Oceania", note: "Self-drive touring across both islands." },
];

export function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

export const REGIONS = Array.from(new Set(DESTINATIONS.map((d) => d.region)));
