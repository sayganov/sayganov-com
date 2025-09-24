import './App.css'
import { useState, useEffect } from 'react'
import { FaLinkedinIn, FaGithub, FaDev, FaInstagram } from 'react-icons/fa'

const navLinkClass =
  'text-white/90 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900 hover:underline underline-offset-4 decoration-2 text-base sm:text-lg font-medium tracking-wide px-3 py-2 sm:px-2 sm:py-1 transition-all duration-200 flex items-center gap-2 min-h-[44px] justify-center sm:justify-start rounded-sm'

const dividerClass = 'text-white/30 select-none text-lg hidden sm:block'

function App() {
  const [showCookieNotice, setShowCookieNotice] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('cookieNoticeDismissed')) {
        setShowCookieNotice(true)
      }
    } catch (error) {
      // Fallback if localStorage is not available
      console.warn('localStorage not available:', error)
      setShowCookieNotice(true)
    }
  }, [])

  const dismissCookieNotice = () => {
    setShowCookieNotice(false)
    try {
      localStorage.setItem('cookieNoticeDismissed', 'true')
    } catch (error) {
      // Graceful degradation if localStorage fails
      console.warn('Could not save cookie preference:', error)
    }
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-zinc-900 text-white p-4">
      <div className="max-w-2xl mx-auto text-center w-full">

        <nav className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-0 sm:space-x-2">
          <a
            href="https://www.linkedin.com/in/sayganov/"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
            aria-label="LinkedIn profile"
          >
            <FaLinkedinIn size={18} className="sm:w-5 sm:h-5" />
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
            <FaGithub size={18} className="sm:w-5 sm:h-5" />
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
            <FaDev size={18} className="sm:w-5 sm:h-5" />
            DEV
          </a>
          <span className={dividerClass}>•</span>
          <a
            href="https://www.instagram.com/sayganov/"
            target="_blank"
            rel="noopener noreferrer"
            className={navLinkClass}
            aria-label="Instagram profile"
          >
            <FaInstagram size={18} className="sm:w-5 sm:h-5" />
            Instagram
          </a>
        </nav>
      </div>

      {showCookieNotice && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm bg-zinc-800/90 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal flex-1">
              I don't collect cookies. No cookies for you! 🍪
            </p>
            <button
              onClick={dismissCookieNotice}
              className="text-white/60 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-800 hover:scale-110 transform transition-all duration-200 text-xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm"
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
