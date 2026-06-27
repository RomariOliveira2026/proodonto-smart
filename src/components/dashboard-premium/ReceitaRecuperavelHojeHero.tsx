import { Link } from 'react-router-dom'
import { ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedNumber, Button, FadeIn } from '../../builder-ui'
import type { ReceitaRecuperavelHoje } from '../../types/dashboardPremium'

interface Props {
  data: ReceitaRecuperavelHoje
}

export function ReceitaRecuperavelHojeHero({ data }: Props) {
  return (
    <FadeIn delay={0.05}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 gradient-primary opacity-[0.97]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        <div className="relative p-8 lg:p-10 text-white">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Card principal
              </div>
              <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">
                Receita Recuperável Hoje
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 text-sm font-semibold self-start">
              <TrendingUp className="w-4 h-4" />
              +{data.variacaoSemanalPercent}% vs. semana passada
            </div>
          </div>

          <p className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-2">
            <AnimatedNumber value={data.valor} prefix="R$ " />
          </p>
          <p className="text-white/70 text-sm mb-8 max-w-md">
            Valor estimado recuperável com as ações prioritárias identificadas pela IA para hoje.
          </p>

          <Link to="/app/oportunidades" className="inline-flex">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowUpRight className="w-5 h-5 text-primary" />}
              className="!bg-white !text-primary hover:!bg-white/90 !border-white/20 shadow-soft [&_svg]:text-primary"
            >
              Ver oportunidades
            </Button>
          </Link>
        </div>
      </motion.div>
    </FadeIn>
  )
}
