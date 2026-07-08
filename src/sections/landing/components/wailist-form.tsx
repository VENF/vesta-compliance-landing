"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizonal } from "lucide-react"

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          company: form.get("company"),
          description: form.get("description"),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al guardar")
      }

      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section
        id="waitlist"
        className="border-b border-border/40 py-20 md:py-28"
      >
        <div className="mx-auto max-w-xl px-6 text-center">
          <div className="mb-6 flex justify-center">
            <Image
              src="/illustrations/newsletter_vovu.svg"
              alt="Solicitud recibida"
              width={350}
              height={350}
              className="h-auto w-full max-w-sm"
              unoptimized
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            &iexcl;Solicitud recibida!
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Gracias por tu inter&eacute;s en Vesta Compliance. Te contactaremos
            pr&oacute;ximamente cuando abramos el acceso anticipado.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="waitlist"
      className="border-b border-border/40 bg-muted/30 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid px-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              &Uacute;nete a la lista de espera
            </h2>
            <p className="text-lg text-muted-foreground">
              S&eacute; de los primeros en acceder a Vesta Compliance cuando
              lancemos. D&eacute;janos tus datos y te notificaremos.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Nombre completo*
                </label>
                <Input id="name" name="name" placeholder="Tu nombre" required />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Raz&oacute;n Social de la Empresa
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Nombre de tu empresa"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Correo electr&oacute;nico*
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium"
                >
                  N&uacute;mero de contacto*
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+58 414 123 4567"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="mb-1.5 block text-sm font-medium"
                >
                  Breve descripci&oacute;n de tu necesidad*
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Cu&eacute;ntanos qu&eacute; productos importas y qu&eacute; desaf&iacute;os enfrentas con la clasificaci&oacute;n arancelaria..."
                  rows={3}
                  required
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                type="submit"
                size="lg"
                className="mt-2"
                disabled={loading}
              >
                <SendHorizonal />
                {loading ? "Enviando..." : "Solicitar Acceso Anticipado"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
