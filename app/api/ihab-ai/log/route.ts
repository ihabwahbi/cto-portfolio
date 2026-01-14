/**
 * AI Chat Logging API Route
 * Logs AI conversations to the database for analytics
 */

import { NextRequest, NextResponse } from "next/server"
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

interface LogRequest {
  sessionId?: string
  conversationId: string
  userMessage: string
  aiResponse?: string
  country?: string
  city?: string
  referrer?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LogRequest = await request.json()
    const { sessionId, conversationId, userMessage, aiResponse, country, city, referrer } = body

    if (!userMessage || !conversationId) {
      return NextResponse.json(
        { error: "userMessage and conversationId are required" },
        { status: 400 }
      )
    }

    // Get IP and user agent from headers
    const forwardedFor = request.headers.get("x-forwarded-for")
    const ipAddress = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown"
    const userAgent = request.headers.get("user-agent") || "unknown"

    // Insert into database
    const result = await pool.query(
      `INSERT INTO cto_resume.ai_chat_logs
       (session_id, conversation_id, user_message, ai_response, country, city, ip_address, user_agent, referrer)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, created_at`,
      [
        sessionId || null,
        conversationId,
        userMessage,
        aiResponse || null,
        country || null,
        city || null,
        ipAddress,
        userAgent,
        referrer || null,
      ]
    )

    return NextResponse.json(
      {
        success: true,
        id: result.rows[0].id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("AI chat log error:", error)
    return NextResponse.json(
      { error: "Failed to log chat" },
      { status: 500 }
    )
  }
}
