# Dashboard de Análisis de Mensajes Hostaway

## Instalación y Configuración

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Git

### Pasos de Instalación

1. Clonar el repositorio

2. Instalar dependencias:

```bash
npm install
# o
yarn install
```

3. Configurar las variables de entorno:

```bash
cp .env.example .env
# Editar el archivo .env con las configuraciones necesarias
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

### Dependencias Principales

- React 18
- Chart.js
- react-chartjs-2
- Tailwind CSS
- Vite

### Estructura del Proyecto

```
message-analytics/
├── src/
│   ├── components/
│   │   ├── UserMessagesTable.jsx
│   │   ├── ComparativaUsuarios.jsx
│   │   ├── MessagesComparisonChart.jsx
│   │   ├── MessagesByMonthChart3.jsx
│   │   └── ComparativaUsuariosTrimestre.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── mensajesPorUsuario.json
├── package.json
└── README.md
```

# Tabla de Mensajes por Usuario

## Descripción

El componente `UserMessagesTable` muestra una tabla interactiva que presenta
estadísticas detalladas de mensajes por usuario, incluyendo totales y
distribuciones por hora y día de la semana.

## Características

- Visualización tabular de datos de mensajes
- Distribución detallada por hora del día
- Distribución por día de la semana
- Totales por usuario
- Scroll vertical para distribuciones extensas
- Efectos hover en las filas
- Diseño responsive con scroll horizontal

## Estructura de Datos

El componente espera recibir datos en el siguiente formato:

```json
[
  {
    "usuario": "Nombre Usuario",
    "totalMensajes": 1500,
    "mensajesPorHora": {
      "0": 50,
      "1": 45
      // ... más horas (0-23)
    },
    "mensajesPorDia": {
      "Monday": 200,
      "Tuesday": 250
      // ... más días
    }
  }
]
```

## Diseño Visual

### Estructura de la Tabla

- Encabezado con fondo gris claro
- Columnas:
  1. Usuario
  2. Total de Mensajes
  3. Distribución por Hora
  4. Distribución por Día
- Filas con efecto hover
- Bordes y espaciado consistentes

### Estilos

- Contenedor principal con padding uniforme
- Título destacado con tipografía bold
- Celdas con padding consistente
- Scroll vertical limitado a 40rem para distribuciones
- Texto pequeño para detalles de distribución
- Bordes sutiles para separación de contenido

## Manejo de Datos

- Carga asíncrona desde archivo JSON
- Ordenamiento automático de horas (0-23)
- Formato consistente de hora (HH:00)
- Manejo de errores en la carga
- Actualización dinámica del estado

## Uso

```jsx
import UserMessagesTable from './components/UserMessagesTable'

function App() {
  return (
    <div>
      <UserMessagesTable />
    </div>
  )
}
```

## Características de Accesibilidad

- Estructura semántica de tabla
- Encabezados claramente definidos
- Contraste adecuado de colores
- Espaciado suficiente para legibilidad
- Scroll accesible en distribuciones

## Mejoras Futuras Sugeridas

1. Agregar ordenamiento por columnas
2. Implementar filtros por usuario
3. Añadir paginación para grandes conjuntos de datos
4. Incluir búsqueda por usuario
5. Agregar exportación a CSV/Excel
6. Implementar filtros por rango de fechas
7. Añadir gráficos mini (sparklines) en las celdas
8. Personalización de columnas visibles

# Comparativa de Usuarios

## Descripción

El componente `ComparativaUsuarios` muestra gráficos de barras que comparan la
actividad de mensajes entre diferentes usuarios y tipos de mensajes, tanto por
hora como por día de la semana.

## Características

- Visualización de datos mediante gráficos de barras usando Chart.js
- Comparativa de 4 categorías de mensajes:
  - Lizbeth B
  - Csupport
  - Mensajes Automáticos
  - Mensajes Entrantes
- Dos gráficos separados:
  - Distribución por hora del día
  - Distribución por día de la semana
- Interactividad con tooltips y leyendas
- Diseño responsive con Tailwind CSS

## Requisitos Adicionales

- Chart.js
- react-chartjs-2

## Uso

```jsx
import ComparativaUsuarios from './components/ComparativaUsuarios'

function App() {
  return (
    <div>
      <ComparativaUsuarios />
    </div>
  )
}
```

## Configuración de Gráficos

Los gráficos incluyen las siguientes características:

- Tooltips personalizados que muestran la cantidad de mensajes
- Leyendas en la parte superior
- Escala Y que comienza en cero
- Títulos descriptivos para ejes X e Y
- Interacción en modo índice para mejor visualización de datos superpuestos

## Estilos

El componente utiliza:

- Contenedores con fondo blanco y sombras
- Espaciado consistente entre gráficos
- Diseño responsive que se adapta al tamaño de la pantalla

## Manejo de Datos

- Carga asíncrona de datos desde el archivo JSON
- Procesamiento de datos para asegurar formato correcto
- Manejo de valores faltantes (default a 0)
- Traducción automática de días de la semana al español

## Mejoras Futuras Sugeridas

1. Agregar opciones de personalización de colores
2. Implementar filtros por rango de fechas
3. Añadir animaciones en la carga de datos
4. Incluir opciones de exportación de datos
5. Agregar más tipos de visualizaciones (líneas, áreas, etc.)

# Comparativa de Usuarios por Trimestre

## Descripción

El componente `ComparativaUsuariosTrimestre` muestra gráficos de barras que
comparan la actividad de mensajes entre diferentes usuarios y tipos de mensajes
durante el último trimestre, tanto por hora como por día de la semana.

## Características

- Visualización de datos mediante gráficos de barras usando Chart.js
- Comparativa de 4 categorías de mensajes:
  - Lizbeth B
  - Csupport
  - Mensajes Automáticos
  - Mensajes Entrantes
- Dos gráficos separados:
  - Distribución por hora del día
  - Distribución por día de la semana
- Interactividad con tooltips y leyendas
- Diseño responsive con Tailwind CSS
- Datos específicos del último trimestre

## Requisitos Adicionales

- Chart.js
- react-chartjs-2
- Archivo JSON con datos del trimestre en `/mensajesPorUsuarioTrimestre.json`

## Uso

```jsx
import ComparativaUsuariosTrimestre from './components/ComparativaUsuariosTrimestre'

function App() {
  return (
    <div>
      <ComparativaUsuariosTrimestre />
    </div>
  )
}
```

## Configuración de Gráficos

Los gráficos incluyen las siguientes características:

- Tooltips personalizados que muestran la cantidad de mensajes
- Leyendas en la parte superior
- Escala Y que comienza en cero
- Títulos descriptivos para ejes X e Y
- Interacción en modo índice para mejor visualización de datos superpuestos
- Colores distintivos para cada tipo de mensaje

## Estilos

El componente utiliza:

- Contenedores con fondo blanco y sombras
- Espaciado consistente entre gráficos
- Diseño responsive que se adapta al tamaño de la pantalla
- Paleta de colores consistente con el resto de la aplicación

## Manejo de Datos

- Carga asíncrona de datos desde el archivo JSON específico del trimestre
- Procesamiento de datos para asegurar formato correcto
- Manejo de valores faltantes (default a 0)
- Traducción automática de días de la semana al español
- Ordenamiento específico de días de la semana

## Mejoras Futuras Sugeridas

1. Agregar selector de trimestre
2. Implementar comparación entre trimestres
3. Añadir animaciones en la carga de datos
4. Incluir opciones de exportación de datos
5. Agregar más tipos de visualizaciones (líneas, áreas, etc.)
6. Implementar filtros por rango de fechas específico

# Aplicación Principal

## Descripción

El componente `App` es el componente principal que integra todos los componentes
de visualización de datos de mensajes. Proporciona una interfaz unificada para
mostrar diferentes tipos de análisis y comparativas de mensajes.

## Características

- Integración de múltiples componentes de visualización
- Diseño responsive con Tailwind CSS
- Estructura organizada con header y main content
- Visualización de estadísticas generales
- Secciones separadas para diferentes tipos de análisis

## Componentes Integrados

1. `UserMessagesTable`: Tabla detallada de mensajes por usuario
2. `ComparativaUsuarios`: Gráficos comparativos de actividad
3. `MessagesComparisonChart`: Gráfico de comparación de mensajes entrantes vs
   salientes
4. `MessagesByMonthChart3`: Gráfico de mensajes por mes
5. `ComparativaUsuariosTrimestre`: Comparativa de usuarios en el último
   trimestre

## Estructura

La aplicación está organizada en las siguientes secciones:

- Header con título principal
- Tabla de mensajes por usuario
- Sección de comparación de mensajes entrantes vs salientes
- Sección de análisis del último trimestre

## Uso

```jsx
import App from './App'

function Root() {
  return <App />
}
```

## Requisitos

- React 18 o superior
- Tailwind CSS configurado en el proyecto
- Todos los componentes hijos importados correctamente
- Archivos JSON con datos de mensajes en las rutas correspondientes

## Estilos

La aplicación utiliza:

- Diseño responsive con Tailwind CSS
- Esquema de colores consistente
- Sombras y bordes redondeados para contenedores
- Tipografía clara y legible
- Espaciado consistente entre secciones

## Mejoras Futuras Sugeridas

1. Implementar navegación entre diferentes vistas
2. Agregar filtros globales para todos los componentes
3. Incluir opciones de personalización de tema
4. Agregar exportación de datos
5. Implementar sistema de caché para los datos

## Desarrollo y Contribución

### Guía de Desarrollo

1. Crear una rama para nuevas características:

```bash
git checkout -b feature/nueva-caracteristica
```

2. Realizar cambios y commits:

```bash
git add .
git commit -m "Descripción de los cambios"
```

3. Subir cambios al repositorio:

```bash
git push origin feature/nueva-caracteristica
```

### Convenciones de Código

- Usar componentes funcionales de React
- Documentar componentes con JSDoc
- Seguir las convenciones de nombrado de React
- Mantener los componentes pequeños y reutilizables
- Usar TypeScript para nuevos componentes

### Estructura de Commits

```
feat: nueva característica
fix: corrección de bug
docs: cambios en documentación
style: cambios de formato
refactor: refactorización de código
test: añadir o modificar tests
chore: tareas de mantenimiento
```

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter
- `npm run format`: Formatea el código

### Solución de Problemas

1. **Problemas de Carga de Datos**

   - Verificar que el archivo JSON existe en la carpeta public
   - Comprobar el formato de los datos
   - Revisar la consola del navegador para errores

2. **Problemas de Renderizado**

   - Verificar las dependencias de Chart.js
   - Comprobar la estructura de datos para los gráficos
   - Revisar los estilos de Tailwind

3. **Problemas de Rendimiento**
   - Optimizar la carga de datos
   - Implementar lazy loading para componentes grandes
   - Utilizar memoización cuando sea necesario

### Recursos Adicionales

- [Documentación de React](https://reactjs.org/docs)
- [Documentación de Chart.js](https://www.chartjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Guía de Contribución](CONTRIBUTING.md)

# Gráfico de Mensajes por Mes

## Descripción

El componente `MessagesByMonthChart` muestra un gráfico de barras apiladas que
visualiza la cantidad total de mensajes por usuario para cada mes, permitiendo
ver la distribución y evolución de la actividad de mensajería a lo largo del
tiempo.

## Características

- Visualización de datos mediante gráficos de barras apiladas
- Totales acumulados por usuario y mes
- Paleta de colores predefinida para cada usuario
- Tooltips con información detallada
- Leyendas interactivas
- Escalas personalizadas con valores absolutos

## Estructura de Datos

El componente espera recibir datos en el siguiente formato:

```json
{
  "meses": [
    {
      "mes": "Enero",
      "usuarios": {
        "Usuario1": 300,
        "Usuario2": 400
        // ... más usuarios
      }
    }
  ]
}
```

## Paleta de Colores

```javascript
const userColors = {
  'Lizbeth Bernardo': 'rgb(75, 192, 192)',
  'mensajes automaticos': 'rgb(255, 99, 132)',
  'mensajes entrantes': 'rgb(54, 162, 235)',
  csupport: 'rgb(153, 102, 255)',
  'Damaris Ayala': 'rgb(255, 206, 86)',
  'Lizeth Gonzalez': 'rgb(255, 159, 64)',
  'Miriam Cruz': 'rgb(75, 192, 192)',
  'Paulina Dominguez': 'rgb(153, 102, 255)',
}
```

## Configuración Visual

### Características del Gráfico

- Barras apiladas para mostrar totales acumulados
- Leyenda en la parte superior
- Título descriptivo
- Tooltips personalizados mostrando cantidad de mensajes
- Ejes X e Y con títulos descriptivos

### Estilos

- Contenedor con fondo blanco y sombras
- Diseño responsive que se adapta al ancho de la pantalla
- Espaciado consistente con márgenes y padding
- Colores distintivos para cada usuario

## Manejo de Datos

- Carga asíncrona de datos desde archivo JSON
- Procesamiento automático de usuarios únicos
- Ordenamiento por mes
- Manejo de valores faltantes (default a 0)
- Asignación automática de colores para usuarios no definidos

## Uso

```jsx
import MessagesByMonthChart from './components/MessagesByMonthChart'

function App() {
  return (
    <div>
      <MessagesByMonthChart />
    </div>
  )
}
```

## Mejoras Futuras Sugeridas

1. Agregar selector de rango de meses
2. Implementar filtros por usuario
3. Añadir opciones de ordenamiento de datos
4. Incluir comparación con períodos anteriores
5. Agregar exportación de datos en diferentes formatos
6. Implementar zoom en períodos específicos
7. Añadir más tipos de visualizaciones (líneas, áreas)

# Gráfico de Porcentaje de Mensajes por Mes

## Descripción

El componente `MessagesPercentageByMonthChart` muestra un gráfico de barras
apiladas que visualiza el porcentaje de mensajes por usuario para cada mes,
permitiendo ver la distribución proporcional de la actividad de mensajería.

## Características

- Visualización de datos mediante gráficos de barras apiladas
- Cálculo automático de porcentajes
- Paleta de colores predefinida para cada usuario
- Tooltips con información porcentual
- Leyendas interactivas
- Escalas personalizadas con símbolos de porcentaje

## Estructura de Datos

El componente espera recibir datos en el siguiente formato:

```json
{
  "meses": [
    {
      "mes": "Enero",
      "totalMensajes": 1000,
      "usuarios": {
        "Usuario1": 300,
        "Usuario2": 400
        // ... más usuarios
      }
    }
  ]
}
```

## Paleta de Colores

```javascript
const userColors = {
  'Lizbeth Bernardo': 'rgb(75, 192, 192)',
  'mensajes automaticos': 'rgb(255, 99, 132)',
  'mensajes entrantes': 'rgb(54, 162, 235)',
  csupport: 'rgb(153, 102, 255)',
  'Damaris Ayala': 'rgb(255, 206, 86)',
  'Lizeth Gonzalez': 'rgb(255, 159, 64)',
  'Miriam Cruz': 'rgb(75, 192, 192)',
  'Paulina Dominguez': 'rgb(153, 102, 255)',
}
```

# Gráfico de Comparación de Mensajes

## Descripción

El componente `MessagesComparisonChart` muestra un gráfico de barras que compara
los mensajes entrantes con los salientes (combinando Lizbeth B y csupport) por
hora del día.

## Características

- Visualización de mensajes entrantes vs salientes
- Agregación automática de mensajes salientes
- Normalización de formato de horas
- Tooltips informativos
- Leyendas interactivas
- Escala temporal por hora

## Estructura de Datos

El componente procesa datos del archivo `mensajesPorUsuario.json` con el
siguiente formato:

```json
[
  {
    "usuario": "Lizbeth B",
    "mensajesPorHora": {
      "0": 10,
      "1": 15
      // ... más horas
    }
  },
  {
    "usuario": "csupport"
    // ... datos similares
  },
  {
    "usuario": "mensajes entrantes"
    // ... datos similares
  }
]
```

## Configuración Visual

### Colores

- Mensajes Salientes: rgba(53, 162, 235, 0.5)
- Mensajes Entrantes: rgba(255, 99, 132, 0.5)

### Escalas

- Eje Y: Cantidad de mensajes (comienza en cero)
- Eje X: Horas del día (formato 24 horas)

## Mejoras Futuras Sugeridas para Ambos Componentes

1. Agregar filtros de rango de fechas
2. Implementar zoom en períodos específicos
3. Añadir exportación de datos
4. Incluir más métricas comparativas
5. Agregar tooltips más detallados
6. Implementar temas personalizables
7. Añadir animaciones de transición

# Gráfico de Total de Mensajes por Mes

## Descripción

El componente `TotalMessagesByMonthChart` muestra un gráfico de línea que
visualiza la evolución del total de mensajes a lo largo del tiempo. Este gráfico
permite identificar tendencias y patrones en el volumen total de comunicación
mensual.

## Características

- Visualización mediante gráfico de línea con Chart.js
- Área bajo la curva sombreada para mejor visualización
- Línea suavizada con tensión 0.4
- Tooltips informativos
- Leyenda en la parte superior
- Escalas personalizadas con valores absolutos

## Estructura de Datos

El componente espera recibir datos en el siguiente formato:

```json
{
  "meses": [
    {
      "mes": "Enero",
      "totalMensajes": 1500
    },
    {
      "mes": "Febrero",
      "totalMensajes": 1800
    }
    // ... más meses
  ]
}
```

## Configuración Visual

### Características del Gráfico

- Línea continua con suavizado
- Área sombreada bajo la línea
- Color principal: rgb(75, 192, 192)
- Transparencia del área: 0.5
- Tooltips mostrando el total de mensajes
- Ejes X e Y con títulos descriptivos

### Estilos

- Contenedor con fondo blanco y sombras
- Diseño responsive que se adapta al ancho de la pantalla
- Espaciado consistente con márgenes y padding
- Altura automática ajustable al contenido

## Manejo de Datos

- Carga asíncrona de datos desde archivo JSON
- Procesamiento automático de datos mensuales
- Extracción de etiquetas de meses
- Cálculo de totales mensuales
- Manejo de errores en la carga de datos

## Uso

```jsx
import TotalMessagesByMonthChart from './components/TotalMessagesByMonthChart'

function App() {
  return (
    <div>
      <TotalMessagesByMonthChart />
    </div>
  )
}
```

## Configuración del Gráfico

```javascript
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
```

## Mejoras Futuras Sugeridas

1. Agregar selector de rango de fechas
2. Implementar comparación con períodos anteriores
3. Añadir líneas de tendencia
4. Incluir predicciones de tendencias futuras
5. Agregar marcadores de eventos importantes
6. Implementar zoom en períodos específicos
7. Añadir anotaciones en puntos relevantes
8. Exportación de datos en diferentes formatos
