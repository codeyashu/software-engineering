import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { load as loadYamlString } from 'js-yaml';
import matter from 'gray-matter';
import { z } from 'zod';
import {
  TracksFileSchema,
  PythonRoadmapFileSchema,
  QAFileSchema,
  ResourcesFileSchema,
  ProjectsFileSchema,
  TrackMeta,
  RoadmapTopic,
  QAItem,
  ResourceItem,
  Project,
} from './schemas';

const CONTENT = join(process.cwd(), 'content');

export function loadYaml<T>(relPath: string, schema: z.ZodType<T>): T {
  const raw = loadYamlString(readFileSync(join(CONTENT, relPath), 'utf8'));
  return schema.parse(raw); // throws loudly on bad content
}

export const loadTracks = (): TrackMeta[] =>
  loadYaml('roadmap/tracks.yaml', TracksFileSchema).tracks;

export const loadPythonRoadmap = (): RoadmapTopic[] =>
  loadYaml('roadmap/python.yaml', PythonRoadmapFileSchema).topics;

export const trackSlugs = (): string[] =>
  readdirSync(join(CONTENT, 'tracks'))
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));

export function loadTrackMdx(slug: string): { frontmatter: Record<string, unknown>; body: string } {
  const { data, content } = matter(readFileSync(join(CONTENT, 'tracks', `${slug}.mdx`), 'utf8'));
  return { frontmatter: data, body: content };
}

export const loadQA = (topic: string): QAItem[] =>
  loadYaml(`qa/${topic}.yaml`, QAFileSchema).items;

export const qaTopics = (): string[] =>
  readdirSync(join(CONTENT, 'qa'))
    .filter((f) => f.endsWith('.yaml'))
    .map((f) => f.replace('.yaml', ''));

export const loadResources = (kind: ResourceItem['kind']): ResourceItem[] =>
  loadYaml(`resources/${kind}s.yaml`, ResourcesFileSchema).items.filter((i) => i.kind === kind);

export const loadProjects = (): Project[] =>
  loadYaml('projects.yaml', ProjectsFileSchema).projects;

export function loadAdrs(): { slug: string; title: string; date: string; status: string; body: string }[] {
  const dir = join(CONTENT, 'adr');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && f !== 'template.md')
    .map((f) => {
      const { data, content } = matter(readFileSync(join(dir, f), 'utf8'));
      return {
        slug: f.replace('.md', ''),
        title: String(data.title ?? f),
        date: String(data.date ?? ''),
        status: String(data.status ?? 'proposed'),
        body: content,
      };
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}\.md$/;

function readDailyFiles(): string[] {
  try {
    return readdirSync(join(CONTENT, 'daily'))
      .filter((f) => ISO_DATE.test(f))
      .sort();
  } catch {
    return []; // daily/ may not exist until the agent has run
  }
}

export const dailyDates = (): string[] => readDailyFiles().map((f) => f.replace('.md', ''));

export function loadLatestDaily(): { date: string; body: string } | null {
  const files = readDailyFiles();
  if (files.length === 0) return null;
  const file = files[files.length - 1];
  const { content } = matter(readFileSync(join(CONTENT, 'daily', file), 'utf8'));
  return { date: file.replace('.md', ''), body: content };
}

export function loadSystemDesign(): { slug: string; frontmatter: Record<string, unknown>; body: string }[] {
  const dir = join(CONTENT, 'system-design');
  return readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const { data, content } = matter(readFileSync(join(dir, f), 'utf8'));
      return { slug: f.replace('.mdx', ''), frontmatter: data, body: content };
    });
}
