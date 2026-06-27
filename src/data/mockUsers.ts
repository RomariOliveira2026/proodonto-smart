import type { AppUser, Organization, Subscription, SubscriptionPlan } from '../types/saas'

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    priceMonthly: 297,
    maxUnits: 1,
    features: ['Dashboard', 'Agenda', 'Central de Oportunidades'],
  },
  {
    id: 'professional',
    name: 'Professional',
    priceMonthly: 497,
    maxUnits: 1,
    features: ['Tudo do Starter', 'IA Gestora', 'Builder Intelligence™', 'Smart Morning'],
  },
  {
    id: 'multiunit',
    name: 'Multiunidade',
    priceMonthly: 997,
    maxUnits: 10,
    features: ['Tudo do Professional', 'Multiunidades', 'Centro de Comando'],
  },
]

export const DEMO_ORG_ID = 'org-proodonto-demo'

export const demoOrganization: Organization = {
  id: DEMO_ORG_ID,
  name: 'ProOdonto Lagarto',
  slug: 'proodonto-lagarto',
  city: 'Lagarto',
  whatsapp: '79999990000',
  createdAt: '2026-01-15T10:00:00.000Z',
}

export const demoUser: AppUser = {
  id: 'user-joao-thales',
  organizationId: DEMO_ORG_ID,
  email: 'joao@proodonto.com',
  passwordHash: 'demo123',
  nome: 'João Thales',
  role: 'owner',
  primaryUnitId: 'unit-lagarto',
  avatarInitials: 'JT',
  cargo: 'Sócio-Administrador',
}

export const demoSubscription: Subscription = {
  id: 'sub-demo',
  organizationId: DEMO_ORG_ID,
  planId: 'professional',
  status: 'active',
  currentPeriodEnd: '2026-07-01T00:00:00.000Z',
}
