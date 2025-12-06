# 🎨 Cypher Elections Dashboard - Design System & Templates

**Última Actualización:** 6 de Diciembre 2025
**Versión:** 2.0 - Nike Style Minimalist Aesthetic

---

## 📋 Índice
1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Componentes Principales](#componentes-principales)
4. [Layout & Espaciado](#layout--espaciado)
5. [Temas (Dark/Light)](#temas-darklight)
6. [Componentes por Sección](#componentes-por-sección)
7. [Template de Referencia](#template-de-referencia)

---

## 🎨 Paleta de Colores

### Colores Base
```
Azul Chile:      #0039A6
Rojo Chile:      #D52B1E
Blanco:          #FFFFFF
Negro:           #000000
```

### Gradientes
```
Light BG:  bg-gradient-to-br from-[#0039A6] via-blue-600 to-[#D52B1E]
Dark BG:   bg-gradient-to-br from-gray-900 via-blue-950 to-red-950
```

### Colores por Estado

**Tema Claro (isDarkMode: false)**
- Background base: `bg-white/10 border-2 border-white/20`
- Texto principal: `text-white`
- Texto secundario: `text-white/70`
- Texto terciario: `text-white/60`
- Backgrounds claros: `bg-white/5`

**Tema Oscuro (isDarkMode: true)**
- Background base: `bg-gray-800/90 border border-gray-700`
- Texto principal: `text-white`
- Texto secundario: `text-gray-400`
- Texto terciario: `text-gray-500`
- Backgrounds oscuros: `bg-gray-800/30`

### Colores Temáticos

**Azul (Primera Vuelta)**
```
Light:  from-blue-500/20 to-blue-400/10
Dark:   from-blue-900/40 to-blue-800/30
Border: border-blue-400/50 (light) | border-blue-600/50 (dark)
Text:   text-blue-300 (dark) | text-blue-100 (light)
```

**Amarillo (Segunda Vuelta)**
```
Light:  bg-yellow-500/20 border-yellow-400/50
Dark:   bg-yellow-900/20 border-yellow-600/50
Text:   text-yellow-300 (dark) | text-yellow-100 (light)
```

**Púrpura (Parlamentarias)**
```
Light:  bg-purple-500/20 border-purple-400/50
Dark:   bg-purple-600/50 border-purple-600/50
Text:   text-purple-200 (dark) | text-purple-100 (light)
```

---

## 🔤 Tipografía

### Tamaños de Fuente

**Encabezados Principales**
- `text-8xl font-black tracking-tight` - Títulos heroicos (CHILE 2025)
- `text-7xl md:text-8xl font-bold` - Subtítulos grandes
- `text-5xl md:text-7xl font-bold` - Encabezados de sección
- `text-3xl md:text-4xl font-bold` - Encabezados secundarios
- `text-2xl font-bold` - Nombres de candidatos

**Cuerpo de Texto**
- `text-base md:text-lg font-light` - Descripciones
- `text-sm font-semibold` - Labels
- `text-xs md:text-sm` - Información pequeña

**Especiales**
- `text-6xl md:text-8xl lg:text-9xl font-black font-mono` - Countdown (números grandes)
- `text-9xl font-mono` - Números en despliegues

### Pesos de Fuente

```
font-black      900  -> Títulos heroicos
font-bold       700  -> Encabezados
font-semibold   600  -> Labels y énfasis
font-normal     400  -> Cuerpo
font-light      300  -> Descripciones
```

### Tracking (Letter Spacing)

```
tracking-tightest  -> tracking-tightest
tracking-tight     -> Títulos principales
tracking-normal    -> Cuerpo general
tracking-wide      -> Descripciones
tracking-widest    -> LABELS Y CATEGORÍAS (Nike style)
```

---

## 🏗️ Componentes Principales

### 1. ElectionCountdown (Contenedor Principal)

**Archivo:** `components/election-countdown.tsx`

**Estructura:**
```tsx
<div className={`min-h-screen transition-colors duration-300 ${bgGradient}`}>
  <div className="p-4 md:p-8">
    {/* Header */}
    {/* Content Container */}
    {/* Summary Section */}
  </div>
</div>
```

**Breakpoints:**
- Mobile: p-4
- Desktop: p-8 md:p-8

---

### 2. Header Nike Style

**Componente:** ElectionCountdown
**Ubicación:** Línea 105-140

**Estructura:**
```tsx
<div className="flex flex-col items-center mb-16 md:mb-24">
  <div className="relative w-full flex justify-center items-center mb-8 md:mb-12">
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black transition-colors
                   duration-300 text-white text-center tracking-tight">
      CHILE 2025
    </h1>
    {/* Dark Mode Button - Absolute positioned right-4 md:right-8 */}
  </div>

  <p className={`text-sm md:text-base font-light tracking-widest mb-8
                 transition-colors duration-300 ${isDarkMode ? "text-gray-500" : "text-white/60"}`}>
    ELECCIONES PRESIDENCIALES
  </p>

  {/* ElectionTabs Component */}
</div>
```

**Variantes:**
- Modo Oscuro: bg-gray-700, text-yellow-400
- Modo Claro: bg-white/10, text-white

---

### 3. ElectionTabs

**Archivo:** `components/election-tabs.tsx`

**Estructura:**
```tsx
<div className={`flex gap-4 justify-center mb-8 transition-colors duration-300
                 ${isDarkMode ? "bg-gray-900/30" : "bg-white/5"}
                 rounded-full p-2 w-fit mx-auto`}>
  {tabs.map((tab) => (
    <button
      className={`px-6 py-3 rounded-full font-semibold transition-all duration-300
                   flex items-center gap-2 ${activeTab === tab.id ? activeClass : inactiveClass}`}
    >
      <span>{tab.icon}</span>
      <span>{tab.label}</span>
    </button>
  ))}
</div>
```

**Tabs:**
- 📅 Elección 2025
- 🗳️ Elección 2021
- 📊 Historial (1975-2025)

---

### 4. CountdownNike (El Componente Estrella)

**Archivo:** `components/countdown-nike.tsx`

**Estructura Completa:**
```tsx
<div className="text-center py-16 md:py-24">
  {/* Subtítulo */}
  <p className={`text-base md:text-lg font-light tracking-widest mb-6
                 ${isDarkMode ? "text-gray-500" : "text-white/60"}`}>
    SEGUNDA VUELTA PRESIDENCIAL
  </p>

  {/* Título Grande */}
  <h2 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-12
                  transition-colors duration-300 ${isDarkMode ? "text-white" : "text-white"}`}>
    BALOTAJE 2025
  </h2>

  {/* Grid de Countdown */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 max-w-5xl mx-auto">
    {[DÍAS, HORAS, MINUTOS, SEGUNDOS].map((unit) => (
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <div className={`text-6xl md:text-8xl lg:text-9xl font-black font-mono
                        transition-colors duration-300 ${isDarkMode ? "text-white" : "text-white"}`}>
          {String(unit.value).padStart(2, "0")}
        </div>
        <span className={`text-xs md:text-sm font-bold tracking-widest
                         ${isDarkMode ? "text-gray-500" : "text-white/60"}`}>
          {unit.label}
        </span>
      </div>
    ))}
  </div>

  {/* Fecha */}
  <p className={`text-lg md:text-xl font-light tracking-wide
                 ${isDarkMode ? "text-gray-400" : "text-white/70"}`}>
    Domingo 14 de Diciembre de 2025
  </p>
</div>
```

**Características:**
- Grid responsivo: 2 cols (mobile), 4 cols (desktop)
- Números: font-black, font-mono, text-9xl
- Text shadow opcional
- Padding: py-16 md:py-24

---

### 5. Election2025

**Archivo:** `components/election-2025.tsx`

**Estructura Principal:**
```tsx
<div className="space-y-8">
  {!showSecondRound ? (
    /* PRIMERA VUELTA */
  ) : (
    /* SEGUNDA VUELTA CON COUNTDOWN GRANDE */
    <div>
      <CountdownNike isDarkMode={isDarkMode} />

      {/* Candidatos */}
      <div className="mt-12 space-y-6">
        {/* Candidato Cards */}
      </div>
    </div>
  )}

  {/* Toggle Buttons */}
</div>
```

---

### 6. Candidate Card (Primera Vuelta)

**Estructura:**
```tsx
<div className={`p-6 md:p-8 rounded-lg transition-all duration-300
                 ${candidate.rank <= 2 ? activeGradient : inactiveGradient}`}>

  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <div>
      <p className="text-2xl font-bold text-white">{candidate.name}</p>
      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-white/70"}`}>
        {candidate.party}
      </p>
    </div>
    <div className="text-right">
      <p className="text-3xl font-bold text-white">{candidate.percentage}%</p>
      <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-white/60"}`}>
        {candidate.votes.toLocaleString("es-CL")} votos
      </p>
    </div>
  </div>

  {/* Progress Bar */}
  <div className={`w-full h-2 rounded-full overflow-hidden
                   ${isDarkMode ? "bg-gray-700/50" : "bg-white/10"}`}>
    <div
      className={`h-full transition-all duration-300
                   ${candidate.rank <= 2 ? "bg-white" : "bg-gray-600"}`}
      style={{ width: `${candidate.percentage}%` }}
    />
  </div>
</div>
```

---

### 7. Candidate Card (Segunda Vuelta)

**Estructura:**
```tsx
<div className={`p-8 md:p-10 rounded-lg transition-all duration-300
                 ${isDarkMode ? "bg-gray-800/30 border border-gray-700" : "bg-white/5 border border-white/10"}`}>

  <div className="flex items-center justify-between">
    <div>
      <p className="text-2xl md:text-3xl font-bold text-white">{candidate.name}</p>
      <p className={`text-base ${isDarkMode ? "text-gray-400" : "text-white/70"}`}>
        {candidate.party}
      </p>
    </div>
    <div className={`px-6 py-3 rounded-lg transition-colors duration-300
                     ${isDarkMode ? "bg-yellow-900/20 border border-yellow-600/50" : "bg-yellow-500/20 border border-yellow-400/50"}`}>
      <p className={`text-sm font-bold ${isDarkMode ? "text-yellow-300" : "text-yellow-100"}`}>
        ESPERANDO RESULTADOS
      </p>
    </div>
  </div>
</div>
```

---

### 8. Election Summary

**Archivo:** `components/election-summary.tsx`

**Componentes:**

**a) Header Stats Grid (3 columnas)**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Votos Emitidos Card */}
  {/* Escrutinio Card */}
  {/* Participación Card */}
</div>
```

**b) Candidate Results**
```tsx
<div className={`rounded-2xl p-8 border-2 transition-colors duration-300
                 ${isDarkMode ? "bg-gray-900/50 border-blue-500/30" : "bg-white/5 border-blue-400/30"}`}>
  <h3 className="text-2xl font-bold mb-6 text-white">Resultados Presidenciales</h3>

  <div className="space-y-4">
    {/* Candidate rows */}
  </div>
</div>
```

**c) Parliamentary Results (2 columnas)**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {[senadores, diputados].map((chamber) => (
    <div className={`rounded-2xl p-8 border-2
                     ${isDarkMode ? "bg-gray-900/50 border-purple-500/30" : "bg-white/5 border-purple-400/30"}`}>
      {/* Chamber data */}
    </div>
  ))}
</div>
```

---

## 🎯 Layout & Espaciado

### Contenedores Principales

**Pantalla Completa:**
```
Min Height: min-h-screen
Padding: p-4 md:p-8
Background: gradient (darkBg o lightBg)
```

**Content Container:**
```
Max Width: max-w-6xl
Auto Margins: mx-auto
```

### Espaciados Estándar

```
Vertical:
- Extra Large: mb-24 (Header)
- Large: mb-16, mb-12 (Secciones)
- Medium: mb-8 (Componentes)
- Small: mb-4 (Items)

Horizontal:
- Gap 4: gap-4 (Items pequeños)
- Gap 6: gap-6 (Medio)
- Gap 8: gap-8 (Grande)

Padding Interior:
- Pequeño: p-3, p-4
- Medio: p-6, p-8
- Grande: p-8, p-10, p-12
```

### Bordes y Esquinas

```
Rounded:
- rounded-lg: Cards pequeñas
- rounded-xl: Cards medianas
- rounded-2xl: Cards grandes
- rounded-3xl: Contenedores principales
- rounded-full: Botones y pills
```

### Transiciones

```
Todas las transiciones:
transition-colors duration-300
transition-all duration-300
```

---

## 🌓 Temas Dark/Light

### Modo Oscuro (isDarkMode: true)

```
Background Principal:  bg-gradient-to-br from-gray-900 via-blue-950 to-red-950
Cards:                 bg-gray-800/90 border border-gray-700
Backgrounds:           bg-gray-800/30, bg-gray-700/50
Texto Principal:       text-white
Texto Secundario:      text-gray-400
Texto Terciario:       text-gray-500
Botones:               bg-gray-700 hover:bg-gray-600
Acentos:               text-yellow-400, text-blue-300, etc.
```

### Modo Claro (isDarkMode: false)

```
Background Principal:  bg-gradient-to-br from-[#0039A6] via-blue-600 to-[#D52B1E]
Cards:                 bg-white/10 border-2 border-white/20
Backgrounds:           bg-white/5, bg-white/10
Texto Principal:       text-white
Texto Secundario:      text-white/70
Texto Terciario:       text-white/60
Botones:               bg-white/20 hover:bg-white/30
Acentos:               text-blue-100, text-yellow-100, etc.
```

---

## 📱 Componentes por Sección

### 1. Navigation Tabs

**Padre:** ElectionCountdown
**Ubicación:** election-tabs.tsx

**Tabs Array:**
```typescript
[
  { id: "2025", label: "Elección 2025", icon: "📅" },
  { id: "2021", label: "Elección 2021", icon: "🗳️" },
  { id: "historial", label: "Historial (1975-2025)", icon: "📊" },
]
```

---

### 2. Election 2025 Results

**Padre:** ElectionCountdown (activeTab === "2025")
**Ubicación:** election-2025.tsx

**Estados:**
- `showSecondRound: true` - Muestra segunda vuelta con countdown gigante
- `showSecondRound: false` - Muestra resultados primera vuelta

---

### 3. Election Summary

**Padre:** ElectionCountdown (activeTab === "2025" - después del main content)
**Ubicación:** election-summary.tsx

**Datos:**
- 13.452.724 votos totales
- 85.3% participación
- 8 candidatos presidenciales
- 6 bloques parlamentarios (Senadores)
- 6 bloques parlamentarios (Diputados)

---

## 📋 Template de Referencia

### Template Completo de Card

```tsx
<div className={`p-6 md:p-8 rounded-lg transition-all duration-300
                 ${isDarkMode
                   ? "bg-gray-800/30 border border-gray-700"
                   : "bg-white/5 border border-white/10"}`}>

  <div className="flex items-center justify-between mb-4">
    <div>
      <p className={`text-2xl font-bold transition-colors duration-300
                     ${isDarkMode ? "text-white" : "text-white"}`}>
        Título Principal
      </p>
      <p className={`text-sm transition-colors duration-300
                     ${isDarkMode ? "text-gray-400" : "text-white/70"}`}>
        Subtítulo
      </p>
    </div>
    <div className="text-right">
      <p className={`text-3xl font-bold transition-colors duration-300
                     ${isDarkMode ? "text-white" : "text-white"}`}>
        26.75%
      </p>
      <p className={`text-xs transition-colors duration-300
                     ${isDarkMode ? "text-gray-500" : "text-white/60"}`}>
        3,446,854 votos
      </p>
    </div>
  </div>

  <div className={`w-full h-2 rounded-full overflow-hidden transition-colors duration-300
                   ${isDarkMode ? "bg-gray-700/50" : "bg-white/10"}`}>
    <div
      className="h-full bg-white transition-all duration-300"
      style={{ width: "26.75%" }}
    />
  </div>
</div>
```

---

### Template Contenedor Sección

```tsx
<div className={`rounded-2xl p-8 md:p-12 border-2 transition-colors duration-300
                 ${isDarkMode
                   ? "bg-gray-900/50 border-blue-500/30"
                   : "bg-white/5 border-blue-400/30"}`}>

  <h3 className={`text-2xl font-bold mb-8 transition-colors duration-300
                  ${isDarkMode ? "text-white" : "text-white"}`}>
    Título de Sección
  </h3>

  <div className="space-y-4">
    {/* Contenido */}
  </div>

  <div className={`mt-8 p-4 rounded-lg text-center transition-colors duration-300
                   ${isDarkMode
                     ? "bg-blue-900/20 border border-blue-600/50"
                     : "bg-blue-500/20 border border-blue-400/50"}`}>
    <p className={`font-semibold transition-colors duration-300
                   ${isDarkMode ? "text-blue-300" : "text-blue-100"}`}>
      Información adicional
    </p>
  </div>
</div>
```

---

### Template Botón

```tsx
<button
  onClick={() => setShowSecondRound(!showSecondRound)}
  className={`px-8 py-3 font-semibold transition-all duration-300
              ${isActive
                ? isDarkMode
                  ? "text-white border-b-2 border-white"
                  : "text-white border-b-2 border-white"
                : isDarkMode
                ? "text-gray-500 hover:text-gray-300"
                : "text-white/50 hover:text-white/70"}`}
>
  Etiqueta
</button>
```

---

## 🔢 Datos Electorales 2025

### Resultados Primera Vuelta (16 Nov 2025)

```
Total de votos: 13,452,724
Participación: 85.3%
Escrutinio: 99.99%

1. Jeannette Jara Román - 3,476,615 votos (26.8%)
2. José Antonio Kast Rist - 3,097,717 votos (23.9%)
3. Franco Parisi - 2,552,649 votos (19.7%)
4. Johannes Kaiser - 1,804,773 votos (13.9%)
5. Evelyn Matthei - 1,613,797 votos (12.5%)
6. Harold M-N - 163,273 votos (1.3%)
7. Marco E-O - 154,850 votos (1.2%)
8. Eduardo Artés - 86,041 votos (0.7%)
```

### Segunda Vuelta (14 Dic 2025)

```
Candidatos:
- Jeannette Jara Román (Comunista/Frente Amplio)
- José Antonio Kast Rist (Republicano)

Estado: En curso
Resultados: Esperando
```

### Parlamentarias

**Senadores:**
- Unidad por Chile: 20 escaños
- Verdes, Reg. y Hum.: 3 escaños
- P. de la Gente: 0 escaños
- Ch. Grande y Unido: 18 escaños
- Cambio por Chile: 7 escaños
- Otros: 2 escaños

**Diputados:**
- Unidad por Chile: 61 diputados
- Verdes, Reg. y Hum.: 3 diputados
- P. de la Gente: 14 diputados
- Ch. Grande y Unido: 34 diputados
- Cambio por Chile: 42 diputados
- Otros: 1 diputado

---

## 🛠️ Utilidades & Helpers

### calculateTimeLeft()
```typescript
interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const timeLeft = calculateTimeLeft(SECOND_ROUND_DATE)
```

### getDarkMode() / setDarkMode()
```typescript
const isDark = getDarkMode()
setDarkMode(true)
```

### isElectionPassed()
```typescript
const hasPassed = isElectionPassed(SECOND_ROUND_DATE)
```

### formatNumber()
```typescript
const formatted = formatNumber(3446854) // "3.446.854"
```

---

## 🎯 Constantes

**Ubicación:** `lib/constants.ts`

```typescript
export const ELECTION_COLORS = {
  primary: "#0039A6",
  secondary: "#D52B1E",
  darkBg: "bg-gradient-to-br from-gray-900 via-blue-950 to-red-950",
  lightBg: "bg-gradient-to-br from-[#0039A6] via-blue-600 to-[#D52B1E]",
}

export const FIRST_ROUND_DATE = new Date("2025-11-16T00:00:00-03:00")
export const SECOND_ROUND_DATE = new Date("2025-12-14T00:00:00-03:00")

export const TIME_UNITS = {
  DAY_MS: 1000 * 60 * 60 * 24,
  HOUR_MS: 1000 * 60 * 60,
  MINUTE_MS: 1000 * 60,
  SECOND_MS: 1000,
}
```

---

## 📊 Estructura de Carpetas

```
cypher/
├── components/
│   ├── election-countdown.tsx          (Main Container)
│   ├── election-2025.tsx               (Election Results)
│   ├── countdown-nike.tsx              (Large Countdown)
│   ├── election-tabs.tsx               (Navigation)
│   ├── election-summary.tsx            (Full Summary)
│   ├── election-summary-home.tsx       (Home Summary)
│   ├── election-2021.tsx               (2021 Results)
│   ├── historical-elections.tsx        (Historical Data)
│   └── [otros componentes]
├── lib/
│   ├── constants.ts                    (Colors, Dates)
│   ├── helpers.ts                      (Utilities)
│   ├── supabase-client.ts              (DB Connection)
│   └── use-election-data-supabase.ts   (Data Hook)
├── public/
│   └── election-data.xlsx              (Backup Data)
└── styles/
    └── globals.css                     (Global Styles)
```

---

## 🎬 Casos de Uso - Cómo Cambiar Estilos

### Ejemplo 1: Cambiar Color Principal

**Archivo:** `lib/constants.ts`

```typescript
// ANTES:
export const ELECTION_COLORS = {
  primary: "#0039A6",
  secondary: "#D52B1E",
  darkBg: "bg-gradient-to-br from-gray-900 via-blue-950 to-red-950",
  lightBg: "bg-gradient-to-br from-[#0039A6] via-blue-600 to-[#D52B1E]",
}

// DESPUÉS (Ejemplo con colores verdes):
export const ELECTION_COLORS = {
  primary: "#15803d",
  secondary: "#dc2626",
  darkBg: "bg-gradient-to-br from-gray-900 via-green-950 to-red-950",
  lightBg: "bg-gradient-to-br from-[#15803d] via-green-600 to-[#dc2626]",
}
```

---

### Ejemplo 2: Cambiar Tamaño del Countdown

**Archivo:** `components/countdown-nike.tsx`

```typescript
// ANTES:
<div className={`text-6xl md:text-8xl lg:text-9xl font-black font-mono ...`}>

// DESPUÉS (más pequeño):
<div className={`text-4xl md:text-6xl lg:text-8xl font-black font-mono ...`}>
```

---

### Ejemplo 3: Cambiar Espaciado General

**Archivo:** `components/election-countdown.tsx`

```typescript
// ANTES:
<div className="flex flex-col items-center mb-16 md:mb-24">

// DESPUÉS (menos espacio):
<div className="flex flex-col items-center mb-8 md:mb-12">
```

---

## 📌 Resumen de Cambios Recientes

| Commit | Descripción |
|--------|-------------|
| 29a9b3f | Redesign con estética Nike - Contador gigante |
| 89b381a | Centrar header con mejor flexbox |
| a11da5a | Centrar título y tabs |
| 37a0091 | Agregar resumen electoral completo |
| 8c7cc7b | Segunda vuelta por defecto |
| 8edb8b8 | Agregar countdown interactivo |
| 75bf084 | Actualizar datos primera vuelta SERVEL |

---

## 🚀 Próximas Características Sugeridas

1. Animaciones de entrada para números countdown
2. Sonidos/notificaciones cuando se aproxima la elección
3. Gráficos interactivos de resultados
4. Mapa de resultados por región
5. Comparación histórica de elecciones
6. Modo "Print-friendly" para reportes

---

**Documento Versión 2.0**
*Última actualización: 6 de Diciembre 2025*
*Por: Claude Code*
