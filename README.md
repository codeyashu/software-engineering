# AI Engineer Learning Hub

Rahul's end-to-end guide for the **AI Engineer Curriculum — Final 2026 Edition**: 12
tracks, a Python roadmap (complexity + duration per topic), an interview Q&A bank with
spaced-repetition flashcards, curated resources, a growing "bible" of deep-dive
reference pages (system design, AI concepts, Python), an ADR log, a "target + evidence"
project ledger, and two automated jobs — a daily study-topic pick and a cadence-aware
content-enrichment sweep.

## Stack

Next.js 15 (static export) · TypeScript · Tailwind CSS v4 · MDX (+ mermaid diagrams) ·
Zod · Vitest. Content lives in `/content` as YAML (structured/queryable) and MDX
(long-form). See
[`content/adr/0001-web-app-over-static-site.md`](content/adr/0001-web-app-over-static-site.md)
for why.

## Local development

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm test              # Vitest — schemas, roadmap logic, progress, streak, srs, picker, staleness
pnpm build              # static export to out/, fails loudly on any bad content/*.yaml or *.mdx frontmatter
pnpm daily:pick         # writes content/daily/<today>.md with today's prioritized study picks
pnpm next-to-enrich     # prints the most-overdue deep-dive doc (doesn't author anything itself)
```

## Deploying to GitHub Pages (one-time setup)

1. Push this repo to `origin` (`git@github-personal:codeyashu/software-engineering.git`).
2. In the GitHub repo: **Settings → Pages → Source: GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`: install → test → build → deploy.
4. Site publishes to `https://codeyashu.github.io/software-engineering/`.

## Automation — two separate jobs, two separate cadences

- **Daily study pick** — [`docs/daily-agent-prompt.md`](docs/daily-agent-prompt.md).
  Picks 2-3 prioritized, prerequisite-unlocked topics to study today. Register weekdays.
- **Content enrichment** — [`docs/enrichment-agent-prompt.md`](docs/enrichment-agent-prompt.md).
  Deepens one `system-design`/`concepts`/`python` page per run, chosen by a cadence-aware
  staleness score (fast-moving AI topics get revisited every ~7 days, stable classic-infra
  topics every ~90). Always websearches before writing. Register weekly, separately from
  the daily job. You can also trigger it on-demand in any session: "enrich Kafka."

Both agents only ever touch `content/**` — application code is out of scope by design.

## Content depth model

Every learning-content topic is a folder: `content/<section>/<slug>/index.mdx`.

- `content/tracks/<id>/index.mdx` — one page per curriculum track (overview + roadmap
  checklist). `tracks/a` (LLM Foundations) is fully authored and is the pattern every
  other track follows.
- `content/system-design/<slug>/index.mdx` — classic distributed-systems reference pages
  (Kafka is the first, and the depth pattern every deep-dive should match: core concept,
  mermaid diagrams, industry use cases, failure modes, a sources list). `cadence: stable`.
- `content/concepts/<slug>/index.mdx` — AI-specific deep dives (agent harness, MCP,
  context-window budgeting, RAG pipeline anatomy, prompt engineering). `cadence: fast`.
- `content/python/<slug>/index.mdx` — Python topic guides beyond the roadmap's one-liners
  (async, typing, more added as studied). `cadence: fast`.

Roadmap subtopics (`content/roadmap/tracks.yaml`, `content/roadmap/python.yaml`) can
carry an optional `guide: { section, slug }` pointing at one of these — the roadmap table
and dashboard render a "Read the deep dive →" link when present.

## Other content

- `content/qa/*.yaml` — interview Q&A per topic, difficulty-tagged, Leitner spaced repetition.
- `content/resources/*.yaml` — newsletters, videos, docs, anchor repos.
- `content/adr/*.md` — architecture decision records.
- `content/projects.yaml` — target + evidence ledger.
- `content/daily/*.md` — daily study picks, written by `scripts/pick-today.ts`.
