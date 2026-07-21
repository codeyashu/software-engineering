import { dailyDates } from '@/lib/content';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function DailyArchivePage() {
  const dates = dailyDates().slice().reverse();
  const CONTENT = join(process.cwd(), 'content', 'daily');

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Daily Log Archive</h1>
      <p className="mt-1 text-neutral-600">
        Every day&apos;s pick, written by <code>scripts/pick-today.ts</code> (manually or via
        the scheduled agent — see <code>docs/daily-agent-prompt.md</code>).
      </p>
      {dates.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">
          No daily picks yet. Run <code>pnpm daily:pick</code>.
        </p>
      )}
      {dates.map((date) => {
        const { content } = matter(readFileSync(join(CONTENT, `${date}.md`), 'utf8'));
        return (
          <article
            key={date}
            className="prose prose-sm prose-neutral mt-8 max-w-none border-t pt-6 prose-a:text-blue-600"
          >
            <MDXRemote source={content} />
          </article>
        );
      })}
    </main>
  );
}
