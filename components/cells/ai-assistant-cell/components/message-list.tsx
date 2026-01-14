/**
 * Message List Component
 * Displays chat messages with proper styling
 */

"use client"

import { forwardRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import { MarkdownRenderer } from "./markdown-renderer"
import { StreamingIndicator } from "./streaming-indicator"
import type { ChatMessage } from "../types"

interface MessageListProps {
  messages: ChatMessage[]
  isStreaming: boolean
  className?: string
}

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  function MessageList({ messages, isStreaming, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex-1 overflow-y-auto px-4 py-6 space-y-4",
          "scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent",
          className
        )}
      >
        {/* Welcome message when empty */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-brand-cyan" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Hi! I&apos;m Ihab&apos;s AI Assistant
            </h3>
            <p className="text-sm text-white/60 max-w-sm mx-auto">
              Ask me anything about Ihab&apos;s experience, skills, achievements, or why he&apos;d be a great fit for your team.
            </p>
          </motion.div>
        )}

        {/* Messages */}
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {/* Assistant avatar */}
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-brand-cyan" />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-brand-cyan text-brand-obsidian rounded-br-md"
                    : "bg-white/5 border border-white/10 rounded-bl-md"
                )}
              >
                {message.role === "user" ? (
                  <p className="text-sm font-medium">{message.content}</p>
                ) : (
                  <MarkdownRenderer content={message.content} />
                )}
              </div>

              {/* User avatar */}
              {message.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-brand-cyan/20 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-brand-cyan" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Streaming indicator */}
        <AnimatePresence>
          {isStreaming && messages[messages.length - 1]?.role === "user" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-brand-cyan" />
              </div>
              <StreamingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
