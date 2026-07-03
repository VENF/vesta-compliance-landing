"use client"

import Grainient from "@/components/grainient"

export function Footer() {
  return (
    <div className="relative flex h-full flex-col items-center justify-end px-6 pb-4 text-center text-copy-13 text-muted-foreground md:px-0">
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
      <div className="z-2 text-white">
        <p>
          © {new Date().getFullYear()} VESTA. Todos los derechos reservados.
        </p>
        <p>Clasificador Arancelario Automatizado</p>
      </div>
    </div>
  )
}
