/**
 * Chat Input Component
 * Text input with send/stop button and character limit
 */

"use client"

import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react"
import { motion } from "motion/react"
import { Send, Square, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (message: string) => void
  onStop: () => void
  isLoading: boolean
  isStreaming: boolean
  disabled?: boolean
  className?: string
}

export interface ChatInputHandle {
  focus: () => void
  clear: () => void
}

const MAX_LENGTH = 500

export const ChatInput = forwardRef<ChatInputHandle, ChatInputProps>(
  function ChatInput(
    { onSend, onStop, isLoading, isStreaming, disabled, className },
    ref
  ) {
    const [value, setValue] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => textareaRef.current?.focus(),
      clear: () => setValue(""),
    }))

    // Auto-resize textarea
    useEffect(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
    }, [value])

    const handleSubmit = () => {
      if (!value.trim() || isLoading || disabled) return
      onSend(value.trim())
      setValue("")
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }

    const isOverLimit = value.length > MAX_LENGTH
    const showWarning = value.length > MAX_LENGTH * 0.9

    return (
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "flex items-end gap-2 p-3 rounded-2xl",
            "bg-white/5 border border-white/10",
            "focus-within:border-brand-cyan/30 focus-within:bg-white/[0.07]",
            "transition-colors duration-200"
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Ihab's experience, skills, or projects..."
            disabled={disabled || isLoading}
            rows={1}
            className={cn(
              "flex-1 bg-transparent resize-none",
              "text-sm text-white placeholder:text-white/40",
              "focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0",
              "outline-none ring-0",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "min-h-[24px] max-h-[120px]"
            )}
          />

          {/* Send/Stop button */}
          {isStreaming ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStop}
              className={cn(
                "p-2 rounded-xl",
                "bg-brand-rose/20 hover:bg-brand-rose/30",
                "text-brand-rose",
                "transition-colors duration-200"
              )}
              title="Stop generating"
            >
              <Square className="w-4 h-4 fill-current" />
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={!value.trim() || isLoading || disabled || isOverLimit}
              className={cn(
                "p-2 rounded-xl",
                "bg-brand-cyan hover:bg-brand-cyan-light",
                "text-brand-obsidian",
                "transition-colors duration-200",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-cyan"
              )}
              title="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </motion.button>
          )}
        </div>

        {/* Character count warning */}
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "absolute -bottom-6 right-0 text-xs",
              isOverLimit ? "text-brand-rose" : "text-white/40"
            )}
          >
            {value.length}/{MAX_LENGTH}
          </motion.div>
        )}
      </div>
    )
  }
)
