'use client'
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

/**
 * Componente que muestra un gráfico de barras apiladas con los porcentajes
 * de mensajes por usuario para cada mes.
 *
 * @component
 * @example
 * ```jsx
 * <MessagesPercentageByMonthChart />
 * ```
 *
 * @returns {JSX.Element} Gráfico de barras apiladas con porcentajes
 */
const MessagesPercentageByMonthChart = () => {
  /**
   * Estado para los datos del gráfico
   * @type {{
   *   labels: string[],
   *   datasets: Array<{
   *     label: string,
   *     data: number[],
   *     backgroundColor: string,
   *     borderColor: string,
   *     borderWidth: number
   *   }>
   * }}
   */
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  /**
   * Mapeo fijo de colores para cada usuario
   * Los colores se mantienen consistentes en toda la aplicación
   * @type {Object.<string, string>}
   */
  const userColors = {
    'Lizbeth Bernardo': 'rgb(75, 192, 192)',
    'mensajes automaticos': 'rgb(255, 99, 132)',
    'mensajes entrantes': 'rgb(54, 162, 235)',
    csupport: 'rgb(153, 102, 255)',
    'Damaris Ayala': 'rgb(255, 206, 86)',
    'Lizeth Gonzalez': 'rgb(255, 159, 64)',
    'Miriam Cruz': 'rgb(75, 192, 192)',
    'Paulina Dominguez': 'rgb(153, 102, 255)', // Mismo color que csupport
  }

  /**
   * Efecto que carga y procesa los datos para el gráfico
   * Calcula los porcentajes de mensajes por usuario para cada mes
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mensajesPorMes.json')
        const data = await response.json()

        // Obtener todos los usuarios únicos
        const usuarios = new Set()
        data.meses.forEach(mes => {
          Object.keys(mes.usuarios).forEach(usuario => {
            usuarios.add(usuario)
          })
        })

        // Crear datasets para cada usuario con porcentajes
        const datasets = Array.from(usuarios).map(usuario => {
          const color =
            userColors[usuario] || `hsl(${Math.random() * 360}, 70%, 50%)`
          return {
            label: usuario,
            data: data.meses.map(mes => {
              const mensajesUsuario = mes.usuarios[usuario] || 0
              const totalMensajes = mes.totalMensajes
              return totalMensajes > 0
                ? Math.round((mensajesUsuario / totalMensajes) * 100)
                : 0
            }),
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
          }
        })

        setChartData({
          labels: data.meses.map(mes => mes.mes),
          datasets,
        })
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    fetchData()
  }, [])

  /**
   * Configuración del gráfico
   * Incluye opciones para mostrar porcentajes y apilar las barras
   * @type {Object}
   */
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Porcentaje de Mensajes por Mes y Usuario',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y}%`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        title: {
          display: true,
          text: 'Porcentaje de Mensajes',
        },
        ticks: {
          callback: function (value) {
            return value + '%'
          },
        },
      },
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Mes',
        },
      },
    },
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  )
}

export default MessagesPercentageByMonthChart
