import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassPanel({ children, className = '', glow }: GlassPanelProps) {
  return (
    <div
      className={`rounded-3xl border border-gray-100/80 dark:border-white/[0.06] bg-card/95 dark:bg-[#101828]/80 backdrop-blur-xl shadow-soft ${
        glow ? 'ring-1 ring-primary/10 dark:ring-primary-light/10' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
