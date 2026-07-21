import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Engineer Learning Hub',
  description: "Rahul's end-to-end AI Engineer Curriculum guide — tracks, roadmap, Q&A, resources.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
        {/* Nav slot — populated in Task 8 with full site navigation */}
        {children}
      </body>
    </html>
  );
}
