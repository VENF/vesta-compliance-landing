"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShinyButton } from "@/components/ui/shiny-button"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function CtaSection() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden border-b-2 border-dashed border-[#DAD9DE] bg-black bg-[url('https://ik.imagekit.io/02idw6idur/vesta-1.png?updatedAt=1783017703262')] bg-contain bg-right bg-no-repeat py-24 text-white dark:border-muted">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 p-12 text-center lg:p-20"
        >
          <h2 className="max-w-2xl text-[48px] leading-none font-bold">
            Toma el control total de tu cumplimiento arancelario.
          </h2>
          <p className="max-w-xl text-copy-18 text-white">
            No dejes tus márgenes de ganancia al azar. Comienza hoy a blindar tu
            cadena de suministro contra multas y retrasos aduaneros de forma
            automatizada.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ShinyButton
              className="bg-black dark:bg-white"
              onClick={() => router.push("/classifier")}
            >
              Probar demo Alfa
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
