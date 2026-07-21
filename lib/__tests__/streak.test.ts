import { describe, it, expect } from 'vitest';
import { currentStreak } from '../streak';

describe('streak', () => {
  it('counts consecutive days', () =>
    expect(currentStreak(['2026-07-19', '2026-07-20', '2026-07-21'], '2026-07-21')).toBe(3));
  it('breaks on a gap', () =>
    expect(currentStreak(['2026-07-18', '2026-07-20', '2026-07-21'], '2026-07-21')).toBe(2));
  it('is zero when today absent', () =>
    expect(currentStreak(['2026-07-18', '2026-07-19'], '2026-07-21')).toBe(0));
});
