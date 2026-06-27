import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, max = 100, color = 'gradient-primary', className = '', showLabel }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100)
  const isGradient = color === 'gradient-primary'

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-xs mb-1">
          <span className="text-text-muted">{value}</span>
          <span className="font-semibold text-fg-secondary">{pct.toFixed(0)}%</span>
        </div>
      )}
      <div className="h-2 rounded-full bg-surface overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${isGradient ? 'gradient-primary' : ''}`}
          style={!isGradient ? { backgroundColor: color } : undefined}
        />
      </div>
    </div>
  )
}
