import { CheckCircle2, Heart, MessageSquare, Star } from 'lucide-react'
import { Badge, Button, Card } from '../builder-ui'
import { formatDate, posAtendimentos } from '../data/mock'

const statusMap = {
  aguardando: { label: 'Aguardando', variant: 'warning' as const },
  em_andamento: { label: 'Em andamento', variant: 'primary' as const },
  concluido: { label: 'Concluído', variant: 'success' as const },
}

export function PosAtendimentoPage() {
  const pendentes = posAtendimentos.filter((p) => p.status !== 'concluido').length
  const mediaSatisfacao = (
    posAtendimentos.reduce((s, p) => s + (p.satisfacao ?? 0), 0) / posAtendimentos.length
  ).toFixed(1)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-fg-strong tracking-tight">Pós-atendimento</h1>
        <p className="text-text-muted font-light mt-1">Fidelização que gera receita recorrente</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-sm text-text-muted">Ações pendentes</p>
          <p className="text-2xl font-bold text-primary mt-1">{pendentes}</p>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Satisfação média</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-amber-500">{mediaSatisfacao}</p>
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
        </Card>
        <Card>
          <p className="text-sm text-text-muted">Concluídos</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {posAtendimentos.filter((p) => p.status === 'concluido').length}
          </p>
        </Card>
      </div>

      <div className="grid gap-4">
        {posAtendimentos.map((p) => (
          <Card key={p.id} hover>
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-fg-strong">{p.paciente}</h3>
                    <Badge variant={statusMap[p.status].variant}>{statusMap[p.status].label}</Badge>
                    <Badge variant="neutral">{p.unidade}</Badge>
                  </div>
                  <p className="text-sm text-text-muted">{p.procedimento} — {formatDate(p.data)}</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs text-text-muted">Próxima ação</p>
                <p className="text-sm font-medium text-fg-secondary">{p.proximaAcao}</p>
              </div>
              {p.satisfacao && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < p.satisfacao! ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                  ))}
                </div>
              )}
              <Button size="sm" variant="outline">
                <MessageSquare className="w-4 h-4" /> Contatar
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-emerald-50 border-emerald-200">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800">
            Envie lembretes de cuidados pós-procedimento e pesquisas de satisfação automaticamente após cada atendimento.
          </p>
        </div>
      </Card>
    </div>
  )
}
