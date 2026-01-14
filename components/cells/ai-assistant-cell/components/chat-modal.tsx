/**
 * Chat Modal Component
 * Glassmorphic modal for the AI chat interface
 */

"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Trash2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { MessageList } from "./message-list"
import { ChatInput, type ChatInputHandle } from "./chat-input"
import { SuggestionChips } from "./suggestion-chips"
import { useIhabChat } from "../hooks/use-ihab-chat"
import { useAutoScroll } from "../hooks/use-auto-scroll"
import { DEFAULT_SUGGESTIONS } from "../types"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export function ChatModal({ isOpen, onClose, className }: ChatModalProps) {
  const inputRef = useRef<ChatInputHandle>(null)
  const { messages, isLoading, isStreaming, send, stop, clear } = useIhabChat({
    onMessageSent: () => {
      // Focus will be managed by the input itself
    },
  })

  const { containerRef, showScrollButton, scrollToBottom } = useAutoScroll({
    dependencies: [messages],
    isStreaming,
  })

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure modal is rendered
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleSuggestionSelect = useCallback(
    (message: string) => {
      send(message)
    },
    [send]
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "fixed z-50 inset-4 md:inset-auto",
              "md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
              "md:w-full md:max-w-2xl md:h-[80vh] md:max-h-[700px]",
              "flex flex-col",
              "rounded-3xl overflow-hidden",
              "bg-brand-obsidian/95 backdrop-blur-xl",
              "border border-white/10",
              "shadow-2xl shadow-brand-cyan/10",
              className
            )}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center">
                    <span className="text-lg">🤖</span>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-emerald border-2 border-brand-obsidian" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Ask AI About Ihab</h3>
                  <p className="text-xs text-white/50">Get instant answers</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Clear chat button */}
                {messages.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clear}
                    className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                    title="Clear chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages area */}
            <MessageList
              ref={containerRef}
              messages={messages}
              isStreaming={isStreaming}
              className="relative z-10"
            />

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={() => scrollToBottom("smooth")}
                  className={cn(
                    "absolute bottom-32 left-1/2 -translate-x-1/2 z-20",
                    "p-2 rounded-full",
                    "bg-brand-cyan/20 hover:bg-brand-cyan/30",
                    "border border-brand-cyan/30",
                    "text-brand-cyan",
                    "transition-colors duration-200"
                  )}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Suggestions (only when no messages) */}
            {messages.length === 0 && (
              <div className="relative z-10 px-6 pb-4">
                <SuggestionChips
                  suggestions={DEFAULT_SUGGESTIONS}
                  onSelect={handleSuggestionSelect}
                />
              </div>
            )}

            {/* Input area */}
            <div className="relative z-10 p-4 border-t border-white/10">
              <ChatInput
                ref={inputRef}
                onSend={send}
                onStop={stop}
                isLoading={isLoading}
                isStreaming={isStreaming}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
