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
import ElectionSummaryHome from "./election-summary-home"
import { calculateTimeLeft, getDarkMode, setDarkMode } from "@/lib/helpers"
import { FIRST_ROUND_DATE, ELECTION_COLORS } from "@/lib/constants"
import { useAllElections } from "@/lib/use-all-elections"
import type { TimeLeft } from "@/lib/helpers"

// Dynamic imports for performance
const Election2025 = dynamic(() => import("./election-2025"))
const Election2021 = dynamic(() => import("./election-2021"))
const HistoricalElections = dynamic(() => import("./historical-elections"))
const ElectionSummary = dynamic(() => import("./election-summary"))

export default function ElectionCountdown() {
  const { latest, elections2025, elections2021, allHistorical, loading } = useAllElections()
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

  // Determine active tab based on latest election from Supabase
  useEffect(() => {
    if (!loading && latest) {
      // Extract year from title (e.g., "Elección Presidencial 2025 - Primera Vuelta")
      const yearMatch = latest.title.match(/(\d{4})/);
      const year = yearMatch ? yearMatch[1] : '2025';

      if (year === '2025') {
        setActiveTab('2025');
      } else if (year === '2021') {
        setActiveTab('2021');
      } else {
        setActiveTab('historial');
      }
    }
  }, [latest, loading])

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
    <div className="min-h-screen bg-gov-white">
      {/* Hero Background Section */}
      <div className="hero-bg min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <div className="relative z-10 text-center mb-12 md:mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 hero-fade-in glow-blue">
            CHILE 2025
          </h1>
          <p className="text-base md:text-lg font-light tracking-widest text-white/80 hero-fade-in">
            ELECCIONES PRESIDENCIALES
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 z-20"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>

        {/* Navigation Tabs */}
        <div className="mt-12">
          <ElectionTabs
            isDarkMode={isDarkMode}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gov-white p-4 md:p-8">

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
              <Election2025 isDarkMode={isDarkMode} />
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

        {/* Election Summary Section - Only for 2025 tab */}
        {activeTab === "2025" && (
          <div className="mt-8">
            <div
              className={`backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 transition-colors duration-300 ${
                isDarkMode
                  ? "bg-gray-800/90 border border-gray-700"
                  : "bg-white/10 border-2 border-white/20"
              }`}
            >
              <ElectionSummary isDarkMode={isDarkMode} />
            </div>
          </div>
        )}
        {activeTab === "2025" && <ElectionSummaryHome />}
      </div>
    </div>
  )
}
