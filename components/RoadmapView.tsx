'use client';

import { useMemo, useState } from 'react';
import { RoadmapTopic } from '@/lib/schemas';
import { filterTopics, sortTopics, totalHours } from '@/lib/roadmap';
import RoadmapFilters, { FilterState } from './RoadmapFilters';
import RoadmapNav from './RoadmapNav';
import RoadmapSection from './RoadmapSection';

export type RoadmapSectionData = {
  id: string;
  title: string;
  priority?: string;
  exit?: string;
  topics: RoadmapTopic[];
};

export default function RoadmapView({
  title,
  description,
  sections,
  showNav = true,
}: {
  title: string;
  description: string;
  sections: RoadmapSectionData[];
  showNav?: boolean;
}) {
  const [state, setState] = useState<FilterState>({
    priority: '',
    status: '',
    maxComplexity: '',
    sortKey: 'priority',
    dir: 'asc',
  });

  const allTopics = useMemo(() => sections.flatMap((s) => s.topics), [sections]);

  const filteredSections = useMemo(
    () =>
      sections.map((s) => ({
        ...s,
        filtered: sortTopics(
          filterTopics(s.topics, {
            priority: state.priority || undefined,
            status: state.status || undefined,
            maxComplexity: state.maxComplexity ? Number(state.maxComplexity) : undefined,
          }),
          state.sortKey,
          state.dir,
        ),
      })),
    [sections, state],
  );

  const visibleCount = filteredSections.reduce((n, s) => n + s.filtered.length, 0);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        <p className="mt-2 text-[var(--fg-muted)]">{description}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm tabular-nums text-[var(--fg-muted)]">
          <span>
            <strong className="text-[var(--fg)]">{allTopics.length}</strong> topics
          </span>
          <span>
            <strong className="text-[var(--fg)]">{allTopics.filter((t) => t.status === 'done').length}</strong> done
          </span>
          <span>
            <strong className="text-[var(--fg)]">{totalHours(allTopics)}h</strong> total
          </span>
        </div>
      </header>

      <div className="mb-6">
        <RoadmapFilters state={state} onChange={setState} />
        <p className="mt-3 text-xs text-[var(--fg-muted)]">{visibleCount} topics match current filters</p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {showNav && sections.length > 1 && (
          <RoadmapNav items={sections.map((s) => ({ id: s.id, label: s.title }))} />
        )}
        <div className="min-w-0 flex-1">
          {filteredSections.map((s) => (
            <RoadmapSection
              key={s.id}
              id={s.id}
              title={s.title}
              priority={s.priority}
              exit={s.exit}
              allTopics={s.topics}
              topics={s.filtered}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
