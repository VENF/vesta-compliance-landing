import { AccessCodeLock } from "@/components/access-code-lock"
import { ClassifierUploadView } from "@/src/sections/classifier/view/classifier-upload-view"

export default function ClassifierPage() {
  return (
    <AccessCodeLock>
      <ClassifierUploadView />
    </AccessCodeLock>
  )
}
