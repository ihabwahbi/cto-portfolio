/**
 * Types for the AI Assistant Cell
 */

export interface AIAssistantCellProps {
  /** Whether the chat modal is open */
  isOpen: boolean
  /** Callback to close the modal */
  onClose: () => void
  /** Optional initial message to send */
  initialMessage?: string
  /** Optional class name */
  className?: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

export interface UseChatReturn {
  messages: ChatMessage[]
  isLoading: boolean
  isStreaming: boolean
  send: (message: string) => void
  stop: () => void
  clear: () => void
}

export interface SuggestionChip {
  label: string
  message: string
}

export const DEFAULT_SUGGESTIONS: SuggestionChip[] = [
  { label: "Who's Ihab?", message: "Who is Ihab and what makes him different from other candidates?" },
  { label: "Prove it", message: "Show me real proof of what you've actually built - not just talk" },
  { label: "How fast can you ship?", message: "How quickly can Ihab actually deliver working software?" },
  { label: "Why CTO for restaurants?", message: "Why would Ihab be a good CTO for a restaurant or F&B business?" },
  { label: "Do you know Yaba?", message: "Do you know anything about Yaba Restaurant or Chef Shaheen?" },
]
