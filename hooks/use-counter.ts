"use client"

import { useEffect, useState } from "react"

interface UseCounterOptions {
  duration?: number
  delay?: number
  decimals?: number
}

export function useCounter(
  target: number,
  isVisible: boolean,
  options: UseCounterOptions = {}
) {
  const { duration = 2000, delay = 0, decimals = 0 } = options
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setValue(0)
      return
    }

    const timeout = setTimeout(() => {
      const startTime = performance.now()

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Exponential ease-out
        const eased = 1 - Math.pow(2, -10 * progress)
        const currentValue = target * eased

        setValue(Number(currentValue.toFixed(decimals)))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timeout)
  }, [target, isVisible, duration, delay, decimals])

  return value
}
