"use client"

import { memo, useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { calculateTimeLeft, isElectionPassed } from "@/lib/helpers"
import { SECOND_ROUND_DATE } from "@/lib/constants"
import type { TimeLeft } from "@/lib/helpers"

interface Election2025Props {
  isDarkMode: boolean
}

const Election2025 = memo(function Election2025({ isDarkMode }: Election2025Props) {
  const [showSecondRound, setShowSecondRound] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [electionPassed, setElectionPassed] = useState(false)

  // Timer effect for countdown
  useEffect(() => {
    const calculateAndUpdate = () => {
      const time = calculateTimeLeft(SECOND_ROUND_DATE)
      setTimeLeft(time)
      setElectionPassed(isElectionPassed(SECOND_ROUND_DATE))
    }

    calculateAndUpdate() // Initial calculation
    const timer = setInterval(calculateAndUpdate, 1000)

    return () => clearInterval(timer)
  }, [])

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
      {/* Header */}
      <div className="text-center mb-8">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          }`}
        >
          Elecciones Presidenciales Chile 2025
        </h2>
        <div
          className={`inline-block px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
            showSecondRound
              ? isDarkMode
                ? "bg-yellow-600/20 text-yellow-300 border border-yellow-600/50"
                : "bg-yellow-500/20 text-yellow-100 border border-yellow-500/50"
              : isDarkMode
              ? "bg-blue-600/20 text-blue-300 border border-blue-600/50"
              : "bg-blue-500/20 text-blue-100 border border-blue-500/50"
          }`}
        >
          {showSecondRound ? "⏳ Segunda Vuelta En Curso (14 Dic)" : "✓ Primera Vuelta Completada"}
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
          Primera Vuelta - 16 Nov 2025
        </button>
        <button
          onClick={() => setShowSecondRound(true)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
            showSecondRound
              ? isDarkMode
                ? "bg-yellow-600/30 border-2 border-yellow-500 text-yellow-100"
                : "bg-yellow-500/20 border-2 border-yellow-400 text-yellow-100"
              : isDarkMode
              ? "bg-gray-700/30 border-2 border-gray-600 text-gray-400"
              : "bg-white/10 border-2 border-white/20 text-white/70"
          }`}
        >
          Segunda Vuelta - 14 Dic 2025
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
          <div
            className={`mt-8 p-4 rounded-lg text-center transition-colors duration-300 ${
              isDarkMode
                ? "bg-blue-900/20 border border-blue-600/50"
                : "bg-blue-500/20 border border-blue-400/50"
            }`}
          >
            <p
              className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-blue-300" : "text-blue-100"
              }`}
            >
              Total de votos válidos: 13,086,447 | Mesas escrutadas: 46,897 de 46,900 (99.99%)
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl p-8 md:p-12 border-2 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-900/50 border-yellow-500/30"
              : "bg-white/5 border-yellow-400/30"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-8 text-center transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            Segunda Vuelta - Balotaje 14 de Diciembre
          </h3>

          {/* Countdown Timer */}
          {!electionPassed && (
            <div
              className={`rounded-xl p-6 md:p-8 mb-8 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-yellow-900/20 border-2 border-yellow-600/50"
                  : "bg-yellow-500/20 border-2 border-yellow-400/50"
              }`}
            >
              <div className="text-center mb-4">
                <p
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-yellow-300" : "text-yellow-100"
                  }`}
                >
                  ⏳ TIEMPO RESTANTE PARA LA ELECCIÓN
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: "Días", value: timeLeft.days },
                  { label: "Horas", value: timeLeft.hours },
                  { label: "Minutos", value: timeLeft.minutes },
                  { label: "Segundos", value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="text-center">
                    <div
                      className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 ${
                        isDarkMode ? "text-yellow-300" : "text-yellow-100"
                      }`}
                    >
                      {String(unit.value).padStart(2, "0")}
                    </div>
                    <div
                      className={`text-xs md:text-sm font-semibold transition-colors duration-300 ${
                        isDarkMode ? "text-yellow-400/70" : "text-yellow-200/70"
                      }`}
                    >
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {electionPassed && (
            <div
              className={`rounded-xl p-6 md:p-8 mb-8 text-center transition-colors duration-300 ${
                isDarkMode
                  ? "bg-green-900/20 border-2 border-green-600/50"
                  : "bg-green-500/20 border-2 border-green-400/50"
              }`}
            >
              <p
                className={`text-lg font-bold transition-colors duration-300 ${
                  isDarkMode ? "text-green-300" : "text-green-100"
                }`}
              >
                ✓ Elección completada
              </p>
            </div>
          )}

          <div className="space-y-6">
            {secondRoundCandidates.map((candidate) => (
              <div
                key={candidate.name}
                className={`rounded-xl p-8 transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800/30 border-2 border-gray-600"
                    : "bg-white/5 border-2 border-white/20"
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
                    </div>
                    <div
                      className={`text-lg transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-white/70"
                      }`}
                    >
                      {candidate.party}
                    </div>
                  </div>
                  <div
                    className={`text-center px-6 py-4 rounded-lg transition-colors duration-300 ${
                      isDarkMode
                        ? "bg-yellow-900/20 border border-yellow-600/50"
                        : "bg-yellow-500/20 border border-yellow-400/50"
                    }`}
                  >
                    <div
                      className={`text-sm font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-yellow-300" : "text-yellow-100"
                      }`}
                    >
                      ESPERANDO RESULTADOS
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div
                      className={`w-full h-4 rounded-lg overflow-hidden transition-colors duration-300 ${
                        isDarkMode ? "bg-gray-700/50" : "bg-white/10"
                      }`}
                    >
                      <div
                        className="h-full bg-gradient-to-r from-gray-600 to-gray-500 transition-all duration-300"
                        style={{ width: `${candidate.percentage || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right min-w-fit">
                    <div
                      className={`text-3xl font-bold transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-white"
                      }`}
                    >
                      --%
                    </div>
                    <div
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-white/70"
                      }`}
                    >
                      Votos por registrar
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`mt-8 p-4 rounded-lg text-center transition-colors duration-300 ${
              isDarkMode
                ? "bg-yellow-900/20 border border-yellow-600/50"
                : "bg-yellow-500/20 border border-yellow-400/50"
            }`}
          >
            <p
              className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-yellow-300" : "text-yellow-100"
              }`}
            >
              Balotaje programado: Domingo 14 de diciembre de 2025
            </p>
          </div>
        </div>
      )}
    </div>
  )
})

export default Election2025
