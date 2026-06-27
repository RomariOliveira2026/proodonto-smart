import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { type ReactNode } from 'react'
import { AnimatedNumber } from './AnimatedNumber'
import { CircularGauge } from './CircularGauge'

export interface ScoreComponente {
  label: string
  value: number
}

interface PatientScoreCardProps {
  nota: number
  grade: string
  label: string
  componentes: ScoreComponente[]
  className?: string
}

function gaugeColor(value: number): 'success' | 'warning' | 'orange' {
  if (value >= 90) return 'success'
  if (value >= 75) return 'warning'
  return 'orange'
}

export function PatientScoreCard({ nota, grade, label, componentes, className = '' }: PatientScoreCardProps) {
  const scoreColor = nota >= 90 ? 'text-success' : nota >= 75 ? 'text-warning' : 'text-orange-500'

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-primary/10 dark:border-primary/20 bg-card shadow-elevated ${className}`}>
      <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary-light/10 rounded-full blur-3xl" />

      <div className="relative p-6 lg:p-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-primary-light" />
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Builder Patient Score</span>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center shrink-0"
          >
            <div className={`w-32 h-32 rounded-full flex flex-col items-center justify-center border-4 ${
              nota >= 90 ? 'border-success/30 bg-success/5' : nota >= 75 ? 'border-warning/30 bg-warning/5' : 'border-orange-500/30 bg-orange-500/5'
            }`}>
              <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">Nota geral</span>
              <span className={`font-display text-5xl font-extrabold ${scoreColor}`}>
                <AnimatedNumber value={nota} />
              </span>
            </div>
            <span className={`mt-3 px-4 py-1 rounded-full font-display font-bold text-lg ${
              nota >= 90 ? 'bg-success/10 text-success' : nota >= 75 ? 'bg-warning/10 text-warning' : 'bg-orange-500/10 text-orange-500'
            }`}>
              {grade}
            </span>
            <p className={`mt-2 text-sm font-semibold ${scoreColor}`}>{label}</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 flex-1 w-full">
            {componentes.map((c) => (
              <CircularGauge
                key={c.label}
                label={c.label}
                value={c.value}
                color={gaugeColor(c.value)}
                size={72}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ExecutiveSummaryProps {
  nome: string
  paragrafos: string[]
  recomendacao: string
  icon?: ReactNode
  className?: string
}

export function ExecutiveSummary({ nome, paragrafos, recomendacao, icon, className = '' }: ExecutiveSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/5 via-card to-primary-light/5 p-6 lg:p-8 ${className}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          {icon ?? <Sparkles className="w-4 h-4 text-primary-light" />}
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Resumo Executivo · IA</span>
        </div>
        <h3 className="font-display text-xl font-bold text-fg-strong mb-4">{nome}</h3>
        <div className="space-y-2 mb-6">
          {paragrafos.map((p) => (
            <p key={p} className="text-sm text-fg-secondary font-light leading-relaxed">{p}</p>
          ))}
        </div>
        <div className="p-4 rounded-2xl bg-primary/8 border border-primary/15">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Recomendação</p>
          <p className="text-sm font-semibold text-fg-strong">{recomendacao}</p>
        </div>
      </div>
    </motion.div>
  )
}

interface DetailGridProps {
  items: { label: string; value: string; icon?: ReactNode }[]
  columns?: 2 | 3
  className?: string
}

export function DetailGrid({ items, columns = 2, className = '' }: DetailGridProps) {
  return (
    <div className={`grid gap-3 ${columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} ${className}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className="p-3.5 rounded-xl bg-surface/60 border border-gray-100/80 dark:border-border hover:border-primary/20 hover:bg-surface transition-colors group"
        >
          <div className="flex items-center gap-2 mb-1">
            {item.icon && <span className="text-primary opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</span>}
            <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{item.label}</p>
          </div>
          <p className="text-sm font-semibold text-fg-strong">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

interface MetricHeroProps {
  metrics: { label: string; value: number; prefix?: string; highlight?: boolean }[]
  className?: string
}

export function MetricHero({ metrics, className = '' }: MetricHeroProps) {
  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className={`p-5 rounded-2xl border transition-all hover:shadow-soft ${
            m.highlight
              ? 'col-span-2 bg-gradient-to-br from-primary/8 to-primary-light/5 border-primary/20'
              : 'bg-surface/50 border-gray-100 dark:border-border hover:border-primary/15'
          }`}
        >
          <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-2">{m.label}</p>
          <p className={`font-display font-extrabold tracking-tight ${m.highlight ? 'text-4xl text-primary' : 'text-2xl text-fg-strong'}`}>
            <AnimatedNumber value={m.value} prefix={m.prefix ?? 'R$ '} />
          </p>
        </motion.div>
      ))}
    </div>
  )
}

interface RiskMeterProps {
  riscos: { label: string; percentual: number }[]
  className?: string
}

export function RiskMeter({ riscos, className = '' }: RiskMeterProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {riscos.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <div className="flex justify-between text-sm mb-1.5">
            <span className="font-medium text-fg-secondary">{r.label}</span>
            <span className={`font-display font-bold ${r.percentual >= 15 ? 'text-error' : r.percentual >= 10 ? 'text-warning' : 'text-success'}`}>
              {r.percentual}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-surface overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${r.percentual}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`h-full rounded-full ${r.percentual >= 15 ? 'bg-error' : r.percentual >= 10 ? 'bg-warning' : 'bg-success'}`}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export interface JourneyStep {
  id: string
  label: string
  status: 'done' | 'current' | 'pending'
  data?: string
  responsavel?: string
  fotos?: number
  observacoes?: string
}

interface JourneyStepperProps {
  etapas: JourneyStep[]
  className?: string
}

export function JourneyStepper({ etapas, className = '' }: JourneyStepperProps) {
  return (
    <div className={`overflow-x-auto pb-2 -mx-1 px-1 ${className}`}>
      <div className="flex items-start gap-0 min-w-max">
        {etapas.map((etapa, i) => (
          <div key={etapa.id} className="flex items-start">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center w-36 group"
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border-2 transition-all group-hover:scale-105 ${
                etapa.status === 'done' ? 'bg-success border-success text-white shadow-sm' :
                etapa.status === 'current' ? 'bg-primary border-primary text-white shadow-glow' :
                'bg-card border-gray-200 dark:border-border text-gray-300'
              }`}>
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
              <p className={`text-xs font-semibold mt-2 text-center ${
                etapa.status === 'current' ? 'text-primary' : etapa.status === 'done' ? 'text-fg-secondary' : 'text-text-muted'
              }`}>
                {etapa.label}
              </p>
              {etapa.data && <p className="text-[10px] text-text-muted mt-0.5">{etapa.data}</p>}
              {etapa.responsavel && (
                <p className="text-[10px] text-primary/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{etapa.responsavel}</p>
              )}
              {(etapa.fotos || etapa.observacoes) && (
                <div className="mt-2 px-2 py-1.5 rounded-lg bg-surface/80 border border-gray-100 dark:border-border opacity-0 group-hover:opacity-100 transition-all text-center max-w-[130px]">
                  {etapa.fotos && <p className="text-[9px] text-text-muted">{etapa.fotos} fotos</p>}
                  {etapa.observacoes && <p className="text-[9px] text-fg-tertiary leading-tight mt-0.5">{etapa.observacoes}</p>}
                </div>
              )}
            </motion.div>
            {i < etapas.length - 1 && (
              <div className={`w-8 h-0.5 mt-5 shrink-0 ${etapa.status === 'done' ? 'bg-success' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface ChannelTimelineEvent {
  id: string
  canal: string
  data: string
  hora: string
  resumo: string
  icon: ReactNode
  direcao?: 'enviado' | 'recebido'
}

interface ChannelTimelineProps {
  eventos: ChannelTimelineEvent[]
  className?: string
}

export function ChannelTimeline({ eventos, className = '' }: ChannelTimelineProps) {
  return (
    <div className={`relative pl-6 ${className}`}>
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />
      <ul className="space-y-4">
        {eventos.map((ev, i) => (
          <motion.li
            key={ev.id}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="relative flex gap-3 group"
          >
            <div className="absolute -left-6 top-1 w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              {ev.icon}
            </div>
            <div className="flex-1 min-w-0 p-3 rounded-xl hover:bg-surface/60 transition-colors">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold text-primary">{ev.hora}</span>
                <span className="text-[10px] text-text-muted">{ev.data}</span>
                {ev.direcao && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    ev.direcao === 'recebido' ? 'bg-violet-100 text-violet-600 dark:bg-violet-950/40' : 'bg-sky-100 text-sky-600 dark:bg-sky-950/40'
                  }`}>
                    {ev.direcao === 'recebido' ? 'Recebido' : 'Enviado'}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-fg-secondary mt-1">{ev.resumo}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
