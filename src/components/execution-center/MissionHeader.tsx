import { Link } from 'react-router-dom'
import { ArrowLeft, Zap } from 'lucide-react'
import { Badge, FadeIn } from '../../builder-ui'

export function MissionHeader() {
  return (
    <FadeIn>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Centro de Inteligência
          </Link>
        </div>
        <Badge variant="primary" dot>
          <span className="inline-flex items-center gap-1.5">
            <Zap className="w-3 h-3" />
            Execution Center™
          </span>
        </Badge>
      </div>
    </FadeIn>
  )
}
