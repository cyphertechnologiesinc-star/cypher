// Voting results data structure and helpers
export interface CandidateResult {
  name: string
  party: string
  votes: number
  percentage: number
  color: string
}

export interface VotingStats {
  totalVotes: number
  percentageProcessed: number
  lastUpdated: Date
  candidates: CandidateResult[]
}

// Initial placeholder data - will be replaced with real SERVEL data
export const getVotingResults = (): VotingStats => {
  return {
    totalVotes: 0,
    percentageProcessed: 0,
    lastUpdated: new Date(),
    candidates: [
      {
        name: "Pendiente",
        party: "Aguardando conteo oficial",
        votes: 0,
        percentage: 0,
        color: "bg-blue-500",
      },
    ],
  }
}

// Format large numbers for display
export const formatVotes = (votes: number): string => {
  if (votes >= 1000000) {
    return (votes / 1000000).toFixed(1) + "M"
  }
  if (votes >= 1000) {
    return (votes / 1000).toFixed(1) + "K"
  }
  return votes.toString()
}

// Get candidate color based on party (Chilean political colors)
export const getCandidateColor = (index: number): string => {
  const colors = [
    "bg-blue-600",    // Centro
    "bg-red-600",     // Derecha
    "bg-green-600",   // Izquierda
    "bg-yellow-600",  // Centro-derecha
    "bg-purple-600",  // Izquierda progresista
    "bg-cyan-600",    // Independiente
    "bg-orange-600",  // Otro
    "bg-indigo-600",  // Otro
  ]
  return colors[index % colors.length]
}
