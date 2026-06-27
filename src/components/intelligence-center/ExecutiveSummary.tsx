import { Sparkles } from 'lucide-react'
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

          <div className="relative max-w-4xl">
            <Badge variant="primary" dot>Copiloto Executivo</Badge>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-fg-strong tracking-tight mt-5 mb-4"
            >
              {getDoctorGreeting(nome, now)}
            </motion.h1>

            <p className="text-lg sm:text-xl text-fg-secondary font-light leading-relaxed mb-6">
              {briefing.mensagemExecutiva}
            </p>

            <p className="text-base text-primary-light font-semibold mb-8">
              Objetivo financeiro de hoje: capturar {formatCurrency(briefing.receitaRecuperavel)} com ações de alto retorno.
            </p>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-primary-light" />
                <h2 className="font-display text-lg font-bold text-fg-strong">O que importa agora</h2>
              </div>
              <ul className="space-y-3">
                {briefing.resumoDia.map((line, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
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
