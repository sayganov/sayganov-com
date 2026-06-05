import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/jetbrains-mono/400.css'
import './index.css'
import App from './App.tsx'
import { CookieBanner } from './components/CookieBanner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <CookieBanner />
  </StrictMode>,
)
