import { motion } from 'framer-motion'
import { FadeIn } from '../../builder-ui'
import { formatCurrency } from './utils'
import { GlassPanel } from '../intelligence-center/GlassPanel'

interface MissionProgressProps {
  concluidos: number
  total: number
  receitaRecuperada: number
  meta: number
}

export function MissionProgress({ concluidos, total, receitaRecuperada, meta }: MissionProgressProps) {
  const progress = total > 0 ? (concluidos / total) * 100 : 0

  return (
    <FadeIn delay={0.04}>
      <GlassPanel glow className="p-5 lg:p-6 mb-8">
        <div className="grid sm:grid-cols-3 gap-6 mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Missão</p>
            <p className="font-display text-2xl font-bold text-fg-strong">
              {concluidos} <span className="text-text-muted font-medium text-lg">de {total}</span>{' '}
              <span className="text-sm font-semibold text-success">concluídas</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Receita recuperada</p>
            <motion.p
              key={receitaRecuperada}
              initial={{ scale: 1.05, color: 'var(--color-success)' }}
              animate={{ scale: 1 }}
              className="font-display text-2xl font-bold text-success"
            >
              {formatCurrency(receitaRecuperada)}
            </motion.p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Meta</p>
            <p className="font-display text-2xl font-bold text-primary-light">{formatCurrency(meta)}</p>
          </div>
        </div>

        <div className="h-2.5 rounded-full bg-surface overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="text-xs text-text-muted mt-2 text-right">{Math.round(progress)}% da meta</p>
      </GlassPanel>
    </FadeIn>
  )
}
