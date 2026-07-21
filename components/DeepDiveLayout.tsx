import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from './MdxComponents';
import DocToc from './DocToc';
import { CADENCE_DAYS, staleness } from '@/lib/staleness';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractHeadings(body: string): { id: string; label: string }[] {
  return body
    .split('\n')
    .map((line) => /^##\s+(.*)$/.exec(line.trim()))
    .filter((m): m is RegExpExecArray => m !== null)
    .map((m) => ({ label: m[1].trim(), id: slugify(m[1].trim()) }));
}

export default function DeepDiveLayout({
  sectionLabel,
  doc,
  qaHref,
}: {
  sectionLabel: string;
  doc: { slug: string; frontmatter: Record<string, unknown>; body: string };
  qaHref: string | null;
}) {
  const title = String(doc.frontmatter.title ?? doc.slug);
  const cadence = String(doc.frontmatter.cadence ?? '');
  const lastReviewed = doc.frontmatter.lastReviewed ? String(doc.frontmatter.lastReviewed) : null;
  const sources = Array.isArray(doc.frontmatter.sources)
    ? (doc.frontmatter.sources as { label: string; url: string }[])
    : [];
  const headings = extractHeadings(doc.body);

  const isKnownCadence = cadence === 'fast' || cadence === 'stable';
  const isFresh =
    lastReviewed !== null &&
    isKnownCadence &&
    staleness({ cadence: cadence as keyof typeof CADENCE_DAYS, lastReviewed }, new Date().toISOString().slice(0, 10)) <= 0;

  const docComponents = {
    ...mdxComponents,
    h2: (props: { children?: React.ReactNode }) => <h2 id={slugify(String(props.children))}>{props.children}</h2>,
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
        <span>{sectionLabel}</span>
        <span>/</span>
        <span className="text-[var(--fg)]">{title}</span>
      </div>
      <h1 className="font-display mt-2 mb-5 text-3xl font-semibold sm:text-4xl">{title}</h1>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-[var(--border)] bg-[var(--bg-raised)] px-4 py-3 text-sm text-[var(--fg-muted)]">
        {cadence && <span className="pill pill-cadence">cadence · {cadence}</span>}
        <span className={`pill ${isFresh ? 'pill-fresh' : 'pill-due'}`}>
          {lastReviewed ? `reviewed ${lastReviewed}` : 'never reviewed'}
        </span>
        {sources.length > 0 && <span className="tabular-nums">{sources.length} sources</span>}
        {qaHref && (
          <Link href={qaHref} className="ml-auto font-semibold text-[var(--accent)] hover:underline">
            Practice Q&amp;A →
          </Link>
        )}
      </div>

      <div className="mt-9 flex items-start gap-12">
        <article className="doc-body min-w-0 flex-1">
          <MDXRemote source={doc.body} components={docComponents} />

          {sources.length > 0 && (
            <div className="mt-12 border-t border-[var(--border)] pt-6">
              <div className="mb-3 text-[11px] font-bold uppercase tracking-wider text-[var(--fg-muted)]">Sources</div>
              {sources.map((s, i) => (
                <a key={s.url} className="source-chip" href={s.url} target="_blank" rel="noreferrer">
                  <span className="source-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          )}
        </article>

        <DocToc items={headings} />
      </div>
    </main>
  );
}
