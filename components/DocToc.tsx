'use client';

import { useEffect, useState } from 'react';

export default function DocToc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <aside
      aria-label="On this page"
      className="hidden w-48 shrink-0 border-l border-[var(--border)] pl-4 lg:sticky lg:top-20 lg:block lg:h-fit"
    >
      <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[var(--fg-muted)]">
        On this page
      </div>
      <div className="flex flex-col text-sm">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`-ml-3 border-l-2 py-1 pl-3 transition-colors ${
              active === item.id
                ? 'border-[var(--accent)] font-medium text-[var(--accent)]'
                : 'border-transparent text-[var(--fg-muted)] hover:text-[var(--fg)]'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
