"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ProcessingStatus } from "../components/processing-status"
import { ProcessingHeader } from "../components/processing-header"
import { Footer } from "../components/Footer"
import { StripedPattern } from "@/components/striped-pattern"

export function ClassifierUploadView() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
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
          }),
        }
      )
      const data = await res.json()
      router.push(`/classifier/${data.id}`)
    } catch {
      setLoading(false)
    }
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
          <ProcessingStatus
            mode="upload"
            loading={loading}
            onStart={handleStart}
          />
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
