# Daily agent runbook

This is the exact instruction to register as a scheduled cloud agent (via Claude Code's
`schedule` skill), run on weekday mornings against this repo
(`git@github-personal:codeyashu/software-engineering.git`, branch `main`).

**Suggested cadence:** weekdays, 07:30 local time.

## The prompt to schedule

```
Run `pnpm install && pnpm daily:pick`. This writes content/daily/<today>.md with
2-3 prioritized, prerequisite-unlocked topics for today.

Then, pick ONE track under content/tracks/*.mdx that is still marked
"To be authored" and is next in priority order (check content/roadmap/tracks.yaml
for the track's `priority` field; prefer P1, then P2, etc; skip a track once its
MDX no longer says "To be authored"). Flesh a small slice of that track's MDX —
2-3 subtopic explainers (2-4 sentences each) plus doc/video links where you can
find a real, working resource, and one concrete interactive exercise — following
the structure and tone of content/tracks/a.mdx exactly (same section headings:
What & why, What you must cover, Interactive session, System design angle, Exit
criteria, Questions).

While there, check any resource links in content/resources/*.yaml and
content/tracks/*.mdx you can verify are dead, and fix or remove them.

Run `pnpm test && pnpm build`. Both must pass.

If green: `git add -A && git commit -m "chore(daily): <date> picks + content"
&& git push`.

If build or tests fail: revert your content edits (`git checkout -- content/`,
but NOT content/daily/ which should still be committed) and report what failed
instead of pushing broken content.

Hard rule: only ever touch files under content/ and content/daily/. Never edit
anything under app/, components/, lib/, or config files — that is Rahul's
application code, not learning content, and editing it is out of scope for this
job.
```

## Why this shape

- The picker script (`scripts/pick-today.ts` / `lib/picker.ts`) is unit-tested and
  prerequisite-aware — the agent doesn't decide *which* topic, it just runs the
  deterministic picker.
- Content-only edits mean a bad day's agent run can only break a YAML/MDX file, which
  `pnpm build` already fails loudly on (Zod schema validation) before anything is pushed.
- Track A (`content/tracks/a.mdx`) is the canonical pattern every other track's content
  should match — the daily prompt points at it explicitly rather than re-describing the
  format, so the format can evolve in one place.

## One-time setup (Rahul, interactive session)

1. Open an interactive Claude Code session in this repo.
2. Invoke the `schedule` skill.
3. Paste the prompt above, set cadence to weekdays 07:30 (or your preference).
4. Confirm the scheduled task has push access to `origin` (the repo's existing
   `git@github-personal:...` remote/SSH config already handles auth — no new secrets
   needed).
