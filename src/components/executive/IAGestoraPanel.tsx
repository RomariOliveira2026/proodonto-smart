import { motion } from 'framer-motion'
import { Bot, Calendar, CreditCard, Megaphone, RefreshCw, Sparkles, Users } from 'lucide-react'
import { Badge, Button } from '../../builder-ui'
import { AnimatedNumber } from '../../builder-ui'

const sugestoes = [
  { label: 'Enviar confirmação automática', icon: Calendar, impact: 'R$ 8.200', color: 'bg-sky-500/10 text-sky-600' },
  { label: 'Lançar campanha de revisão', icon: Megaphone, impact: 'R$ 6.400', color: 'bg-violet-500/10 text-violet-600' },
  { label: 'Cobrar parcelas vencidas', icon: CreditCard, impact: 'R$ 5.100', color: 'bg-amber-500/10 text-amber-600' },
  { label: 'Reativar pacientes inativos', icon: RefreshCw, impact: 'R$ 4.600', color: 'bg-emerald-500/10 text-emerald-600' },
]

const alertas = [
  { value: 17, label: 'pacientes aguardando confirmação', icon: Calendar },
  { value: 9, label: 'parcelas vencidas', icon: CreditCard },
  { value: 12, label: 'pacientes aptos para revisão', icon: Users },
]

export function IAGestoraPanel({ compact }: { compact?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-primary/10 dark:border-primary/20 bg-card shadow-elevated ${compact ? '' : ''}`}>
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-light/10 rounded-full blur-3xl" />

      <div className="relative p-6 lg:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-display text-xl font-bold text-fg-strong">IA Gestora</h3>
              <Badge variant="primary" dot>Diretora Executiva Virtual</Badge>
            </div>
            <p className="text-sm text-text-muted mt-1 font-light">Análise em tempo real · Sem diagnóstico clínico</p>
          </div>
          <Sparkles className="w-5 h-5 text-primary-light hidden sm:block" />
        </div>

        <div className="p-5 rounded-2xl bg-surface/80 border border-gray-100 dark:border-border mb-6">
          <p className="font-display text-lg text-fg-strong mb-4">
            Bom dia, <span className="text-primary font-bold">João Thales</span>.
          </p>
          <p className="text-sm text-text-muted mb-4">Hoje existem:</p>
          <div className="space-y-3">
            {alertas.map((a, i) => (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                  <a.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-fg-secondary">
                  <strong className="font-display text-primary text-lg">{a.value}</strong>{' '}
                  <span className="text-sm">{a.label}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-light/5 border border-primary/10 mb-6">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Receita potencial</p>
          <p className="font-display text-3xl font-bold text-gradient">
            <AnimatedNumber value={24300} prefix="R$ " />
          </p>
          <p className="text-xs text-text-muted mt-1">se todas as ações forem executadas hoje</p>
        </div>

        <p className="text-sm font-semibold text-fg-secondary mb-3">Sugestões da IA Gestora</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {sugestoes.map((s, i) => (
            <motion.button
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-border bg-card hover:shadow-soft hover:border-primary/20 transition-all text-left group"
            >
              <div className={`p-2.5 rounded-xl ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-fg-secondary group-hover:text-primary transition-colors">{s.label}</p>
                <p className="text-xs font-semibold text-success">{s.impact}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {!compact && (
          <div className="mt-6 p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-800/40">
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
              <strong>Aviso:</strong> A IA Gestora atua exclusivamente em apoio administrativo, comercial e financeiro.
              Não realiza diagnóstico odontológico. Orientações clínicas devem ser confirmadas por profissional habilitado (CRO).
            </p>
          </div>
        )}

        <Button variant="glow" fullWidth className="mt-6" size="lg">
          Executar todas as sugestões
        </Button>
      </div>
    </div>
  )
}
