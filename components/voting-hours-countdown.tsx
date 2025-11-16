"use client"

import { memo, useEffect, useState } from "react"
import { Clock } from "lucide-react"
import {
  calculateVotingHoursLeft,
  getVotingStatusMessage,
  LAST_MESA_CLOSING,
  getVotingDetails,
} from "@/lib/voting-times"
import type { VotingHoursLeft } from "@/lib/voting-times"

interface VotingHoursCountdownProps {
  isDarkMode: boolean
}

const VotingHoursCountdown = memo(function VotingHoursCountdown({
  isDarkMode,
}: VotingHoursCountdownProps) {
  const [hoursLeft, setHoursLeft] = useState<VotingHoursLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalHours: 0,
    isVotingOver: false,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const updateVotingHours = () => {
      setHoursLeft(calculateVotingHoursLeft(LAST_MESA_CLOSING))
    }

    updateVotingHours()
    setMounted(true)

    const timer = setInterval(updateVotingHours, 1000)
    return () => clearInterval(timer)
  }, [])

  const votingDetails = getVotingDetails()
  const statusMessage = getVotingStatusMessage(hoursLeft)

  if (!mounted) return null

  return (
    <div
      className={`rounded-2xl p-6 md:p-10 border-2 transition-colors duration-300 mb-8 ${
        isDarkMode
          ? "bg-gradient-to-br from-orange-950/40 to-red-950/40 border-orange-600/40"
          : "bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/50"
      }`}
    >
      {/* Header con icono */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-3 rounded-lg ${
            isDarkMode
              ? "bg-orange-900/50 text-orange-300"
              : "bg-orange-400/30 text-orange-200"
          }`}
        >
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <h3
            className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            Cierre de Mesas de Votación
          </h3>
          <p
            className={`text-sm transition-colors duration-300 ${
              isDarkMode ? "text-orange-300" : "text-orange-100"
            }`}
          >
            Última mesa en cerrarse
          </p>
        </div>
      </div>

      {/* Countdown Display */}
      <div className="mb-6">
        {!hoursLeft.isVotingOver ? (
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {/* Hours */}
            <div
              className={`rounded-lg p-4 text-center ${
                isDarkMode
                  ? "bg-orange-900/40 border border-orange-600/50"
                  : "bg-orange-400/20 border border-orange-400/60"
              }`}
            >
              <div
                className={`text-3xl md:text-4xl font-bold font-mono transition-colors duration-300 ${
                  isDarkMode ? "text-orange-300" : "text-orange-100"
                }`}
              >
                {String(hoursLeft.hours).padStart(2, "0")}
              </div>
              <div
                className={`text-xs md:text-sm uppercase tracking-wider mt-2 transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400/70" : "text-orange-100/70"
                }`}
              >
                Horas
              </div>
            </div>

            {/* Minutes */}
            <div
              className={`rounded-lg p-4 text-center ${
                isDarkMode
                  ? "bg-orange-900/40 border border-orange-600/50"
                  : "bg-orange-400/20 border border-orange-400/60"
              }`}
            >
              <div
                className={`text-3xl md:text-4xl font-bold font-mono transition-colors duration-300 ${
                  isDarkMode ? "text-orange-300" : "text-orange-100"
                }`}
              >
                {String(hoursLeft.minutes).padStart(2, "0")}
              </div>
              <div
                className={`text-xs md:text-sm uppercase tracking-wider mt-2 transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400/70" : "text-orange-100/70"
                }`}
              >
                Minutos
              </div>
            </div>

            {/* Seconds */}
            <div
              className={`rounded-lg p-4 text-center ${
                isDarkMode
                  ? "bg-orange-900/40 border border-orange-600/50"
                  : "bg-orange-400/20 border border-orange-400/60"
              }`}
            >
              <div
                className={`text-3xl md:text-4xl font-bold font-mono transition-colors duration-300 ${
                  isDarkMode ? "text-orange-300" : "text-orange-100"
                }`}
              >
                {String(hoursLeft.seconds).padStart(2, "0")}
              </div>
              <div
                className={`text-xs md:text-sm uppercase tracking-wider mt-2 transition-colors duration-300 ${
                  isDarkMode ? "text-orange-400/70" : "text-orange-100/70"
                }`}
              >
                Segundos
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`p-6 rounded-lg text-center ${
              isDarkMode
                ? "bg-green-900/30 border-2 border-green-600/50"
                : "bg-green-500/20 border-2 border-green-400/50"
            }`}
          >
            <p
              className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? "text-green-300" : "text-green-100"
              }`}
            >
              ✓ Las urnas han cerrado en todo Chile
            </p>
          </div>
        )}
      </div>

      {/* Status Message */}
      <div
        className={`text-center mb-6 p-4 rounded-lg transition-colors duration-300 ${
          isDarkMode
            ? "bg-orange-950/50 border border-orange-700/50"
            : "bg-orange-600/20 border border-orange-400/50"
        }`}
      >
        <p
          className={`font-semibold transition-colors duration-300 ${
            isDarkMode ? "text-orange-200" : "text-orange-50"
          }`}
        >
          {statusMessage}
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid md:grid-cols-2 gap-4 border-t pt-6 transition-colors duration-300 border-orange-600/30">
        {/* Voting Schedule */}
        <div>
          <h4
            className={`font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white/90"
            }`}
          >
            <span>📅</span>
            Cronograma de Votación
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-orange-300" : "text-orange-100"
                }`}
              >
                Fecha:
              </span>
              <span
                className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-white"
                }`}
              >
                {votingDetails.date}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-orange-300" : "text-orange-100"
                }`}
              >
                Apertura:
              </span>
              <span
                className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-white"
                }`}
              >
                {votingDetails.openTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span
                className={`transition-colors duration-300 ${
                  isDarkMode ? "text-orange-300" : "text-orange-100"
                }`}
              >
                Cierre:
              </span>
              <span
                className={`font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-white"
                }`}
              >
                {votingDetails.closeTime}
              </span>
            </div>
          </div>
        </div>

        {/* Zones */}
        <div>
          <h4
            className={`font-semibold mb-3 flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white/90"
            }`}
          >
            <span>🗺️</span>
            Zonas Horarias
          </h4>
          <div className="space-y-2 text-sm">
            {votingDetails.zones.map((zone, idx) => (
              <div
                key={idx}
                className={`p-2 rounded transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-orange-900/30 border-l-2 border-orange-600"
                    : "bg-orange-400/15 border-l-2 border-orange-400"
                }`}
              >
                <div className="font-semibold">
                  {zone.name} ({zone.timezone})
                </div>
                <div
                  className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? "text-orange-300" : "text-orange-100"
                  }`}
                >
                  Cierra: {zone.closeTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div
        className={`mt-6 p-4 rounded-lg text-sm transition-colors duration-300 ${
          isDarkMode
            ? "bg-blue-900/20 border border-blue-600/30"
            : "bg-blue-500/15 border border-blue-400/40"
        }`}
      >
        <p
          className={`transition-colors duration-300 ${
            isDarkMode ? "text-blue-300" : "text-blue-100"
          }`}
        >
          <strong>ℹ️ Nota:</strong> La última mesa de votación en cerrar está en Isla de
          Pascua (UTC-5), que cierra 2 horas después que el continente en hora local.
        </p>
      </div>
    </div>
  )
})

export default VotingHoursCountdown
