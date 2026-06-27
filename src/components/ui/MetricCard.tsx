import { type LucideIcon, TrendingDown, TrendingUp } from 'lucide-react'
import { Card } from './Card'

interface MetricCardProps {
  title: string
  value: string
  variation?: number
  icon: LucideIcon
  iconColor?: string
}

export function MetricCard({ title, value, variation, icon: Icon, iconColor = 'bg-primary/10 text-primary' }: MetricCardProps) {
  const isPositive = variation !== undefined && variation >= 0
  const isNegativeGood = title.toLowerCase().includes('falta') || title.toLowerCase().includes('pendên')

  return (
    <Card hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-text-muted font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {variation !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${(isNegativeGood ? !isPositive : isPositive) ? 'text-emerald-600' : 'text-red-500'}`}>
              {(isNegativeGood ? !isPositive : isPositive) ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {Math.abs(variation)}% vs. mês anterior
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </Card>
  )
}
