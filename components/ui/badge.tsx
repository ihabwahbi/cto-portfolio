"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex items-center rounded-full px-3.5 py-1.5",
    "text-xs font-medium",
    "border",
    "transition-colors duration-200",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "border-brand-cyan/30 bg-brand-cyan/10 text-brand-cyan",
        secondary: "border-brand-purple/30 bg-brand-purple/10 text-brand-purple-light",
        outline: "border-white/20 bg-white/[0.03] text-white/70 hover:bg-white/[0.06] hover:border-white/30",
        success: "border-brand-emerald/30 bg-brand-emerald/10 text-brand-emerald",
        warning: "border-brand-amber/30 bg-brand-amber/10 text-brand-amber",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
