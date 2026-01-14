/**
 * The Sentient Orb
 * A mesmerizing AI button with internal plasma effect, orbiting particles,
 * and reactive animations. The centerpiece of the AI integration.
 */

"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface SentientOrbProps {
  onClick: () => void
  className?: string
}

// Keywords that orbit around the orb
const ORBIT_KEYWORDS = ["Leadership", "Cloud", "AI", "Innovation", "Strategy"]

export function SentientOrb({ onClick, className }: SentientOrbProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for reactive effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Transform mouse position to subtle rotation
  const rotateX = useTransform(springY, [-50, 50], [5, -5])
  const rotateY = useTransform(springX, [-50, 50], [-5, 5])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-cyan via-brand-purple to-brand-cyan blur-xl"
        style={{ transform: "scale(1.5)" }}
      />

      {/* Orbiting keywords (desktop only) */}
      {isMounted && (
        <div className="absolute inset-0 hidden md:block">
          {ORBIT_KEYWORDS.map((keyword, index) => {
            const angle = (index / ORBIT_KEYWORDS.length) * 360
            const delay = index * 0.5
            return (
              <motion.div
                key={keyword}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  rotate: [angle, angle + 360],
                }}
                transition={{
                  opacity: { duration: 0.3, delay: delay * 0.1 },
                  rotate: {
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
                className="absolute inset-0"
                style={{ transformOrigin: "center center" }}
              >
                <motion.span
                  animate={{ rotate: [-angle, -angle - 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-brand-cyan/70 whitespace-nowrap"
                >
                  {keyword}
                </motion.span>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Main orb button */}
      <motion.button
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative group",
          "w-full px-8 py-4 rounded-2xl",
          "overflow-hidden",
          "border border-brand-cyan/30",
          "transition-all duration-300",
          "hover:border-brand-cyan/60",
          "focus:outline-none focus:ring-2 focus:ring-brand-cyan/50 focus:ring-offset-2 focus:ring-offset-brand-obsidian"
        )}
      >
        {/* Internal plasma/aurora effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-obsidian via-brand-carbon to-brand-obsidian" />

          {/* Animated aurora layers */}
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(0, 212, 255, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* Shimmer overlay */}
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
            className="absolute inset-0 w-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
          />

          {/* Particle dots */}
          {isMounted &&
            [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.sin(i) * 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="absolute w-1 h-1 rounded-full bg-brand-cyan"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`,
                }}
              />
            ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          <motion.div
            animate={{
              rotate: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-5 h-5 text-brand-cyan" />
          </motion.div>
          <span className="font-semibold text-white">Ask AI About Ihab</span>
        </div>

        {/* Hover pulse ring */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 0.8,
            opacity: isHovered ? [0.5, 0, 0.5] : 0,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-2xl border-2 border-brand-cyan"
        />
      </motion.button>

      {/* Floating hint text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="text-center text-xs text-white/40 mt-3"
      >
        Get instant answers about experience & skills
      </motion.p>
    </motion.div>
  )
}
