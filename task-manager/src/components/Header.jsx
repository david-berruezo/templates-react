import { useTaskContext } from '../context/TaskContext'

/**
 * Header — Cabecera con estadísticas del Task Manager
 * 
 * Conceptos React:
 * - Consumir contexto con useContext (via custom hook)
 * - Renderizado condicional
 * - Computed values (porcentaje de progreso)
 * - Destructuring de objetos
 */
function Header() {
  const { stats } = useTaskContext()
  const progressPercent =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0

  return (
    <header className="mb-10">
      {/* Título principal */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-muted text-sm tracking-widest uppercase mb-1">
            Organiza tu día
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight leading-none">
            Task
            <span className="text-accent">.</span>
            Manager
          </h1>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-4xl font-display font-bold text-accent">
            {progressPercent}%
          </p>
          <p className="text-muted text-sm">completado</p>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-full h-1.5 bg-surface-alt rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-accent rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Activas" value={stats.active} accent />
        <StatCard label="Hechas" value={stats.completed} />
      </div>
    </header>
  )
}

/**
 * StatCard — Componente reutilizable para mostrar una estadística
 * 
 * Conceptos React:
 * - Componentes funcionales puros
 * - Props con valores por defecto
 * - Composición de clases CSS condicionales
 */
function StatCard({ label, value, accent = false }) {
  return (
    <div
      className={`rounded-xl px-4 py-3 text-center transition-colors ${
        accent
          ? 'bg-accent/5 border border-accent/20'
          : 'bg-surface border border-transparent'
      }`}
    >
      <p className={`text-2xl font-display font-bold ${accent ? 'text-accent' : 'text-ink'}`}>
        {value}
      </p>
      <p className="text-muted text-xs tracking-wider uppercase">{label}</p>
    </div>
  )
}

export default Header
