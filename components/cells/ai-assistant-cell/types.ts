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
  { label: "Leadership style", message: "What's Ihab's leadership style?" },
  { label: "Cloud experience", message: "Tell me about his cloud and technology experience" },
  { label: "Biggest achievement", message: "What's his biggest professional achievement?" },
  { label: "Why Dubai?", message: "Why is Ihab relocating to Dubai?" },
]
