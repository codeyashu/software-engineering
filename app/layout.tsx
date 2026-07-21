import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Engineer Learning Hub',
  description: "Rahul's end-to-end AI Engineer Curriculum guide — tracks, roadmap, Q&A, resources.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fraunces.variable}>
      <body className="min-h-screen antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
