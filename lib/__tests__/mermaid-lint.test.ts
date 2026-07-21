import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import mermaid from 'mermaid';

const CONTENT = join(process.cwd(), 'content');

function findMdxFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = join(dir, d.name);
    if (d.isDirectory()) return findMdxFiles(p);
    return d.name.endsWith('.mdx') ? [p] : [];
  });
}

function extractMermaidBlocks(mdx: string): string[] {
  const blocks: string[] = [];
  const re = /```mermaid\n([\s\S]*?)```/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(mdx))) blocks.push(m[1]);
  return blocks;
}

describe('mermaid diagrams in content/**/*.mdx', () => {
  mermaid.initialize({ startOnLoad: false });
  const files = findMdxFiles(CONTENT);

  for (const file of files) {
    const mdx = readFileSync(file, 'utf8');
    const blocks = extractMermaidBlocks(mdx);
    blocks.forEach((chart, i) => {
      it(`parses cleanly: ${file.replace(CONTENT, 'content')} [block ${i}]`, async () => {
        await expect(mermaid.parse(chart)).resolves.toBeTruthy();
      });
    });
  }
});
