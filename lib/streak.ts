const day = (d: string) => new Date(d + 'T00:00:00Z').getTime();
const DAY = 86400000;

// Consecutive ISO days ending at `today`. If `today` is not in the set, the
// streak is 0 (a streak must include today to be "current").
export const currentStreak = (dates: string[], today: string): number => {
  const set = new Set(dates);
  let n = 0;
  let cursor = day(today);
  while (set.has(new Date(cursor).toISOString().slice(0, 10))) {
    n++;
    cursor -= DAY;
  }
  return n;
};
