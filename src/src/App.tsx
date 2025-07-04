import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [showCookieNotice, setShowCookieNotice] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('cookieNoticeDismissed')
    if (!dismissed) {
      setShowCookieNotice(true)
    }
  }, [])

  const dismissCookieNotice = () => {
    setShowCookieNotice(false)
    localStorage.setItem('cookieNoticeDismissed', 'true')
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-zinc-800 text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl tracking-tight mb-4 text-white/90">
            Georgy Sayganov
          </h1>
        </header>

        <nav className="flex justify-center items-center space-x-2">
          <a
            href="https://www.linkedin.com/in/sayganov/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-all duration-300 hover:underline underline-offset-4 decoration-1"
          >
            LinkedIn
          </a>
          <span className="text-white/30 select-none">•</span>
          <a
            href="https://github.com/sayganov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-all duration-300 hover:underline underline-offset-4 decoration-1"
          >
            GitHub
          </a>
          <span className="text-white/30 select-none">•</span>
          <a
            href="https://dev.to/sayganov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white transition-all duration-300 hover:underline underline-offset-4 decoration-1"
          >
            DEV
          </a>
        </nav>
      </div>

      {/* Cookie Notice */}
      {showCookieNotice && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-zinc-700/90 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-sm text-white/90 leading-relaxed">
                I don't collect cookies. No cookies for you! 🍪
              </p>
            </div>
            <button
              onClick={dismissCookieNotice}
              className="text-white/60 hover:text-white transition-colors duration-200 text-lg leading-none"
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
