import type { Config } from 'tailwindcss';

// Tailwind v4 auto-detects content via the CSS `@import "tailwindcss"` scan,
// but we keep this file for explicit content globs + future theme extension.
const config: Config = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.mdx'],
};

export default config;
