"use client"

import { cn } from "@/lib/utils"
import type { ClassificationResult } from "@/src/modules/classifier/domain/classification.entity"
import { ClassificationHeader } from "./classification-header"
import { ClassificationTechnicalSheet } from "./classification-technical-sheet"
import { ClassificationPath } from "./classification-path"
import { ClassificationLegalJustification } from "./classification-legal-justification"
import { ClassificationSummary } from "./classification-summary"
import { ClassificationDownload } from "./classification-download"

interface ClassificationResultSectionProps {
  data: ClassificationResult
  className?: string
}

const dashClass = "border-t border-dashed border-[#DAD9DE]/50 dark:border-card"

export function ClassificationResultSection({
  data,
  className,
}: ClassificationResultSectionProps) {
  const { technical, verdict } = data

  const refNum = `#CLS-${String(new Date(verdict.date).getTime()).slice(-4)}`
  const dateStr = new Date(verdict.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="rounded-[12px] bg-[#DAD9DE]/50 p-[5px] dark:bg-neutral-800">
      <div
        className={cn(
          "relative z-[2] rounded-l-[12px] rounded-br-[12px] bg-background shadow-lg",

          "before:absolute before:top-0 before:right-0 before:h-0 before:w-0 before:border-solid",
          "before:border-t-[24px] before:border-l-[24px]",
          "before:border-t-[#DAD9DE] before:border-l-transparent dark:before:border-t-neutral-800",

          "after:absolute after:top-0 after:right-0 after:h-0 after:w-0 after:border-solid",
          "after:border-t-[24px] after:border-l-[24px]",
          "after:border-t-muted/40 after:border-l-transparent",
          "after:rounded-bl-[4px] after:shadow-[-2px_2px_3px_rgba(0,0,0,0.15)] dark:after:shadow-[-2px_2px_4px_rgba(255,255,255,0.12)]",

          className
        )}
      >
        <ClassificationDownload />

        <div className={dashClass} />

        <ClassificationHeader verdict={verdict} dateStr={dateStr} />

        <div className={dashClass} />

        <ClassificationTechnicalSheet technical={technical} />

        <div className={dashClass} />

        <ClassificationLegalJustification
          justification={verdict.justification}
        />

        <div className={dashClass} />

        <ClassificationPath path={verdict.classification_path} />
        <div className={dashClass} />

        <ClassificationSummary verdict={verdict} refNum={refNum} />
      </div>
    </div>
  )
}
