"use client"

import Grainient from "@/components/grainient"
import { motion } from "motion/react"

const METRICS = [
  {
    value: ">95%",
    label: "Precisión Predictiva",
    description: "Sugerida",
  },
  {
    value: "<3 min",
    label: "Por factura",
    description: "Tiempo de procesamiento y dictamen",
  },
  {
    value: "+10,000",
    label: "Códigos",
    description: "Arancelarios Mapeados",
  },
  {
    value: "11",
    label: "Incoterms",
    description: "Soportados y Simulados",
  },
]

export function MetricsSection() {
  return (
    <section className="relative py-10 md:py-15">
      <div className="absolute top-[0px] left-[0px] z-0 h-full w-full">
        <Grainient
          color1="#41A9A4"
          color2="#462EDC"
          color3="#a455ef"
          timeSpeed={0.45}
          colorBalance={-0.14}
          warpStrength={1.15}
          warpFrequency={4.3}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={-8}
          blendSoftness={0.05}
          rotationAmount={430}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={0.2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <div className="relative z-1 mx-auto max-w-7xl px-4 text-white">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-2xl font-bold tracking-tight tabular-nums sm:text-[34px]">
                {metric.value}
              </span>
              <div className="my-3 h-px w-12 border-2 border-dashed border-black" />
              <span className="mb-1 text-heading-14">{metric.label}</span>
              <p className="max-w-40 text-sm text-[#D7D7D7]">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
