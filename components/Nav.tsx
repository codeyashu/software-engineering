'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/tracks', label: 'Tracks' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/roadmap/python', label: 'Python' },
  { href: '/roadmap/system-design', label: 'System Design Roadmap' },
  { href: '/roadmap/db', label: 'Database Roadmap' },
  { href: '/qa', label: 'Q&A' },
  { href: '/resources', label: 'Resources' },
  { href: '/concepts', label: 'Concepts' },
  { href: '/system-design', label: 'System Design' },
  { href: '/adr', label: 'ADR' },
  { href: '/daily', label: 'Daily' },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3 text-sm">
        <Link href="/" className="font-display mr-2 text-base font-semibold">
          AI Eng Hub
        </Link>
        {LINKS.slice(1).map((l) => {
          const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={
                isActive
                  ? 'font-medium text-[var(--accent)]'
                  : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
              }
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
