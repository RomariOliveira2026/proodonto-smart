import { Card, CardHeader, ExecutiveTimeline } from '../../builder-ui'
import { muralEventos } from '../../data/centroComando'

export function MuralExecutivo() {
  return (
    <Card padding="lg" className="h-full">
      <CardHeader title="Mural Executivo" subtitle="Atividade em tempo real · Unidade Lagarto" />
      <ExecutiveTimeline eventos={muralEventos} />
    </Card>
  )
}
