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

const MessagesComparisonChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mensajesPorUsuario.json')
        const data = await response.json()

        // Encontrar los usuarios específicos
        const lizbethData = data.find(u => u.usuario === 'turno matutino')
        const csupportData = data.find(u => u.usuario === 'csupport')
        const mensajesEntrantes = data.find(
          u => u.usuario === 'mensajes entrantes',
        )

        if (lizbethData && csupportData && mensajesEntrantes) {
          const horas = Array.from({ length: 24 }, (_, i) =>
            i.toString().padStart(2, '0'),
          )

          // Normalizar el formato de las horas para cada usuario
          const normalizarHoras = mensajesPorHora => {
            const normalizado = {}
            Object.entries(mensajesPorHora).forEach(([hora, cantidad]) => {
              const horaNormalizada = hora.toString().padStart(2, '0')
              normalizado[horaNormalizada] = cantidad
            })
            return normalizado
          }

          const lizbethHorasNormalizadas = normalizarHoras(
            lizbethData.mensajesPorHora,
          )
          const csupportHorasNormalizadas = normalizarHoras(
            csupportData.mensajesPorHora,
          )
          const entrantesHorasNormalizadas = normalizarHoras(
            mensajesEntrantes.mensajesPorHora,
          )

          // Combinar mensajes salientes de Lizbeth y csupport
          const mensajesSalientes = {}
          horas.forEach(hora => {
            mensajesSalientes[hora] =
              (lizbethHorasNormalizadas[hora] || 0) +
              (csupportHorasNormalizadas[hora] || 0)
          })

          const datasets = [
            {
              label: 'Mensajes Salientes (turno matutino + csupport)',
              data: horas.map(hora => mensajesSalientes[hora]),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              borderColor: 'rgb(53, 162, 235)',
              borderWidth: 1,
            },
            {
              label: 'Mensajes Entrantes',
              data: horas.map(hora => entrantesHorasNormalizadas[hora] || 0),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
            },
          ]

          setChartData({
            labels: horas.map(hora => `${hora}:00`),
            datasets,
          })
        }
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
        text: 'Comparación de Mensajes Entrantes vs Salientes por Hora',
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
          text: 'Hora del Día',
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

export default MessagesComparisonChart
