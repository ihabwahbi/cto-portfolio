import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
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
  title: "Ihab Wahbi | CTO & Technology Executive",
  description:
    "Technology executive with 15+ years transforming organizations through innovative engineering leadership, scalable architectures, and high-performing teams.",
  keywords: [
    "CTO",
    "Chief Technology Officer",
    "Technology Executive",
    "Engineering Leadership",
    "VP Engineering",
    "Tech Leader",
  ],
  authors: [{ name: "Ihab Wahbi" }],
  openGraph: {
    title: "Ihab Wahbi | CTO & Technology Executive",
    description:
      "Technology executive with 15+ years transforming organizations through innovative engineering leadership.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ihab Wahbi | CTO & Technology Executive",
    description:
      "Technology executive with 15+ years transforming organizations through innovative engineering leadership.",
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
        {children}
      </body>
    </html>
  )
}
