import { motion } from 'framer-motion'
import { FadeIn } from '../../builder-ui'
import type { ClinicRadarData } from '../../types/growthCenter'
import { GlassShell } from './GlassShell'

interface ClinicRadarProps {
  data: ClinicRadarData
}

const CHART_SIZE = 280
const CENTER = CHART_SIZE / 2
const MAX_RADIUS = 100

function polarToCartesian(angleDeg: number, radius: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: CENTER + radius * Math.cos(angleRad),
    y: CENTER + radius * Math.sin(angleRad),
  }
}

function buildPolygonPoints(scores: number[], radiusScale = 1) {
  const step = 360 / scores.length
  return scores
    .map((score, i) => {
      const radius = (score / 100) * MAX_RADIUS * radiusScale
      const { x, y } = polarToCartesian(i * step, radius)
      return `${x},${y}`
    })
    .join(' ')
}

export function ClinicRadar({ data }: ClinicRadarProps) {
  const scores = data.dimensions.map((d) => d.score)
  const gridLevels = [0.25, 0.5, 0.75, 1]
  const step = 360 / data.dimensions.length

  return (
    <FadeIn delay={0.12}>
      <GlassShell glow className="p-6 lg:p-8 h-full">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-widest text-primary-light mb-2">Diagnóstico</p>
          <h2 className="font-display text-xl lg:text-2xl font-bold text-fg-strong">Radar da Clínica</h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative shrink-0 w-[280px] h-[280px] mx-auto">
            <svg width={CHART_SIZE} height={CHART_SIZE} viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`} className="mx-auto">
              {gridLevels.map((level) => (
                <polygon
                  key={level}
                  points={buildPolygonPoints(Array(data.dimensions.length).fill(100 * level))}
                  fill="none"
                  stroke="rgba(148,163,184,0.15)"
                  strokeWidth={1}
                />
              ))}

              {data.dimensions.map((dim, i) => {
                const outer = polarToCartesian(i * step, MAX_RADIUS)
                return (
                  <line
                    key={dim.id}
                    x1={CENTER}
                    y1={CENTER}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="rgba(148,163,184,0.12)"
                    strokeWidth={1}
                  />
                )
              })}

              <motion.polygon
                points={buildPolygonPoints(scores)}
                fill="url(#radarFill)"
                stroke="#1DA7E0"
                strokeWidth={2}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
              />

              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0B5FA5" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#1DA7E0" stopOpacity={0.2} />
                </linearGradient>
              </defs>
            </svg>

            {data.dimensions.map((dim, i) => {
              const labelPos = polarToCartesian(i * step, MAX_RADIUS + 28)
              return (
                <div
                  key={dim.id}
                  className="absolute text-center pointer-events-none"
                  style={{
                    left: labelPos.x,
                    top: labelPos.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <p className="text-[11px] font-semibold text-fg-secondary whitespace-nowrap">{dim.label}</p>
                  <p className="font-display text-sm font-bold text-primary-light">{dim.score}%</p>
                </div>
              )
            })}
          </div>

          <div className="flex-1 w-full text-center lg:text-left">
            <div className="inline-flex flex-col items-center lg:items-start p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-light/5 dark:from-primary/10 dark:to-primary-light/5 border border-primary/10">
              <p className="text-sm font-medium text-text-muted mb-2">Saúde Geral da Clínica</p>
              <p className="font-display text-5xl lg:text-6xl font-extrabold text-fg-strong tracking-tight">
                {data.saudeGeral}
                <span className="text-2xl text-primary-light">%</span>
              </p>
              <p className="text-xs text-text-muted mt-3 max-w-xs">
                Índice consolidado de performance administrativa e comercial — atualizado pela IA.
              </p>
            </div>
          </div>
        </div>
      </GlassShell>
    </FadeIn>
  )
}
