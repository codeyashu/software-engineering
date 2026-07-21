import { notFound } from 'next/navigation';
import { qaTopics, loadQA } from '@/lib/content';
import QuizDeck from '@/components/QuizDeck';

export function generateStaticParams() {
  return qaTopics().map((topic) => ({ topic }));
}

export default async function QATopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!qaTopics().includes(topic)) notFound();

  const items = loadQA(topic);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">{topic}</h1>
      <p className="mt-1 text-neutral-600">{items.length} interview questions.</p>
      <div className="mt-6">
        <QuizDeck items={items} />
      </div>
    </main>
  );
}
