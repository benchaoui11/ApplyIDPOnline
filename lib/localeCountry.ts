import { COUNTRY_LIST } from "./countryList";

/**
 * Best-effort default for "where was your license issued" — reads the
 * browser's locale region subtag (e.g. "en-US" -> "US") and matches it
 * against our country list. No network request, no IP lookup: this is a
 * convenience default, not a verified location, so the person can always
 * change it.
 */
export function guessCountryFromLocale(): string {
  if (typeof navigator === "undefined") return "";

  const locales = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];

  for (const locale of locales) {
    const region = locale?.split("-")[1]?.toUpperCase();
    if (!region) continue;
    const match = COUNTRY_LIST.find((c) => c.code === region);
    if (match) return match.name;
  }

  return "";
}
