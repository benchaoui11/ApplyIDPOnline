// Small, self-contained text-analysis helpers shared by several rules.
// No external NLP dependency — deliberately simple, documented heuristics
// appropriate for this validator's current stage, not a production-grade
// text/NLP engine. See docs/VALIDATOR_ARCHITECTURE.md for which rules built
// on these helpers are deterministic vs. heuristic, and why.

export const HEDGE_WORDS = [
  "many",
  "typically",
  "commonly",
  "often",
  "generally",
  "usually",
  "in many cases",
  "some",
] as const;

export type BannedPhraseHit = { pattern: string; matchedText: string; sentence: string };

// Negation cues that, when they appear shortly before a matched banned
// phrase, mean the sentence is DISCLAIMING the phrase rather than
// asserting it ("not a government agency," "never guaranteed"). Applied
// uniformly to every banned-phrase pattern: a negated match is, by
// definition, the opposite of the claim the pattern exists to catch.
//
// This replaces an earlier version of this check that only whitelisted one
// exact ratified sentence fragment ("independent, private service") — that
// approach broke the first time a second, differently-worded disclaimer
// sentence appeared on the page (found during validator hardening: a
// SourcesAndReview-style "Not a government agency and not affiliated with
// AAA, AATA, FIA, AIT, or the United Nations" sentence, which negates the
// same concept in different words). Detecting negation generally, instead
// of whitelisting one known string, is what keeps this fix from breaking
// again the next time the copy is worded differently.
const NEGATION_CUES = ["not a", "not an", "not the", "not affiliated", "isn't a", "aren't a", "no ", "never a", "not "];

function isNegated(sentence: string, matchIndex: number): boolean {
  const before = sentence.slice(Math.max(0, matchIndex - 25), matchIndex).toLowerCase();
  return NEGATION_CUES.some((cue) => before.includes(cue));
}

const BANNED_PHRASE_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "submission-duration claim", re: /\b(submit(?:ted|ting)?\s+in\s+\d+\s*minutes?|\d+[\s-]*minutes?\s+to\s+submit)\b/i },
  { label: "guaranteed", re: /\bguarantee(?:d|s)?\b/i },
  { label: "universal acceptance claim", re: /\b(universally accepted|accepted (?:by |at )?every|all rental (?:companies|providers) accept)\b/i },
  { label: "government/embassy/motor-authority self-description", re: /\b(official government|we are a government|government agency|motor vehicle authority|embassy service)\b/i },
  { label: "printed-delivery timing outside checkout", re: /\bprinted\b[^.]{0,60}\b(ship|deliver|arrive)\w*\b[^.]{0,30}\b(\d+\s*(day|week|business day)s?)\b/i },
];

const BANNED_SUPERLATIVE_PATTERNS: { label: string; re: RegExp }[] = [
  { label: "unearned superlative", re: /\b(best|easiest|safest|100%|always works|never fails)\b/i },
  { label: "manipulative urgency", re: /\b(don't risk it|act now)\b/i },
  { label: "exclamation point", re: /!/ },
];

const INTERNAL_DOT = "__APPLYIDP_INTERNAL_DOT__";

function protectInternalPeriods(text: string): string {
  return text
    .replace(/(?<=\d)\.(?=\d)/g, INTERNAL_DOT)
    .replace(/\b([A-Za-z0-9-]+)\.([A-Za-z]{2,})(?=\b)/g, `$1${INTERNAL_DOT}$2`)
    .replace(/\b([A-Z]{2,})\.([A-Z]{2,})\b/g, `$1${INTERNAL_DOT}$2`)
    .replace(/\b(e|i)\.g\./gi, (match) => match.replace(/\./g, INTERNAL_DOT));
}

function restoreInternalPeriods(text: string): string {
  return text.replaceAll(INTERNAL_DOT, ".");
}

// Lightweight sentence splitter: splits on ./!/? while protecting common
// non-boundary periods first (decimals like 0.05%, currency values like
// £12.50, and acronyms/domains like GOV.UK). This remains a heuristic, but
// it avoids false GEO warnings for numeric traffic/legal thresholds.
export function splitIntoSentences(text: string): string[] {
  const protectedText = protectInternalPeriods(text);
  const matches = protectedText.match(/[^.!?]+[.!?]*/g);
  return (matches ?? [protectedText]).map((s) => restoreInternalPeriods(s.trim())).filter(Boolean);
}

function isQuestion(sentence: string): boolean {
  return sentence.trim().endsWith("?");
}

// Scans sentence-by-sentence and skips any sentence that is itself a
// question. This is the direct fix for the false positive found in Phase
// 2A: "Is a Digital IDP accepted by every rental company in Thailand?" was
// previously flagged as a "universal acceptance claim" because the banned
// pattern matched inside a rhetorical FAQ question, not an assertion. A
// question restating a concept to then correctly hedge the answer is not
// itself a claim.
export function scanForBannedPhrases(text: string): BannedPhraseHit[] {
  const hits: BannedPhraseHit[] = [];
  for (const sentence of splitIntoSentences(text)) {
    if (isQuestion(sentence)) continue;
    for (const { label, re } of BANNED_PHRASE_PATTERNS) {
      const match = sentence.match(re);
      if (!match) continue;
      if (isNegated(sentence, match.index ?? 0)) continue; // disclaiming the phrase, not asserting it
      hits.push({ pattern: label, matchedText: match[0], sentence: sentence.trim() });
    }
  }
  return hits;
}

export function scanForBannedSuperlatives(text: string): BannedPhraseHit[] {
  const hits: BannedPhraseHit[] = [];
  for (const sentence of splitIntoSentences(text)) {
    if (isQuestion(sentence)) continue;
    for (const { label, re } of BANNED_SUPERLATIVE_PATTERNS) {
      const match = sentence.match(re);
      if (match) hits.push({ pattern: label, matchedText: match[0], sentence: sentence.trim() });
    }
  }
  return hits;
}

export function countHedgeWords(text: string): Record<string, number> {
  const lower = text.toLowerCase();
  const counts: Record<string, number> = {};
  for (const word of HEDGE_WORDS) {
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g");
    const n = (lower.match(re) ?? []).length;
    if (n > 0) counts[word] = n;
  }
  return counts;
}

// Counts sentences in a short text fragment (e.g. a single TipList point).
// Used by the GEO atomic-fact rule: more than one sentence in a point means
// it's bundling more than one claim.
export function countSentences(text: string): number {
  return splitIntoSentences(text).filter((s) => s.length > 0).length;
}

const LEADING_PRONOUNS = ["it", "this", "that", "these", "those", "they"];

// True if a sentence opens with a bare pronoun that has no antecedent
// within the sentence itself — a sign the sentence depends on preceding
// page context to be understood, which GEO_GUIDELINES.md §2 explicitly
// rules out for a DirectAnswerBlock ("must make sense lifted out of
// context"). Heuristic: only checks the first word, not real coreference
// resolution.
export function startsWithUnresolvedPronoun(text: string): boolean {
  const firstWord = text.trim().split(/\s+/)[0]?.toLowerCase().replace(/[^a-z]/g, "");
  return LEADING_PRONOUNS.includes(firstWord ?? "");
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "is", "are", "your", "you", "to", "of", "in", "on", "at",
  "it", "its", "this", "that", "with", "for", "as", "be", "by", "have", "has", "will", "not",
]);

function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2 && !STOPWORDS.has(w))
  );
}

// Simple Jaccard similarity on non-stopword tokens — a heuristic proxy for
// "near-verbatim overlap" (docs/EDITORIAL_GUIDELINES.md §5), not true
// semantic-duplication detection. KNOWN LIMITATION, documented in
// docs/VALIDATOR_ARCHITECTURE.md and docs/PHASE_2A_FINDINGS_REPORT.md §8:
// two sentences that a human reads as duplicating the same underlying
// claim (e.g. both opening with "the country drives on the left," worded
// differently) can share very few literal tokens once surrounding wording
// differs, producing a low score here even though the duplication is real.
// This function measures lexical overlap, not semantic equivalence, and
// that gap is not closed by tuning the threshold — it would require actual
// semantic similarity (e.g. embeddings), which is out of scope for this
// validator's current, dependency-light design.
export function jaccardSimilarity(a: string, b: string): number {
  const ta = tokenize(a);
  const tb = tokenize(b);
  if (ta.size === 0 || tb.size === 0) return 0;
  let intersection = 0;
  for (const w of ta) if (tb.has(w)) intersection++;
  const union = ta.size + tb.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
