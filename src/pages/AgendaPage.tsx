import { useState } from 'react'
import { Calendar, Clock, Filter, MapPin, Plus, User } from 'lucide-react'
import { Badge, Button, Card, CardHeader } from '../builder-ui'
import { consultas } from '../data/mock'
import type { Unidade } from '../types'

const statusMap = {
  confirmada: { label: 'Confirmada', variant: 'success' as const },
  pendente: { label: 'Pendente', variant: 'warning' as const },
  faltou: { label: 'Faltou', variant: 'danger' as const },
  realizada: { label: 'Realizada', variant: 'info' as const },
  cancelada: { label: 'Cancelada', variant: 'neutral' as const },
}

const unidades: (Unidade | 'Todas')[] = ['Todas', 'Aracaju', 'Simão Dias', 'Lagarto']

export function AgendaPage() {
  const [filtroUnidade, setFiltroUnidade] = useState<Unidade | 'Todas'>('Todas')
  const hoje = consultas.filter((c) => c.data === '2026-06-25')
  const filtradas = filtroUnidade === 'Todas' ? hoje : hoje.filter((c) => c.unidade === filtroUnidade)

  const stats = {
    total: hoje.length,
    confirmadas: hoje.filter((c) => c.status === 'confirmada').length,
    pendentes: hoje.filter((c) => c.status === 'pendente').length,
    faltas: hoje.filter((c) => c.status === 'faltou').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-fg-strong tracking-tight">Agenda Inteligente</h1>
          <p className="text-text-muted font-light mt-1">Quinta-feira, 25 de junho de 2026 · <strong className="text-success">R$ 8.200</strong> em receita confirmada hoje</p>
        </div>
        <Button><Plus className="w-4 h-4" /> Nova consulta</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total hoje', value: stats.total, color: 'text-primary' },
          { label: 'Confirmadas', value: stats.confirmadas, color: 'text-emerald-600' },
          { label: 'Pendentes', value: stats.pendentes, color: 'text-amber-600' },
          { label: 'Faltas', value: stats.faltas, color: 'text-red-500' },
        ].map((s) => (
          <Card key={s.label} padding="sm">
            <p className="text-xs text-text-muted">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Filter className="w-4 h-4 text-text-muted" />
        {unidades.map((u) => (
          <button
            key={u}
            onClick={() => setFiltroUnidade(u)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filtroUnidade === u ? 'bg-primary text-white' : 'bg-card border border-gray-200 dark:border-border text-text hover:border-primary/30'}`}
          >
            {u}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader title="Consultas de hoje" subtitle={`${filtradas.length} agendamento(s)`} />
        <div className="space-y-3">
          {filtradas.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl bg-surface hover:bg-gray-100/60 transition-colors">
              <div className="flex items-center gap-3 sm:w-28">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold text-fg-strong">{c.hora}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-text-muted" />
                  <span className="font-medium text-fg-secondary">{c.paciente}</span>
                </div>
                <p className="text-sm text-text-muted mt-0.5">{c.procedimento} — {c.dentista}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <MapPin className="w-3.5 h-3.5" />
                  {c.unidade}
                </div>
                <Badge variant={statusMap[c.status].variant}>{statusMap[c.status].label}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-gradient-to-r from-primary/5 to-primary-light/5 border-primary/10">
        <div className="flex items-start gap-4">
          <Calendar className="w-6 h-6 text-primary shrink-0" />
          <div>
            <h3 className="font-semibold text-fg-strong">Sugestão inteligente</h3>
            <p className="text-sm text-text-muted mt-1">
              3 lacunas amanhã entre 14h-17h em Aracaju. Lista de espera com 7 pacientes disponíveis para preenchimento automático.
            </p>
            <Button size="sm" className="mt-3">Preencher lacunas</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
