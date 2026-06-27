import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { FadeIn } from '../../builder-ui'
import type { ReceitaRecuperadaMensal } from '../../types/dashboardPremium'
import { GlassCard } from './GlassCard'

interface Props {
  data: ReceitaRecuperadaMensal[]
}

function formatCurrency(value: number) {
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(0)}k`
  return `R$ ${value}`
}

export function ReceitaRecuperadaChart({ data }: Props) {
  return (
    <FadeIn delay={0.16}>
      <GlassCard className="p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-fg-strong">Receita Recuperada</h2>
          <p className="text-sm text-text-muted mt-1">Últimos 12 meses</p>
        </div>

        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradientPremium" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1DA7E0" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0B5FA5" stopOpacity={0.85} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148,163,184,0.12)" />
              <XAxis
                dataKey="mes"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrency}
                tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }}
                width={52}
              />
              <Tooltip
                cursor={{ fill: 'rgba(11, 95, 165, 0.08)' }}
                contentStyle={{
                  background: 'var(--color-card)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  fontSize: '13px',
                }}
                formatter={(value) => [
                  Number(value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }),
                  'Recuperado',
                ]}
              />
              <Bar dataKey="valor" fill="url(#barGradientPremium)" radius={[8, 8, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </FadeIn>
  )
}
