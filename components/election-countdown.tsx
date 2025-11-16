"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import ElectionTabs from "./election-tabs"
import Election2021 from "./election-2021"

export default function ElectionCountdown() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState<"2021" | "2025">("2025")

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const candidates = [
    { name: "Jeanette Jara", party: "Comunista/Frente Amplio", winner: null },
    { name: "Evelyn Matthei", party: "UDI/Chile Vamos", winner: null },
    { name: "José Antonio Kast", party: "Republicano", winner: null },
    { name: "Johannes Kaiser", party: "PLN", winner: null },
    { name: "Franco Parisi", party: "Partido de la Gente", winner: null },
    { name: "Marco Enríquez-Ominami", party: "Independiente", winner: null },
    { name: "Harold Mayne-Nicholls", party: "Independiente", winner: null },
    { name: "Eduardo Artés", party: "Independiente/Humanista", winner: null },
  ]

  useEffect(() => {
    const firstRoundDate = new Date("2025-11-16T00:00:00-03:00")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = firstRoundDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-950 to-red-950"
          : "bg-gradient-to-br from-[#0039A6] via-blue-600 to-[#D52B1E]"
      }`}
    >
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1
              className={`text-3xl md:text-5xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-white"
              }`}
            >
              Elecciones Presidenciales Chile
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                  : "bg-white/20 hover:bg-white/30 text-white"
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navigation Tabs */}
          <ElectionTabs
            isDarkMode={isDarkMode}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto">
          {activeTab === "2025" ? (
            <div
              className={`backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/90 border border-gray-700"
                  : "bg-white/10 border-2 border-white/20"
              }`}
            >
              {/* 2025 Content */}
              <div className="text-center mb-8">
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-3 text-balance transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-white"
                  }`}
                >
                  Elección Presidencial 2025 - Primera Vuelta
                </h2>
                <p
                  className={`text-lg transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-white/80"
                  }`}
                >
                  16 de noviembre de 2025
                </p>
              </div>

              {/* Countdown */}
              <div
                className={`rounded-2xl p-8 md:p-12 mb-8 border-2 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-900/50 border-[#0039A6]/30"
                    : "bg-white/5 border-[#D52B1E]/30"
                }`}
              >
                <h3
                  className={`text-2xl md:text-3xl font-bold mb-8 text-center transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-white"
                  }`}
                >
                  Cuenta Regresiva
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { value: timeLeft.days, label: "Días" },
                    { value: timeLeft.hours, label: "Horas" },
                    { value: timeLeft.minutes, label: "Minutos" },
                    { value: timeLeft.seconds, label: "Segundos" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`rounded-xl p-4 md:p-6 text-center backdrop-blur-sm transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-[#0039A6]/20 border border-[#0039A6]/40"
                          : "bg-white/10"
                      }`}
                    >
                      <div
                        className={`text-5xl md:text-6xl font-bold mb-2 transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        {item.value}
                      </div>
                      <div
                        className={`text-sm md:text-lg uppercase tracking-wider transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-white/70"
                        }`}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidates */}
              <div className="mb-8">
                <h3
                  className={`text-xl font-semibold mb-4 text-center transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-white"
                  }`}
                >
                  Candidatos Primera Vuelta (8 Candidatos)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {candidates.map((candidate, index) => (
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
                        className={`text-xs mt-2 ${
                          isDarkMode ? "text-gray-300" : "text-white/80"
                        }`}
                      >
                        {candidate.party}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div
                  className={`rounded-xl p-4 transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-900/50 border border-gray-700"
                      : "bg-white/5"
                  }`}
                >
                  <h4
                    className={`text-sm font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white/90"
                    }`}
                  >
                    <span>🗳️</span>
                    Fechas Importantes
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        Primera Vuelta
                      </span>
                      <span
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        16 nov 2025
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        Segunda Vuelta
                      </span>
                      <span
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        14 dic 2025
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-xl p-4 transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-900/50 border border-gray-700"
                      : "bg-white/5"
                  }`}
                >
                  <h4
                    className={`text-sm font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white/90"
                    }`}
                  >
                    <span>📅</span>
                    Período Presidencial
                  </h4>
                  <div className="text-xs space-y-2">
                    <div>
                      <p
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        Inicio
                      </p>
                      <p
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        11 marzo 2026
                      </p>
                    </div>
                    <div>
                      <p
                        className={`transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        Término
                      </p>
                      <p
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        11 marzo 2030
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`rounded-xl p-4 transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-gray-900/50 border border-gray-700"
                      : "bg-white/5"
                  }`}
                >
                  <h4
                    className={`text-sm font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white/90"
                    }`}
                  >
                    <span>ℹ️</span>
                    Información
                  </h4>
                  <div
                    className={`space-y-1 text-xs transition-colors duration-300 ${
                      isDarkMode ? "text-gray-300" : "text-white/80"
                    }`}
                  >
                    <p>
                      <strong>Tipo:</strong> Presidencial
                    </p>
                    <p>
                      <strong>Nivel:</strong> Nacional
                    </p>
                    <p>
                      <strong>Duración:</strong> 4 años
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/90 border border-gray-700"
                  : "bg-white/10 border-2 border-white/20"
              }`}
            >
              <Election2021 isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
