import { useState } from 'react'
import './App.css'
// import Dashboard from './components/Dashboard'
import UserMessagesTable from './components/UserMessagesTable'
import ComparativaUsuarios from './components/ComparativaUsuarios'
import MessagesComparisonChart from './components/MessagesComparisonChart'
import MessagesByMonthChart from './components/MessagesByMonthChart3'
import ComparativaUsuariosTrimestre from './components/ComparativaUsuariosTrimestre'
import MessagesByMonthChart3 from './components/MessagesByMonthChart3'

/**
 * Componente principal de la aplicación que integra todos los componentes de visualización
 * de datos de mensajes.
 *
 * @component
 * @example
 * ```jsx
 * <App />
 * ```
 *
 * @returns {JSX.Element} Interfaz principal de la aplicación
 */
function App() {
  /**
   * Estado para el contador (actualmente no utilizado)
   * @type {[number, Function]} Tupla con el valor del contador y su función setter
   */
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        {/* Header de la aplicación */}
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Análisis de Mensajes Hostaway
            </h1>
          </div>
        </header>

        {/* Contenido principal */}
        <main className="py-6">
          <div className="mt-8">
            {/* Tabla de mensajes por usuario */}
            <UserMessagesTable />

            {/* Sección de comparación de mensajes entrantes vs salientes */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Comparación de Mensajes Entrantes vs Salientes
              </h2>
              <h3 className="text-xl font-bold mb-4">
                Total de mensajes: 16709
              </h3>
              <ComparativaUsuarios />
              <MessagesComparisonChart />
            </div>

            {/* Sección de análisis del último trimestre */}
            <div>
              <h2 className="text-2xl font-bold mb-4">
                Comparación de Mensajes Ultimo trimestre
              </h2>
              <h3 className="text-xl font-bold mb-4">
                Total de mensajes: 8600
              </h3>
              <MessagesByMonthChart3 />
              <ComparativaUsuariosTrimestre />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
