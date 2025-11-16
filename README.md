# 🗳️ Cypher Elections - Plataforma de Información Electoral Presidencial de Chile

Una aplicación web elegante y moderna que proporciona información completa sobre las elecciones presidenciales de Chile, con enfoque en 2025 y datos históricos desde 1975.

![Next.js](https://img.shields.io/badge/Next.js-14.2.25-black?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production%20Ready-green?style=flat-square)

## ✨ Características

### 🎯 Elecciones 2025
- **Cuenta Regresiva en Tiempo Real**: Actualización cada segundo hasta la primera vuelta (16 de noviembre)
- **8 Candidatos Confirmados**: Con información de partido y biografía
- **Fechas Importantes**: Primera vuelta (16 nov) y segunda vuelta (14 dic)
- **Período Presidencial**: 2026-2030 (4 años)

### 📊 Elecciones 2021
- **Resultados Completos**: Primera y segunda vuelta
- **Visualización Interactiva**: Switch entre rondas
- **Datos Estadísticos**: Votos totales, porcentajes y turnout
- **Información del Ganador**: Gabriel Boric Font (Convergencia Social, 55.87%)

### 📈 Historial Electoral (50 años)
Datos históricos de todas las elecciones presidenciales desde **1975-2025**:
- 1975 - Plebiscito (Pinochet)
- 1989 - Patricio Aylwin
- 1993 - Eduardo Frei Ruiz-Tagle
- 1999 - Ricardo Lagos (primera y segunda vuelta)
- 2005 - Michelle Bachelet (primera y segunda vuelta)
- 2009 - Sebastián Piñera (primera y segunda vuelta)
- 2013 - Michelle Bachelet (segunda mandato)
- 2017 - Sebastián Piñera (segundo mandato)
- 2021 - Gabriel Boric Font
- 2025 - (En curso)

### 🎨 Interfaz Usuario
- **Dark/Light Mode**: Toggle automático con tema actual
- **Responsive Design**: Optimizado para móvil, tablet y desktop
- **Navegación Elegante**: Tabs con animaciones suaves
- **Diseño Modern**: Gradientes, glassmorphism y animaciones
- **Colores Patrimoniales**: Azul (#0039A6) y Rojo (#D52B1E) de Chile

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- npm o pnpm

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/cyphertechnologiesinc-star/cypher.git
cd cypher

# Instalar dependencias
npm install --legacy-peer-deps

# Ejecutar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📦 Dependencias Principales

- **Next.js 14**: Framework de React full-stack
- **React 19**: Biblioteca de UI
- **Tailwind CSS**: Styling utilitario
- **Lucide React**: Iconos
- **Radix UI**: Componentes accesibles
- **Framer Motion**: Animaciones
- **Supabase**: Base de datos (opcional)

## 🏗️ Estructura del Proyecto

```
cypher/
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página de inicio
│   └── globals.css         # Estilos globales
├── components/
│   ├── election-countdown.tsx        # Componente principal
│   ├── election-tabs.tsx             # Navegación entre años
│   ├── election-2021.tsx             # Datos de 2021
│   └── historical-elections.tsx      # Datos históricos
├── lib/
│   ├── utils.ts            # Utilidades
│   └── supabase.ts         # Cliente de Supabase
├── public/
│   └── images/             # Imágenes
├── Dockerfile              # Configuración Docker
├── fly.toml               # Configuración Fly.io
├── next.config.mjs        # Configuración Next.js
└── package.json           # Dependencias
```

## 🔧 Configuración

### Variables de Entorno (Opcional)

Si deseas usar Supabase para datos en tiempo real:

```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anonymous-key
```

## 📱 Componentes Principales

### ElectionCountdown
Componente principal que maneja:
- Cuenta regresiva de tiempo real
- Visualización del countdown
- Lista de candidatos
- Información de fechas importantes
- Toggle dark/light mode

### ElectionTabs
Sistema de navegación elegante:
- 3 pestañas (2025, 2021, Historial)
- Animaciones suaves
- Estados visuales claros

### Election2021
Visualización de resultados electorales:
- Primera vuelta con 5 candidatos
- Segunda vuelta (Boric 55.87% vs Kast 44.14%)
- Barras de progreso visuales
- Información estadística completa

### HistoricalElections
Navegación histórica:
- Selector de años (1975-2025)
- Botones anterior/siguiente
- Resultados detallados por elección
- Visualización de turnout y votos

## 🎨 Personalización

### Colores

Los colores patrimoniales de Chile están incorporados:
```css
/* Azul chileno */
--color-blue-chile: #0039A6;

/* Rojo chileno */
--color-red-chile: #D52B1E;
```

### Tipografía

Se utiliza Geist font como familia principal (compatible con San Francisco).

## 🚢 Despliegue

### Fly.io (Recomendado)

```bash
flyctl deploy
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas.

### Vercel

1. Conecta tu GitHub a Vercel
2. Selecciona este repositorio
3. Vercel detectará automáticamente la configuración
4. Deploy automático en cada push a `main`

### Docker Local

```bash
docker build -t cypher-elections .
docker run -p 3000:3000 cypher-elections
```

## 📊 Datos Electorales

Todos los datos están basados en fuentes oficiales:
- [SERVEL](https://www.servel.cl/) - Servicio Electoral de Chile
- [Wikipedia Elections](https://es.wikipedia.org/) - Historial histórico
- Datos públicos de elecciones chilenas

## 🔒 Seguridad

- ✅ No se almacenan datos personales
- ✅ No se recopila información de usuarios
- ✅ Todos los datos son públicos
- ✅ HTTPS en producción
- ✅ CSP headers configurados
- ✅ Input validation en componentes

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para reportar bugs o solicitar features, abre un [GitHub Issue](https://github.com/cyphertechnologiesinc-star/cypher/issues).

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) - El framework
- [Tailwind CSS](https://tailwindcss.com/) - El styling
- [Radix UI](https://radix-ui.com/) - Los componentes
- [Chile](🇨🇱) - La inspiración

---

Hecho con ❤️ para la democracia electoral chilena | 2025
