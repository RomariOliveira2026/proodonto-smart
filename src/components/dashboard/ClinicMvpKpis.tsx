import { Link } from 'react-router-dom'
import { CreditCard, RefreshCw, Sparkles, UserX, TrendingUp } from 'lucide-react'
import { FadeIn, AnimatedNumber } from '../../builder-ui'
import { RECEITA_RECUPERAVEL } from '../../data/oportunidades'

const kpis = [
  { label: 'Receita recuperável', value: RECEITA_RECUPERAVEL, prefix: 'R$ ', icon: TrendingUp, color: 'text-success', href: '/app/oportunidades' },
  { label: 'Faltas previstas', value: 4, icon: UserX, color: 'text-warning', href: '/app/agenda' },
  { label: 'Cobranças pendentes', value: 9, icon: CreditCard, color: 'text-error', href: '/app/financeiro' },
  { label: 'Pacientes sem retorno', value: 12, icon: RefreshCw, color: 'text-violet-600', href: '/app/pacientes' },
  { label: 'Oportunidades de upsell', value: 31, icon: Sparkles, color: 'text-primary-light', href: '/app/oportunidades' },
]

export function ClinicMvpKpis() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpis.map((kpi, i) => (
        <FadeIn key={kpi.label} delay={i * 0.05}>
          <Link
            to={kpi.href}
            className="block p-5 rounded-2xl bg-card border border-gray-100 dark:border-border shadow-soft hover:shadow-elevated hover:border-primary/20 transition-all group"
          >
            <div className="flex items-center gap-2 mb-3">
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
              <p className="text-[11px] font-medium text-text-muted uppercase tracking-wider leading-tight">{kpi.label}</p>
            </div>
            <p className={`font-display text-2xl font-bold ${kpi.color} group-hover:scale-[1.02] transition-transform origin-left`}>
              <AnimatedNumber value={kpi.value} prefix={kpi.prefix} />
            </p>
          </Link>
        </FadeIn>
      ))}
    </div>
  )
}
