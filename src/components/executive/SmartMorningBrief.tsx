import { motion } from 'framer-motion'
import { Calendar, CreditCard, Target, TrendingUp, UserPlus, UserX } from 'lucide-react'
import { AnimatedNumber, Badge } from '../../builder-ui'

const resumo = [
  { label: 'Receita prevista', value: 18420, prefix: 'R$ ', icon: TrendingUp, color: 'text-success' },
  { label: 'Consultas hoje', value: 28, icon: Calendar, color: 'text-primary' },
  { label: 'Risco de faltas', value: 4, icon: UserX, color: 'text-warning' },
  { label: 'Cobranças pendentes', value: 9, icon: CreditCard, color: 'text-error' },
  { label: 'Pacientes novos', value: 3, icon: UserPlus, color: 'text-primary-light' },
  { label: 'Meta do dia', value: 87, suffix: '%', icon: Target, color: 'text-success' },
]

export function SmartMorningBrief() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Badge variant="primary" dot>Smart Morning</Badge>
        <p className="font-display text-5xl font-light text-gray-300 dark:text-gray-600 mt-6 mb-2">07:00</p>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight">
          Bom dia, <span className="text-gradient">João Thales</span>.
        </h1>
        <p className="text-text-muted mt-2 font-light">Quinta-feira, 25 de junho de 2026 · Unidade Lagarto</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {resumo.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.06 }}
            className="p-5 rounded-2xl bg-card border border-gray-100 dark:border-border shadow-soft hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center gap-2 mb-3">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <p className="text-xs font-medium text-text-muted">{item.label}</p>
            </div>
            <p className={`font-display text-2xl font-bold ${item.color}`}>
              <AnimatedNumber value={item.value} prefix={item.prefix} suffix={item.suffix} />
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center text-sm text-text-muted"
      >
        Leitura em menos de 30 segundos · Atualizado às 07:00
      </motion.p>
    </div>
  )
}
