import { Card, CardHeader, CircularGauge } from '../../builder-ui'
import { radarIndicadores } from '../../data/oportunidades'

export function RadarClinica() {
  return (
    <Card padding="lg" className="h-full">
      <CardHeader title="Radar da Clínica" subtitle="Saúde operacional em tempo real" />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-6 justify-items-center">
        {radarIndicadores.map((ind) => (
          <CircularGauge key={ind.label} label={ind.label} value={ind.value} color={ind.color} />
        ))}
      </div>
    </Card>
  )
}
