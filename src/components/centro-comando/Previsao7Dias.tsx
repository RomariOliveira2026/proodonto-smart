import {
  Bar,
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
import { previsao7Dias } from '../../data/centroComando'

export function Previsao7Dias() {
  return (
    <Card padding="lg">
      <CardHeader title="Previsão para os próximos 7 dias" subtitle="Receita, agenda e conversões" />
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={previsao7Dias}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="dia" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e5e7eb' }} />
            <Legend />
            <Bar yAxisId="left" dataKey="receitaPrevista" name="Receita prevista (R$k)" fill="#0B5FA5" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="receitaRisco" name="Receita em risco (R$k)" fill="#DC2626" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="agenda" name="Agenda" stroke="#1DA7E0" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="cobrancas" name="Cobranças" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} />
            <Line yAxisId="right" type="monotone" dataKey="conversoes" name="Conversões" stroke="#16A34A" strokeWidth={2} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
