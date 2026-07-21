/**
 * Daily topic picker. Run with: pnpm daily:pick
 *
 * Server-side there is no localStorage, so "progress" is approximated from
 * the `status: done` field already committed in content/roadmap/*.yaml —
 * i.e. progress you've marked done in the site (via a future sync, or by
 * hand-editing YAML) is what gates prerequisites here. This intentionally
 * stays conservative: it never suggests something whose prereqs aren't
 * marked done in the committed data.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { load, dump } from 'js-yaml';
import { loadTracks, loadPythonRoadmap } from '../lib/content';
import { pickToday } from '../lib/picker';
import { ProgressState } from '../lib/progress';
import { RoadmapTopic } from '../lib/schemas';

const CONTENT = join(process.cwd(), 'content');
const DAILY_DIR = join(CONTENT, 'daily');
const LOG_PATH = join(DAILY_DIR, 'log.yaml');

type LogEntry = { date: string; topicIds: string[] };
type LogFile = { entries: LogEntry[] };

function readLog(): LogFile {
  if (!existsSync(LOG_PATH)) return { entries: [] };
  return (load(readFileSync(LOG_PATH, 'utf8')) as LogFile) ?? { entries: [] };
}

function writeLog(log: LogFile): void {
  writeFileSync(LOG_PATH, dump(log));
}

function allTopics(): (RoadmapTopic & { track: string })[] {
  const tracks = loadTracks().flatMap((t) => t.subtopics.map((s) => ({ ...s, track: t.id })));
  const python = loadPythonRoadmap().map((s) => ({ ...s, track: 'python' }));
  return [...tracks, ...python];
}

function deriveProgress(topics: RoadmapTopic[]): ProgressState {
  const state: ProgressState = {};
  for (const t of topics) if (t.status === 'done') state[t.id] = 'done';
  return state;
}

function renderMarkdown(date: string, picks: (RoadmapTopic & { track: string })[]): string {
  const lines = [`# Daily pick — ${date}`, ''];
  for (const p of picks) {
    lines.push(`## ${p.title}`);
    lines.push(`- [ ] ${p.id}`);
    lines.push(`- Track: \`${p.track}\` · Priority: ${p.priority} · Complexity: ${p.complexity}/5 · ~${p.durationHrs}h`);
    lines.push(`- Why picked: highest-priority unblocked topic not covered in the last 3 days.`);
    for (const d of p.docs ?? []) lines.push(`- Doc: [${d.label}](${d.url})`);
    for (const v of p.videos ?? []) lines.push(`- Video: [${v.label}](${v.url})`);
    lines.push('');
  }
  return lines.join('\n');
}

function main() {
  mkdirSync(DAILY_DIR, { recursive: true });

  const topics = allTopics();
  const progress = deriveProgress(topics);
  const log = readLog();
  const recentIds = log.entries.slice(-3).flatMap((e) => e.topicIds);

  const picks = pickToday(topics, progress, { count: 3, recentIds });
  const date = new Date().toISOString().slice(0, 10);

  writeFileSync(join(DAILY_DIR, `${date}.md`), renderMarkdown(date, picks));

  log.entries.push({ date, topicIds: picks.map((p) => p.id) });
  writeLog(log);

  console.log(`Wrote content/daily/${date}.md with ${picks.length} picks:`);
  for (const p of picks) console.log(`  - [${p.track}] ${p.title}`);
}

main();
