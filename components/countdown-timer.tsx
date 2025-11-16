"use client"

import { memo } from "react"
import type { TimeLeft } from "@/lib/helpers"

interface CountdownTimerProps {
  timeLeft: TimeLeft
  isDarkMode: boolean
}

const CountdownTimer = memo(function CountdownTimer({
  timeLeft,
  isDarkMode,
}: CountdownTimerProps) {
  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ]

  return (
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
        {timeUnits.map((item, index) => (
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
  )
})

export default CountdownTimer
