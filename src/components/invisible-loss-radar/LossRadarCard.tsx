import { ArrowRight, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge, Button } from '../../builder-ui'
import type { InvisibleLossItem } from '../../types/intelligenceModules'
import type { DecisionPriority } from '../../builder-intelligence/types/executive'
import { formatCurrency, priorityMeta } from '../intelligence-center/utils'

const priorityBadge: Record<DecisionPriority, 'danger' | 'warning' | 'primary' | 'neutral'> = {
  critica: 'danger',
  alta: 'warning',
  media: 'primary',
  baixa: 'neutral',
}

interface LossRadarCardProps {
  item: InvisibleLossItem
  index: number
  onAnalyze: (item: InvisibleLossItem) => void
}

export function LossRadarCard({ item, index, onAnalyze }: LossRadarCardProps) {
  const prio = priorityMeta[item.prioridade]
  const badgeVariant = priorityBadge[item.prioridade]

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className="premium-panel p-6 lg:p-7 h-full flex flex-col hover:border-primary/20 transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <Badge variant={badgeVariant}>{prio.label}</Badge>
        <span className="font-display text-3xl font-extrabold text-primary tabular-nums">{item.quantidade}</span>
      </div>

      <h3 className="font-display text-lg font-bold text-fg-strong mb-2">{item.titulo}</h3>
      <p className="text-sm text-text-muted leading-relaxed mb-5 flex-1">{item.descricao}</p>

      <div className="mb-5">
        <p className="text-xs text-text-muted uppercase tracking-wider mb-1">Impacto estimado</p>
        <p className="font-display text-xl font-bold text-success">{formatCurrency(item.impactoFinanceiro)}</p>
      </div>

      <Button
        variant="outline"
        fullWidth
        icon={<Search className="w-4 h-4" />}
        onClick={() => onAnalyze(item)}
        className="group"
      >
        Analisar
        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </Button>
    </motion.div>
  )
}
