"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

type Entry = {
  _id: string
  email: string
  company: string
  phone: string
  rol: string
  pain: string
  volume: string
  createdAt: string
}

const ROL_LABELS: Record<string, string> = {
  importador: "Importador / Empresa Comercial",
  agencia: "Agencia de Aduanas / Clasificador",
  personal: "Importador Personal / Emprendedor",
  otro: "Otro",
}

const PAIN_LABELS: Record<string, string> = {
  clasificacion: "Clasificación arancelaria",
  "landed-cost": "Landed Cost / Incoterms",
  permisos: "Permisos y multas",
  todos: "Todos los anteriores",
}

const VOLUME_LABELS: Record<string, string> = {
  bajo: "Menos de 3 emb/mes",
  medio: "3–10 emb/mes",
  alto: "Más de 10 emb/mes",
}

export function AdminTable({ data }: { data: Entry[] }) {
  const [search, setSearch] = useState("")

  const filtered = data.filter(
    (entry) =>
      entry.email.toLowerCase().includes(search.toLowerCase()) ||
      entry.company.toLowerCase().includes(search.toLowerCase()) ||
      entry.phone.includes(search)
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-sm">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar registros..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border/40">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/40 bg-muted/50">
              <th className="px-4 py-3 font-medium">Fecha</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3 font-medium">Teléfono</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Dolor</th>
              <th className="px-4 py-3 font-medium">Volumen</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No hay registros
                </td>
              </tr>
            ) : (
              filtered.map((entry) => (
                <tr
                  key={entry._id}
                  className="border-b border-border/20 last:border-0 hover:bg-muted/20"
                >
                  <td className="px-4 py-3 text-xs whitespace-nowrap text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {entry.company || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.phone}</td>
                  <td className="max-w-xs truncate px-4 py-3">
                    {ROL_LABELS[entry.rol] || entry.rol || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3">
                    {PAIN_LABELS[entry.pain] || entry.pain || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {VOLUME_LABELS[entry.volume] || entry.volume || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
