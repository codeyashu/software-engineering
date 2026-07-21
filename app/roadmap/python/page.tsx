import { loadPythonRoadmap } from '@/lib/content';
import RoadmapTable from '@/components/RoadmapTable';

export default function PythonRoadmapPage() {
  const topics = loadPythonRoadmap();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Python Roadmap</h1>
      <p className="mt-1 text-neutral-600">Python-primary refresher-to-intermediate track.</p>
      <div className="mt-6">
        <RoadmapTable topics={topics} />
      </div>
    </main>
  );
}
