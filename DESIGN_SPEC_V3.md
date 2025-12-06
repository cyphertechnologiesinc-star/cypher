# 🎨 Cypher Elections Dashboard - Design Specification v3.0

**Estilo:** Gob.cl Institucional + DecideChile + Neon Futurista
**Fecha:** 6 de Diciembre 2025
**Estado:** Especificación Completa

---

## 📋 Índice
1. [Brand Core](#brand-core)
2. [Paleta de Colores](#paleta-de-colores)
3. [Tipografía](#tipografía)
4. [Layout & Especificaciones](#layout--especificaciones)
5. [Componentes](#componentes)
6. [Estilos CSS Variables](#estilos-css-variables)
7. [Estructura de Proyecto](#estructura-de-proyecto)
8. [Transiciones & Animaciones](#transiciones--animaciones)

---

## 🎯 Brand Core

| Aspecto | Descripción |
|--------|-----------|
| **Identidad** | Interfaz electoral futurista combinada con limpieza institucional |
| **Base Style** | Tarjetas tipo DecideChile mezcladas con estética Gob.cl |
| **Tema** | Gobierno de Chile azul/rojo + acentos neon azul/violeta |
| **Tono** | Institucional, moderno, confiable, animado |

---

## 🎨 Paleta de Colores

### Colores Institucionales

```
Azul Gobierno Chile:      #0038A8
Rojo Gobierno Chile:      #D52B1E
Blanco Institucional:     #FFFFFF
Gris Institucional:       #F4F7FA
```

### Colores de Texto

```
Texto Oscuro Principal:   #1A1A1A
Texto Medio Gris:         #4D4D4D
Borde Ligero:             #D7D9DD
```

### Acentos Neon

```
Neon Azul:                #6CCAFF
Neon Violeta:             #B57CFF
Glow Azul (50% opacity):  rgba(108,202,255,0.35)
Glow Violeta (50% opc):   rgba(181,124,255,0.35)
```

### Paleta Completa CSS

```css
--gov-blue: #0038A8;
--gov-red: #D52B1E;
--gov-white: #FFFFFF;
--gov-gray: #F4F7FA;
--text-dark: #1A1A1A;
--text-mid: #4D4D4D;
--border-light: #D7D9DD;
--card-bg: #FFFFFF;
--neon-blue: #6CCAFF;
--neon-purple: #B57CFF;
--glow-blue: rgba(108,202,255,0.35);
--glow-purple: rgba(181,124,255,0.35);
```

---

## 🔤 Tipografía

### Fuentes Principales

**Headers (Orbitron)**
- Google Font: Orbitron
- Pesos: 400, 700, 900
- Uso: Títulos heroicos, números countdown, acentos

**Body (Inter)**
- Google Font: Inter
- Pesos: 300, 400, 500, 600, 700
- Uso: Cuerpo, descripciones, labels

### Escala de Tamaños

```
Hero Title:        Orbitron 72px/900
Section Title:     Orbitron 48px/700
Subsection:        Orbitron 32px/700
Card Title:        Inter 20px/600
Card Subtitle:     Inter 14px/500
Body:              Inter 16px/400
Small:             Inter 12px/400
Countdown Digit:   Orbitron 120px/900 (responsivo)
```

### Line Height

```
Titles:   1.2
Body:     1.6
Labels:   1.4
```

---

## 🏗️ Layout & Especificaciones

### Grid & Spacing

**Espacios Estándar**
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
```

**Padding de Secciones**
```
Desktop:  60px (horizontal y vertical)
Mobile:   32px (horizontal y vertical)
```

**Grid Columns**
```
Sistema: 12 columnas (estilo Gob.cl)
Gap:     24px (desktop), 16px (mobile)
```

### Border Radius

```
Small Cards:    16px
Large Cards:    28px
Buttons:        12px
Rounded Full:   9999px (pills)
```

### Shadows

```
Muy ligera, difusa, institucional:
  box-shadow: 0 1px 3px rgba(0,0,0,0.08)

Hover (tarjetas):
  box-shadow: 0 8px 16px rgba(0,0,0,0.12)

Neon Glow:
  box-shadow: 0 0 20px rgba(108,202,255,0.5)
```

### Breakpoints (Tailwind)

```
xs:   320px
sm:   640px
md:   768px
lg:   1024px
xl:   1280px
2xl:  1536px
```

---

## 🎬 Componentes Principales

### 1. Navbar

**Especificaciones:**
```
Height:           72px
Background:       #FFFFFF (white)
Border Bottom:    1px solid #D7D9DD
Logo:             Versión institucional azul (48px)
Spacing:          24px horizontal padding

Links:
  - Color:        #4D4D4D (text-mid)
  - Hover:        #0038A8 (gov-blue)
  - Active:       3px bottom border #0038A8
  - Transition:   0.18s ease

Mode:             Ligero por defecto (light mode)
```

---

### 2. Hero Section

**Especificaciones:**
```
Height:           auto (min 600px)
Background:       Radial gradient gov-blue → gov-red con capa neon overlay
Title:
  - Font:         Orbitron 72px/900
  - Color:        #FFFFFF con glow azul
  - Shadow:       0 0 30px rgba(108,202,255,0.6)

Subtitle:
  - Font:         Inter 20px/400
  - Color:        #4D4D4D

Countdown:
  - Dígitos:      Orbitron 120px/900 estilo Fortnite
  - Labels:       Inter 14px/600
  - Color:        Neon Azul #6CCAFF
  - Shadow:       Glow neon en dígitos

Progress Bar:
  - Altura:       8px
  - Fondo:        #F4F7FA
  - Relleno:      Gradiente neon-blue → neon-purple
  - Shadow:       Glow neon suave

Animation:        fade-in + pulse suave (opacity 0.3s)
```

---

### 3. Tabs (Navegación)

**Especificaciones:**
```
Shape:            Pill (border-radius 28px)
Background:       #F4F7FA

Active Tab:
  - Background:   gov-blue 12% (rgba(0,56,168,0.12))
  - Text Color:   #0038A8
  - Bottom:       2px solid gov-blue
  - Font:         Inter 16px/600

Inactive Tab:
  - Border:       1px solid #D7D9DD
  - Text:         #4D4D4D
  - Hover:        Border gov-blue

Animation:        Deslizamiento con Framer Motion 0.25s
```

---

### 4. Card Electoral

**Especificaciones:**
```
Border:           1px solid #D7D9DD
Background:       #FFFFFF
Border Radius:    16px
Padding:          24px

Header:
  - Font:         Orbitron 18px/700
  - Color:        #0038A8 (gov-blue)
  - Icon/Avatar:  Silueta cartoon sin rostros

Party/Info:
  - Font:         Inter 14px/500
  - Color:        #4D4D4D

Percentage:
  - Font:         Orbitron 28px/900
  - Color:        #0038A8 o #D52B1E según bloque
  - Shadow:       Glow suave

Bar:
  - Estilo:       DecideChile (segmentada multicolor)
  - Altura:       12px
  - Relleno:      Gradiente gov-colors
  - Shadow:       Glow neon opcional

Metadata:
  - Font:         Inter 12px/400
  - Color:        #999999

Hover:
  - Border:       2px solid gov-blue
  - Shadow:       0 8px 16px rgba(0,56,168,0.15)
  - Transition:   0.18s ease
```

---

### 5. Chart Bar (Barras Horizontales)

**Especificaciones:**
```
Direction:        Horizontal (DecideChile style)
Colors:           Gobierno azul/rojo + neutros
Stacked:          true (multicolor)
Animation:        Slide-in from-left 0.6s

Bars:
  - Altura:       32px
  - Radius:       8px
  - Shadow:       Sutil, difuso

Labels:
  - Font:         Inter 12px/600
  - Color:        #1A1A1A
  - Position:     Derecha del bar

Legend:
  - Minimalista
  - Puntos de color 8px
  - Font:         Inter 12px/400
```

---

### 6. Footer

**Especificaciones:**
```
Background:       #F4F7FA (gris institucional)
Padding:          48px (desktop), 32px (mobile)
Border Top:       1px solid #D7D9DD

Text:
  - Font:         Inter 14px/400
  - Color:        #4D4D4D

Links:
  - Color:        #0038A8
  - Hover:        Subrayado + #006BD0 (más oscuro)
  - Transition:   0.18s
```

---

## 🎨 Estilos CSS Variables

```css
/* Archivo: /styles/theme.css */

:root {
  /* Colores Institucionales */
  --gov-blue: #0038A8;
  --gov-red: #D52B1E;
  --gov-white: #FFFFFF;
  --gov-gray: #F4F7FA;

  /* Colores de Texto */
  --text-dark: #1A1A1A;
  --text-mid: #4D4D4D;
  --text-light: #999999;

  /* Bordes */
  --border-light: #D7D9DD;

  /* Neon */
  --neon-blue: #6CCAFF;
  --neon-purple: #B57CFF;
  --glow-blue: rgba(108,202,255,0.35);
  --glow-purple: rgba(181,124,255,0.35);

  /* Espacios */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Border Radius */
  --radius-sm: 12px;
  --radius-md: 16px;
  --radius-lg: 28px;

  /* Tipografía */
  --font-primary: 'Inter', sans-serif;
  --font-headers: 'Orbitron', monospace;

  /* Transiciones */
  --transition-fast: 0.18s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.6s ease;
}
```

---

## ✨ Transiciones & Animaciones

### Duraciones Estándar

```
Rápida:    0.18s ease
Normal:    0.3s ease
Lenta:     0.6s ease
```

### Animaciones Disponibles

**Hero Fade In**
```css
@keyframes heroFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: heroFadeIn 0.6s ease-out;
```

**Countdown Pulse**
```css
@keyframes countdownPulse {
  0%, 100% {
    opacity: 1;
    text-shadow: 0 0 20px rgba(108,202,255,0.5);
  }
  50% {
    opacity: 0.8;
    text-shadow: 0 0 30px rgba(108,202,255,0.8);
  }
}
animation: countdownPulse 2s ease-in-out infinite;
```

**Neon Glow**
```css
@keyframes neonGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(108,202,255,0.5);
  }
  50% {
    box-shadow: 0 0 30px rgba(108,202,255,0.8);
  }
}
animation: neonGlow 2s ease-in-out infinite;
```

**Tab Slide**
```css
transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
```

**Card Hover**
```css
transition: all 0.18s ease;
```

---

## 📐 Estructura de Proyecto

### Carpetas Recomendadas

```
cypher/
├── /app
│   ├── page.jsx              (vista principal)
│   ├── layout.jsx            (shell completo)
│   └── global.css
│
├── /components
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Tabs.jsx
│   ├── Footer.jsx
│   │
│   ├── /cards
│   │   └── CardElectoral.jsx
│   │
│   ├── /charts
│   │   └── ChartBar.jsx
│   │
│   └── /ui
│       ├── Button.jsx
│       ├── Badge.jsx
│       └── Tooltip.jsx
│
├── /styles
│   ├── global.css
│   ├── theme.css            (variables CSS)
│   ├── animations.css
│   └── layout.css
│
├── /lib
│   ├── fetchData.js
│   ├── utils.js
│   └── constants.js
│
├── /data
│   └── mock.json            (datos electorales)
│
├── /public
│   ├── /assets
│   │   ├── logo.svg
│   │   ├── logo-blue.svg
│   │   └── icons/
│   └── /fonts
│       ├── orbitron.woff2
│       └── inter.woff2
│
└── tailwind.config.js
```

---

## 🔧 Configuración Tailwind

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'gov-blue': '#0038A8',
        'gov-red': '#D52B1E',
        'gov-white': '#FFFFFF',
        'gov-gray': '#F4F7FA',
        'text-dark': '#1A1A1A',
        'text-mid': '#4D4D4D',
        'border-light': '#D7D9DD',
        'neon-blue': '#6CCAFF',
        'neon-purple': '#B57CFF',
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'headers': ['Orbitron', 'monospace'],
      },
      fontSize: {
        'hero': '72px',
        'section': '48px',
        'countdown': '120px',
      },
      borderRadius: {
        'card': '16px',
        'hero': '28px',
      },
      spacing: {
        'section': '60px',
      },
    },
  },
};
```

---

## 🎯 Componentes - Template de Código

### Template: CardElectoral

```jsx
export function CardElectoral({ candidate, percentage }) {
  return (
    <div className="border border-border-light bg-gov-white rounded-[16px] p-6
                    hover:border-2 hover:border-gov-blue hover:shadow-lg
                    transition-all duration-[0.18s]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gov-gray">
          {/* Avatar cartoon */}
        </div>
        <div>
          <h3 className="font-headers text-[18px] font-bold text-gov-blue">
            {candidate.name}
          </h3>
          <p className="font-primary text-[14px] text-text-mid">
            {candidate.party}
          </p>
        </div>
      </div>

      {/* Percentage */}
      <div className="text-right mb-4">
        <p className="font-headers text-[28px] font-black text-gov-blue
                      drop-shadow-lg"
           style={{textShadow: '0 0 10px rgba(0,56,168,0.3)'}}>
          {percentage}%
        </p>
      </div>

      {/* Bar */}
      <div className="w-full h-3 bg-gov-gray rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-gradient-to-r from-gov-blue to-neon-blue"
          style={{width: `${percentage}%`}}
        />
      </div>

      {/* Metadata */}
      <p className="font-primary text-[12px] text-text-light text-right">
        {candidate.votes.toLocaleString()} votos
      </p>
    </div>
  );
}
```

---

## 📊 Ejemplos de Uso

### Hero Section

```jsx
<section className="min-h-[600px] bg-gradient-to-br from-gov-blue via-gov-red
                    to-gov-blue relative overflow-hidden">
  {/* Overlay neon */}
  <div className="absolute inset-0 bg-gradient-radial
                  from-transparent via-glow-blue to-transparent opacity-40" />

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center justify-center
                  h-full px-4 py-16 sm:py-24">
    <h1 className="font-headers text-[72px] font-black text-gov-white
                   drop-shadow-lg mb-4"
        style={{textShadow: '0 0 30px rgba(108,202,255,0.6)'}}>
      CHILE 2025
    </h1>

    <p className="font-primary text-[20px] text-text-mid mb-12">
      Elecciones Presidenciales
    </p>

    {/* Countdown */}
    <div className="grid grid-cols-4 gap-6">
      {[{label: 'DÍAS', value: 8}, ...].map((item) => (
        <div key={item.label} className="text-center">
          <div className="font-headers text-[120px] font-black text-neon-blue
                          drop-shadow-lg animate-pulse">
            {item.value.toString().padStart(2, '0')}
          </div>
          <p className="font-primary text-[14px] font-semibold text-text-mid">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 📋 Checklist de Implementación

- [ ] Instalar Google Fonts (Inter, Orbitron)
- [ ] Configurar Tailwind con colores personalizados
- [ ] Crear archivo /styles/theme.css con variables
- [ ] Crear archivo /styles/animations.css
- [ ] Implementar Navbar con estilos especificados
- [ ] Implementar Hero con countdown y glow
- [ ] Implementar Tabs con animaciones
- [ ] Implementar CardElectoral
- [ ] Implementar ChartBar con DecideChile style
- [ ] Implementar Footer
- [ ] Agregar Framer Motion para animaciones complejas
- [ ] Testar responsive design en todos los breakpoints
- [ ] Validar accesibilidad (colores, contraste, navegación)
- [ ] Optimizar imágenes y fuentes
- [ ] Deploy a Vercel

---

**Especificación Versión 3.0 - Completa**
*Por: Claude Code*
*Fecha: 6 de Diciembre 2025*
