import { motion } from 'framer-motion'
import { Building2, MapPin, Plus, Star, TrendingDown, TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { AnimatedNumber, Badge, Button, Card, CardHeader, FadeIn } from '../builder-ui'
import { formatCurrency, unidades } from '../data/mock'

const comparativo = unidades.map((u) => ({
  nome: u.nome,
  receita: u.faturamento / 1000,
  conversao: u.taxaConversao,
  faltas: u.faltas,
  inadimplencia: Math.round(u.faturamento * 0.08 / 1000),
  satisfacao: u.nome === 'Aracaju' ? 4.8 : u.nome === 'Simão Dias' ? 4.5 : 4.2,
}))

const metrics = ['receita', 'conversao', 'faltas', 'inadimplencia', 'satisfacao'] as const
const metricLabels = { receita: 'Receita', conversao: 'Conversão', faltas: 'Faltas', inadimplencia: 'Inadimplência', satisfacao: 'Satisfação' }

export function MultiunidadesPage() {
  const total = unidades.reduce((s, u) => s + u.faturamento, 0)

  return (
    <div className="space-y-8 max-w-[1400px]">
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge variant="primary" dot>Multiunidades</Badge>
            <h1 className="font-display text-3xl font-bold text-gray-900 tracking-tight mt-3">Rede Sergipe</h1>
            <p className="text-text-muted font-light mt-1">
              Faturamento consolidado: <strong className="text-primary">{formatCurrency(total)}</strong>
            </p>
          </div>
          <Button variant="glow" icon={<Plus className="w-4 h-4" />}>Nova unidade</Button>
        </div>
      </FadeIn>

      {/* Visual comparison cards */}
      <div className="grid lg:grid-cols-3 gap-6">
        {unidades.map((u, i) => {
          const comp = comparativo.find((c) => c.nome === u.nome)!
          return (
            <FadeIn key={u.nome} delay={i * 0.1}>
              <Card padding="lg" hover glow={i === 0} className="relative overflow-hidden">
                {i === 0 && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="warning">Líder</Badge>
                  </div>
                )}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-gray-900">{u.nome}</h3>
                    <p className="text-xs text-text-muted flex items-center gap-1"><MapPin className="w-3 h-3" />{u.endereco}</p>
                  </div>
                </div>

                <p className="font-display text-3xl font-bold text-gradient mb-6">
                  <AnimatedNumber value={u.faturamento} prefix="R$ " />
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Conversão', value: `${comp.conversao}%`, good: comp.conversao >= 60, icon: TrendingUp },
                    { label: 'Faltas', value: comp.faltas, good: comp.faltas < 20, icon: TrendingDown },
                    { label: 'Inadimplência', value: `R$ ${(comp.inadimplencia * 1000).toLocaleString('pt-BR')}`, good: false, icon: TrendingDown },
                    { label: 'Satisfação', value: comp.satisfacao, good: true, icon: Star },
                  ].map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-surface/80">
                      <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">{m.label}</p>
                      <p className={`font-display font-bold text-lg mt-0.5 ${m.good ? 'text-success' : 'text-warning'}`}>{m.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(u.faturamento / total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full gradient-primary rounded-full"
                  />
                </div>
                <p className="text-[10px] text-text-muted mt-1 text-right">{((u.faturamento / total) * 100).toFixed(0)}% da receita total</p>
              </Card>
            </FadeIn>
          )
        })}
      </div>

      {/* Comparison chart */}
      <Card padding="lg">
        <CardHeader title="Comparativo visual" subtitle="Aracaju · Simão Dias · Lagarto" />
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparativo} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="nome" tick={{ fontSize: 13, fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #f0f0f0', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="receita" name="Receita (R$ mil)" fill="#0B5FA5" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="conversao" name="Conversão (%)" fill="#1DA7E0" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="faltas" name="Faltas" fill="#F59E0B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Metrics matrix */}
      <Card padding="lg">
        <CardHeader title="Matriz de performance" subtitle="Todas as métricas lado a lado" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Métrica</th>
                {unidades.map((u) => (
                  <th key={u.nome} className="text-center py-3 px-4 text-sm font-display font-bold text-gray-900">{u.nome}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m} className="border-t border-gray-50 hover:bg-surface/50 transition-colors">
                  <td className="py-4 px-4 text-sm font-medium text-gray-700">{metricLabels[m]}</td>
                  {comparativo.map((c) => (
                    <td key={c.nome} className="py-4 px-4 text-center">
                      <span className={`inline-block px-3 py-1.5 rounded-xl text-sm font-bold ${
                        m === 'faltas' || m === 'inadimplencia'
                          ? c[m] > (m === 'faltas' ? 20 : 10) ? 'bg-red-50 text-error' : 'bg-emerald-50 text-success'
                          : 'bg-primary/8 text-primary'
                      }`}>
                        {m === 'receita' ? `R$ ${c[m]}k` : m === 'satisfacao' ? `${c[m]} ★` : m === 'conversao' ? `${c[m]}%` : c[m]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
