'use client';

import { useEffect, useState } from 'react';
import { currentStreak } from '@/lib/streak';

// `dates` are the ISO days the daily agent has logged (build-time data);
// today is computed client-side so the streak is accurate on view.
export default function StreakBadge({ dates }: { dates: string[] }) {
  const [streak, setStreak] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setStreak(currentStreak(dates, today));
  }, [dates]);

  return (
    <div className="rounded-lg border px-4 py-3">
      <p className="text-2xl font-bold">{streak === null ? '—' : `${streak}🔥`}</p>
      <p className="text-xs text-neutral-500">day streak</p>
    </div>
  );
}
