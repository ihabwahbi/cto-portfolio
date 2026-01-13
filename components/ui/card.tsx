"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl",
      "bg-white/[0.03] backdrop-blur-xl",
      "border border-white/[0.08]",
      "text-white",
      "shadow-xl shadow-black/20",
      "transition-all duration-300",
      "overflow-hidden",
      "p-6 md:p-8",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const glassCardVariants = cva(
  "glass-card glass-card-hover card-glow rounded-2xl",
  {
    variants: {
      padding: {
        none: "",
        sm: "p-5 md:p-6",
        default: "p-6 md:p-8",
        lg: "p-8 md:p-10",
        xl: "p-8 md:p-12",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  }
)

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassCardVariants> {}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(glassCardVariants({ padding, className }))}
      {...props}
    />
  )
)
GlassCard.displayName = "GlassCard"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 p-6 md:p-8 pb-4 md:pb-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-white/60 mt-1", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 md:p-8 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, GlassCard, glassCardVariants, CardHeader, CardTitle, CardDescription, CardContent }
