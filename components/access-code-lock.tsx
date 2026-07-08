"use client"

import { useState, useSyncExternalStore, type ReactNode } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StripedPattern } from "@/components/striped-pattern"
import Grainient from "@/components/grainient"

const STORAGE_KEY = "vesta_access_code_verified"

interface AccessCodeLockProps {
  children: ReactNode
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true"
  } catch {
    return false
  }
}

function getServerSnapshot() {
  return false
}

function subscribe() {
  return () => {}
}

export function AccessCodeLock({ children }: AccessCodeLockProps) {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [unlocked, setUnlocked] = useState(stored)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (stored && !unlocked) {
    setUnlocked(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/access-codes/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })

      const data = await res.json()

      if (data.valid) {
        sessionStorage.setItem(STORAGE_KEY, "true")
        setUnlocked(true)
      } else {
        setError(data.error || "Código inválido")
      }
    } catch {
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  if (unlocked) {
    return children
  }

  return (
    <div className="relative min-h-dvh">
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col">
        <div className="flex-1" />
        <StripedPattern
          direction="right"
          className="text-[#EDEDEF] dark:text-muted"
        />
      </div>

      <div className="relative z-1 grid min-h-[100vh] grid-cols-1 md:grid-cols-3 md:gap-0">
        <div className="hidden border-r-2 border-dashed border-[#DAD9DE] md:col-start-1 md:row-start-1 md:flex dark:border-muted" />

        <div className="col-start-1 row-start-1 flex min-h-[200px] items-center justify-center p-0 md:col-start-2 md:row-start-1 md:p-0">
          <div className="relative flex h-full w-full flex-col items-center justify-center px-6 md:px-0">
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
            </div>
          </div>
        </div>

        <div className="hidden border-y-2 border-r-2 border-dashed border-[#DAD9DE] md:col-start-1 md:row-start-2 md:flex md:items-center md:justify-center dark:border-muted" />

        <div className="relative col-start-1 row-start-2 flex min-h-[400px] items-center justify-center border-y-2 border-dashed border-[#DAD9DE] p-4 md:col-start-2 md:row-start-2 md:p-4 dark:border-muted">
          <div className="flex w-full max-w-sm flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Versión Alfa — Acceso restringido
              </p>
              <p className="mt-1 text-xs text-muted-foreground/60">
                Ingresá tu código de acceso para continuar
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-3"
            >
              <Input
                type="text"
                placeholder="Código de acceso"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={loading}
                autoFocus
                className="text-center"
              />

              {error && (
                <p className="text-center text-xs text-destructive">{error}</p>
              )}

              <Button type="submit" disabled={loading || !code.trim()}>
                {loading ? "Verificando..." : "Ingresar"}
              </Button>
            </form>
          </div>
        </div>

        <div className="hidden border-y-2 border-l-2 border-dashed border-[#DAD9DE] md:col-start-3 md:row-start-2 md:flex md:items-center md:justify-center dark:border-muted" />

        <div className="hidden border-r-2 border-dashed border-[#DAD9DE] md:col-start-1 md:row-start-3 md:flex dark:border-muted" />
        <div className="col-start-1 row-start-3 min-h-[100px] p-0 md:col-start-2 md:row-start-3 md:p-0" />
        <div className="hidden items-center justify-center border-l-2 border-dashed border-[#DAD9DE] md:col-start-3 md:row-start-3 md:flex dark:border-muted" />
      </div>
    </div>
  )
}
