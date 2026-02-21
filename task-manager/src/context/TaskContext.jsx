import { createContext, useContext, useReducer, useEffect, useMemo } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

/**
 * TaskContext - Gestión de estado global con Context API + useReducer
 * 
 * Conceptos React que se practican:
 * - createContext / useContext (estado global sin prop drilling)
 * - useReducer (gestión de estado complejo con acciones)
 * - useMemo (optimización: recalcular solo cuando cambian las dependencias)
 * - Custom Provider pattern
 * - Separación de concerns: estado global vs local
 */

// ============================================
// CONSTANTES
// ============================================
export const CATEGORIES = [
  { id: 'work', label: 'Trabajo', color: '#3b82f6', emoji: '💼' },
  { id: 'personal', label: 'Personal', color: '#8b5cf6', emoji: '🏠' },
  { id: 'study', label: 'Estudio', color: '#f59e0b', emoji: '📚' },
  { id: 'health', label: 'Salud', color: '#10b981', emoji: '🏃' },
  { id: 'other', label: 'Otro', color: '#6b7280', emoji: '📌' },
]

export const PRIORITIES = [
  { id: 'low', label: 'Baja', color: '#10b981' },
  { id: 'medium', label: 'Media', color: '#f59e0b' },
  { id: 'high', label: 'Alta', color: '#e94560' },
]

export const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
}

// ============================================
// ACCIONES DEL REDUCER
// ============================================
const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  TOGGLE_TASK: 'TOGGLE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  EDIT_TASK: 'EDIT_TASK',
  SET_FILTER: 'SET_FILTER',
  SET_CATEGORY_FILTER: 'SET_CATEGORY_FILTER',
  SET_SEARCH: 'SET_SEARCH',
  SET_SORT: 'SET_SORT',
  LOAD_TASKS: 'LOAD_TASKS',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
}

// ============================================
// REDUCER — Función pura que gestiona las transiciones de estado
// ============================================
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return {
        ...state,
        tasks: [
          {
            id: crypto.randomUUID(),
            title: action.payload.title,
            description: action.payload.description || '',
            category: action.payload.category || 'other',
            priority: action.payload.priority || 'medium',
            completed: false,
            createdAt: new Date().toISOString(),
          },
          ...state.tasks,
        ],
      }

    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      }

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }

    case ACTIONS.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      }

    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload }

    case ACTIONS.SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: action.payload }

    case ACTIONS.SET_SEARCH:
      return { ...state, search: action.payload }

    case ACTIONS.SET_SORT:
      return { ...state, sort: action.payload }

    case ACTIONS.LOAD_TASKS:
      return { ...state, tasks: action.payload }

    case ACTIONS.CLEAR_COMPLETED:
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      }

    default:
      return state
  }
}

// ============================================
// ESTADO INICIAL
// ============================================
const initialState = {
  tasks: [],
  filter: FILTERS.ALL,
  categoryFilter: 'all',
  search: '',
  sort: 'newest', // newest, oldest, priority
}

// ============================================
// CONTEXTO
// ============================================
const TaskContext = createContext(null)

/**
 * TaskProvider - Provee el estado global a toda la aplicación
 * Patrón: Provider wrapping con value memoizado
 */
export function TaskProvider({ children }) {
  const [savedTasks, setSavedTasks] = useLocalStorage('task-manager-tasks', [])
  const [state, dispatch] = useReducer(taskReducer, {
    ...initialState,
    tasks: savedTasks,
  })

  // Sincronizar tareas con localStorage cuando cambien
  useEffect(() => {
    setSavedTasks(state.tasks)
  }, [state.tasks, setSavedTasks])

  // ============================================
  // ACCIONES — Funciones que dispatchers acciones al reducer
  // ============================================
  const actions = useMemo(
    () => ({
      addTask: (taskData) =>
        dispatch({ type: ACTIONS.ADD_TASK, payload: taskData }),

      toggleTask: (id) =>
        dispatch({ type: ACTIONS.TOGGLE_TASK, payload: id }),

      deleteTask: (id) =>
        dispatch({ type: ACTIONS.DELETE_TASK, payload: id }),

      editTask: (id, updates) =>
        dispatch({ type: ACTIONS.EDIT_TASK, payload: { id, updates } }),

      setFilter: (filter) =>
        dispatch({ type: ACTIONS.SET_FILTER, payload: filter }),

      setCategoryFilter: (category) =>
        dispatch({ type: ACTIONS.SET_CATEGORY_FILTER, payload: category }),

      setSearch: (search) =>
        dispatch({ type: ACTIONS.SET_SEARCH, payload: search }),

      setSort: (sort) =>
        dispatch({ type: ACTIONS.SET_SORT, payload: sort }),

      clearCompleted: () =>
        dispatch({ type: ACTIONS.CLEAR_COMPLETED }),
    }),
    []
  )

  // ============================================
  // SELECTORES — Datos derivados memoizados
  // ============================================
  const filteredTasks = useMemo(() => {
    let result = [...state.tasks]

    // Filtrar por estado
    if (state.filter === FILTERS.ACTIVE) {
      result = result.filter((t) => !t.completed)
    } else if (state.filter === FILTERS.COMPLETED) {
      result = result.filter((t) => t.completed)
    }

    // Filtrar por categoría
    if (state.categoryFilter !== 'all') {
      result = result.filter((t) => t.category === state.categoryFilter)
    }

    // Filtrar por búsqueda
    if (state.search.trim()) {
      const query = state.search.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.description.toLowerCase().includes(query)
      )
    }

    // Ordenar
    const priorityOrder = { high: 0, medium: 1, low: 2 }
    switch (state.sort) {
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        break
      case 'priority':
        result.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        )
        break
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
    }

    return result
  }, [state.tasks, state.filter, state.categoryFilter, state.search, state.sort])

  const stats = useMemo(
    () => ({
      total: state.tasks.length,
      completed: state.tasks.filter((t) => t.completed).length,
      active: state.tasks.filter((t) => !t.completed).length,
      byCategory: CATEGORIES.map((cat) => ({
        ...cat,
        count: state.tasks.filter((t) => t.category === cat.id).length,
      })),
    }),
    [state.tasks]
  )

  // Valor del contexto: combinar estado, acciones y datos derivados
  const value = useMemo(
    () => ({
      ...state,
      ...actions,
      filteredTasks,
      stats,
    }),
    [state, actions, filteredTasks, stats]
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

/**
 * useTaskContext - Hook personalizado para consumir el contexto
 * Incluye validación: lanza error si se usa fuera del Provider
 */
export function useTaskContext() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTaskContext debe usarse dentro de un TaskProvider')
  }
  return context
}
