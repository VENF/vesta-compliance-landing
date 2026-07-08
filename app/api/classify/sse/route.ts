import { MOCK_RESULT } from "@/src/sections/landing/components/how-it-works-mock"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function encode(event: string, data: unknown): Uint8Array {
  const text = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`
  return new TextEncoder().encode(text)
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const _id = searchParams.get("id")

  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(
          encode("step", { stepId: "processing", status: "running" })
        )
        await delay(5000)
        controller.enqueue(
          encode("step", { stepId: "processing", status: "ok" })
        )
        controller.enqueue(encode("progress", { percent: 12, eta: "~35s" }))

        controller.enqueue(
          encode("step", { stepId: "technical_sheet", status: "running" })
        )
        await delay(8000)
        controller.enqueue(
          encode("step", { stepId: "technical_sheet", status: "ok" })
        )
        controller.enqueue(encode("progress", { percent: 32, eta: "~28s" }))

        controller.enqueue(
          encode("step", { stepId: "scanning", status: "running" })
        )
        await delay(4000)
        controller.enqueue(encode("step", { stepId: "scanning", status: "ok" }))
        controller.enqueue(encode("progress", { percent: 42, eta: "~23s" }))

        controller.enqueue(
          encode("step", { stepId: "analyzing", status: "running" })
        )
        await delay(10000)
        controller.enqueue(
          encode("step", { stepId: "analyzing", status: "ok" })
        )
        controller.enqueue(encode("progress", { percent: 67, eta: "~13s" }))

        controller.enqueue(
          encode("step", { stepId: "landed_cost", status: "running" })
        )
        await delay(6000)
        controller.enqueue(
          encode("step", { stepId: "landed_cost", status: "ok" })
        )
        controller.enqueue(encode("progress", { percent: 82, eta: "~7s" }))

        controller.enqueue(
          encode("step", { stepId: "legal", status: "running" })
        )
        await delay(7000)
        controller.enqueue(encode("step", { stepId: "legal", status: "ok" }))
        controller.enqueue(
          encode("progress", { percent: 100, eta: "Completado" })
        )

        controller.enqueue(encode("complete", MOCK_RESULT))
      } finally {
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
