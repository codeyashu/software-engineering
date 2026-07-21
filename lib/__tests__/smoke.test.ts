import { describe, it, expect } from 'vitest';
import { greet } from '../smoke';

describe('scaffold', () => {
  it('module resolution + TS build works', () => {
    expect(greet('Rahul')).toBe('hi Rahul');
  });
});
