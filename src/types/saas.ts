/** Tipos SaaS — preparados para Supabase (tenants/users) e Stripe (billing). */

export type UserRole = 'owner' | 'admin' | 'manager' | 'staff'

export type SubscriptionPlanId = 'starter' | 'professional' | 'multiunit'

export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled'

export interface SubscriptionPlan {
  id: SubscriptionPlanId
  name: string
  priceMonthly: number
  /** Stripe Price ID — preencher na integração */
  stripePriceId?: string
  maxUnits: number
  features: string[]
}

export interface Organization {
  id: string
  name: string
  slug: string
  city: string
  whatsapp?: string
  /** Supabase org / tenant id */
  supabaseOrgId?: string
  createdAt: string
}

export interface ClinicUnit {
  id: string
  organizationId: string
  name: string
  city: string
  isPrimary: boolean
}

export interface Subscription {
  id: string
  organizationId: string
  planId: SubscriptionPlanId
  status: SubscriptionStatus
  /** Stripe Customer / Subscription IDs */
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  currentPeriodEnd?: string
}

export interface AppUser {
  id: string
  organizationId: string
  email: string
  passwordHash: string
  nome: string
  role: UserRole
  primaryUnitId?: string
  avatarInitials: string
  cargo: string
}

export interface AuthSession {
  userId: string
  organizationId: string
  email: string
  issuedAt: string
  expiresAt: string
}

export interface RegisterClinicInput {
  nome: string
  clinica: string
  email: string
  whatsapp: string
  cidade: string
  senha: string
}

/** Contratos futuros — Supabase Auth + DB */
export interface AuthServiceAdapter {
  signIn(email: string, password: string): Promise<AuthSession>
  signUp(input: RegisterClinicInput): Promise<AuthSession>
  signOut(): Promise<void>
  requestPasswordReset(email: string): Promise<void>
  getSession(): Promise<AuthSession | null>
}

/** Contratos futuros — Stripe Checkout / Portal */
export interface BillingServiceAdapter {
  createCheckoutSession(organizationId: string, planId: SubscriptionPlanId): Promise<string>
  openCustomerPortal(organizationId: string): Promise<string>
}

/** Contratos futuros — WhatsApp Business API */
export interface WhatsAppServiceAdapter {
  sendTemplate(to: string, templateId: string, params: Record<string, string>): Promise<void>
}
