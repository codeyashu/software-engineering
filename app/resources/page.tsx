import { loadResources } from '@/lib/content';
import { ResourceItem } from '@/lib/schemas';

const KINDS: { kind: ResourceItem['kind']; label: string }[] = [
  { kind: 'anchor', label: 'Core anchor resources' },
  { kind: 'newsletter', label: 'Blogs & newsletters' },
  { kind: 'video', label: 'YouTube & videos' },
  { kind: 'doc', label: 'Docs & interactive courses' },
];

export default function ResourcesPage() {
  const groups = KINDS.map((g) => ({ ...g, items: loadResources(g.kind) }));

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Resources</h1>
      <p className="mt-1 text-neutral-600">Curated docs, videos, blogs, and anchor repos. Tags map to track IDs.</p>
      {groups.map((g) => (
        <section key={g.kind} className="mt-8">
          <h2 className="text-lg font-bold">{g.label}</h2>
          <ul className="mt-3 space-y-2">
            {g.items.map((r) => (
              <li key={r.url} className="flex flex-wrap items-baseline justify-between gap-2 border-b py-2">
                <a href={r.url} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                  {r.label}
                </a>
                <span className="text-xs text-neutral-400">{r.tags.join(' · ')}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
