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

const TotalMessagesByMonthChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

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
