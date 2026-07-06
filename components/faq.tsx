import { FileSearch, Cpu, ScrollText, Shield, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question:
      "¿El dictamen emitido por VESTA tiene validez legal ante las autoridades aduaneras?",
    answer:
      "No. El dictamen de VESTA es un informe de auditoría preventiva y análisis técnico para uso interno de tu empresa. El único documento vinculante es el emitido por la autoridad aduanera oficial. VESTA te provee los argumentos, gacetas y traza lógica para que respaldes con solidez tu declaración.",
    icon: FileSearch,
  },
  {
    question:
      '¿Cómo mitiga VESTA el riesgo de "alucinación" o errores en las leyes y aranceles?',
    answer:
      "A diferencia de las IA tradicionales que generan texto libre, VESTA opera bajo una arquitectura de Grafos Jurídicos. Esto significa que el sistema cruza los datos estrictamente contra una base de conocimiento estructurada y determinista basada en el Arancel Matriz y las Gacetas Oficiales vigentes.",
    icon: Cpu,
  },
  {
    question:
      "¿Cómo maneja la plataforma las reformas de ley y decretos de exoneración temporales?",
    answer:
      "Nuestro motor normativo se actualiza de forma constante a medida que se publican nuevos decretos y reformas parciales en el ecosistema hiper-local. El agente valida tus productos contra el estado legal exacto del día de la consulta.",
    icon: ScrollText,
  },
  {
    question:
      "¿Qué datos de mi factura proforma procesa la IA y qué tan seguros están mis datos comerciales?",
    answer:
      "El agente extrae únicamente las descripciones técnicas, cantidades y valores de mercancía para calcular la base imponible según el Incoterm. Toda la información es encriptada bajo estándares corporativos y nunca es utilizada para entrenar modelos públicos.",
    icon: Shield,
  },
  {
    question:
      "¿Sustituye VESTA el trabajo del clasificador o de mi agencia de aduanas actual?",
    answer:
      "No, lo potencia. Para las agencias de aduana, VESTA es un copiloto de ingeniería legal que multiplica su capacidad operativa, permitiendo procesar lotes de facturas en minutos. Para el importador, es una herramienta de control financiero preventivo.",
    icon: Users,
  },
]

const FAQ = () => {
  return (
    <section className="relative overflow-hidden border-b-2 border-dashed border-[#DAD9DE] py-12 md:py-24 dark:border-muted">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl leading-none font-bold text-balance md:text-[48px]">
          Preguntas Frecuentes
        </h2>

        <div className="mx-auto mt-8 max-w-2xl">
          <Accordion collapsible defaultValue={faqs[0].question} type="single">
            {faqs.map((faq, index) => (
              <AccordionItem
                className="border bg-muted/35 not-last:border-b-0 last:border-b"
                key={`${faq.question}-${index}`}
                value={faq.question}
              >
                <AccordionTrigger className="rounded-none px-5 py-0 ps-0 text-base data-[state=open]:border-b">
                  <div className="flex gap-2 divide-x">
                    <div
                      className={cn(
                        "flex items-center justify-center bg-muted/40 bg-size-[10px_10px] bg-fixed px-4",
                        {
                          "bg-[repeating-linear-gradient(315deg,color-mix(in_srgb,var(--border)_30%,transparent)_0,color-mix(in_srgb,var(--border)_30%,transparent)_1px,transparent_0,transparent_50%)]":
                            index % 2 === 0,
                          "bg-[repeating-linear-gradient(45deg,color-mix(in_srgb,var(--border)_30%,transparent)_0,color-mix(in_srgb,var(--border)_30%,transparent)_1px,transparent_0,transparent_50%)]":
                            index % 2 !== 0,
                        }
                      )}
                    >
                      <faq.icon className="size-5 fill-foreground/7" />
                    </div>
                    <span className="py-3.5 pl-2.5">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="relative bg-background px-5 py-5 pl-18 text-base text-foreground/75">
                  {faq.answer}
                  <div className="absolute inset-y-0 left-13 border-s border-dashed border-foreground/10" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

export default FAQ
