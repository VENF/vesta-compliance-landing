"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProcessingStatus } from "../components/processing-status"
import { FinancialConfigPanel } from "../components/financial-config-panel"
import { ProcessingHeader } from "../components/processing-header"
import { Footer } from "../components/Footer"
import { StripedPattern } from "@/components/striped-pattern"
import type { IncotermData } from "@/src/sections/landing/components/incoterm-simulation-card"

type UploadStep = "upload" | "product-values" | "incoterm-config"

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

export function ClassifierUploadView() {
  const router = useRouter()
  const prefersReducedMotion = useReducedMotion()
  const [step, setStep] = useState<UploadStep>("upload")
  const [loading, setLoading] = useState(false)
  const [valorTotal, setValorTotal] = useState(800.0)
  const [cantidad, setCantidad] = useState(1)
  const [incotermData, setIncotermData] = useState<IncotermData>(
    DEFAULT_INCOTERM_DATA
  )

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

  const handleProcesar = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep("product-values")
    }, 1500)
  }, [])

  const handleStartClassification = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classify/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            producto: {
              descripcion_comercial:
                "Smartphone Pro Max 256GB - Teléfono móvil celular inteligente con conectividad 5G, pantalla OLED de 6.7 pulgadas y cámara triple",
              uso_previsto:
                "Distribución comercial y venta al detal en tiendas de tecnología a nivel nacional",
            },
            valores: {
              valorTotal,
              cantidad,
            },
            incoterm: {
              code: incotermData.code,
              name: incotermData.name,
              freight: incotermData.metrics.freight,
              insurance: incotermData.metrics.insurance,
            },
          }),
        }
      )
      const data = await res.json()
      router.push(`/classifier/${data.id}`)
    } catch {
      setLoading(false)
    }
  }, [router, valorTotal, cantidad, incotermData])

  const handleValorTotalChange = useCallback((value: string) => {
    setValorTotal(Math.max(0, parseFloat(value) || 0))
  }, [])

  const handleCantidadChange = useCallback((value: string) => {
    setCantidad(Math.max(1, parseInt(value) || 1))
  }, [])

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
            <AnimatePresence mode="wait">
              {step === "upload" && (
                <motion.div key="upload" {...blurReveal}>
                  <ProcessingStatus
                    mode="upload"
                    loading={loading}
                    onStart={handleProcesar}
                  />
                </motion.div>
              )}

              {step === "product-values" && (
                <motion.div
                  key="product-values"
                  {...blurReveal}
                  className="mx-auto flex w-full max-w-md flex-col items-center gap-6"
                >
                  <div className="w-full rounded-[12px] bg-[#DAD9DE]/50 p-[5px] dark:bg-neutral-800">
                    <div className="relative z-[2] rounded-[12px] rounded-br-[12px] bg-background shadow-lg">
                      <div className="px-5 pt-5 pb-3">
                        <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                          DATOS DEL PRODUCTO DETECTADOS
                        </span>
                      </div>

                      <div className="border-t border-dashed border-[#DAD9DE]/50 dark:border-muted" />

                      <div className="space-y-4 px-5 py-4">
                        <div>
                          <Label
                            htmlFor="valor-total"
                            className="mb-1.5 block text-xs text-muted-foreground"
                          >
                            Valor Total (USD)
                          </Label>
                          <div className="relative">
                            <Input
                              id="valor-total"
                              type="number"
                              min={0}
                              step={0.01}
                              value={valorTotal || ""}
                              onChange={(e) =>
                                handleValorTotalChange(e.target.value)
                              }
                              className="h-8 [appearance:textfield] pl-7 text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <span className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2 text-xs text-muted-foreground">
                              $
                            </span>
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="cantidad"
                            className="mb-1.5 block text-xs text-muted-foreground"
                          >
                            Cantidad (unidades)
                          </Label>
                          <Input
                            id="cantidad"
                            type="number"
                            min={1}
                            step={1}
                            value={cantidad || ""}
                            onChange={(e) =>
                              handleCantidadChange(e.target.value)
                            }
                            className="h-8 [appearance:textfield] text-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="cursor-pointer"
                    onClick={() => setStep("incoterm-config")}
                  >
                    Continuar
                  </Button>
                </motion.div>
              )}

              {step === "incoterm-config" && (
                <motion.div key="incoterm-config" {...blurReveal}>
                  <FinancialConfigPanel
                    data={incotermData}
                    onDataChange={setIncotermData}
                    onContinue={handleStartClassification}
                    continueLabel={loading ? "Iniciando..." : "Continuar"}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
