"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Info, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

const dashClass = "border-t border-dashed border-[#DAD9DE]/50 dark:border-muted"

export interface IncotermData {
  code: string
  name: string
  translation: string
  rule: string
  metrics: {
    fob: number
    freight: number
    insurance: number
    totalAdjustment: number
    cif: number
  }
  note: string
}

const DEFAULT_INCOTERM_DATA: IncotermData = {
  code: "FOB",
  name: "FREE ON BOARD",
  translation: "Libre a Bordo",
  rule: "El vendedor entrega en el puerto de origen (Miami, EE.UU.). El riesgo y los costos se transfieren al comprador una vez la carga esta sobre el buque/avion.",
  metrics: {
    fob: 800.0,
    freight: 20.0,
    insurance: 8.0,
    totalAdjustment: 28.0,
    cif: 828.0,
  },
  note: "Para el calculo de impuestos en destino, VESTA calcula automaticamente el flete y seguro teorico para llevar el valor FOB al estandar CIF exigido.",
}

interface IncotermSimulationCardProps {
  forceTooltip?: boolean
  data?: IncotermData
}

export function IncotermSimulationCard({
  forceTooltip = false,
  data = DEFAULT_INCOTERM_DATA,
}: IncotermSimulationCardProps) {
  const { metrics } = data
  const [adjustmentsOpen, setAdjustmentsOpen] = useState(true)
  const [tooltipOpen, setTooltipOpen] = useState(forceTooltip)

  return (
    <div className="rounded-[12px] bg-[#DAD9DE]/50 p-[5px] dark:bg-neutral-800">
      <div
        className={cn(
          "relative z-[2] rounded-[12px] rounded-br-[12px] bg-background shadow-lg"
        )}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
            CONFIGURACION DE COMPRA: INCOTERM
          </span>
          <TooltipProvider>
            <Tooltip
              open={forceTooltip ? true : tooltipOpen}
              onOpenChange={(open) => !forceTooltip && setTooltipOpen(open)}
            >
              <TooltipTrigger asChild>
                <button type="button" className="cursor-pointer">
                  <Info className="size-3 text-muted-foreground/60 hover:text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                {data.note}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className={dashClass} />

        <div className="px-5 py-3">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-bold">
              {data.code}
            </Badge>
            <span className="text-sm font-medium">{data.name}</span>
          </div>
        </div>

        <div className={dashClass} />

        <div className="px-5 py-3">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">Regla ICC:</span>{" "}
            {data.rule}
          </p>
        </div>

        <div className={dashClass} />

        <div className="px-5 py-3">
          <div className="mb-3 flex items-center gap-1.5">
            <h4 className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              METRICA DE VALORACION ADUANERA
            </h4>
          </div>

          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Valor Comercial Base (FOB):
              </span>
              <span className="font-medium tabular-nums">
                ${metrics.fob.toFixed(2)} USD
              </span>
            </div>

            <Collapsible
              open={adjustmentsOpen}
              onOpenChange={setAdjustmentsOpen}
            >
              <CollapsibleTrigger asChild>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <ChevronRight
                      className={cn(
                        "size-3 transition-transform duration-200",
                        adjustmentsOpen && "rotate-90"
                      )}
                    />
                    (+) Ajustes requeridos para CIF:
                  </span>
                  <span className="font-medium tabular-nums">
                    ${metrics.totalAdjustment.toFixed(2)} USD
                  </span>
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent className="data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-0">
                <div className="mt-1.5 ml-6 space-y-0.5 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>--- Flete Internacional</span>
                    <span className="tabular-nums">
                      ${metrics.freight.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>--- Seguro Obligatorio</span>
                    <span className="tabular-nums">
                      ${metrics.insurance.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>

        <div className={dashClass} />

        <div className="px-5 py-3">
          <div className="flex justify-between text-sm font-bold">
            <span>CIF:</span>
            <span className="tabular-nums">${metrics.cif.toFixed(2)} USD</span>
          </div>
        </div>
      </div>
    </div>
  )
}
