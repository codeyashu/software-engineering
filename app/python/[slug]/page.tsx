import { notFound } from 'next/navigation';
import { pythonGuideSlugs, loadPythonGuides, qaTopics } from '@/lib/content';
import DeepDiveLayout from '@/components/DeepDiveLayout';

export function generateStaticParams() {
  return pythonGuideSlugs().map((slug) => ({ slug }));
}

export default async function PythonGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = loadPythonGuides().find((d) => d.slug === slug);
  if (!doc) notFound();

  const qaId = `py-${slug}`;
  const hasQA = qaTopics().includes(qaId);

  return <DeepDiveLayout sectionLabel="Python" doc={doc} qaHref={hasQA ? `/qa/${qaId}` : null} />;
}
