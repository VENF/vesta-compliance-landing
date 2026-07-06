"use client"

import { cn } from "@/lib/utils"
import { EyeOff, Fingerprint, Link2Off, ShieldAlert } from "lucide-react"
import { motion } from "motion/react"

const PAIN_POINTS = [
  {
    number: 1,
    title: "Clasificación vulnerable al error manual",
    bullets: [
      "Horas perdidas cruzando fichas técnicas y descripciones ambiguas contra el arancel de forma manual.",
      "Dependencia total del criterio de terceros, arriesgando la predictibilidad financiera y los márgenes.",
    ],
    icon: <Fingerprint className="my-4" />,
  },
  {
    number: 2,
    title: "Contingencias financieras y operativas",
    bullets: [
      "Riesgo crítico de multas severas calculadas directamente sobre el valor real de tu carga.",
      "Costos imprevistos por retrasos diarios, sobreestadía en puertos o comiso por omisión de permisos.",
    ],
    icon: <ShieldAlert className="my-4" />,
  },
  {
    number: 3,
    title: "Volatilidad regulatoria y puntos ciegos",
    bullets: [
      "Reformas parciales y decretos de exoneración temporales que modifican aranceles constantemente.",
      "Herramientas estáticas que aíslan la información legal, provocando que te enteres de los cambios cuando ya es tarde.",
      "Incoterms mal aplicados: el término de compra distorsiona la base imponible y genera pagos en exceso o riesgos de subvaluación.",
    ],
    icon: <EyeOff className="my-4" />,
  },
  {
    number: 4,
    title: "Desconexión y pérdida de trazabilidad",
    bullets: [
      "Clasificaciones aprobadas que quedan dispersas en correos o PDFs sueltos sin integrarse a tus sistemas.",
      "Duplicación de esfuerzos y falta de un histórico auditable ante la importación de productos recurrentes.",
    ],
    icon: <Link2Off className="my-4" />,
  },
]
export function ProblemSection() {
  return (
    <section id="problema" className="relative overflow-hidden py-12 md:py-24">
      <div className="max-w-7xl px-4 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-3xl md:mb-16"
        >
          <h2 className="mb-6 text-3xl leading-none font-bold md:text-[48px]">
            El costo de la incertidumbre regulatoria en el comercio exterior.
          </h2>
          <p className="text-sm text-muted-foreground md:text-copy-16">
            Cada fracción arancelaria que eliges —o que eliges mal— define el
            futuro financiero de tu operación. Sobrecostos fiscales, multas,
            decomisos y litigios nacen de una decisión que hoy depende de hojas
            de cálculo, criterio disperso y memorandos sin actualizar
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((point, index) => {
            const isLast = index === PAIN_POINTS.length - 1
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "group relative overflow-hidden bg-background transition-all hover:bg-muted",
                  "border-b-2 border-dashed border-[#DAD9DE] md:border-b-0 dark:border-muted",
                  "md:border-r-2 md:border-dashed md:border-[#DAD9DE] lg:border-r-2 lg:border-dashed lg:border-[#DAD9DE] dark:md:border-muted dark:lg:border-muted",
                  isLast && "border-b-0 md:border-r-0 lg:border-r-0"
                )}
              >
                <div className="p-4 md:p-6">
                  {point.icon}
                  <h3 className={cn("my-4 text-[18px] font-medium")}>
                    {point.title}
                  </h3>
                  <ul className="text-muted-foreground">
                    {point.bullets.map((bullet) => (
                      <li key={bullet} className="my-1 text-xs md:text-sm">
                        <span className={cn("")} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
