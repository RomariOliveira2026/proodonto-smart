import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ExecutionPatient } from '../../types/executionCenter'
import { formatCurrency } from './utils'

interface RecoveryCardProps {
  patient: ExecutionPatient
  expanded: boolean
  onToggleExpand: () => void
  isActive?: boolean
}

export function RecoveryCard({ patient, expanded, onToggleExpand, isActive }: RecoveryCardProps) {
  return (
    <motion.div
      layout
      className={`rounded-2xl border transition-colors ${
        isActive
          ? 'border-primary/30 bg-primary/[0.04] dark:bg-primary/[0.08] ring-1 ring-primary/10'
          : 'border-gray-100/80 dark:border-white/[0.06] bg-card/80 dark:bg-white/[0.02]'
      } overflow-hidden`}
    >
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full flex items-center gap-4 p-4 lg:p-5 text-left hover:bg-primary/[0.02] transition-colors"
      >
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
          {patient.avatarInitials}
        </div>
        <div className="flex-1 min-w-0 grid sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
          <div>
            <p className="font-semibold text-fg-strong truncate">{patient.nome}</p>
            <p className="text-xs text-text-muted">Último: {patient.ultimoAtendimento}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">Valor em aberto</p>
            <p className="font-display font-bold text-primary-light">{formatCurrency(patient.valorAberto)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">Dias em atraso</p>
            <p className="font-semibold text-amber-400">{patient.diasAtraso} dias</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-text-muted">Score IA</p>
            <p className="font-display font-bold text-success">{patient.scoreRecuperacao}%</p>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 lg:px-5 pb-5 pt-0 border-t border-gray-100/80 dark:border-white/[0.06]">
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Histórico</p>
                  <ul className="space-y-1">
                    {patient.historico.map((h) => (
                      <li key={h} className="text-sm text-fg-secondary">• {h}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Tratamentos</p>
                  <ul className="space-y-1">
                    {patient.tratamentos.map((t) => (
                      <li key={t} className="text-sm text-fg-secondary">• {t}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">Mensagens anteriores</p>
                  <ul className="space-y-1">
                    {patient.mensagensAnteriores.length === 0 ? (
                      <li className="text-sm text-text-muted italic">Nenhuma mensagem enviada</li>
                    ) : (
                      patient.mensagensAnteriores.map((m) => (
                        <li key={m} className="text-sm text-fg-secondary">• {m}</li>
                      ))
                    )}
                  </ul>
                </div>
                <div className="rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/10 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary-light mb-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Sugestão da IA
                  </p>
                  <p className="text-sm text-fg-secondary leading-relaxed">{patient.sugestaoIA}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
