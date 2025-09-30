import './App.css'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FaLinkedinIn, FaGithub, FaDev, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import LanguageSwitcher from './components/LanguageSwitcher'

const navLinkClass =
  'text-white/90 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900 hover:underline underline-offset-4 decoration-2 text-base sm:text-lg font-medium tracking-wide px-3 py-2 sm:px-2 sm:py-1 transition-all duration-200 flex items-center gap-2 min-h-[44px] justify-center sm:justify-start rounded-sm'

const dividerClass = 'text-white/30 select-none text-lg hidden sm:block'

function App() {
  const { t } = useTranslation()
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
    <main className="min-h-dvh w-full flex items-center justify-center bg-zinc-900 text-white p-4">
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
            {t('navigation.linkedin')}
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
            {t('navigation.github')}
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
            {t('navigation.dev')}
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
            {t('navigation.instagram')}
          </a>
          <span className={dividerClass}>•</span>
          <a
            href="mailto:georgysay@gmail.com"
            className={navLinkClass}
            aria-label="Email me"
          >
            <HiOutlineMail size={18} className="sm:w-5 sm:h-5" />
            {t('navigation.email')}
          </a>
        </nav>
      </div>

      {showCookieNotice && (
        <div className="fixed bottom-16 left-4 right-4 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-sm bg-zinc-800/90 backdrop-blur-sm border border-white/10 rounded-lg p-4 shadow-lg z-50">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal flex-1">
              {t('cookie.notice')}
            </p>
            <button
              onClick={dismissCookieNotice}
              className="text-white/60 hover:text-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-800 hover:scale-110 transform transition-all duration-200 text-xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm"
              aria-label={t('cookie.dismiss')}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <LanguageSwitcher />
    </main>
  )
}

export default App
