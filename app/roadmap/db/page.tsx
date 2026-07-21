import { loadDbRoadmap } from '@/lib/content';
import RoadmapView from '@/components/RoadmapView';

export default function DbRoadmapPage() {
  const topics = loadDbRoadmap();

  return (
    <RoadmapView
      title="Database Roadmap"
      description="Core database internals and operations — indexing, query planning, transactions, replication."
      sections={[{ id: 'db', title: 'Database Roadmap', topics }]}
      showNav={false}
    />
  );
}
