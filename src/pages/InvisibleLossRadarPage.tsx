import { useNavigate } from 'react-router-dom'
import { Radar } from 'lucide-react'
import { AnimatedNumber, Badge, FadeIn, useToast } from '../builder-ui'
import { invisibleLossSnapshot } from '../data/invisibleLossRadar'
import { LossRadarCard } from '../components/invisible-loss-radar/LossRadarCard'
import type { InvisibleLossItem } from '../types/intelligenceModules'
import { formatCurrency } from '../components/intelligence-center/utils'
import { GlassPanel } from '../components/intelligence-center/GlassPanel'

export function InvisibleLossRadarPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleAnalyze = (item: InvisibleLossItem) => {
    if (item.actionKey.includes('cobrar') || item.actionKey.includes('confirmar')) {
      navigate(`/app/execucao/${item.actionKey}`)
      return
    }
    showToast(`Analisando: ${item.titulo} · ${formatCurrency(item.impactoFinanceiro)} em jogo`)
    navigate('/app/oportunidades')
  }

  return (
    <div className="space-y-8 max-w-[1600px]">
      <FadeIn>
        <Badge variant="primary" dot>Perda invisível</Badge>
        <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
          Radar de Perda Invisível
        </h1>
        <p className="text-text-muted font-light mt-2 max-w-2xl">
          Dinheiro escondido dentro da operação — identificado pela IA a partir dos dados da sua clínica, conectados ao sistema que você já usa.
        </p>
      </FadeIn>

      <FadeIn delay={0.06}>
        <GlassPanel glow className="p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Radar className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <p className="text-sm text-text-muted">Impacto total estimado</p>
              <p className="font-display text-3xl lg:text-4xl font-extrabold text-fg-strong">
                <AnimatedNumber value={invisibleLossSnapshot.totalImpacto} prefix="R$ " />
              </p>
            </div>
          </div>
          <p className="text-sm text-text-muted max-w-md">
            {invisibleLossSnapshot.itens.length} categorias de perda invisível detectadas na operação atual.
          </p>
        </GlassPanel>
      </FadeIn>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
        {invisibleLossSnapshot.itens.map((item, i) => (
          <LossRadarCard key={item.id} item={item} index={i} onAnalyze={handleAnalyze} />
        ))}
      </div>
    </div>
  )
}
