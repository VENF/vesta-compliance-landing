import type {
  IClassificationRepository,
  ProductData,
} from "../domain/classification.repository"

export function classificationRepository(): IClassificationRepository {
  return {
    connectSse(id: string): EventSource {
      return new EventSource(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classify/sse?id=${id}`
      )
    },
    async startJob(data: ProductData): Promise<string> {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/classify/start`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
      const json = await res.json()
      return json.id
    },
  }
}
