/**
 * Checks every frontmatter `sources[].url` in content/{system-design,concepts,python}
 * for liveness (HEAD request). Run with: pnpm check-links
 *
 * Not part of `pnpm build` (network-dependent, would make CI flaky) — run on demand
 * or as a step in the enrichment sweep before trusting old sources.
 */
import { loadSystemDesign, loadConcepts, loadPythonGuides } from '../lib/content';

type Doc = { slug: string; frontmatter: Record<string, unknown> };

function sourcesOf(docs: Doc[], section: string) {
  return docs.flatMap((d) => {
    const sources = (d.frontmatter.sources as { label: string; url: string }[] | undefined) ?? [];
    return sources.map((s) => ({ section, slug: d.slug, ...s }));
  });
}

async function checkUrl(url: string): Promise<number | 'error'> {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (res.status === 405 || res.status === 403) {
      // some sites reject HEAD; retry with GET before declaring failure
      const getRes = await fetch(url, { method: 'GET', redirect: 'follow' });
      return getRes.status;
    }
    return res.status;
  } catch {
    return 'error';
  }
}

async function main() {
  const all = [
    ...sourcesOf(loadSystemDesign(), 'system-design'),
    ...sourcesOf(loadConcepts(), 'concepts'),
    ...sourcesOf(loadPythonGuides(), 'python'),
  ];

  let broken = 0;
  for (const { section, slug, label, url } of all) {
    const status = await checkUrl(url);
    const ok = status !== 'error' && status < 400;
    if (!ok) broken++;
    console.log(`${ok ? 'OK  ' : 'FAIL'} [${status}] ${section}/${slug} — ${label}`);
  }

  console.log(`\n${all.length - broken}/${all.length} sources OK.`);
  if (broken > 0) process.exitCode = 1;
}

main();
