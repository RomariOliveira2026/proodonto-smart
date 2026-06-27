import { ArrowDownRight, ArrowUpRight, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedNumber, FadeIn } from '../../builder-ui'
import type { RevenueInsightItem } from '../../builder-intelligence/types/executive'
import { formatCurrency } from './utils'
import { GlassPanel } from './GlassPanel'

interface RevenueInsightsProps {
  receitaRecuperavel: number
  insights: RevenueInsightItem[]
}

const variantStyles: Record<RevenueInsightItem['variant'], string> = {
  potential: 'text-primary-light',
  at_risk: 'text-amber-400',
  recovered: 'text-success',
}

export function RevenueInsights({ receitaRecuperavel, insights }: RevenueInsightsProps) {
  return (
    <FadeIn delay={0.06}>
      <GlassPanel glow className="p-6 lg:p-8 h-full">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-fg-strong">Receita recuperável</h2>
            <p className="text-sm text-text-muted">Decisões com retorno financeiro direto</p>
          </div>
        </div>

        <p className="font-display text-4xl lg:text-5xl font-extrabold text-fg-strong tracking-tight mb-8">
          <AnimatedNumber value={receitaRecuperavel} prefix="R$ " />
        </p>

        <div className="grid grid-cols-2 gap-3">
          {insights
            .filter((i) => i.id !== 'ri1')
            .map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-gray-100/80 dark:border-white/[0.05] bg-surface/50 dark:bg-white/[0.02] p-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2">{item.label}</p>
                <p className={`font-display text-lg font-bold ${variantStyles[item.variant]}`}>
                  {formatCurrency(item.valor)}
                </p>
                {item.trendPercent != null && (
                  <p
                    className={`flex items-center gap-1 text-xs font-semibold mt-1 ${
                      item.trendPercent >= 0 ? 'text-success' : 'text-amber-400'
                    }`}
                  >
                    {item.trendPercent >= 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(item.trendPercent)}%
                  </p>
                )}
              </motion.div>
            ))}
        </div>
      </GlassPanel>
    </FadeIn>
  )
}
