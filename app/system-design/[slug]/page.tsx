import { notFound } from 'next/navigation';
import { systemDesignSlugs, loadSystemDesign, qaTopics } from '@/lib/content';
import DeepDiveLayout from '@/components/DeepDiveLayout';

export function generateStaticParams() {
  return systemDesignSlugs().map((slug) => ({ slug }));
}

export default async function SystemDesignDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = loadSystemDesign().find((d) => d.slug === slug);
  if (!doc) notFound();

  const qaId = `sd-${slug}`;
  const hasQA = qaTopics().includes(qaId);

  return <DeepDiveLayout sectionLabel="System Design" doc={doc} qaHref={hasQA ? `/qa/${qaId}` : null} />;
}
