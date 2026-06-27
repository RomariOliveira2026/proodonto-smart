import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../builder-ui'
import type { ExecutiveDecision } from '../../builder-intelligence/types/executive'
import { formatCurrency, priorityMeta } from './utils'

interface DecisionCardProps {
  decision: ExecutiveDecision
  index?: number
  onExecute?: (decision: ExecutiveDecision) => void
  compact?: boolean
}

export function DecisionCard({ decision, index = 0, onExecute, compact }: DecisionCardProps) {
  const prio = priorityMeta[decision.prioridade]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group rounded-2xl border border-gray-100/80 dark:border-white/[0.05] bg-surface/40 dark:bg-white/[0.02] p-5 hover:border-primary/20 transition-colors ${
        compact ? '' : 'lg:p-6'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Problema</span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${prio.className}`}>
              {prio.label}
            </span>
          </div>
          <p className="font-medium text-fg-strong leading-snug">{decision.problema}</p>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Impacto financeiro</p>
            <p className="font-display text-xl font-bold text-primary-light">{formatCurrency(decision.impactoFinanceiro)}</p>
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Play className="w-3.5 h-3.5" />}
          onClick={() => onExecute?.(decision)}
          className="shrink-0 self-start sm:self-end"
        >
          Executar
        </Button>
      </div>
    </motion.div>
  )
}
