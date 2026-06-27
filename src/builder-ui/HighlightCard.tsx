import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { AnimatedNumber } from './AnimatedNumber'
import { Badge } from './Badge'
import { Button } from './Button'

type Variant = 'urgent' | 'warning' | 'opportunity' | 'neutral'

const styles: Record<Variant, { border: string; glow: string; badge: 'danger' | 'warning' | 'success' | 'primary' }> = {
  urgent: { border: 'border-red-200/80 dark:border-red-900/40', glow: 'hover:shadow-[0_20px_48px_rgba(220,38,38,0.12)]', badge: 'danger' },
  warning: { border: 'border-amber-200/80 dark:border-amber-900/40', glow: 'hover:shadow-[0_20px_48px_rgba(245,158,11,0.12)]', badge: 'warning' },
  opportunity: { border: 'border-emerald-200/80 dark:border-emerald-900/40', glow: 'hover:shadow-[0_20px_48px_rgba(22,163,74,0.12)]', badge: 'success' },
  neutral: { border: 'border-gray-100 dark:border-border', glow: 'hover:shadow-glow', badge: 'primary' },
}

interface HighlightCardProps {
  badge: string
  titulo: string
  valor?: number
  quantidade?: number
  cta: string
  variant?: Variant
  onAction: () => void
  children?: ReactNode
}

export function HighlightCard({
  badge,
  titulo,
  valor,
  quantidade,
  cta,
  variant = 'neutral',
  onAction,
}: HighlightCardProps) {
  const s = styles[variant]

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={`relative bg-card rounded-3xl border p-6 lg:p-8 shadow-soft ${s.border} ${s.glow} transition-shadow duration-300 h-full flex flex-col`}
    >
      <Badge variant={s.badge}>{badge}</Badge>
      <h3 className="font-display text-xl lg:text-2xl font-bold text-fg-strong mt-4 leading-tight">{titulo}</h3>

      {quantidade !== undefined && (
        <p className="font-display text-4xl font-extrabold text-primary mt-4">
          <AnimatedNumber value={quantidade} />
        </p>
      )}

      {valor !== undefined && (
        <div className="mt-3">
          <p className="text-xs text-text-muted uppercase tracking-wider">Receita</p>
          <p className="font-display text-2xl font-bold text-fg-strong">
            <AnimatedNumber value={valor} prefix="R$ " />
          </p>
        </div>
      )}

      <div className="mt-auto pt-6">
        <Button
          variant={variant === 'urgent' ? 'glow' : 'outline'}
          fullWidth
          onClick={onAction}
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  )
}
