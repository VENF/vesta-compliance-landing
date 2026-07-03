"use client"

import { motion } from "motion/react"
import {
  FileUp,
  Search,
  FileText,
  BarChart3,
  History,
  ShieldCheck,
} from "lucide-react"

const FEATURES = [
  {
    icon: FileUp,
    title: "Carga masiva por CSV",
    description:
      "Sube cientos de productos en un solo archivo. VESTA procesa cada uno automáticamente.",
  },
  {
    icon: Search,
    title: "Clasificación inteligente",
    description:
      "Motor de IA que analiza descripción, composición y uso para determinar la partida exacta.",
  },
  {
    icon: FileText,
    title: "Ficha técnica automatizada",
    description:
      "Genera documentos completos con fundamento legal, justificación y sustento normativo.",
  },
  {
    icon: BarChart3,
    title: "Dashboard de resultados",
    description:
      "Visualiza métricas, errores y aciertos de cada lote procesado en tiempo real.",
  },
  {
    icon: History,
    title: "Historial y trazabilidad",
    description:
      "Cada clasificación queda registrada con su fundamento legal para auditorías futuras.",
  },
  {
    icon: ShieldCheck,
    title: "Validación normativa",
    description:
      "Cruce automático contra el SAC vigente, resoluciones y criterios de la autoridad aduanera.",
  },
]

export function FeaturesSection() {
  return (
    <section
      id="funcionalidades"
      className="relative overflow-hidden border-b bg-muted/30 py-24"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <h2 className="mb-4 text-heading-40">
            Todo lo que necesitas para clasificar sin riesgos
          </h2>
          <p className="max-w-2xl text-copy-16 text-muted-foreground">
            Desde la carga del archivo hasta la ficha técnica final, VESTA
            automatiza cada paso del proceso de clasificación arancelaria.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-xl border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="size-5 text-primary" />
              </div>
              <h3 className="mb-2 text-heading-16">{feature.title}</h3>
              <p className="text-copy-14 text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
