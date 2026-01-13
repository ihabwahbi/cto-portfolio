"use client"

import { useState } from "react"
import { motion } from "motion/react"
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Calendar,
  MapPin,
  Send,
  ArrowRight,
} from "lucide-react"
import { GlassCard, Button } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-[#0A66C2]" },
  { icon: Github, label: "GitHub", href: "#", color: "hover:text-white" },
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-[#1DA1F2]" },
  { icon: Mail, label: "Email", href: "#", color: "hover:text-brand-cyan" },
]

interface FloatingInputProps {
  label: string
  type?: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  textarea?: boolean
}

function FloatingInput({
  label,
  type = "text",
  name,
  icon: Icon,
  textarea = false,
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")
  const isActive = isFocused || value.length > 0

  const inputProps = {
    type,
    name,
    id: name,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(e.target.value),
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    className: cn(
      "w-full bg-transparent border-none outline-none",
      "text-white placeholder-transparent",
      "pt-6 pb-2",
      Icon ? "pl-12 pr-4" : "px-4",
      textarea && "min-h-[120px] resize-none"
    ),
  }

  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden",
        "bg-white/[0.03] border transition-all duration-300",
        isFocused
          ? "border-brand-cyan bg-white/[0.05] shadow-lg shadow-brand-cyan/10"
          : "border-white/10 hover:border-white/20"
      )}
    >
      {/* Icon */}
      {Icon && (
        <div
          className={cn(
            "absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200",
            textarea && "top-6 translate-y-0",
            isFocused ? "text-brand-cyan" : "text-white/40"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      )}

      {/* Input/Textarea */}
      {textarea ? (
        <textarea {...inputProps} />
      ) : (
        <input {...inputProps} />
      )}

      {/* Floating label */}
      <label
        htmlFor={name}
        className={cn(
          "absolute transition-all duration-200 pointer-events-none",
          Icon ? "left-12" : "left-4",
          isActive
            ? "top-2 text-xs text-brand-cyan"
            : "top-1/2 -translate-y-1/2 text-sm text-white/50",
          textarea && !isActive && "top-6 translate-y-0"
        )}
      >
        {label}
      </label>
    </div>
  )
}

export function ContactSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.2,
  })

  return (
    <section
      id="contact"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Left column - Info */}
          <div>
            <span className="label-text mb-4 block">Get in Touch</span>
            <h2 className="section-title gradient-text-white mb-6">
              Let&apos;s Build <br />
              <span className="gradient-text">Something Great</span>
            </h2>
            <p className="body-lg text-white/60 mb-8">
              I&apos;m always interested in discussing new opportunities, innovative
              projects, and ways to create meaningful impact through technology.
            </p>

            {/* Quick info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-brand-cyan" />
                </div>
                <span>San Francisco, CA (Open to relocation)</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-brand-cyan" />
                </div>
                <span>Available for immediate start</span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm text-white/50 mb-4">Connect with me</p>
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      "bg-white/5 text-white/60 transition-all duration-200",
                      "hover:bg-white/10",
                      link.color
                    )}
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <GlassCard>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingInput
                    label="Your Name"
                    name="name"
                    icon={Mail}
                  />
                  <FloatingInput
                    label="Email Address"
                    type="email"
                    name="email"
                    icon={Mail}
                  />
                </div>
                <FloatingInput
                  label="Subject"
                  name="subject"
                  icon={Send}
                />
                <FloatingInput
                  label="Your Message"
                  name="message"
                  icon={Mail}
                  textarea
                />

                <Button variant="glow" size="lg" className="w-full group">
                  Send Message
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <p className="text-center text-xs text-white/40">
                  I typically respond within 24-48 hours
                </p>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
