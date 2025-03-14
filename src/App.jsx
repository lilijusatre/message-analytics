import { useState } from 'react'
import './App.css'
// import Dashboard from './components/Dashboard'
import UserMessagesTable from './components/UserMessagesTable'
import ComparativaUsuarios from './components/ComparativaUsuarios'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Análisis de Mensajes Hostaway
            </h1>
          </div>
        </header>
        <main className="py-6">
          <div className="mt-8">
            <UserMessagesTable />
            <ComparativaUsuarios />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
