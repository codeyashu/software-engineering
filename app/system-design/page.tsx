import { loadSystemDesign } from '@/lib/content';
import DeepDiveIndex from '@/components/DeepDiveIndex';

export default function SystemDesignPage() {
  const docs = loadSystemDesign();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">System Design</h1>
      <p className="mt-1 text-neutral-600">
        Classic distributed-systems reference topics. These don&apos;t move fast — reviewed on a
        stable cadence (~90 days), unlike the AI-specific <code>concepts</code> section.
      </p>
      <DeepDiveIndex section="system-design" docs={docs} />
    </main>
  );
}
