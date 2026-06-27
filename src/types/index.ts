export type Unidade = 'Aracaju' | 'Simão Dias' | 'Lagarto'

export interface Paciente {
  id: string
  nome: string
  telefone: string
  email: string
  unidade: Unidade
  ultimaConsulta: string
  proximoRetorno?: string
  status: 'ativo' | 'inativo' | 'em_tratamento'
  valorPendente: number
  tratamentos: string[]
}

export interface Consulta {
  id: string
  paciente: string
  pacienteId: string
  dentista: string
  procedimento: string
  data: string
  hora: string
  unidade: Unidade
  status: 'confirmada' | 'pendente' | 'faltou' | 'realizada' | 'cancelada'
}

export interface Cobranca {
  id: string
  paciente: string
  pacienteId: string
  valor: number
  vencimento: string
  status: 'pago' | 'pendente' | 'atrasado' | 'negociado'
  unidade: Unidade
  procedimento: string
}

export interface PosAtendimento {
  id: string
  paciente: string
  procedimento: string
  data: string
  unidade: Unidade
  status: 'aguardando' | 'em_andamento' | 'concluido'
  proximaAcao: string
  satisfacao?: number
}

export interface Alerta {
  id: string
  tipo: 'financeiro' | 'agenda' | 'conversao' | 'falta' | 'info'
  titulo: string
  descricao: string
  prioridade: 'alta' | 'media' | 'baixa'
  unidade?: Unidade
}

export interface UnidadeInfo {
  nome: Unidade
  endereco: string
  dentistas: number
  consultasMes: number
  faturamento: number
  taxaConversao: number
  faltas: number
  ativa: boolean
}

export interface MetricasDashboard {
  faturamento: number
  faturamentoVariacao: number
  consultas: number
  consultasVariacao: number
  faltas: number
  faltasVariacao: number
  pendenciasFinanceiras: number
  pendenciasVariacao: number
  taxaConversao: number
  conversaoVariacao: number
  unidadesAtivas: number
}

export interface MensagemIA {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}
