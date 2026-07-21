import { QAItem } from './schemas';

// Leitner-lite spaced repetition: box 1 (review often) .. box 5 (mastered).
export const nextBox = (box: number, correct: boolean): number =>
  correct ? Math.min(5, box + 1) : 1;

export type BoxState = Record<string, number>;

// An item is "due" if it's in a lower box than the current review round,
// simplified here to: not yet mastered (box < 5) OR never seen.
export const dueItems = (items: QAItem[], boxes: BoxState): QAItem[] =>
  items.filter((i) => (boxes[i.id] ?? 0) < 5);

export const QA_BOX_KEY = 'aieh:qa-boxes';

export function readBoxes(): BoxState {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(QA_BOX_KEY) ?? '{}');
  } catch {
    return {};
  }
}

export function writeBoxes(state: BoxState): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(QA_BOX_KEY, JSON.stringify(state));
}
