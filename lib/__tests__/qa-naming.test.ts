import { describe, it, expect } from 'vitest';
import { qaTopics, loadTracks, systemDesignSlugs, conceptSlugs, pythonGuideSlugs } from '../content';

// Enforces the convention documented in CLAUDE.md: every content/qa/<topic>.yaml
// filename must be either `track-<id>` for a real curriculum track, or a
// `<prefix>-<slug>` deep-dive QA file whose slug has a matching MDX doc — so a
// typo'd or unregistered topic file fails the build instead of silently existing.
const DEEP_DIVE_PREFIXES: { prefix: string; slugs: () => string[] }[] = [
  { prefix: 'sd-', slugs: systemDesignSlugs },
  { prefix: 'cc-', slugs: conceptSlugs },
  { prefix: 'py-', slugs: pythonGuideSlugs },
];

describe('content/qa/*.yaml naming convention', () => {
  it('every QA file is a valid track-<id> or a registered deep-dive <prefix>-<slug>', () => {
    const trackIds = new Set(loadTracks().map((t) => t.id));
    const topics = qaTopics();

    const unrecognized = topics.filter((topic) => {
      if (topic.startsWith('track-')) return !trackIds.has(topic.slice('track-'.length));
      const match = DEEP_DIVE_PREFIXES.find((p) => topic.startsWith(p.prefix));
      if (!match) return true; // no known prefix at all
      return !match.slugs().includes(topic.slice(match.prefix.length));
    });

    expect(unrecognized).toEqual([]);
  });
});
