"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const NAV_ITEMS = [
  { label: "Home", href: "/#home" },
  { label: "Problema", href: "/#problema" },
  { label: "Solución", href: "/#solucion" },
  { label: "Cómo funciona", href: "/#como-funciona" },
]

export function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-heading-24 font-bold">
          VESTA
        </Link>

        <div className="hidden items-center gap-6 md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="outline" size="sm" asChild>
            <Link href="/waitlist">Lista de espera</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/classifier">Probar demo</Link>
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-3 px-4 py-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Button variant="outline" asChild className="mt-2">
              <Link href="/waitlist">Lista de espera</Link>
            </Button>
            <Button asChild>
              <Link href="/classifier">Probar demo</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
