# Research Standard

Version: 1.1
Authority level: subordinate to `BUSINESS_TRUTH_LAYER.md`. This document governs *how confident we're allowed to be* about a Category C claim; it never governs *whether the claim is permitted to exist at all* — that's the Business Truth Layer's job.

**Changelog:** v1.1 reframes §7 in terms of the `Source` and `Evidence` registries formalized in `KNOWLEDGE_OBJECTS.md` v1.1 §6–§7, replacing the flat `sourceCitations` array this section originally described. The confidence levels (§2), primary-source bar (§3), discovery-only rule (§4), and the `partially_sourced` independence test (§5) are unchanged — this document's actual research methodology did not change, only the record shape its outputs get stored in.

## 1. Purpose

Every Category C fact (destination law, rental-provider norms) needs a defensible answer to "how do we know this?" before it can appear on a page. This document is that defense — a repeatable method for turning "we found this on the internet" into "this is confirmed / this is corroborated-but-not-verified / this is unknown," so the same rigor applies whether the researcher is a person, a future session of Claude, or anyone else working on country #50.

## 2. The three confidence levels

- **`confirmed`** — verified directly against a primary source (§3). Stated as plain fact, no hedge.
- **`partially_sourced`** — corroborated across independent secondary sources but not checked against a primary source. Worded with hedge language (`EDITORIAL_GUIDELINES.md` §3).
- **`pending`** — doesn't clear either bar. **Omitted from the published page entirely.** Never guessed, never hedged into false confidence, never left as a placeholder. A missing fact is honest; a guessed one is not.

## 3. What counts as a primary source

- A national government's official travel-advisory service (the standard used for Thailand: GOV.UK Foreign Travel Advice).
- The destination country's own government transport/road authority.
- Embassy or consulate official pages.
- The text or official signatory list of the 1949 Geneva Convention on Road Traffic / 1968 Vienna Convention on Road Traffic.
- The destination's own IDP-recognition legislation, where publicly published.

A source qualifies as primary if it is an official body speaking about its own jurisdiction. A commercial site *citing* a government source is not itself primary — go to the government source directly.

## 4. What counts as discovery-only (never a citation)

Commercial IDP-processing sites, competitor pages, general travel blogs, and forum posts. These are legitimate for one purpose only: telling a researcher *what's plausible and where an official confirmation might exist*. Concretely, discovery sources may inform which primary source to go check and what a "reasonable" answer might look like — but:

- Their specific figures (speed limits, BAC limits, checkpoint frequency, age minimums) are never copied into a record.
- Their wording, tone, and structure are never used as a writing model.
- They never appear in a page's `sourceCitations`.

If a fact can only be found on discovery-only sources and no primary source confirms it, the correct outcome is `partially_sourced` (if corroborated per §5) or `pending` (if not) — never `confirmed`.

## 5. The `partially_sourced` bar, and why it's stricter than it first looks

The original working rule was "two or more independent commercial sources agree." That bar is weaker than it sounds: many commercial IDP sites visibly repost or paraphrase a shared upstream source (each other, or a common syndicated feed), so two sites "agreeing" can really be one source counted twice — an echo chamber, not independent corroboration.

**Revised rule:** a fact qualifies as `partially_sourced` only if at least two sources agree **and** those sources are not obviously derivative of each other (different publishers, different apparent underlying data, not near-identical phrasing of the same sentence). If the only available sources are clearly copying one another, treat it as a single source — insufficient for `partially_sourced`, and the fact drops to `pending` unless a primary source is found.

## 6. Sourcing keyword/volume data

Search-volume, difficulty, and related-query data come only from a real keyword-research tool (Semrush or equivalent) actually queried for that term. If no data is returned or the tool wasn't queried, the record states "no search-volume data available" — it never estimates or guesses a plausible-sounding number.

## 7. Citation record requirements

A "citation" is now two linked records, not one flat entry (`KNOWLEDGE_OBJECTS.md` v1.1 §6–§7):

- A **Source** — the publication itself: `title`, `publisher`, `url` (the direct page, not a homepage), `organization`/`publisher` name, and a `classification` of `primary` or `discovery-only` (§3/§4 above).
- An **Evidence** record — the specific support that Source provides for one or more specific `Claim`s, including *which* claims (`supportedClaimRefs`), not just that some citation exists somewhere on the record.

Every `confirmed` claim must have at least one `Evidence` entry in its `evidenceRefs`, and that evidence's `sourceId` must resolve to a `Source` with `classification: "primary"`. "Various sources" or an unlabeled URL was never a valid citation under v1.0 either — what's new is that the *link* from a specific claim to its specific evidence is now a first-class, checkable field (`Claim.evidenceRefs`) instead of an unstated assumption that *some* entry in a shared array probably supports it.

**A claim may legitimately have an empty `evidenceRefs` array.** That is not a violation of this section — it's the honest, visible state that existed all along, now visible instead of hidden inside a record-wide citation list that never specified which fact it was for. Closing that gap for a specific claim means adding real evidence, not adding a citation to the record in general.

## 8. Re-verification cadence

`lastVerifiedDate` should be refreshed whenever a real research pass touches the record. As a starting policy: a record whose `lastVerifiedDate` is more than 12 months old should be re-verified before the page is either refreshed for a content update or promoted to a higher tier. This is a process the organization has to actually run — the field alone doesn't enforce anything; see §10.

## 9. Interaction with other documents

- Bounded by `BUSINESS_TRUTH_LAYER.md`: this document decides confidence, never permission — a well-sourced claim BTL forbids is still forbidden.
- Feeds `KNOWLEDGE_OBJECTS.md`: every `Claim.confidence` and `Evidence.verificationStatus` value is the direct output of applying this standard; §7's Source/Evidence split (above) is that document's data shape for what this section has always required in prose.
- Consumed by `EDITORIAL_GUIDELINES.md`: the confidence level this document assigns determines which wording pattern editorial uses.
- Checked by `VALIDATION_RULES.md`: "every `confirmed` claim has linked evidence" (row 7 / VR-07) is a mechanically checkable rule sourced from this section — it was `NOT_IMPLEMENTED` under the v1.0 flat-array shape and becomes checkable once `KNOWLEDGE_OBJECTS.md` v1.1's registries are implemented in code (tracked in `PHASE_3_DESIGN.md`, not by this document).

## 10. Future scalability concerns

- **This is the real bottleneck at 195 countries**, not the code architecture. A Tier 1 country's ~15 Category C facts, each individually verified against a primary source, was slow and labor-intensive even once, for one country. At scale this needs either significantly more research capacity, a lower per-country verification bar for non-Tier-1 countries (the tier system already anticipates this — `KNOWLEDGE_OBJECTS.md` §4), or both. This standard doesn't solve that problem; it just makes sure whatever capacity exists is spent rigorously rather than sloppily.
- **Batch-verifiable facts.** Some fields (e.g. `conventionStatus` — Geneva/Vienna convention signatory status) can likely be verified once against a single authoritative signatory list covering all 195 countries at once, rather than researched country-by-country from scratch. Worth identifying which fields batch-verify cleanly as an efficiency gain before scaling research effort linearly with country count.
- **Re-verification debt.** As the registry grows, the 12-month re-verification policy (§8) creates an ever-growing recurring workload, not a one-time cost. This needs an owner and a schedule, not just a field on the data model.
- **Per-claim evidence linkage (§7, new in v1.1) adds real authoring overhead.** Recording *which* claim a piece of evidence supports, rather than attaching a citation to a record broadly, is more precise and more work per fact. Whether that overhead is worth it in practice — versus, say, linking evidence at the module level instead of the individual-claim level — is untested against anything beyond Thailand's two sources; see `KNOWLEDGE_OBJECTS.md` v1.1 §16.

## 11. Self-critique

The original draft of this standard (before this revision) used "two independent commercial sources" as the `partially_sourced` bar without checking whether "independent" was real — that was a genuine weakness, since commercial IDP-info sites are known to reuse each other's content, meaning the bar as first written could pass a fact that's actually only ever been asserted once, dressed up as two. §5's revision — requiring sources to be non-derivative of each other, not just numerically plural — directly fixes that. The remaining open weakness is that "obviously derivative" is a judgment call without a hard test; a future version of this standard could benefit from a more concrete checklist (e.g., shared exact phrasing above some threshold = derivative) once enough real examples exist to calibrate against.
