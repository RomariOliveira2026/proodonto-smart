import { Link } from 'react-router-dom'
import { ArrowRight, Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Button, FadeIn, ThemeToggle } from '../builder-ui'
import { HeroDashboard } from '../components/landing/HeroDashboard'
import { LossCalculator } from '../components/landing/LossCalculator'
import { BeforeAfter } from '../components/landing/BeforeAfter'

const modulos = [
  { title: 'Agenda Inteligente', desc: 'Confirmações automáticas que reduzem faltas em até 40%.', metric: '-40% faltas' },
  { title: 'Financeiro Automatizado', desc: 'Recupere inadimplência sem ligar paciente por paciente.', metric: '+28% recebíveis' },
  { title: 'IA Comercial', desc: 'Venda mais tratamentos com sugestões baseadas em dados.', metric: '+35% conversão' },
  { title: 'CRM & Jornada', desc: 'Cada paciente com timeline completa do primeiro contato à fidelização.', metric: 'LTV +52%' },
  { title: 'Multiunidades', desc: 'Aracaju, Simão Dias, Lagarto — tudo em um painel executivo.', metric: '3 unidades' },
  { title: 'Smart Morning', desc: 'Seu dia em 30 segundos. Receita, agenda, metas e alertas.', metric: '07:00 daily' },
]

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 glass border-b border-gray-100/60 dark:border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-soft group-hover:shadow-glow transition-shadow">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-gray-900 dark:text-gray-100 tracking-tight">ProOdonto</span>
                <span className="font-display font-light text-lg text-primary-light ml-1">Smart</span>
              </div>
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <a href="#calculadora" className="text-sm text-text-muted hover:text-primary transition-colors">Calculadora</a>
              <a href="#modulos" className="text-sm text-text-muted hover:text-primary transition-colors">Módulos</a>
              <Link to="/login" className="text-sm text-text-muted hover:text-primary transition-colors">Entrar</Link>
              <ThemeToggle size="sm" />
              <Link to="/login">
                <Button variant="glow" size="sm">Quero recuperar meu faturamento</Button>
              </Link>
            </div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle size="sm" />
              <button className="p-2 text-gray-700 dark:text-gray-300" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-border px-4 py-4 space-y-3 bg-bg">
            <a href="#calculadora" className="block py-2 text-text dark:text-gray-200" onClick={() => setMenuOpen(false)}>Calculadora</a>
            <a href="#modulos" className="block py-2 text-text dark:text-gray-200" onClick={() => setMenuOpen(false)}>Módulos</a>
            <Link to="/login" onClick={() => setMenuOpen(false)}><Button fullWidth variant="glow">Quero recuperar meu faturamento</Button></Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <FadeIn>
                <p className="font-display text-sm font-semibold text-primary dark:text-primary-light uppercase tracking-widest mb-6">
                  A inteligência que faz sua clínica crescer.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight mb-6">
                  Sua clínica perde dinheiro todos os dias...
                  <br />
                  <span className="text-gradient">e talvez você nem perceba.</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-3 text-lg text-text-muted dark:text-gray-400 font-light leading-relaxed mb-10 max-w-xl">
                  <p>Pacientes faltam. Parcelas atrasam. Horários ficam vazios.</p>
                  <p>Tratamentos deixam de ser vendidos.</p>
                  <p>Enquanto isso sua equipe passa horas respondendo mensagens.</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">O ProOdonto Smart automatiza tudo isso.</p>
                </div>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login">
                    <Button variant="glow" size="xl" icon={<Sparkles className="w-5 h-5" />}>
                      Quero recuperar meu faturamento
                    </Button>
                  </Link>
                  <Link to="/app">
                    <Button variant="outline" size="xl">
                      Ver demonstração
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
            <div className="lg:pl-4">
              <HeroDashboard />
            </div>
          </div>
        </div>
      </section>

      <LossCalculator />
      <BeforeAfter />

      {/* Módulos */}
      <section id="modulos" className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
              Cada módulo coloca mais dinheiro no seu bolso
            </h2>
            <p className="text-text-muted text-lg font-light">Não é funcionalidade. É resultado financeiro.</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulos.map((m, i) => (
              <FadeIn key={m.title} delay={i * 0.08}>
                <div className="group h-full p-8 rounded-3xl bg-card border border-gray-100 dark:border-border shadow-soft hover:shadow-elevated hover:border-primary/20 hover:-translate-y-1 transition-all duration-300">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/8 text-primary text-xs font-bold mb-4">{m.metric}</span>
                  <h3 className="font-display text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary transition-colors">{m.title}</h3>
                  <p className="text-text-muted font-light leading-relaxed">{m.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-[0.03]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
              Se você tivesse isso há 3 anos,<br />quanto teria economizado?
            </h2>
            <p className="text-lg text-text-muted font-light mb-10">
              Centenas de milhares de reais. Agora imagine os próximos 3 anos com o ProOdonto Smart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login"><Button variant="glow" size="xl">Quero recuperar meu faturamento</Button></Link>
              <Link to="/app"><Button variant="outline" size="xl">Ver demonstração ao vivo</Button></Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-gray-100 dark:border-border py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xs">P</span>
            </div>
            <div>
              <p className="font-display font-bold text-gray-900 dark:text-gray-100">ProOdonto Smart</p>
              <p className="text-xs text-text-muted">A inteligência que faz sua clínica crescer.</p>
            </div>
          </div>
          <p className="text-sm text-text-muted">© 2026 ProOdonto Smart · BuilderTudo Case #001</p>
        </div>
      </footer>
    </div>
  )
}
