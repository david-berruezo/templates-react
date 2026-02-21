import { useState, useRef, useEffect } from 'react'
import { useTaskContext, CATEGORIES, PRIORITIES } from '../context/TaskContext'

/**
 * TaskForm — Formulario para crear nuevas tareas
 * 
 * Conceptos React:
 * - useState para estado local del formulario
 * - useRef para manejar el focus del input
 * - useEffect para side effects (focus)
 * - Controlled components (inputs controlados)
 * - Eventos: onSubmit, onChange, onClick
 * - Prevenir el comportamiento por defecto del form
 * - Reset de formulario tras submit
 */
function TaskForm() {
  const { addTask } = useTaskContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('work')
  const [priority, setPriority] = useState('medium')
  const inputRef = useRef(null)

  // Enfocar el input cuando se expande el formulario
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  const handleSubmit = (e) => {
    e.preventDefault() // Prevenir recarga de página
    
    // Validación básica
    if (!title.trim()) return

    addTask({ title: title.trim(), description: description.trim(), category, priority })

    // Resetear formulario
    setTitle('')
    setDescription('')
    setCategory('work')
    setPriority('medium')
    setIsExpanded(false)
  }

  // Manejar Escape para cerrar el formulario
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsExpanded(false)
    }
  }

  return (
    <div className="mb-8">
      {/* Botón para expandir/colapsar */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full py-4 px-6 bg-surface border-2 border-dashed border-gray-200 
                     rounded-2xl text-muted hover:border-accent hover:text-accent 
                     transition-all duration-300 text-left group"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center 
                           justify-center text-sm font-bold group-hover:bg-accent 
                           group-hover:text-white transition-colors">
              +
            </span>
            Añadir nueva tarea...
          </span>
        </button>
      ) : (
        /* Formulario expandido */
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          className="bg-surface rounded-2xl p-6 shadow-lg shadow-black/5 
                     border border-gray-100 animate-in"
        >
          {/* Campo: Título */}
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="¿Qué necesitas hacer?"
            className="w-full text-lg font-medium bg-transparent border-none 
                       placeholder:text-gray-300 mb-3 px-0"
            maxLength={100}
          />

          {/* Campo: Descripción */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Añade una descripción (opcional)"
            rows={2}
            className="w-full text-sm bg-transparent border-none resize-none 
                       placeholder:text-gray-300 mb-4 px-0 text-muted"
            maxLength={300}
          />

          {/* Selectores: Categoría y Prioridad */}
          <div className="flex flex-wrap gap-3 mb-5">
            {/* Selector de Categoría */}
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">
                Categoría
              </label>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      category === cat.id
                        ? 'text-white shadow-sm'
                        : 'bg-surface-alt text-muted hover:text-ink'
                    }`}
                    style={
                      category === cat.id
                        ? { backgroundColor: cat.color }
                        : {}
                    }
                  >
                    {cat.emoji} {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Prioridad */}
            <div>
              <label className="block text-xs text-muted uppercase tracking-wider mb-1.5">
                Prioridad
              </label>
              <div className="flex gap-1.5">
                {PRIORITIES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriority(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      priority === p.id
                        ? 'text-white shadow-sm'
                        : 'bg-surface-alt text-muted hover:text-ink'
                    }`}
                    style={
                      priority === p.id ? { backgroundColor: p.color } : {}
                    }
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-xs text-muted">
              {title.length}/100 caracteres
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 text-sm text-muted hover:text-ink transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-6 py-2 bg-accent text-white text-sm font-medium rounded-xl
                           hover:bg-accent/90 transition-all disabled:opacity-30 
                           disabled:cursor-not-allowed shadow-sm shadow-accent/20"
              >
                Crear tarea
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

export default TaskForm
