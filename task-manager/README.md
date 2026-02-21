# 📋 Task Manager — React + Vite

Un gestor de tareas moderno y elegante construido con **React 18**, **Vite** y **Tailwind CSS**. Proyecto educativo que demuestra los fundamentos y patrones intermedios de React.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Funcionalidades

- **CRUD completo** — Crear, leer, editar y eliminar tareas
- **Categorías** — Trabajo, Personal, Estudio, Salud, Otro
- **Prioridades** — Alta, Media, Baja con indicadores visuales
- **Filtros combinados** — Por estado (todas/activas/completadas) y por categoría
- **Búsqueda** — Filtrado en tiempo real por título y descripción
- **Ordenación** — Por fecha (recientes/antiguas) o por prioridad
- **Persistencia** — Datos guardados en localStorage
- **Estadísticas** — Panel con progreso, totales y desglose por categoría
- **Diseño responsive** — Adaptado a móvil, tablet y desktop
- **Accesibilidad** — Checkbox personalizado, focus management, keyboard navigation

---

## 🎓 Conceptos React que se practican

| Concepto | Archivo | Descripción |
|----------|---------|-------------|
| `useState` | TaskForm, TaskItem | Estado local de componentes |
| `useEffect` | useLocalStorage, TaskForm | Side effects y sincronización |
| `useReducer` | TaskContext | Gestión de estado complejo con acciones |
| `useContext` | Todos los componentes | Estado global sin prop drilling |
| `useRef` | TaskForm, TaskItem | Referencias al DOM, focus management |
| `useMemo` | TaskContext | Memoización de datos derivados |
| Custom Hooks | useLocalStorage | Reutilización de lógica entre componentes |
| Context API | TaskContext | Provider pattern para estado global |
| Controlled Components | TaskForm, FilterBar | Inputs controlados por React |
| Conditional Rendering | TaskItem, TaskList | Renderizado condicional |
| List Rendering + Keys | TaskList | `.map()` con key prop |
| Composition | App | Composición de componentes |
| Props | TaskItem, StatCard | Comunicación padre → hijo |
| Event Handling | Todos | onClick, onChange, onKeyDown, onSubmit |

---

## 📁 Estructura del proyecto

```
task-manager/
├── index.html                  # Entry point HTML
├── vite.config.js              # Configuración de Vite
├── tailwind.config.js          # Configuración de Tailwind
├── package.json
├── public/
│   └── vite.svg
└── src/
    ├── main.jsx                # React entry point (render + providers)
    ├── App.jsx                 # Componente raíz (composición)
    ├── index.css               # Estilos globales + Tailwind directives
    ├── context/
    │   └── TaskContext.jsx     # Estado global: reducer, actions, selectors
    ├── hooks/
    │   └── useLocalStorage.js  # Hook de persistencia en localStorage
    └── components/
        ├── Header.jsx          # Cabecera con estadísticas
        ├── TaskForm.jsx        # Formulario de creación
        ├── FilterBar.jsx       # Búsqueda, filtros y ordenación
        ├── TaskList.jsx        # Lista de tareas filtradas
        ├── TaskItem.jsx        # Tarea individual (vista + edición)
        └── Footer.jsx          # Pie de página
```

---

## 🚀 Instalación y uso

```bash
# Clonar repositorio
git clone https://github.com/david-berruezo/templates-react.git
cd templates-react/01-task-manager

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## 🛠 Stack tecnológico

- **React 18** — UI library con hooks
- **Vite 5** — Build tool ultrarrápido
- **Tailwind CSS 3** — Utility-first CSS framework
- **Clash Display** — Tipografía display (via Fontshare)
- **DM Sans** — Tipografía body (via Google Fonts)

---

## 🔑 Decisiones de arquitectura

**¿Por qué `useReducer` en vez de `useState`?**
El estado de la app tiene múltiples campos interrelacionados (tasks, filter, categoryFilter, search, sort). `useReducer` centraliza todas las transiciones en un solo lugar, haciendo el código más predecible y testeable.

**¿Por qué Context API en vez de Redux/Zustand?**
Para una app de este tamaño, Context + useReducer es suficiente. En proyectos más grandes se recomendaría Zustand o Redux Toolkit para evitar re-renders innecesarios.

**¿Por qué localStorage en vez de una API?**
Este proyecto se centra en los fundamentos de React. La persistencia con localStorage permite demostrar custom hooks y useEffect sin la complejidad de un backend.

**¿Por qué Tailwind en vez de CSS Modules o Styled Components?**
Tailwind es actualmente el estándar en la industria para proyectos React. Permite iterar rápidamente sin cambiar de archivo.

---

## 📝 Próximos pasos

- [ ] Animaciones con Framer Motion
- [ ] Drag & drop para reordenar tareas
- [ ] Subtareas (checklist dentro de cada tarea)
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Tests con Vitest + React Testing Library
- [ ] Deploy en Vercel/Netlify

---

## 👤 Autor

**David Berruezo** — Full Stack Developer, Barcelona

- 🌐 [davidberruezo.com](https://www.davidberruezo.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/david-berruezo)
- 🐙 [GitHub](https://github.com/david-berruezo)

---

## 📄 Licencia

MIT © David Berruezo
