import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadSystemDesign } from '@/lib/content';

export default function SystemDesignPage() {
  const pages = loadSystemDesign();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">System Design Notes</h1>
      <p className="mt-1 text-neutral-600">
        Recurring AI system-design patterns referenced across tracks.
      </p>
      {pages.map((p) => (
        <article
          key={p.slug}
          id={p.slug}
          className="prose prose-neutral mt-10 max-w-none border-t pt-8 prose-headings:font-bold prose-a:text-blue-600"
        >
          <h2>{String(p.frontmatter.title ?? p.slug)}</h2>
          <MDXRemote source={p.body} />
        </article>
      ))}
    </main>
  );
}
