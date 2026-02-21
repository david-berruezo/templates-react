/**
 * Footer — Pie de página con información del proyecto
 * 
 * Conceptos React:
 * - Componente funcional sin estado (stateless)
 * - JSX con atributos HTML (target, rel, href)
 */
function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-gray-100 text-center">
      <p className="text-xs text-muted">
        Hecho con{' '}
        <span className="text-accent">React</span> +{' '}
        <span className="text-accent">Vite</span> +{' '}
        <span className="text-accent">Tailwind CSS</span>
      </p>
      <p className="text-[10px] text-gray-300 mt-1">
        <a
          href="https://github.com/david-berruezo/templates-react"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent transition-colors"
        >
          github.com/david-berruezo/templates-react
        </a>
      </p>
    </footer>
  )
}

export default Footer
