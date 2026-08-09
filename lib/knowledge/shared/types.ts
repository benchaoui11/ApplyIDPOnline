// Shared primitive types used across every registry. Kept in one place so
// "confidence" and "review state" mean exactly one thing everywhere —
// see docs/KNOWLEDGE_OBJECTS.md v1.1 for the authoritative definitions.

export type VerificationStatus = "confirmed" | "partially_sourced" | "pending";

export type ReviewState = "draft" | "researched" | "authored" | "validated" | "published" | "needs-review";

export type PublicationState = "unpublished" | "published" | "archived";

// BUSINESS_TRUTH_LAYER.md §3's claim-source category.
export type BusinessTruthCategory = "A" | "B" | "C";
