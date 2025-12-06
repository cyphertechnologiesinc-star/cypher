"use client"

import { memo, useEffect, useState } from "react"
import { calculateTimeLeft, isElectionPassed } from "@/lib/helpers"
import { SECOND_ROUND_DATE } from "@/lib/constants"
import type { TimeLeft } from "@/lib/helpers"

interface CountdownNikeProps {
  isDarkMode: boolean
}

const CountdownNike = memo(function CountdownNike({ isDarkMode }: CountdownNikeProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [electionPassed, setElectionPassed] = useState(false)

  useEffect(() => {
    const calculateAndUpdate = () => {
      const time = calculateTimeLeft(SECOND_ROUND_DATE)
      setTimeLeft(time)
      setElectionPassed(isElectionPassed(SECOND_ROUND_DATE))
    }

    calculateAndUpdate()
    const timer = setInterval(calculateAndUpdate, 1000)
    return () => clearInterval(timer)
  }, [])

  if (electionPassed) {
    return (
      <div className="text-center py-24 md:py-32">
        <h2 className={`text-6xl md:text-8xl font-bold mb-8 transition-colors duration-300 ${
          isDarkMode ? "text-white" : "text-white"
        }`}>
          Elección Completada
        </h2>
        <p className={`text-xl md:text-2xl transition-colors duration-300 ${
          isDarkMode ? "text-gray-400" : "text-white/80"
        }`}>
          Gracias por participar en las elecciones presidenciales 2025
        </p>
      </div>
    )
  }

  return (
    <div className="text-center py-16 md:py-24">
      <p className={`text-base md:text-lg font-light tracking-widest mb-6 transition-colors duration-300 ${
        isDarkMode ? "text-gray-500" : "text-white/60"
      }`}>
        SEGUNDA VUELTA PRESIDENCIAL
      </p>

      <h2 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-12 transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-white"
      }`}>
        BALOTAJE 2025
      </h2>

      {/* Large Countdown Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 max-w-5xl mx-auto">
        {[
          { label: "DÍAS", value: timeLeft.days },
          { label: "HORAS", value: timeLeft.hours },
          { label: "MINUTOS", value: timeLeft.minutes },
          { label: "SEGUNDOS", value: timeLeft.seconds },
        ].map((unit) => (
          <div key={unit.label} className="flex flex-col items-center gap-2 md:gap-4">
            <div
              className={`text-6xl md:text-8xl lg:text-9xl font-black font-mono transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-white"
              }`}
              style={{
                textShadow: isDarkMode
                  ? "0 4px 20px rgba(255, 255, 255, 0.1)"
                  : "0 4px 20px rgba(255, 255, 255, 0.15)"
              }}
            >
              {String(unit.value).padStart(2, "0")}
            </div>
            <span
              className={`text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-white/60"
              }`}
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <p className={`text-lg md:text-xl font-light tracking-wide transition-colors duration-300 ${
        isDarkMode ? "text-gray-400" : "text-white/70"
      }`}>
        Domingo 14 de Diciembre de 2025
      </p>
    </div>
  )
})

export default CountdownNike
