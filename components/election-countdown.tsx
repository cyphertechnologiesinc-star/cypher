"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { Moon, Sun } from "lucide-react"
import dynamic from "next/dynamic"
import ElectionTabs from "./election-tabs"
import CountdownTimer from "./countdown-timer"
import CandidatesGrid from "./candidates-grid"
import ElectionInfo from "./election-info"
import VotingHoursCountdown from "./voting-hours-countdown"
import VotingResults from "./voting-results"
import { calculateTimeLeft, getDarkMode, setDarkMode } from "@/lib/helpers"
import { FIRST_ROUND_DATE, ELECTION_COLORS } from "@/lib/constants"
import type { TimeLeft } from "@/lib/helpers"

// Dynamic imports for performance
const Election2021 = dynamic(() => import("./election-2021"))
const HistoricalElections = dynamic(() => import("./historical-elections"))

export default function ElectionCountdown() {
  const [isDarkMode, setIsDarkModeState] = useState(false)
  const [activeTab, setActiveTab] = useState<"2021" | "2025" | "historial">("2025")
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    const savedDarkMode = getDarkMode()
    setIsDarkModeState(savedDarkMode)
    setMounted(true)
  }, [])

  // Handle dark mode toggle with persistence
  const toggleDarkMode = useCallback(() => {
    setIsDarkModeState((prev) => {
      const newMode = !prev
      setDarkMode(newMode)
      return newMode
    })
  }, [])

  // Timer effect - optimized
  useEffect(() => {
    const calculateAndUpdate = () => {
      setTimeLeft(calculateTimeLeft(FIRST_ROUND_DATE))
    }

    calculateAndUpdate() // Initial calculation
    const timer = setInterval(calculateAndUpdate, 1000)

    return () => clearInterval(timer)
  }, [])


  // Memoized background gradient
  const bgGradient = useMemo(
    () => (isDarkMode ? ELECTION_COLORS.darkBg : ELECTION_COLORS.lightBg),
    [isDarkMode]
  )

  // Prevent hydration mismatch by only rendering after mount
  if (!mounted) {
    return (
      <div className={`min-h-screen transition-colors duration-300 ${ELECTION_COLORS.lightBg}`}>
        <div className="p-4 md:p-8 flex items-center justify-center h-screen">
          <div className="text-white text-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p>Cargando...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${bgGradient}`}>
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-5xl font-bold transition-colors duration-300 text-white">
              Elecciones Presidenciales Chile
            </h1>
            <button
              onClick={toggleDarkMode}
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

              {/* Voting Results Component */}
              <VotingResults isDarkMode={isDarkMode} />

              {/* Countdown Timer Component */}
              <CountdownTimer timeLeft={timeLeft} isDarkMode={isDarkMode} />

              {/* Voting Hours Countdown Component */}
              <VotingHoursCountdown isDarkMode={isDarkMode} />

              {/* Candidates Grid Component */}
              <CandidatesGrid isDarkMode={isDarkMode} />

              {/* Election Info Component */}
              <ElectionInfo isDarkMode={isDarkMode} />
            </div>
          ) : activeTab === "2021" ? (
            <div
              className={`backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/90 border border-gray-700"
                  : "bg-white/10 border-2 border-white/20"
              }`}
            >
              <Election2021 isDarkMode={isDarkMode} />
            </div>
          ) : (
            <div
              className={`backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/90 border border-gray-700"
                  : "bg-white/10 border-2 border-white/20"
              }`}
            >
              <HistoricalElections isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
