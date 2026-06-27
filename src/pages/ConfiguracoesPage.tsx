import { Bell, Building2, CreditCard, Globe, Shield, User } from 'lucide-react'
import { Badge, Button, Card, CardHeader } from '../builder-ui'

const secoes = [
  {
    icon: User,
    title: 'Perfil da Clínica',
    desc: 'Nome, logo, CNPJ e informações de contato',
    fields: ['Rede Odonto Sergipe', 'CNPJ: 12.345.678/0001-90', 'contato@proodonto.com'],
  },
  {
    icon: Building2,
    title: 'Unidades',
    desc: 'Gerenciar filiais e endereços',
    fields: ['Aracaju — Matriz', 'Simão Dias — Filial', 'Lagarto — Filial'],
  },
  {
    icon: Bell,
    title: 'Notificações',
    desc: 'Alertas, lembretes e confirmações automáticas',
    fields: ['WhatsApp: Ativo', 'E-mail: Ativo', 'SMS: Inativo'],
  },
  {
    icon: CreditCard,
    title: 'Plano e Faturamento',
    desc: 'Assinatura SaaS e métodos de pagamento',
    fields: ['Plano Premium Multiunidades', 'R$ 497/mês', 'Próxima cobrança: 01/07/2026'],
  },
  {
    icon: Globe,
    title: 'Integrações',
    desc: 'WhatsApp, gateways de pagamento e calendário',
    fields: ['WhatsApp Business: Conectado', 'PagSeguro: Conectado', 'Google Calendar: Pendente'],
  },
  {
    icon: Shield,
    title: 'Segurança',
    desc: 'Autenticação, permissões e LGPD',
    fields: ['2FA: Desativado', '5 usuários ativos', 'Backup diário: Ativo'],
  },
]

export function ConfiguracoesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-fg-strong tracking-tight">Configurações</h1>
        <p className="text-text-muted font-light mt-1">Gerencie sua rede e preferências</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {secoes.map((s) => (
          <Card key={s.title} hover>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <CardHeader title={s.title} subtitle={s.desc} />
                <ul className="space-y-2">
                  {s.fields.map((f) => (
                    <li key={f} className="text-sm text-text-muted flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button size="sm" variant="outline" className="mt-4">Editar</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-fg-strong">ProOdonto Smart v1.0</h3>
            <p className="text-sm text-text-muted mt-1">Plataforma em modo demonstração com dados mockados.</p>
          </div>
          <Badge variant="success" dot>Ambiente Demo</Badge>
        </div>
      </Card>
    </div>
  )
}
