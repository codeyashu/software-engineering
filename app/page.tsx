import Link from 'next/link';
import { loadTracks, dailyDates, loadLatestDaily } from '@/lib/content';
import StreakBadge from '@/components/StreakBadge';
import TodayCard from '@/components/TodayCard';
import OverallProgress from '@/components/OverallProgress';

export default function HomePage() {
  const tracks = loadTracks();
  const allTopics = tracks.flatMap((t) => t.subtopics.map((s) => ({ ...s, track: t.id })));
  const p1Tracks = tracks.filter((t) => t.priority === 'P1');

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">AI Engineer Learning Hub</h1>
      <p className="mt-1 text-neutral-600">Your end-to-end guide for the 2026 AI Engineer Curriculum.</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <OverallProgress topics={allTopics} />
        <StreakBadge dates={dailyDates()} />
        <Link href="/qa" className="rounded-lg border px-4 py-3 hover:border-blue-400">
          <p className="text-2xl font-bold">Q&amp;A</p>
          <p className="text-xs text-neutral-500">flashcards &amp; interview prep</p>
        </Link>
      </div>

      <div className="mt-6">
        <TodayCard daily={loadLatestDaily()} />
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-bold">Start here (P1 tracks)</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {p1Tracks.map((t) => (
            <Link key={t.id} href={`/tracks/${t.id}`} className="rounded-lg border p-4 hover:border-blue-400">
              <h3 className="font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-neutral-600">{t.exit}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="projects" className="mt-8">
        <h2 className="text-lg font-bold">Project ledger</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Your &ldquo;target + evidence&rdquo; ledger lands in Task 11 — one row per track exit-criterion
          with artifact + validation links.
        </p>
      </section>
    </main>
  );
}
