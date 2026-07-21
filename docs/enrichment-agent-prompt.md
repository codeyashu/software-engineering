# Enrichment agent runbook

This is the job that deepens content: `content/system-design/*`, `content/concepts/*`,
and `content/python/*` — the "bible" pages, as opposed to the curriculum tracks. Two
modes: a scheduled sweep (register via the `schedule` skill) and an on-demand trigger
(any interactive session).

## Scheduled sweep (register separately from the daily study-pick — weekly, e.g. Monday 08:00)

```
Run `pnpm next-to-enrich` to get the most-overdue topic. Never-reviewed docs
(lastReviewed: null) always win; otherwise it's whichever doc is furthest past
its cadence threshold — `fast` topics (AI-specific: concepts/*, python/*) are
due again after 7 days, `stable` topics (system-design/*, classic infra) after
90 days.

Websearch for 3-5 canonical sources on that topic — official docs first, then
a reputable engineering blog or case study, then a primary-source explanation
of the core mechanism. For the primary/canonical sources (official docs, papers,
vendor architecture writeups), fetch and read the actual page — don't write
from search-result snippets alone; snippets are for finding candidates, not for
citing mechanism details you haven't verified against the source itself.

Write or update content/<section>/<slug>/index.mdx to the depth of
content/system-design/kafka/index.mdx: the core concept explained cleanly,
mermaid diagram(s) (```mermaid fences) where structure or flow matters, 2-3
real industry use cases with attribution to what you found, known failure
modes / exceptions, and — for system-design topics — a "when NOT to use this"
section. Close with a Sources list linking everything you used. Update the
frontmatter `lastReviewed` to today and fill in `sources`.

Run `pnpm test && pnpm build`. If green, commit
("chore(enrich): deepen <section>/<slug>") and push. If either fails, revert
your content edit (`git checkout -- content/<section>/<slug>`) and report what
broke instead of pushing.

Also run `pnpm check-links` before committing — it's not wired into `pnpm test`
(network-dependent, would make CI flaky) but flags dead source URLs on demand.
A 403/404 on a source you just added or reviewed is worth a second look before
you commit; note known false positives (e.g. Medium blocks bot HEAD/GET and
will 403 even on live pages) rather than treating every non-2xx as broken.

Hard rule: only touch files under content/. Never edit app/, components/,
lib/, or config — that's Rahul's application code.
```

## On-demand (any interactive session)

Rahul names a topic ("enrich Kafka", "deepen the RAG pipeline doc", "write up
gRPC"). Skip the staleness picker — go straight to websearch + author for that
slug:

- If the folder already exists (`content/<section>/<slug>/`), update it in place.
- If it's new, create `content/<section>/<slug>/index.mdx`. Infer section + cadence
  from context: AI/agent-specific → `concepts`, `cadence: fast`; classic
  infra/distributed-systems → `system-design`, `cadence: stable`; Python language/
  ecosystem topic → `python`, `cadence: fast`.

Same depth bar (`content/system-design/kafka/index.mdx` is the pattern), same
websearch-before-writing rule, same test/build/commit discipline as the scheduled
sweep.

## Why this shape

- **Depth over refresh cadence.** The old daily job fleshed a little MDX every day
  regardless of whether the topic needed it. Kafka doesn't change; MCP's spec does.
  Cadence tiers (`lib/staleness.ts`, unit-tested) mean each topic gets attention on
  its own timescale, not a global "daily" tempo.
- **Websearch is mandatory, not optional.** Every deep-dive doc carries a `sources`
  list in frontmatter — if you didn't search, there's nothing to put there, and the
  page is just curriculum-bullet depth again.
- **The picker only picks — it never authors.** `scripts/next-to-enrich.ts` is a pure,
  tested function call. The actual research + writing is something only an agent turn
  can do, which is why it's a prompt here, not more script.

## One-time setup (Rahul, interactive session)

1. Open an interactive Claude Code session in this repo.
2. Invoke the `schedule` skill.
3. Paste the scheduled-sweep prompt above, set cadence to weekly (e.g. Monday 08:00).
   Keep this as a **separate** scheduled task from the daily study-pick
   (`docs/daily-agent-prompt.md`) — different job, different tempo.
