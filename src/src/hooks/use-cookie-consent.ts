import { useState, useCallback } from 'react'

const CONSENT_KEY = 'cookie-consent'

export type ConsentStatus = 'accepted' | 'rejected' | null

function readStoredConsent(): ConsentStatus {
  try {
    const value = localStorage.getItem(CONSENT_KEY)
    if (value === 'accepted' || value === 'rejected') return value
  } catch {
    // localStorage unavailable (private browsing, security policy, etc.)
  }
  return null
}

function writeStoredConsent(status: 'accepted' | 'rejected'): void {
  try {
    localStorage.setItem(CONSENT_KEY, status)
  } catch {
    // ignore write failures
  }
}

function updateGtagConsent(accepted: boolean): void {
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag
  gtag?.('consent', 'update', {
    analytics_storage: accepted ? 'granted' : 'denied',
  })
}

export interface CookieConsentState {
  consentStatus: ConsentStatus
  showBanner: boolean
  accept: () => void
  reject: () => void
}

export function useCookieConsent(): CookieConsentState {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(readStoredConsent)

  const accept = useCallback(() => {
    writeStoredConsent('accepted')
    setConsentStatus('accepted')
    updateGtagConsent(true)
  }, [])

  const reject = useCallback(() => {
    writeStoredConsent('rejected')
    setConsentStatus('rejected')
    updateGtagConsent(false)
  }, [])

  return {
    consentStatus,
    showBanner: consentStatus === null,
    accept,
    reject,
  }
}
