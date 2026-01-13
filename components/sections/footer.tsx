"use client"

import { Heart, ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
              <span className="text-brand-cyan font-bold">JD</span>
            </div>
            <div className="text-sm text-white/50">
              <p className="flex items-center gap-1.5">
                Built with <Heart className="w-3.5 h-3.5 text-brand-rose" /> using
                Next.js & Tailwind
              </p>
              <p>2024 John Doe. All rights reserved.</p>
            </div>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl",
              "bg-white/5 text-white/60 text-sm",
              "hover:bg-white/10 hover:text-white",
              "transition-all duration-200"
            )}
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
    </footer>
  )
}
