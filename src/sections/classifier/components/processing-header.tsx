"use client"

import Grainient from "@/components/grainient"

export function ProcessingHeader() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center px-6 md:px-0">
      <div className="absolute top-[0px] left-[0px] z-1 h-full w-full">
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

      <div className="z-2">
        <h1 className="text-center text-2xl font-bold text-white sm:text-[58px]">
          VESTA
        </h1>
        <h2 className="text-center text-sm text-balance text-white sm:text-[24px]">
          Clasificador Inteligente Aduanero
        </h2>
        <p className="mt-2 text-center text-xs text-white sm:text-sm">
          Clasificación precisa y cálculo de costos de importación en segundos
        </p>
      </div>
    </div>
  )
}
