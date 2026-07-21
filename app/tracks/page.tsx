import Link from 'next/link';
import { loadTracks } from '@/lib/content';

export default function TracksIndexPage() {
  const tracks = loadTracks();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold">Tracks</h1>
      <p className="mt-1 text-neutral-600">The 12 tracks of the AI Engineer Curriculum.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {tracks.map((t) => (
          <Link
            key={t.id}
            href={`/tracks/${t.id}`}
            className="block rounded-lg border p-4 transition hover:border-blue-400 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{t.title}</h2>
              <span className="rounded bg-neutral-100 px-2 py-0.5 text-xs font-medium">{t.priority}</span>
            </div>
            <p className="mt-2 text-sm text-neutral-600">{t.exit}</p>
            <p className="mt-2 text-xs text-neutral-400">{t.subtopics.length} subtopics</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
