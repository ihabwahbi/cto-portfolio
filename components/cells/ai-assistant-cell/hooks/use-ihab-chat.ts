/**
 * Custom hook for Ihab's AI Chat
 * Wraps the AI SDK useChat hook with additional functionality
 * Includes logging to database and analytics
 */

"use client"

import { useChat, type UIMessage } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useCallback, useMemo, useRef, useEffect } from "react"
import { useAnalytics } from "@/components/providers"
import type { UseChatReturn } from "../types"

interface UseIhabChatOptions {
  /** Callback when a message is sent */
  onMessageSent?: () => void
}

// Generate a unique conversation ID
function generateConversationId(): string {
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Log chat to database
async function logChatToDatabase(data: {
  sessionId?: string | null
  conversationId: string
  userMessage: string
  aiResponse?: string
  referrer?: string
}) {
  try {
    await fetch("/api/ihab-ai/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error("Failed to log chat:", error)
  }
}

// Generate a fallback session ID if App Insights hasn't initialized
function getOrCreateSessionId(): string {
  const STORAGE_KEY = "ihab_chat_session_id"
  if (typeof window === "undefined") return ""

  let sessionId = sessionStorage.getItem(STORAGE_KEY)
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    sessionStorage.setItem(STORAGE_KEY, sessionId)
  }
  return sessionId
}

export function useIhabChat(options: UseIhabChatOptions = {}): UseChatReturn {
  const { onMessageSent } = options
  const { trackAIChatMessage, getSessionContext, trackEvent } = useAnalytics()

  // Store conversation ID for the session
  const conversationId = useRef<string>(generateConversationId())
  const lastUserMessage = useRef<string>("")
  const hasTrackedOpen = useRef(false)

  // Create transport instance
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/ihab-ai",
      }),
    []
  )

  const {
    messages,
    status,
    sendMessage,
    stop: stopChat,
    setMessages,
  } = useChat({
    id: "ihab-ai-assistant",
    transport,
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  // Track when chat is opened (first message)
  useEffect(() => {
    if (messages.length > 0 && !hasTrackedOpen.current) {
      hasTrackedOpen.current = true
      trackEvent("AIChatOpened", { conversationId: conversationId.current })
    }
  }, [messages.length, trackEvent])

  // Track when AI response completes
  useEffect(() => {
    if (status === "ready" && messages.length >= 2 && lastUserMessage.current) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage?.role === "assistant") {
        const aiResponse = lastMessage.parts
          ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join("") || ""

        // Log to analytics
        trackAIChatMessage(conversationId.current, lastUserMessage.current, aiResponse)

        // Log to database
        const { sessionId: appInsightsSessionId } = getSessionContext()
        // Use App Insights session ID if available, otherwise use fallback
        const sessionId = appInsightsSessionId || getOrCreateSessionId()
        logChatToDatabase({
          sessionId,
          conversationId: conversationId.current,
          userMessage: lastUserMessage.current,
          aiResponse,
          referrer: typeof window !== "undefined" ? document.referrer : undefined,
        })

        lastUserMessage.current = ""
      }
    }
  }, [status, messages, trackAIChatMessage, getSessionContext])

  const send = useCallback(
    async (message: string) => {
      if (!message.trim()) return

      // Store the message for logging when response completes
      lastUserMessage.current = message

      await sendMessage({
        parts: [{ type: "text", text: message }],
      })

      onMessageSent?.()
    },
    [sendMessage, onMessageSent]
  )

  const stop = useCallback(() => {
    stopChat()
  }, [stopChat])

  const clear = useCallback(() => {
    setMessages([])
    // Reset for new conversation
    conversationId.current = generateConversationId()
    hasTrackedOpen.current = false
  }, [setMessages])

  // Extract text content from UIMessage parts
  const getMessageContent = (msg: UIMessage): string => {
    if (!msg.parts) return ""
    return msg.parts
      .filter((part): part is { type: "text"; text: string } => part.type === "text")
      .map((part) => part.text)
      .join("")
  }

  // Transform messages to our format
  const transformedMessages = messages.map((msg) => ({
    id: msg.id,
    role: msg.role as "user" | "assistant",
    content: getMessageContent(msg),
  }))

  // Determine loading states from status
  const isLoading = status === "submitted" || status === "streaming"
  const isStreaming = status === "streaming"

  return {
    messages: transformedMessages,
    isLoading,
    isStreaming,
    send,
    stop,
    clear,
  }
}
