"use client"

import { memo, useState } from "react"
import { ChevronRight } from "lucide-react"

interface Election2021Props {
  isDarkMode: boolean
}

const Election2021 = memo(function Election2021({ isDarkMode }: Election2021Props) {
  const [showSecondRound, setShowSecondRound] = useState(false)

  const firstRoundCandidates = [
    { rank: 1, name: "José Antonio Kast", party: "Republicano", votes: 3_273_505, percentage: 27.91 },
    { rank: 2, name: "Gabriel Boric Font", party: "Convergencia Social", votes: 3_003_633, percentage: 25.82 },
    { rank: 3, name: "Franco Parisi", party: "Partido de la Gente", votes: 1_485_889, percentage: 12.81 },
    { rank: 4, name: "Yasna Provoste", party: "DC/Socialista", votes: 1_385_345, percentage: 11.96 },
    { rank: 5, name: "Sebastián Sichel", party: "Independiente/Chile Vamos", votes: 995_806, percentage: 8.59 },
  ]

  const secondRoundCandidates = [
    { name: "Gabriel Boric Font", party: "Convergencia Social", votes: 4_621_231, percentage: 55.87, winner: true },
    { name: "José Antonio Kast", party: "Republicano", votes: 3_650_662, percentage: 44.14, winner: false },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          }`}
        >
          Elecciones Presidenciales Chile 2021
        </h2>
        <div
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            isDarkMode
              ? "bg-green-600/20 text-green-300 border border-green-600/50"
              : "bg-green-500/20 text-green-100 border border-green-500/50"
          }`}
        >
          ✓ Elección Completada
        </div>
      </div>

      {/* Round Selector */}
      <div className="flex gap-3 justify-center mb-6">
        <button
          onClick={() => setShowSecondRound(false)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            !showSecondRound
              ? isDarkMode
                ? "bg-blue-600/30 border-2 border-blue-500 text-blue-100"
                : "bg-blue-500/20 border-2 border-blue-400 text-blue-100"
              : isDarkMode
              ? "bg-gray-700/30 border-2 border-gray-600 text-gray-400"
              : "bg-white/10 border-2 border-white/20 text-white/70"
          }`}
        >
          Primera Vuelta - 21 Nov 2021
        </button>
        <button
          onClick={() => setShowSecondRound(true)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            showSecondRound
              ? isDarkMode
                ? "bg-green-600/30 border-2 border-green-500 text-green-100"
                : "bg-green-500/20 border-2 border-green-400 text-green-100"
              : isDarkMode
              ? "bg-gray-700/30 border-2 border-gray-600 text-gray-400"
              : "bg-white/10 border-2 border-white/20 text-white/70"
          }`}
        >
          Segunda Vuelta - 19 Dic 2021
        </button>
      </div>

      {/* Results */}
      {!showSecondRound ? (
        <div
          className={`rounded-2xl p-8 md:p-12 border-2 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-900/50 border-blue-500/30"
              : "bg-white/5 border-blue-400/30"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            Resultados Primera Vuelta
          </h3>
          <div className="space-y-4">
            {firstRoundCandidates.map((candidate, index) => {
              const isWinner = index < 2
              return (
                <div
                  key={candidate.name}
                  className={`rounded-xl p-6 transition-all duration-300 ${
                    isWinner
                      ? isDarkMode
                        ? "bg-gradient-to-r from-blue-900/40 to-blue-800/30 border-l-4 border-blue-500"
                        : "bg-gradient-to-r from-blue-500/20 to-blue-400/10 border-l-4 border-blue-400"
                      : isDarkMode
                      ? "bg-gray-800/30 border-l-4 border-gray-600"
                      : "bg-white/5 border-l-4 border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div
                        className={`text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-300 ${
                          isWinner
                            ? isDarkMode
                              ? "bg-blue-600/50 text-blue-200"
                              : "bg-blue-500/30 text-blue-100"
                            : isDarkMode
                            ? "bg-gray-700/50 text-gray-300"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        #{candidate.rank}
                      </div>
                      <div>
                        <div
                          className={`text-lg font-semibold transition-colors duration-300 ${
                            isDarkMode ? "text-white" : "text-white"
                          }`}
                        >
                          {candidate.name}
                        </div>
                        <div
                          className={`text-sm transition-colors duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-white/70"
                          }`}
                        >
                          {candidate.party}
                        </div>
                      </div>
                    </div>
                    {index < 2 && (
                      <div
                        className={`text-lg font-bold transition-colors duration-300 ${
                          isDarkMode ? "text-blue-300" : "text-blue-200"
                        }`}
                      >
                        Pasa a segunda vuelta ✓
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div
                        className={`w-full h-3 rounded-full overflow-hidden transition-colors duration-300 ${
                          isDarkMode ? "bg-gray-700/50" : "bg-white/10"
                        }`}
                      >
                        <div
                          className={`h-full bg-gradient-to-r transition-all duration-300 ${
                            isWinner
                              ? "from-blue-600 to-blue-500"
                              : "from-gray-600 to-gray-500"
                          }`}
                          style={{ width: `${candidate.percentage}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-xl font-bold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        {candidate.percentage.toFixed(2)}%
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        {candidate.votes.toLocaleString("es-CL")} votos
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl p-8 md:p-12 border-2 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-900/50 border-green-500/30"
              : "bg-white/5 border-green-400/30"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            Resultados Segunda Vuelta
          </h3>
          <div className="space-y-6">
            {secondRoundCandidates.map((candidate) => (
              <div
                key={candidate.name}
                className={`rounded-xl p-8 transition-all duration-300 ${
                  candidate.winner
                    ? isDarkMode
                      ? "bg-gradient-to-r from-green-900/50 to-green-800/40 border-2 border-green-500 ring-2 ring-green-500/30"
                      : "bg-gradient-to-r from-green-500/30 to-green-400/20 border-2 border-green-400 ring-2 ring-green-400/30"
                    : isDarkMode
                    ? "bg-gradient-to-r from-red-900/30 to-red-800/20 border-2 border-red-500/50"
                    : "bg-gradient-to-r from-red-500/20 to-red-400/10 border-2 border-red-400/50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div
                      className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-white"
                      }`}
                    >
                      {candidate.name}
                      {candidate.winner && " 👑"}
                    </div>
                    <div
                      className={`text-lg transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-white/70"
                      }`}
                    >
                      {candidate.party}
                    </div>
                  </div>
                  {candidate.winner && (
                    <div
                      className={`text-center px-6 py-4 rounded-lg transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-green-600/30 border border-green-500"
                          : "bg-green-500/30 border border-green-400"
                      }`}
                    >
                      <div
                        className={`text-lg font-bold transition-colors duration-300 ${
                          isDarkMode ? "text-green-300" : "text-green-100"
                        }`}
                      >
                        PRESIDENTE ELECTO
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div
                      className={`w-full h-4 rounded-lg overflow-hidden transition-colors duration-300 ${
                        isDarkMode ? "bg-gray-700/50" : "bg-white/10"
                      }`}
                    >
                      <div
                        className={`h-full transition-all duration-300 ${
                          candidate.winner
                            ? "bg-gradient-to-r from-green-600 to-green-500"
                            : "bg-gradient-to-r from-red-600 to-red-500"
                        }`}
                        style={{ width: `${candidate.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right min-w-fit">
                    <div
                      className={`text-3xl font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-white"
                      }`}
                    >
                      {candidate.percentage.toFixed(2)}%
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-white/70"
                      }`}
                    >
                      {candidate.votes.toLocaleString("es-CL")} votos
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`mt-8 p-4 rounded-lg text-center transition-colors duration-300 ${
              isDarkMode
                ? "bg-green-900/20 border border-green-600/50"
                : "bg-green-500/20 border border-green-400/50"
            }`}
          >
            <p
              className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-green-300" : "text-green-100"
              }`}
            >
              Total de votos emitidos: 8,364,481 | Participación más alta en la historia de Chile
            </p>
          </div>
        </div>
      )}
    </div>
  )
})

export default Election2021
