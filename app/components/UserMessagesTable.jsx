'use client'
import React, { useEffect, useState } from 'react'

/**
 * Componente que muestra una tabla interactiva con estadísticas detalladas de mensajes por usuario.
 * Incluye información sobre totales y distribuciones por hora y día de la semana.
 *
 * @component
 * @example
 * ```jsx
 * <UserMessagesTable />
 * ```
 *
 * @returns {JSX.Element} Tabla interactiva con estadísticas de mensajes
 */
const UserMessagesTable = () => {
  /**
   * Estado que almacena los datos de mensajes por usuario
   * Cada usuario tiene un total de mensajes y distribuciones por hora y día
   *
   * @type {Array<{
   *   usuario: string,
   *   totalMensajes: number,
   *   mensajesPorHora: {[key: string]: number}, // Horas del día (0-23)
   *   mensajesPorDia: {[key: string]: number}   // Días de la semana
   * }>}
   */
  const [messages, setMessages] = useState([])

  /**
   * Efecto que carga los datos de mensajes al montar el componente
   * Realiza una petición fetch al archivo JSON y maneja posibles errores
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mensajesPorUsuario.json')
        const data = await response.json()
        setMessages(data)
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    fetchData()
  }, [])

  /**
   * Renderiza la tabla con los datos de mensajes por usuario
   * Incluye encabezados, filas con datos y distribuciones detalladas
   * con scroll vertical para mejor visualización
   *
   * @returns {JSX.Element} Tabla con estadísticas de mensajes
   */
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mensajes por Usuario</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left">Usuario</th>
              <th className="px-6 py-3 border-b text-left">Total Mensajes</th>
              <th className="px-6 py-3 border-b text-left">
                Distribución por Hora
              </th>
              <th className="px-6 py-3 border-b text-left">
                Distribución por Día
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{user.usuario}</td>
                <td className="px-6 py-4 border-b">{user.totalMensajes}</td>
                <td className="px-6 py-4 border-b">
                  <div className="max-h-40 overflow-y-auto">
                    {Object.entries(user.mensajesPorHora)
                      .sort(([a], [b]) => parseInt(a) - parseInt(b))
                      .map(([hora, cantidad]) => (
                        <div key={hora} className="text-sm py-1">
                          {`${hora}:00 - ${cantidad} mensajes`}
                        </div>
                      ))}
                  </div>
                </td>
                <td className="px-6 py-4 border-b">
                  <div className="max-h-40 overflow-y-auto">
                    {Object.entries(user.mensajesPorDia).map(
                      ([dia, cantidad]) => (
                        <div key={dia} className="text-sm py-1">
                          {`${dia} - ${cantidad} mensajes`}
                        </div>
                      ),
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserMessagesTable
