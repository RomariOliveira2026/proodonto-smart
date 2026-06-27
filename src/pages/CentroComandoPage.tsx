import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import {
  Badge,
  Button,
  FadeIn,
  HighlightCard,
  RotinaModal,
  useToast,
} from '../builder-ui'
import { acoesDoDia, rotinaChecklist } from '../data/centroComando'
import { IAPrioridades } from '../components/centro-comando/IAPrioridades'
import { RiscosOperacao } from '../components/centro-comando/RiscosOperacao'
import { OportunidadesVerdes } from '../components/centro-comando/OportunidadesVerdes'
import { TermometroClinica } from '../components/centro-comando/TermometroClinica'
import { MuralExecutivo } from '../components/centro-comando/MuralExecutivo'
import { Previsao7Dias } from '../components/centro-comando/Previsao7Dias'

export function CentroComandoPage() {
  const { showToast } = useToast()
  const [rotinaOpen, setRotinaOpen] = useState(false)

  const handleAcao = () => setRotinaOpen(true)
  const handleRotina = () => showToast('Rotina executada com sucesso.')

  return (
    <div className="space-y-10 max-w-[1600px]">
      <FadeIn>
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="primary" dot>Centro de Comando</Badge>
            <h1 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-fg-strong tracking-tight mt-3">
              Centro de Comando
            </h1>
            <p className="text-text-muted text-lg font-light mt-2 max-w-2xl">
              Tudo o que precisa da sua atenção agora.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Ações do dia */}
      <section>
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-4">
          Ação mais importante do dia
        </p>
        <div className="grid lg:grid-cols-3 gap-5">
          {acoesDoDia.map((acao) => (
            <HighlightCard
              key={acao.id}
              badge={acao.badge}
              titulo={acao.titulo}
              valor={acao.valor}
              quantidade={acao.quantidade}
              cta={acao.cta}
              variant={acao.variant}
              onAction={handleAcao}
            />
          ))}
        </div>
      </section>

      <IAPrioridades onExecutar={handleAcao} />

      <div className="grid xl:grid-cols-2 gap-6">
        <RiscosOperacao />
        <OportunidadesVerdes />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TermometroClinica />
        <MuralExecutivo />
      </div>

      <Previsao7Dias />

      <FadeIn>
        <div className="flex justify-center pt-4 pb-8">
          <Button
            variant="glow"
            size="xl"
            onClick={() => setRotinaOpen(true)}
            icon={<Sparkles className="w-5 h-5" />}
            className="px-12 py-5 text-lg shadow-glow"
          >
            Executar Rotina Inteligente
          </Button>
        </div>
      </FadeIn>

      <RotinaModal
        open={rotinaOpen}
        onClose={() => setRotinaOpen(false)}
        onConfirm={handleRotina}
        titulo="Rotina Inteligente"
        subtitulo="A IA executará todas as ações da rotina diária automaticamente."
        itens={rotinaChecklist}
        confirmLabel="Executar Rotina"
      />
    </div>
  )
}
