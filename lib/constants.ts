// Constants for Cypher Elections

export const ELECTION_COLORS = {
  primary: "#0039A6", // Azul Chile
  secondary: "#D52B1E", // Rojo Chile
  darkBg: "bg-gradient-to-br from-gray-900 via-blue-950 to-red-950",
  lightBg: "bg-gradient-to-br from-[#0039A6] via-blue-600 to-[#D52B1E]",
} as const

export const CANDIDATES_2025 = [
  { name: "Jeanette Jara", party: "Comunista/Frente Amplio" },
  { name: "Evelyn Matthei", party: "UDI/Chile Vamos" },
  { name: "José Antonio Kast", party: "Republicano" },
  { name: "Johannes Kaiser", party: "PLN" },
  { name: "Franco Parisi", party: "Partido de la Gente" },
  { name: "Marco Enríquez-Ominami", party: "Independiente" },
  { name: "Harold Mayne-Nicholls", party: "Independiente" },
  { name: "Eduardo Artés", party: "Independiente/Humanista" },
] as const

export const FIRST_ROUND_DATE = new Date("2025-11-16T00:00:00-03:00")
export const SECOND_ROUND_DATE = new Date("2025-12-14T00:00:00-03:00")

export const TIME_UNITS = {
  DAY_MS: 1000 * 60 * 60 * 24,
  HOUR_MS: 1000 * 60 * 60,
  MINUTE_MS: 1000 * 60,
  SECOND_MS: 1000,
} as const

export const DARK_MODE_KEY = "cypher-dark-mode"
