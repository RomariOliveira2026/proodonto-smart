import type { ReactNode } from 'react'

interface GlassShellProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassShell({ children, className = '', glow }: GlassShellProps) {
  return (
    <div
      className={`rounded-3xl border border-gray-100/80 dark:border-white/[0.06] bg-card/95 dark:bg-[#121a2b]/75 backdrop-blur-xl shadow-soft ${
        glow ? 'ring-1 ring-primary/10 dark:ring-primary-light/10' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
