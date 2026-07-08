"use client"

import { useRouter } from "next/navigation"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Button } from "@/components/ui/button"
import { HeroVideoDialog } from "@/components/ui/hero-video-dialog"
import { ArrowRight } from "lucide-react"

export function LandingHero() {
  const router = useRouter()

  return (
    <section
      id="home"
      className="mt-[.5px] flex min-h-[90vh] flex-col items-center justify-center border-x-2 border-dashed border-[#DAD9DE] py-4 dark:border-muted"
    >
      <div className="flex flex-col items-center justify-center px-4">
        <div className="z-2 flex flex-col items-center justify-center gap-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase md:text-xs">
            INGENIERÍA LEGAL Y FINANCIERA PARA COMERCIO EXTERIOR
          </p>
          <h1 className="max-w-4xl text-[38px] leading-none font-bold md:text-[68px]">
            Clasifica, simula y audita tu importación en minutos.
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground md:text-copy-16">
            El motor de clasificación arancelaria más preciso del mercado. Carga
            tu factura proforma y obtén en minutos la partida de mayor
            probabilidad fiscal, el impacto impositivo proyectado y un dictamen
            técnico auditable con respaldo y trazabilidad de la normativa
            vigente.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ShinyButton
              className="bg-black dark:bg-white"
              onClick={() => router.push("/classifier")}
            >
              Probar demo
            </ShinyButton>
            <Button
              variant="outline"
              className="text-black dark:text-white"
              size="lg"
              onClick={() => router.push("/waitlist")}
            >
              Lista de espera
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <HeroVideoDialog
            animationStyle="from-center"
            videoSrc="https://qd5ur6ghpfgaklu4.public.blob.vercel-storage.com/video_cortado.mp4"
            thumbnailSrc="https://ik.imagekit.io/02idw6idur/Captura%20desde%202026-07-08%2014-28-38.png"
            startTime={0}
            endTime={85}
            className="w-full max-w-4xl"
          />
        </div>
      </div>
    </section>
  )
}
