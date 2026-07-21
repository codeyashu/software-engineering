# Daily agent runbook

This is the exact instruction to register as a scheduled cloud agent (via Claude Code's
`schedule` skill), run on weekday mornings against this repo
(`git@github-personal:codeyashu/software-engineering.git`, branch `main`).

**Suggested cadence:** weekdays, 07:30 local time.

## The prompt to schedule

```
Run `pnpm install && pnpm daily:pick`. This writes content/daily/<today>.md with
2-3 prioritized, prerequisite-unlocked topics for today — this is a learning-pace
pick, not a content-authoring job.

Run `pnpm test && pnpm build`. Both must pass.

If green: `git add -A && git commit -m "chore(daily): <date> picks" && git push`.

If build or tests fail: revert your content edits (`git checkout -- content/`,
but NOT content/daily/ which should still be committed) and report what failed
instead of pushing broken content.

Hard rule: only ever touch files under content/ and content/daily/. Never edit
anything under app/, components/, lib/, or config files — that is Rahul's
application code, not learning content, and editing it is out of scope for this
job.

Content depth work (deepening track/system-design/concepts/python pages) no
longer happens here — that's a separate, slower-cadence job. See
docs/enrichment-agent-prompt.md.
```

## Why this shape

- The picker script (`scripts/pick-today.ts` / `lib/picker.ts`) is unit-tested and
  prerequisite-aware — the agent doesn't decide *which* topic, it just runs the
  deterministic picker.
- Content-only edits mean a bad day's agent run can only break a YAML/MDX file, which
  `pnpm build` already fails loudly on (Zod schema validation) before anything is pushed.
- This job is deliberately narrow now: pick today's study topics, nothing else. Deep
  content authoring moved to its own cadence-aware job (`docs/enrichment-agent-prompt.md`)
  because different topics decay at different rates — refreshing content daily was the
  wrong tempo.

## One-time setup (Rahul, interactive session)

1. Open an interactive Claude Code session in this repo.
2. Invoke the `schedule` skill.
3. Paste the prompt above, set cadence to weekdays 07:30 (or your preference).
4. Confirm the scheduled task has push access to `origin` (the repo's existing
   `git@github-personal:...` remote/SSH config already handles auth — no new secrets
   needed).
