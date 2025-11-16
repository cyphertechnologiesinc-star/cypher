"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from 'lucide-react'

export default function ElectionCountdown() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const candidates = [
    { name: "Evelyn Matthei", winner: null },
    { name: "Michelle Bachelet", winner: null },
    { name: "Rodolfo Carter", winner: null },
    { name: "Johannes Kaiser", winner: null },
    { name: "Franco Parisi", winner: null }
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
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 via-blue-950 to-red-950" 
        : "bg-gradient-to-br from-[#0039A6] via-blue-600 to-[#D52B1E]"
    }`}>
      <div className={`max-w-5xl w-full backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transition-colors duration-300 ${
        isDarkMode 
          ? "bg-gray-800/90 border border-gray-700" 
          : "bg-white/10 border-2 border-white/20"
      }`}>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400" 
                : "bg-white/20 hover:bg-white/30 text-white"
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className="text-center mb-6">
          <h1 className={`text-3xl md:text-4xl font-bold mb-3 text-balance transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          }`}>
            Elección Presidencial de Chile 2025
          </h1>
          <div className={`flex items-center justify-center gap-4 text-sm transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-white/80"
          }`}>
            <span>← 2021</span>
            <span>•</span>
            <span>2025</span>
            <span>•</span>
            <span>2029 →</span>
          </div>
        </div>

        <div className={`rounded-2xl p-8 md:p-12 mb-8 border-2 transition-colors duration-300 ${
          isDarkMode 
            ? "bg-gray-900/50 border-[#0039A6]/30" 
            : "bg-white/5 border-[#D52B1E]/30"
        }`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          }`}>
            Cuenta Regresiva - Primera Vuelta
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: timeLeft.days, label: "Días" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Minutos" },
              { value: timeLeft.seconds, label: "Segundos" }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-6 text-center backdrop-blur-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-[#0039A6]/20 border border-[#0039A6]/40" 
                    : "bg-white/10"
                }`}
              >
                <div className={`text-6xl md:text-7xl font-bold mb-3 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-white"
                }`}>
                  {item.value}
                </div>
                <div className={`text-lg uppercase tracking-wider transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-white/70"
                }`}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-3 text-center transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          }`}>
            Candidatos
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {candidates.map((candidate, index) => (
              <span
                key={index}
                className={`px-3 py-1.5 rounded-full text-sm font-medium shadow-lg transition-all duration-300 ${
                  candidate.winner === "first-round"
                    ? "bg-green-600 text-white ring-4 ring-green-400/50"
                    : candidate.winner === "second-round"
                    ? isDarkMode 
                      ? "bg-[#0039A6] text-white ring-4 ring-[#0039A6]/50"
                      : "bg-[#D52B1E] text-white ring-4 ring-[#D52B1E]/50"
                    : isDarkMode
                    ? "bg-gray-700 text-white border border-gray-600"
                    : "bg-black text-white"
                }`}
              >
                {candidate.name}
                {candidate.winner === "first-round" && " 🏆"}
                {candidate.winner === "second-round" && " 👑"}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className={`rounded-xl p-4 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900/50 border border-gray-700" : "bg-white/5"
          }`}>
            <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white/90"
            }`}>
              <span>🗳️</span>
              Fechas Importantes
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex flex-col gap-1">
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-white/70"
                }`}>Primera Vuelta</span>
                <span className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-white"
                }`}>16 nov 2025</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`transition-colors duration-300 ${
                  isDarkMode ? "text-gray-400" : "text-white/70"
                }`}>Segunda Vuelta</span>
                <span className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-white"
                }`}>14 dic 2025</span>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-4 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900/50 border border-gray-700" : "bg-white/5"
          }`}>
            <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white/90"
            }`}>
              <span>📅</span>
              Período Presidencial
            </h3>
            <div className="text-xs">
              <p className={`mb-1 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-white/70"
              }`}>Inicio</p>
              <p className={`font-semibold mb-2 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-white"
              }`}>11 marzo 2026</p>
              <p className={`mb-1 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-white/70"
              }`}>Término</p>
              <p className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-white"
              }`}>11 marzo 2030</p>
            </div>
          </div>

          <div className={`rounded-xl p-4 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-900/50 border border-gray-700" : "bg-white/5"
          }`}>
            <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white/90"
            }`}>
              <span>ℹ️</span>
              Información
            </h3>
            <div className={`space-y-1 text-xs transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-white/80"
            }`}>
              <p><strong>Tipo:</strong> Presidencial</p>
              <p><strong>Nivel:</strong> Nacional</p>
              <p><strong>Duración:</strong> 4 años</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
