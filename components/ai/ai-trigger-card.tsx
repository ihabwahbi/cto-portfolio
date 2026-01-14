/**
 * AI Trigger Card
 * A special highlight card in the About section that triggers the AI chat
 * Features awakening animation and glow effects
 */

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface AITriggerCardProps {
  onClick: () => void
  isAwakened?: boolean
  className?: string
}

const ROTATING_PROMPTS = [
  "What's Ihab's leadership style?",
  "Tell me about his achievements",
  "Why is he relocating to Dubai?",
  "What's his cloud experience?",
]

export function AITriggerCard({
  onClick,
  isAwakened = false,
  className,
}: AITriggerCardProps) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Rotate prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative w-full text-left",
        "p-6 rounded-2xl overflow-hidden",
        "border transition-all duration-500",
        isAwakened || isHovered
          ? "border-brand-cyan/50 shadow-lg shadow-brand-cyan/20"
          : "border-white/10",
        "focus:outline-none focus:ring-2 focus:ring-brand-cyan/50",
        className
      )}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Base glass effect */}
        <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-xl" />

        {/* Gradient overlay */}
        <motion.div
          animate={{
            opacity: isAwakened || isHovered ? 1 : 0.5,
          }}
          className="absolute inset-0 bg-gradient-to-br from-brand-cyan/10 via-transparent to-brand-purple/10"
        />

        {/* Pulsing glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-gradient-to-br from-brand-cyan/5 to-brand-purple/5"
        />

        {/* Shimmer effect */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 4,
          }}
          className="absolute inset-0 w-1/3"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with glow */}
        <div className="relative w-12 h-12 mb-4">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-xl bg-brand-cyan/30 blur-lg"
          />
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-brand-cyan/20 to-brand-purple/20 flex items-center justify-center">
            <motion.div
              animate={{
                rotate: isHovered ? 360 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-6 h-6 text-brand-cyan" />
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <p className="text-xs text-brand-cyan uppercase tracking-wider mb-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan" />
          </span>
          AI Assistant
        </p>

        <h3 className="text-lg font-semibold text-white mb-2">
          Ask AI About Ihab
        </h3>

        {/* Rotating prompts */}
        <div className="h-6 overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPromptIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-white/50 flex items-center gap-2"
            >
              <MessageCircle className="w-3 h-3" />
              &ldquo;{ROTATING_PROMPTS[currentPromptIndex]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          animate={{
            x: isHovered ? 5 : 0,
          }}
          className="flex items-center gap-2 text-brand-cyan text-sm font-medium"
        >
          <span>Start conversation</span>
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-bl-3xl">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-brand-cyan/20 to-transparent transform rotate-45 translate-x-10 -translate-y-10" />
      </div>
    </motion.button>
  )
}
