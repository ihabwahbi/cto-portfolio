import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-white/60 mb-8">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
