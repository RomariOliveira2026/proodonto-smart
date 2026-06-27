import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  onClick?: () => void
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

export function Card({ children, className = '', hover, glow, padding = 'md', onClick }: CardProps) {
  const Component = onClick ? motion.button : motion.div
  return (
    <Component
      whileHover={hover ? { y: -2, boxShadow: '0 20px 48px rgba(11, 95, 165, 0.12)' } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onClick={onClick}
      className={`bg-card rounded-2xl border border-gray-100/80 dark:border-border shadow-soft text-left w-full ${glow ? 'shadow-glow border-primary/10 dark:border-primary/20' : ''} ${paddings[padding]} ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </Component>
  )
}

export function CardHeader({
  title,
  subtitle,
  action,
  badge,
}: {
  title: string
  subtitle?: string
  action?: ReactNode
  badge?: ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-display text-lg font-bold text-fg-strong tracking-tight">{title}</h3>
          {badge}
        </div>
        {subtitle && <p className="text-sm text-text-muted mt-1 font-light">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}
