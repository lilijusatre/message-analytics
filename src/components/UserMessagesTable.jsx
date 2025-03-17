'use client'
import React, { useEffect, useState } from 'react'

const UserMessagesTable = () => {
  const [messages, setMessages] = useState([])
  const diasOrdenados = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const horas = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mensajesPorUsuario.json')
        const data = await response.json()

        // Procesar los datos para agregar distribución por hora y día
        const processedData = data.map(user => {
          const mensajesPorHoraDia = {}

          // Para cada día, calculamos qué proporción de los mensajes totales corresponde a ese día
          const totalMensajes = Object.values(user.mensajesPorDia).reduce(
            (a, b) => a + b,
            0,
          )
          const proporcionesPorDia = {}
          diasOrdenados.forEach(dia => {
            proporcionesPorDia[dia] =
              totalMensajes > 0
                ? (user.mensajesPorDia[dia] || 0) / totalMensajes
                : 0
          })

          // Para cada hora, distribuimos sus mensajes entre los días según la proporción
          diasOrdenados.forEach(dia => {
            mensajesPorHoraDia[dia] = {}
            Object.entries(user.mensajesPorHora).forEach(
              ([hora, cantidadHora]) => {
                mensajesPorHoraDia[dia][hora] = Math.round(
                  cantidadHora * proporcionesPorDia[dia],
                )
              },
            )
          })

          // Normalizar el formato de las horas en mensajesPorHora
          const mensajesPorHoraNormalizado = {}
          Object.entries(user.mensajesPorHora).forEach(([hora, cantidad]) => {
            const horaNormalizada = hora.toString().padStart(2, '0')
            mensajesPorHoraNormalizado[horaNormalizada] = cantidad
          })

          return {
            ...user,
            mensajesPorHora: mensajesPorHoraNormalizado,
            mensajesPorHoraDia,
          }
        })

        // Encontrar los usuarios a fusionar
        const mensajesAutomaticos = processedData.find(
          u => u.usuario === 'mensajes automaticos',
        )
        const automation = processedData.find(
          u => u.usuario === 'Automation #69257',
        )

        if (mensajesAutomaticos && automation) {
          // Fusionar los mensajes por hora
          const mensajesPorHoraFusionados = {}
          horas.forEach(hora => {
            mensajesPorHoraFusionados[hora] =
              (mensajesAutomaticos.mensajesPorHora[hora] || 0) +
              (automation.mensajesPorHora[hora] || 0)
          })

          // Fusionar los mensajes por día
          const mensajesPorDiaFusionados = {
            ...mensajesAutomaticos.mensajesPorDia,
          }
          Object.entries(automation.mensajesPorDia).forEach(
            ([dia, cantidad]) => {
              mensajesPorDiaFusionados[dia] =
                (mensajesPorDiaFusionados[dia] || 0) + cantidad
            },
          )

          // Fusionar mensajes por hora y día
          const mensajesPorHoraDiaFusionados = {}
          diasOrdenados.forEach(dia => {
            mensajesPorHoraDiaFusionados[dia] = {}
            horas.forEach(hora => {
              const cantidadAuto =
                mensajesAutomaticos.mensajesPorHoraDia[dia][hora] || 0
              const cantidadAutomation =
                automation.mensajesPorHoraDia[dia][hora] || 0
              mensajesPorHoraDiaFusionados[dia][hora] =
                cantidadAuto + cantidadAutomation
            })
          })

          // Crear el usuario fusionado
          const usuarioFusionado = {
            usuario: 'Mensajes Automáticos',
            totalMensajes:
              mensajesAutomaticos.totalMensajes + automation.totalMensajes,
            mensajesPorHora: mensajesPorHoraFusionados,
            mensajesPorDia: mensajesPorDiaFusionados,
            mensajesPorHoraDia: mensajesPorHoraDiaFusionados,
          }

          // Filtrar los usuarios originales y agregar el fusionado
          const newData = processedData.filter(
            u =>
              u.usuario !== 'mensajes automaticos' &&
              u.usuario !== 'Automation #69257',
          )
          newData.push(usuarioFusionado)
          setMessages(newData)
        } else {
          setMessages(processedData)
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    fetchData()
  }, [])

  const getDayName = day => {
    const days = {
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
      Sunday: 'Domingo',
    }
    return days[day] || day
  }

  // Función para obtener los mensajes de una hora específica para un día específico
  const getMensajesPorHoraDia = (user, hora, dia) => {
    return user.mensajesPorHoraDia?.[dia]?.[parseInt(hora).toString()] || 0
  }

  // Función para obtener el total de mensajes por hora
  const getTotalMensajesPorHora = (user, hora) => {
    return user.mensajesPorHora[hora] || 0
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Distribución de Mensajes por Hora y Día
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Hora</th>
                  <th className="px-4 py-3 text-left">Usuario</th>
                  {diasOrdenados.map(dia => (
                    <th key={dia} className="px-4 py-3 text-left">
                      {getDayName(dia)}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left">Total Hora</th>
                </tr>
              </thead>
              <tbody>
                {horas.map(hora => (
                  <React.Fragment key={hora}>
                    {messages.map((user, userIndex) => (
                      <tr
                        key={`${hora}-${user.usuario}`}
                        className={`hover:bg-gray-50 ${
                          userIndex === messages.length - 1
                            ? 'border-b-2 border-gray-300'
                            : 'border-b'
                        }`}
                      >
                        {userIndex === 0 ? (
                          <td
                            className="px-4 py-3 font-medium"
                            rowSpan={messages.length}
                          >
                            {hora}:00
                          </td>
                        ) : null}
                        <td className="px-4 py-3">{user.usuario}</td>
                        {diasOrdenados.map(dia => (
                          <td key={dia} className="px-4 py-3">
                            {getMensajesPorHoraDia(user, hora, dia)}
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          {getTotalMensajesPorHora(user, hora)}
                        </td>
                      </tr>
                    ))}
                    {hora === '23' && (
                      <tr className="bg-gray-100 font-bold">
                        <td className="px-4 py-3" colSpan={2}>
                          Total General
                        </td>
                        {diasOrdenados.map(dia => (
                          <td key={dia} className="px-4 py-3">
                            {messages.reduce(
                              (total, user) =>
                                total + (user.mensajesPorDia[dia] || 0),
                              0,
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          {messages.reduce(
                            (total, user) => total + user.totalMensajes,
                            0,
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserMessagesTable
