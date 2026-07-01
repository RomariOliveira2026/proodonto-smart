/** Dados simulados — Simulador de Integração */
import type { IntegrationDataSource, IntegrationFlowStep, IntegrationMethod } from '../types/intelligenceModules'

export const integrationFlowSteps: IntegrationFlowStep[] = [
  { id: 's1', titulo: 'Sistema atual da clínica', descricao: 'ERP, agenda ou planilha que você já usa hoje.' },
  { id: 's2', titulo: 'Importação de dados', descricao: 'API, CSV/Excel ou carga assistida — sem trocar de sistema.' },
  { id: 's3', titulo: 'Builder Intelligence Engine', descricao: 'Motor que cruza agenda, financeiro e relacionamento.' },
  { id: 's4', titulo: 'IA identifica oportunidades', descricao: 'Perdas invisíveis, riscos e receita recuperável.' },
  { id: 's5', titulo: 'Equipe executa ações', descricao: 'Missões guiadas com mensagens e priorização.' },
  { id: 's6', titulo: 'Receita recuperada', descricao: 'Resultado mensurável sem interromper a operação.' },
]

export const integrationDataSources: IntegrationDataSource[] = [
  { id: 'agenda', label: 'Agenda', icon: 'calendar' },
  { id: 'pacientes', label: 'Pacientes', icon: 'users' },
  { id: 'pagamentos', label: 'Pagamentos', icon: 'wallet' },
  { id: 'orcamentos', label: 'Orçamentos', icon: 'file' },
  { id: 'tratamentos', label: 'Tratamentos', icon: 'heart' },
  { id: 'comparecimento', label: 'Histórico de comparecimento', icon: 'clock' },
]

export const integrationMethods: IntegrationMethod[] = [
  { id: 'api', label: 'API', descricao: 'Conexão direta quando o sistema oferece integração.' },
  { id: 'csv', label: 'Exportação CSV/Excel', descricao: 'Ideal para fase piloto — rápido e sem risco.' },
  { id: 'manual', label: 'Integração manual assistida', descricao: 'Nossa equipe ajuda na primeira carga de dados.' },
  { id: 'automacao', label: 'Automação intermediária', descricao: 'Scripts que sincronizam dados periodicamente.' },
  { id: 'webhook', label: 'Conexão futura via webhook', descricao: 'Roadmap para sincronização em tempo real.' },
]
