import { AccessCodeLock } from "@/components/access-code-lock"
import { ClassifierProgressView } from "@/src/sections/classifier/view/classifier-progress-view"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ClassifierProgressPage({ params }: PageProps) {
  const { id } = await params
  return (
    <AccessCodeLock>
      <ClassifierProgressView id={id} />
    </AccessCodeLock>
  )
}
