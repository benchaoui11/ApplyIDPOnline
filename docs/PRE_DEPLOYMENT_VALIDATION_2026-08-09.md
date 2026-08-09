# Pre-Deployment Validation Report (not a "launch approval" — there is no launch yet)

**Date:** 2026-08-09
**Reframe from the request:** This started as a "launch approval report" against the full Skills Library. Mid-check I found `applyidponline.com`'s nameservers point to Hostinger's parking service (`solar.dns-parking.com` / `lunar.dns-parking.com`) — confirmed by live DNS lookup and a live fetch returning Hostinger's placeholder page, not the app. There's also no git repository yet. You confirmed: nothing is deployed, the app is local-only on Desktop, Vercel/GitHub setup comes after you finish more fixes.

That changes what an honest report can say. **"Would Google/OpenAI/Skills-Library engineers approve this for production?" has no real answer yet — there is no production.** Every score that depends on the live internet (crawlability, indexability, AI Mode readiness, Core Web Vitals field data, actual AI-citation status) is genuinely **not measurable** right now, and I'm not going to invent numbers for them — that would violate the Skills Library's own anti-fabrication rule (Dossier 01 Ch.2, global rule R2/R9).

What follows is what a rigorous reviewer *can* honestly check pre-deployment: the code, the local dev server's rendered output, and content architecture. Everything is labeled by how it was actually verified.

---

## Verification key
- **Measured** — checked live against `localhost:3000` this session (dev server, not production).
- **Inferred** — reasoned from real code/content, not independently measured.
- **Not measurable pre-deploy** — needs production, GSC, PageSpeed, or live AI-engine query access.

---

## 1. Technical / structured data (Measured)

| Check | Result |
|---|---|
| Homepage JSON-LD | 1 `<script>` graph, 5 valid nodes: `Organization`, `WebSite`, `WebPage`, `Service`, `FAQPage`. No parse errors. |
| Homepage `<title>` | "Apply IDP Online \| International Driving Permit Application" — present, reasonable length. |
| Homepage meta description | Present, ~150 chars, states the value prop ("no embassy visit, no appointment required"). |
| Canonical | `https://applyidponline.com/` — correctly absolute, correctly self-referential. |
| `<html lang>` | `en` — correct. |
| Images missing `alt` | **0 / 4** on homepage. |
| Internal links (homepage) | 44 — healthy for a hub page. |
| OG image | Set, absolute URL. |
| `robots.txt` | `Allow: /`, `Disallow: /api/`, `Disallow: /apply/success`, sitemap declared. Wildcard `User-Agent: *` with `Allow: /` already permits AI crawlers (GPTBot/ClaudeBot/PerplexityBot/Google-Extended) by default — no explicit per-bot line needed unless you want to treat them differently from Googlebot, which you don't appear to. |
| Console errors (dev server) | None — only HMR/DevTools info logs. |

**No defects found in this section.** I'm stating that plainly rather than manufacturing one — see the note in the cover message about why "never say it's good" isn't a rule I'm applying literally.

## 2. Content architecture — new finding this pass: tiering isn't actually differentiating anything

`CountryRecord.tier` (1/2/3, described elsewhere as flagship/standard/lightweight) exists in the schema and drives sitemap priority. I checked all 42 country files:

```
grep -oE "tier: [0-9]" lib/countryData/*.ts → every single one is tier: 1
```

**Every country page is tier 1.** There are no tier-2 or tier-3 records at all. I then spot-checked whether this is masking real quality variance (thin pages mislabeled as flagship) by comparing line counts and source-citation counts across 6 countries (Nigeria, Japan, Sri Lanka, US, Hong Kong, Philippines): 247–317 lines each, 1–4 source citations each. **Content depth is genuinely fairly uniform** — this isn't thin content hiding behind a flagship label, so it's a low-severity finding, not a real defect. But the tiering mechanism itself is currently doing nothing (uniform priority for all 42 pages in the sitemap, since there's no tier 2/3 to differentiate against). Confidence 80/100 this is either an unused-but-harmless field or a deliberate "every destination matters equally" editorial choice — I can't tell which without asking you, and it's low-impact either way since sitemap priority is a weak signal (Dossier 02 doesn't claim strong ranking weight for sitemap priority specifically). Not worth fixing unless you're planning genuine tier differentiation later.

## 3. E-E-A-T / trust infrastructure (Measured from code, cross-checked against Pass 2 findings)

Confirmed still in place: `lastVerifiedDate` + `sourceCitations` per country, `/sources`, `/editorial-policy`, `/content-review`, and the US-specific FTC citation (`lib/countryData/united-states.ts`). No change since Pass 2. This remains the strongest asset on the site relative to competitors.

## 4. What is explicitly NOT measurable until deployment (do not trust any number here from anyone, including a future audit, unless it says how it was obtained)

- **Core Web Vitals (LCP/INP/CLS) field data** — requires real users on the real domain (CrUX) or at minimum a PageSpeed Insights run against the live URL. A dev-server "it feels fast" observation is not a CWV score.
- **Actual Google/Bing indexation status** — requires Search Console + a crawlable production domain.
- **AI Overview / ChatGPT / Perplexity / Gemini / Claude citation status** — requires live query testing against a URL that those systems can actually fetch. Right now none of them can reach this site at all (parking page, or literally nothing once DNS is fixed but before crawlers visit). A "readiness" *technical* assessment (SSR ✓, entity-clear ✓, evidentiary FAQ content ✓, robots.txt permissive ✓) is a reasonable inference that the *prerequisites* are met — that is not the same claim as "ChatGPT currently cites you," and I won't blur the two.
- **Semrush-based competitive metrics** — API units still exhausted as of Pass 1.

## 5. Honest bottom line

No blocking code or content defect was found in what's checkable pre-deployment. The prerequisites for good technical SEO/GEO performance (SSR, clean schema, permissive robots, alt text, canonical hygiene, evidentiary FAQ content, sourced country pages) are genuinely in place, based on real checks, not assumption.

The actual next milestone isn't a content fix — it's **git → GitHub → Vercel → point `applyidponline.com`'s DNS at it**, which you've said you'll handle yourself once you're done with your remaining fixes. Once that's live, the right next step is a *real* Search-Console-backed technical validation (indexation status, live PageSpeed run, actual crawl by Googlebot/GPTBot in server logs) — that's the point where "launch approval" becomes an answerable question instead of a hypothetical one.
