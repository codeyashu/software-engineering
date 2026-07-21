import { describe, it, expect } from 'vitest';
import { staleness, nextToEnrich } from '../staleness';

describe('staleness', () => {
  it('never-reviewed docs are maximally stale', () =>
    expect(staleness({ cadence: 'fast', lastReviewed: null }, '2026-07-21')).toBe(Infinity));
  it('fast doc overdue after 7 days', () =>
    expect(staleness({ cadence: 'fast', lastReviewed: '2026-07-10' }, '2026-07-21')).toBeGreaterThan(0));
  it('stable doc not yet due after 10 days', () =>
    expect(staleness({ cadence: 'stable', lastReviewed: '2026-07-11' }, '2026-07-21')).toBeLessThan(0));
});

describe('nextToEnrich', () => {
  it('picks the never-reviewed doc over a merely-overdue one', () => {
    const docs = [
      { slug: 'a', section: 'concepts', cadence: 'fast' as const, lastReviewed: '2026-07-01' },
      { slug: 'b', section: 'system-design', cadence: 'stable' as const, lastReviewed: null },
    ];
    expect(nextToEnrich(docs, '2026-07-21')?.slug).toBe('b');
  });
});
