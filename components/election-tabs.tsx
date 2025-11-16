"use client"

import { useState } from "react"

interface ElectionTabsProps {
  isDarkMode: boolean
  activeTab: "2021" | "2025"
  onTabChange: (tab: "2021" | "2025") => void
}

export default function ElectionTabs({
  isDarkMode,
  activeTab,
  onTabChange,
}: ElectionTabsProps) {
  const tabs = [
    { id: "2021", label: "Elección 2021", icon: "🗳️" },
    { id: "2025", label: "Elección 2025", icon: "📅" },
  ]

  return (
    <div
      className={`flex gap-4 justify-center mb-8 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900/30" : "bg-white/5"
      } rounded-full p-2 w-fit mx-auto`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as "2021" | "2025")}
          className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
            activeTab === tab.id
              ? isDarkMode
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
                : "bg-gradient-to-r from-[#0039A6] to-[#D52B1E] text-white shadow-lg shadow-red-500/50"
              : isDarkMode
              ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
