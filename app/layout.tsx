import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { AnalyticsProvider } from "@/components/providers"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Ihab Wahbi | CTO & Operations Technology Leader",
  description:
    "Technology executive with 14+ years leading multi-site operations, digital transformation, and high-performing teams. Expert in bridging operations and technology to drive business growth.",
  keywords: [
    "CTO",
    "Chief Technology Officer",
    "Technology Executive",
    "Operations Leadership",
    "Digital Transformation",
    "Multi-Site Management",
    "Dubai",
    "UAE",
  ],
  authors: [{ name: "Ihab Wahbi" }],
  openGraph: {
    title: "Ihab Wahbi | CTO & Operations Technology Leader",
    description:
      "Technology executive with 14+ years leading multi-site operations and digital transformation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ihab Wahbi | CTO & Operations Technology Leader",
    description:
      "Technology executive with 14+ years leading multi-site operations and digital transformation.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-brand-obsidian text-white antialiased">
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  )
}
