import { describe, it, expect } from 'vitest';
import { pickToday } from '../picker';

const t = (o: any) => ({
  complexity: o.c ?? 1,
  durationHrs: 1,
  priority: o.p ?? 'P1',
  status: o.s ?? 'not-started',
  prereqs: o.pre ?? [],
  id: o.id,
  title: o.id,
  track: 'a',
});

describe('pickToday', () => {
  const topics = [
    t({ id: 'a', p: 'P1', c: 2 }),
    t({ id: 'b', p: 'P1', c: 1 }),
    t({ id: 'c', p: 'P2' }),
    t({ id: 'd', p: 'P1', pre: ['a'] }),
    t({ id: 'e', s: 'parked', p: 'P1' }),
  ];

  it('picks P1 lowest-complexity first, skips gated + parked', () => {
    const r = pickToday(topics, {}, { count: 2, recentIds: [] });
    expect(r.map((x) => x.id)).toEqual(['b', 'a']);
  });

  it('unlocks gated topic once prereq done + skips recent', () => {
    const r = pickToday(topics, { a: 'done', b: 'done' }, { count: 3, recentIds: ['c'] });
    expect(r.map((x) => x.id)).toEqual(['d']);
  });
});
