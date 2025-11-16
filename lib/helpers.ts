import { TIME_UNITS } from "./constants"

// Timer calculation helper
export interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export const calculateTimeLeft = (targetDate: Date): TimeLeft => {
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / TIME_UNITS.DAY_MS),
    hours: Math.floor((difference / TIME_UNITS.HOUR_MS) % 24),
    minutes: Math.floor((difference / TIME_UNITS.MINUTE_MS) % 60),
    seconds: Math.floor((difference / TIME_UNITS.SECOND_MS) % 60),
  }
}

// Class name builder helper
export const buildClassNames = (
  base: string,
  isDark: boolean,
  darkClass: string,
  lightClass: string
): string => {
  return `${base} ${isDark ? darkClass : lightClass}`
}

// Format large numbers
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("es-CL").format(num)
}

// Percentage formatter
export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`
}

// Dark mode persistence
export const getDarkMode = (): boolean => {
  if (typeof window === "undefined") return false

  const stored = localStorage.getItem("cypher-dark-mode")
  if (stored) return stored === "true"

  // Check system preference
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export const setDarkMode = (isDark: boolean): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cypher-dark-mode", String(isDark))
  }
}

// Check if election is passed
export const isElectionPassed = (date: Date): boolean => {
  return new Date() >= date
}
