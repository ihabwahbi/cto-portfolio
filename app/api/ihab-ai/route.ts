/**
 * Ihab AI Assistant API Route
 * Streaming endpoint for the AI chat feature
 */

import { streamText, convertToModelMessages, type UIMessage } from "ai"
import { getAIModel } from "@/lib/agent/model-factory"
import { buildSystemPrompt } from "./system-prompt"

export const runtime = "edge"
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: UIMessage[] }

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      )
    }

    const model = getAIModel()
    const systemPrompt = buildSystemPrompt()

    // Convert UI messages to model format
    const modelMessages = await convertToModelMessages(messages)

    // Stream the response
    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("Ihab AI error:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error"

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
