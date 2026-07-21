# AI Engineer Learning Hub

Rahul's end-to-end guide for the **AI Engineer Curriculum — Final 2026 Edition**: 12
tracks, a Python roadmap (complexity + duration per topic), an interview Q&A bank with
spaced-repetition flashcards, curated resources, system design notes, an ADR log, a
"target + evidence" project ledger, and a daily automated topic picker.

## Stack

Next.js 15 (static export) · TypeScript · Tailwind CSS v4 · MDX · Zod · Vitest.
Content lives in `/content` as YAML (structured/queryable) and MDX (long-form). See
[`content/adr/0001-web-app-over-static-site.md`](content/adr/0001-web-app-over-static-site.md)
for why.

## Local development

```bash
pnpm install
pnpm dev            # http://localhost:3000
pnpm test            # Vitest — schemas, roadmap logic, progress, streak, srs, picker
pnpm build            # static export to out/, fails loudly on any bad content/*.yaml
pnpm daily:pick       # writes content/daily/<today>.md with today's prioritized picks
```

## Deploying to GitHub Pages (one-time setup)

1. Push this repo to `origin` (`git@github-personal:codeyashu/software-engineering.git`).
2. In the GitHub repo: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`: install → test → build → deploy.
4. Site publishes to `https://codeyashu.github.io/software-engineering/`.

## Daily automation

See [`docs/daily-agent-prompt.md`](docs/daily-agent-prompt.md) for the exact prompt to
register as a scheduled agent (via the `schedule` skill). The agent only ever touches
`content/**` — application code is out of its scope by design.

## Content structure

- `content/roadmap/tracks.yaml`, `content/roadmap/python.yaml` — all topics: complexity
  (1-5), durationHrs, priority (P1-P5), status, prereqs.
- `content/tracks/*.mdx` — one page per track. `a.mdx` (LLM Foundations) is fully
  authored and is the pattern every other track follows.
- `content/qa/*.yaml` — interview Q&A per topic, difficulty-tagged.
- `content/resources/*.yaml` — newsletters, videos, docs, anchor repos.
- `content/system-design/*.mdx` — recurring AI system-design patterns.
- `content/adr/*.md` — architecture decision records.
- `content/projects.yaml` — target + evidence ledger.
- `content/daily/*.md` — daily picks, written by `scripts/pick-today.ts`.
