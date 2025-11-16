"use client"

import { memo } from "react"
import { CANDIDATES_2025 } from "@/lib/constants"

interface CandidatesGridProps {
  isDarkMode: boolean
}

const CandidatesGrid = memo(function CandidatesGrid({ isDarkMode }: CandidatesGridProps) {
  return (
    <div className="mb-8">
      <h3
        className={`text-xl font-semibold mb-4 text-center transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-white"
        }`}
      >
        Candidatos Primera Vuelta ({CANDIDATES_2025.length} Candidatos)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {CANDIDATES_2025.map((candidate, index) => (
          <div
            key={index}
            className={`px-4 py-4 rounded-lg text-sm font-medium shadow-lg transition-all duration-300 text-center ${
              isDarkMode
                ? "bg-gray-700 text-white border border-gray-600 hover:bg-gray-600"
                : "bg-black/30 text-white border border-white/20 hover:bg-black/40"
            }`}
          >
            <div className="font-semibold">{candidate.name}</div>
            <div
              className={`text-xs mt-2 ${isDarkMode ? "text-gray-300" : "text-white/80"}`}
            >
              {candidate.party}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default CandidatesGrid
