import type { Metadata } from "next"
import { AccessCodeLock } from "@/components/access-code-lock"
import { ClassifierUploadView } from "@/src/sections/classifier/view/classifier-upload-view"

export const metadata: Metadata = {
  title: "Clasificador Arancelario",
  description:
    "Clasifica tus productos con IA. Carga tu factura proforma y obtén la partida arancelaria con simulación de costos.",
}

export default function ClassifierPage() {
  return (
    <AccessCodeLock>
      <ClassifierUploadView />
    </AccessCodeLock>
  )
}
