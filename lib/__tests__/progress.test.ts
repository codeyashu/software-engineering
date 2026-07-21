import { describe, it, expect } from 'vitest';
import { setStatus, rollup } from '../progress';

const topics = [
  { id: 'a', durationHrs: 2 },
  { id: 'b', durationHrs: 3 },
];

describe('progress', () => {
  it('sets status immutably', () => {
    const s = setStatus({}, 'a', 'done');
    expect(s.a).toBe('done');
  });

  it('rolls up pct + hours', () => {
    const r = rollup(topics, { a: 'done' });
    expect(r.pct).toBe(50);
    expect(r.hoursDone).toBe(2);
    expect(r.hoursTotal).toBe(5);
  });
});
