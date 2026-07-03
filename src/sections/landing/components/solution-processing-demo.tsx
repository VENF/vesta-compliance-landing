"use client"

import { useEffect, useState } from "react"
import { ProcessingStatus } from "@/src/sections/classifier/components/processing-status"
import type { StepState } from "@/src/sections/classifier/store/classification.store"
import type { ProgressEventData } from "@/src/modules/classifier/domain/classification.entity"

const BASE_STEPS: StepState[] = [
  {
    stepId: "variables",
    label: "Identificando variables críticas del producto",
    status: "pending",
  },
  {
    stepId: "scanning",
    label: "Escaneando el Arancel Nacional SAC",
    status: "pending",
  },
  {
    stepId: "analyzing",
    label: "Relacionando producto con partida arancelaria",
    status: "pending",
  },
  {
    stepId: "legal",
    label: "Redactando fundamentación jurídica RGI",
    status: "pending",
  },
]

interface Phase {
  steps: StepState[]
  progress: ProgressEventData
}

function makeSteps(...overrides: [number, StepState["status"]][]): StepState[] {
  return BASE_STEPS.map((s, i) => {
    const override = overrides.find(([idx]) => idx === i)
    return { ...s, status: override ? override[1] : "pending" }
  })
}

const PHASES: Phase[] = [
  { steps: makeSteps(), progress: { percent: 0, eta: "Iniciando…" } },
  {
    steps: makeSteps([0, "running"]),
    progress: { percent: 15, eta: "~8 segundos" },
  },
  {
    steps: makeSteps([0, "ok"], [1, "running"]),
    progress: { percent: 35, eta: "~6 segundos" },
  },
  {
    steps: makeSteps([0, "ok"], [1, "ok"], [2, "running"]),
    progress: { percent: 60, eta: "~4 segundos" },
  },
  {
    steps: makeSteps([0, "ok"], [1, "ok"], [2, "ok"], [3, "running"]),
    progress: { percent: 85, eta: "~2 segundos" },
  },
  {
    steps: makeSteps([0, "ok"], [1, "ok"], [2, "ok"], [3, "ok"]),
    progress: { percent: 100, eta: "Completado" },
  },
]

const PHASE_DURATIONS = [800, 1200, 1500, 1500, 1500, 2000]

export function SolutionProcessingDemo() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>(PHASES[0])

  useEffect(() => {
    const timer = setTimeout(() => {
      const next = (phaseIndex + 1) % PHASES.length
      setPhaseIndex(next)
      setPhase(PHASES[next])
    }, PHASE_DURATIONS[phaseIndex])

    return () => clearTimeout(timer)
  }, [phaseIndex])

  return (
    <div className="w-full max-w-sm">
      <ProcessingStatus
        mode="progress"
        steps={phase.steps}
        progress={phase.progress}
      />
    </div>
  )
}
