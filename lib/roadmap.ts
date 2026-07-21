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

export const groupByTrack = (ts: RoadmapTopic[]): Map<string, RoadmapTopic[]> => {
  const groups = new Map<string, RoadmapTopic[]>();
  for (const t of ts) {
    const key = t.track ?? '';
    const bucket = groups.get(key);
    if (bucket) bucket.push(t);
    else groups.set(key, [t]);
  }
  return groups;
};

export const trackProgress = (ts: RoadmapTopic[]) => {
  const done = ts.filter((t) => t.status === 'done').length;
  const hoursTotal = Math.round(totalHours(ts) * 10) / 10;
  const hoursLogged = Math.round(ts.reduce((n, t) => n + (t.timeSpentHrs || 0), 0) * 10) / 10;
  const pct = hoursTotal === 0 ? 0 : Math.round((hoursLogged / hoursTotal) * 100);
  return { done, total: ts.length, hoursTotal, hoursLogged, pct };
};
