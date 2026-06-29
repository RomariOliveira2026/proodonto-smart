import type { ReactNode } from 'react'

interface GlassShellProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassShell({ children, className = '', glow }: GlassShellProps) {
  return (
    <div className={`premium-panel ${glow ? 'premium-panel-glow' : ''} ${className}`}>
      {children}
    </div>
  )
}
