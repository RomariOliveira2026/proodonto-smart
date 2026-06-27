import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedNumber, FadeIn } from '../../builder-ui'
import type { RevenueRecoveredPeriod } from '../../builder-intelligence/types/executive'
import { GlassPanel } from './GlassPanel'

interface RevenueRecoveredProps {
  data: RevenueRecoveredPeriod
  variacaoPercent?: number
}

const periods: { key: keyof RevenueRecoveredPeriod; label: string }[] = [
  { key: 'hoje', label: 'Hoje' },
  { key: 'semana', label: 'Semana' },
  { key: 'mes', label: 'Mês' },
  { key: 'ano', label: 'Ano' },
]

export function RevenueRecovered({ data, variacaoPercent = 18 }: RevenueRecoveredProps) {
  return (
    <FadeIn delay={0.08}>
      <GlassPanel glow className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Resultado financeiro</p>
            <h2 className="font-display text-xl lg:text-2xl font-bold text-fg-strong">Receita recuperada</h2>
            <p className="text-sm text-text-muted mt-1">Dinheiro que a IA ajudou a capturar — não apenas faturamento.</p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-bold shrink-0">
            <TrendingUp className="w-3.5 h-3.5" />
            +{variacaoPercent}% vs. mês anterior
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {periods.map((period, index) => (
            <motion.div
              key={period.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-gray-100/80 dark:border-white/[0.06] bg-surface/40 dark:bg-white/[0.02] p-5 lg:p-6 text-center"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-3">{period.label}</p>
              <p className="font-display text-2xl lg:text-3xl font-extrabold text-success tracking-tight">
                <AnimatedNumber value={data[period.key]} prefix="R$ " />
              </p>
            </motion.div>
          ))}
        </div>
      </GlassPanel>
    </FadeIn>
  )
}
