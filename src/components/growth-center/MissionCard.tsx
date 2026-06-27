import type { ReactNode } from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../../builder-ui'
import { GlassShell } from './GlassShell'

interface MissionCardProps {
  icon: ReactNode
  titulo: string
  descricao: string
  valorFinanceiro: number
  index?: number
  onExecute?: () => void
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function MissionCard({
  icon,
  titulo,
  descricao,
  valorFinanceiro,
  index = 0,
  onExecute,
}: MissionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassShell className="p-6 h-full flex flex-col hover:border-primary/20 transition-colors group">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary/15 flex items-center justify-center text-primary-light mb-5 group-hover:scale-105 transition-transform">
          {icon}
        </div>

        <h3 className="font-display text-lg font-bold text-fg-strong mb-1">{titulo}</h3>
        <p className="text-sm text-text-muted leading-relaxed flex-1">{descricao}</p>

        <div className="mt-5 pt-5 border-t border-gray-100/80 dark:border-white/[0.06] flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-0.5">Impacto</p>
            <p className="font-display text-xl font-bold text-primary-light">{formatCurrency(valorFinanceiro)}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={<Play className="w-3.5 h-3.5" />}
            onClick={onExecute}
            className="shrink-0"
          >
            Executar
          </Button>
        </div>
      </GlassShell>
    </motion.div>
  )
}
