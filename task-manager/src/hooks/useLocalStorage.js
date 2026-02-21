import { useState, useEffect } from 'react'

/**
 * useLocalStorage - Custom hook para persistir estado en localStorage
 * 
 * Conceptos React que se practican:
 * - Custom hooks (reutilización de lógica)
 * - useState con función inicializadora (lazy initialization)
 * - useEffect para sincronizar con sistema externo
 * - Serialización/deserialización de datos
 * 
 * @param {string} key - Clave en localStorage
 * @param {*} initialValue - Valor inicial si no hay datos guardados
 * @returns {[*, Function]} - [valor, función setter]
 */
function useLocalStorage(key, initialValue) {
  // useState con función inicializadora:
  // Esta función solo se ejecuta en el primer render,
  // no en cada re-render (optimización de rendimiento)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      // Si existe en localStorage, parsear y devolver
      // Si no, devolver el valor inicial
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error leyendo localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // useEffect sincroniza el estado con localStorage
  // Se ejecuta cada vez que cambia storedValue o key
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Error escribiendo localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
