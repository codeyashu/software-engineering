import Link from 'next/link';
import { qaTopics, loadQA } from '@/lib/content';

export default function QAIndexPage() {
  const topics = qaTopics();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Interview Q&amp;A</h1>
      <p className="mt-1 text-neutral-600">
        Spaced-repetition flashcards per track. Reveal, self-grade, and cards you miss come back
        sooner (Leitner boxes, saved locally).
      </p>
      <ul className="mt-6 space-y-2">
        {topics.map((t) => (
          <li key={t}>
            <Link
              href={`/qa/${t}`}
              className="flex items-center justify-between rounded-lg border p-4 hover:border-blue-400"
            >
              <span className="font-medium">{t}</span>
              <span className="text-sm text-neutral-500">{loadQA(t).length} cards</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
