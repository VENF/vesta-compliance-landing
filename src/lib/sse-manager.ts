const connections = new Map<string, EventSource>()

export function getOrCreateSse(
  id: string,
  factory: () => EventSource
): EventSource {
  const existing = connections.get(id)
  if (existing && existing.readyState !== EventSource.CLOSED) return existing
  const es = factory()
  connections.set(id, es)
  return es
}

export function closeSse(id: string) {
  const es = connections.get(id)
  if (!es) return
  es.close()
  connections.delete(id)
}

export function closeAllSse() {
  for (const [id, es] of connections) {
    es.close()
    connections.delete(id)
  }
}
