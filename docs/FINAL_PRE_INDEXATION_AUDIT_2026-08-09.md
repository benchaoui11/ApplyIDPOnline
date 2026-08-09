# Final Pre-Indexation Technical SEO + GEO Audit — Summary

**Date:** 2026-08-09
**Scope:** Strictly technical SEO/GEO/indexation readiness. NOT content expansion, NOT a redesign. No `/from/` pages were built, no new content clusters were added.

This file is a handoff summary of a completed audit + implementation pass on `applyidponline.com` (Next.js 16 App Router, React 19, TypeScript). Use it to give a fresh Claude session full context without re-deriving everything from the codebase.

---

## 1. What was asked

A final pre-indexation technical audit covering: sitemap completeness, real `lastModified`/`dateModified` freshness signals, a single stable Organization schema entity, pricing/Offer schema sourced from `lib/pricing.ts`, pricing consistency across the site, Open Graph/Twitter coverage, a full crawl audit (status codes, canonicals, titles, meta descriptions, H1s, duplicates, broken links, alt text, image sizes), internal link graph completeness (every important page reachable via crawlable HTML, not just sitemap), robots.txt correctness, canonical correctness, JSON-LD validation across all schema types, and a precise final launch report (not vague) with exact numbers.

## 2. Key architecture facts (for a fresh session)

- `lib/countryData/registry.ts` → `COUNTRY_REGISTRY` is the **single source of truth** for country pages. The dynamic route `app/countries/[country]/page.tsx` resolves slugs against it, and `app/sitemap.ts` now imports the *same* registry — no manual slug list exists anywhere.
- `lib/cityData/registry.ts` → `CITY_REGISTRY` + `cityPublicPath()`, same pattern, currently only `new-york-city`.
- `CountryRecord.lastVerifiedDate` (ISO `YYYY-MM-DD`) and `CountryRecord.tier` (1/2/3, flagship/standard/lightweight) are real editorial fields — used for sitemap `lastModified` and priority tiering. `CityRecord` has the same.
- `lib/pricing.ts` → `PRICE_TABLE` (digital: 39/49/59, both: 69/79/89). New export `getAllPricingOffers()` returns all 6 `{format, validityYears, price, name}` combos — this is the single source every pricing schema/UI reads from.
- **New file `lib/schema.ts`** — the canonical shared JSON-LD building blocks:
  - `SITE_URL`, `ORGANIZATION_ID` (`{SITE_URL}/#organization`), `WEBSITE_ID`
  - `ORGANIZATION_NODE` — one full Organization object (name, url, logo, description, disambiguatingDescription, contactPoint using the real `support@applyidponline.com`) imported by every page that needs Organization schema. No `sameAs` — no verified social profiles exist, so none was fabricated.
  - `WEBSITE_NODE`
  - `getAggregateOfferNode()` — computes `AggregateOffer` (lowPrice/highPrice/offerCount/offers[]) entirely from `getAllPricingOffers()`. Zero hardcoded prices in schema code.
- `lib/site.ts` → `APPLY_IDP_ONLINE_DOMAIN = "applyidponline.com"`, reused everywhere instead of hardcoded domain strings.

## 3. What was actually changed

| File | Change |
|---|---|
| `app/sitemap.ts` | Full rewrite. Was missing **all 42 country pages** (highest-severity bug found). Now generates from `COUNTRY_REGISTRY`/`CITY_REGISTRY` directly. Tiered priority (Home 1.0 → Apply/Pricing/How-to-Apply 0.9 → What-is-IDP/FAQ/Countries 0.8 → country pages 0.55–0.75 by tier → About/editorial 0.55 → legal 0.3). `lastModified` only set where a real date exists (country/city pages via `lastVerifiedDate`) — deliberately omitted on static pages rather than faking "today." |
| `lib/schema.ts` | New file, see above. |
| `lib/pricing.ts` | Added `getAllPricingOffers()`. |
| `app/page.tsx` (Home) | JSON-LD now uses shared `ORGANIZATION_NODE`/`WEBSITE_NODE`; added `offers: getAggregateOfferNode()` to the Service node; added OG image + full `twitter` block (previously had none). |
| `app/countries/[country]/page.tsx` | Added `WebPage` node (didn't exist before) with `dateModified: country.lastVerifiedDate`; standardized Organization via shared node; added `@id`s to BreadcrumbList/Service; added OG image + twitter block. |
| `app/city/[citySlug]/page.tsx` | Same treatment as country page. |
| `app/pricing/page.tsx` | Added shared Organization node, `Service` node with `offers: getAggregateOfferNode()`, OG image. |
| `app/how-to-apply/page.tsx` | Added OG image to existing openGraph/twitter blocks. |
| `app/what-is-idp/page.tsx` | Had **no** openGraph/twitter block at all — added from scratch. |
| `app/faq/page.tsx` | Added OG image. |
| `app/countries/page.tsx` | Added OG image. **Also fixed a real crawlability bug** (see below). |
| `components/apply/PhotoGuideThumb.tsx` | Deleted (confirmed unused, replaced earlier in session by real photos). |

### The one unplanned defect found and fixed
`CountriesExplorer.tsx` (client component) defaults its filter to `"Popular"`, so its server-rendered HTML only contained `<a href>` links for `popular:true` destinations — **10 real country pages** (malaysia, vietnam, canada, new-zealand, portugal, brazil, germany, saudi-arabia, south-africa, hungary) were undiscoverable except via the sitemap. Fixed in `app/countries/page.tsx` by adding a server-rendered `visually-hidden` `<nav>` listing every `hasGuide` entry, ahead of the client component — full link graph always in SSR HTML, progressive enhancement only changes the visible UI. Verified: hub now links to 42/42 country pages.

### Pre-existing inconsistency also fixed
Organization `@id` was written three different ways across three pages (`#organization"` vs `/#organization` vs mismatched base URL). Standardized to `{SITE_URL}/#organization` via the shared `lib/schema.ts` module — this also eliminated the underlying problem of different pages carrying different *content* under the same nominal entity, not just the string mismatch.

## 4. Final verified numbers (all confirmed via live fetch against the dev server, not assumed)

- **Sitemap URLs:** 62 (19 static + 42 country + 1 city), 0 duplicates.
- **Country pages:** 42/42, matches `COUNTRY_REGISTRY` exactly.
- **Broken internal links:** 0 (61 unique links checked, all HTTP 200).
- **Duplicate titles/descriptions:** 0/0 across all 62 pages.
- **Canonical issues:** 0. 100% canonical/`og:url` agreement. Single domain (`https://applyidponline.com`, no www), no `trailingSlash`/`basePath` override → no protocol/host/trailing-slash inconsistency.
- **Robots issues:** 0 — `robots.ts` was already correct pre-audit (`Allow: /`, `Disallow: /api/`, `Disallow: /apply/success`), left unchanged.
- **JSON-LD:** 365 schema nodes / 152 unique `@id`s across all 62 pages, 0 malformed URLs, 0 `@id` type-conflicts, 0 invalid JSON. Organization node content-diffed across home/pricing/country samples → byte-identical (1 variant) — confirms one real, non-fragmented entity.
- **Missing/empty `alt` text:** 0/62 pages.
- **Image sizes:** 6 unique `<img>` assets sitewide (rest are icons/CSS), all served via `next/image`, 18–131KB, none oversized.
- **OG images:** 6 unique real images across 7 prioritized page-type groups (Home, Pricing, How-to-Apply, What-is-IDP, FAQ, Countries hub each unique; Country + City pages share the Home image). All verified HTTP 200, no placeholders.
- **13 pages intentionally without OG image/JSON-LD** (not in the user's priority list, left as a documented gap, not silently omitted): `/apply`, `/about`, `/contact`, `/sources`, `/editorial-policy`, `/content-review`, and 7× `/legal/*`.
- **Pricing schema:** `priceCurrency: USD`, `lowPrice: 39`, `highPrice: 89`, `offerCount: 6` — all 6 offers verified rendered correctly, computed entirely from `lib/pricing.ts`, zero hardcoded numbers in schema code.
- **Console errors:** 0 (confirmed in a fresh browser tab; an earlier `FileInput.tsx` parse error was a stale artifact of one old tab, not a real bug — `tsc`/`lint`/`npm run build` were clean throughout).

## 5. Explicit blockers / manual steps still required (cannot be done by Claude)

- **Google Search Console verification, sitemap submission, and manual indexing requests** — requires live production domain access + a Google account. Not performed. When you do this manually, recommended priority list for manual "Request Indexing": Home, `/apply`, `/pricing`, `/how-to-apply`, `/what-is-idp`, `/faq`, `/countries`, plus Tier-1 country pages. Let sitemap + internal linking handle the rest — don't spam-request all 42 country pages individually.

## 6. Explicitly out of scope (per user's own constraints, not forgotten)

- No `/from/` pages.
- No new content clusters/pages.
- No redesign, no visual/UX changes.
- The 13 lower-priority static pages left without OG image/schema (see above) — a deliberate, documented scope call, not an oversight.

## 7. If continuing this work in a new session

Good next candidates (not started, not promised, just logical continuations):
- Extend unique OG images / dedicated photos to the 13 currently-uncovered static pages, if desired.
- Per-country OG images instead of the shared Home image, if/when country-specific photo assets exist.
- Any Search Console / production submission steps once the user has done the manual verification.
- The earlier competitor-comparison audit (officialidp.com) surfaced a real gap: their public `/track` order-status page has no equivalent here — `/api/track` is an internal analytics endpoint, not customer-facing. This was flagged as intentionally out of scope for this technical-only pass, not solved.
