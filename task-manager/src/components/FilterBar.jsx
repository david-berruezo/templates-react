import { useTaskContext, CATEGORIES, FILTERS } from '../context/TaskContext'

/**
 * FilterBar — Barra de filtros, búsqueda y ordenación
 * 
 * Conceptos React:
 * - Controlled inputs (búsqueda)
 * - Array.map() para renderizar listas
 * - Clases CSS condicionales
 * - Event handlers inline
 * - Destructuring del contexto
 */
function FilterBar() {
  const {
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    search,
    setSearch,
    sort,
    setSort,
    stats,
    clearCompleted,
  } = useTaskContext()

  return (
    <div className="mb-6 space-y-4">
      {/* Barra de búsqueda */}
      <div className="relative">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar tareas..."
          className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-gray-100
                     text-sm placeholder:text-gray-300 transition-all"
        />
        {/* Botón para limpiar búsqueda */}
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 
                       rounded-full bg-gray-200 text-gray-500 flex items-center 
                       justify-center text-xs hover:bg-accent hover:text-white transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filtros de estado + Sort + Clear */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1 bg-surface-alt rounded-xl p-1">
          {[
            { key: FILTERS.ALL, label: 'Todas', count: stats.total },
            { key: FILTERS.ACTIVE, label: 'Activas', count: stats.active },
            { key: FILTERS.COMPLETED, label: 'Hechas', count: stats.completed },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f.key
                  ? 'bg-white text-ink shadow-sm'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {f.label}
              <span className="ml-1 opacity-50">{f.count}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Ordenar */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs bg-surface-alt text-muted px-3 py-1.5 rounded-lg 
                       border-none cursor-pointer"
          >
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguas</option>
            <option value="priority">Por prioridad</option>
          </select>

          {/* Limpiar completadas */}
          {stats.completed > 0 && (
            <button
              onClick={clearCompleted}
              className="text-xs text-muted hover:text-accent transition-colors px-2"
              title="Eliminar tareas completadas"
            >
              Limpiar ✓
            </button>
          )}
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setCategoryFilter('all')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            categoryFilter === 'all'
              ? 'bg-ink text-white'
              : 'bg-surface-alt text-muted hover:text-ink'
          }`}
        >
          Todas
        </button>
        {CATEGORIES.map((cat) => {
          const count = stats.byCategory.find((c) => c.id === cat.id)?.count || 0
          return (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                categoryFilter === cat.id
                  ? 'text-white shadow-sm'
                  : 'bg-surface-alt text-muted hover:text-ink'
              }`}
              style={
                categoryFilter === cat.id
                  ? { backgroundColor: cat.color }
                  : {}
              }
            >
              {cat.emoji} {cat.label}
              {count > 0 && <span className="ml-1 opacity-60">{count}</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterBar
