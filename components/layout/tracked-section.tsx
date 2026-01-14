"use client"

import { useEffect, useRef } from "react"
import { useAnalytics } from "@/components/providers"

interface TrackedSectionProps {
  id: string
  name: string
  children: React.ReactNode
  className?: string
}

export function TrackedSection({ id, name, children, className }: TrackedSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const hasTracked = useRef(false)
  const { trackSectionView } = useAnalytics()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Track when section becomes at least 30% visible
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !hasTracked.current) {
            hasTracked.current = true
            trackSectionView(name)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "0px",
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [name, trackSectionView])

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  )
}
