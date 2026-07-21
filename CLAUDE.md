# CLAUDE.md — agent operating rules for this repo

Project identity, stack, commands, and deploy live in [`README.md`](README.md) — read
that first. This file is the rulebook for anyone (human or agent) *authoring content*
here: the quality bar, the conventions, and the hard boundaries.

## Content depth bar

Every `content/system-design/<slug>/index.mdx`, `content/concepts/<slug>/index.mdx`,
and `content/python/<slug>/index.mdx` must match the shape of
[`content/system-design/kafka/index.mdx`](content/system-design/kafka/index.mdx):

1. Core concept, explained cleanly — the one abstraction that makes everything else
   make sense.
2. Mermaid diagram(s) (` ```mermaid ` fences) wherever structure or flow matters.
3. 2-3 industry use cases, attributed to what you found (name real companies/systems,
   not generic "some companies use X").
4. Known failure modes / exceptions.
5. For `system-design` only: a "When NOT to use this" section.
6. A closing `## Sources` list linking everything used.

Frontmatter (parsed via `gray-matter`, must satisfy what `lib/content.ts` /
`scripts/next-to-enrich.ts` read):

```yaml
---
title: "Human title"
cadence: stable   # or: fast
lastReviewed: "YYYY-MM-DD"   # or null if never reviewed
sources:
  - { label: "...", url: "https://..." }
---
```

## Staleness / cadence rule

Implemented in [`lib/staleness.ts`](lib/staleness.ts), tested in
`lib/__tests__/staleness.test.ts`:

- `cadence: fast` (AI-specific: `concepts/*`, `python/*`) → due again after **7 days**.
- `cadence: stable` (classic distributed-systems infra: `system-design/*`) → due again
  after **90 days**.
- `lastReviewed: null` always wins (infinite staleness) — never-reviewed docs are always
  the most overdue.

`pnpm next-to-enrich` (`scripts/next-to-enrich.ts`) is the picker — it only decides
*what's* next, never authors. The authoring runbook is
[`docs/enrichment-agent-prompt.md`](docs/enrichment-agent-prompt.md); follow its
websearch-before-writing rule even in an interactive on-demand session.

## QA convention

One YAML file per topic under `content/qa/<topic-id>.yaml`, validated by
`QAFileSchema` (`lib/schemas.ts`): `{ items: [{ id, question, answer, difficulty (1-5),
tags[] }] }`.

- Curriculum tracks use `track-<id>.yaml` (e.g. `track-a.yaml`).
- Deep-dive topics (system-design/concepts/python) use a `sd-`, `cc-`, or `py-` prefix
  on the slug (e.g. `sd-load-balancing`) so ids never collide with track ids.
- Aim medium→high difficulty (3-5) for deep-dive topics — lead-architect interview
  framing: tradeoffs, "why not X instead", failure-scenario reasoning — not
  definitional recall. 5-8 items per topic is the right size.

## Resources convention

Don't just inline links in MDX body prose — also append genuinely useful ones to
`content/resources/{docs,videos,newsletters,anchors}.yaml` (`ResourceItemSchema`:
`{ label, url, kind, tags[] }`) so they surface on the Resources page too. Tag with the
section/slug (e.g. `[system-design, load-balancing]`).

## The recurring "topics on demand" pattern

Whenever the ask is "give me a few topics on `<area>`" (system-design, concepts, python,
or a brand-new area), follow this every time — it's the whole point of this section:

1. **Propose, don't dump.** Offer a curated candidate list (5-8) with a one-line scope
   each. Curate for what a lead-architect interview loop actually probes, not just
   topic breadth.
2. **Ask for batch size.** 3-5 topics per round is the sweet spot — enough for a
   coherent session, not so many quality slips.
3. **Author each committed topic in order**: core concept → architecture diagram(s) →
   industry cases → failure modes → when-NOT-to-use (system-design) → Sources → QA
   file → resource links appended to `resources/*.yaml`.
4. **Set `cadence` by domain**: classic infra/distributed-systems → `stable`;
   AI/agent-specific or fast-moving ecosystem → `fast`.
5. **Verify before calling it done**: `pnpm test && pnpm build` must be green.
6. **Never silently drop options.** Anything proposed but not picked this round gets
   named explicitly as "queued for next batch."

## Hard boundaries

- Scheduled agents (daily study-pick, weekly enrichment sweep) only ever touch
  `content/**`. Never edit `app/`, `components/`, `lib/`, or config files from those
  jobs — that's application code, out of scope by design (see
  `docs/daily-agent-prompt.md`, `docs/enrichment-agent-prompt.md`).
- `pnpm build` is the safety net — it fails loudly on any bad `content/**/*.yaml` or
  MDX frontmatter via Zod schema validation (`lib/schemas.ts`). Never push content that
  doesn't pass it.
