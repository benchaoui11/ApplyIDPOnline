import { COUNTRY_LIST } from "./countryList";
import { guessCountryFromLocale } from "./localeCountry";

/**
 * Best-effort visitor country detection, in order of reliability:
 *  1. Vercel's IP-based geolocation header (/api/geo) — reflects real
 *     physical location, works once deployed on Vercel.
 *  2. Browser locale region subtag — a rough guess only; it reflects
 *     language/OS settings, not location, so it's used only as a
 *     fallback when geo data isn't available (e.g. local development).
 *
 * Returns a country name matching lib/countryList.ts, or "" if nothing
 * could be resolved — callers should apply their own final fallback.
 */
export async function detectVisitorCountry(): Promise<string> {
  try {
    const res = await fetch("/api/geo");
    if (res.ok) {
      const { country } = (await res.json()) as { country: string | null };
      if (country) {
        const match = COUNTRY_LIST.find((c) => c.code === country.toUpperCase());
        if (match) return match.name;
      }
    }
  } catch {
    // network/geo lookup failed — fall through to the locale guess
  }

  return guessCountryFromLocale();
}
