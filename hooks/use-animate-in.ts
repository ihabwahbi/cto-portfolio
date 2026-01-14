"use client"

import { useEffect, useRef, useState } from "react"
import { useAnalytics } from "@/components/providers"

interface UseAnimateInOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
  exitDelay?: number
  animationDuration?: number
  trackAs?: string // Optional: track this section view in analytics
}

export function useAnimateIn<T extends HTMLElement = HTMLDivElement>(
  options: UseAnimateInOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = "-5% 0px",
    once = false,
    exitDelay = 50,
    animationDuration = 1000,
    trackAs,
  } = options

  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [animationState, setAnimationState] = useState<
    "idle" | "animating" | "complete"
  >("idle")
  const hasTracked = useRef(false)
  const { trackSectionView } = useAnalytics()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationState("animating")
          setIsVisible(true)

          // Track section view (only once per session)
          if (trackAs && !hasTracked.current) {
            hasTracked.current = true
            trackSectionView(trackAs)
          }

          const timer = setTimeout(() => {
            setAnimationState("complete")
          }, animationDuration)

          if (once) {
            observer.unobserve(element)
          }

          return () => clearTimeout(timer)
        } else if (!once) {
          const timer = setTimeout(() => {
            setIsVisible(false)
            setAnimationState("idle")
          }, exitDelay)

          return () => clearTimeout(timer)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.unobserve(element)
  }, [threshold, rootMargin, once, exitDelay, animationDuration, trackAs, trackSectionView])

  const animationClass =
    animationState === "animating"
      ? "animating"
      : animationState === "complete"
        ? "animation-complete"
        : ""

  return { ref, isVisible, animationState, animationClass }
}
