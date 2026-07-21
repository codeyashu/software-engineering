'use client';

import { useEffect, useState } from 'react';
import { RoadmapTopic } from '@/lib/schemas';
import { readProgress, rollup } from '@/lib/progress';

export default function OverallProgress({ topics }: { topics: RoadmapTopic[] }) {
  const [r, setR] = useState<ReturnType<typeof rollup> | null>(null);

  useEffect(() => {
    setR(rollup(topics, readProgress()));
  }, [topics]);

  return (
    <div className="rounded-lg border px-4 py-3">
      <p className="text-2xl font-bold">{r === null ? '—' : `${r.pct}%`}</p>
      <p className="text-xs text-neutral-500">
        {r === null ? 'overall' : `${r.done}/${r.total} topics · ${r.hoursDone}/${r.hoursTotal}h`}
      </p>
    </div>
  );
}
