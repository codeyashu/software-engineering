export const CADENCE_DAYS = { fast: 7, stable: 90 } as const;
type Cadence = keyof typeof CADENCE_DAYS;

const daysBetween = (from: string, to: string) =>
  (new Date(to + 'T00:00:00Z').getTime() - new Date(from + 'T00:00:00Z').getTime()) / 86400000;

// Higher = more overdue. Never-reviewed docs always win (Infinity).
export function staleness(doc: { cadence: Cadence; lastReviewed: string | null }, today: string): number {
  if (doc.lastReviewed === null) return Infinity;
  return daysBetween(doc.lastReviewed, today) - CADENCE_DAYS[doc.cadence];
}

export function nextToEnrich<T extends { cadence: Cadence; lastReviewed: string | null }>(
  docs: T[],
  today: string,
): T | null {
  if (docs.length === 0) return null;
  return [...docs].sort((a, b) => staleness(b, today) - staleness(a, today))[0];
}
