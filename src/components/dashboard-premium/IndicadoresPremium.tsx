import {
  Activity,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { FadeIn } from '../../builder-ui'
import type { IndicadorPremium } from '../../types/dashboardPremium'
import { GlassCard } from './GlassCard'

interface Props {
  indicadores: IndicadorPremium[]
}

const iconMap: Record<string, typeof DollarSign> = {
  'Receita Recuperada': TrendingUp,
  'Receita Perdida': TrendingDown,
  'Pacientes Ativos': Users,
  Faltas: Activity,
  Conversão: UserCheck,
  'Ticket Médio': DollarSign,
  'Tempo Economizado': Clock,
}

function formatValue(item: IndicadorPremium): string {
  const decimals = item.decimals ?? 0
  switch (item.formato) {
    case 'moeda':
      return item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
    case 'percentual':
      return `${item.valor}%`
    case 'horas':
      return `${item.valor.toFixed(decimals)}${item.suffix ?? 'h'}`
    default:
      return item.valor.toLocaleString('pt-BR')
  }
}

export function IndicadoresPremium({ indicadores }: Props) {
  return (
    <FadeIn delay={0.14}>
      <div>
        <h2 className="font-display text-lg font-bold text-fg-strong mb-4">Indicadores</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
          {indicadores.map((item, index) => {
            const Icon = iconMap[item.label] ?? DollarSign
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
              >
                <GlassCard className="p-4 lg:p-5 h-full hover:border-primary/15 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary-light" />
                    </div>
                  </div>
                  <p className="text-xs text-text-muted font-medium mb-1">{item.label}</p>
                  <p className="font-display text-xl lg:text-2xl font-bold text-fg-strong tracking-tight">
                    {formatValue(item)}
                  </p>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </FadeIn>
  )
}
