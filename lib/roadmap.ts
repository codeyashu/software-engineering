import { RoadmapTopic } from './schemas';

type Filter = { priority?: string; status?: string; maxComplexity?: number; track?: string };

export const filterTopics = (ts: RoadmapTopic[], f: Filter): RoadmapTopic[] =>
  ts.filter(
    (t) =>
      (!f.priority || t.priority === f.priority) &&
      (!f.status || t.status === f.status) &&
      (f.maxComplexity == null || t.complexity <= f.maxComplexity) &&
      (!f.track || t.track === f.track),
  );

export const sortTopics = (
  ts: RoadmapTopic[],
  key: 'complexity' | 'durationHrs' | 'priority',
  dir: 'asc' | 'desc',
) => {
  const s = [...ts].sort((a, b) =>
    key === 'priority' ? a.priority.localeCompare(b.priority) : (a[key] as number) - (b[key] as number),
  );
  return dir === 'desc' ? s.reverse() : s;
};

export const totalHours = (ts: RoadmapTopic[]) => ts.reduce((n, t) => n + t.durationHrs, 0);
