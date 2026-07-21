import { describe, it, expect } from 'vitest';
import { filterTopics, sortTopics, totalHours } from '../roadmap';

const t = (o: Partial<any>) => ({
  id: o.id,
  title: o.id,
  complexity: o.complexity ?? 1,
  durationHrs: o.durationHrs ?? 1,
  priority: o.priority ?? 'P1',
  status: o.status ?? 'not-started',
  prereqs: [],
});

const data = [
  t({ id: 'x', complexity: 4, durationHrs: 3, priority: 'P2' }),
  t({ id: 'y', complexity: 1, durationHrs: 1, priority: 'P1' }),
  t({ id: 'z', complexity: 2, durationHrs: 5, priority: 'P1', status: 'done' }),
];

describe('roadmap', () => {
  it('filters by priority', () =>
    expect(filterTopics(data, { priority: 'P1' }).map((d) => d.id)).toEqual(['y', 'z']));
  it('filters by maxComplexity', () =>
    expect(filterTopics(data, { maxComplexity: 2 }).map((d) => d.id)).toEqual(['y', 'z']));
  it('sorts by durationHrs desc', () =>
    expect(sortTopics(data, 'durationHrs', 'desc')[0].id).toBe('z'));
  it('sums hours', () => expect(totalHours(data)).toBe(9));
});
