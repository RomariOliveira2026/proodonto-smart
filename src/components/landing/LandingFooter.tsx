import { Link } from 'react-router-dom'
import { Globe, Mail, MapPin, Share2 } from 'lucide-react'
import { BrandLogo } from '../../builder-ui'

const columns = [
  {
    title: 'Produto',
    links: [
      { label: 'Benefícios', href: '#beneficios' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Recursos', href: '#recursos' },
      { label: 'Calculadora', href: '#calculadora' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre a BuilderTudo', href: '#' },
      { label: 'Builder Intelligence™', href: '#' },
      { label: 'Contato comercial', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidade (LGPD)', href: '#' },
      { label: 'Termos de uso', href: '#' },
      { label: 'Segurança', href: '#' },
    ],
  },
]

export function LandingFooter() {
  return (
    <footer className="relative border-t border-gray-100 dark:border-white/[0.06] bg-[#0a1628] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(29,167,224,0.12),transparent_55%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-14">
          <div className="lg:col-span-2">
            <BrandLogo size="lg" theme="on-dark" className="mb-5" />
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm mb-6">
              A inteligência que faz sua clínica crescer. Software executivo para gestão odontológica multiunidade — powered by Builder Intelligence™.
            </p>
            <div className="flex items-center gap-2 text-sm text-white/50">
              <MapPin className="w-4 h-4 shrink-0" />
              Sergipe, Brasil · Atendimento nacional
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-white/70 hover:text-primary-light transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.08]">
          <p className="text-sm text-white/40">
            © 2026 ProOdonto Smart · BuilderTudo · Case #001
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:contato@proodonto.com" className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors" aria-label="E-mail">
              <Mail className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors" aria-label="Redes sociais">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors" aria-label="Site BuilderTudo">
              <Globe className="w-4 h-4" />
            </a>
            <Link to="/login" className="text-sm font-semibold text-primary-light hover:text-white transition-colors ml-2">
              Acessar painel →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
