import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Load only the weights the UI actually uses (400 body, 500 medium links/buttons,
// 700 bold heading). Without these, the browser synthesizes faux-bold from 400,
// which looks poor in a monospace face.
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import '@fontsource/jetbrains-mono/latin-700.css'
import './index.css'
import App from './App.tsx'
import { CookieBanner } from './components/CookieBanner.tsx'
import { ThemeToggle } from './components/ThemeToggle.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ThemeToggle />
    <CookieBanner />
  </StrictMode>,
)
