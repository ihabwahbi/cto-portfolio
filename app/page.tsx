import { AuroraBackground, Navigation, SectionIndicator } from "@/components/layout"
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  SkillsSection,
  AchievementsSection,
  ProjectsSection,
  TestimonialsSection,
  ContactSection,
  Footer,
} from "@/components/sections"
import { AIAssistantProvider } from "@/contexts/ai-assistant-context"

export default function HomePage() {
  return (
    <AIAssistantProvider>
      {/* Background */}
      <AuroraBackground />

      {/* Navigation */}
      <Navigation />

      {/* Section Indicator */}
      <SectionIndicator />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </AIAssistantProvider>
  )
}
