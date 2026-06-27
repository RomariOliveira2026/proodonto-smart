import { CheckCircle2, CircleDashed, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '../../builder-ui'
import type { IntelligentTimelineItem, TimelineStatus } from '../../builder-intelligence/types/executive'
import { formatCurrency } from './utils'
import { GlassPanel } from './GlassPanel'

interface IntelligentTimelineProps {
  items: IntelligentTimelineItem[]
}

const statusMeta: Record<
  TimelineStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  concluido: { label: 'Concluído', icon: CheckCircle2, className: 'text-success bg-success/10' },
  em_execucao: { label: 'Em execução', icon: Loader2, className: 'text-primary-light bg-primary/10' },
  agendado: { label: 'Agendado', icon: CircleDashed, className: 'text-text-muted bg-surface' },
}

export function IntelligentTimeline({ items }: IntelligentTimelineProps) {
  return (
    <FadeIn delay={0.12}>
      <GlassPanel className="p-6 lg:p-8 h-full">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Automação · IA</p>
          <h2 className="font-display text-xl font-bold text-fg-strong">Timeline inteligente</h2>
          <p className="text-sm text-text-muted mt-1">Tudo o que a IA executou e agendou hoje por você.</p>
        </div>

        <ol className="relative space-y-0">
          <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gray-200/80 dark:bg-white/[0.08]" />

          {items.map((item, index) => {
            const meta = statusMeta[item.status]
            const Icon = meta.icon

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative flex gap-4 pb-6 last:pb-0"
              >
                <div
                  className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-gray-100/80 dark:border-white/[0.06] ${meta.className}`}
                >
                  <Icon className={`w-4 h-4 ${item.status === 'em_execucao' ? 'animate-spin' : ''}`} />
                </div>

                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary-light tabular-nums">{item.horario}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">{meta.label}</span>
                  </div>
                  <p className="text-sm text-fg-strong leading-relaxed mb-2">{item.acao}</p>
                  <p className="text-sm font-semibold text-success">{formatCurrency(item.impactoFinanceiro)}</p>
                </div>
              </motion.li>
            )
          })}
        </ol>
      </GlassPanel>
    </FadeIn>
  )
}
