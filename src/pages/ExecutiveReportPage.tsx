import { useState } from 'react'
import { FileBarChart } from 'lucide-react'
import { Badge, FadeIn, useToast } from '../builder-ui'
import { executiveReportSnapshot } from '../data/executiveReport'
import { ExecutiveReportView } from '../components/executive-report/ExecutiveReportView'

export function ExecutiveReportPage() {
  const { showToast } = useToast()
  const [generating, setGenerating] = useState(false)

  const handleGeneratePdf = () => {
    setGenerating(true)
    window.setTimeout(() => {
      setGenerating(false)
      showToast('Relatório executivo gerado. Em produção, o PDF seria enviado aos sócios.')
    }, 1800)
  }

  return (
    <div className="space-y-8 max-w-[1600px]">
      <FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileBarChart className="w-6 h-6 text-primary-light" />
            </div>
            <div>
              <Badge variant="primary" dot>Inteligência executiva</Badge>
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
                Relatório Executivo
              </h1>
              <p className="text-text-muted font-light mt-2 max-w-xl">
                Resumo semanal que a IA enviaria aos sócios — receita recuperada, riscos e recomendações estratégicas.
              </p>
              <p className="text-sm text-primary font-medium mt-3">
                Período: {executiveReportSnapshot.periodo}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>

      <ExecutiveReportView report={executiveReportSnapshot} onGeneratePdf={handleGeneratePdf} generating={generating} />
    </div>
  )
}
