"use client"

import { useState } from "react"
import { CheckCircle2, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import type { ClassificationPathNode } from "@/src/modules/classifier/domain/classification.entity"

const levelLabels: Record<string, string> = {
  chapter: "Capítulo",
  heading: "Partida",
  subheading_sa: "Subpartida",
  subheading_national: "Subpartida",
  tariff_code: "Código Arancelario",
}

interface ClassificationPathProps {
  path: ClassificationPathNode[]
}

export function ClassificationPath({ path }: ClassificationPathProps) {
  const [outerOpen, setOuterOpen] = useState(false)

  const tariffNode = path.find((n) => n.level === "tariff_code")
  const intermediateNodes = path.filter((n) => n.level !== "tariff_code")

  return (
    <Collapsible
      open={outerOpen}
      onOpenChange={setOuterOpen}
      className="px-8 pt-5 pb-3"
    >
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 text-xs font-semibold tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronRight
            className={cn(
              "size-3 transition-transform duration-200",
              outerOpen && "rotate-90"
            )}
          />
          RUTA DE CLASIFICACIÓN
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent className="data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-0">
        <div className="relative mt-4">
          <div className="pointer-events-none absolute inset-y-3 left-5 w-0.5 bg-gradient-to-b from-border via-border to-primary" />

          <div className="flex flex-col">
            {intermediateNodes.map((node) => (
              <IntermediateNode key={node.code} node={node} />
            ))}

            {tariffNode && <FinalNode node={tariffNode} />}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

interface IntermediateNodeProps {
  node: ClassificationPathNode
}

function IntermediateNode({ node }: IntermediateNodeProps) {
  const [open, setOpen] = useState(false)

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group -mx-2 rounded-md px-2 transition-all duration-200 hover:bg-muted/30"
    >
      <div className="flex">
        <div className="relative w-10 shrink-0">
          <div className="absolute top-[19px] left-5 h-px w-5 bg-border" />
          <div className="absolute top-3 left-[13px] z-10 size-2.5 rounded-full border-2 border-muted-foreground/40 bg-background" />
        </div>

        <div className="flex flex-1 flex-col pt-[9px] pb-5">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-2 text-left"
            >
              <Badge variant="outline" className="shrink-0">
                {levelLabels[node.level] ?? node.level}
              </Badge>
              <span className="font-mono text-sm break-all text-muted-foreground transition-colors group-hover:text-foreground">
                {node.code}
              </span>
              <ChevronRight
                className={cn(
                  "ml-auto size-3 shrink-0 text-muted-foreground/60 transition-transform duration-200",
                  open && "rotate-90"
                )}
              />
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent className="data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-1 data-closed:animate-out data-closed:fade-out-0">
            <p className="w-full pt-3 text-xs leading-relaxed break-words text-muted-foreground/70 sm:w-[70%]">
              {node.justification}
            </p>
          </CollapsibleContent>
        </div>
      </div>
    </Collapsible>
  )
}

interface FinalNodeProps {
  node: ClassificationPathNode
}

function FinalNode({ node }: FinalNodeProps) {
  return (
    <div className="group -mx-2 rounded-md px-2 transition-all duration-200 hover:bg-muted/30">
      <div className="flex">
        <div className="relative w-10 shrink-0">
          <div className="absolute top-[19px] left-5 h-px w-5 bg-border/50" />
          <div className="absolute top-[9px] left-[10px] z-10">
            <div className="size-5 rounded-full bg-background" />
            <CheckCircle2 className="absolute inset-0 size-5 text-primary" />
          </div>
        </div>

        <div className="flex flex-1 flex-col pt-[9px] pb-5">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="shrink-0">
              {levelLabels[node.level] ?? node.level}
            </Badge>
            <span className="font-mono text-sm font-bold break-all text-primary">
              {node.code}
            </span>
          </div>

          <p className="pt-2 text-sm font-medium break-words text-foreground">
            {node.description}
          </p>
          <p className="pt-1 text-xs leading-relaxed break-words text-muted-foreground/70">
            {node.justification}
          </p>
        </div>
      </div>
    </div>
  )
}
