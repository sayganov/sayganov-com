import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../hooks/use-theme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="fixed right-[calc(1rem_+_env(safe-area-inset-right))] top-[calc(1rem_+_env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full text-lg text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:text-zinc-400 dark:hover:text-white dark:focus-visible:ring-white/50 dark:focus-visible:ring-offset-zinc-900"
    >
      {isDark ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
    </button>
  )
}
