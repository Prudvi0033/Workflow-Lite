import { NextResponse } from "next/server"
import { gemini } from "@/app/lib/ai"
import { connectDb } from "@/app/lib/db"
import mongoose from "mongoose"

export async function GET() {
  const status = {
    backend: "healthy",
    database: "unknown",
    llm: "unknown",
    timestamp: new Date().toISOString(),
  }

  try {
    await connectDb()

    if (!mongoose.connection.db) {
      throw new Error("DB not initialized")
    }

    await mongoose.connection.db.admin().ping()

    status.database = "healthy"
  } catch (error) {
    console.error("Database health check failed:", error)
    status.database = "unhealthy"
  }

  try {
    const llmResponse = await gemini("ping")

    if (llmResponse !== "PONG") {
      throw new Error("Unexpected LLM response")
    }

    status.llm = "healthy"
  } catch (error) {
    console.error("LLM health check failed:", error)
    status.llm = "unhealthy"
  }

  const isHealthy =
    status.database === "healthy" &&
    status.llm === "healthy"

  return NextResponse.json(status, {
    status: isHealthy ? 200 : 500,
  })
}
