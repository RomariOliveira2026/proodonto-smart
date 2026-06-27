import { motion } from 'framer-motion'
import { Bot, CheckCircle2, Clock, DollarSign, RefreshCw, TrendingUp } from 'lucide-react'
import { AnimatedNumber } from '../../builder-ui'

const liveCards = [
  { label: 'Receita Recuperada Hoje', value: 4280, prefix: 'R$ ', icon: DollarSign, color: 'from-emerald-500 to-emerald-400', trend: '+18%' },
  { label: 'Consultas Confirmadas', value: 23, icon: CheckCircle2, color: 'from-primary to-primary-light', trend: '94%' },
  { label: 'Cobranças Recuperadas', value: 3150, prefix: 'R$ ', icon: RefreshCw, color: 'from-violet-500 to-violet-400', trend: '3 hoje' },
  { label: 'Pacientes Reativados', value: 7, icon: TrendingUp, color: 'from-amber-500 to-amber-400', trend: 'esta semana' },
  { label: 'Tempo economizado pela IA', value: 4.2, suffix: 'h', decimals: 1, icon: Bot, color: 'from-sky-500 to-sky-400', trend: 'hoje' },
]

export function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateY: -5 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary-light/20 rounded-3xl blur-2xl opacity-60" />
      <div className="relative bg-white rounded-3xl shadow-elevated border border-gray-100/80 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-surface/80 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Dashboard ao vivo
          </div>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <Clock className="w-3 h-3" />
            Atualizado agora
          </div>
        </div>

        <div className="p-5 lg:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-text-muted uppercase tracking-wider">ProOdonto Smart</p>
              <p className="font-display font-bold text-gray-900 text-lg">Dashboard Executivo</p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">Jun 2026</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            {liveCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="group p-4 rounded-xl bg-surface/60 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color} text-white shadow-sm`}>
                    <card.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[10px] font-semibold text-success bg-emerald-50 px-2 py-0.5 rounded-full">
                    {card.trend}
                  </span>
                </div>
                <p className="text-[11px] text-text-muted font-medium leading-tight mb-1">{card.label}</p>
                <p className="font-display text-xl font-bold text-gray-900">
                  <AnimatedNumber
                    value={card.value}
                    prefix={card.prefix}
                    suffix={card.suffix}
                    decimals={card.decimals}
                  />
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mini chart */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary-light/5 border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-700">Receita recuperada — 7 dias</p>
              <span className="text-xs font-bold text-success">+32%</span>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {[35, 52, 41, 68, 55, 82, 74].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.8 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
                  className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-sm opacity-80"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
