import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { AnimatedNumber, FadeIn } from '../../builder-ui'
import { GlassPanel } from './GlassPanel'

interface RevenueRecoveredProps {
  valorMes: number
  variacaoPercent: number
}

const sparkData = [
  { v: 28 },
  { v: 31 },
  { v: 29 },
  { v: 34 },
  { v: 36 },
  { v: 39 },
  { v: 43 },
]

export function RevenueRecovered({ valorMes, variacaoPercent }: RevenueRecoveredProps) {
  return (
    <FadeIn delay={0.08}>
      <GlassPanel className="p-6 lg:p-8 h-full flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Performance</p>
            <h2 className="font-display text-xl font-bold text-fg-strong">Receita recuperada</h2>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            +{variacaoPercent}%
          </div>
        </div>

        <p className="font-display text-3xl lg:text-4xl font-extrabold text-success tracking-tight mb-1">
          <AnimatedNumber value={valorMes} prefix="R$ " />
        </p>
        <p className="text-sm text-text-muted mb-6">no mês atual</p>

        <div className="flex-1 min-h-[100px] -mx-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <defs>
                <linearGradient id="recoveredSpark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke="#10B981"
                strokeWidth={2}
                fill="url(#recoveredSpark)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassPanel>
    </FadeIn>
  )
}
