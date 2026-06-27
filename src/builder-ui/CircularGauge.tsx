import { motion } from 'framer-motion'

type GaugeColor = 'success' | 'warning' | 'orange'

const strokeColors: Record<GaugeColor, string> = {
  success: '#16A34A',
  warning: '#F59E0B',
  orange: '#F97316',
}

const bgColors: Record<GaugeColor, string> = {
  success: 'text-success',
  warning: 'text-warning',
  orange: 'text-orange-500',
}

interface CircularGaugeProps {
  label: string
  value: number
  color: GaugeColor
  size?: number
}

export function CircularGauge({ label, value, color, size = 88 }: CircularGaugeProps) {
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2 group" title={`${label}: ${value}%`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-gray-100 dark:text-gray-800"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColors[color]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-display font-bold text-lg ${bgColors[color]}`}>{value}%</span>
        </div>
      </div>
      <p className="text-xs font-medium text-text-muted text-center leading-tight group-hover:text-primary transition-colors">{label}</p>
    </div>
  )
}
