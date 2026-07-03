export interface ProductData {
  producto: {
    descripcion_comercial: string
    uso_previsto: string
  }
}

export interface IClassificationRepository {
  connectSse(id: string): EventSource
  startJob(data: ProductData): Promise<string>
}
