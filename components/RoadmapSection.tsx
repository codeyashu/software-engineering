import Link from 'next/link';
import { RoadmapTopic } from '@/lib/schemas';
import { trackProgress } from '@/lib/roadmap';

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
      <span className="whitespace-nowrap rounded-full border border-[var(--border)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--fg-muted)]">
        {STATUS_LABEL[status]}
      </span>
    );
  }
  return (
    <span
      className="whitespace-nowrap rounded-full px-2.5 py-0.5 text-[11px] font-medium"
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

function TopicRow({ topic }: { topic: RoadmapTopic }) {
  const hasTime = topic.timeSpentHrs != null;
  const timePct = hasTime ? Math.min(100, Math.round((topic.timeSpentHrs! / topic.durationHrs) * 100)) : 0;
  const statusColor =
    topic.status === 'not-started' ? 'var(--fg-muted)' : `var(--status-${STATUS_VAR[topic.status]})`;

  return (
    <div className="grid grid-cols-[18px_1fr] gap-5 border-b border-[var(--border)] py-5 last:border-b-0 hover:bg-[var(--accent-soft)] sm:grid-cols-[18px_1fr_180px]">
      <span className="mt-1.5 h-2 w-2 rounded-full" style={{ background: statusColor }} />

      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="font-display text-base font-semibold leading-snug">{topic.title}</h3>
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--fg-muted)]">
          <ComplexityDots level={topic.complexity} />
          <span className="tabular-nums">{topic.durationHrs}h estimated</span>
          {topic.prereqs.length > 0 && (
            <span className="inline-flex flex-wrap gap-1">
              {topic.prereqs.map((p) => (
                <span key={p} className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[10.5px]">
                  {p}
                </span>
              ))}
            </span>
          )}
        </div>
        {topic.notes && (
          <p className="mt-0.5 max-w-prose text-[13px] italic leading-relaxed text-[var(--fg-muted)]">
            {topic.notes}
          </p>
        )}
        {topic.guide && (
          <Link
            href={`/${topic.guide.section}/${topic.guide.slug}`}
            className="mt-0.5 text-xs font-medium text-[var(--accent)] hover:underline"
          >
            Read the deep dive →
          </Link>
        )}
      </div>

      <div className="flex flex-row items-center gap-2 sm:flex-col sm:items-end sm:gap-1.5">
        <div className="flex gap-1.5">
          <span className="rounded-full bg-[var(--accent-soft)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
            {topic.priority}
          </span>
          <StatusPill status={topic.status} />
        </div>
        {hasTime && (
          <div className="flex w-full flex-col items-end gap-0.5 sm:w-full">
            <span className="whitespace-nowrap text-[11px] tabular-nums text-[var(--fg-muted)]">
              {topic.timeSpentHrs}h logged
            </span>
            {topic.lastWorked && (
              <span className="whitespace-nowrap text-[11px] tabular-nums text-[var(--fg-muted)]">
                last {topic.lastWorked}
              </span>
            )}
            <div className="mt-0.5 h-[3px] w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div
                className="ml-auto h-full rounded-full"
                style={{ width: `${timePct}%`, background: 'var(--status-progress)' }}
              />
            </div>
          </div>
        )}
      </div>
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
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
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
            {progress.done}/{progress.total} done · {progress.hoursLogged}h / {progress.hoursTotal}h ({progress.pct}%)
          </span>
        </div>
      </div>
      <div className="mb-4 h-[7px] w-full overflow-hidden rounded-full bg-[var(--border)]">
        <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${progress.pct}%` }} />
      </div>
      <div>
        {topics.map((t) => (
          <TopicRow key={t.id} topic={t} />
        ))}
      </div>
    </section>
  );
}
