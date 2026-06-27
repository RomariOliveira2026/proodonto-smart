import { motion } from 'framer-motion'
import { AnimatedNumber } from '../../builder-ui'

interface RevenueGaugeProps {
  label: string
  value: number
  max?: number
}

export function RevenueGauge({ label, value, max = 20000 }: RevenueGaugeProps) {
  const radius = 88
  const stroke = 10
  const normalizedRadius = radius - stroke / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const progress = Math.min(value / max, 1)
  const strokeDashoffset = circumference - progress * circumference * 0.75

  return (
    <div className="relative flex flex-col items-center justify-center shrink-0">
      <svg width={radius * 2} height={radius * 2} className="-rotate-[135deg]">
        <circle
          stroke="rgba(255,255,255,0.12)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeLinecap="round"
        />
        <motion.circle
          stroke="url(#gaugeGradient)"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#1DA7E0" stopOpacity={1} />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/70 mb-1">{label}</p>
        <p className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          <AnimatedNumber value={value} prefix="R$ " />
        </p>
      </div>
    </div>
  )
}
