"use client"

import { Button } from "@/components/ui/button"

export function ClassificationDownload() {
  return (
    <div className="flex items-center justify-between px-8 py-4">
      <span className="text-heading-16 font-bold text-foreground">VESTA</span>
      <Button variant="outline" className="cursor-pointer" onClick={() => {}}>
        Descargar PDF
      </Button>
    </div>
  )
}
