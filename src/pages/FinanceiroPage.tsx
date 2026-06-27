import { AlertCircle, CheckCircle, Clock, DollarSign, Send } from 'lucide-react'
import { AnimatedNumber, Badge, Button, Card, CardHeader, FadeIn } from '../builder-ui'
import { cobrancas, formatCurrency, formatDate } from '../data/mock'

const statusMap = {
  pago: { label: 'Pago', variant: 'success' as const, icon: CheckCircle },
  pendente: { label: 'Pendente', variant: 'warning' as const, icon: Clock },
  atrasado: { label: 'Atrasado', variant: 'danger' as const, icon: AlertCircle },
  negociado: { label: 'Negociado', variant: 'info' as const, icon: DollarSign },
}

export function FinanceiroPage() {
  const totalPendente = cobrancas.filter((c) => c.status !== 'pago').reduce((s, c) => s + c.valor, 0)
  const totalAtrasado = cobrancas.filter((c) => c.status === 'atrasado').reduce((s, c) => s + c.valor, 0)
  const totalPago = cobrancas.filter((c) => c.status === 'pago').reduce((s, c) => s + c.valor, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-fg-strong tracking-tight">Financeiro / Cobranças</h1>
          <p className="text-text-muted font-light mt-1">Recupere inadimplência automaticamente — <strong className="text-primary">R$ 42.850</strong> em jogo</p>
        </div>
        <Button><Send className="w-4 h-4" /> Enviar lembretes</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total pendente', value: totalPendente, color: 'text-warning' },
          { label: 'Em atraso', value: totalAtrasado, color: 'text-error' },
          { label: 'Recebido (mês)', value: totalPago, color: 'text-success' },
        ].map((k, i) => (
          <FadeIn key={k.label} delay={i * 0.08}>
            <Card hover>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{k.label}</p>
              <p className={`font-display text-2xl font-bold mt-1 ${k.color}`}>
                <AnimatedNumber value={k.value} prefix="R$ " />
              </p>
            </Card>
          </FadeIn>
        ))}
      </div>

      <Card>
        <CardHeader title="Cobranças" subtitle="Todas as unidades" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-2 font-medium text-text-muted">Paciente</th>
                <th className="text-left py-3 px-2 font-medium text-text-muted hidden sm:table-cell">Procedimento</th>
                <th className="text-left py-3 px-2 font-medium text-text-muted">Valor</th>
                <th className="text-left py-3 px-2 font-medium text-text-muted hidden md:table-cell">Vencimento</th>
                <th className="text-left py-3 px-2 font-medium text-text-muted hidden lg:table-cell">Unidade</th>
                <th className="text-left py-3 px-2 font-medium text-text-muted">Status</th>
                <th className="text-right py-3 px-2 font-medium text-text-muted">Ação</th>
              </tr>
            </thead>
            <tbody>
              {cobrancas.map((c) => {
                const st = statusMap[c.status]
                return (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-surface/50">
                    <td className="py-3 px-2 font-medium text-fg-secondary">{c.paciente}</td>
                    <td className="py-3 px-2 text-text-muted hidden sm:table-cell">{c.procedimento}</td>
                    <td className="py-3 px-2 font-semibold">{formatCurrency(c.valor)}</td>
                    <td className="py-3 px-2 text-text-muted hidden md:table-cell">{formatDate(c.vencimento)}</td>
                    <td className="py-3 px-2 hidden lg:table-cell"><Badge variant="neutral">{c.unidade}</Badge></td>
                    <td className="py-3 px-2"><Badge variant={st.variant}>{st.label}</Badge></td>
                    <td className="py-3 px-2 text-right">
                      {c.status !== 'pago' && (
                        <Button size="sm" variant="ghost">Cobrar</Button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-800">Recuperação sugerida</h3>
            <p className="text-sm text-amber-700 mt-1">
              2 pacientes com atraso superior a 15 dias totalizando {formatCurrency(totalAtrasado)}. Ative o fluxo automático de cobrança via WhatsApp.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
