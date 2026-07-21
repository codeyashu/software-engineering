import { loadTracks } from '@/lib/content';
import RoadmapTable from '@/components/RoadmapTable';

export default function RoadmapPage() {
  const tracks = loadTracks();
  const topics = tracks.flatMap((t) => t.subtopics.map((s) => ({ ...s, track: t.id })));

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Track Roadmap</h1>
      <p className="mt-1 text-neutral-600">All subtopics across all 12 tracks, filterable and sortable.</p>
      <div className="mt-6">
        <RoadmapTable topics={topics} />
      </div>
    </main>
  );
}
