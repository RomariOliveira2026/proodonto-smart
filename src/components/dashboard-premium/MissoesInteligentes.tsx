import { CheckCircle2, Play, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, FadeIn, useToast } from '../../builder-ui'
import type { MissaoInteligente, MissionPriority } from '../../types/dashboardPremium'
import { GlassCard } from './GlassCard'

interface Props {
  missoes: MissaoInteligente[]
}

const priorityStyles: Record<MissionPriority, { label: string; className: string }> = {
  alta: { label: 'Alta', className: 'bg-red-500/15 text-red-400 border-red-500/20' },
  media: { label: 'Média', className: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
  baixa: { label: 'Baixa', className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function MissoesInteligentes({ missoes }: Props) {
  const { showToast } = useToast()

  const handleExecutar = (missao: MissaoInteligente) => {
    showToast(`Missão iniciada: ${missao.titulo} · ${formatCurrency(missao.valorEstimado)}`)
  }

  return (
    <FadeIn delay={0.1}>
      <GlassCard className="p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-primary-light text-xs font-semibold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              IA · Tarefas do dia
            </div>
            <h2 className="font-display text-xl font-bold text-fg-strong">Missões Inteligentes do Dia</h2>
            <p className="text-sm text-text-muted mt-1">Geradas automaticamente com base nos dados da clínica.</p>
          </div>
          <span className="text-xs text-text-muted shrink-0">{missoes.length} missões</span>
        </div>

        <ul className="space-y-3">
          {missoes.map((missao, index) => {
            const prio = priorityStyles[missao.prioridade]
            return (
              <motion.li
                key={missao.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-2xl border border-gray-100/80 dark:border-white/[0.05] bg-surface/50 dark:bg-white/[0.02] hover:border-primary/20 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-primary-light shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-fg-strong text-sm sm:text-base">{missao.titulo}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${prio.className}`}>
                      {prio.label}
                    </span>
                    <span className="text-xs text-text-muted">
                      Valor estimado: <strong className="text-fg-secondary">{formatCurrency(missao.valorEstimado)}</strong>
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Play className="w-3.5 h-3.5" />}
                  onClick={() => handleExecutar(missao)}
                  className="shrink-0 self-start sm:self-center"
                >
                  Executar
                </Button>
              </motion.li>
            )
          })}
        </ul>
      </GlassCard>
    </FadeIn>
  )
}
