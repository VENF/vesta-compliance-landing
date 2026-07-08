"use client"

import { useState } from "react"
import { FileCheck, Upload } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import type { ProgressEventData } from "@/src/modules/classifier/domain/classification.entity"
import type { StepState } from "../store/classification.store"

import { NotificationList } from "@/components/ui/notification-list"

interface ProcessingStatusProps {
  mode: "upload" | "progress"
  steps?: StepState[]
  progress?: ProgressEventData
  onStart?: () => void
  loading?: boolean
}

export function ProcessingStatus({
  mode,
  steps,
  progress,
  onStart,
  loading,
}: ProcessingStatusProps) {
  const [fileName, setFileName] = useState<string | null>(null)
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
    transition: { duration: 0.35, ease: easeInOut },
  }

  const textSwap = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 4, filter: "blur(2px)" },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -4, filter: "blur(2px)" },
    transition: { duration: 0.15, ease: easeInOut },
  }

  const handleFile = (file: File | null) => {
    if (file) setFileName(file.name)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files?.[0] ?? null)
  }

  if (mode === "upload") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-4">
        <motion.div
          {...blurReveal}
          className="flex w-full max-w-md flex-col items-center gap-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={fileName ? "loaded" : "empty"}
              {...textSwap}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="flex h-44 w-full flex-col items-center justify-center gap-3 rounded-[12px] border-2 border-dashed border-border bg-card p-8"
            >
              {fileName ? (
                <FileCheck className="size-8 text-primary" />
              ) : (
                <Upload className="size-8 text-muted-foreground" />
              )}
              <p className="text-center text-sm break-words text-muted-foreground">
                {fileName
                  ? `documento cargado: ${fileName}`
                  : "Arrastra un archivo CSV o haz clic para seleccionar"}
              </p>
              <input
                id="csv-upload"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("csv-upload")?.click()}
              >
                Seleccionar archivo
              </Button>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-muted-foreground">
              Carga tu factura proforma o un CSV con los detalles de tu producto
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
              <span>
                Formatos permitidos:{" "}
                <span className="font-medium text-muted-foreground/80">
                  .csv | .pdf
                </span>
              </span>
              <span className="text-muted-foreground/20">|</span>
              <span>
                Tamaño máximo:{" "}
                <span className="font-medium text-muted-foreground/80">
                  5 MB
                </span>
              </span>
            </div>
          </div>

          <Button
            className="cursor-pointer"
            size="lg"
            disabled={!fileName || loading}
            onClick={() => onStart?.()}
          >
            {loading ? "Iniciando..." : "Procesar"}
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-4">
      <motion.div
        key="processing"
        {...blurReveal}
        className="flex w-full max-w-md flex-col items-center gap-6"
      >
        <NotificationList
          progress={{
            percent: progress?.percent ?? 0,
            eta: progress?.eta ?? "Calculando…",
          }}
          steps={steps ?? []}
        />
      </motion.div>
    </div>
  )
}
