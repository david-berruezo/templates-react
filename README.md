# Templates React

Colección de **plantillas y templates web** construidos con **React**, **Next.js**, **Material UI (MUI)** y **Tailwind CSS**. Este repositorio reúne diferentes templates profesionales que sirven como referencia, aprendizaje y punto de partida para el desarrollo de sitios web y aplicaciones frontend modernas.

---

## Tabla de Contenidos

- [Sobre el Proyecto](#sobre-el-proyecto)
- [Templates Incluidos](#templates-incluidos)
  - [Material Kit React](#material-kit-react)
  - [NextJS Tailwind App Presentation Page](#nextjs-tailwind-app-presentation-page)
  - [Portfolio](#portfolio)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Tecnologías](#tecnologías)
- [Recursos](#recursos)
- [Autor](#autor)

---

## Sobre el Proyecto

Este repositorio agrupa templates web de alta calidad basados en el ecosistema React. Cada template aborda un enfoque diferente del desarrollo frontend: desde UI Kits completos con Material Design, hasta landing pages modernas con Tailwind CSS y templates de portfolio personal. Son ideales para aprender buenas prácticas de maquetación, componentes reutilizables y diseño responsive.

---

## Templates Incluidos

### Material Kit React

📁 `material-kit-react-main/`

**UI Kit completo** basado en [Material Kit 2 React](https://www.creative-tim.com/product/material-kit-react) de Creative Tim. Construido sobre **Material UI (MUI)** siguiendo los principios de **Material Design** de Google.

- Más de 40 componentes frontend individuales (botones, inputs, navbars, alerts, cards, badges, etc.)
- Variaciones de color personalizables mediante la API `styled()` y prop `sx` de MUI
- Páginas pre-construidas: landing pages, presentación, autenticación (sign in)
- Sistema de temas y estilos centralizado
- Bloques de diseño reutilizables listos para producción
- Routing con React Router
- Tipografía con Google Fonts (Roboto)
- Fully responsive

**Componentes destacados:**

| Componente | Descripción |
|---|---|
| `MKButton` | Botones con múltiples variantes y colores |
| `MKInput` | Campos de entrada estilizados |
| `MKAlert` | Alertas y notificaciones |
| `MKBox` | Contenedor base flexible |
| `MKTypography` | Tipografía consistente con el design system |
| `MKAvatar` | Avatares de usuario |
| `MKBadge` | Badges y etiquetas |
| `MKPagination` | Paginación |
| `MKDatePicker` | Selector de fechas |
| `MKSocialButton` | Botones de redes sociales |

### NextJS Tailwind App Presentation Page

📁 `nextjs-tailwind-app-presentation-page-main/`

**Landing page de presentación de aplicación** basada en [NextJS Tailwind App Presentation Page](https://www.creative-tim.com/product/nextjs-tailwind-app-presentation-page) de Creative Tim. Construida con **Next.js**, **Tailwind CSS** y **Material Tailwind**.

- Template profesional para presentar aplicaciones móviles o web
- Secciones pre-construidas: Hero, Features, FAQ, Stats, Testimonials
- Diseño moderno y minimalista con Tailwind CSS
- Server-Side Rendering (SSR) con Next.js
- Personalización sencilla para adaptar a la marca de cualquier producto
- Optimizado para SEO y rendimiento
- Fully responsive y mobile-first

**Secciones incluidas:**

| Sección | Descripción |
|---|---|
| **Hero** | Cabecera principal con CTA y vista previa de la app |
| **Features** | Listado de características del producto con iconos |
| **Stats** | Métricas y números destacados |
| **Testimonials** | Opiniones y testimonios de usuarios |
| **FAQ** | Preguntas frecuentes con acordeón |

### Portfolio

📁 `portfolio/`

Template de **portfolio personal** para desarrolladores y diseñadores. Un sitio web personal para mostrar proyectos, habilidades y experiencia profesional.

- Diseño limpio y profesional
- Secciones de proyectos, sobre mí y contacto
- Componentes React reutilizables
- Diseño responsive

---

## Estructura del Proyecto

```
templates-react/
├── material-kit-react-main/                        # UI Kit Material Design (MUI + React)
│   ├── public/                                     # Assets estáticos
│   └── src/
│       ├── assets/                                 # Imágenes y tema
│       │   └── theme/                              # Configuración del design system
│       ├── components/                             # Componentes MK reutilizables
│       ├── examples/                               # Breadcrumbs, Cards, Footer, Navbars
│       ├── layouts/                                # Páginas y secciones
│       │   ├── pages/                              # Auth, Landing Pages, Presentation
│       │   └── sections/                           # Componentes de sección
│       ├── pages/                                  # Páginas principales
│       ├── App.js                                  # Componente raíz
│       └── routes.js                               # Configuración de rutas
│
├── nextjs-tailwind-app-presentation-page-main/     # Landing Page (Next.js + Tailwind)
│   ├── public/                                     # Assets estáticos
│   └── src/
│       ├── app/                                    # App Router de Next.js
│       └── components/                             # Componentes de la landing
│
├── portfolio/                                      # Portfolio personal
├── .gitignore
└── README.md
```

---

## Requisitos

- **Node.js** >= 16.x (LTS recomendado)
- **npm** o **Yarn**

---

## Instalación y Ejecución

1. **Clonar el repositorio**

```bash
git clone https://github.com/david-berruezo/templates-react.git
cd templates-react
```

2. **Acceder al template deseado e instalar dependencias**

### Material Kit React

```bash
cd material-kit-react-main
npm install
npm start
```

La aplicación se abrirá en `http://localhost:3000`.

### NextJS Tailwind App Presentation Page

```bash
cd nextjs-tailwind-app-presentation-page-main
npm install
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`.

### Portfolio

```bash
cd portfolio
npm install
npm start
```

---

## Tecnologías

| Tecnología | Usado en | Descripción |
|---|---|---|
| **React** | Material Kit, Portfolio | Librería para construir interfaces de usuario |
| **Next.js** | Tailwind Presentation | Framework React con SSR y routing |
| **Material UI (MUI)** | Material Kit | Librería de componentes con Material Design |
| **Tailwind CSS** | Tailwind Presentation | Framework CSS utility-first |
| **Material Tailwind** | Tailwind Presentation | Componentes Material Design para Tailwind |
| **React Router** | Material Kit, Portfolio | Navegación SPA para React |
| **JavaScript ES6+** | Todos | Lenguaje principal |
| **TypeScript** | Tailwind Presentation | Tipado estático (parcial) |

---

## Recursos

### Documentación Oficial

- [React - Documentación](https://react.dev/)
- [Next.js - Documentación](https://nextjs.org/docs)
- [Material UI (MUI) - Documentación](https://mui.com/material-ui/getting-started/)
- [Tailwind CSS - Documentación](https://tailwindcss.com/docs)
- [Material Tailwind - Documentación](https://www.material-tailwind.com/docs/react/installation)

### Templates Originales (Creative Tim)

- [Material Kit 2 React](https://www.creative-tim.com/product/material-kit-react) — UI Kit gratuito con MUI
- [NextJS Tailwind App Presentation Page](https://www.creative-tim.com/product/nextjs-tailwind-app-presentation-page) — Landing page gratuita

---

## Autor

**David Berruezo** — Software Engineer | Fullstack Developer

- GitHub: [@david-berruezo](https://github.com/david-berruezo)
- Website: [davidberruezo.com](https://www.davidberruezo.com)
