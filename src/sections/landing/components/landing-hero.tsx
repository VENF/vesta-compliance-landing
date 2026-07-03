"use client"

import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { ShinyButton } from "@/components/ui/shiny-button"

export function LandingHero() {
  const router = useRouter()

  return (
    <section
      id="home"
      className="flex min-h-[90vh] flex-col items-center justify-center border-x-2 border-dashed border-[#DAD9DE] md:h-[93vh] dark:border-muted"
    >
      <div className="flex flex-col items-center justify-center px-4">
        <div className="z-2 flex flex-col items-center justify-center gap-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase md:text-xs">
            CLASIFICACIÓN ARANCELARIA, AUDITORÍA DE RIESGO Y CÁLCULO FISCAL EN
            TIEMPO REAL.
          </p>
          <h1 className="max-w-4xl text-[48px] leading-none font-bold md:text-[68px]">
            Automatiza el cumplimiento de tu carga.
          </h1>
          <p className="max-w-2xl text-copy-16 text-muted-foreground">
            Clasifica mercancías al instante e identifica automáticamente
            decretos o reformas vigentes para tus productos en segundos. Mitiga
            riesgos regulatorios y proyecta tus costos en segundo plano para
            proteger tu cadena de suministro.
          </p>
          <div className="">
            <ShinyButton
              className="bg-black dark:bg-white"
              onClick={() => router.push("/classifier")}
            >
              Probar demo
            </ShinyButton>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative z-1 mr-4 aspect-[600/390] w-full max-w-[600px] bg-[url('https://ik.imagekit.io/02idw6idur/vesta-1-light.png')] bg-contain bg-center bg-no-repeat dark:mr-8 dark:bg-[url('https://ik.imagekit.io/02idw6idur/vesta-1%20(1).png')]"
        />
      </div>
    </section>
  )
}
