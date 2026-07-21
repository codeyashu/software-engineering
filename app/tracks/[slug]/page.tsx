import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { trackSlugs, loadTrackMdx } from '@/lib/content';

export function generateStaticParams() {
  return trackSlugs().map((slug) => ({ slug }));
}

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!trackSlugs().includes(slug)) notFound();

  const { body } = loadTrackMdx(slug);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <article className="prose prose-neutral max-w-none prose-headings:font-bold prose-a:text-blue-600">
        <MDXRemote source={body} />
      </article>
    </main>
  );
}
