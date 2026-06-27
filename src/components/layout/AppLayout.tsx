import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Bell, Menu, Search, Sparkles } from 'lucide-react'
import { Sidebar } from './Sidebar'
import { ThemeToggle } from '../../builder-ui'
import { BuilderIntelligenceShell, useBuilderIntelligence } from '../../builder-intelligence'

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { setOpen } = useBuilderIntelligence()

  return (
    <div className="min-h-screen bg-surface flex">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 glass border-b border-gray-100/80 dark:border-border px-4 lg:px-8 py-3.5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100/80 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors"
              aria-label="Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1 max-w-lg hidden sm:block">
              <div className="relative group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="search"
                  placeholder="Buscar pacientes, cobranças, consultas..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200/80 dark:border-border text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 focus:bg-white dark:focus:bg-white/10 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <ThemeToggle size="sm" />
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 dark:bg-primary/15 text-primary text-xs font-semibold hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                R$ 24.3k potencial hoje
              </button>
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-white/10 text-gray-500 dark:text-gray-400 transition-colors">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white dark:ring-[#080d18]" />
              </button>
              <div className="flex items-center gap-3 pl-3 border-l border-gray-200/80 dark:border-border">
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center text-white text-xs font-bold shadow-soft">
                  JT
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">João Thales</p>
                  <p className="text-[11px] text-text-muted">Sócio-Administrador · Unidade Lagarto</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
      <BuilderIntelligenceShell />
    </div>
  )
}
