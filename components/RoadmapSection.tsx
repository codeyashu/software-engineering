import Link from 'next/link';
import { RoadmapTopic } from '@/lib/schemas';
import { trackProgress, totalHours } from '@/lib/roadmap';

const STATUS_LABEL: Record<RoadmapTopic['status'], string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  done: 'Done',
  parked: 'Parked',
};

const STATUS_VAR: Record<RoadmapTopic['status'], string> = {
  'not-started': 'notstarted',
  'in-progress': 'progress',
  done: 'done',
  parked: 'parked',
};

function StatusPill({ status }: { status: RoadmapTopic['status'] }) {
  const v = STATUS_VAR[status];
  if (status === 'not-started') {
    return (
      <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-xs font-medium text-[var(--fg-muted)]">
        {STATUS_LABEL[status]}
      </span>
    );
  }
  return (
    <span
      className="rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ background: `var(--status-${v}-soft)`, color: `var(--status-${v})` }}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

function ComplexityDots({ level }: { level: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Complexity ${level} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: i <= level ? 'var(--accent)' : 'var(--border)' }}
        />
      ))}
    </span>
  );
}

function TopicCard({ topic }: { topic: RoadmapTopic }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] p-4">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug">{topic.title}</h3>
        <span className="shrink-0 rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
          {topic.priority}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--fg-muted)]">
        <ComplexityDots level={topic.complexity} />
        <span className="tabular-nums">{topic.durationHrs}h</span>
        <StatusPill status={topic.status} />
      </div>
      {topic.prereqs.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {topic.prereqs.map((p) => (
            <span key={p} className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[11px] text-[var(--fg-muted)]">
              {p}
            </span>
          ))}
        </div>
      )}
      {topic.guide && (
        <Link
          href={`/${topic.guide.section}/${topic.guide.slug}`}
          className="mt-1 text-xs font-medium text-[var(--accent)] hover:underline"
        >
          Read the deep dive →
        </Link>
      )}
    </div>
  );
}

export default function RoadmapSection({
  id,
  title,
  priority,
  exit,
  allTopics,
  topics,
}: {
  id: string;
  title: string;
  priority?: string;
  exit?: string;
  allTopics: RoadmapTopic[];
  topics: RoadmapTopic[];
}) {
  if (topics.length === 0) return null;
  const progress = trackProgress(allTopics);

  return (
    <section id={id} className="scroll-mt-24 border-b border-[var(--border)] py-10 first:pt-0 last:border-b-0">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">{title}</h2>
          {exit && <p className="mt-1 max-w-2xl text-sm text-[var(--fg-muted)]">{exit}</p>}
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--fg-muted)]">
          {priority && (
            <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 font-medium text-[var(--accent)]">
              {priority}
            </span>
          )}
          <span className="tabular-nums">
            {progress.done}/{progress.total} done · {totalHours(allTopics)}h
          </span>
        </div>
      </div>
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress.pct}%` }} />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((t) => (
          <TopicCard key={t.id} topic={t} />
        ))}
      </div>
    </section>
  );
}
