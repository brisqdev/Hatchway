import './App.css'
import Header from './components/Header'

function App() {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Hatchway</h1>
          <p className="mt-2 text-gray-600">This is the main content area.</p>
        </div>
      </main>
    </div>
  )
}

export default App
