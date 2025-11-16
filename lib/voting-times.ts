// Voting times for Chilean presidential elections
// Chile has multiple time zones, so voting closing times vary

// First round: November 16, 2025
// Voting hours: 8:00 AM - 6:00 PM (18:00) local time in each zone

// Chile time zones:
// - Continental (most of Chile): UTC-3 (summer time, Nov-Mar)
// - Easter Island (Isla de Pascua): UTC-5 (2 hours behind)
// - Juan Fernández: UTC-3

// Voting closes at 18:00 local time in each zone:
// - First mesa closes: 18:00 continental time (leftmost, westernmost)
// - Last mesa closes: 18:00 Easter Island time (rightmost, easternmost)

// Creating dates for both closing times

export const VOTING_OPEN_TIME = "08:00" // 8:00 AM
export const VOTING_CLOSE_TIME = "18:00" // 6:00 PM

// First round closing times (November 16, 2025)
// Continental Chile closes first
export const FIRST_MESA_CLOSING = new Date("2025-11-16T18:00:00-03:00") // Continental time (UTC-3)

// Easter Island (Isla de Pascua) closes last, 2 hours later in UTC time
// 18:00 Easter Island time = 20:00 Continental time
export const LAST_MESA_CLOSING = new Date("2025-11-16T18:00:00-05:00") // Easter Island time (UTC-5)

// For display: Calculate what time the last mesa closes in Chile's main timezone
// 18:00 UTC-5 = 20:00 UTC-3 (2 hours later)
export const LAST_MESA_CLOSING_CONTINENTAL_TIME = new Date(
  LAST_MESA_CLOSING.getTime() + 2 * 60 * 60 * 1000 // Add 2 hours
)

export interface VotingHoursLeft {
  hours: number
  minutes: number
  seconds: number
  totalHours: number
  isVotingOver: boolean
}

export const calculateVotingHoursLeft = (targetDate: Date = LAST_MESA_CLOSING): VotingHoursLeft => {
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()

  if (difference <= 0) {
    return {
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHours: 0,
      isVotingOver: true,
    }
  }

  const totalSeconds = Math.floor(difference / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const totalHours = difference / (1000 * 60 * 60)

  return {
    hours,
    minutes,
    seconds,
    totalHours: parseFloat(totalHours.toFixed(2)),
    isVotingOver: false,
  }
}

export const getVotingStatusMessage = (hoursLeft: VotingHoursLeft): string => {
  if (hoursLeft.isVotingOver) {
    return "Las urnas han cerrado en todo Chile"
  }

  if (hoursLeft.totalHours < 1) {
    return `${hoursLeft.minutes}m ${hoursLeft.seconds}s hasta el cierre de la última mesa`
  }

  return `${hoursLeft.hours}h ${hoursLeft.minutes}m hasta el cierre de la última mesa en Chile`
}

export const getVotingDetails = () => {
  return {
    date: "16 de noviembre de 2025",
    openTime: "08:00 (8:00 AM)",
    closeTime: "18:00 (6:00 PM) hora local",
    firstMesaCloses: "18:00 Zona Continental (UTC-3)",
    lastMesaCloses: "18:00 Isla de Pascua (UTC-5) = 20:00 Zona Continental",
    zones: [
      {
        name: "Zona Continental",
        timezone: "UTC-3",
        closeTime: "18:00",
        description: "La mayoría de Chile",
      },
      {
        name: "Isla de Pascua",
        timezone: "UTC-5",
        closeTime: "18:00 local (20:00 continental)",
        description: "Última mesa en cerrar",
      },
    ],
  }
}
