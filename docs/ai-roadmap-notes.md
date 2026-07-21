# AI roadmap — pacing notes

This is the prose companion to [`content/roadmap/tracks.yaml`](../content/roadmap/tracks.yaml)
(rendered at `/roadmap`). The yaml holds the structured data — tracks, subtopics,
complexity, hours, prereqs, docs/videos. This file holds the meta-layer that schema
has no field for: pacing, what to park, and the closing career-signal framing.

## Timeline (8-10h/wk, adjust to pace)

At 8-10h/wk, the P1 tracks (A, B, C, L, CE, G, I) run roughly 3-4 months; folding in
P2-P3 depth (F, H, J, K) plus Track S if on JVM pushes to the full 6.

JVM builders: do Track S rows in parallel with the matching Python-track weeks, not
after them — e.g. the week covering Track C's tool-calling subtopics is also the week
for Track S's `tool-annotations`/`structured-output-pojo`. Concept once, build in your
stack twice.

## Park entirely unless a specific need arises

Already marked `status: parked` in `tracks.yaml` — leave parked until a real project
forces the issue:

- `multi-agent-supervisor`, `agent-trajectory-eval` (Track F, "F5-6" in the original spec)
- `agui-a2ui` (Track G, "G5-7")
- `distillation-quantization` (Track J, "J5")
- `doc-audio-agent-pipelines`, `tts-voice-agents` (Track K, "K7-8")

(`B7` and `CE12` in the original spec don't map to a real item — Track B has 6 rows,
Track CE has 11 — so nothing in those two tracks is force-parked.)

## Follow / anchor resources

Not duplicated here — already loaded as real resource entries:

- Ongoing-signal follows (Karpathy, 3Blue1Brown, Simon Willison, Chip Huyen, Hamel
  Husain, Latent Space, etc.) → `content/resources/newsletters.yaml`
- Core anchor resources (Chip Huyen's AI Engineering, Raschka's LLMs-from-scratch,
  NirDiamant's three repos, Lilian Weng's agent-theory post) → `content/resources/anchors.yaml`

## Career signal

Architect skill isn't framework count — it's measured choices plus written ADRs.
Pattern to aim for: "Chose hybrid+rerank over GraphRAG: 80% single-hop queries, RAGAS
delta didn't justify 10x index cost." That sentence is the job — Track H's
`adr-discipline` exit criterion exists to build the habit of writing it.
