"use client"

import Link from "next/link"
import { Mail, ChevronUp } from "lucide-react"

const FOOTER_LINKS = {
  Producto: [
    { label: "Clasificador", href: "/classifier" },
    { label: "API", href: "#" },
  ],
  Compañía: [
    { label: "Blog", href: "#" },
    { label: "Contacto", href: "#" },
    { label: "Términos", href: "#" },
    { label: "Privacidad", href: "#" },
  ],
}

export function FooterSection() {
  return (
    <footer className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="text-heading-24 font-bold">VESTA</span>
            <p className="max-w-xs text-copy-14 text-muted-foreground">
              Ingeniería legal y financiera para el comercio exterior.
              Clasifica, simula y audita tu importación en segundos.
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="flex size-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="flex size-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="flex size-8 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Mail className="size-4" />
              </Link>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="flex flex-col gap-3">
              <span className="text-heading-14 font-medium">{category}</span>
              <div className="flex flex-col gap-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-copy-14 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <span className="text-heading-14 font-medium">Contacto</span>
            <div className="flex flex-col gap-2">
              <Link
                href="/waitlist"
                className="text-copy-14 text-muted-foreground transition-colors hover:text-foreground"
              >
                Programa una demo
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="mt-2 flex items-center gap-1 text-copy-13 text-muted-foreground transition-colors hover:text-foreground"
              >
                <ChevronUp className="size-3" />
                Volver arriba
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <p className="text-copy-13 text-muted-foreground">
            &copy; {new Date().getFullYear()} VESTA. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-copy-13 text-muted-foreground transition-colors hover:text-foreground"
            >
              Términos
            </Link>
            <Link
              href="#"
              className="text-copy-13 text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
