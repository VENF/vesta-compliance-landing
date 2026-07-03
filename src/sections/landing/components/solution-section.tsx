"use client"

import { motion } from "motion/react"
import { X, Check } from "lucide-react"
import { SolutionProcessingDemo } from "./solution-processing-demo"
import { StripedPattern } from "@/components/striped-pattern"

const COMPARISONS = [
  {
    before:
      "Buscar partidas manualmente en el arancel por horas en buscadores estáticos.",
    after: "Clasificación semántica e instantánea ejecutada por el agente.",
  },
  {
    before:
      "Documentación legal dispersa en correos, minutas y archivos sueltos.",
    after:
      "Ficha técnica completa y dictamen con trazabilidad exacta a la Gaceta Oficial.",
  },
  {
    before:
      "Errores y omisiones normativas que descubres cuando llega la multa al puerto.",
    after:
      "Validación preventiva y automática contra reformas o decretos vigentes.",
  },
  {
    before:
      "Sin trazabilidad ni histórico de criterios para cargas recurrentes.",
    after:
      "Historial centralizado y exportable para auditorías fiscales de tu catálogo.",
  },
  {
    before:
      "Dependencia absoluta del criterio subjetivo de terceros para cada producto.",
    after:
      "Motor autónomo bajo reglas lógicas que procesa catálogos enteros al instante.",
  },
  {
    before:
      "Tiempo total: Promedio de 3 horas por lote mediante análisis manual.",
    after:
      "Tiempo total: Menos de 5 minutos por dictamen agéntico automatizado.",
  },
]
export function SolutionSection() {
  return (
    <section
      id="solucion"
      className="relative overflow-hidden border-x-2 border-dashed border-[#DAD9DE] bg-muted/60 py-24 dark:border-muted"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col">
        <div className="flex-1" />
        <StripedPattern
          direction="right"
          className="text-[#DBDBDB] dark:text-[#2E2E2E]"
        />
      </div>
      <div className="relative z-1 mx-auto max-w-7xl bg-background p-4 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="w-full max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="mt-4 text-3xl leading-none font-bold md:text-[56px]">
                AGENTE
                <br />
                CLASIFICADOR
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
            >
              <p className="max-w-2xl text-copy-16 text-muted-foreground">
                Un agente autónomo especializado en comercio exterior que
                interpreta la descripción técnica de tus productos y los vincula
                automáticamente con su partida arancelaria exacta. Gracias a su
                motor basado en Grafos Jurídicos, navega las regulaciones e
                identifica restricciones o beneficios fiscales vigentes en
                segundos, entregando un dictamen con trazabilidad legal
                estricta.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center md:justify-end"
          >
            <SolutionProcessingDemo />
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-4 text-sm font-medium tracking-wider uppercase">
              ✗ SIN VESTA
            </div>
            <div className="p-4 text-sm font-medium tracking-wider text-primary uppercase">
              ✓ CON VESTA
            </div>
          </div>
          <div className="">
            {COMPARISONS.map((row, index) => (
              <motion.div
                key={row.before}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                className="grid md:grid-cols-2"
              >
                <div className="flex items-start gap-2 p-2">
                  <X className="mt-0.5 size-4 shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {row.before}
                  </span>
                </div>
                <div className="flex items-start gap-2 bg-primary/[0.02] p-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{row.after}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
