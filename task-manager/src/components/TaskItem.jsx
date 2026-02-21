import { useState, useRef, useEffect } from 'react'
import { useTaskContext, CATEGORIES, PRIORITIES } from '../context/TaskContext'

/**
 * TaskItem — Componente para una tarea individual
 * 
 * Conceptos React:
 * - Estado local para modo edición
 * - useRef para focus management
 * - Renderizado condicional (modo vista vs modo edición)
 * - Eventos: onClick, onChange, onKeyDown, onBlur
 * - Props: recibe datos de la tarea del padre
 * - Callback props: acciones del contexto
 * - Formateo de fechas
 */
function TaskItem({ task }) {
  const { toggleTask, deleteTask, editTask } = useTaskContext()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const editInputRef = useRef(null)

  // Encontrar la categoría y prioridad de la tarea
  const category = CATEGORIES.find((c) => c.id === task.category) || CATEGORIES[4]
  const priority = PRIORITIES.find((p) => p.id === task.priority) || PRIORITIES[1]

  // Focus en el input al entrar en modo edición
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus()
      editInputRef.current.select()
    }
  }, [isEditing])

  // Guardar edición
  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      editTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      })
    }
    setIsEditing(false)
  }

  // Manejar teclas en modo edición
  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSaveEdit()
    }
    if (e.key === 'Escape') {
      setEditTitle(task.title)
      setEditDescription(task.description)
      setIsEditing(false)
    }
  }

  // Formatear fecha relativa
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Ahora mismo'
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays}d`
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
  }

  return (
    <div
      className={`group bg-surface rounded-xl p-4 border transition-all duration-300 ${
        task.completed
          ? 'border-gray-100 opacity-60'
          : 'border-gray-100 hover:border-gray-200 hover:shadow-md hover:shadow-black/5'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="task-checkbox mt-0.5"
        />

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            /* ====== MODO EDICIÓN ====== */
            <div>
              <input
                ref={editInputRef}
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleEditKeyDown}
                className="w-full text-sm font-medium bg-surface-alt rounded-lg px-3 py-1.5 
                           mb-2 border border-gray-200"
                maxLength={100}
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                onKeyDown={handleEditKeyDown}
                placeholder="Descripción..."
                rows={2}
                className="w-full text-xs bg-surface-alt rounded-lg px-3 py-1.5 mb-2 
                           resize-none border border-gray-200 text-muted"
                maxLength={300}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-3 py-1 bg-accent text-white text-xs rounded-lg 
                             hover:bg-accent/90 transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setEditTitle(task.title)
                    setEditDescription(task.description)
                    setIsEditing(false)
                  }}
                  className="px-3 py-1 text-xs text-muted hover:text-ink transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            /* ====== MODO VISTA ====== */
            <>
              <p
                className={`text-sm font-medium leading-snug mb-1 ${
                  task.completed ? 'line-through-animated text-muted' : 'text-ink'
                }`}
              >
                {task.title}
              </p>

              {task.description && (
                <p className="text-xs text-muted leading-relaxed mb-2 line-clamp-2">
                  {task.description}
                </p>
              )}

              {/* Meta: Categoría, Prioridad, Fecha */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Badge de categoría */}
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                  style={{
                    backgroundColor: `${category.color}15`,
                    color: category.color,
                  }}
                >
                  {category.emoji} {category.label}
                </span>

                {/* Badge de prioridad */}
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium"
                  style={{
                    backgroundColor: `${priority.color}15`,
                    color: priority.color,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: priority.color }}
                  />
                  {priority.label}
                </span>

                {/* Fecha */}
                <span className="text-[10px] text-gray-300">
                  {formatDate(task.createdAt)}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Acciones (visibles en hover) */}
        {!isEditing && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center 
                         text-muted hover:bg-surface-alt hover:text-ink transition-all"
              title="Editar"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>

            {showConfirmDelete ? (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-2 py-1 bg-red-500 text-white text-[10px] rounded-md 
                             hover:bg-red-600 transition-colors"
                >
                  Sí
                </button>
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-2 py-1 bg-gray-200 text-gray-600 text-[10px] rounded-md 
                             hover:bg-gray-300 transition-colors"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="w-7 h-7 rounded-lg flex items-center justify-center 
                           text-muted hover:bg-red-50 hover:text-red-500 transition-all"
                title="Eliminar"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskItem
