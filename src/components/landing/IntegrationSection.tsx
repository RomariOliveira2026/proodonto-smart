import {
  Calendar,
  FileBarChart,
  Heart,
  MessageCircle,
  Plug,
  Users,
  Wallet,
} from 'lucide-react'
import { FadeIn } from '../../builder-ui'

const integrationCards = [
  { icon: Calendar, title: 'Integração com agenda', desc: 'Confirmações, faltas e buracos na operação.' },
  { icon: Users, title: 'Integração com pacientes', desc: 'Histórico, inatividade e perfil de retorno.' },
  { icon: Wallet, title: 'Integração com financeiro', desc: 'Parcelas, inadimplência e receita em risco.' },
  { icon: Heart, title: 'Integração com tratamentos', desc: 'Planos interrompidos e oportunidades de upsell.' },
  { icon: MessageCircle, title: 'Integração com WhatsApp', desc: 'Follow-up e cobrança amigável automatizada.' },
  { icon: FileBarChart, title: 'Relatórios inteligentes', desc: 'Visão executiva para sócios e gestores.' },
]

export function IntegrationSection() {
  return (
    <section id="integracao" className="py-24 lg:py-32 bg-surface/50 dark:bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-6 max-w-3xl mx-auto">
          <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">Camada conectável</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-fg-strong tracking-tight mb-5">
            Integra com o sistema que sua clínica já usa
          </h2>
          <p className="text-text-muted text-lg font-light leading-relaxed">
            O ProOdonto Smart foi pensado para atuar como uma camada inteligente sobre sistemas odontológicos já existentes.
            Ele analisa dados, identifica perdas, aponta oportunidades e ajuda a equipe a recuperar faturamento com apoio da IA.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="flex justify-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/8 border border-primary/15">
            <Plug className="w-4 h-4 text-primary-light" />
            <span className="text-sm text-fg-secondary">
              Não substitui seu ERP no primeiro momento — conecta e transforma.
            </span>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {integrationCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.06}>
              <div className="group h-full p-7 rounded-3xl bg-card border border-gray-100 dark:border-white/[0.06] shadow-soft hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1 transition-all duration-500">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <card.icon className="w-5 h-5 text-primary-light" />
                </div>
                <h3 className="font-display text-lg font-bold text-fg-strong mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-text-muted font-light leading-relaxed">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-10 text-center">
          <p className="text-sm text-text-muted italic max-w-xl mx-auto">
            A integração depende da disponibilidade técnica do sistema utilizado pela clínica.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
