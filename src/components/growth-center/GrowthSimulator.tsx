import { useMemo, useState } from 'react'
import { SlidersHorizontal, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedNumber, FadeIn } from '../../builder-ui'
import type { SimulatorBaseline } from '../../types/growthCenter'
import { calcularReceitaSimulada, SIMULATOR_MAX, type SimulatorInputs } from '../../lib/growthSimulator'
import { GlassShell } from './GlassShell'

interface GrowthSimulatorProps {
  baseline: SimulatorBaseline
}

interface SliderField {
  key: keyof SimulatorInputs
  label: string
}

const SLIDERS: SliderField[] = [
  { key: 'reduzirFaltas', label: 'Reduzir faltas' },
  { key: 'aumentarConversao', label: 'Aumentar conversão' },
  { key: 'aumentarTicket', label: 'Aumentar ticket médio' },
]

export function GrowthSimulator({ baseline }: GrowthSimulatorProps) {
  const [inputs, setInputs] = useState<SimulatorInputs>({
    reduzirFaltas: 30,
    aumentarConversao: 30,
    aumentarTicket: 30,
  })

  const receitaEstimada = useMemo(
    () => calcularReceitaSimulada(baseline, inputs),
    [baseline, inputs],
  )

  const update = (key: keyof SimulatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <FadeIn delay={0.16}>
      <GlassShell className="p-6 lg:p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-primary-light" />
          </div>
          <div>
            <h2 className="font-display text-xl lg:text-2xl font-bold text-fg-strong">Simulador de Crescimento</h2>
            <p className="text-sm text-text-muted">Projete o impacto financeiro das melhorias operacionais.</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            {SLIDERS.map((field) => (
              <div key={field.key}>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-fg-secondary">{field.label}</label>
                  <span className="font-display font-bold text-primary text-lg">{inputs[field.key]}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={SIMULATOR_MAX}
                  step={1}
                  value={inputs[field.key]}
                  onChange={(e) => update(field.key, Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface accent-primary"
                />
                <div className="flex justify-between text-[10px] text-text-muted mt-1.5 uppercase tracking-wider">
                  <span>0%</span>
                  <span>30%</span>
                </div>
              </div>
            ))}
          </div>

          <motion.div
            layout
            className="relative overflow-hidden rounded-3xl p-8 lg:p-10 text-center border border-primary/15 bg-gradient-to-br from-primary/[0.06] via-card to-primary-light/[0.08] dark:from-primary/10 dark:via-[#141c2e] dark:to-primary-light/5"
          >
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary-light/10 rounded-full blur-3xl pointer-events-none" />
            <TrendingUp className="w-8 h-8 text-primary-light mx-auto mb-4" />
            <p className="text-sm font-medium text-text-muted mb-2">Receita estimada</p>
            <p className="font-display text-4xl lg:text-5xl font-extrabold text-fg-strong tracking-tight">
              +<AnimatedNumber value={receitaEstimada} prefix="R$ " />
            </p>
            <p className="text-sm text-text-muted mt-2">por ano</p>
          </motion.div>
        </div>
      </GlassShell>
    </FadeIn>
  )
}
