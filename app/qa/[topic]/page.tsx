import Link from 'next/link';
import { notFound } from 'next/navigation';
import { qaTopics, loadQA, systemDesignSlugs, conceptSlugs, pythonGuideSlugs } from '@/lib/content';
import QuizDeck from '@/components/QuizDeck';

export function generateStaticParams() {
  return qaTopics().map((topic) => ({ topic }));
}

const DEEP_DIVE_PREFIXES: { prefix: string; section: string; slugs: () => string[] }[] = [
  { prefix: 'sd-', section: 'system-design', slugs: systemDesignSlugs },
  { prefix: 'cc-', section: 'concepts', slugs: conceptSlugs },
  { prefix: 'py-', section: 'python', slugs: pythonGuideSlugs },
];

function deepDiveLinkFor(topic: string): { href: string } | null {
  for (const { prefix, section, slugs } of DEEP_DIVE_PREFIXES) {
    if (topic.startsWith(prefix)) {
      const slug = topic.slice(prefix.length);
      if (slugs().includes(slug)) return { href: `/${section}/${slug}` };
    }
  }
  return null;
}

export default async function QATopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!qaTopics().includes(topic)) notFound();

  const items = loadQA(topic);
  const deepDive = deepDiveLinkFor(topic);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
        <span>Q&amp;A</span>
        <span>/</span>
        <span className="text-[var(--fg)]">{topic}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{topic}</h1>
        {deepDive && (
          <Link href={deepDive.href} className="font-semibold text-[var(--accent)] hover:underline">
            ← Read the deep dive
          </Link>
        )}
      </div>
      <p className="tabular-nums mt-1 text-sm text-[var(--fg-muted)]">{items.length} interview questions</p>
      <div className="mt-6">
        <QuizDeck items={items} />
      </div>
    </main>
  );
}
