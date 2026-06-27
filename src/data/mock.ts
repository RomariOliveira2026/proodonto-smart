import type {
  Alerta,
  Cobranca,
  Consulta,
  MetricasDashboard,
  Paciente,
  PosAtendimento,
  UnidadeInfo,
} from '../types'

export const unidades: UnidadeInfo[] = [
  {
    nome: 'Aracaju',
    endereco: 'Av. Beira Mar, 1250 — Centro',
    dentistas: 8,
    consultasMes: 342,
    faturamento: 187500,
    taxaConversao: 68,
    faltas: 28,
    ativa: true,
  },
  {
    nome: 'Simão Dias',
    endereco: 'Av. Gov. João Durval Carneiro, 520 — Centro',
    dentistas: 5,
    consultasMes: 218,
    faturamento: 112300,
    taxaConversao: 61,
    faltas: 19,
    ativa: true,
  },
  {
    nome: 'Lagarto',
    endereco: 'Praça da Matriz, 92 — Centro',
    dentistas: 4,
    consultasMes: 176,
    faturamento: 89400,
    taxaConversao: 55,
    faltas: 15,
    ativa: true,
  },
]

export const metricas: MetricasDashboard = {
  faturamento: 389200,
  faturamentoVariacao: 12.4,
  consultas: 736,
  consultasVariacao: 8.2,
  faltas: 62,
  faltasVariacao: -15.3,
  pendenciasFinanceiras: 42850,
  pendenciasVariacao: -6.8,
  taxaConversao: 63,
  conversaoVariacao: 4.1,
  unidadesAtivas: 3,
}

export const faturamentoMensal = [
  { mes: 'Jan', Aracaju: 152000, 'Simão Dias': 98000, Lagarto: 72000 },
  { mes: 'Fev', Aracaju: 168000, 'Simão Dias': 105000, Lagarto: 78000 },
  { mes: 'Mar', Aracaju: 175000, 'Simão Dias': 108000, Lagarto: 82000 },
  { mes: 'Abr', Aracaju: 182000, 'Simão Dias': 110000, Lagarto: 85000 },
  { mes: 'Mai', Aracaju: 185000, 'Simão Dias': 111500, Lagarto: 88000 },
  { mes: 'Jun', Aracaju: 187500, 'Simão Dias': 112300, Lagarto: 89400 },
]

export const consultasSemana = [
  { dia: 'Seg', realizadas: 42, faltas: 4 },
  { dia: 'Ter', realizadas: 38, faltas: 6 },
  { dia: 'Qua', realizadas: 45, faltas: 3 },
  { dia: 'Qui', realizadas: 40, faltas: 5 },
  { dia: 'Sex', realizadas: 35, faltas: 7 },
  { dia: 'Sáb', realizadas: 18, faltas: 2 },
]

export const alertas: Alerta[] = [
  {
    id: '1',
    tipo: 'financeiro',
    titulo: 'R$ 12.400 em cobranças vencidas',
    descricao: '18 pacientes com pagamentos atrasados há mais de 15 dias. Sugestão: acionar fluxo de recuperação.',
    prioridade: 'alta',
    unidade: 'Aracaju',
  },
  {
    id: '2',
    tipo: 'falta',
    titulo: 'Taxa de faltas elevada na sexta',
    descricao: '23% de faltas nas sextas-feiras em Simão Dias. Considere reforçar confirmação automática.',
    prioridade: 'media',
    unidade: 'Simão Dias',
  },
  {
    id: '3',
    tipo: 'conversao',
    titulo: 'Oportunidade de upsell em Lagarto',
    descricao: '34 pacientes com plano de tratamento pendente de aprovação. Potencial de R$ 48.200.',
    prioridade: 'media',
    unidade: 'Lagarto',
  },
  {
    id: '4',
    tipo: 'agenda',
    titulo: 'Agenda com lacunas amanhã',
    descricao: '3 horários vagos entre 14h e 17h em Aracaju. Lista de espera com 7 pacientes.',
    prioridade: 'baixa',
    unidade: 'Aracaju',
  },
]

export const pacientes: Paciente[] = [
  {
    id: '1',
    nome: 'Maria Silva Santos',
    telefone: '(79) 99901-2345',
    email: 'maria.silva@email.com',
    unidade: 'Aracaju',
    ultimaConsulta: '2026-06-20',
    proximoRetorno: '2026-07-15',
    status: 'em_tratamento',
    valorPendente: 2400,
    tratamentos: ['Implante', 'Clareamento'],
  },
  {
    id: '2',
    nome: 'João Pedro Oliveira',
    telefone: '(79) 99876-5432',
    email: 'joao.oliveira@email.com',
    unidade: 'Simão Dias',
    ultimaConsulta: '2026-06-18',
    status: 'ativo',
    valorPendente: 0,
    tratamentos: ['Limpeza', 'Restauração'],
  },
  {
    id: '3',
    nome: 'Ana Carolina Mendes',
    telefone: '(79) 99123-4567',
    email: 'ana.mendes@email.com',
    unidade: 'Lagarto',
    ultimaConsulta: '2026-06-15',
    proximoRetorno: '2026-06-28',
    status: 'em_tratamento',
    valorPendente: 5800,
    tratamentos: ['Ortodontia'],
  },
  {
    id: '4',
    nome: 'Carlos Eduardo Lima',
    telefone: '(79) 98765-4321',
    email: 'carlos.lima@email.com',
    unidade: 'Aracaju',
    ultimaConsulta: '2026-06-10',
    status: 'ativo',
    valorPendente: 850,
    tratamentos: ['Canal'],
  },
  {
    id: '5',
    nome: 'Fernanda Costa Ribeiro',
    telefone: '(79) 99654-3210',
    email: 'fernanda.ribeiro@email.com',
    unidade: 'Simão Dias',
    ultimaConsulta: '2026-06-22',
    proximoRetorno: '2026-07-01',
    status: 'em_tratamento',
    valorPendente: 3200,
    tratamentos: ['Facetas', 'Clareamento'],
  },
  {
    id: '6',
    nome: 'Ricardo Almeida Souza',
    telefone: '(79) 99432-1098',
    email: 'ricardo.souza@email.com',
    unidade: 'Lagarto',
    ultimaConsulta: '2026-05-28',
    status: 'inativo',
    valorPendente: 1200,
    tratamentos: ['Extração'],
  },
]

export const consultas: Consulta[] = [
  { id: '1', paciente: 'Maria Silva Santos', pacienteId: '1', dentista: 'Dra. Patrícia', procedimento: 'Avaliação implante', data: '2026-06-25', hora: '08:00', unidade: 'Aracaju', status: 'confirmada' },
  { id: '2', paciente: 'João Pedro Oliveira', pacienteId: '2', dentista: 'Dr. Marcelo', procedimento: 'Restauração', data: '2026-06-25', hora: '09:30', unidade: 'Simão Dias', status: 'confirmada' },
  { id: '3', paciente: 'Ana Carolina Mendes', pacienteId: '3', dentista: 'Dra. Juliana', procedimento: 'Ajuste ortodôntico', data: '2026-06-25', hora: '10:00', unidade: 'Lagarto', status: 'pendente' },
  { id: '4', paciente: 'Carlos Eduardo Lima', pacienteId: '4', dentista: 'Dr. Rafael', procedimento: 'Retorno canal', data: '2026-06-25', hora: '11:00', unidade: 'Aracaju', status: 'confirmada' },
  { id: '5', paciente: 'Fernanda Costa Ribeiro', pacienteId: '5', dentista: 'Dra. Patrícia', procedimento: 'Prova facetas', data: '2026-06-25', hora: '14:00', unidade: 'Simão Dias', status: 'confirmada' },
  { id: '6', paciente: 'Ricardo Almeida Souza', pacienteId: '6', dentista: 'Dr. Marcelo', procedimento: 'Avaliação', data: '2026-06-25', hora: '15:30', unidade: 'Lagarto', status: 'faltou' },
  { id: '7', paciente: 'Luciana Ferreira', pacienteId: '7', dentista: 'Dra. Juliana', procedimento: 'Limpeza', data: '2026-06-25', hora: '16:00', unidade: 'Aracaju', status: 'pendente' },
  { id: '8', paciente: 'Pedro Henrique Dias', pacienteId: '8', dentista: 'Dr. Rafael', procedimento: 'Clareamento', data: '2026-06-26', hora: '08:30', unidade: 'Aracaju', status: 'confirmada' },
]

export const cobrancas: Cobranca[] = [
  { id: '1', paciente: 'Maria Silva Santos', pacienteId: '1', valor: 1200, vencimento: '2026-06-10', status: 'atrasado', unidade: 'Aracaju', procedimento: 'Parcela implante 2/6' },
  { id: '2', paciente: 'Ana Carolina Mendes', pacienteId: '3', valor: 5800, vencimento: '2026-06-20', status: 'atrasado', unidade: 'Lagarto', procedimento: 'Ortodontia mensal' },
  { id: '3', paciente: 'Fernanda Costa Ribeiro', pacienteId: '5', valor: 1600, vencimento: '2026-06-25', status: 'pendente', unidade: 'Simão Dias', procedimento: 'Parcela facetas 3/8' },
  { id: '4', paciente: 'Carlos Eduardo Lima', pacienteId: '4', valor: 850, vencimento: '2026-06-28', status: 'pendente', unidade: 'Aracaju', procedimento: 'Canal' },
  { id: '5', paciente: 'Ricardo Almeida Souza', pacienteId: '6', valor: 1200, vencimento: '2026-06-05', status: 'negociado', unidade: 'Lagarto', procedimento: 'Extração + prótese' },
  { id: '6', paciente: 'João Pedro Oliveira', pacienteId: '2', valor: 450, vencimento: '2026-06-15', status: 'pago', unidade: 'Simão Dias', procedimento: 'Restauração' },
]

export const posAtendimentos: PosAtendimento[] = [
  { id: '1', paciente: 'Maria Silva Santos', procedimento: 'Implante', data: '2026-06-20', unidade: 'Aracaju', status: 'em_andamento', proximaAcao: 'Enviar lembrete de cuidados pós-cirúrgicos', satisfacao: 5 },
  { id: '2', paciente: 'João Pedro Oliveira', procedimento: 'Restauração', data: '2026-06-18', unidade: 'Simão Dias', status: 'concluido', proximaAcao: 'Agendar retorno em 6 meses', satisfacao: 4 },
  { id: '3', paciente: 'Ana Carolina Mendes', procedimento: 'Ortodontia', data: '2026-06-15', unidade: 'Lagarto', status: 'aguardando', proximaAcao: 'Confirmar próximo ajuste', satisfacao: 5 },
  { id: '4', paciente: 'Fernanda Costa Ribeiro', procedimento: 'Facetas', data: '2026-06-22', unidade: 'Simão Dias', status: 'em_andamento', proximaAcao: 'Agendar prova final', satisfacao: 5 },
  { id: '5', paciente: 'Carlos Eduardo Lima', procedimento: 'Canal', data: '2026-06-10', unidade: 'Aracaju', status: 'aguardando', proximaAcao: 'Cobrar parcela pendente', satisfacao: 3 },
]

export const respostasIA: Record<string, string> = {
  default: 'Sou o assistente administrativo do ProOdonto Smart. Posso ajudar com gestão de agenda, cobranças, relatórios comerciais e orientações administrativas. **Não realizo diagnósticos odontológicos** — qualquer questão clínica deve ser confirmada por um profissional habilitado (CRO).',
  faturamento: 'O faturamento consolidado das 3 unidades em junho é de **R$ 389.200**, com crescimento de 12,4% em relação ao mês anterior. Aracaju lidera com R$ 187.500, seguida por Simão Dias (R$ 112.300) e Lagarto (R$ 89.400). Recomendo focar na conversão de orçamentos pendentes em Lagarto para equilibrar o crescimento.',
  faltas: 'A taxa de faltas geral está em **8,4%** (62 faltas em 736 consultas), uma melhoria de 15,3% vs. mês anterior. O pico ocorre às sextas-feiras em Simão Dias (23%). Sugestão: ativar confirmação automática via WhatsApp 48h e 24h antes do horário.',
  cobrancas: 'Há **R$ 42.850** em pendências financeiras. Destaque: 18 pacientes com atraso superior a 15 dias (R$ 12.400). Posso sugerir um script de abordagem comercial respeitoso para recuperação de inadimplência.',
  agenda: 'Hoje há **8 consultas** agendadas: 5 confirmadas, 2 pendentes e 1 falta. Amanhã em Aracaju existem 3 lacunas entre 14h-17h — a lista de espera tem 7 pacientes disponíveis para preenchimento.',
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date + 'T12:00:00'))
}
