"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, Download, Github, Linkedin, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui"
import { useIsDesktop } from "@/hooks"
import { useAnalytics } from "@/components/providers"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Impact" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

const socialLinks = [
  { href: "https://github.com/ihabwahbi", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/ihabwahbi", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:ihab.a.wahbi@gmail.com", icon: Mail, label: "Email" },
  { href: "https://wa.me/61422204510", icon: Phone, label: "WhatsApp" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isDesktop = useIsDesktop()
  const { trackDownload, trackExternalLink, trackClick } = useAnalytics()

  const handleResumeDownload = () => {
    trackDownload("IhabWahbi_Resume_CTO.pdf")
  }

  const handleSocialClick = (linkName: string, href: string) => {
    trackExternalLink(href, linkName)
  }

  const handleNavClick = (label: string) => {
    trackClick(`Navigation: ${label}`)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (isDesktop) {
      setIsMobileMenuOpen(false)
    }
  }, [isDesktop])

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "nav-blur" : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center">
                <span className="text-brand-cyan font-bold text-lg">IW</span>
              </div>
              <span className="hidden sm:block text-white font-semibold">
                Ihab Wahbi
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.label)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg",
                    "text-white/70 hover:text-white",
                    "hover:bg-white/5",
                    "transition-all duration-200"
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => handleSocialClick(link.label, link.href)}
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      "text-white/50 hover:text-white",
                      "hover:bg-white/5",
                      "transition-all duration-200"
                    )}
                    aria-label={link.label}
                  >
                    <link.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
              <a href="/IhabWahbi_Resume_CTO.pdf" download onClick={handleResumeDownload}>
                <Button variant="glow" size="sm">
                  <Download className="w-4 h-4" />
                  Resume
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-brand-carbon border-t border-white/10 rounded-t-3xl md:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Handle */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              {/* Links */}
              <nav className="px-4 pb-6 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between px-4 py-3 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                    onClick={() => {
                      handleNavClick(link.label)
                      setIsMobileMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span className="font-medium">{link.label}</span>
                  </motion.a>
                ))}

                {/* Divider */}
                <div className="h-px bg-white/10 my-4" />

                {/* Social Links */}
                <div className="flex items-center justify-center gap-2 py-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => handleSocialClick(link.label, link.href)}
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

                {/* CTA */}
                <a href="/IhabWahbi_Resume_CTO.pdf" download onClick={handleResumeDownload} className="w-full mt-4 block">
                  <Button variant="glow" size="lg" className="w-full">
                    <Download className="w-5 h-5" />
                    Download Resume
                  </Button>
                </a>
              </nav>

              {/* Safe area */}
              <div className="pb-safe" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
