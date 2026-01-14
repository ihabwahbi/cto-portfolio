/**
 * Markdown Renderer for AI responses
 * Uses react-markdown with styling
 */

"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-invert prose-sm max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => (
            <p className="mb-2 last:mb-0 text-white/90 leading-relaxed">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-white/80">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 space-y-1 text-white/80">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 space-y-1 text-white/80">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="text-white/80">{children}</li>
          ),
          code: ({ children, className }) => {
            const isInline = !className
            return isInline ? (
              <code className="px-1.5 py-0.5 rounded bg-white/10 text-brand-cyan text-xs font-mono">
                {children}
              </code>
            ) : (
              <code className="block p-3 rounded-lg bg-white/5 text-white/90 text-xs font-mono overflow-x-auto">
                {children}
              </code>
            )
          },
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-cyan hover:text-brand-cyan-light underline underline-offset-2"
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-brand-cyan/50 pl-3 italic text-white/70">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
