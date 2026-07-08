import { z } from "zod"

export const StepId = z.enum([
  "processing",
  "technical_sheet",
  "scanning",
  "analyzing",
  "landed_cost",
  "legal",
])
export type StepId = z.infer<typeof StepId>

export const StepStatus = z.enum(["pending", "running", "ok"])
export type StepStatus = z.infer<typeof StepStatus>

export const StepEventData = z.object({
  stepId: StepId,
  status: StepStatus,
})
export type StepEventData = z.infer<typeof StepEventData>

export const ProgressEventData = z.object({
  percent: z.number().min(0).max(100),
  eta: z.string(),
})
export type ProgressEventData = z.infer<typeof ProgressEventData>

export const TechnicalSheet = z.object({
  technical_name: z.string(),
  constituent_material: z.string(),
  primary_function: z.string(),
  physical_presentation: z.string(),
  critical_specifications: z.record(z.string(), z.unknown()),
})
export type TechnicalSheet = z.infer<typeof TechnicalSheet>

export const CandidateHierarchyNode = z.object({
  type: z.string(),
  code: z.string(),
  title: z.string().nullable(),
  description: z.string(),
  aec_actual: z.number().optional(),
  physical_unit: z.string().optional(),
  ex_aec: z.null().optional(),
  ex_aec_legal_refs: z.null().optional(),
})
export type CandidateHierarchyNode = z.infer<typeof CandidateHierarchyNode>

export const ChapterNote = z.object({
  scope: z.null().optional(),
  id: z.string(),
  type: z.string(),
  content: z.string(),
})
export type ChapterNote = z.infer<typeof ChapterNote>

export const Candidate = z.object({
  code: z.string(),
  description: z.string(),
  score: z.number(),
  aec_actual: z.number(),
  physical_unit: z.string(),
  sa_chapter: z.string(),
  hierarchy: z.array(CandidateHierarchyNode),
  regimes: z.array(z.unknown()),
  articles: z.array(z.unknown()),
  chapterNotes: z.array(ChapterNote),
})
export type Candidate = z.infer<typeof Candidate>

export const ClassificationPathNode = z.object({
  level: z.string(),
  code: z.string(),
  description: z.string(),
  justification: z.string(),
})
export type ClassificationPathNode = z.infer<typeof ClassificationPathNode>

export const Verdict = z.object({
  code: z.string(),
  description: z.string(),
  score: z.number(),
  date: z.string(),
  aec: z.number(),
  physical_unit: z.string(),
  operation_type: z.string(),
  destination_country: z.string(),
  classification_path: z.array(ClassificationPathNode),
  justification: z.string(),
})
export type Verdict = z.infer<typeof Verdict>

export const ClassificationResult = z.object({
  technical: TechnicalSheet,
  candidates: z.array(Candidate),
  verdict: Verdict,
})
export type ClassificationResult = z.infer<typeof ClassificationResult>

export const PageState = z.enum(["processing", "complete", "error"])
export type PageState = z.infer<typeof PageState>
