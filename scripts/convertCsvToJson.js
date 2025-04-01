/**
 * Script para convertir datos de mensajes desde CSV a JSON
 * Procesa estadísticas de mensajes por usuario incluyendo totales y distribuciones
 * @module convertCsvToJson
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Mapeo de IDs de usuario a nombres legibles
 * @constant {Object.<string, string>}
 */
const userNames = {
  'User #955402': 'Zoey Vela',
  'User #943867': 'Lizbeth Bernardo',
  'User #920496': 'csupport@vive.properties',
  'User #945049': 'Damaris Ayala',
  system: 'system',
  'Account #36321': 'mensajes automaticos',
  'User #955217': 'Lizeth Gonzalez',
  'User #978791': 'Paulina Dominguez',
  'User #968332': 'Miriam Cruz',
}

// Leer el archivo CSV
const csvPath = join(__dirname, '../public/mensajesPorUsuario.csv')
const csvData = readFileSync(csvPath, 'utf-8')

/**
 * Extrae campos de una línea CSV considerando objetos JSON anidados
 * Maneja correctamente las comillas y llaves para preservar la estructura JSON
 *
 * @param {string} line - Línea del CSV a procesar
 * @returns {string[]} Array con los campos extraídos
 */
function extractFields(line) {
  const fields = []
  let currentField = ''
  let inQuotes = false
  let bracketCount = 0

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"' && line[i - 1] !== '\\') {
      inQuotes = !inQuotes
    }

    if (char === '{') bracketCount++
    if (char === '}') bracketCount--

    if (char === ',' && !inQuotes && bracketCount === 0) {
      fields.push(currentField.trim())
      currentField = ''
    } else {
      currentField += char
    }
  }

  fields.push(currentField.trim())
  return fields
}

/**
 * Parsea y limpia strings JSON, manejando casos especiales y errores
 * Intenta diferentes estrategias de limpieza si el primer intento falla
 *
 * @param {string} str - String JSON a parsear
 * @returns {Object} Objeto JSON parseado o objeto vacío en caso de error
 */
function parseJsonSafely(str) {
  try {
    let cleanStr = str.replace(/^"/, '').replace(/"$/, '')
    cleanStr = cleanStr.replace(/\\"/g, '"').replace(/""/g, '"')

    if (!cleanStr.startsWith('{')) {
      cleanStr = '{' + cleanStr
    }
    if (!cleanStr.endsWith('}')) {
      cleanStr = cleanStr + '}'
    }

    return JSON.parse(cleanStr)
  } catch (error) {
    try {
      const altCleanStr = str
        .replace(/^"|"$/g, '')
        .replace(/\\"/g, '"')
        .replace(/""/g, '"')
      return JSON.parse(altCleanStr)
    } catch (error2) {
      console.error('Error parseando JSON:', str)
      return {}
    }
  }
}

/**
 * Convierte datos CSV a formato JSON
 * Procesa cada línea del CSV y estructura los datos de mensajes por usuario
 *
 * @param {string} csv - Contenido del archivo CSV
 * @returns {Array<{
 *   usuario: string,
 *   totalMensajes: number,
 *   mensajesPorHora: Object.<string, number>,
 *   mensajesPorDia: Object.<string, number>
 * }>} Array de objetos con estadísticas de mensajes por usuario
 */
function convertCsvToJson(csv) {
  const lines = csv.split('\n')

  return lines
    .slice(1)
    .map(line => {
      if (!line.trim()) return null

      const [Usuario, TotalMensajes, MensajesPorHora, MensajesPorDia] =
        extractFields(line)

      if (!Usuario || !TotalMensajes) return null

      return {
        usuario: userNames[Usuario] || Usuario,
        totalMensajes: parseInt(TotalMensajes),
        mensajesPorHora: parseJsonSafely(MensajesPorHora),
        mensajesPorDia: parseJsonSafely(MensajesPorDia),
      }
    })
    .filter(item => item !== null)
}

const jsonData = convertCsvToJson(csvData)

// Guardar el resultado en un archivo JSON
const jsonPath = join(__dirname, '../public/mensajesPorUsuario.json')
writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2), 'utf-8')

console.log('Conversión completada. El archivo JSON ha sido creado.')
