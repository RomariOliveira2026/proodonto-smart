import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react'
import { AnimatedNumber, Button } from '../../builder-ui'

const acoes = [
  'Confirmar consultas',
  'Cobrar parcelas',
  'Reativar pacientes',
  'Revisões',
  'Campanhas',
]

export function ReceitaRecuperavelCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl"
    >
      <div className="absolute inset-0 gradient-primary opacity-[0.97]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />

      <div className="relative p-8 lg:p-10 text-white">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-white/80" />
              <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">Oportunidade imediata</span>
            </div>
            <h2 className="font-display text-2xl lg:text-3xl font-bold tracking-tight">Receita Recuperável</h2>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 text-sm font-semibold">
            <ArrowUpRight className="w-4 h-4" />
            +24% potencial
          </div>
        </div>

        <p className="font-display text-5xl lg:text-6xl font-extrabold tracking-tight mb-2">
          <AnimatedNumber value={61840} prefix="R$ " />
        </p>
        <p className="text-white/70 text-sm mb-8">identificados pela IA nas próximas 30 dias</p>

        <div className="border-t border-white/15 pt-6">
          <p className="text-sm font-semibold text-white/90 mb-4">Como recuperar</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {acoes.map((acao, i) => (
              <motion.div
                key={acao}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer group"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-sm font-medium">{acao}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <Button
          variant="secondary"
          size="lg"
          className="mt-6 bg-white text-primary hover:bg-white/90 shadow-none"
        >
          Executar plano de recuperação
        </Button>
      </div>
    </motion.div>
  )
}
