import { useState } from 'react'
import { Brain, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, FadeIn } from '../../builder-ui'
import type { ConsultantQuestion, ConsultantResponse } from '../../types/intelligenceModules'
import { buildConsultantResponse } from '../../lib/consultantVoice'
import { formatCurrency } from '../intelligence-center/utils'
import { GlassPanel } from '../intelligence-center/GlassPanel'

interface ConsultantPanelProps {
  perguntas: ConsultantQuestion[]
  onAction: (response: ConsultantResponse) => void
}

export function ConsultantPanel({ perguntas, onAction }: ConsultantPanelProps) {
  const [active, setActive] = useState<ConsultantResponse | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleAsk = (pergunta: ConsultantQuestion) => {
    setLoadingId(pergunta.id)
    window.setTimeout(() => {
      setActive(buildConsultantResponse(pergunta.queryKey))
      setLoadingId(null)
    }, 400)
  }

  return (
    <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
      <FadeIn className="lg:col-span-2">
        <GlassPanel glow className="p-6 lg:p-8 h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-light" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-fg-strong">Perguntas rápidas</h2>
              <p className="text-sm text-text-muted">Copiloto executivo — não é chat genérico.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {perguntas.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleAsk(p)}
                disabled={loadingId === p.id}
                className="text-left px-4 py-3 rounded-xl text-sm font-medium border border-gray-100/80 dark:border-white/[0.08] bg-surface/50 dark:bg-white/[0.03] text-fg-secondary hover:border-primary/25 hover:text-primary-light transition-all duration-200 disabled:opacity-60 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              >
                {loadingId === p.id ? 'Analisando operação…' : p.label}
              </button>
            ))}
          </div>
        </GlassPanel>
      </FadeIn>

      <FadeIn delay={0.08} className="lg:col-span-3">
        <GlassPanel className="p-6 lg:p-10 h-full min-h-[320px] flex flex-col">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key="answer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-4 h-4 text-primary-light" />
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Análise executiva</span>
                </div>

                <div className="space-y-5 flex-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Diagnóstico</p>
                    <p className="text-fg-secondary leading-relaxed">{active.diagnostico}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Impacto financeiro</p>
                    <p className="font-display text-2xl font-bold text-success">{formatCurrency(active.impactoFinanceiro)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Recomendação</p>
                    <p className="text-fg-secondary leading-relaxed">{active.recomendacao}</p>
                  </div>
                </div>

                <Button variant="glow" size="lg" className="mt-8 w-full sm:w-auto" onClick={() => onAction(active)}>
                  {active.actionLabel}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center px-4"
              >
                <Brain className="w-12 h-12 text-primary/20 mb-4" />
                <p className="text-text-muted max-w-sm">
                  Escolha uma pergunta à esquerda. Responderei com diagnóstico, impacto financeiro e plano de ação.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassPanel>
      </FadeIn>
    </div>
  )
}
