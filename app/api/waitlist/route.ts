import { getCollection } from "@/src/lib/db"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, description } = body

    if (!name || !email || !phone || !description) {
      return Response.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    const collection = await getCollection("waitlist")

    await collection.insertOne({
      name,
      email,
      phone,
      company: company || "",
      description,
      createdAt: new Date(),
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error saving to waitlist:", error)
    return Response.json(
      { error: "Error al guardar el registro" },
      { status: 500 }
    )
  }
}
