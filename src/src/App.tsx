import './App.css'
import { useState, useEffect } from 'react'

const navLinkClass =
  'text-white/90 hover:text-white hover:underline underline-offset-4 decoration-2 text-lg font-medium tracking-wide px-2 py-1 transition-colors duration-200'

const dividerClass = 'text-white/30 select-none text-lg'

function App() {
  const [showCookieNotice, setShowCookieNotice] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookieNoticeDismissed')) {
      setShowCookieNotice(true)
    }
  }, [])

  const dismissCookieNotice = () => {
    setShowCookieNotice(false)
    localStorage.setItem('cookieNoticeDismissed', 'true')
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-zinc-900 text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">

        <nav className="flex justify-center items-center space-x-2">
          <a
            href="https://www.linkedin.com/in/sayganov/"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
            aria-label="LinkedIn profile"
          >
            LinkedIn
          </a>
          <span className={dividerClass}>•</span>
          <a
            href="https://github.com/sayganov"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
            aria-label="GitHub profile"
          >
            GitHub
          </a>
          <span className={dividerClass}>•</span>
          <a
            href="https://dev.to/sayganov"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
            aria-label="DEV profile"
          >
            DEV
          </a>
        </nav>
      </div>

      {showCookieNotice && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-zinc-800/90 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <p className="text-base text-white/90 leading-relaxed font-normal flex-1">
              I don't collect cookies. No cookies for you! 🍪
            </p>
            <button
              onClick={dismissCookieNotice}
              className="text-white/60 hover:text-white hover:scale-110 transform transition-all duration-200 text-lg leading-none"
              aria-label="Dismiss cookie notice"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
