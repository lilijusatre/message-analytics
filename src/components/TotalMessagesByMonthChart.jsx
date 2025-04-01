'use client'
import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

/**
 * Componente que muestra un gráfico de línea con la evolución del total
 * de mensajes a lo largo del tiempo.
 *
 * @component
 * @example
 * ```jsx
 * <TotalMessagesByMonthChart />
 * ```
 *
 * @returns {JSX.Element} Gráfico de línea con totales mensuales
 */
const TotalMessagesByMonthChart = () => {
  /**
   * Estado para los datos del gráfico
   * @type {{
   *   labels: string[],
   *   datasets: Array<{
   *     label: string,
   *     data: number[],
   *     borderColor: string,
   *     backgroundColor: string,
   *     tension: number,
   *     fill: boolean
   *   }>
   * }}
   */
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  /**
   * Efecto que carga y procesa los datos para el gráfico
   * Realiza una petición fetch al archivo JSON y prepara los datos
   * para la visualización en Chart.js
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mensajesPorMes.json')
        const data = await response.json()

        setChartData({
          labels: data.meses.map(mes => mes.mes),
          datasets: [
            {
              label: 'Total de Mensajes',
              data: data.meses.map(mes => mes.totalMensajes),
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              tension: 0.4,
              fill: true,
            },
          ],
        })
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    fetchData()
  }, [])

  /**
   * Configuración del gráfico
   * Define las opciones de visualización y formato
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
        text: 'Total de Mensajes por Mes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Mensajes',
        },
      },
      x: {
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
        <Line options={options} data={chartData} />
      </div>
    </div>
  )
}

export default TotalMessagesByMonthChart
