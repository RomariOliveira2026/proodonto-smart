import { motion } from 'framer-motion'
import { Check, Circle, Gift, Star } from 'lucide-react'

const etapas = [
  { label: 'Avaliação', status: 'done' as const, date: '12/03' },
  { label: 'Orçamento', status: 'done' as const, date: '15/03' },
  { label: 'Aceitou', status: 'done' as const, date: '18/03' },
  { label: 'Implante', status: 'done' as const, date: '02/04' },
  { label: 'Prótese', status: 'current' as const, date: 'Em andamento' },
  { label: 'Revisão', status: 'pending' as const, date: 'Agendada' },
  { label: 'Finalizado', status: 'pending' as const, date: '—' },
  { label: 'Programa Fidelidade', status: 'pending' as const, date: '—' },
]

export function PatientTimeline({ horizontal }: { horizontal?: boolean }) {
  if (horizontal) {
    return (
      <div className="overflow-x-auto pb-4 -mx-2 px-2">
        <div className="flex items-start gap-0 min-w-max">
          {etapas.map((etapa, i) => (
            <div key={etapa.label} className="flex items-start">
              <div className="flex flex-col items-center w-28">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  etapa.status === 'done' ? 'bg-success border-success text-white' :
                  etapa.status === 'current' ? 'bg-primary border-primary text-white shadow-glow' :
                  'bg-white border-gray-200 text-gray-300'
                }`}>
                  {etapa.status === 'done' ? <Check className="w-4 h-4" /> :
                   etapa.status === 'current' ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Circle className="w-3 h-3 fill-white" /></motion.div> :
                   <Circle className="w-3 h-3" />}
                </div>
                <p className={`text-xs font-semibold mt-2 text-center ${etapa.status === 'current' ? 'text-primary' : etapa.status === 'done' ? 'text-gray-700' : 'text-gray-400'}`}>
                  {etapa.label}
                </p>
                <p className="text-[10px] text-text-muted mt-0.5">{etapa.date}</p>
              </div>
              {i < etapas.length - 1 && (
                <div className={`w-12 h-0.5 mt-5 ${etapa.status === 'done' ? 'bg-success' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-2 bottom-2 w-px bg-gray-200" />
      {etapas.map((etapa, i) => (
        <motion.div
          key={etapa.label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="relative flex items-start gap-4 pb-8 last:pb-0"
        >
          <div className={`absolute -left-5 w-6 h-6 rounded-full flex items-center justify-center border-2 z-10 ${
            etapa.status === 'done' ? 'bg-success border-success text-white' :
            etapa.status === 'current' ? 'bg-primary border-primary text-white shadow-glow' :
            'bg-white border-gray-200 text-gray-300'
          }`}>
            {etapa.status === 'done' ? <Check className="w-3 h-3" /> :
             etapa.label === 'Programa Fidelidade' ? <Gift className="w-3 h-3" /> :
             etapa.status === 'current' ? <Star className="w-3 h-3" /> :
             <Circle className="w-2 h-2" />}
          </div>
          <div className="flex-1 pt-0.5">
            <p className={`font-semibold text-sm ${etapa.status === 'current' ? 'text-primary' : etapa.status === 'done' ? 'text-gray-800' : 'text-gray-400'}`}>
              {etapa.label}
            </p>
            <p className="text-xs text-text-muted mt-0.5">{etapa.date}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
