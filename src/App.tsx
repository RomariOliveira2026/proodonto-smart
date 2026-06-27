import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BuilderIntelligenceProvider } from './builder-intelligence'
import { AppLayout } from './components/layout/AppLayout'
import { BackToTop } from './components/layout/BackToTop'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { OportunidadesPage } from './pages/OportunidadesPage'
import { CentroComandoPage } from './pages/CentroComandoPage'
import { SmartMorningPage } from './pages/SmartMorningPage'
import { AgendaPage } from './pages/AgendaPage'
import { PacientesPage } from './pages/PacientesPage'
import { FinanceiroPage } from './pages/FinanceiroPage'
import { PosAtendimentoPage } from './pages/PosAtendimentoPage'
import { MultiunidadesPage } from './pages/MultiunidadesPage'
import { IAAssistentePage } from './pages/IAAssistentePage'
import { ConfiguracoesPage } from './pages/ConfiguracoesPage'

export default function App() {
  return (
    <BrowserRouter>
      <BuilderIntelligenceProvider>
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="oportunidades" element={<OportunidadesPage />} />
          <Route path="centro-comando" element={<CentroComandoPage />} />
          <Route path="smart-morning" element={<SmartMorningPage />} />
          <Route path="agenda" element={<AgendaPage />} />
          <Route path="pacientes" element={<PacientesPage />} />
          <Route path="financeiro" element={<FinanceiroPage />} />
          <Route path="pos-atendimento" element={<PosAtendimentoPage />} />
          <Route path="multiunidades" element={<MultiunidadesPage />} />
          <Route path="ia-assistente" element={<IAAssistentePage />} />
          <Route path="configuracoes" element={<ConfiguracoesPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <BackToTop />
      </BuilderIntelligenceProvider>
    </BrowserRouter>
  )
}
