"use client"

import { useEffect } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useClassificationSse } from "../hooks/use-classification-sse"
import { useClassificationStore } from "../store/classification.store"
import { ProcessingStatus } from "../components/processing-status"
import { ClassificationResultSection } from "../components/classification-result"
import { IncotermSimulationCard } from "@/src/sections/landing/components/incoterm-simulation-card"
import { ProcessingHeader } from "../components/processing-header"
import { Footer } from "../components/Footer"
import { StripedPattern } from "@/components/striped-pattern"

interface ClassifierProgressViewProps {
  id: string
}

export function ClassifierProgressView({ id }: ClassifierProgressViewProps) {
  useClassificationSse(id)

  const reset = useClassificationStore((s) => s.reset)
  useEffect(() => {
    reset()
  }, [reset])

  const steps = useClassificationStore((s) => s.steps)
  const progress = useClassificationStore((s) => s.progress)
  const result = useClassificationStore((s) => s.result)
  const pageState = useClassificationStore((s) => s.pageState)
  const error = useClassificationStore((s) => s.error)
  const prefersReducedMotion = useReducedMotion()

  const easeInOut = "easeInOut" as const

  const blurReveal = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, filter: "blur(4px)" },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, filter: "blur(0px)" },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, filter: "blur(4px)" },
    transition: { duration: 0.4, ease: easeInOut },
  }

  return (
    <div className="relative min-h-dvh">
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col">
        <div className="flex-1" />
        <StripedPattern
          direction="right"
          className="text-[#EDEDEF] dark:text-muted"
        />
      </div>

      <div className="relative z-1 grid min-h-[100vh] grid-cols-1 md:grid-cols-3 md:gap-0">
        <div className="hidden border-r-2 border-dashed border-[#DAD9DE] md:col-start-1 md:row-start-1 md:flex dark:border-muted" />

        <div className="col-start-1 row-start-1 min-h-[200px] p-0 md:col-start-2 md:row-start-1 md:p-0">
          <ProcessingHeader />
        </div>

        <div className="hidden border-l-2 border-dashed border-[#DAD9DE] md:col-start-3 md:row-start-1 md:flex dark:border-muted" />

        <div className="hidden border-y-2 border-r-2 border-dashed border-[#DAD9DE] md:col-start-1 md:row-start-2 md:flex md:items-center md:justify-center dark:border-muted" />

        <div className="relative col-start-1 row-start-2 flex min-h-[400px] items-center justify-center border-y-2 border-dashed border-[#DAD9DE] p-4 md:col-start-2 md:row-start-2 md:p-4 dark:border-muted">
          <div className="z-2 mx-auto flex w-full max-w-3xl flex-col py-2">
            <div className="">
              <div className="">
                <AnimatePresence mode="wait">
                  {pageState === "complete" && result ? (
                    <motion.div
                      key="result"
                      {...blurReveal}
                      className="flex w-full flex-col items-center gap-6"
                    >
                      <ClassificationResultSection data={result} />
                      <IncotermSimulationCard />
                    </motion.div>
                  ) : pageState === "error" ? (
                    <motion.div key="error" {...blurReveal}>
                      <div className="flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center">
                        <span className="text-heading-20 text-destructive">
                          Error
                        </span>
                        <span className="text-copy-16 text-muted-foreground">
                          {error}
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="processing" {...blurReveal}>
                      <ProcessingStatus
                        mode="progress"
                        steps={steps}
                        progress={progress}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden border-y-2 border-l-2 border-dashed border-[#DAD9DE] md:col-start-3 md:row-start-2 md:flex md:items-center md:justify-center dark:border-muted" />

        <div className="hidden border-r-2 border-dashed border-[#DAD9DE] md:col-start-1 md:row-start-3 md:flex dark:border-muted" />

        <div className="col-start-1 row-start-3 min-h-[100px] p-0 md:col-start-2 md:row-start-3 md:p-0">
          <Footer />
        </div>

        <div className="hidden items-center justify-center border-l-2 border-dashed border-[#DAD9DE] md:col-start-3 md:row-start-3 md:flex dark:border-muted" />
      </div>
    </div>
  )
}
