/**
 * Auto-scroll hook for streaming chat messages
 * Handles smooth scrolling with jitter prevention
 */

"use client"

import { useRef, useCallback, useEffect, useState } from "react"

interface UseAutoScrollOptions {
  /** Dependencies that trigger scroll check */
  dependencies: unknown[]
  /** Whether content is actively streaming */
  isStreaming?: boolean
  /** Threshold in pixels to consider "near bottom" */
  nearBottomThreshold?: number
  /** Debounce time during streaming */
  streamingDebounce?: number
}

interface UseAutoScrollReturn {
  /** Ref to attach to the scrollable container */
  containerRef: React.RefObject<HTMLDivElement | null>
  /** Whether the scroll-to-bottom button should be visible */
  showScrollButton: boolean
  /** Manual scroll to bottom function */
  scrollToBottom: (behavior?: ScrollBehavior) => void
}

export function useAutoScroll({
  dependencies,
  isStreaming = false,
  nearBottomThreshold = 100,
  streamingDebounce = 50,
}: UseAutoScrollOptions): UseAutoScrollReturn {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const userScrolledUp = useRef(false)
  const lastScrollTime = useRef(0)

  // Check if user is near bottom
  const isNearBottom = useCallback(() => {
    const container = containerRef.current
    if (!container) return true

    const { scrollTop, scrollHeight, clientHeight } = container
    return scrollHeight - scrollTop - clientHeight < nearBottomThreshold
  }, [nearBottomThreshold])

  // Scroll to bottom
  const scrollToBottom = useCallback(
    (behavior?: ScrollBehavior) => {
      const container = containerRef.current
      if (!container) return

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches

      const effectiveBehavior =
        behavior ?? (prefersReducedMotion || isStreaming ? "instant" : "smooth")

      container.scrollTo({
        top: container.scrollHeight,
        behavior: effectiveBehavior,
      })

      userScrolledUp.current = false
      setShowScrollButton(false)
    },
    [isStreaming]
  )

  // Handle scroll events
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const nearBottom = isNearBottom()

      if (!nearBottom) {
        userScrolledUp.current = true
        setShowScrollButton(true)
      } else {
        userScrolledUp.current = false
        setShowScrollButton(false)
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [isNearBottom])

  // Auto-scroll when dependencies change
  useEffect(() => {
    if (userScrolledUp.current) return

    const now = Date.now()
    if (isStreaming && now - lastScrollTime.current < streamingDebounce) {
      return
    }

    lastScrollTime.current = now
    scrollToBottom(isStreaming ? "instant" : "smooth")
  }, [...dependencies, isStreaming, scrollToBottom, streamingDebounce])

  return {
    containerRef,
    showScrollButton,
    scrollToBottom,
  }
}
