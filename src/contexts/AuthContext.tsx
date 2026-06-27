import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  demoOrganization,
  demoUser,
  SUBSCRIPTION_PLANS,
} from '../data/mockUsers'
import {
  clearSession,
  getSession,
  getStoredOrganizations,
  getStoredUsers,
  saveSession,
  saveStoredOrganizations,
  saveStoredUsers,
} from '../lib/authStorage'
import type { AppUser, AuthSession, Organization, RegisterClinicInput, SubscriptionPlan } from '../types/saas'

interface AuthContextValue {
  user: AppUser | null
  organization: Organization | null
  plan: SubscriptionPlan | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (input: RegisterClinicInput) => Promise<void>
  logout: () => void
  requestPasswordReset: (email: string) => Promise<boolean>
}

const AuthContext = createContext<AuthContextValue | null>(null)

function findUser(email: string, password: string): AppUser | null {
  const normalized = email.trim().toLowerCase()
  if (demoUser.email === normalized && demoUser.passwordHash === password) {
    return demoUser
  }
  return getStoredUsers().find((u) => u.email === normalized && u.passwordHash === password) ?? null
}

function findOrganization(orgId: string): Organization | null {
  if (demoOrganization.id === orgId) return demoOrganization
  return getStoredOrganizations().find((o) => o.id === orgId) ?? null
}

function createSession(user: AppUser): AuthSession {
  const issuedAt = new Date()
  const expiresAt = new Date(issuedAt)
  expiresAt.setDate(expiresAt.getDate() + 30)
  return {
    userId: user.id,
    organizationId: user.organizationId,
    email: user.email,
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
  }
}

function initialsFromName(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const hydrate = useCallback(() => {
    const session = getSession()
    if (!session) {
      setUser(null)
      setOrganization(null)
      setIsLoading(false)
      return
    }
    const allUsers = [demoUser, ...getStoredUsers()]
    const foundUser = allUsers.find((u) => u.id === session.userId) ?? null
    const foundOrg = foundUser ? findOrganization(foundUser.organizationId) : null
    setUser(foundUser)
    setOrganization(foundOrg)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    hydrate()
  }, [hydrate])

  const login = useCallback(async (email: string, password: string) => {
    const found = findUser(email, password)
    if (!found) {
      throw new Error('E-mail ou senha inválidos.')
    }
    const session = createSession(found)
    saveSession(session)
    setUser(found)
    setOrganization(findOrganization(found.organizationId))
  }, [])

  const register = useCallback(async (input: RegisterClinicInput) => {
    const email = input.email.trim().toLowerCase()
    const exists = [demoUser, ...getStoredUsers()].some((u) => u.email === email)
    if (exists) {
      throw new Error('Este e-mail já está cadastrado.')
    }

    const orgId = `org-${crypto.randomUUID()}`
    const org: Organization = {
      id: orgId,
      name: input.clinica.trim(),
      slug: input.clinica.trim().toLowerCase().replace(/\s+/g, '-'),
      city: input.cidade.trim(),
      whatsapp: input.whatsapp.trim(),
      createdAt: new Date().toISOString(),
    }

    const newUser: AppUser = {
      id: `user-${crypto.randomUUID()}`,
      organizationId: orgId,
      email,
      passwordHash: input.senha,
      nome: input.nome.trim(),
      role: 'owner',
      avatarInitials: initialsFromName(input.nome),
      cargo: 'Sócio-Administrador',
    }

    saveStoredOrganizations([...getStoredOrganizations(), org])
    saveStoredUsers([...getStoredUsers(), newUser])

    const session = createSession(newUser)
    saveSession(session)
    setUser(newUser)
    setOrganization(org)
  }, [])

  const logout = useCallback(() => {
    clearSession()
    setUser(null)
    setOrganization(null)
  }, [])

  const requestPasswordReset = useCallback(async (email: string) => {
    const normalized = email.trim().toLowerCase()
    const exists = [demoUser, ...getStoredUsers()].some((u) => u.email === normalized)
    if (!exists) return false
    localStorage.setItem(
      'proodonto-password-reset',
      JSON.stringify({ email: normalized, requestedAt: new Date().toISOString() }),
    )
    return true
  }, [])

  const plan = useMemo(() => {
    if (!user) return null
    if (user.organizationId === demoOrganization.id) {
      return SUBSCRIPTION_PLANS.find((p) => p.id === 'professional') ?? null
    }
    return SUBSCRIPTION_PLANS.find((p) => p.id === 'professional') ?? null
  }, [user])

  const value = useMemo(
    () => ({
      user,
      organization,
      plan,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      requestPasswordReset,
    }),
    [user, organization, plan, isLoading, login, register, logout, requestPasswordReset],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
