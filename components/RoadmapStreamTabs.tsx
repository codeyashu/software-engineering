'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const STREAMS = [
  { href: '/roadmap', label: 'Tracks' },
  { href: '/roadmap/system-design', label: 'System Design' },
  { href: '/roadmap/python', label: 'Python' },
  { href: '/roadmap/db', label: 'Database' },
];

export default function RoadmapStreamTabs() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-2.5 border-b border-[var(--border)] bg-[var(--bg-raised)] px-6 py-2.5 text-[12.5px]">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--fg-muted)]">
        Roadmap streams
      </span>
      {STREAMS.map((s) => {
        const active = s.href === '/roadmap' ? pathname === '/roadmap' : pathname.startsWith(s.href);
        return (
          <Link
            key={s.href}
            href={s.href}
            className={`rounded-full px-3 py-1.5 font-semibold transition-colors ${
              active
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'text-[var(--fg-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]'
            }`}
          >
            {s.label}
          </Link>
        );
      })}
    </div>
  );
}
