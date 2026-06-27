import { useState } from 'react'
import { MessageCircle, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, FadeIn } from '../../builder-ui'
import type { ExecutiveAnswer, QuickQuestion } from '../../builder-intelligence/types/executive'
import { formatCurrency } from './utils'
import { GlassPanel } from './GlassPanel'

interface QuickQuestionsProps {
  perguntas: QuickQuestion[]
  onAsk: (pergunta: QuickQuestion) => ExecutiveAnswer
  onExecuteAnswer?: (answer: ExecutiveAnswer) => void
}

export function QuickQuestions({ perguntas, onAsk, onExecuteAnswer }: QuickQuestionsProps) {
  const [active, setActive] = useState<ExecutiveAnswer | null>(null)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleAsk = (pergunta: QuickQuestion) => {
    setLoadingId(pergunta.id)
    window.setTimeout(() => {
      setActive(onAsk(pergunta))
      setLoadingId(null)
    }, 350)
  }

  return (
    <FadeIn delay={0.1}>
      <GlassPanel glow className="p-6 lg:p-8 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary-light" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-fg-strong">Perguntas rápidas</h2>
            <p className="text-sm text-text-muted">Decisões em um clique — linguagem de diretor, não de sistema.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {perguntas.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleAsk(p)}
              disabled={loadingId === p.id}
              className="px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-100/80 dark:border-white/[0.08] bg-surface/50 dark:bg-white/[0.03] text-fg-secondary hover:border-primary/25 hover:text-primary-light transition-colors disabled:opacity-60"
            >
              {loadingId === p.id ? 'Analisando…' : p.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active ? (
            <motion.div
              key="answer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex-1 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-transparent p-5"
            >
              <div className="flex items-start gap-3 mb-3">
                <Sparkles className="w-4 h-4 text-primary-light shrink-0 mt-0.5" />
                <p className="text-sm text-fg-secondary leading-relaxed">{active.mensagem}</p>
              </div>
              {active.impactoFinanceiro != null && (
                <p className="text-sm font-bold text-success mb-4">
                  Potencial: {formatCurrency(active.impactoFinanceiro)}
                </p>
              )}
              {active.actionLabel && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onExecuteAnswer?.(active)}
                >
                  {active.actionLabel}
                </Button>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-text-muted italic"
            >
              Escolha uma pergunta — responderei como seu diretor executivo.
            </motion.p>
          )}
        </AnimatePresence>
      </GlassPanel>
    </FadeIn>
  )
}
