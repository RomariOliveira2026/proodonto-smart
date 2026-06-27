import type { AppUser, AuthSession, Organization } from '../types/saas'
import { STORAGE_KEYS } from './storageKeys'

export function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.session)
    if (!raw) return null
    const session = JSON.parse(raw) as AuthSession
    if (new Date(session.expiresAt) < new Date()) {
      clearSession()
      return null
    }
    return session
  } catch {
    return null
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(STORAGE_KEYS.session)
}

export function getStoredUsers(): AppUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.users)
    return raw ? (JSON.parse(raw) as AppUser[]) : []
  } catch {
    return []
  }
}

export function saveStoredUsers(users: AppUser[]): void {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
}

export function getStoredOrganizations(): Organization[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.organizations)
    return raw ? (JSON.parse(raw) as Organization[]) : []
  } catch {
    return []
  }
}

export function saveStoredOrganizations(orgs: Organization[]): void {
  localStorage.setItem(STORAGE_KEYS.organizations, JSON.stringify(orgs))
}
