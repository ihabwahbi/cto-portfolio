/**
 * Suggestion Chips
 * Quick prompt buttons for common questions
 */

"use client"

import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SuggestionChip } from "../types"

interface SuggestionChipsProps {
  suggestions: SuggestionChip[]
  onSelect: (message: string) => void
  className?: string
}

export function SuggestionChips({
  suggestions,
  onSelect,
  className,
}: SuggestionChipsProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Sparkles className="w-3 h-3" />
        <span>Try asking</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <motion.button
            key={suggestion.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(suggestion.message)}
            className={cn(
              "px-3 py-2 rounded-xl text-sm",
              "bg-white/5 hover:bg-white/10",
              "border border-white/10 hover:border-brand-cyan/30",
              "text-white/70 hover:text-white",
              "transition-colors duration-200"
            )}
          >
            {suggestion.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
