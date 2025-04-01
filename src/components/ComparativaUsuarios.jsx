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

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

/**
 * Componente que muestra gráficos comparativos de mensajes por usuario
 *
 * @component
 * @example
 * ```jsx
 * <ComparativaUsuarios />
 * ```
 *
 * @returns {JSX.Element} Gráficos de barras comparativos
 */
const ComparativaUsuarios = () => {
  /**
   * Estado para los datos del gráfico por hora
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
  const [chartDataHoras, setChartDataHoras] = useState({
    labels: [],
    datasets: [],
  })

  /**
   * Estado para los datos del gráfico por día
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
  const [chartDataDias, setChartDataDias] = useState({
    labels: [],
    datasets: [],
  })

  /**
   * Orden de los días de la semana para la visualización
   * @type {string[]}
   */
  const diasOrdenados = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  /**
   * Mapeo de días en inglés a español
   * @type {Object.<string, string>}
   */
  const diasEnEspanol = {
    Monday: 'Lunes',
    Tuesday: 'Martes',
    Wednesday: 'Miércoles',
    Thursday: 'Jueves',
    Friday: 'Viernes',
    Saturday: 'Sábado',
    Sunday: 'Domingo',
  }

  /**
   * Efecto que carga y procesa los datos para los gráficos
   * Realiza una petición fetch al archivo JSON y prepara los datos
   * para la visualización en Chart.js
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/mensajesPorUsuario.json')
        const data = await response.json()

        const lizbeth = data.find(u => u.usuario === 'Lizbeth B')
        const csupport = data.find(u => u.usuario === 'csupport')
        const mensajesAutomaticos = data.find(
          u => u.usuario === 'mensajes automaticos',
        )
        const mensajesEntrantes = data.find(
          u => u.usuario === 'mensajes entrantes',
        )

        if (lizbeth && csupport && mensajesAutomaticos && mensajesEntrantes) {
          // Datos para gráfica por hora
          const horas = Array.from({ length: 24 }, (_, i) => i.toString())
          const datosLizbethHoras = horas.map(
            hora => lizbeth.mensajesPorHora[hora] || 0,
          )
          const datosCsupportHoras = horas.map(
            hora => csupport.mensajesPorHora[hora] || 0,
          )
          const datosAutomaticosHoras = horas.map(
            hora => mensajesAutomaticos.mensajesPorHora[hora] || 0,
          )
          const datosEntrantesHoras = horas.map(
            hora => mensajesEntrantes.mensajesPorHora[hora] || 0,
          )

          // Datos para gráfica por día
          const datosLizbethDias = diasOrdenados.map(
            dia => lizbeth.mensajesPorDia[dia] || 0,
          )
          const datosCsupportDias = diasOrdenados.map(
            dia => csupport.mensajesPorDia[dia] || 0,
          )
          const datosAutomaticosDias = diasOrdenados.map(
            dia => mensajesAutomaticos.mensajesPorDia[dia] || 0,
          )
          const datosEntrantesDias = diasOrdenados.map(
            dia => mensajesEntrantes.mensajesPorDia[dia] || 0,
          )

          /**
           * Configuración de colores y estilos para los datasets
           * @type {Array<Object>}
           */
          const datasetConfig = [
            {
              label: 'Lizbeth B',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
              borderColor: 'rgb(53, 162, 235)',
            },
            {
              label: 'Csupport',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
            },
            {
              label: 'Mensajes Automáticos',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgb(75, 192, 192)',
            },
            {
              label: 'Mensajes Entrantes',
              backgroundColor: 'rgba(255, 159, 64, 0.5)',
              borderColor: 'rgb(255, 159, 64)',
            },
          ]

          setChartDataHoras({
            labels: horas.map(hora => `${hora.padStart(2, '0')}:00`),
            datasets: [
              { ...datasetConfig[0], data: datosLizbethHoras },
              { ...datasetConfig[1], data: datosCsupportHoras },
              { ...datasetConfig[2], data: datosAutomaticosHoras },
              { ...datasetConfig[3], data: datosEntrantesHoras },
            ].map(dataset => ({ ...dataset, borderWidth: 1 })),
          })

          setChartDataDias({
            labels: diasOrdenados.map(dia => diasEnEspanol[dia]),
            datasets: [
              { ...datasetConfig[0], data: datosLizbethDias },
              { ...datasetConfig[1], data: datosCsupportDias },
              { ...datasetConfig[2], data: datosAutomaticosDias },
              { ...datasetConfig[3], data: datosEntrantesDias },
            ].map(dataset => ({ ...dataset, borderWidth: 1 })),
          })
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error)
      }
    }

    fetchData()
  }, [])

  /**
   * Opciones comunes para ambos gráficos
   * @type {Object}
   */
  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} mensajes`
          },
        },
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
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  /**
   * Opciones específicas para el gráfico por hora
   * @type {Object}
   */
  const optionsHoras = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Comparativa de Mensajes por Hora',
        font: { size: 16 },
      },
    },
    scales: {
      ...commonOptions.scales,
      x: {
        title: {
          display: true,
          text: 'Hora del Día',
        },
      },
    },
  }

  /**
   * Opciones específicas para el gráfico por día
   * @type {Object}
   */
  const optionsDias = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      title: {
        display: true,
        text: 'Comparativa de Mensajes por Día',
        font: { size: 16 },
      },
    },
    scales: {
      ...commonOptions.scales,
      x: {
        title: {
          display: true,
          text: 'Día de la Semana',
        },
      },
    },
  }

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Bar options={optionsHoras} data={chartDataHoras} height={80} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Bar options={optionsDias} data={chartDataDias} height={80} />
        </div>
      </div>
    </div>
  )
}

export default ComparativaUsuarios
