"use client"

import { motion } from "motion/react"
import { Upload, Cpu, FileCheck } from "lucide-react"
import { ClassificationResultSection } from "@/src/sections/classifier/components/classification-result"
import { MOCK_RESULT } from "./how-it-works-mock"
import { StripedPattern } from "@/components/striped-pattern"

const STEPS = [
  {
    step: 1,
    icon: Upload,
    title: "Sube tu archivo",
    description:
      "Carga tu factura proforma, archivo estructurado (.csv) con tu producto. El agente de IA procesa la información y extrae automáticamente los datos técnicos de cada mercancía.",
  },
  {
    step: 2,
    icon: Cpu,
    title: "Análisis y navegación agéntica",
    description:
      "El agente analiza semánticamente cada producto, determina las opciones de clasificación más probables y las valida cronológicamente contra las reformas y decretos de exoneración vigentes en el Grafo Jurídico.",
  },
  {
    step: 3,
    icon: FileCheck,
    title: "Dictamen auditable listo",
    description:
      "Obtén un dictamen de probabilidades comparativo completo con el impacto fiscal proyectado, alertas de permisología y la trazabilidad exacta para respaldar tu carga ante aduanas.",
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden border-b-2 border-dashed border-[#DAD9DE] bg-muted/30 py-24 dark:border-muted"
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
            Auditoría arancelaria en tres pasos
          </h2>
          <p className="mt-4 max-w-2xl text-copy-16 text-muted-foreground">
            Diseñado para integrarse a tu flujo de trabajo de forma simple,
            transformando la complejidad legal en una hoja de ruta clara y
            auditable en minutos.
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
          <div className="relative flex max-w-3xl justify-center p-0 md:p-10">
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col">
              <div className="flex-1" />
              <StripedPattern
                direction="right"
                className="text-[#DBDBDB] dark:text-[#2E2E2E]"
              />
            </div>
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className=""
              >
                <ClassificationResultSection data={MOCK_RESULT} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
