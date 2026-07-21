import Link from 'next/link';

type Doc = { slug: string; frontmatter: Record<string, unknown> };

export default function DeepDiveIndex({ section, docs }: { section: string; docs: Doc[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {docs.map((d) => (
        <Link
          key={d.slug}
          href={`/${section}/${d.slug}`}
          className="rounded-lg border p-4 hover:border-blue-400"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">{String(d.frontmatter.title ?? d.slug)}</h2>
            {d.frontmatter.cadence ? (
              <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs">
                {String(d.frontmatter.cadence)}
              </span>
            ) : null}
          </div>
          {d.frontmatter.lastReviewed ? (
            <p className="mt-1 text-xs text-neutral-400">reviewed {String(d.frontmatter.lastReviewed)}</p>
          ) : (
            <p className="mt-1 text-xs text-neutral-400">not yet reviewed</p>
          )}
        </Link>
      ))}
    </div>
  );
}
