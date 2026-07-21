'use client';

import { useEffect, useId, useState } from 'react';

export default function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    import('mermaid').then(async (mod) => {
      const mermaid = mod.default;
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' });
      const { svg } = await mermaid.render(`mmd-${id}`, chart);
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (!svg) return <pre className="rounded bg-neutral-50 p-3 text-xs">{chart}</pre>;
  return <div className="my-4" dangerouslySetInnerHTML={{ __html: svg }} />;
}
