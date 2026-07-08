export interface ProductData {
  producto: {
    descripcion_comercial: string
    uso_previsto: string
  }
  valores: {
    valorTotal: number
    cantidad: number
  }
  incoterm: {
    code: string
    name: string
    freight: number
    insurance: number
  }
}

export interface IClassificationRepository {
  connectSse(id: string): EventSource
  startJob(data: ProductData): Promise<string>
}
