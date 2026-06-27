import { motion } from 'framer-motion'
import { AnimatedNumber } from '../../builder-ui'
import type { LiveIntelligenceStats } from '../../builder-intelligence/types/liveIntelligence'
import { formatTempoEconomizado } from '../../builder-intelligence/data/liveIntelligenceSnapshot'

interface RecoveryCounterProps {
  stats: LiveIntelligenceStats
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function RecoveryCounter({ stats }: RecoveryCounterProps) {
  const items = [
    { label: 'Hoje a IA já economizou', value: formatTempoEconomizado(stats.tempoEconomizadoMinutos), animate: false },
    { label: 'Receita recuperada', value: formatCurrency(stats.receitaRecuperada), animate: true, raw: stats.receitaRecuperada },
    { label: 'Mensagens geradas', value: String(stats.mensagensGeradas), animate: true, raw: stats.mensagensGeradas },
    { label: 'Pacientes reativados', value: String(stats.pacientesReativados), animate: true, raw: stats.pacientesReativados },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 lg:gap-4">
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-2xl border border-gray-100/80 dark:border-white/[0.06] bg-surface/40 dark:bg-white/[0.02] p-4"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2 leading-snug">{item.label}</p>
          <p className="font-display text-lg lg:text-xl font-bold text-fg-strong">
            {item.animate && item.raw != null && item.label.includes('Receita') ? (
              <AnimatedNumber value={item.raw} prefix="R$ " />
            ) : item.animate && item.raw != null ? (
              <AnimatedNumber value={item.raw} />
            ) : (
              item.value
            )}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
