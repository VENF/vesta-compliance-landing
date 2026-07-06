"use client"

import { motion } from "motion/react"
import { Upload, Cpu, FileCheck } from "lucide-react"
import { ClassificationResultSection } from "@/src/sections/classifier/components/classification-result"
import { IncotermSimulationCard } from "./incoterm-simulation-card"
import { MOCK_RESULT } from "./how-it-works-mock"
import { StripedPattern } from "@/components/striped-pattern"

const STEPS = [
  {
    step: 1,
    icon: Upload,
    title: "Carga tu factura proforma",
    description:
      "Sube tu factura proforma o un archivo CSV con la descripción de tus mercancías. El agente extrae automáticamente los datos técnicos relevantes para la clasificación.",
  },
  {
    step: 2,
    icon: Cpu,
    title: "Clasifica con RGI y simula el landed cost",
    description:
      "El agente aplica las Reglas Generales Interpretativas del Sistema Armonizado, cruza las especificaciones técnicas con el Grafo Jurídico de reformas vigentes y simula el costo de importación proyectado según el Incoterm de tu operación.",
  },
  {
    step: 3,
    icon: FileCheck,
    title: "Recibe tu dictamen de auditoría preventiva",
    description:
      "Descarga un informe técnico con las partidas sugeridas de alta precisión, el impacto fiscal estimado, alertas de permisología y la trazabilidad normativa completa (Gacetas y Decretos) para respaldar la toma de decisiones de tu equipo antes de la declaración aduanera.",
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-muted/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="mt-4 max-w-xl text-3xl leading-none font-bold md:text-[48px]">
            De la factura proforma al dictamen técnico en minutos
          </h2>
          <p className="mt-4 max-w-2xl text-copy-16 text-muted-foreground">
            Carga, clasifica, simula y audita. Sin hojas de cálculo, sin
            depender de terceros, sin sorpresas en puerto.
          </p>
        </motion.div>

        <div className="relative flex flex-col gap-12 md:flex-row md:justify-center md:gap-16">
          <div className="absolute top-0 left-5 h-full w-px bg-border md:hidden" />
          <div className="absolute top-5 left-0 hidden h-px w-full bg-border md:block" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative pl-14 md:flex md:flex-col md:items-center md:pl-0 md:text-center"
            >
              <span className="absolute left-0 z-10 flex size-10 items-center justify-center rounded-full border bg-background shadow-sm md:static md:mb-4">
                <step.icon className="size-5 text-primary" />
              </span>
              <h3 className="mb-1 text-heading-16">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <div className="relative flex w-full flex-col gap-4 md:flex-row md:p-10">
            <div className="pointer-events-none absolute inset-0 z-0 hidden flex-col md:flex">
              <div className="flex-1" />
              <StripedPattern
                direction="right"
                className="text-[#DBDBDB] dark:text-[#2E2E2E]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl"
            >
              <ClassificationResultSection data={MOCK_RESULT} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-4 w-full md:w-[350px]"
            >
              <IncotermSimulationCard />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
