import { Clock, Target, TrendingUp, Zap } from 'lucide-react'
import { FadeIn } from '../../builder-ui'
import type { ExecutionMission } from '../../types/executionCenter'
import { priorityMeta } from '../intelligence-center/utils'
import { formatCurrency } from './utils'
import { GlassPanel } from '../intelligence-center/GlassPanel'

interface ExecutivePanelProps {
  mission: ExecutionMission
}

export function ExecutivePanel({ mission }: ExecutivePanelProps) {
  const prio = priorityMeta[mission.prioridade]

  return (
    <FadeIn delay={0.06}>
      <GlassPanel className="p-6 lg:p-8 h-full sticky top-24">
        <p className="text-xs font-bold uppercase tracking-widest text-primary-light mb-2">Painel executivo</p>
        <h1 className="font-display text-2xl lg:text-3xl font-bold text-fg-strong tracking-tight mb-6">
          {mission.titulo}
        </h1>

        <div className="rounded-2xl bg-surface/60 dark:bg-white/[0.03] border border-gray-100/80 dark:border-white/[0.06] p-5 mb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Objetivo</p>
          <p className="text-sm text-fg-secondary leading-relaxed">{mission.objetivo}</p>
        </div>

        <dl className="space-y-5">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Impacto financeiro esperado</dt>
              <dd className="font-display text-2xl font-bold text-success mt-0.5">{formatCurrency(mission.impactoFinanceiro)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Target className="w-5 h-5 text-primary-light shrink-0 mt-0.5" />
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Valor recuperável (meta)</dt>
              <dd className="font-display text-xl font-bold text-primary-light mt-0.5">{formatCurrency(mission.metaRecuperacao)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Probabilidade de sucesso</dt>
              <dd className="font-display text-xl font-bold text-fg-strong mt-0.5">{mission.probabilidadeSucesso}%</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Tempo estimado</dt>
              <dd className="font-display text-xl font-bold text-fg-strong mt-0.5">{mission.tempoEstimadoMinutos} minutos</dd>
            </div>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Grau de prioridade</dt>
            <dd>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${prio.className}`}>
                {prio.label}
              </span>
            </dd>
          </div>
        </dl>
      </GlassPanel>
    </FadeIn>
  )
}
