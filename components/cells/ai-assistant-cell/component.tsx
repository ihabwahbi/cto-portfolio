/**
 * AI Assistant Cell
 * Main cell component that orchestrates the AI chat experience
 */

"use client"

import { memo } from "react"
import { ChatModal } from "./components/chat-modal"
import type { AIAssistantCellProps } from "./types"

export const AIAssistantCell = memo(function AIAssistantCell({
  isOpen,
  onClose,
  className,
}: AIAssistantCellProps) {
  return (
    <ChatModal
      isOpen={isOpen}
      onClose={onClose}
      className={className}
    />
  )
})
