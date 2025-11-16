"use client"

import { memo, useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"
import type { VotingStats } from "@/lib/voting-results"
import { getVotingResults, formatVotes } from "@/lib/voting-results"

interface VotingResultsProps {
  isDarkMode: boolean
}

const VotingResults = memo(function VotingResults({
  isDarkMode,
}: VotingResultsProps) {
  const [results, setResults] = useState<VotingStats | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Get initial voting results
    setResults(getVotingResults())
    setMounted(true)

    // Refresh results every 30 seconds
    const interval = setInterval(() => {
      setResults(getVotingResults())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  if (!mounted || !results) return null

  // Check if results are available
  const hasResults = results.totalVotes > 0
  const topCandidates = results.candidates.slice(0, 5)

  return (
    <div
      className={`rounded-lg p-4 md:p-6 border transition-colors duration-300 mb-6 ${
        isDarkMode
          ? "bg-gray-900/50 border-gray-700/50"
          : "bg-white/5 border-white/10"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        <h2
          className={`text-lg font-semibold transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white/90"
          }`}
        >
          Conteo de Votos
        </h2>
        {hasResults && (
          <span
            className={`text-sm ml-auto transition-colors duration-300 ${
              isDarkMode ? "text-gray-500" : "text-white/50"
            }`}
          >
            {results.percentageProcessed}% escrutado
          </span>
        )}
      </div>

      {/* Results Grid or Loading State */}
      {!hasResults ? (
        <div
          className={`text-center py-8 rounded-lg ${
            isDarkMode ? "bg-gray-800/30" : "bg-white/5"
          }`}
        >
          <p
            className={`text-sm transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-white/60"
            }`}
          >
            Aguardando conteo oficial de SERVEL...
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {topCandidates.map((candidate, idx) => (
            <div key={idx} className="space-y-1">
              {/* Candidate Info */}
              <div className="flex justify-between items-baseline gap-2">
                <div className="flex-1">
                  <p
                    className={`text-sm font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white"
                    }`}
                  >
                    {candidate.name}
                  </p>
                  <p
                    className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? "text-gray-500" : "text-white/50"
                    }`}
                  >
                    {candidate.party}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-blue-400" : "text-blue-300"
                    }`}
                  >
                    {candidate.percentage.toFixed(1)}%
                  </p>
                  <p
                    className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? "text-gray-500" : "text-white/50"
                    }`}
                  >
                    {formatVotes(candidate.votes)} votos
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className={`h-2 rounded-full overflow-hidden ${
                  isDarkMode ? "bg-gray-700/50" : "bg-white/10"
                }`}
              >
                <div
                  className={`h-full ${candidate.color} transition-all duration-500`}
                  style={{ width: `${candidate.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {hasResults && (
        <div
          className={`mt-4 pt-4 border-t transition-colors duration-300 ${
            isDarkMode ? "border-gray-700/50" : "border-white/10"
          }`}
        >
          <div className="flex justify-between items-center text-xs">
            <p
              className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-white/50"
              }`}
            >
              Total: {formatVotes(results.totalVotes)} votos
            </p>
            <p
              className={`transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-white/50"
              }`}
            >
              Actualizado: {results.lastUpdated.toLocaleTimeString("es-CL")}
            </p>
          </div>
        </div>
      )}
    </div>
  )
})

export default VotingResults
