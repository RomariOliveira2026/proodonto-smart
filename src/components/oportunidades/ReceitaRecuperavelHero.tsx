import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { AnimatedNumber } from '../../builder-ui'

interface ReceitaRecuperavelHeroProps {
  valor: number
}

export function ReceitaRecuperavelHero({ valor }: ReceitaRecuperavelHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0 gradient-primary" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary-light/20 rounded-full blur-3xl" />

      <div className="relative px-8 py-10 lg:px-12 lg:py-14 text-white">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-white/80" />
              <span className="text-sm font-semibold text-white/70 uppercase tracking-widest">Dinheiro escondido na operação</span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold tracking-tight mb-2">Receita Recuperável</h2>
            <p className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <AnimatedNumber value={valor} prefix="R$ " />
            </p>
            <p className="text-white/70 text-base lg:text-lg mt-4 max-w-lg font-light">
              Valor estimado para recuperação nos próximos 30 dias.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 self-start lg:self-auto">
            <ArrowUpRight className="w-5 h-5" />
            <div>
              <p className="text-xs text-white/60">vs. mês anterior</p>
              <p className="font-display font-bold text-xl">+27%</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
