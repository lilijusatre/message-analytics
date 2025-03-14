'use client'
import React, { useEffect, useState } from 'react'

const UserMessagesTable = () => {
  const [messages, setMessages] = useState([])

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
