import { useCallback, useState } from 'react'
import { Play } from 'lucide-react'
import { Button } from '../../builder-ui'
import type { PlanThinkingStep } from '../../builder-intelligence/types/liveIntelligence'
import { runPlanThinkingSequence } from '../../builder-intelligence/lib/liveIntelligenceEngine'
import { ThinkingAnimation } from './ThinkingAnimation'

interface MissionEngineProps {
  steps: PlanThinkingStep[]
  onPlanComplete: () => void
}

export function MissionEngine({ steps, onPlanComplete }: MissionEngineProps) {
  const [running, setRunning] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [progress, setProgress] = useState(0)

  const handleStart = useCallback(async () => {
    if (running) return
    setRunning(true)
    setActiveIndex(0)
    setProgress(0)

    const totalMs = steps.reduce((s, step) => s + step.durationMs, 0)
    let elapsed = 0

    await runPlanThinkingSequence(steps, (index, step) => {
      setActiveIndex(index)
      elapsed += step.durationMs
      setProgress(Math.min(100, Math.round((elapsed / totalMs) * 100)))
    })

    setProgress(100)
    setActiveIndex(steps.length - 1)
    window.setTimeout(() => {
      setRunning(false)
      onPlanComplete()
    }, 400)
  }, [running, steps, onPlanComplete])

  return (
    <div>
      <Button
        variant="glow"
        size="lg"
        icon={<Play className="w-5 h-5" />}
        onClick={handleStart}
        disabled={running}
        fullWidth
      >
        {running ? 'Montando seu plano...' : 'Iniciar plano'}
      </Button>
      <ThinkingAnimation
        steps={steps}
        activeIndex={activeIndex}
        running={running}
        progress={progress}
      />
    </div>
  )
}
