/**
 * Prints the most-overdue deep-dive doc for enrichment. Run with: pnpm next-to-enrich
 *
 * This script only decides WHAT's next — it never authors content. The actual
 * websearch + writing happens in an agent turn (scheduled sweep or on-demand),
 * per docs/enrichment-agent-prompt.md.
 */
import { loadFolderDocs } from '../lib/content';
import { nextToEnrich } from '../lib/staleness';

type Cadence = 'fast' | 'stable';

function docsFor(section: string) {
  try {
    return loadFolderDocs(section).map((d) => ({
      slug: d.slug,
      section,
      cadence: (d.frontmatter.cadence as Cadence) ?? 'fast',
      lastReviewed: (d.frontmatter.lastReviewed as string | null) ?? null,
    }));
  } catch {
    return []; // section directory doesn't exist yet
  }
}

function main() {
  const docs = [...docsFor('system-design'), ...docsFor('concepts'), ...docsFor('python')];
  const today = new Date().toISOString().slice(0, 10);
  const pick = nextToEnrich(docs, today);

  if (!pick) {
    console.log('No deep-dive docs found.');
    return;
  }

  console.log(`${pick.section}/${pick.slug}`);
  console.log(`  cadence: ${pick.cadence}`);
  console.log(`  lastReviewed: ${pick.lastReviewed ?? 'never'}`);
}

main();
