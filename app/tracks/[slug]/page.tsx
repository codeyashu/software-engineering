import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { trackSlugs, loadTrackMdx, loadTracks } from '@/lib/content';
import TrackChecklist from '@/components/TrackChecklist';
import { mdxComponents } from '@/components/MdxComponents';

export function generateStaticParams() {
  return trackSlugs().map((slug) => ({ slug }));
}

export default async function TrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!trackSlugs().includes(slug)) notFound();

  const { body } = loadTrackMdx(slug);
  const track = loadTracks().find((t) => t.id === slug);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <article className="prose prose-neutral max-w-none prose-headings:font-bold prose-a:text-blue-600">
        <MDXRemote source={body} components={mdxComponents} />
      </article>
      {track && (
        <section className="mt-10 border-t pt-6">
          <h2 className="text-lg font-bold">Progress checklist</h2>
          <TrackChecklist subtopics={track.subtopics} />
        </section>
      )}
    </main>
  );
}
