import { getCollection } from "@/src/lib/db"
import { AdminTable } from "./admin-table"

export const dynamic = "force-dynamic"

export default async function AdminDashboard() {
  const collection = await getCollection("waitlist")
  const entries = await collection.find({}).sort({ createdAt: -1 }).toArray()

  const data = entries.map((entry) => ({
    _id: entry._id.toString(),
    name: entry.name,
    email: entry.email,
    phone: entry.phone,
    company: entry.company || "",
    description: entry.description,
    createdAt: entry.createdAt?.toISOString() || "",
  }))

  return (
    <div className="min-h-dvh bg-muted/30">
      <header className="border-b border-border/40 bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="text-lg font-semibold">
            Admin <span className="text-primary">Vesta</span> Compliance
          </h1>
          <span className="text-sm text-muted-foreground">
            {data.length} registro{data.length !== 1 ? "s" : ""}
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">
        <AdminTable data={data} />
      </main>
    </div>
  )
}
