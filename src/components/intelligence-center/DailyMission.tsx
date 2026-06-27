import { Clock, Play, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, FadeIn } from '../../builder-ui'
import type { DailyMissionFocus } from '../../builder-intelligence/types/executive'
import { formatCurrency, priorityMeta } from './utils'
import { GlassPanel } from './GlassPanel'

interface DailyMissionProps {
  missao: DailyMissionFocus
  onExecute?: (missao: DailyMissionFocus) => void
}

export function DailyMission({ missao, onExecute }: DailyMissionProps) {
  const prio = priorityMeta[missao.prioridade]

  return (
    <FadeIn delay={0.06}>
      <GlassPanel glow className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.97]" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-8 lg:p-10 text-white">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              Missão do dia
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border bg-white/10 border-white/20`}>
              Prioridade {prio.label}
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4"
          >
            {missao.titulo}
          </motion.h2>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
            {missao.mensagemExecutiva}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Impacto estimado</p>
                <p className="font-display text-3xl sm:text-4xl font-extrabold">{formatCurrency(missao.impactoFinanceiro)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/60 mb-1">Tempo para executar</p>
                <p className="font-display text-3xl font-bold flex items-center gap-2">
                  <Clock className="w-7 h-7 text-white/80" />
                  {missao.tempoExecucaoMinutos} min
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="lg"
              icon={<Play className="w-5 h-5 text-primary" />}
              onClick={() => onExecute?.(missao)}
              className="!bg-white !text-primary hover:!bg-white/90 !border-white/20 shadow-soft [&_svg]:text-primary shrink-0"
            >
              Executar Agora
            </Button>
          </div>
        </div>
      </GlassPanel>
    </FadeIn>
  )
}
