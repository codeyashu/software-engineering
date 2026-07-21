import { describe, it, expect } from 'vitest';
import { trackSlugs, loadTrackMdx } from '../content';

describe('track mdx', () => {
  it('lists 12 slugs', () => {
    expect(trackSlugs()).toContain('a');
  });

  it('loads track A body', () => {
    expect(loadTrackMdx('a').body.length).toBeGreaterThan(0);
  });
});
