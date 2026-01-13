"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-3 whitespace-nowrap font-semibold",
    "transition-colors transition-shadow duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-brand-obsidian",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "active:scale-[0.98] active:transition-transform active:duration-75",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-brand-cyan text-brand-void font-bold",
          "shadow-lg shadow-brand-cyan/25",
          "hover:bg-brand-cyan-light hover:shadow-xl hover:shadow-brand-cyan/40",
        ].join(" "),
        outline: [
          "border-2 border-white/20 bg-transparent text-white",
          "backdrop-blur-sm",
          "hover:bg-white/5 hover:border-brand-cyan/50",
        ].join(" "),
        ghost: [
          "text-white/70",
          "hover:text-white hover:bg-white/5",
        ].join(" "),
        glow: [
          "bg-brand-cyan text-brand-void font-bold",
          "shadow-lg shadow-brand-cyan/30",
          "hover:shadow-[0_0_30px_rgba(0,212,255,0.5),0_0_60px_rgba(0,212,255,0.3)]",
          "hover:bg-brand-cyan-light",
        ].join(" "),
        secondary: [
          "bg-brand-purple text-white font-bold",
          "shadow-lg shadow-brand-purple/25",
          "hover:bg-brand-purple-light hover:shadow-xl hover:shadow-brand-purple/40",
        ].join(" "),
      },
      size: {
        default: "h-12 px-7 py-3 text-sm rounded-xl",
        sm: "h-11 px-5 py-2.5 text-sm rounded-lg",
        lg: "h-14 px-8 py-4 text-base rounded-xl",
        xl: "h-16 px-14 py-5 text-lg rounded-2xl",
        icon: "h-12 w-12 rounded-xl",
        "icon-sm": "h-11 w-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
