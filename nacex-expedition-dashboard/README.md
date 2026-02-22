# 📊 Nacex Expedition Dashboard

Panel de control interactivo para gestión y seguimiento de expediciones Nacex. Datos mock realistas basados en la estructura del plugin nacexlogista WooCommerce.

## Instalación

```bash
npm install
npm run dev
```

Se abre en `http://localhost:3002`

## Vistas

### 📊 Dashboard
- **5 KPI cards**: Total, Entregados, En tránsito, Pendientes, Incidencias
- **Gráfico área**: Volumen de expediciones por día (últimos 14 días)
- **Gráfico donut**: Distribución por estado
- **Gráfico barras**: Top servicios más utilizados
- **Últimas expediciones**: Lista con estado en tiempo real
- **Peso medio y reembolsos**: Métricas financieras

### 📋 Tabla de Expediciones
- **Búsqueda**: Por código, cliente, ciudad, referencia, pedido
- **Filtros**: Por estado (Notificado/Tránsito/Reparto/Entregado/Incidencia) y servicio
- **Ordenación**: Click en columna para ordenar asc/desc
- **Paginación**: 15 expediciones por página
- **Doble click o botón**: Navega al tracking detallado

### 🗂️ Kanban
- **4 columnas**: Notificado → Tránsito → Reparto → Entregado
- **Tarjetas**: Código, destinatario, ciudad, servicio, peso, reembolso
- **Click**: Navega al tracking detallado
- **Límite visual**: 20 por columna con indicador "+N más"

### 📍 Tracking
- **Timeline visual**: Seguimiento paso a paso con iconos, fechas y detalles
- **4 paneles info**: Destinatario, Detalles envío, Remitente, Códigos
- **Ruta visual**: Badge con color de ruta
- **Observaciones**: Panel destacado
- **Link tracking**: URL formato Nacex real

## Datos Mock

80 expediciones generadas con datos realistas españoles:
- 29 nombres reales + 16 empresas + 5 internacionales
- 16 ciudades (14 españolas + París, Berlín)
- Distribución ponderada de estados (más entregados que incidencias)
- Timeline de seguimiento coherente con timestamps
- Servicios: Nacex standard, NacexShop, Internacional
- Reembolsos en ~20% de expediciones

### Estados (de Constantes.php)
| Código | Estado | Color |
|--------|--------|-------|
| 1 | NOTIFICADO | Amarillo |
| 2 | TRÁNSITO | Azul |
| 3 | REPARTO | Cyan |
| 4 | ENTREGADO | Verde |
| 5 | SOL SIN OK | Púrpura |
| 9 | ANULADA | Rojo |

## Estructura

```
src/
├── views/
│   ├── DashboardView.jsx   # KPIs + gráficos Recharts
│   ├── TableView.jsx       # Tabla con búsqueda/filtros/sort/paginación
│   ├── KanbanView.jsx      # Board de 4 columnas
│   └── TrackingView.jsx    # Timeline + ficha expedición
├── components/
│   └── UI.jsx              # StatusBadge, StatCard, SearchInput, etc.
├── data/
│   ├── constants.js        # Estados, servicios, portes (Constantes.php)
│   └── mockData.js         # Generador de 80 expediciones realistas
├── styles/
│   └── global.css          # Variables CSS dark theme
├── App.jsx                 # Shell con sidebar + lazy loading
└── main.jsx                # Entry point
```

## Stack

- React 18 + Vite 6
- Recharts (gráficos)
- Lazy loading por vista (code-splitting)
- CSS-in-JS con variables CSS
- Zero external UI framework
