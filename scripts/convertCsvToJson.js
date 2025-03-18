import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Mapeo de nombres de usuario
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

// Función para extraer campos del CSV considerando objetos JSON
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

// Función para limpiar y parsear JSON
function parseJsonSafely(str) {
  try {
    // Eliminar comillas externas si existen
    let cleanStr = str.replace(/^"/, '').replace(/"$/, '')
    // Reemplazar comillas escapadas y dobles comillas
    cleanStr = cleanStr.replace(/\\"/g, '"').replace(/""/g, '"')

    // Si el string no comienza con {, añadirlo
    if (!cleanStr.startsWith('{')) {
      cleanStr = '{' + cleanStr
    }
    // Si el string no termina con }, añadirlo
    if (!cleanStr.endsWith('}')) {
      cleanStr = cleanStr + '}'
    }

    return JSON.parse(cleanStr)
  } catch (error) {
    try {
      // Intento alternativo: eliminar todas las comillas escapadas
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

// Convertir CSV a JSON
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
        usuario: userNames[Usuario] || Usuario, // Usar el nombre mapeado o mantener el original si no existe mapeo
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
