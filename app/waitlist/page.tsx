import type { Metadata } from "next"
import { LandingNav } from "@/src/sections/landing/components/landing-nav"
import { WaitlistForm } from "@/src/sections/landing/components/wailist-form"

export const metadata: Metadata = {
  title: "Lista de Espera",
  description:
    "Sé de los primeros en acceder a Vesta Compliance. Únete a la lista de espera para acceso anticipado.",
}

export default function WaitlistPage() {
  return (
    <>
      <LandingNav />
      <main className="pt-16">
        <WaitlistForm />
      </main>
    </>
  )
}
