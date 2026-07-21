import { notFound } from 'next/navigation';
import { conceptSlugs, loadConcepts, qaTopics } from '@/lib/content';
import DeepDiveLayout from '@/components/DeepDiveLayout';

export function generateStaticParams() {
  return conceptSlugs().map((slug) => ({ slug }));
}

export default async function ConceptDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = loadConcepts().find((d) => d.slug === slug);
  if (!doc) notFound();

  const qaId = `cc-${slug}`;
  const hasQA = qaTopics().includes(qaId);

  return <DeepDiveLayout sectionLabel="Concepts" doc={doc} qaHref={hasQA ? `/qa/${qaId}` : null} />;
}
