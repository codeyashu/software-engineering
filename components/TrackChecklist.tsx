'use client';

import { useEffect, useState } from 'react';
import { RoadmapTopic } from '@/lib/schemas';
import { ProgressState, Status, setStatus, readProgress, writeProgress, rollup } from '@/lib/progress';

const CYCLE: Status[] = ['not-started', 'in-progress', 'done'];
const LABEL: Record<Status, string> = {
  'not-started': '○ not started',
  'in-progress': '◐ in progress',
  done: '● done',
};

export default function TrackChecklist({ subtopics }: { subtopics: RoadmapTopic[] }) {
  const [progress, setProgress] = useState<ProgressState>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(readProgress());
    setHydrated(true);
  }, []);

  const cycle = (id: string) => {
    const current = progress[id] ?? 'not-started';
    const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
    const updated = setStatus(progress, id, next);
    setProgress(updated);
    writeProgress(updated);
  };

  const r = rollup(subtopics, progress);

  return (
    <div className="mt-3">
      {hydrated && (
        <p className="mb-3 text-sm text-neutral-600">
          {r.done}/{r.total} done · {r.pct}% · {r.hoursDone}/{r.hoursTotal}h
        </p>
      )}
      <ul className="space-y-1">
        {subtopics.map((s) => {
          const status = (progress[s.id] ?? 'not-started') as Status;
          return (
            <li key={s.id}>
              <button
                onClick={() => cycle(s.id)}
                className="flex w-full items-center justify-between rounded border px-3 py-2 text-left text-sm hover:bg-neutral-50"
              >
                <span>{s.title}</span>
                <span className="ml-3 shrink-0 text-xs text-neutral-500">
                  {hydrated ? LABEL[status] : ''}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
