import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bot,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Coins,
  HeartPulse,
  LogOut,
  Rocket,
  Target,
  Settings,
  Sparkles,
  Sun,
  Users,
  Wallet,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BrandLogo } from '../../builder-ui'
import { useAuth } from '../../contexts/AuthContext'

const menuItems = [
  { path: '/app', label: 'Centro de Crescimento', icon: Rocket, exact: true },
  { path: '/app/oportunidades', label: 'Central de Oportunidades', icon: Coins },
  { path: '/app/centro-comando', label: 'Centro de Comando', icon: Target },
  { path: '/app/smart-morning', label: 'Smart Morning', icon: Sun },
  { path: '/app/agenda', label: 'Agenda', icon: Calendar },
  { path: '/app/pacientes', label: 'Inteligência do Paciente', icon: Users },
  { path: '/app/financeiro', label: 'Financeiro', icon: Wallet },
  { path: '/app/pos-atendimento', label: 'Pós-atendimento', icon: HeartPulse },
  { path: '/app/multiunidades', label: 'Multiunidades', icon: Building2 },
  { path: '/app/ia-assistente', label: 'Builder Intelligence™', icon: Bot },
  { path: '/app/configuracoes', label: 'Configurações', icon: Settings },
]

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

export function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path)

  const width = collapsed ? 'w-[76px]' : 'w-[272px]'

  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={onMobileClose} />}
      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 ${width} ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full bg-[#0a1628] border-r border-white/[0.06]">
          {/* Logo */}
          <div className={`flex items-center gap-3 px-5 py-6 ${collapsed ? 'justify-center' : ''}`}>
            {collapsed ? (
              <BrandLogo variant="icon" size="md" />
            ) : (
              <BrandLogo size="lg" theme="on-dark" className="flex-1 min-w-0" />
            )}
            <button onClick={onMobileClose} className="lg:hidden text-white/50 hover:text-white" aria-label="Fechar">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* IA badge */}
          {!collapsed && (
            <div className="mx-4 mb-4 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary-light" />
                <span className="text-[11px] text-white/60 font-medium">IA Gestora ativa</span>
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              </div>
            </div>
          )}

          <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
            {menuItems.map((item) => {
              const active = isActive(item.path, item.exact)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onMobileClose}
                  title={collapsed ? item.label : undefined}
                  className="block relative"
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.08] border border-white/[0.08]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                    active ? 'text-white' : 'text-white/50 hover:text-white/80'
                  } ${collapsed ? 'justify-center' : ''}`}>
                    <item.icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-primary-light' : ''}`} />
                    {!collapsed && item.label}
                  </span>
                </Link>
              )
            })}
          </nav>

          <div className="p-3 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={() => {
                logout()
                navigate('/login')
                onMobileClose()
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all w-full ${collapsed ? 'justify-center' : ''}`}
            >
              <LogOut className="w-[18px] h-[18px]" />
              {!collapsed && 'Sair'}
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-full mt-1 py-2 text-white/30 hover:text-white/60 transition-colors"
              aria-label={collapsed ? 'Expandir' : 'Recolher'}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </aside>
      <div className={`hidden lg:block shrink-0 transition-all duration-300 ${width}`} />
    </>
  )
}
