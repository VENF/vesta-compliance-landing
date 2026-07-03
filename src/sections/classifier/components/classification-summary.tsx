"use client"

import type { Verdict } from "@/src/modules/classifier/domain/classification.entity"

interface ClassificationSummaryProps {
  verdict: Verdict
  refNum: string
}

export function ClassificationSummary({
  verdict,
  refNum,
}: ClassificationSummaryProps) {
  return (
    <>
      <div className="flex items-center justify-end gap-4 px-8 py-4">
        <span className="text-sm font-semibold">AEC</span>
        <span className="font-mono text-lg font-bold">{verdict.aec}%</span>
      </div>

      <div className="border-t border-dashed border-[#DAD9DE]/50 dark:border-card" />

      <div className="py-4" />

      <div className="px-8 pb-5">
        <p className="mb-4 text-xs font-semibold tracking-[0.1em] text-muted-foreground">
          DETALLES ADICIONALES
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-muted-foreground">Operación:</span>
            <span className="text-right font-mono break-words">
              {verdict.operation_type}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-muted-foreground">
              Unidad física:
            </span>
            <span className="text-right font-mono break-words">
              {verdict.physical_unit}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="shrink-0 text-muted-foreground">Ref:</span>
            <span className="font-mono">{refNum}</span>
          </div>
        </div>
      </div>
    </>
  )
}
