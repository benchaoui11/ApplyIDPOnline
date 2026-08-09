// Fetches and lightly parses a rendered country page for rules that need
// real rendered output (claim-frequency counts, heading structure, internal
// link counts, JSON-LD content) rather than just the source data.
//
// Deliberately regex-based, not a full DOM parser (no cheerio/jsdom
// dependency added for this prototype) — flat extraction of headings,
// internal hrefs, JSON-LD script content, and stripped visible text is all
// these rules need. This is a real, documented limitation: malformed or
// unusually nested markup could reduce accuracy. See
// docs/VALIDATOR_IMPLEMENTATION_MATRIX.md, "validator limitations."

export type RenderedPage = {
  html: string;
  text: string;
  headings: { level: number; text: string }[];
  internalLinkHrefs: string[];
  jsonLdGraph: unknown[] | null;
  jsonLdParseError: string | null;
};

export async function fetchRenderedPage(baseUrl: string, path: string): Promise<RenderedPage | null> {
  try {
    const res = await fetch(`${baseUrl}${path}`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const html = await res.text();
    return parseRenderedPage(html);
  } catch {
    return null;
  }
}

function stripTags(fragment: string): string {
  return fragment
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseRenderedPage(html: string): RenderedPage {
  const headings: { level: number; text: string }[] = [];
  const headingRe = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m: RegExpExecArray | null;
  while ((m = headingRe.exec(html))) {
    headings.push({ level: Number(m[1]), text: stripTags(m[2]) });
  }

  const internalLinkHrefs: string[] = [];
  const linkRe = /<a\s+[^>]*href="(\/[^"]*)"/gi;
  while ((m = linkRe.exec(html))) {
    internalLinkHrefs.push(m[1]);
  }

  let jsonLdGraph: unknown[] | null = null;
  let jsonLdParseError: string | null = null;
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      if (Array.isArray(parsed["@graph"])) {
        jsonLdGraph = parsed["@graph"];
      } else {
        jsonLdParseError = "Parsed JSON-LD has no @graph array";
      }
    } catch (e) {
      jsonLdParseError = e instanceof Error ? e.message : String(e);
    }
  } else {
    jsonLdParseError = "No <script type=\"application/ld+json\"> tag found on the page";
  }

  const text = stripTags(html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, ""));

  return { html, text, headings, internalLinkHrefs, jsonLdGraph, jsonLdParseError };
}

export function countOccurrences(haystack: string, needle: string): number {
  if (!needle) return 0;
  const re = new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return (haystack.match(re) ?? []).length;
}
