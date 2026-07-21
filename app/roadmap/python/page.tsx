import { loadPythonRoadmap } from '@/lib/content';
import RoadmapView from '@/components/RoadmapView';

export default function PythonRoadmapPage() {
  const topics = loadPythonRoadmap();

  return (
    <RoadmapView
      title="Python Roadmap"
      description="Python-primary refresher-to-intermediate track."
      sections={[{ id: 'python', title: 'Python Roadmap', topics }]}
      showNav={false}
    />
  );
}
