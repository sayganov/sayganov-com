import { useEffect, useRef } from 'react'
import { useCookieConsent } from '../hooks/use-cookie-consent'

const baseButtonClass =
  'flex-1 sm:flex-initial inline-flex min-h-[44px] items-center justify-center whitespace-nowrap ' +
  'px-5 py-2 text-sm font-medium rounded transition-colors cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
  'dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-zinc-800'

const declineButtonClass =
  `${baseButtonClass} text-zinc-500 bg-transparent border border-zinc-300 ` +
  'hover:border-zinc-400 hover:text-zinc-700 ' +
  'dark:text-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-400 dark:hover:text-zinc-200'

const acceptButtonClass =
  `${baseButtonClass} text-white bg-zinc-900 hover:bg-zinc-800 ` +
  'dark:text-zinc-900 dark:bg-white dark:hover:bg-zinc-100'

export function CookieBanner() {
  const { showBanner, accept, reject } = useCookieConsent()
  const acceptButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (showBanner) acceptButtonRef.current?.focus({ preventScroll: true })
  }, [showBanner])

  if (!showBanner) return null

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="cookie-banner-enter fixed inset-x-0 bottom-0 z-50 border-t border-zinc-200 bg-white shadow-[0_-4px_24px_rgba(0,0,0,0.1)] dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
    >
      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="min-w-0 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            We use cookies. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies.
          </p>

          <div className="flex flex-shrink-0 items-center gap-3">
            <button type="button" onClick={reject} className={declineButtonClass}>
              Decline
            </button>
            <button
              ref={acceptButtonRef}
              type="button"
              onClick={accept}
              className={acceptButtonClass}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
