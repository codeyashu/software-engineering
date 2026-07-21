import Link from 'next/link';

const LINKS = [
  { href: '/', label: 'Dashboard' },
  { href: '/tracks', label: 'Tracks' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/roadmap/python', label: 'Python' },
  { href: '/qa', label: 'Q&A' },
  { href: '/resources', label: 'Resources' },
  { href: '/concepts', label: 'Concepts' },
  { href: '/system-design', label: 'System Design' },
  { href: '/adr', label: 'ADR' },
  { href: '/daily', label: 'Daily' },
];

export default function Nav() {
  return (
    <nav className="border-b bg-neutral-50">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-1 px-6 py-3 text-sm">
        <Link href="/" className="mr-2 font-bold">
          AI Eng Hub
        </Link>
        {LINKS.slice(1).map((l) => (
          <Link key={l.href} href={l.href} className="text-neutral-600 hover:text-neutral-900">
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
