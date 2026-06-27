import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  CalendarX,
  Sparkles,
  Stethoscope,
  TrendingDown,
  UserMinus,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react'

export const acoesDoDia = [
  {
    id: 'urgente',
    badge: 'URGENTE',
    titulo: '9 parcelas vencidas',
    valor: 12400,
    cta: 'Resolver agora',
    variant: 'urgent' as const,
  },
  {
    id: 'consultas',
    badge: 'ATENÇÃO',
    titulo: 'Consultas em risco',
    quantidade: 18,
    valor: 14800,
    cta: 'Confirmar agora',
    variant: 'warning' as const,
  },
  {
    id: 'revisoes',
    badge: 'OPORTUNIDADE',
    titulo: 'Pacientes prontos para revisão',
    quantidade: 22,
    valor: 18700,
    cta: 'Convidar pacientes',
    variant: 'opportunity' as const,
  },
]

export const iaPrioridades = [
  { id: '1', ordem: 1, titulo: 'Cobrar pacientes em atraso', impacto: 12400, tempo: '15 minutos' },
  { id: '2', ordem: 2, titulo: 'Confirmar consultas', impacto: 14800, tempo: '8 minutos' },
  { id: '3', ordem: 3, titulo: 'Campanha de Clareamento', impacto: 11800, tempo: '1 clique' },
]

export interface RiscoItem {
  id: string
  titulo: string
  descricao: string
  icon: LucideIcon
}

export const riscos: RiscoItem[] = [
  { id: '1', titulo: 'Paciente importante cancelou', descricao: 'Maria Silva — Implante R$ 4.800', icon: UserMinus },
  { id: '2', titulo: 'Dentista ocioso', descricao: 'Dr. Marcelo — 2h livres hoje em Simão Dias', icon: Users },
  { id: '3', titulo: 'Agenda vazia amanhã', descricao: 'Lagarto — 4 lacunas entre 14h e 17h', icon: CalendarX },
  { id: '4', titulo: 'Unidade abaixo da meta', descricao: 'Lagarto — 78% da meta mensal', icon: TrendingDown },
  { id: '5', titulo: 'Conversão caiu', descricao: '-6% vs. semana anterior em Simão Dias', icon: AlertTriangle },
]

export interface OportunidadeItem {
  id: string
  titulo: string
  descricao: string
  valor?: number
  icon: LucideIcon
}

export const oportunidadesVerdes: OportunidadeItem[] = [
  { id: '1', titulo: 'Paciente apto para facetas', descricao: 'Fernanda Costa — orçamento aprovado', valor: 8200, icon: Sparkles },
  { id: '2', titulo: 'Paciente apto para clareamento', descricao: '15 pacientes na lista de espera', valor: 11800, icon: Sparkles },
  { id: '3', titulo: 'Paciente pronto para revisão', descricao: '22 retornos pendentes', valor: 18700, icon: Stethoscope },
  { id: '4', titulo: 'Paciente indicou amigo', descricao: 'Carlos indicou 2 novos contatos', icon: UserPlus },
  { id: '5', titulo: 'Cobrança recuperável', descricao: 'R$ 3.150 recuperados hoje', valor: 3150, icon: Wallet },
]

export const termometroIndicadores = [
  { label: 'Financeiro', value: 92 },
  { label: 'Agenda', value: 97 },
  { label: 'Equipe', value: 90 },
  { label: 'Conversão', value: 88 },
  { label: 'Marketing', value: 81 },
  { label: 'Fidelização', value: 95 },
  { label: 'Pós-atendimento', value: 94 },
]

export const NOTA_GERAL = 96

export const muralEventos = [
  { hora: '08:12', texto: 'Consulta confirmada', tipo: 'agenda' as const },
  { hora: '08:18', texto: 'Cobrança recuperada — R$ 850', tipo: 'financeiro' as const },
  { hora: '08:31', texto: 'Paciente marcou retorno', tipo: 'crm' as const },
  { hora: '09:10', texto: 'Nova avaliação agendada', tipo: 'agenda' as const },
  { hora: '09:22', texto: 'Faceta vendida — R$ 2.400', tipo: 'venda' as const },
  { hora: '09:45', texto: 'IA disparou campanha de clareamento', tipo: 'ia' as const },
]

export const previsao7Dias = [
  { dia: 'Qui', receitaPrevista: 18.4, receitaRisco: 3.2, agenda: 28, cobrancas: 9, conversoes: 4 },
  { dia: 'Sex', receitaPrevista: 22.1, receitaRisco: 2.8, agenda: 32, cobrancas: 7, conversoes: 5 },
  { dia: 'Sáb', receitaPrevista: 12.6, receitaRisco: 1.4, agenda: 14, cobrancas: 3, conversoes: 2 },
  { dia: 'Seg', receitaPrevista: 19.8, receitaRisco: 4.1, agenda: 26, cobrancas: 11, conversoes: 3 },
  { dia: 'Ter', receitaPrevista: 21.3, receitaRisco: 2.5, agenda: 30, cobrancas: 8, conversoes: 6 },
  { dia: 'Qua', receitaPrevista: 20.5, receitaRisco: 3.0, agenda: 29, cobrancas: 10, conversoes: 4 },
  { dia: 'Qui', receitaPrevista: 23.7, receitaRisco: 2.2, agenda: 34, cobrancas: 6, conversoes: 7 },
]

export const rotinaChecklist = [
  'Confirmar consultas',
  'Cobrar parcelas',
  'Agendar revisões',
  'Atualizar CRM',
  'Disparar campanhas',
  'Atualizar Dashboard',
]
