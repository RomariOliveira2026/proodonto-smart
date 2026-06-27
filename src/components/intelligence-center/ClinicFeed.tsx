import { Bell, CheckCircle2, Sparkles, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '../../builder-ui'
import type { ClinicFeedItem } from '../../builder-intelligence/types/executive'
import { formatCurrency, priorityMeta } from './utils'
import { GlassPanel } from './GlassPanel'

interface ClinicFeedProps {
  items: ClinicFeedItem[]
}

const tipoMeta: Record<
  ClinicFeedItem['tipo'],
  { icon: typeof Bell; accent: string }
> = {
  decisao: { icon: Zap, accent: 'text-primary-light bg-primary/10' },
  alerta: { icon: Bell, accent: 'text-amber-400 bg-amber-500/10' },
  oportunidade: { icon: Sparkles, accent: 'text-primary-light bg-primary/10' },
  conquista: { icon: CheckCircle2, accent: 'text-success bg-success/10' },
}

export function ClinicFeed({ items }: ClinicFeedProps) {
  return (
    <FadeIn delay={0.12}>
      <GlassPanel className="p-6 lg:p-8 h-full">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Atenção imediata</p>
          <h2 className="font-display text-xl font-bold text-fg-strong">Feed da clínica</h2>
          <p className="text-sm text-text-muted mt-1">Somente o que merece sua atenção agora.</p>
        </div>

        <ul className="space-y-4">
          {items.map((item, index) => {
            const meta = tipoMeta[item.tipo]
            const Icon = meta.icon
            const prio = item.prioridade ? priorityMeta[item.prioridade] : null

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-4 rounded-2xl border border-gray-100/80 dark:border-white/[0.05] hover:border-primary/15 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${meta.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold text-fg-strong text-sm">{item.titulo}</p>
                    {prio && (
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full border ${prio.className}`}>
                        {prio.label}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{item.descricao}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-text-muted">
                    <span>{item.quando}</span>
                    {item.impactoFinanceiro != null && (
                      <span className="font-semibold text-primary-light">
                        {formatCurrency(item.impactoFinanceiro)}
                      </span>
                    )}
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>
      </GlassPanel>
    </FadeIn>
  )
}
