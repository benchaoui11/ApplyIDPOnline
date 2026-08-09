// Runs the Compatibility Migration Layer once, idempotently, for every
// legacy country record that exists. This is the ONLY place
// migrateLegacyCountry() is called from application code — a future
// country authored directly into the registries (no legacy record) would
// never need an entry here.
//
// Called lazily from the Render Adapter (not eagerly at module scope) so
// it works the same way regardless of Next.js's module-execution order
// across dev/build/RSC, and is safe to call repeatedly under hot reload.

import { THAILAND } from "@/lib/countryData/thailand";
import { SINGAPORE } from "@/lib/countryData/singapore";
import { MALAYSIA } from "@/lib/countryData/malaysia";
import { VIETNAM } from "@/lib/countryData/vietnam";
import { INDONESIA } from "@/lib/countryData/indonesia";
import { PHILIPPINES } from "@/lib/countryData/philippines";
import { INDIA } from "@/lib/countryData/india";
import { JAPAN } from "@/lib/countryData/japan";
import { HONG_KONG } from "@/lib/countryData/hong-kong";
import { IRELAND } from "@/lib/countryData/ireland";
import { UNITED_KINGDOM } from "@/lib/countryData/united-kingdom";
import { AUSTRALIA } from "@/lib/countryData/australia";
import { CANADA } from "@/lib/countryData/canada";
import { NEW_ZEALAND } from "@/lib/countryData/new-zealand";
import { PORTUGAL } from "@/lib/countryData/portugal";
import { SPAIN } from "@/lib/countryData/spain";
import { ITALY } from "@/lib/countryData/italy";
import { FRANCE } from "@/lib/countryData/france";
import { ROMANIA } from "@/lib/countryData/romania";
import { BRAZIL } from "@/lib/countryData/brazil";
import { MEXICO } from "@/lib/countryData/mexico";
import { GERMANY } from "@/lib/countryData/germany";
import { BELGIUM } from "@/lib/countryData/belgium";
import { SWEDEN } from "@/lib/countryData/sweden";
import { TURKEY } from "@/lib/countryData/turkey";
import { CHILE } from "@/lib/countryData/chile";
import { SWITZERLAND } from "@/lib/countryData/switzerland";
import { NETHERLANDS } from "@/lib/countryData/netherlands";
import { SAUDI_ARABIA } from "@/lib/countryData/saudi-arabia";
import { UNITED_ARAB_EMIRATES } from "@/lib/countryData/united-arab-emirates";
import { SOUTH_AFRICA } from "@/lib/countryData/south-africa";
import { HUNGARY } from "@/lib/countryData/hungary";
import { NORWAY } from "@/lib/countryData/norway";
import { AUSTRIA } from "@/lib/countryData/austria";
import { GREECE } from "@/lib/countryData/greece";
import { POLAND } from "@/lib/countryData/poland";
import { DENMARK } from "@/lib/countryData/denmark";
import { NIGERIA } from "@/lib/countryData/nigeria";
import { SRI_LANKA } from "@/lib/countryData/sri-lanka";
import { ARGENTINA } from "@/lib/countryData/argentina";
import { PERU } from "@/lib/countryData/peru";
import { UNITED_STATES } from "@/lib/countryData/united-states";
import { migrateLegacyCountry } from "./migration/fromLegacyRecord";

const LEGACY_COUNTRY_RECORDS = [THAILAND, SINGAPORE, MALAYSIA, VIETNAM, INDONESIA, PHILIPPINES, INDIA, JAPAN, HONG_KONG, IRELAND, UNITED_KINGDOM, AUSTRALIA, CANADA, NEW_ZEALAND, PORTUGAL, SPAIN, ITALY, FRANCE, ROMANIA, BRAZIL, MEXICO, GERMANY, BELGIUM, SWEDEN, TURKEY, CHILE, SWITZERLAND, NETHERLANDS, SAUDI_ARABIA, UNITED_ARAB_EMIRATES, SOUTH_AFRICA, HUNGARY, NORWAY, AUSTRIA, GREECE, POLAND, DENMARK, NIGERIA, SRI_LANKA, ARGENTINA, PERU, UNITED_STATES];

let bootstrapped = false;

export function ensureKnowledgeBootstrapped(): void {
  if (bootstrapped) return;
  for (const record of LEGACY_COUNTRY_RECORDS) migrateLegacyCountry(record);
  bootstrapped = true;
}
