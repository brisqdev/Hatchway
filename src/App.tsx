import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import TryIt from './pages/TryIt'

function App() {
  return (
    <div className="min-h-screen flex flex-col text-slate-50">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/try" element={<TryIt />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
