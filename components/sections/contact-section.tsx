"use client"

import { useState } from "react"
import { motion } from "motion/react"
import {
  Mail,
  Linkedin,
  Github,
  Calendar,
  MapPin,
  Send,
  ArrowRight,
  User,
  Building2,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { GlassCard, Button } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { useAnalytics } from "@/components/providers"
import { cn } from "@/lib/utils"

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ihabwahbi", color: "hover:text-[#0A66C2]" },
  { icon: Github, label: "GitHub", href: "https://github.com/ihabwahbi", color: "hover:text-white" },
  { icon: Mail, label: "Email", href: "mailto:ihab.a.wahbi@gmail.com", color: "hover:text-brand-cyan" },
]

interface FloatingInputProps {
  label: string
  type?: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  textarea?: boolean
  value?: string
  onChange?: (value: string) => void
  required?: boolean
}

function FloatingInput({
  label,
  type = "text",
  name,
  icon: Icon,
  textarea = false,
  value: controlledValue,
  onChange,
  required = false,
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [internalValue, setInternalValue] = useState("")

  const value = controlledValue !== undefined ? controlledValue : internalValue
  const isActive = isFocused || value.length > 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (onChange) {
      onChange(newValue)
    } else {
      setInternalValue(newValue)
    }
  }

  const inputProps = {
    type,
    name,
    id: name,
    value,
    onChange: handleChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    required,
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

type FormStatus = "idle" | "loading" | "success" | "error"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  message: string
}

export function ContactSection() {
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.2,
    trackAs: "Contact",
  })
  const { trackEvent, trackExternalLink } = useAnalytics()

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      // Track successful form submission
      trackEvent("ContactFormSubmit", {
        hasCompany: !!formData.company,
        hasPhone: !!formData.phone,
      })

      setStatus("success")
      setFormData({ name: "", email: "", company: "", phone: "", message: "" })
    } catch (error) {
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (status === "error") setStatus("idle")
  }

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
                <span>Perth, Australia (Open to relocate to Dubai)</span>
              </div>
              <a
                href="https://wa.me/61422204510"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-brand-emerald transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-emerald/10 transition-colors">
                  <Phone className="w-5 h-5 text-brand-cyan group-hover:text-brand-emerald transition-colors" />
                </div>
                <span>+61 422 204 510 <span className="text-white/40">(WhatsApp)</span></span>
              </a>
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
                    onClick={() => trackExternalLink(link.href, `Contact: ${link.label}`)}
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
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-10"
                >
                  {/* Animated success icon with glow */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1
                    }}
                    className="relative mx-auto w-24 h-24 mb-6"
                  >
                    <div className="absolute inset-0 bg-brand-emerald/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-full h-full rounded-full bg-gradient-to-br from-brand-emerald/20 to-brand-cyan/20 border border-brand-emerald/30 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          delay: 0.3
                        }}
                      >
                        <CheckCircle2 className="w-12 h-12 text-brand-emerald" />
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-white mb-3"
                  >
                    Message Sent Successfully!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white/60 mb-8 max-w-sm mx-auto"
                  >
                    Thank you for reaching out! I&apos;m excited to connect and will get back to you within 24-48 hours.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3"
                  >
                    <Button
                      variant="outline"
                      onClick={() => setStatus("idle")}
                    >
                      Send Another Message
                    </Button>
                    <a href="https://www.linkedin.com/in/ihabwahbi" target="_blank" rel="noopener noreferrer">
                      <Button variant="glow" size="default" className="group">
                        <Linkedin className="w-4 h-4" />
                        Connect on LinkedIn
                      </Button>
                    </a>
                  </motion.div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingInput
                      label="Your Name *"
                      name="name"
                      icon={User}
                      value={formData.name}
                      onChange={(value) => updateField("name", value)}
                      required
                    />
                    <FloatingInput
                      label="Email Address *"
                      type="email"
                      name="email"
                      icon={Mail}
                      value={formData.email}
                      onChange={(value) => updateField("email", value)}
                      required
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingInput
                      label="Company (Optional)"
                      name="company"
                      icon={Building2}
                      value={formData.company}
                      onChange={(value) => updateField("company", value)}
                    />
                    <FloatingInput
                      label="Phone (Optional)"
                      type="tel"
                      name="phone"
                      icon={Phone}
                      value={formData.phone}
                      onChange={(value) => updateField("phone", value)}
                    />
                  </div>
                  <FloatingInput
                    label="Your Message *"
                    name="message"
                    icon={MessageSquare}
                    textarea
                    value={formData.message}
                    onChange={(value) => updateField("message", value)}
                    required
                  />

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <p className="text-red-400 font-medium text-sm">Failed to send message</p>
                        <p className="text-red-400/70 text-xs mt-0.5">{errorMessage}</p>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    variant="glow"
                    size="lg"
                    className="w-full group"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs text-white/40">
                    I typically respond within 24-48 hours
                  </p>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
