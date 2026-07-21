'use client';

import { useMemo, useState } from 'react';
import { RoadmapTopic } from '@/lib/schemas';
import { filterTopics, sortTopics, totalHours } from '@/lib/roadmap';

type SortKey = 'complexity' | 'durationHrs' | 'priority';

export default function RoadmapTable({ topics }: { topics: RoadmapTopic[] }) {
  const [priority, setPriority] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [maxComplexity, setMaxComplexity] = useState<string>('');
  const [sortKey, setSortKey] = useState<SortKey>('priority');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');

  const rows = useMemo(() => {
    const filtered = filterTopics(topics, {
      priority: priority || undefined,
      status: status || undefined,
      maxComplexity: maxComplexity ? Number(maxComplexity) : undefined,
    });
    return sortTopics(filtered, sortKey, dir);
  }, [topics, priority, status, maxComplexity, sortKey, dir]);

  const toggleSort = (key: SortKey) => {
    if (key === sortKey) setDir(dir === 'asc' ? 'desc' : 'asc');
    else {
      setSortKey(key);
      setDir('asc');
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3 text-sm">
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded border px-2 py-1">
          <option value="">All priorities</option>
          {['P1', 'P2', 'P3', 'P4', 'P5'].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded border px-2 py-1">
          <option value="">All statuses</option>
          {['not-started', 'in-progress', 'done', 'parked'].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={maxComplexity}
          onChange={(e) => setMaxComplexity(e.target.value)}
          className="rounded border px-2 py-1"
        >
          <option value="">Any complexity</option>
          {[1, 2, 3, 4, 5].map((c) => (
            <option key={c} value={c}>
              &le; {c}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b text-left">
            <th className="py-2 pr-4">Topic</th>
            <th className="cursor-pointer py-2 pr-4" onClick={() => toggleSort('priority')}>
              Priority
            </th>
            <th className="cursor-pointer py-2 pr-4" onClick={() => toggleSort('complexity')}>
              Complexity
            </th>
            <th className="cursor-pointer py-2 pr-4" onClick={() => toggleSort('durationHrs')}>
              Hours
            </th>
            <th className="py-2 pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.id} className="border-b">
              <td className="py-2 pr-4">{t.title}</td>
              <td className="py-2 pr-4">{t.priority}</td>
              <td className="py-2 pr-4">{t.complexity}</td>
              <td className="py-2 pr-4">{t.durationHrs}</td>
              <td className="py-2 pr-4">{t.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-sm text-neutral-600">
        {rows.length} topics &middot; {totalHours(rows)}h total
      </p>
    </div>
  );
}
