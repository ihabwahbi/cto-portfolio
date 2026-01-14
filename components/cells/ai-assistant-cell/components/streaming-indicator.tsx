/**
 * Streaming Indicator
 * Shows contextual status during AI response generation
 */

"use client"

import { motion } from "motion/react"
import { Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface StreamingIndicatorProps {
  className?: string
}

export function StreamingIndicator({ className }: StreamingIndicatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl",
        "bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10",
        "border border-white/10",
        className
      )}
    >
      {/* Animated brain icon */}
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-brand-cyan/30 blur-md"
        />
        <Brain className="w-5 h-5 text-brand-cyan relative z-10" />
      </div>

      {/* Text with typing dots */}
      <div className="flex items-center gap-1.5">
        <span className="text-sm text-white/70">Thinking about Ihab</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
          className="text-brand-cyan"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
          className="text-brand-cyan"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
          className="text-brand-cyan"
        >
          .
        </motion.span>
      </div>
    </motion.div>
  )
}
