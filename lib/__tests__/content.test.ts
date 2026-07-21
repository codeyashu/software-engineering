import { describe, it, expect } from 'vitest';
import { loadTracks, loadPythonRoadmap } from '../content';

describe('content loader', () => {
  it('loads and validates tracks.yaml', () => {
    const tracks = loadTracks();
    expect(tracks.find((t) => t.id === 'a')?.subtopics[0].id).toBe('ctx-window');
  });

  it('loads python roadmap', () => {
    expect(loadPythonRoadmap()[0].id).toBe('py-venv');
  });
});
