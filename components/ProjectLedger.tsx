import { Project } from '@/lib/schemas';

const STATUS_STYLE: Record<Project['status'], string> = {
  'not-started': 'bg-neutral-100 text-neutral-600',
  'in-progress': 'bg-amber-100 text-amber-700',
  done: 'bg-green-100 text-green-700',
  parked: 'bg-neutral-100 text-neutral-400',
};

export default function ProjectLedger({ projects }: { projects: Project[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {projects.map((p) => (
        <li key={`${p.track}-${p.title}`} className="flex items-center justify-between gap-3 rounded border p-3 text-sm">
          <div>
            <span className="mr-2 rounded bg-neutral-100 px-1.5 py-0.5 text-xs font-medium uppercase">
              {p.track}
            </span>
            {p.title}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {p.artifactUrl && (
              <a href={p.artifactUrl} className="text-xs text-blue-600 hover:underline">
                artifact
              </a>
            )}
            {p.evidenceUrl && (
              <a href={p.evidenceUrl} className="text-xs text-blue-600 hover:underline">
                evidence
              </a>
            )}
            <span className={`rounded px-2 py-0.5 text-xs ${STATUS_STYLE[p.status]}`}>{p.status}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
