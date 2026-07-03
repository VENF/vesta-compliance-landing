"use client"

import * as React from "react"
import { motion } from "motion/react"
import type { StepState } from "@/src/sections/classifier/store/classification.store"
import { ProcessingProgressBar } from "@/src/sections/classifier/components/processing-progress-bar"

const springTransition = {
  type: "spring" as const,
  stiffness: 260,
  damping: 25,
}

const STATUS_SUBTITLE: Record<StepState["status"], string> = {
  ok: "Completado",
  running: "En progreso",
  pending: "Pendiente",
}

const STATUS_COLOR: Record<StepState["status"], string> = {
  ok: "text-emerald-600 dark:text-emerald-400",
  running: "text-amber-600 dark:text-amber-400",
  pending: "text-neutral-400 dark:text-neutral-500",
}

const SORT_ORDER: Record<StepState["status"], number> = {
  running: 0,
  pending: 1,
  ok: 2,
}

interface NotificationListProps {
  steps: StepState[]
  progress: {
    percent: number
    eta: string
  }
}

function NotificationList({ steps, progress }: NotificationListProps) {
  const items = React.useMemo(() => {
    return [...steps]
      .sort((a, b) => SORT_ORDER[a.status] - SORT_ORDER[b.status])
      .map((step) => ({
        id: step.stepId,
        title: step.label,
        subtitle: STATUS_SUBTITLE[step.status],
        status: step.status,
      }))
  }, [steps])

  return (
    <div className="w-full max-w-md overflow-hidden rounded-[12px] bg-neutral-200 p-6 shadow-md dark:bg-neutral-900">
      <ProcessingProgressBar percent={progress.percent} eta={progress.eta} />
      <div className="relative mt-2 grid h-[72px] w-full grid-cols-1 grid-rows-1 items-center justify-items-center">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            animate={{
              opacity: i === 0 ? 1 : i === 1 ? 0.6 : 0.3,
              scale: 1 - i * 0.05,
              y: i * 12,
            }}
            transition={springTransition}
            style={{
              zIndex: items.length - i,
            }}
            className="col-start-1 row-start-1 w-full origin-top rounded-xl bg-neutral-100 px-4 py-2 shadow-sm dark:bg-neutral-800"
          >
            <div className="flex items-center justify-between">
              <h1 className="truncate text-sm font-medium">{item.title}</h1>
            </div>
            <div
              className={`truncate text-xs font-medium ${STATUS_COLOR[item.status]}`}
            >
              {item.subtitle}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export { NotificationList }
