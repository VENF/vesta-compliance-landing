import { useEffect } from "react"
import { createClassificationUseCase } from "@/src/modules/classifier/application/classification.use-case"
import { classificationRepository } from "@/src/modules/classifier/infrastructure/classification.repository"
import { useClassificationStore } from "../store/classification.store"
import { getOrCreateSse, closeSse } from "@/src/lib/sse-manager"
import type {
  StepEventData,
  ProgressEventData,
  ClassificationResult,
} from "@/src/modules/classifier/domain/classification.entity"

export function useClassificationSse(id: string): void {
  const updateStep = useClassificationStore((s) => s.updateStep)
  const setProgress = useClassificationStore((s) => s.setProgress)
  const setResult = useClassificationStore((s) => s.setResult)
  const setError = useClassificationStore((s) => s.setError)

  useEffect(() => {
    const es = getOrCreateSse(id, () => {
      const useCase = createClassificationUseCase(classificationRepository())
      const result = useCase.connectSse(id)
      if (!result.ok) throw new Error("Failed to connect SSE")
      return result.data
    })

    const handleStep = (e: MessageEvent) => {
      try {
        const data: StepEventData = JSON.parse(e.data)
        updateStep(data.stepId, data.status)
      } catch {
        /* skip malformed */
      }
    }

    const handleProgress = (e: MessageEvent) => {
      try {
        const data: ProgressEventData = JSON.parse(e.data)
        setProgress(data)
      } catch {
        /* skip malformed */
      }
    }

    const handleComplete = (e: MessageEvent) => {
      try {
        const data: ClassificationResult = JSON.parse(e.data)
        setResult(data)
      } catch {
        setError("Error al procesar el resultado")
      }
      closeSse(id)
    }

    const handleError = () => {
      setError("Error de conexión SSE")
      closeSse(id)
    }

    es.addEventListener("step", handleStep)
    es.addEventListener("progress", handleProgress)
    es.addEventListener("complete", handleComplete)
    es.addEventListener("error", handleError)

    return () => {
      es.removeEventListener("step", handleStep)
      es.removeEventListener("progress", handleProgress)
      es.removeEventListener("complete", handleComplete)
      es.removeEventListener("error", handleError)
    }
  }, [id, updateStep, setProgress, setResult, setError])
}
