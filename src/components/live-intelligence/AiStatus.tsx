import { Activity, Sparkles } from 'lucide-react'
import { Badge } from '../../builder-ui'

interface AiStatusProps {
  message: string
}

export function AiStatus({ message }: AiStatusProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border-2 border-card animate-pulse" />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-light">
            Live Intelligence Engine™
          </p>
          <p className="text-sm font-medium text-fg-secondary flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-success" />
            {message}
          </p>
        </div>
      </div>
      <Badge variant="success" dot>IA ativa · tempo real</Badge>
    </div>
  )
}
