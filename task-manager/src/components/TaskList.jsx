import { useTaskContext } from '../context/TaskContext'
import TaskItem from './TaskItem'

/**
 * TaskList — Lista de tareas filtradas
 * 
 * Conceptos React:
 * - Renderizado de listas con .map()
 * - Key prop obligatoria para elementos de lista (optimización de reconciliación)
 * - Renderizado condicional para estado vacío
 * - Componentes de presentación vs contenedores
 */
function TaskList() {
  const { filteredTasks, filter, search, categoryFilter } = useTaskContext()

  // Estado vacío
  if (filteredTasks.length === 0) {
    return <EmptyState filter={filter} search={search} categoryFilter={categoryFilter} />
  }

  return (
    <div className="space-y-2">
      {/* Contador de resultados */}
      <p className="text-xs text-muted px-1 mb-3">
        {filteredTasks.length} tarea{filteredTasks.length !== 1 ? 's' : ''}
        {search && ` para "${search}"`}
      </p>

      {/* Lista de tareas — key={task.id} es crucial para que React 
          identifique cada elemento y optimice los re-renders */}
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}

/**
 * EmptyState — Se muestra cuando no hay tareas que coincidan con los filtros
 * 
 * Conceptos React:
 * - Componente puro de presentación
 * - Renderizado condicional basado en props
 */
function EmptyState({ filter, search, categoryFilter }) {
  let icon = '📝'
  let title = 'Sin tareas todavía'
  let subtitle = 'Crea tu primera tarea con el botón de arriba'

  if (search) {
    icon = '🔍'
    title = 'Sin resultados'
    subtitle = `No se encontraron tareas para "${search}"`
  } else if (filter === 'completed') {
    icon = '✨'
    title = 'Sin tareas completadas'
    subtitle = 'Completa alguna tarea para verla aquí'
  } else if (filter === 'active') {
    icon = '🎉'
    title = '¡Todo hecho!'
    subtitle = 'No tienes tareas pendientes'
  } else if (categoryFilter !== 'all') {
    icon = '📂'
    title = 'Categoría vacía'
    subtitle = 'No hay tareas en esta categoría'
  }

  return (
    <div className="text-center py-16">
      <p className="text-4xl mb-3">{icon}</p>
      <h3 className="font-display font-semibold text-ink mb-1">{title}</h3>
      <p className="text-sm text-muted">{subtitle}</p>
    </div>
  )
}

export default TaskList
