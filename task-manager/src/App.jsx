import Header from './components/Header'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

/**
 * App — Componente raíz de la aplicación
 * 
 * Conceptos React:
 * - Composición de componentes (el patrón fundamental de React)
 * - Layout responsive con Tailwind
 * - Separación de responsabilidades: cada componente tiene una función clara
 * 
 * Estructura de la aplicación:
 *  App
 *  ├── Header (estadísticas y progreso)
 *  ├── TaskForm (crear tareas)
 *  ├── FilterBar (buscar, filtrar, ordenar)
 *  ├── TaskList (lista de tareas)
 *  │   └── TaskItem × N (tarea individual con edición inline)
 *  └── Footer
 * 
 * Estado global: TaskContext (useReducer + Context API)
 *  └── Provisto en main.jsx via <TaskProvider>
 */
function App() {
  return (
    <div className="min-h-screen px-4 py-8 md:py-12">
      <div className="max-w-xl mx-auto">
        <Header />
        <TaskForm />
        <FilterBar />
        <TaskList />
        <Footer />
      </div>
    </div>
  )
}

export default App
