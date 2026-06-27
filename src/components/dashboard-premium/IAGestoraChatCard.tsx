import { useNavigate } from 'react-router-dom'
import { BarChart3, Bot, ClipboardList, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button, FadeIn, useToast } from '../../builder-ui'
import { useBuilderIntelligence } from '../../builder-intelligence'
import { getGreetingPT } from '../../lib/dateTime'
import type { IAGestoraBriefing } from '../../types/dashboardPremium'
import { GlassCard } from './GlassCard'

interface Props {
  briefing: IAGestoraBriefing
  now: Date
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function IAGestoraChatCard({ briefing, now }: Props) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { setOpen } = useBuilderIntelligence()

  const greeting = getGreetingPT(now).replace(/!$/, '')

  return (
    <FadeIn delay={0.08}>
      <GlassCard glow className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-fg-strong">IA Gestora</h2>
            <p className="text-xs text-text-muted">Assistente administrativo · Builder Intelligence™</p>
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl rounded-tl-md bg-surface dark:bg-white/[0.04] border border-gray-100/80 dark:border-white/[0.06] p-4 sm:p-5"
          >
            <p className="text-sm text-fg-secondary leading-relaxed whitespace-pre-line">
              <span className="font-semibold text-fg-strong">{greeting}.</span>
              {'\n\n'}
              {briefing.mensagem.replace(
                /R\$ [\d.,]+/,
                formatCurrency(briefing.potencialIdentificado),
              )}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<ClipboardList className="w-4 h-4" />}
              onClick={() => {
                navigate('/app/oportunidades')
                showToast('Plano de ação — Central de Oportunidades aberta.')
              }}
            >
              Criar Plano
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => setOpen(true)}
            >
              Analisar Clínica
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<BarChart3 className="w-4 h-4" />}
              onClick={() => showToast('Relatório gerado — resumo executivo em breve via OpenAI.')}
            >
              Gerar Relatório
            </Button>
          </div>
        </div>
      </GlassCard>
    </FadeIn>
  )
}
