import type { LucideIcon } from 'lucide-react'
import {
  CreditCard,
  FileText,
  Image,
  Mail,
  MessageCircle,
  Phone,
  QrCode,
  Receipt,
  Scan,
} from 'lucide-react'
import type { Paciente } from '../types'
import { pacientes } from './mock'

export interface ScoreComponente {
  label: string
  value: number
}

export interface JornadaEtapa {
  id: string
  label: string
  status: 'done' | 'current' | 'pending'
  data?: string
  responsavel?: string
  fotos?: number
  observacoes?: string
}

export interface ValorPaciente {
  totalInvestido: number
  aindaContratado: number
  potencialFuturo: number
  lifetimeValue: number
}

export interface ProximaAcaoIA {
  titulo: string
  descricao: string
  probabilidade: number
  receitaEstimada: number
  cta: string
}

export interface RiscoPaciente {
  label: string
  percentual: number
}

export interface OportunidadePaciente {
  id: string
  titulo: string
  chance: number
  receita: number
}

export interface ComunicacaoItem {
  id: string
  canal: 'whatsapp' | 'sms' | 'email' | 'ligacao'
  data: string
  hora: string
  resumo: string
  direcao: 'enviado' | 'recebido'
}

export interface DocumentoItem {
  id: string
  titulo: string
  tipo: 'contrato' | 'foto' | 'radiografia' | 'exame' | 'assinatura' | 'pdf'
  data: string
  icon: LucideIcon
}

export interface FinanceiroItem {
  id: string
  descricao: string
  valor: number
  metodo: 'pix' | 'cartao' | 'boleto' | 'negociacao'
  status: 'pago' | 'pendente' | 'atrasado' | 'negociado'
  vencimento: string
}

export interface SatisfacaoPaciente {
  nps: number
  estrelas: number
  avaliacoes: number
  comentarioDestaque: string
  probabilidadeIndicar: number
}

export interface PacienteInteligencia {
  pacienteId: string
  idade: number
  cidade: string
  dentista: string
  statusTratamento: string
  ticketTotal: number
  tempoRelacionamento: string
  builderScore: number
  builderScoreLabel: string
  builderScoreGrade: string
  resumoExecutivo: string[]
  recomendacao: string
  visaoGeral: {
    telefone: string
    whatsapp: string
    email: string
    cpf: string
    ultimaConsulta: string
    proximaConsulta: string
    ultimoContato: string
    origem: string
  }
  jornada: JornadaEtapa[]
  valor: ValorPaciente
  proximaAcao: ProximaAcaoIA
  riscos: RiscoPaciente[]
  oportunidades: OportunidadePaciente[]
  comunicacoes: ComunicacaoItem[]
  documentos: DocumentoItem[]
  financeiro: FinanceiroItem[]
  satisfacao: SatisfacaoPaciente
  scoreComponentes: ScoreComponente[]
  planoInteligente: string[]
}

const mariaInteligencia: PacienteInteligencia = {
  pacienteId: '1',
  idade: 42,
  cidade: 'Aracaju, SE',
  dentista: 'Dra. Patrícia Almeida',
  statusTratamento: 'Prótese em andamento',
  ticketTotal: 18400,
  tempoRelacionamento: '3 anos',
  builderScore: 94,
  builderScoreLabel: 'Paciente Premium',
  builderScoreGrade: 'A+',
  resumoExecutivo: [
    'Paciente há 3 anos.',
    'Investiu R$ 18.400.',
    'Possui excelente histórico de pagamentos.',
    'Tem alta probabilidade de adquirir clareamento.',
    'Está apta para revisão em 20 dias.',
    'Possui grande potencial para indicar novos pacientes.',
  ],
  recomendacao: 'Agendar revisão e oferecer clareamento.',
  visaoGeral: {
    telefone: '(79) 99901-2345',
    whatsapp: '(79) 99901-2345',
    email: 'maria.silva@email.com',
    cpf: '***.456.789-**',
    ultimaConsulta: '20/06/2026',
    proximaConsulta: '15/07/2026',
    ultimoContato: 'Hoje, 08:18',
    origem: 'Indicação',
  },
  jornada: [
    { id: '1', label: 'Avaliação', status: 'done', data: '12/03/2023', responsavel: 'Dra. Patrícia', fotos: 4, observacoes: 'Avaliação completa — plano implantológico' },
    { id: '2', label: 'Orçamento', status: 'done', data: '15/03/2023', responsavel: 'Recepção', observacoes: 'Orçamento R$ 24.800 aprovado parcialmente' },
    { id: '3', label: 'Aceitou', status: 'done', data: '18/03/2023', responsavel: 'Dra. Patrícia', observacoes: 'Contrato assinado — implante + prótese' },
    { id: '4', label: 'Cirurgia', status: 'done', data: '02/04/2023', responsavel: 'Dr. Rafael', fotos: 6, observacoes: 'Implante unitário — sem intercorrências' },
    { id: '5', label: 'Implante', status: 'done', data: '02/04/2023', responsavel: 'Dr. Rafael', fotos: 3 },
    { id: '6', label: 'Prótese', status: 'current', data: 'Em andamento', responsavel: 'Dra. Patrícia', fotos: 2, observacoes: 'Prova intermediária realizada — ajuste oclusal' },
    { id: '7', label: 'Revisão', status: 'pending', data: '15/07/2026', responsavel: 'Dra. Patrícia', observacoes: 'Revisão semestral agendada' },
    { id: '8', label: 'Programa Fidelidade', status: 'pending', observacoes: 'Elegível após conclusão da prótese' },
  ],
  valor: {
    totalInvestido: 18400,
    aindaContratado: 6800,
    potencialFuturo: 11200,
    lifetimeValue: 42000,
  },
  proximaAcao: {
    titulo: 'Paciente apto para clareamento',
    descricao: 'Histórico de tratamentos estéticos e alto engajamento indicam momento ideal para upsell.',
    probabilidade: 87,
    receitaEstimada: 2400,
    cta: 'Enviar proposta',
  },
  riscos: [
    { label: 'Cancelar tratamento', percentual: 12 },
    { label: 'Faltar consulta', percentual: 18 },
    { label: 'Não pagar parcela', percentual: 9 },
    { label: 'Não retornar', percentual: 15 },
  ],
  oportunidades: [
    { id: '1', titulo: 'Clareamento', chance: 87, receita: 2400 },
    { id: '2', titulo: 'Facetas', chance: 62, receita: 8200 },
    { id: '3', titulo: 'Ortodontia', chance: 28, receita: 6800 },
    { id: '4', titulo: 'Revisão', chance: 95, receita: 350 },
    { id: '5', titulo: 'Programa Indique', chance: 78, receita: 1200 },
  ],
  comunicacoes: [
    { id: '1', canal: 'whatsapp', data: '25/06/2026', hora: '08:18', resumo: 'Confirmação de consulta enviada — paciente respondeu ✓', direcao: 'enviado' },
    { id: '2', canal: 'ligacao', data: '24/06/2026', hora: '14:30', resumo: 'Ligação de follow-up pós-procedimento', direcao: 'enviado' },
    { id: '3', canal: 'email', data: '22/06/2026', hora: '10:00', resumo: 'Orientações pós-cirúrgicas enviadas', direcao: 'enviado' },
    { id: '4', canal: 'whatsapp', data: '20/06/2026', hora: '16:45', resumo: 'Paciente enviou foto do local — tudo normal', direcao: 'recebido' },
    { id: '5', canal: 'sms', data: '18/06/2026', hora: '09:00', resumo: 'Lembrete de parcela — pagamento confirmado', direcao: 'enviado' },
  ],
  documentos: [
    { id: '1', titulo: 'Contrato de tratamento', tipo: 'contrato', data: '18/03/2023', icon: FileText },
    { id: '2', titulo: 'Fotos intraorais', tipo: 'foto', data: '12/03/2023', icon: Image },
    { id: '3', titulo: 'Radiografia panorâmica', tipo: 'radiografia', data: '12/03/2023', icon: Scan },
    { id: '4', titulo: 'Exame de sangue', tipo: 'exame', data: '28/03/2023', icon: Receipt },
    { id: '5', titulo: 'Termo de consentimento', tipo: 'assinatura', data: '02/04/2023', icon: FileText },
    { id: '6', titulo: 'Plano de tratamento PDF', tipo: 'pdf', data: '15/03/2023', icon: FileText },
  ],
  financeiro: [
    { id: '1', descricao: 'Parcela implante 2/6', valor: 1200, metodo: 'boleto', status: 'atrasado', vencimento: '10/06/2026' },
    { id: '2', descricao: 'Parcela implante 1/6', valor: 1200, metodo: 'pix', status: 'pago', vencimento: '10/05/2026' },
    { id: '3', descricao: 'Entrada tratamento', valor: 4800, metodo: 'cartao', status: 'pago', vencimento: '18/03/2023' },
    { id: '4', descricao: 'Negociação — reparcelamento', valor: 2400, metodo: 'negociacao', status: 'negociado', vencimento: '01/07/2026' },
  ],
  satisfacao: {
    nps: 9,
    estrelas: 4.8,
    avaliacoes: 6,
    comentarioDestaque: '"Atendimento excepcional, me sinto muito bem cuidada."',
    probabilidadeIndicar: 82,
  },
  scoreComponentes: [
    { label: 'Financeiro', value: 91 },
    { label: 'Relacionamento', value: 96 },
    { label: 'Pontualidade', value: 88 },
    { label: 'Fidelização', value: 94 },
    { label: 'Potencial Comercial', value: 97 },
    { label: 'Saúde do Tratamento', value: 93 },
  ],
  planoInteligente: [
    'Agendar revisão',
    'Enviar lembrete',
    'Preparar proposta',
    'Atualizar CRM',
    'Registrar follow-up',
  ],
}

function gerarInteligenciaBasica(p: Paciente): PacienteInteligencia {
  const score = p.status === 'inativo' ? 58 : p.valorPendente > 3000 ? 72 : 85
  return {
    ...mariaInteligencia,
    pacienteId: p.id,
    dentista: 'Equipe clínica',
    statusTratamento: p.tratamentos.join(' · '),
    ticketTotal: p.valorPendente > 0 ? 8400 + p.valorPendente : 6200,
    builderScore: score,
    builderScoreLabel: score >= 90 ? 'Paciente Premium' : score >= 75 ? 'Paciente Fiel' : 'Atenção necessária',
    builderScoreGrade: score >= 90 ? 'A+' : score >= 75 ? 'B+' : 'C',
    resumoExecutivo: [
      `Paciente cadastrado na unidade ${p.unidade}.`,
      `Última consulta em ${p.ultimaConsulta.split('-').reverse().join('/')}.`,
      p.valorPendente > 0 ? `Possui R$ ${p.valorPendente.toLocaleString('pt-BR')} pendente.` : 'Sem pendências financeiras.',
    ],
    recomendacao: p.proximoRetorno ? 'Confirmar próximo retorno.' : 'Reativar contato com paciente.',
    visaoGeral: {
      telefone: p.telefone,
      whatsapp: p.telefone,
      email: p.email,
      cpf: '***.***.***-**',
      ultimaConsulta: p.ultimaConsulta.split('-').reverse().join('/'),
      proximaConsulta: p.proximoRetorno?.split('-').reverse().join('/') ?? '—',
      ultimoContato: 'Há 3 dias',
      origem: 'Google',
    },
    valor: {
      totalInvestido: 6200 + p.valorPendente,
      aindaContratado: p.valorPendente,
      potencialFuturo: 4800,
      lifetimeValue: 18000,
    },
    proximaAcao: {
      titulo: `Acompanhar ${p.tratamentos[0]}`,
      descricao: 'IA identificou momento ideal para follow-up.',
      probabilidade: 65,
      receitaEstimada: 1200,
      cta: 'Enviar proposta',
    },
  }
}

const cache: Record<string, PacienteInteligencia> = { '1': mariaInteligencia }

export function getPacienteInteligencia(pacienteId: string): PacienteInteligencia {
  if (!cache[pacienteId]) {
    const p = pacientes.find((x) => x.id === pacienteId)
    if (!p) return mariaInteligencia
    cache[pacienteId] = gerarInteligenciaBasica(p)
  }
  return cache[pacienteId]
}

export const canalIcons = {
  whatsapp: MessageCircle,
  sms: MessageCircle,
  email: Mail,
  ligacao: Phone,
}

export const metodoIcons = {
  pix: QrCode,
  cartao: CreditCard,
  boleto: Receipt,
  negociacao: FileText,
}
