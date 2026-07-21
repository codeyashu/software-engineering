import { loadSystemDesignRoadmap } from '@/lib/content';
import RoadmapView from '@/components/RoadmapView';

export default function SystemDesignRoadmapPage() {
  const topics = loadSystemDesignRoadmap();

  return (
    <RoadmapView
      title="System Design Roadmap"
      description="One entry per deep-dive doc — track what you've actually studied, separately from the AI-curriculum tracks."
      sections={[{ id: 'system-design', title: 'System Design Roadmap', topics }]}
      showNav={false}
    />
  );
}
