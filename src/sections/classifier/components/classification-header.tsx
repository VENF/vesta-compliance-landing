"use client"

import type { Verdict } from "@/src/modules/classifier/domain/classification.entity"

interface ClassificationHeaderProps {
  verdict: Verdict
  dateStr: string
}

export function ClassificationHeader({
  verdict,
  dateStr,
}: ClassificationHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 px-8 pt-8 pb-5">
      <div className="space-y-2">
        <p className="mt-0.5 text-lg font-bold">{verdict.code}</p>
        <p className="text-xs font-semibold tracking-[0.15em] text-muted-foreground">
          CLASIFICACIÓN ARANCELARIA
        </p>
        <p className="mt-1 text-xs text-muted-foreground uppercase">
          {dateStr}
        </p>
      </div>
      <div className="space-y-2 text-left sm:text-right">
        <p className="text-md mt-0.5 font-bold">{verdict.description}</p>
        <p className="text-xs text-muted-foreground">
          Confianza: {(verdict.score * 100).toFixed(1)}%
        </p>
        <p className="text-xs text-muted-foreground">
          Destino: {verdict.destination_country}
        </p>
      </div>
    </div>
  )
}
