---
title: "ADR 0001 — Custom Next.js web app over plain markdown or MkDocs"
date: "2026-07-21"
status: "accepted"
---

## Context

Needed an end-to-end guide for the AI Engineer Curriculum: 12 tracks, a Python roadmap
with per-topic complexity/duration, an interview Q&A bank, resource links, system design
notes, progress tracking, and a daily "what to learn today" mechanic — with the GitHub
repo as the visibility surface. Options considered: plain markdown files, MkDocs Material
+ GitHub Pages, AppFlowy, or a full custom web app.

## Decision

Build a custom Next.js 15 static-export app (content-as-data: YAML + MDX in `/content`,
rendered by React components), deployed to GitHub Pages via GitHub Actions.

## Alternatives considered

- **Plain markdown only** — zero build, but no interactivity: no filterable roadmap
  table, no flashcards with spaced repetition, no localStorage progress tracking, no
  streak. Loses the daily-cadence mechanic's ability to render a "today" widget.
- **MkDocs Material + GitHub Pages** — good middle ground, but quiz/flashcard plugins are
  weaker than hand-rolled React, and progress tracking would still need custom JS anyway
  — at which point most of MkDocs' value (docs-first theming) isn't being used.
- **AppFlowy** — good personal UX, but not git-versioned as text, not shareable as a
  public site, and poor fit for code-heavy content. Rejected outright.

## Consequences

- Higher build cost than plain markdown (Task 1-12 of the implementation plan), but every
  interactive requirement (progress, streak, spaced repetition, filterable roadmap) is
  satisfied natively.
- Content-as-data means the daily scheduled agent only ever edits YAML/MDX, never React —
  automation stays safe because a malformed edit fails the Zod-validated build loudly
  instead of shipping broken content.
- Static export (`output: 'export'`) is a hard constraint going forward: no server-side
  data fetching, no API routes. Acceptable for a solo learning guide.
