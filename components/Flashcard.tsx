'use client';

import { useState } from 'react';
import { QAItem } from '@/lib/schemas';

export default function Flashcard({
  item,
  onGrade,
}: {
  item: QAItem;
  onGrade: (correct: boolean) => void;
}) {
  const [revealed, setRevealed] = useState(false);

  const grade = (correct: boolean) => {
    setRevealed(false);
    onGrade(correct);
  };

  return (
    <div className="rounded-lg border p-6">
      <div className="mb-1 flex items-center justify-between text-xs text-neutral-500">
        <span>difficulty {item.difficulty}</span>
        <span>{item.tags.join(' · ')}</span>
      </div>
      <p className="text-lg font-medium">{item.question}</p>

      {revealed ? (
        <div className="mt-4">
          <p className="whitespace-pre-line text-neutral-700">{item.answer}</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => grade(false)}
              className="rounded border border-red-300 px-4 py-1.5 text-sm text-red-700 hover:bg-red-50"
            >
              Got it wrong
            </button>
            <button
              onClick={() => grade(true)}
              className="rounded border border-green-300 px-4 py-1.5 text-sm text-green-700 hover:bg-green-50"
            >
              Got it right
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="mt-4 rounded bg-neutral-900 px-4 py-1.5 text-sm text-white hover:bg-neutral-700"
        >
          Reveal answer
        </button>
      )}
    </div>
  );
}
