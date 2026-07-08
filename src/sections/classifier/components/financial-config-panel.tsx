"use client"

import { useCallback } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { IncotermData } from "@/src/sections/landing/components/incoterm-simulation-card"

interface FinancialConfigPanelProps {
  data: IncotermData
  onDataChange: (data: IncotermData) => void
  onContinue?: () => void
  continueLabel?: string
}

const INCOTERM_GROUPS = [
  {
    group: 1,
    title: "Grupo 1: Entrega en Origen",
    subtitle: "El comprador asume la logística internacional",
    items: [
      { code: "EXW", name: "Ex Works", translation: "En fábrica" },
      { code: "FCA", name: "Free Carrier", translation: "Libre transportista" },
      {
        code: "FAS",
        name: "Free Alongside Ship",
        translation: "Libre al costado del buque",
      },
      { code: "FOB", name: "Free On Board", translation: "Libre a bordo" },
    ],
  },
  {
    group: 2,
    title: "Grupo 2: Flete Incluido / Seguro Opcional",
    subtitle: "El vendedor paga el transporte principal",
    items: [
      { code: "CFR", name: "Cost and Freight", translation: "Costo y flete" },
      {
        code: "CPT",
        name: "Carriage Paid To",
        translation: "Transporte pagado hasta",
      },
    ],
  },
  {
    group: 3,
    title: "Grupo 3: Logística Completa Incluida",
    subtitle: "Costo + Flete + Seguro",
    items: [
      {
        code: "CIF",
        name: "Cost, Insurance and Freight",
        translation: "Costo, seguro y flete",
      },
      {
        code: "CIP",
        name: "Carriage and Insurance Paid To",
        translation: "Transporte y seguro pagados hasta",
      },
    ],
  },
  {
    group: 4,
    title: "Grupo 4: Entrega en Destino",
    subtitle: "El vendedor asume los riesgos hasta el país final",
    items: [
      {
        code: "DAP",
        name: "Delivered At Place",
        translation: "Entregado en un punto",
      },
      {
        code: "DPU",
        name: "Delivered at Place Unloaded",
        translation: "Entregado en el lugar descargado",
      },
      {
        code: "DDP",
        name: "Delivered Duty Paid",
        translation: "Entregado con derechos pagados",
      },
    ],
  },
]

const FOB_DEFAULT_METRICS = {
  fob: 800.0,
  freight: 20.0,
  insurance: 8.0,
  totalAdjustment: 28.0,
  cif: 828.0,
}

const dashClass = "border-t border-dashed border-[#DAD9DE]/50 dark:border-muted"

function recompute(metrics: IncotermData["metrics"]): IncotermData["metrics"] {
  return {
    ...metrics,
    totalAdjustment: metrics.freight + metrics.insurance,
    cif: metrics.fob + metrics.freight + metrics.insurance,
  }
}

export function FinancialConfigPanel({
  data,
  onDataChange,
  onContinue,
  continueLabel = "Continuar",
}: FinancialConfigPanelProps) {
  const isFOB = data.code === "FOB"

  const handleIncotermChange = useCallback(
    (code: string) => {
      const item = INCOTERM_GROUPS.flatMap((g) => g.items).find(
        (i) => i.code === code
      )
      if (!item) return

      onDataChange({
        ...data,
        code: item.code,
        name: item.name,
        translation: item.translation,
        metrics: code === "FOB" ? FOB_DEFAULT_METRICS : data.metrics,
      })
    },
    [data, onDataChange]
  )

  const handleFreightChange = useCallback(
    (value: string) => {
      const freight = Math.max(0, parseFloat(value) || 0)
      const newMetrics = recompute({ ...data.metrics, freight })
      onDataChange({ ...data, metrics: newMetrics })
    },
    [data, onDataChange]
  )

  const handleInsuranceChange = useCallback(
    (value: string) => {
      const insurance = Math.max(0, parseFloat(value) || 0)
      const newMetrics = recompute({ ...data.metrics, insurance })
      onDataChange({ ...data, metrics: newMetrics })
    },
    [data, onDataChange]
  )

  const handleUseTheoretical = useCallback(() => {
    const insurance = data.metrics.fob * 0.01
    const newMetrics = recompute({ ...data.metrics, insurance })
    onDataChange({ ...data, metrics: newMetrics })
  }, [data, onDataChange])

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full rounded-[12px] bg-[#DAD9DE]/50 p-[5px] dark:bg-neutral-800">
        <div className="relative z-[2] rounded-[12px] rounded-br-[12px] bg-background shadow-lg">
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              CONFIGURACIÓN FINANCIERA
            </span>
          </div>

          <div className={dashClass} />

          <div className="px-5 py-4">
            <RadioGroup
              value={data.code}
              onValueChange={handleIncotermChange}
              className="flex w-full flex-col gap-3"
            >
              {INCOTERM_GROUPS.map((group) => (
                <div key={group.group}>
                  <p className="mb-1 text-xs font-medium text-foreground">
                    {group.title}
                  </p>
                  <p className="mb-2 text-[10px] text-muted-foreground">
                    {group.subtitle}
                  </p>
                  <div className="mb-1 flex flex-wrap gap-1.5">
                    {group.items.map((item) => {
                      const selected = data.code === item.code
                      return (
                        <label
                          key={item.code}
                          className={cn(
                            "flex cursor-pointer items-center gap-1 rounded-md border px-2.5 py-1 text-xs transition-colors",
                            selected
                              ? "border-primary bg-primary/10 font-medium text-primary"
                              : "border-input text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground"
                          )}
                        >
                          <RadioGroupItem
                            value={item.code}
                            id={item.code}
                            className="sr-only"
                          />
                          {item.code}
                        </label>
                      )
                    })}
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className={dashClass} />

          <div className="px-5 py-4">
            {isFOB ? (
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="freight"
                    className="mb-1.5 block text-xs text-muted-foreground"
                  >
                    Flete Internacional (USD)
                  </Label>
                  <div className="relative">
                    <Input
                      id="freight"
                      type="number"
                      min={0}
                      step={0.01}
                      value={data.metrics.freight || ""}
                      onChange={(e) => handleFreightChange(e.target.value)}
                      className="h-8 [appearance:textfield] pl-7 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-xs text-muted-foreground">
                      $
                    </span>
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground">
                    ⚠️ Sugerido por peso
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="insurance"
                    className="mb-1.5 block text-xs text-muted-foreground"
                  >
                    Seguro Internacional (USD)
                  </Label>
                  <div className="relative">
                    <Input
                      id="insurance"
                      type="number"
                      min={0}
                      step={0.01}
                      value={data.metrics.insurance || ""}
                      onChange={(e) => handleInsuranceChange(e.target.value)}
                      className="h-8 [appearance:textfield] pl-7 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                    <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-xs text-muted-foreground">
                      $
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    Monto teórico (1%): ${(data.metrics.fob * 0.01).toFixed(2)}{" "}
                    USD
                  </p>
                  <div className="flex items-center justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-1.5 cursor-pointer text-xs"
                      onClick={handleUseTheoretical}
                    >
                      Usar Seguro Teórico
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center py-6">
                <p className="text-sm text-muted-foreground italic">
                  ⏳ En espera — la configuración financiera para este Incoterm
                  estará disponible próximamente.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {onContinue && (
        <Button
          type="button"
          size="lg"
          className="cursor-pointer"
          onClick={onContinue}
        >
          {continueLabel}
        </Button>
      )}
    </div>
  )
}
