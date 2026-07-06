"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import SideRays from "@/components/SideRays"

export function CtaSection() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-black py-16 text-white">
      <div className="absolute inset-0 z-0">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1}
        />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 p-12 text-center lg:p-20"
        >
          <h2 className="max-w-2xl text-[48px] leading-none font-bold">
            ¿Eres agencia aduanal o importador directo?
          </h2>
          <p className="max-w-xl text-copy-18 text-white">
            VESTA se adapta a tu operación. Las agencias multiplican su
            capacidad operativa sin contratar más clasificadores. Los
            importadores proyectan el landed cost real antes de cada embarque.
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
              asChild
            >
              <Link href="/waitlist">
                Lista de espera
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
