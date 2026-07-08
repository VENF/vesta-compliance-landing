import { NextResponse } from "next/server"

export async function POST() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const id = `mock-${Date.now().toString(36)}`

  return NextResponse.json({ id })
}
