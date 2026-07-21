'use client';

import { useEffect, useState } from 'react';
import { RoadmapTopic } from '@/lib/schemas';
import { readProgress, rollup } from '@/lib/progress';

export default function ProgressBadge({ topics }: { topics: RoadmapTopic[] }) {
  const [pct, setPct] = useState<number | null>(null);

  useEffect(() => {
    setPct(rollup(topics, readProgress()).pct);
  }, [topics]);

  return (
    <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
      {pct === null ? '—' : `${pct}%`}
    </span>
  );
}
