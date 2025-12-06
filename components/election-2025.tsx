"use client"

import { memo, useState } from "react"
import CountdownNike from "./countdown-nike"

interface Election2025Props {
  isDarkMode: boolean
}

const Election2025 = memo(function Election2025({ isDarkMode }: Election2025Props) {
  const [showSecondRound, setShowSecondRound] = useState(true)

  const firstRoundCandidates = [
    { rank: 1, name: "Jeannette Jara Román", party: "Comunista/Frente Amplio", votes: 3_446_854, percentage: 26.75 },
    { rank: 2, name: "José Antonio Kast Rist", party: "Republicano", votes: 3_086_963, percentage: 23.96 },
    { rank: 3, name: "Franco Parisi Fernández", party: "Partido de la Gente", votes: 1_534_310, percentage: 19.05 },
    { rank: 4, name: "Johannes Kaiser", party: "PLN", votes: 1_122_799, percentage: 13.94 },
    { rank: 5, name: "Evelyn Matthei Fornet", party: "UDI/Chile Vamos", votes: 1_050_521, percentage: 13.04 },
  ]

  const secondRoundCandidates = [
    { name: "Jeannette Jara Román", party: "Comunista/Frente Amplio", votes: 0, percentage: 0, winner: false },
    { name: "José Antonio Kast Rist", party: "Republicano", votes: 0, percentage: 0, winner: false },
  ]

  return (
    <div className="space-y-8">
      {!showSecondRound ? (
        // First Round View
        <div>
          <div className="text-center mb-12">
            <p className={`text-sm font-light tracking-widest mb-3 transition-colors duration-300 ${
              isDarkMode ? "text-gray-500" : "text-white/60"
            }`}>
              PRIMERA VUELTA
            </p>
            <h2 className={`text-5xl md:text-7xl font-bold mb-4 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}>
              16 de Noviembre 2025
            </h2>
          </div>

          <div className="space-y-4">
            {firstRoundCandidates.map((candidate) => (
              <div
                key={candidate.name}
                className={`p-6 md:p-8 rounded-lg transition-all duration-300 ${
                  candidate.rank <= 2
                    ? isDarkMode
                      ? "bg-gradient-to-r from-blue-900/40 to-blue-800/30"
                      : "bg-gradient-to-r from-blue-500/20 to-blue-400/10"
                    : isDarkMode
                    ? "bg-gray-800/20"
                    : "bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className={`text-2xl font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white"
                    }`}>
                      {candidate.name}
                    </p>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-white/70"
                    }`}>
                      {candidate.party}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-3xl font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white"
                    }`}>
                      {candidate.percentage}%
                    </p>
                    <p className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? "text-gray-500" : "text-white/60"
                    }`}>
                      {candidate.votes.toLocaleString("es-CL")} votos
                    </p>
                  </div>
                </div>
                <div className={`w-full h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700/50" : "bg-white/10"
                }`}>
                  <div
                    className={`h-full transition-all duration-300 ${
                      candidate.rank <= 2
                        ? "bg-white"
                        : isDarkMode
                        ? "bg-gray-600"
                        : "bg-white/50"
                    }`}
                    style={{ width: `${candidate.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Second Round View - Large Countdown
        <div>
          <CountdownNike isDarkMode={isDarkMode} />

          <div className="mt-12 space-y-6">
            {secondRoundCandidates.map((candidate) => (
              <div
                key={candidate.name}
                className={`p-8 md:p-10 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/30 border border-gray-700"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white"
                    }`}>
                      {candidate.name}
                    </p>
                    <p className={`text-base transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-white/70"
                    }`}>
                      {candidate.party}
                    </p>
                  </div>
                  <div className={`px-6 py-3 rounded-lg transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-yellow-900/20 border border-yellow-600/50"
                      : "bg-yellow-500/20 border border-yellow-400/50"
                  }`}>
                    <p className={`text-sm font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-yellow-300" : "text-yellow-100"
                    }`}>
                      ESPERANDO RESULTADOS
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Buttons */}
      <div className="flex gap-4 justify-center mt-12 pt-8 border-t border-white/10">
        <button
          onClick={() => setShowSecondRound(false)}
          className={`px-8 py-3 font-semibold transition-all duration-300 ${
            !showSecondRound
              ? isDarkMode
                ? "text-white border-b-2 border-white"
                : "text-white border-b-2 border-white"
              : isDarkMode
              ? "text-gray-500 hover:text-gray-300"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          Primera Vuelta
        </button>
        <button
          onClick={() => setShowSecondRound(true)}
          className={`px-8 py-3 font-semibold transition-all duration-300 ${
            showSecondRound
              ? isDarkMode
                ? "text-white border-b-2 border-white"
                : "text-white border-b-2 border-white"
              : isDarkMode
              ? "text-gray-500 hover:text-gray-300"
              : "text-white/50 hover:text-white/70"
          }`}
        >
          Segunda Vuelta
        </button>
      </div>
    </div>
  )
})

export default Election2025
