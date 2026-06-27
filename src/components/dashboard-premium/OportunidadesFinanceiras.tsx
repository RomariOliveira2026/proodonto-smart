import { ChevronRight, Wallet } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '../../builder-ui'
import type { OportunidadeFinanceira } from '../../types/dashboardPremium'
import { GlassCard } from './GlassCard'

interface Props {
  oportunidades: OportunidadeFinanceira[]
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function OportunidadesFinanceiras({ oportunidades }: Props) {
  return (
    <FadeIn delay={0.12}>
      <GlassCard className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary-light" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-fg-strong">Oportunidades Financeiras</h2>
            <p className="text-sm text-text-muted">Lista dinâmica priorizada pela IA.</p>
          </div>
        </div>

        <ul className="space-y-2">
          {oportunidades.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 p-4 rounded-2xl text-left border border-transparent hover:border-primary/15 hover:bg-primary/[0.03] transition-all group"
              >
                <div className="min-w-0">
                  <p className="font-medium text-fg-strong text-sm">{item.titulo}</p>
                  {item.quantidade != null && (
                    <p className="text-xs text-text-muted mt-0.5">{item.quantidade} casos identificados</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-display font-bold text-primary-light text-sm sm:text-base">
                    {formatCurrency(item.receitaEstimada)}
                  </span>
                  <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-primary-light transition-colors" />
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      </GlassCard>
    </FadeIn>
  )
}
