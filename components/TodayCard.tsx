import { MDXRemote } from 'next-mdx-remote/rsc';

export default function TodayCard({ daily }: { daily: { date: string; body: string } | null }) {
  return (
    <div className="rounded-lg border p-5">
      <h2 className="text-lg font-bold">Today&apos;s pick</h2>
      {daily ? (
        <>
          <p className="mb-2 text-xs text-neutral-500">{daily.date}</p>
          <article className="prose prose-sm prose-neutral max-w-none prose-a:text-blue-600">
            <MDXRemote source={daily.body} />
          </article>
        </>
      ) : (
        <p className="mt-2 text-sm text-neutral-600">
          No daily pick yet. The scheduled agent writes one each morning (Task 10), or run{' '}
          <code>node scripts/pick-today.mjs</code>.
        </p>
      )}
    </div>
  );
}
