"use client"

import { useState } from "react"
import { useForm, type FieldError, type Resolver } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SendHorizonal } from "lucide-react"
import { StripedPattern } from "@/components/striped-pattern"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const waitlistSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  company: z.string().min(1, "Ingresa el nombre de la empresa"),
  phone: z.string().min(1, "Ingresa el número de contacto"),
  rol: z.enum(["importador", "agencia", "personal", "otro"]),
  pain: z.enum(["clasificacion", "landed-cost", "permisos", "todos"]),
  volume: z.string().optional(),
})

type WaitlistSchema = z.infer<typeof waitlistSchema>

const customResolver: Resolver<WaitlistSchema> = async (values) => {
  const result = waitlistSchema.safeParse(values)
  if (result.success) {
    return { values: result.data, errors: {} }
  }

  const errors: Partial<Record<keyof WaitlistSchema, FieldError>> = {}
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") as keyof WaitlistSchema
    if (!errors[key]) {
      errors[key] = { type: issue.code, message: issue.message }
    }
  }

  return { values: {} as Record<string, never>, errors }
}

export function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<WaitlistSchema>({
    resolver: customResolver,
    defaultValues: {
      email: "",
      company: "",
      phone: "",
      rol: undefined,
      pain: undefined,
      volume: undefined,
    },
  })

  async function onSubmit(data: WaitlistSchema) {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Error al guardar")
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
        className="relative overflow-hidden border-x-2 border-dashed border-[#DAD9DE] py-24 dark:border-muted"
      >
        <div className="relative z-1 mx-auto max-w-3xl p-4 md:p-10">
          <div className="mx-auto max-w-xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              &iexcl;Solicitud recibida!
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Gracias por tu interés en Vesta Compliance. Nos pondremos en
              contacto contigo próximamente, cuando esté disponible el acceso
              anticipado.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-x-2 border-dashed border-[#DAD9DE] bg-muted/60 py-24 dark:border-muted"
    >
      <div className="pointer-events-none absolute inset-0 z-0 flex flex-col">
        <div className="flex-1" />
        <StripedPattern
          direction="right"
          className="text-[#DBDBDB] dark:text-[#2E2E2E]"
        />
      </div>
      <div className="relative z-1 mx-auto max-w-3xl bg-background p-4 md:p-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            &Uacute;nete a la lista de espera
          </h2>
          <p className="text-lg text-muted-foreground">
            S&eacute; de los primeros en acceder a Vesta Compliance cuando
            lancemos. D&eacute;janos tus datos y te notificaremos.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electr&oacute;nico*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="correo@ejemplo.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de la empresa*</FormLabel>
                      <FormControl>
                        <Input placeholder="Nombre de la empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>N&uacute;mero de contacto*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+58 414 123 4567"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="volume"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Volumen de operaciones estimado (Opcional)
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Seleccionar..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bajo">
                            Traigo menos de 3 embarques/paquetes al mes
                          </SelectItem>
                          <SelectItem value="medio">
                            Entre 3 y 10 embarques al mes
                          </SelectItem>
                          <SelectItem value="alto">
                            M&aacute;s de 10 embarques al mes
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <FormField
                control={form.control}
                name="rol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      &iquest;Cu&aacute;l es tu rol principal en el comercio
                      exterior?*
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem
                            value="importador"
                            id="rol-importador"
                          />
                          <Label
                            htmlFor="rol-importador"
                            className="text-sm font-normal"
                          >
                            Importador / Empresa Comercial
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem value="agencia" id="rol-agencia" />
                          <Label
                            htmlFor="rol-agencia"
                            className="text-sm font-normal"
                          >
                            Agencia de Aduanas / Clasificador
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem value="personal" id="rol-personal" />
                          <Label
                            htmlFor="rol-personal"
                            className="text-sm font-normal"
                          >
                            Importador Personal / Emprendedor (Courier)
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem value="otro" id="rol-otro" />
                          <Label
                            htmlFor="rol-otro"
                            className="text-sm font-normal"
                          >
                            Otro
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-2" />

              <FormField
                control={form.control}
                name="pain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      &iquest;Cu&aacute;l es tu principal dolor de cabeza
                      actual?*
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value ?? ""}
                        className="flex flex-col gap-3"
                      >
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem
                            value="clasificacion"
                            id="pain-clasificacion"
                          />
                          <Label
                            htmlFor="pain-clasificacion"
                            className="text-sm font-normal"
                          >
                            Errores y lentitud al clasificar partidas
                            arancelarias
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem
                            value="landed-cost"
                            id="pain-landed-cost"
                          />
                          <Label
                            htmlFor="pain-landed-cost"
                            className="text-sm font-normal"
                          >
                            Incertidumbre con los costos finales (Landed Cost) e
                            Incoterms
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem value="permisos" id="pain-permisos" />
                          <Label
                            htmlFor="pain-permisos"
                            className="text-sm font-normal"
                          >
                            Sorpresas con permisos (CONATEL, SENCAMER, etc.) y
                            multas en aduana
                          </Label>
                        </div>
                        <div className="flex items-center gap-2 py-1.5">
                          <RadioGroupItem value="todos" id="pain-todos" />
                          <Label
                            htmlFor="pain-todos"
                            className="text-sm font-normal"
                          >
                            Todos los anteriores
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <p className="text-sm text-destructive">{error}</p>}

              <Button
                type="submit"
                size="lg"
                className="mt-2 w-full gap-2 md:w-auto"
                disabled={loading}
              >
                <SendHorizonal className="size-4" />
                {loading ? "Enviando..." : "Solicitar Acceso Anticipado"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}
