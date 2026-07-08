"use client"

import { useState } from "react"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"

type Entry = {
  _id: string
  name: string
  email: string
  phone: string
  company: string
  description: string
  createdAt: string
}

export function AdminTable({ data }: { data: Entry[] }) {
  const [search, setSearch] = useState("")

  const filtered = data.filter(
    (entry) =>
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
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
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Teléfono</th>
              <th className="px-4 py-3 font-medium">Empresa</th>
              <th className="px-4 py-3 font-medium">Descripción</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
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
                  <td className="px-4 py-3 font-medium whitespace-nowrap">
                    {entry.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{entry.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {entry.company || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3">
                    {entry.description}
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
