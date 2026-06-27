import type { ExecutionPatient } from '../../types/executionCenter'
import { formatCurrency } from './utils'

interface PatientQueueProps {
  patients: ExecutionPatient[]
  currentPatientId: string | null
  completedIds: string[]
  onSelect: (id: string) => void
}

export function PatientQueue({ patients, currentPatientId, completedIds, onSelect }: PatientQueueProps) {
  const pending = patients.filter((p) => !completedIds.includes(p.id))

  if (pending.length === 0) return null

  return (
    <div className="mt-8">
      <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-3">
        Fila inteligente · {pending.length} restantes
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {pending.map((p) => {
          const isCurrent = p.id === currentPatientId
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className={`shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors min-w-[200px] ${
                isCurrent
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-gray-100/80 dark:border-white/[0.06] hover:border-primary/15'
              }`}
            >
              <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
                {p.avatarInitials}
              </div>
              <div className="text-left min-w-0">
                <p className="text-sm font-semibold text-fg-strong truncate">{p.nome.split(' ')[0]}</p>
                <p className="text-xs text-primary-light font-medium">{formatCurrency(p.valorAberto)}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
