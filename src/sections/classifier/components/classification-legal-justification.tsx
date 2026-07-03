"use client"

interface ClassificationLegalJustificationProps {
  justification: string
}

export function ClassificationLegalJustification({
  justification,
}: ClassificationLegalJustificationProps) {
  return (
    <div className="px-8 pt-5 pb-3">
      <p className="mb-3 text-xs font-semibold tracking-[0.1em] text-muted-foreground">
        FUNDAMENTACIÓN JURÍDICA
      </p>
      <p className="text-sm leading-relaxed break-words text-foreground">
        {justification}
      </p>
    </div>
  )
}
