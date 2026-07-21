import { loadConcepts } from '@/lib/content';
import DeepDiveIndex from '@/components/DeepDiveIndex';

export default function ConceptsPage() {
  const docs = loadConcepts();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Concepts</h1>
      <p className="mt-1 text-neutral-600">
        AI-specific deep dives — prompt engineering, agent harnesses, MCP, context budgeting, RAG.
        These move fast (specs and practice shift) — reviewed on a fast cadence (~7 days).
      </p>
      <DeepDiveIndex section="concepts" docs={docs} />
    </main>
  );
}
