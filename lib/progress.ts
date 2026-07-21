export type Status = 'not-started' | 'in-progress' | 'done';
export type ProgressState = Record<string, Status>;

export const setStatus = (s: ProgressState, id: string, status: Status): ProgressState => ({
  ...s,
  [id]: status,
});

export const rollup = (topics: { id: string; durationHrs: number }[], s: ProgressState) => {
  const total = topics.length;
  const done = topics.filter((t) => s[t.id] === 'done').length;
  const hoursTotal = topics.reduce((n, t) => n + t.durationHrs, 0);
  const hoursDone = topics.filter((t) => s[t.id] === 'done').reduce((n, t) => n + t.durationHrs, 0);
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0, hoursDone, hoursTotal };
};

// localStorage helpers (thin wrapper; pure logic above is unit-tested)
export const PROGRESS_KEY = 'aieh:progress';

export function readProgress(): ProgressState {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(PROGRESS_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function writeProgress(state: ProgressState): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
}
