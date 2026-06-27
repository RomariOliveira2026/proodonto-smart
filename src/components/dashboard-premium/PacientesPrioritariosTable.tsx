import { useNavigate } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { Button, FadeIn } from '../../builder-ui'
import type { PacientePrioritario, PatientPriority } from '../../types/dashboardPremium'
import { GlassCard } from './GlassCard'

interface Props {
  pacientes: PacientePrioritario[]
}

const priorityStyles: Record<PatientPriority, { label: string; className: string }> = {
  critica: { label: 'Crítica', className: 'text-red-400 bg-red-500/10 border-red-500/20' },
  alta: { label: 'Alta', className: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  media: { label: 'Média', className: 'text-primary-light bg-primary/10 border-primary/20' },
  baixa: { label: 'Baixa', className: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

export function PacientesPrioritariosTable({ pacientes }: Props) {
  const navigate = useNavigate()

  return (
    <FadeIn delay={0.18}>
      <GlassCard className="overflow-hidden">
        <div className="p-6 lg:p-8 border-b border-gray-100/80 dark:border-white/[0.06]">
          <h2 className="font-display text-xl font-bold text-fg-strong">Pacientes Prioritários</h2>
          <p className="text-sm text-text-muted mt-1">Ordenados por impacto financeiro e urgência.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-text-muted border-b border-gray-100/80 dark:border-white/[0.06]">
                <th className="px-6 py-4 font-semibold">Nome</th>
                <th className="px-4 py-4 font-semibold">Última consulta</th>
                <th className="px-4 py-4 font-semibold">Status</th>
                <th className="px-4 py-4 font-semibold">Receita Potencial</th>
                <th className="px-4 py-4 font-semibold">Prioridade</th>
                <th className="px-6 py-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((p) => {
                const prio = priorityStyles[p.prioridade]
                return (
                  <tr
                    key={p.id}
                    className="border-b border-gray-100/50 dark:border-white/[0.04] hover:bg-primary/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-fg-strong whitespace-nowrap">{p.nome}</td>
                    <td className="px-4 py-4 text-fg-secondary whitespace-nowrap">{p.ultimaConsulta}</td>
                    <td className="px-4 py-4 text-fg-secondary max-w-[180px]">{p.status}</td>
                    <td className="px-4 py-4 font-semibold text-primary-light whitespace-nowrap">
                      {formatCurrency(p.receitaPotencial)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${prio.className}`}>
                        {prio.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<ExternalLink className="w-3.5 h-3.5" />}
                        onClick={() => navigate('/app/pacientes')}
                      >
                        Abrir
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </FadeIn>
  )
}
