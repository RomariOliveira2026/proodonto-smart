import { AlertTriangle, Sparkles, Target, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge, FadeIn } from '../../builder-ui'
import { getGreetingPT } from '../../lib/dateTime'
import type { ExecutiveBriefing } from '../../builder-intelligence/types/executive'
import { formatCurrency } from './utils'
import { GlassPanel } from './GlassPanel'

interface ExecutiveSummaryProps {
  nome: string
  now: Date
  briefing: ExecutiveBriefing
}

function getDoctorGreeting(nome: string, now: Date) {
  return `${getGreetingPT(now)}, Dr. ${nome.split(' ')[0]}.`
}

export function ExecutiveSummary({ nome, now, briefing }: ExecutiveSummaryProps) {
  return (
    <FadeIn>
      <GlassPanel glow className="overflow-hidden">
        <div className="relative p-8 lg:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary-light/[0.06] pointer-events-none" />

          <div className="relative">
            <Badge variant="primary" dot>Copiloto Executivo</Badge>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fg-strong tracking-tight mt-5 mb-3"
            >
              {getDoctorGreeting(nome, now)}
            </motion.h1>

            <p className="text-lg text-text-muted font-light max-w-3xl mb-8">
              Analisei sua operação. Estas são as <strong className="text-fg-secondary font-medium">decisões</strong> que
              merecem sua atenção hoje — não relatórios, mas ações com impacto financeiro.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Target, label: 'Oportunidades', value: briefing.oportunidadesCount, color: 'text-primary-light' },
                { icon: AlertTriangle, label: 'Riscos', value: briefing.riscosCount, color: 'text-amber-400' },
                {
                  icon: TrendingUp,
                  label: 'Recuperável hoje',
                  value: formatCurrency(briefing.receitaRecuperavel),
                  color: 'text-success',
                  isText: true,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  className="rounded-2xl border border-gray-100/80 dark:border-white/[0.06] bg-card/60 dark:bg-white/[0.03] p-5"
                >
                  <item.icon className={`w-5 h-5 mb-3 ${item.color}`} />
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-1">{item.label}</p>
                  <p className={`font-display text-2xl font-bold ${item.isText ? 'text-success' : 'text-fg-strong'}`}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary-light" />
                <h2 className="font-display text-lg font-bold text-fg-strong">Resumo do dia</h2>
              </div>
              <ul className="space-y-3">
                {briefing.resumoDia.map((line, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                    className="flex gap-3 text-sm text-fg-secondary leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-light mt-2 shrink-0" />
                    {line}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </GlassPanel>
    </FadeIn>
  )
}
