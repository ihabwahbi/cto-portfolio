"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { GlassCard, Button } from "@/components/ui"
import { useAnimateIn } from "@/hooks"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "One of the most impactful technology leaders I've worked with. Their ability to translate complex technical concepts into business value is remarkable. They transformed our engineering organization and delivered results that exceeded all expectations.",
    author: "Sarah Chen",
    title: "CEO",
    company: "TechCorp Global",
    image: "SC",
  },
  {
    quote:
      "A rare combination of deep technical expertise and exceptional leadership skills. They built a world-class engineering team and established a culture of innovation that continues to drive our success.",
    author: "Michael Roberts",
    title: "Board Member",
    company: "Fortune 500 Company",
    image: "MR",
  },
  {
    quote:
      "Working with them was a masterclass in engineering leadership. Their strategic thinking, combined with hands-on technical ability, helped us scale from startup to acquisition in record time.",
    author: "Jennifer Liu",
    title: "VP Product",
    company: "InnovateTech Inc",
    image: "JL",
  },
  {
    quote:
      "Their mentorship transformed my career. They have a gift for identifying potential in people and helping them grow beyond what they thought possible. A true leader who leads by example.",
    author: "David Park",
    title: "Staff Engineer",
    company: "Former Direct Report",
    image: "DP",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { ref, isVisible, animationClass } = useAnimateIn<HTMLElement>({
    threshold: 0.2,
  })

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }

  return (
    <section
      id="testimonials"
      ref={ref}
      className={cn("section-spacing animate-in", isVisible && "is-visible", animationClass)}
    >
      <div className="container">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="label-text mb-4 block">Testimonials</span>
          <h2 className="section-title gradient-text-white mb-6">
            What People <span className="gradient-text">Say</span>
          </h2>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <GlassCard padding="xl" className="relative overflow-hidden">
            {/* Quote icon */}
            <Quote className="absolute top-8 left-8 w-12 h-12 text-brand-cyan/20" />

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 pl-8">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4 pl-8">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-cyan to-brand-purple flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[currentIndex].image}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonials[currentIndex].author}
                    </p>
                    <p className="text-sm text-white/60">
                      {testimonials[currentIndex].title},{" "}
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentIndex
                        ? "w-8 bg-brand-cyan"
                        : "bg-white/30 hover:bg-white/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
