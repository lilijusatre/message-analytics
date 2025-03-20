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

const MessagesByMonthChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  // Mapeo fijo de colores para cada usuario
  const userColors = {
    'Lizbeth Bernardo': 'rgb(75, 192, 192)',
    'mensajes automaticos': 'rgb(255, 99, 132)',
    'mensajes entrantes': 'rgb(54, 162, 235)',
    csupport: 'rgb(153, 102, 255)',
    'Damaris Ayala': 'rgb(255, 206, 86)',
    'Lizeth Gonzalez': 'rgb(255, 159, 64)',
    'Miriam Cruz': 'rgb(75, 20, 192)',
    'Paulina Dominguez': 'rgb(15, 102, 255)',
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mensajesPorMesTrimestre.json')
        const data = await response.json()

        // Obtener usuarios activos y ordenarlos
        const usuariosActivos = Array.from(
          new Set(
            data.meses.flatMap(mes =>
              Object.entries(mes.usuarios)
                .filter(([_, cantidad]) => cantidad > 0)
                .map(([usuario]) => usuario),
            ),
          ),
        ).sort()

        // Crear datasets para cada mes con usuarios como etiquetas
        const datasets = data.meses.map(mes => ({
          label: mes.mes,
          data: usuariosActivos.map(usuario => mes.usuarios[usuario] || 0),
          backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
          borderWidth: 1,
        }))

        setChartData({
          labels: usuariosActivos,
          datasets,
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
        text: 'Mensajes por usuario último trimestre',
        font: {
          size: 16,
        },
      },
      datalabels: {
        display: true,
        anchor: 'end',
        align: 'top',
        formatter: value => value || '',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad de Mensajes',
          font: {
            size: 14,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Usuario',
          font: {
            size: 14,
          },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className="container mx-auto p-4 mt-8">
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{ height: '600px' }}
      >
        <Bar options={options} data={chartData} />
      </div>
    </div>
  )
}

export default MessagesByMonthChart
