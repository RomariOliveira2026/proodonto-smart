import { motion } from 'framer-motion'
import type { PlanThinkingStep } from '../../builder-intelligence/types/liveIntelligence'

interface ThinkingAnimationProps {
  steps: PlanThinkingStep[]
  activeIndex: number
  running: boolean
  progress: number
}

export function ThinkingAnimation({ steps, activeIndex, running, progress }: ThinkingAnimationProps) {
  if (!running && activeIndex < 0) return null

  const current = steps[activeIndex]

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 overflow-hidden"
    >
      <div className="rounded-2xl border border-primary/15 bg-primary/[0.04] dark:bg-primary/[0.08] p-5">
        <p className="text-sm font-medium text-fg-strong mb-3 min-h-[1.25rem]">
          {current?.label ?? 'Preparando...'}
        </p>
        <div className="h-2 rounded-full bg-surface overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          />
        </div>
        <ul className="mt-4 space-y-1.5">
          {steps.map((step, i) => (
            <li
              key={step.id}
              className={`text-xs transition-colors ${
                i < activeIndex ? 'text-success font-medium' : i === activeIndex ? 'text-primary-light font-semibold' : 'text-text-muted'
              }`}
            >
              {i < activeIndex ? '✔ ' : i === activeIndex ? '→ ' : '· '}
              {step.label.replace(/\.\.\.$/, '').replace(/\.$/, '')}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
