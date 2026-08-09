export type Format = "digital" | "both";
export type ValidityYears = "1" | "2" | "3";

// Longer validity costs modestly more — real pricing, no manufactured
// "was" price or fake discount badge.
const PRICE_TABLE: Record<Format, Record<ValidityYears, number>> = {
  digital: { "1": 39, "2": 49, "3": 59 },
  both: { "1": 69, "2": 79, "3": 89 },
};

// The 2-year option is the best seller across both formats.
export const BEST_SELLER_VALIDITY: ValidityYears = "2";

// A second traveler on the same order gets 20% off their own IDP.
export const SECOND_TRAVELER_DISCOUNT = 0.2;

export function getPrice(format: Format, validityYears: ValidityYears): number {
  return PRICE_TABLE[format][validityYears];
}

export function getSecondTravelerPrice(format: Format, validityYears: ValidityYears): number {
  return Math.round(getPrice(format, validityYears) * (1 - SECOND_TRAVELER_DISCOUNT));
}

const FORMATS: Format[] = ["digital", "both"];
const VALIDITY_YEARS: ValidityYears[] = ["1", "2", "3"];
const FORMAT_LABELS: Record<Format, string> = { digital: "Digital IDP", both: "Print + Digital IDP" };

export type PricingOffer = {
  format: Format;
  validityYears: ValidityYears;
  price: number;
  name: string;
};

// Every purchasable format × validity combination, each price read from
// PRICE_TABLE above — the single place a dollar amount is ever typed.
// Used to build structured pricing data (Offer/AggregateOffer schema)
// without duplicating numbers anywhere else.
export function getAllPricingOffers(): PricingOffer[] {
  return FORMATS.flatMap((format) =>
    VALIDITY_YEARS.map((validityYears) => ({
      format,
      validityYears,
      price: getPrice(format, validityYears),
      name: `${FORMAT_LABELS[format]} — ${validityYears}-year validity`,
    }))
  );
}
