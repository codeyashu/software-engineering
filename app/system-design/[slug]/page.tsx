import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { systemDesignSlugs, loadSystemDesign } from '@/lib/content';
import { mdxComponents } from '@/components/MdxComponents';

export function generateStaticParams() {
  return systemDesignSlugs().map((slug) => ({ slug }));
}

export default async function SystemDesignDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = loadSystemDesign().find((d) => d.slug === slug);
  if (!doc) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-4 flex items-center gap-3 text-xs text-neutral-500">
        <span className="rounded bg-neutral-100 px-2 py-0.5">{String(doc.frontmatter.cadence ?? '')}</span>
        <span>reviewed {String(doc.frontmatter.lastReviewed ?? 'never')}</span>
      </div>
      <article className="prose prose-neutral max-w-none prose-headings:font-bold prose-a:text-blue-600">
        <h1>{String(doc.frontmatter.title ?? doc.slug)}</h1>
        <MDXRemote source={doc.body} components={mdxComponents} />
      </article>
    </main>
  );
}
