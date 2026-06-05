import { useEffect, useRef } from "react";
import { useCookieConsent } from "../hooks/use-cookie-consent";

export function CookieBanner() {
  const { showBanner, accept, reject } = useCookieConsent();
  const acceptButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    acceptButtonRef.current?.focus({ preventScroll: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="cookie-banner-enter fixed bottom-0 left-0 right-0 z-50 bg-zinc-800 border-t border-zinc-700"
      style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.4)" }}
    >
      <div className="mx-auto max-w-5xl px-4 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <p className="flex-1 min-w-0 text-sm text-zinc-400 leading-relaxed">
            We use cookies to analyse traffic. By clicking "Accept", you consent to our use of cookies.
          </p>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={reject}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-zinc-400 bg-transparent border border-zinc-600 rounded hover:border-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
            >
              Decline
            </button>

            <button
              ref={acceptButtonRef}
              type="button"
              onClick={accept}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-zinc-900 bg-white rounded hover:bg-zinc-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 whitespace-nowrap"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
