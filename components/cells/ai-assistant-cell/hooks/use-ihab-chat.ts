/**
 * Custom hook for Ihab's AI Chat
 * Wraps the AI SDK useChat hook with additional functionality
 */

"use client"

import { useChat, type UIMessage } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { useCallback, useMemo } from "react"
import type { UseChatReturn } from "../types"

interface UseIhabChatOptions {
  /** Callback when a message is sent */
  onMessageSent?: () => void
}

export function useIhabChat(options: UseIhabChatOptions = {}): UseChatReturn {
  const { onMessageSent } = options

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

  const send = useCallback(
    async (message: string) => {
      if (!message.trim()) return

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
