import { loadTracks } from '@/lib/content';
import RoadmapView from '@/components/RoadmapView';

export default function RoadmapPage() {
  const tracks = loadTracks();
  const sections = tracks.map((t) => ({
    id: t.id,
    title: t.title,
    priority: t.priority,
    exit: t.exit,
    topics: t.subtopics.map((s) => ({ ...s, track: t.id })),
  }));

  return (
    <RoadmapView
      title="Track Roadmap"
      description="All 12 tracks, grouped by area — filterable and sortable within each."
      sections={sections}
    />
  );
}
