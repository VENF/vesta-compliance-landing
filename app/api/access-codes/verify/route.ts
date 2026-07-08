import { getCollection } from "@/src/lib/db"

export async function POST(request: Request) {
  try {
    const { code } = await request.json()

    if (!code || typeof code !== "string") {
      return Response.json(
        { valid: false, error: "Código requerido" },
        { status: 400 }
      )
    }

    const collection = await getCollection("access_codes")
    const doc = await collection.findOne({ code: code.trim(), active: true })

    if (!doc) {
      return Response.json(
        { valid: false, error: "Código inválido" },
        { status: 401 }
      )
    }

    const now = new Date()
    const expiresAt = new Date(doc.expiresAt as string)

    if (now > expiresAt) {
      return Response.json(
        { valid: false, error: "El código ha expirado" },
        { status: 401 }
      )
    }

    return Response.json({ valid: true })
  } catch (error) {
    console.error("Error verificando access code:", error)
    return Response.json(
      { valid: false, error: "Error interno" },
      { status: 500 }
    )
  }
}
