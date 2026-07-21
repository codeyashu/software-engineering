import { describe, it, expect } from 'vitest';
import { nextBox } from '../srs';

describe('leitner', () => {
  it('promotes on correct', () => expect(nextBox(1, true)).toBe(2));
  it('caps at box 5', () => expect(nextBox(5, true)).toBe(5));
  it('resets to 1 on wrong', () => expect(nextBox(4, false)).toBe(1));
});
