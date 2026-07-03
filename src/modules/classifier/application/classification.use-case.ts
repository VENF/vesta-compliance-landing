import type {
  IClassificationRepository,
  ProductData,
} from "../domain/classification.repository"
import type { Result } from "@/src/lib/result"

export interface ClassificationUseCase {
  connectSse(id: string): Result<EventSource>
  startJob(data: ProductData): Promise<string>
}

export function createClassificationUseCase(
  repository: IClassificationRepository
): ClassificationUseCase {
  return {
    connectSse(id: string): Result<EventSource> {
      return { ok: true, data: repository.connectSse(id) }
    },
    async startJob(data: ProductData): Promise<string> {
      return repository.startJob(data)
    },
  }
}
