import { lazy, Suspense, type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BuilderIntelligenceProvider } from './builder-intelligence'
import { ProtectedRoute, GuestRoute } from './components/auth/ProtectedRoute'
import { AppLayout } from './components/layout/AppLayout'
import { BackToTop } from './components/layout/BackToTop'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { ForgotPasswordPage } from './pages/ForgotPasswordPage'

const DashboardPage = lazy(() => import('./pages/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const ExecutionCenterPage = lazy(() => import('./pages/ExecutionCenterPage').then((m) => ({ default: m.ExecutionCenterPage })))
const OportunidadesPage = lazy(() => import('./pages/OportunidadesPage').then((m) => ({ default: m.OportunidadesPage })))
const CentroComandoPage = lazy(() => import('./pages/CentroComandoPage').then((m) => ({ default: m.CentroComandoPage })))
const SmartMorningPage = lazy(() => import('./pages/SmartMorningPage').then((m) => ({ default: m.SmartMorningPage })))
const AgendaPage = lazy(() => import('./pages/AgendaPage').then((m) => ({ default: m.AgendaPage })))
const PacientesPage = lazy(() => import('./pages/PacientesPage').then((m) => ({ default: m.PacientesPage })))
const FinanceiroPage = lazy(() => import('./pages/FinanceiroPage').then((m) => ({ default: m.FinanceiroPage })))
const PosAtendimentoPage = lazy(() => import('./pages/PosAtendimentoPage').then((m) => ({ default: m.PosAtendimentoPage })))
const MultiunidadesPage = lazy(() => import('./pages/MultiunidadesPage').then((m) => ({ default: m.MultiunidadesPage })))
const IAAssistentePage = lazy(() => import('./pages/IAAssistentePage').then((m) => ({ default: m.IAAssistentePage })))
const ConfiguracoesPage = lazy(() => import('./pages/ConfiguracoesPage').then((m) => ({ default: m.ConfiguracoesPage })))

function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]" role="status" aria-label="Carregando">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-pulse"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function Lazy({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>
}

export default function App() {
  return (
    <BrowserRouter>
      <BuilderIntelligenceProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<GuestRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Lazy><DashboardPage /></Lazy>} />
              <Route path="execucao/:actionKey" element={<Lazy><ExecutionCenterPage /></Lazy>} />
              <Route path="oportunidades" element={<Lazy><OportunidadesPage /></Lazy>} />
              <Route path="centro-comando" element={<Lazy><CentroComandoPage /></Lazy>} />
              <Route path="smart-morning" element={<Lazy><SmartMorningPage /></Lazy>} />
              <Route path="agenda" element={<Lazy><AgendaPage /></Lazy>} />
              <Route path="pacientes" element={<Lazy><PacientesPage /></Lazy>} />
              <Route path="financeiro" element={<Lazy><FinanceiroPage /></Lazy>} />
              <Route path="pos-atendimento" element={<Lazy><PosAtendimentoPage /></Lazy>} />
              <Route path="multiunidades" element={<Lazy><MultiunidadesPage /></Lazy>} />
              <Route path="ia-assistente" element={<Lazy><IAAssistentePage /></Lazy>} />
              <Route path="configuracoes" element={<Lazy><ConfiguracoesPage /></Lazy>} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BackToTop />
      </BuilderIntelligenceProvider>
    </BrowserRouter>
  )
}
