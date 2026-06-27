import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardHeader } from '../../builder-ui'
import { previsaoFaturamento } from '../../data/oportunidades'

const chartData = previsaoFaturamento.map((d) => ({
  ...d,
  tendencia: (d.confirmada + d.prevista + d.recuperavel) / 3,
}))

export function PrevisaoFaturamento() {
  return (
    <Card padding="lg">
      <CardHeader title="Previsão de Faturamento" subtitle="Mês atual · em milhares (R$)" />
      <div className="h-72 lg:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="gradConfirmada" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0B5FA5" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0B5FA5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} className="dark:opacity-20" />
            <XAxis dataKey="semana" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }}
              formatter={(v) => [`R$ ${v}k`, '']}
            />
            <Legend />
            <Area type="monotone" dataKey="confirmada" name="Receita Confirmada" fill="url(#gradConfirmada)" stroke="#0B5FA5" strokeWidth={2} />
            <Line type="monotone" dataKey="prevista" name="Receita Prevista" stroke="#1DA7E0" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="recuperavel" name="Receita Recuperável" stroke="#16A34A" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
            <Line type="monotone" dataKey="risco" name="Receita em Risco" stroke="#DC2626" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="tendencia" name="Tendência" stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
