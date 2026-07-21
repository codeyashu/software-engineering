import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadAdrs } from '@/lib/content';

export default function AdrPage() {
  const adrs = loadAdrs();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">ADR Log</h1>
      <p className="mt-1 text-neutral-600">
        Architecture Decision Records. &ldquo;Architect skill = measured choices + written
        ADRs&rdquo; — one per major decision. Template: <code>content/adr/template.md</code>.
      </p>
      {adrs.map((a) => (
        <article
          key={a.slug}
          className="prose prose-neutral mt-10 max-w-none border-t pt-8 prose-headings:font-bold prose-a:text-blue-600"
        >
          <div className="not-prose mb-2 flex items-center gap-3 text-xs text-neutral-500">
            <span>{a.date}</span>
            <span className="rounded bg-neutral-100 px-2 py-0.5">{a.status}</span>
          </div>
          <h2>{a.title}</h2>
          <MDXRemote source={a.body} />
        </article>
      ))}
    </main>
  );
}
