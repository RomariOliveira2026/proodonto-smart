import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface ExecutiveShortcutMetric {
  label: string
  value: ReactNode
}

interface ExecutiveShortcutProps {
  to: string
  title: string
  subtitle: string
  cta: string
  icon: ReactNode
  badge?: ReactNode
  metrics?: ExecutiveShortcutMetric[]
  className?: string
}

export function ExecutiveShortcut({
  to,
  title,
  subtitle,
  cta,
  icon,
  badge,
  metrics,
  className = '',
}: ExecutiveShortcutProps) {
  return (
    <Link to={to} className={`block group ${className}`}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="relative overflow-hidden rounded-3xl border border-primary/15 dark:border-primary/25 bg-[#0a1628] shadow-elevated"
      >
        <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_top_right,rgba(29,167,224,0.18),transparent_55%)]" />
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_bottom_left,rgba(11,95,165,0.2),transparent_50%)]" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_60px_rgba(29,167,224,0.08)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-light/50 to-transparent" />

        <div className="relative p-6 lg:p-8 flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="flex items-start gap-4 lg:flex-1 min-w-0">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform duration-300">
                {icon}
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-success border-2 border-[#0a1628] animate-pulse" />
            </div>

            <div className="min-w-0">
              {badge && <div className="mb-2">{badge}</div>}
              <h2 className="font-display text-xl lg:text-2xl font-bold text-white tracking-tight group-hover:text-primary-light transition-colors">
                {title}
              </h2>
              <p className="text-white/55 text-sm font-light mt-1 max-w-xl">{subtitle}</p>
            </div>
          </div>

          {metrics && metrics.length > 0 && (
            <div className="flex flex-wrap gap-3 lg:gap-4">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] group-hover:bg-white/[0.09] group-hover:border-white/[0.12] transition-colors min-w-[120px]"
                >
                  <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">{m.label}</p>
                  <p className="font-display text-lg font-bold text-white mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-sm font-semibold text-primary-light shrink-0 group-hover:gap-3 transition-all">
            <span>{cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
