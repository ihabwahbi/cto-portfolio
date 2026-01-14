/**
 * AI Chat Logging API Route
 * Logs AI conversations to the database for analytics
 * Includes IP-based geolocation lookup
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
  referrer?: string
}

interface GeoData {
  country: string | null
  city: string | null
}

// Lookup geolocation from IP address
async function getGeoFromIP(ip: string): Promise<GeoData> {
  // Skip lookup for localhost/private IPs
  if (ip === "unknown" || ip.startsWith("127.") || ip.startsWith("10.") ||
      ip.startsWith("192.168.") || ip.startsWith("::1")) {
    return { country: null, city: null }
  }

  try {
    // Using ip-api.com (free for non-commercial, 45 requests/min)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`, {
      signal: AbortSignal.timeout(2000), // 2 second timeout
    })

    if (response.ok) {
      const data = await response.json()
      return {
        country: data.country || null,
        city: data.city || null,
      }
    }
  } catch (error) {
    console.error("Geo lookup failed:", error)
  }

  return { country: null, city: null }
}

export async function POST(request: NextRequest) {
  try {
    const body: LogRequest = await request.json()
    const { sessionId, conversationId, userMessage, aiResponse, referrer } = body

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

    // Lookup geolocation from IP
    const { country, city } = await getGeoFromIP(ipAddress)

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
        country,
        city,
        ipAddress,
        userAgent,
        referrer || null,
      ]
    )

    return NextResponse.json(
      {
        success: true,
        id: result.rows[0].id,
        geo: { country, city },
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
