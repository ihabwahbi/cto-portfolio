/**
 * AI Assistant Context
 * Manages global state for the AI chat experience
 * Handles the scroll journey animation between Hero and About sections
 */

"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import { AIAssistantCell } from "@/components/cells/ai-assistant-cell"

interface AIAssistantContextValue {
  /** Whether the chat modal is open */
  isOpen: boolean
  /** Open the chat modal */
  openChat: () => void
  /** Close the chat modal */
  closeChat: () => void
  /** Open chat and scroll to About section (for hero button) */
  openChatWithScroll: () => void
}

const AIAssistantContext = createContext<AIAssistantContextValue | null>(null)

interface AIAssistantProviderProps {
  children: ReactNode
}

export function AIAssistantProvider({ children }: AIAssistantProviderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const openChat = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
  }, [])

  const openChatWithScroll = useCallback(() => {
    // First scroll to the about section
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    // Open the chat after a short delay for the scroll animation
    setTimeout(() => {
      setIsOpen(true)
    }, 600)
  }, [])

  return (
    <AIAssistantContext.Provider
      value={{
        isOpen,
        openChat,
        closeChat,
        openChatWithScroll,
      }}
    >
      {children}
      <AIAssistantCell isOpen={isOpen} onClose={closeChat} />
    </AIAssistantContext.Provider>
  )
}

export function useAIAssistant() {
  const context = useContext(AIAssistantContext)
  if (!context) {
    throw new Error("useAIAssistant must be used within AIAssistantProvider")
  }
  return context
}
