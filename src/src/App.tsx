import './App.css'

function App() {
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <h1 className="text-4xl mb-5 font-bold">Georgy Sayganov</h1>
          <div className="flex justify-center items-center text-grey-600 space-x-2">
            <a href="https://www.linkedin.com/in/sayganov/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="text-gray-400">•</span>
            <a href="https://github.com/sayganov" target="_blank" rel="noopener noreferrer">GitHub</a>
            <span className="text-gray-400">•</span>
            <a href="https://dev.to/sayganov" target="_blank" rel="noopener noreferrer">DEV</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
