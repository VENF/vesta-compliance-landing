import { create } from "zustand"
import type {
  ClassificationResult,
  ProgressEventData,
  PageState,
} from "@/src/modules/classifier/domain/classification.entity"

export interface StepState {
  stepId:
    | "processing"
    | "technical_sheet"
    | "scanning"
    | "analyzing"
    | "landed_cost"
    | "legal"
  label: string
  status: "pending" | "running" | "ok"
}

const INITIAL_STEPS: StepState[] = [
  {
    stepId: "processing",
    label: "Procesando documento",
    status: "pending",
  },
  {
    stepId: "technical_sheet",
    label: "Generando ficha técnica",
    status: "pending",
  },
  {
    stepId: "scanning",
    label: "Escaneando Sección XVI y Capítulo 85 del Arancel NCM",
    status: "pending",
  },
  {
    stepId: "analyzing",
    label: "Analizando subpartidas competidoras y aplicando descarte legal",
    status: "pending",
  },
  {
    stepId: "landed_cost",
    label: "Simulando landed cost según Incoterm",
    status: "pending",
  },
  {
    stepId: "legal",
    label: "Redactando fundamentación jurídica bajo RGI 1 y RGI 6",
    status: "pending",
  },
]

interface ClassificationStore {
  steps: StepState[]
  progress: ProgressEventData
  result: ClassificationResult | null
  pageState: PageState
  error: string | null
  setSteps: (steps: StepState[]) => void
  updateStep: (stepId: StepState["stepId"], status: StepState["status"]) => void
  setProgress: (progress: ProgressEventData) => void
  setResult: (result: ClassificationResult) => void
  setPageState: (pageState: PageState) => void
  setError: (error: string) => void
  reset: () => void
}

export const useClassificationStore = create<ClassificationStore>((set) => ({
  steps: INITIAL_STEPS,
  progress: { percent: 0, eta: "Calculando…" },
  result: null,
  pageState: "processing",
  error: null,

  setSteps: (steps) => set({ steps }),
  updateStep: (stepId, status) =>
    set((state) => ({
      steps: state.steps.map((s) =>
        s.stepId === stepId ? { ...s, status } : s
      ),
    })),
  setProgress: (progress) => set({ progress }),
  setResult: (result) => set({ result, pageState: "complete" }),
  setPageState: (pageState) => set({ pageState }),
  setError: (error) => set({ error, pageState: "error" }),
  reset: () =>
    set({
      steps: INITIAL_STEPS,
      progress: { percent: 0, eta: "Calculando…" },
      result: null,
      pageState: "processing",
      error: null,
    }),
}))
