"use client"

import type { TechnicalSheet } from "@/src/modules/classifier/domain/classification.entity"

interface ClassificationTechnicalSheetProps {
  technical: TechnicalSheet
}

export function ClassificationTechnicalSheet({
  technical,
}: ClassificationTechnicalSheetProps) {
  return (
    <div className="px-8 pt-5 pb-3">
      <p className="mb-4 text-xs font-semibold tracking-[0.1em] text-muted-foreground">
        FICHA TÉCNICA
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Nombre Técnico</p>
          <p className="text-sm break-words">{technical.technical_name}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            Material Constituyente
          </p>
          <p className="text-sm break-words">
            {technical.constituent_material}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Función Principal</p>
          <p className="text-sm break-words">{technical.primary_function}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Presentación Física</p>
          <p className="text-sm break-words">
            {technical.physical_presentation}
          </p>
        </div>
      </div>
    </div>
  )
}
