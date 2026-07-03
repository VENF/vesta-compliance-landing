"use client"

import { motion } from "motion/react"
import { Database, History, Search, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const MEMORY_FEATURES = [
  {
    icon: History,
    title: "Traza completa",
    description:
      "Cada consulta queda registrada con fecha, usuario y resultado.",
  },
  {
    icon: Search,
    title: "Búsqueda histórica",
    description:
      "Recupera clasificaciones anteriores y compáralas con los criterios actuales.",
  },
  {
    icon: Shield,
    title: "Auditable",
    description:
      "Exporta reportes con respaldo legal para tus procesos de compliance.",
  },
]

export function MemorySection() {
  return (
    <section
      id="memoria"
      className="relative overflow-hidden border-b bg-muted/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <Database className="size-7 text-primary" />
            </div>
            <h2 className="max-w-lg text-heading-40">Memoria en puerto</h2>
            <p className="max-w-xl text-copy-16 text-muted-foreground">
              Todas tus clasificaciones almacenadas con su fundamento legal
              completo. Accede al historial cuando lo necesites, audita cada
              decisión y mantén la trazabilidad de principio a fin.
            </p>

            <div className="flex flex-col gap-3">
              {MEMORY_FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <feature.icon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <span className="text-heading-14">{feature.title}</span>
                    <p className="text-copy-13 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2">
              <Button variant="outline" asChild>
                <Link href="/waitlist">Conoce más</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border bg-background p-6 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <span className="text-copy-14 font-medium">
                Últimas clasificaciones
              </span>
              <Database className="size-4 text-muted-foreground" />
            </div>
            <div className="space-y-3">
              {[
                {
                  code: "8471.30.00",
                  product: "Laptop Dell Latitude",
                  date: "12 jun 2026",
                },
                {
                  code: "6204.62.00",
                  product: "Pantalones algodón",
                  date: "11 jun 2026",
                },
                {
                  code: "8542.31.00",
                  product: "Microchip Intel i7",
                  date: "10 jun 2026",
                },
                {
                  code: "3004.90.99",
                  product: "Medicamentos varios",
                  date: "09 jun 2026",
                },
              ].map((item) => (
                <div
                  key={item.code}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3 text-sm"
                >
                  <div>
                    <span className="font-mono text-xs font-medium text-primary">
                      {item.code}
                    </span>
                    <p className="text-copy-13 text-foreground">
                      {item.product}
                    </p>
                  </div>
                  <span className="shrink-0 text-copy-13 text-muted-foreground">
                    {item.date}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
