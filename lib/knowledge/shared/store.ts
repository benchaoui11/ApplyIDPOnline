// Generic in-memory registry store. register() is an idempotent upsert
// (safe under Next.js dev-server hot-reload re-imports) — it is the only
// way any registry's data is ever written, per the Registry Ownership
// Matrix in docs/KNOWLEDGE_OBJECTS.md v1.1 §9.
//
// Phase 3.5 addition: tracks IDs that were ever overwritten by a second
// non-identical register() call — the Registry Integrity Checker reads
// this to detect real duplicate-ID collisions while still allowing
// idempotent bootstrap/hot-reload re-registration of the same record.

export function createStore<T extends { id: string }>() {
  const store: Record<string, T> = {};
  const overwrittenIds = new Set<string>();
  const isDifferentRecord = (existing: T, next: T) => JSON.stringify(existing) !== JSON.stringify(next);

  return {
    register(item: T): void {
      if (item.id in store && isDifferentRecord(store[item.id], item)) overwrittenIds.add(item.id);
      store[item.id] = item;
    },
    registerMany(items: T[]): void {
      for (const item of items) {
        if (item.id in store && isDifferentRecord(store[item.id], item)) overwrittenIds.add(item.id);
        store[item.id] = item;
      }
    },
    get(id: string): T | undefined {
      return store[id];
    },
    getAll(): T[] {
      return Object.values(store);
    },
    has(id: string): boolean {
      return id in store;
    },
    getOverwrittenIds(): string[] {
      return [...overwrittenIds];
    },
    clear(): void {
      for (const key of Object.keys(store)) delete store[key];
      overwrittenIds.clear();
    },
  };
}
