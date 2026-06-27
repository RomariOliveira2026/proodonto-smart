import { Link } from 'react-router-dom'
import { CheckCircle2, Clock, PartyPopper, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../builder-ui'
import type { MissionCompletionStats } from '../../types/executionCenter'
import { formatCurrency } from './utils'

interface MissionSummaryProps {
  stats: MissionCompletionStats
  onClose?: () => void
}

export function MissionSummary({ stats }: MissionSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.92, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="w-full max-w-lg rounded-3xl border border-gray-100/80 dark:border-white/[0.08] bg-card dark:bg-[#101828] shadow-elevated p-8 lg:p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
          className="w-16 h-16 rounded-2xl bg-success/15 flex items-center justify-center mx-auto mb-6"
        >
          <PartyPopper className="w-8 h-8 text-success" />
        </motion.div>

        <h2 className="font-display text-2xl lg:text-3xl font-bold text-fg-strong mb-2">Excelente trabalho.</h2>
        <p className="text-text-muted mb-8">Hoje sua clínica recuperou</p>

        <p className="font-display text-4xl lg:text-5xl font-extrabold text-success tracking-tight mb-6">
          {formatCurrency(stats.receitaRecuperada)}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
          <div className="flex items-center gap-2 text-fg-secondary">
            <CheckCircle2 className="w-4 h-4 text-success" />
            {stats.pacientesConcluidos} pacientes atendidos
          </div>
          <div className="flex items-center gap-2 text-fg-secondary">
            <Clock className="w-4 h-4 text-primary-light" />
            {stats.tempoInvestidoMinutos} min investidos
          </div>
          <div className="flex items-center gap-2 text-fg-secondary">
            <TrendingUp className="w-4 h-4 text-success" />
            Meta: {formatCurrency(stats.meta)}
          </div>
        </div>

        <Link to="/app">
          <Button variant="glow" size="lg" fullWidth>
            Voltar ao Centro de Inteligência
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
