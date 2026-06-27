import type { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassCard({ children, className = '', glow }: GlassCardProps) {
  return (
    <div
      className={`rounded-3xl border border-gray-100/80 dark:border-white/[0.06] bg-card/90 dark:bg-[#141c2e]/80 backdrop-blur-xl shadow-soft overflow-hidden ${
        glow ? 'ring-1 ring-primary/10 dark:ring-primary-light/10' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
