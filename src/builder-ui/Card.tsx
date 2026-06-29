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
  const baseClass = `bg-card rounded-2xl border border-gray-100/80 dark:border-white/[0.07] shadow-soft text-left w-full transition-all duration-300 ${glow ? 'shadow-glow border-primary/10 dark:border-primary/20' : ''} ${paddings[padding]} ${hover ? 'cursor-pointer hover:border-primary/15 dark:hover:border-primary/25 hover:shadow-elevated' : ''} ${className}`

  if (onClick) {
    return (
      <motion.button
        type="button"
        whileHover={hover ? { y: -2 } : undefined}
        whileTap={hover ? { scale: 0.995 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        onClick={onClick}
        className={baseClass}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={baseClass}
    >
      {children}
    </motion.div>
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
