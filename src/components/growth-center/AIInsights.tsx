import { Bot, ClipboardList } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, FadeIn } from '../../builder-ui'
import type { AIInsightData } from '../../types/growthCenter'
import { GlassShell } from './GlassShell'

interface AIInsightsProps {
  data: AIInsightData
  onGeneratePlan?: () => void
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function AIInsights({ data, onGeneratePlan }: AIInsightsProps) {
  const bullets = data.bullets.map((text) =>
    text.includes('R$ 18.700') || text.includes('18.700')
      ? text.replace(/R\$ [\d.]+/, formatCurrency(data.potencialReativacao))
      : text,
  )

  return (
    <FadeIn delay={0.1}>
      <GlassShell glow className="p-6 lg:p-8 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-fg-strong">IA Gestora</h2>
            <p className="text-xs text-text-muted">Análise dos últimos 90 dias</p>
          </div>
        </div>

        <p className="text-sm font-medium text-fg-secondary mb-4">Analisando os últimos 90 dias percebemos:</p>

        <ul className="space-y-3 flex-1 mb-6">
          {bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              className="flex gap-3 text-sm text-fg-secondary leading-relaxed"
            >
              <span className="text-primary-light font-bold shrink-0">•</span>
              <span>{bullet}</span>
            </motion.li>
          ))}
        </ul>

        <Button
          variant="primary"
          size="md"
          icon={<ClipboardList className="w-4 h-4" />}
          onClick={onGeneratePlan}
          className="self-start"
        >
          Gerar Plano Completo
        </Button>
      </GlassShell>
    </FadeIn>
  )
}
