import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button, ThemeToggle, BrandLogo } from '../../builder-ui'
import './landing.css'

const navLinks = [
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#recursos', label: 'Recursos' },
  { href: '#calculadora', label: 'Calculadora' },
  { href: '#depoimentos', label: 'Depoimentos' },
  { href: '#faq', label: 'FAQ' },
]

interface LandingHeaderProps {
  menuOpen: boolean
  onMenuToggle: () => void
  onNavClick: () => void
}

export function LandingHeader({ menuOpen, onMenuToggle, onNavClick }: LandingHeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass landing-nav-scrolled border-b border-gray-100/70 dark:border-white/[0.06]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[76px]">
          <BrandLogo href="/" size="lg" className="transition-transform duration-300 group-hover:scale-105" />

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-[13px] font-medium text-text-muted hover:text-primary dark:hover:text-primary-light rounded-lg hover:bg-primary/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle size="sm" />
            <Link
              to="/login"
              className="text-sm font-medium text-fg-tertiary hover:text-primary transition-colors px-3 py-2"
            >
              Entrar
            </Link>
            <Link to="#calculadora">
              <Button variant="glow" size="sm" className="shadow-glow">
                Recuperar faturamento
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle size="sm" />
            <button
              type="button"
              className="p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-white/10 text-fg-secondary transition-colors"
              onClick={onMenuToggle}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-border bg-bg/95 backdrop-blur-xl px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onNavClick}
              className="block py-3 px-3 text-fg-secondary font-medium rounded-xl hover:bg-surface transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 space-y-3">
            <Link to="/login" onClick={onNavClick}>
              <Button fullWidth variant="glow" size="lg">
                Recuperar faturamento
              </Button>
            </Link>
            <Link to="/login" onClick={onNavClick} className="block text-center text-sm text-primary font-medium py-2">
              Já tenho conta — Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
