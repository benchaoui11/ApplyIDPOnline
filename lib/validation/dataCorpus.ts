// Collects every human-readable prose string out of a CountryRecord +
// GlobalConstants, tagged with its source path, for data-layer text checks
// (banned superlatives, hedge-word repetition, adjacent-module duplication).
//
// Known, documented limitation: this does NOT include prose hardcoded
// directly in component JSX (e.g. CountryHero's hero paragraph,
// EligibilitySection's supporting line, FormatNote's PLANS benefit copy).
// Those strings live outside the data layer and are outside this
// prototype's reach — see docs/VALIDATOR_IMPLEMENTATION_MATRIX.md.

import type { CountryRecord, GlobalConstants, GuideTab } from "@/lib/countryData/types";

export type CorpusEntry = { path: string; text: string };

export function buildDataCorpus(record: CountryRecord, globals: GlobalConstants): CorpusEntry[] {
  const entries: CorpusEntry[] = [];
  const push = (path: string, text: string | undefined) => {
    if (text) entries.push({ path, text });
  };

  const guideFields: [string, GuideTab | undefined][] = [
    ["drivingGuide", record.drivingGuide],
    ["roadRulesGuide", record.roadRulesGuide],
    ["rentalGuide", record.rentalGuide],
    ["scooterGuide", record.scooterGuide],
    ["policeGuide", record.policeGuide],
    ["borderCrossingGuide", record.borderCrossingGuide],
  ];
  for (const [key, guide] of guideFields) {
    if (!guide) continue;
    push(`${key}.directAnswer`, guide.directAnswer);
    push(`${key}.solutionNote`, guide.solutionNote);
    guide.points.forEach((p, i) => push(`${key}.points[${i}].tip`, p.tip));
  }

  record.faq.forEach((f, i) => {
    push(`faq[${i}].question`, f.question);
    push(`faq[${i}].answer`, f.answer);
  });

  record.popularDrivingAreas.forEach((a, i) => push(`popularDrivingAreas[${i}].note`, a.note));
  push("vehicleCategoryNote.value", record.vehicleCategoryNote?.value);
  push("digitalIdpAcceptance.value", record.digitalIdpAcceptance.value);
  push("conventionStatus.value", record.conventionStatus.value);

  push("globalConstants.digitalDeliveryClaim", globals.digitalDeliveryClaim);
  push("globalConstants.printedFormatAvailability", globals.printedFormatAvailability);
  push("globalConstants.trustDisclosureCopy", globals.trustDisclosureCopy);
  push("globalConstants.originalLicenseRequirementCopy", globals.originalLicenseRequirementCopy);
  globals.applicationProcessSteps.forEach((s, i) => push(`globalConstants.applicationProcessSteps[${i}].body`, s.body));
  globals.trustCards.forEach((c, i) => push(`globalConstants.trustCards[${i}].body`, c.body));

  return entries;
}

// Returns the platform's current "modules" — the xGuide fields — in the
// fixed order PracticalGuide.tsx builds its tabs in. Used as the Phase 2A
// proxy for KNOWLEDGE_OBJECTS.md's not-yet-implemented module map.
export function getPopulatedGuideModules(record: CountryRecord): { key: string; guide: GuideTab }[] {
  const ordered: [string, GuideTab | undefined, boolean][] = [
    ["drivingGuide", record.drivingGuide, true],
    ["roadRulesGuide", record.roadRulesGuide, true],
    ["rentalGuide", record.rentalGuide, true],
    ["scooterGuide", record.scooterGuide, record.motorcycleScooterRelevant],
    ["policeGuide", record.policeGuide, true],
    ["borderCrossingGuide", record.borderCrossingGuide, record.borderCrossingRelevant],
  ];
  return ordered
    .filter(([, guide, relevant]) => Boolean(guide) && relevant)
    .map(([key, guide]) => ({ key, guide: guide as GuideTab }));
}
