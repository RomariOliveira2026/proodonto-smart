import { useState } from 'react'
import { Rocket } from 'lucide-react'
import { Badge, Button, FadeIn, useToast } from '../builder-ui'
import { RECEITA_RECUPERAVEL, oportunidades, recomendacoes } from '../data/oportunidades'
import { ReceitaRecuperavelHero } from '../components/oportunidades/ReceitaRecuperavelHero'
import { OpportunityCard } from '../components/oportunidades/OpportunityCard'
import { PlanoInteligenteModal } from '../components/oportunidades/PlanoInteligenteModal'
import { RadarClinica } from '../components/oportunidades/RadarClinica'
import { FunilComercial } from '../components/oportunidades/FunilComercial'
import { PrevisaoFaturamento } from '../components/oportunidades/PrevisaoFaturamento'
import { RecomendacoesIA } from '../components/oportunidades/RecomendacoesIA'
import type { Oportunidade } from '../data/oportunidades'

const sections: { title: string; subtitle: string; filter: Oportunidade['categoria'] }[] = [
  { title: 'Operação e agenda', subtitle: 'Confirmações e revisões que impactam o faturamento do dia.', filter: 'operacional' },
  { title: 'Financeiro', subtitle: 'Parcelas e cobranças com potencial imediato de recuperação.', filter: 'financeiro' },
  { title: 'Relacionamento', subtitle: 'Pacientes inativos e sem retorno — reative com automação.', filter: 'relacionamento' },
  { title: 'Upsell odontológico', subtitle: 'Clareamento, facetas e implantes identificados pela IA comercial.', filter: 'upsell' },
]

export function OportunidadesPage() {
  const { showToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedTitulo =
    oportunidades.find((o) => o.id === selectedId)?.titulo ??
    recomendacoes.find((r) => r.id === selectedId)?.titulo

  const abrirPlano = (id: string) => {
    setSelectedId(id)
    setModalOpen(true)
  }

  const confirmarPlano = () => {
    showToast('Plano de recuperação iniciado. Automações administrativas em execução.')
  }

  return (
    <div className="space-y-8 max-w-[1600px]">
      <FadeIn>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div>
            <Badge variant="primary" dot>Central de Oportunidades</Badge>
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-fg-strong tracking-tight mt-3">
              Central de Oportunidades
            </h1>
            <p className="text-text-muted font-light mt-2 max-w-xl">
              A IA identificou receitas recuperáveis — foco administrativo, financeiro e comercial. Sem diagnóstico clínico.
            </p>
          </div>
          <Button
            variant="glow"
            size="lg"
            icon={<Rocket className="w-5 h-5" />}
            onClick={() => abrirPlano('plano-completo')}
            className="shrink-0 w-full lg:w-auto"
          >
            Executar plano de recuperação
          </Button>
        </div>
      </FadeIn>

      <ReceitaRecuperavelHero valor={RECEITA_RECUPERAVEL} />

      {sections.map((section) => {
        const items = oportunidades.filter((o) => o.categoria === section.filter)
        if (!items.length) return null
        return (
          <section key={section.filter}>
            <h2 className="font-display text-xl font-bold text-fg-strong mb-1">{section.title}</h2>
            <p className="text-sm text-text-muted mb-4">{section.subtitle}</p>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((op, i) => (
                <OpportunityCard key={op.id} oportunidade={op} index={i} onExecutar={abrirPlano} />
              ))}
            </div>
          </section>
        )
      })}

      <div className="grid lg:grid-cols-2 gap-6">
        <RadarClinica />
        <FunilComercial />
      </div>

      <PrevisaoFaturamento />

      <RecomendacoesIA onExecutar={abrirPlano} />

      <PlanoInteligenteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmarPlano}
        tituloOportunidade={selectedId === 'plano-completo' ? 'recuperação completa' : selectedTitulo}
      />
    </div>
  )
}
