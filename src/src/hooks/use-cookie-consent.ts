import { useState, useCallback } from "react";

const CONSENT_KEY = "cookie-consent";

export type ConsentStatus = "accepted" | "rejected" | null;

function readStoredConsent(): ConsentStatus {
  try {
    const val = localStorage.getItem(CONSENT_KEY);
    if (val === "accepted" || val === "rejected") return val;
  } catch {
    // localStorage unavailable (private browsing, security policy, etc.)
  }
  return null;
}

function writeStoredConsent(status: "accepted" | "rejected"): void {
  try {
    localStorage.setItem(CONSENT_KEY, status);
  } catch {
    // ignore write failures
  }
}

function updateGtagConsent(accepted: boolean): void {
  if (typeof window === "undefined") return;
  const gtagFn = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtagFn === "function") {
    gtagFn("consent", "update", {
      analytics_storage: accepted ? "granted" : "denied",
    });
  }
}

export interface CookieConsentState {
  consentStatus: ConsentStatus;
  showBanner: boolean;
  accept: () => void;
  reject: () => void;
}

export function useCookieConsent(): CookieConsentState {
  const [consentStatus, setConsentStatus] = useState<ConsentStatus>(readStoredConsent);

  const accept = useCallback(() => {
    writeStoredConsent("accepted");
    setConsentStatus("accepted");
    updateGtagConsent(true);
  }, []);

  const reject = useCallback(() => {
    writeStoredConsent("rejected");
    setConsentStatus("rejected");
    updateGtagConsent(false);
  }, []);

  return {
    consentStatus,
    showBanner: consentStatus === null,
    accept,
    reject,
  };
}
