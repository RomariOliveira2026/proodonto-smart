import type { ReactNode } from 'react'

interface GlassPanelProps {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassPanel({ children, className = '', glow }: GlassPanelProps) {
  return (
    <div className={`premium-panel ${glow ? 'premium-panel-glow' : ''} ${className}`}>
      {children}
    </div>
  )
}
