import './App.css'

function App() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-zinc-800 text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <header className="mb-8">
          <h1 className="text-5xl md:text-6xl tracking-tight mb-4 text-white/90">
            Georgy Sayganov
          </h1>
        </header>

        <nav className="flex justify-center items-center space-x-4">
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
    </main>
  )
}

export default App
