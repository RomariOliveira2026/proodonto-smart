import { useNavigate } from 'react-router-dom'
import { Brain } from 'lucide-react'
import { Badge, FadeIn, useToast } from '../builder-ui'
import { consultantQuestions } from '../data/aiConsultant'
import { ConsultantPanel } from '../components/ai-consultant/ConsultantPanel'
import type { ConsultantResponse } from '../types/intelligenceModules'

export function AIConsultantPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const handleAction = (response: ConsultantResponse) => {
    const key = response.actionKey
    if (key === 'radar_perda') {
      navigate('/app/radar-perda-invisivel')
      return
    }
    if (key === 'multiunidades') {
      navigate('/app/multiunidades')
      return
    }
    if (key === 'centro_inteligencia') {
      navigate('/app')
      return
    }
    if (key.includes('cobrar')) {
      navigate(`/app/execucao/${key}`)
      return
    }
    showToast(response.recomendacao)
    navigate('/app/oportunidades')
  }

  return (
    <div className="space-y-8 max-w-[1600px]">
      <FadeIn>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-primary-light" />
          </div>
          <div>
            <Badge variant="primary" dot>Copiloto executivo</Badge>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
              Consultor IA
            </h1>
            <p className="text-text-muted font-light mt-2 max-w-2xl">
              Decisões, diagnósticos e planos de ação — linguagem de diretor executivo, não de sistema administrativo.
            </p>
          </div>
        </div>
      </FadeIn>

      <ConsultantPanel perguntas={consultantQuestions} onAction={handleAction} />
    </div>
  )
}
