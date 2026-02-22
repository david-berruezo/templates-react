# 🏷️ Nacex Label Studio

Editor visual de etiquetas de envío Nacex con preview en tiempo real, generación de códigos de barras y exportación ZPL.

## Instalación

```bash
npm install
npm run dev
```

Se abrirá automáticamente en `http://localhost:3001`

## Estructura

```
src/
├── components/
│   ├── Label840/          # Etiqueta estándar Nacex
│   │   ├── index.jsx      # Componente principal (form + preview + ZPL)
│   │   ├── LabelForm.jsx  # Formulario con pestañas
│   │   └── LabelPreview.jsx # Vista previa visual de la etiqueta
│   ├── BarcodeCanvas.jsx  # Renderizado de Code128 en canvas
│   └── FormFields.jsx     # Componentes de formulario reutilizables
├── constants/
│   └── services.js        # Servicios, envases, portes (equiv. Constantes.php)
├── utils/
│   ├── barcode.js         # Encoder Code128B
│   └── zplGenerator.js    # Generador de código ZPL
├── styles/
│   └── global.css         # Variables CSS y reset
├── App.jsx                # Shell principal con navegación
└── main.jsx               # Entry point
```

## Plantillas disponibles

| Plantilla | Estado | Equivalente PHP |
|-----------|--------|----------------|
| 840 Estándar | ✅ Lista | `label.php` / `label-zebra.php` |
| 841 Diana | 🔜 Próximamente | `label-diana.php` |
| Cambio | 🔜 Próximamente | `label-cambio.php` |
| Devolución | 🔜 Próximamente | `label-devolucion.php` |
| Documentar Envío | 🔜 Próximamente | `label-documentar-envio.php` |
| NacexShop | 🔜 Próximamente | (variante 840) |
| Internacional | 🔜 Próximamente | (variante 840) |

## Características

- **Preview en vivo** — cambios en el formulario se reflejan instantáneamente
- **Code128 nativo** — barcodes renderizados en canvas sin dependencias externas
- **Export ZPL** — código ZPL generado compatible con impresoras Zebra
- **Descargar .zpl** — archivo listo para enviar al ZPL Editor o impresora
- **Copiar ZPL** — al portapapeles con un click
- **Zoom** — ajustable de 50% a 150%
- **Servicios completos** — todos los servicios Nacex (Standard, NacexShop, Internacional)
- **Datos realistas** — valores por defecto basados en datos reales de expediciones

## Scripts

```bash
npm run dev      # Servidor de desarrollo (HMR)
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Stack

- React 18 + Vite 6
- Code128 encoder nativo (sin dependencias)
- CSS-in-JS (inline styles con variables CSS)
