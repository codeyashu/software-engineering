import { z } from 'zod';

export const LinkSchema = z.object({ label: z.string(), url: z.string().url() });

export const RoadmapTopicSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  complexity: z.number().int().min(1).max(5),
  durationHrs: z.number().positive(),
  priority: z.enum(['P1', 'P2', 'P3', 'P4', 'P5']),
  status: z.enum(['not-started', 'in-progress', 'done', 'parked']),
  prereqs: z.array(z.string()).default([]),
  track: z.string().optional(),
  docs: z.array(LinkSchema).optional(),
  videos: z.array(LinkSchema).optional(),
});
export type RoadmapTopic = z.infer<typeof RoadmapTopicSchema>;

export const TrackMetaSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  priority: z.string(),
  exit: z.string(),
  subtopics: z.array(RoadmapTopicSchema),
});
export type TrackMeta = z.infer<typeof TrackMetaSchema>;

export const TracksFileSchema = z.object({ tracks: z.array(TrackMetaSchema) });
export const PythonRoadmapFileSchema = z.object({ topics: z.array(RoadmapTopicSchema) });

export const QAItemSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  answer: z.string().min(1),
  difficulty: z.number().int().min(1).max(5),
  tags: z.array(z.string()).default([]),
});
export type QAItem = z.infer<typeof QAItemSchema>;
export const QAFileSchema = z.object({ items: z.array(QAItemSchema) });

export const ResourceItemSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
  kind: z.enum(['newsletter', 'video', 'doc', 'anchor']),
  tags: z.array(z.string()).default([]),
});
export type ResourceItem = z.infer<typeof ResourceItemSchema>;
export const ResourcesFileSchema = z.object({ items: z.array(ResourceItemSchema) });

export const ProjectSchema = z.object({
  track: z.string().min(1),
  title: z.string().min(1),
  artifactUrl: z.string().url().optional(),
  evidenceUrl: z.string().url().optional(),
  status: z.enum(['not-started', 'in-progress', 'done', 'parked']),
});
export type Project = z.infer<typeof ProjectSchema>;
export const ProjectsFileSchema = z.object({ projects: z.array(ProjectSchema) });
