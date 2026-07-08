import { createToken } from "@/src/lib/auth"
import { getCollection } from "@/src/lib/db"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: "Faltan credenciales" }, { status: 400 })
    }

    const collection = await getCollection("admins")
    const admin = await collection.findOne({ email })

    if (!admin || admin.password !== password) {
      return Response.json({ error: "Credenciales inválidas" }, { status: 401 })
    }

    const token = await createToken(email)

    return Response.json({ token })
  } catch (error) {
    console.error("Error en login:", error)
    return Response.json({ error: "Error interno" }, { status: 500 })
  }
}
