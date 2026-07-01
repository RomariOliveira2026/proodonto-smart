import { FileDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatedNumber, Badge, Button, FadeIn } from '../../builder-ui'
import type { ExecutiveReportSection, ExecutiveReportSnapshot } from '../../types/intelligenceModules'
import { formatCurrency } from '../intelligence-center/utils'
import { GlassPanel } from '../intelligence-center/GlassPanel'

const variantBadge: Record<NonNullable<ExecutiveReportSection['variant']>, 'success' | 'warning' | 'primary' | 'neutral'> = {
  success: 'success',
  warning: 'warning',
  primary: 'primary',
  neutral: 'neutral',
}

interface ExecutiveReportViewProps {
  report: ExecutiveReportSnapshot
  onGeneratePdf: () => void
  generating?: boolean
}

export function ExecutiveReportView({ report, onGeneratePdf, generating }: ExecutiveReportViewProps) {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Recuperada', valor: report.resumoFinanceiro.recuperada, variant: 'success' as const },
            { label: 'Em risco', valor: report.resumoFinanceiro.emRisco, variant: 'warning' as const },
            { label: 'Oportunidades abertas', valor: report.resumoFinanceiro.oportunidadesAbertas, variant: 'primary' as const },
          ].map((m) => (
            <GlassPanel key={m.label} className="p-5 lg:p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">{m.label}</p>
              <p className="font-display text-2xl lg:text-3xl font-extrabold text-fg-strong">
                <AnimatedNumber value={m.valor} prefix="R$ " />
              </p>
            </GlassPanel>
          ))}
        </div>
      </FadeIn>

      <div className="space-y-4">
        {report.secoes.map((sec, i) => (
          <FadeIn key={sec.id} delay={i * 0.05}>
            <motion.div className="premium-panel p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge variant={variantBadge[sec.variant ?? 'neutral']}>{sec.titulo}</Badge>
                {sec.valor != null && (
                  <span className="font-display text-lg font-bold text-fg-strong">{formatCurrency(sec.valor)}</span>
                )}
              </div>
              <p className="text-fg-secondary leading-relaxed">{sec.conteudo}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-primary/15 bg-primary/[0.04]">
          <div>
            <p className="font-semibold text-fg-strong">Exportar para sócios e investidores</p>
            <p className="text-sm text-text-muted mt-1">Relatório semanal gerado pela IA · {report.geradoEm}</p>
          </div>
          <Button
            variant="glow"
            size="lg"
            icon={<FileDown className="w-5 h-5" />}
            loading={generating}
            disabled={generating}
            onClick={onGeneratePdf}
            className="w-full sm:w-auto shrink-0"
          >
            Gerar PDF
          </Button>
        </div>
      </FadeIn>
    </div>
  )
}
