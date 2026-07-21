import { useCallback, useEffect, useState } from 'react'

const THEME_KEY = 'theme'

export type Theme = 'light' | 'dark'

/**
 * Background / theme-color hex per theme. Kept in sync (by hand) with the
 * pre-hydration script in index.html and the `html`/`html.dark` rules in
 * index.css — those two can't import from here (they run before/outside the
 * module graph), so any change to these values must be mirrored there.
 */
export const THEME_COLOR: Record<Theme, string> = {
  light: '#fafafa', // zinc-50
  dark: '#18181b', // zinc-900
}

const SYSTEM_DARK_QUERY = '(prefers-color-scheme: dark)'

function getSystemTheme(): Theme {
  return window.matchMedia(SYSTEM_DARK_QUERY).matches ? 'dark' : 'light'
}

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_KEY)
    if (value === 'light' || value === 'dark') return value
  } catch {
    // localStorage unavailable (private browsing, security policy, etc.)
  }
  return null
}

function writeStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // ignore write failures
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

export interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

export function useTheme(): ThemeState {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? getSystemTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Follow the OS theme live, but only while the user hasn't made an explicit
  // choice (nothing persisted). Once they toggle, their choice wins.
  useEffect(() => {
    const media = window.matchMedia(SYSTEM_DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme() === null) setTheme(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark'
      writeStoredTheme(next)
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
