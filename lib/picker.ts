import { RoadmapTopic } from './schemas';
import { ProgressState } from './progress';

const PRANK: Record<string, number> = { P1: 1, P2: 2, P3: 3, P4: 4, P5: 5 };

export function pickToday<T extends RoadmapTopic>(
  topics: T[],
  progress: ProgressState,
  opts: { count: number; recentIds: string[] },
): T[] {
  const done = (id: string) => progress[id] === 'done';
  return topics
    .filter((t) => t.status !== 'parked' && progress[t.id] !== 'done')
    .filter((t) => !opts.recentIds.includes(t.id))
    .filter((t) => t.prereqs.every(done))
    .sort((a, b) => PRANK[a.priority] - PRANK[b.priority] || a.complexity - b.complexity)
    .slice(0, opts.count);
}
