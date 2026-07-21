'use client';

import { useEffect, useState } from 'react';

export default function RoadmapNav({ items }: { items: { id: string; label: string }[] }) {
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

  return (
    <nav
      aria-label="Track sections"
      className="lg:sticky lg:top-20 lg:h-fit lg:w-48 lg:shrink-0 lg:border-r lg:border-[var(--border)] lg:pr-4"
    >
      <div className="flex gap-1 overflow-x-auto pb-2 text-sm lg:flex-col lg:overflow-visible lg:pb-0">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`shrink-0 whitespace-nowrap rounded-md px-2.5 py-1.5 transition-colors lg:whitespace-normal ${
              active === item.id
                ? 'bg-[var(--accent-soft)] font-medium text-[var(--accent)]'
                : 'text-[var(--fg-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--fg)]'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
