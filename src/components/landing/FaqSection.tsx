import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from '../../builder-ui'

const faqs = [
  {
    q: 'O ProOdonto Smart substitui meu sistema atual?',
    a: 'Na demonstração, mostramos como o ProOdonto Smart se integra à sua operação. O foco é inteligência executiva — recuperar receita, reduzir faltas e automatizar rotinas que hoje consomem horas da equipe.',
  },
  {
    q: 'Preciso de treinamento longo para usar?',
    a: 'Não. O Centro de Comando e o Builder Intelligence™ mostram o que fazer em menos de 30 segundos. A filosofia é: abrir, entender, agir.',
  },
  {
    q: 'Funciona para clínicas com mais de uma unidade?',
    a: 'Sim. O painel multiunidade consolida Aracaju, Simão Dias, Lagarto — ou quantas unidades você tiver — com ranking, mapa e comparativos em tempo real.',
  },
  {
    q: 'A IA faz diagnóstico odontológico?',
    a: 'Não. O Builder Intelligence™ atua exclusivamente em apoio administrativo, comercial e financeiro. Orientações clínicas devem ser confirmadas por profissional habilitado (CRO).',
  },
  {
    q: 'Meus dados estão seguros?',
    a: 'Sim. LGPD, criptografia em trânsito e repouso, backup automático e infraestrutura enterprise.',
  },
  {
    q: 'Posso testar antes de contratar?',
    a: 'Sim. Acesse a demonstração com joao@proodonto.com / demo123 e explore o painel executivo completo.',
  },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">FAQ</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg-strong tracking-tight">
            Perguntas frequentes
          </h2>
        </FadeIn>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FadeIn key={faq.q} delay={i * 0.05}>
              <div className="rounded-2xl border border-gray-100 dark:border-white/[0.06] bg-card overflow-hidden shadow-soft">
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-surface/50 transition-colors"
                >
                  <span className="font-semibold text-fg-strong text-[15px]">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-text-muted shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-text-muted font-light leading-relaxed text-[15px]">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
