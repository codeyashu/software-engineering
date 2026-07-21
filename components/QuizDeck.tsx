'use client';

import { useEffect, useMemo, useState } from 'react';
import { QAItem } from '@/lib/schemas';
import { nextBox, dueItems, readBoxes, writeBoxes, BoxState } from '@/lib/srs';
import Flashcard from './Flashcard';

export default function QuizDeck({ items }: { items: QAItem[] }) {
  const [boxes, setBoxes] = useState<BoxState>({});
  const [hydrated, setHydrated] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setBoxes(readBoxes());
    setHydrated(true);
  }, []);

  const due = useMemo(() => (hydrated ? dueItems(items, boxes) : items), [items, boxes, hydrated]);

  if (hydrated && due.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center text-neutral-600">
        <p>All cards mastered (box 5). 🎉</p>
        <button
          onClick={() => {
            setBoxes({});
            writeBoxes({});
            setIndex(0);
          }}
          className="mt-3 rounded border px-4 py-1.5 text-sm hover:bg-neutral-50"
        >
          Reset deck
        </button>
      </div>
    );
  }

  const current = due[Math.min(index, due.length - 1)];

  const grade = (correct: boolean) => {
    const updated: BoxState = { ...boxes, [current.id]: nextBox(boxes[current.id] ?? 1, correct) };
    setBoxes(updated);
    writeBoxes(updated);
    setIndex((i) => i + 1);
  };

  return (
    <div>
      <p className="mb-3 text-sm text-neutral-500">
        {hydrated ? `${Math.min(index + 1, due.length)} / ${due.length} due` : `${items.length} cards`}
      </p>
      {current && <Flashcard key={current.id} item={current} onGrade={grade} />}
    </div>
  );
}
