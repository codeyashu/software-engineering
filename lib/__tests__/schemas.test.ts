import { describe, it, expect } from 'vitest';
import { RoadmapTopicSchema } from '../schemas';

describe('RoadmapTopicSchema', () => {
  const base = {
    id: 'ctx-window',
    title: 'Context window limits',
    complexity: 3,
    durationHrs: 2,
    priority: 'P1',
    status: 'not-started',
    prereqs: [],
  };

  it('accepts a valid topic', () => {
    expect(RoadmapTopicSchema.parse(base).id).toBe('ctx-window');
  });

  it('rejects complexity out of 1..5', () => {
    expect(() => RoadmapTopicSchema.parse({ ...base, complexity: 9 })).toThrow();
  });

  it('rejects bad priority', () => {
    expect(() => RoadmapTopicSchema.parse({ ...base, priority: 'P9' })).toThrow();
  });
});
