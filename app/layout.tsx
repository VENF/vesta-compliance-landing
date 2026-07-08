import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: {
    default: "Vesta Compliance | Clasificación Arancelaria con IA",
    template: "%s | Vesta Compliance",
  },
  description:
    "Clasifica, simula y audita tu importación en minutos. Motor de clasificación arancelaria con IA para comercio exterior.",
  openGraph: {
    title: "Vesta Compliance",
    description:
      "Clasifica, simula y audita tu importación en minutos. Motor de clasificación arancelaria con IA.",
    locale: "es_ES",
    type: "website",
  },
  robots: { index: true, follow: true },
}

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        fontSans.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
