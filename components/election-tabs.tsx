"use client"

import { memo } from "react"

interface ElectionTabsProps {
  isDarkMode: boolean
  activeTab: "2021" | "2025" | "historial"
  onTabChange: (tab: "2021" | "2025" | "historial") => void
}

const ElectionTabs = memo(function ElectionTabs({
  isDarkMode,
  activeTab,
  onTabChange,
}: ElectionTabsProps) {
  const tabs = [
    { id: "2025", label: "Elección 2025", icon: "📅" },
    { id: "2021", label: "Elección 2021", icon: "🗳️" },
    { id: "historial", label: "Historial (1975-2025)", icon: "📊" },
  ]

  return (
    <div
      className="flex gap-3 md:gap-4 justify-center flex-wrap px-4 py-2 rounded-full bg-gov-gray w-fit mx-auto"
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as "2021" | "2025")}
          className={`px-5 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm md:text-base ${
            activeTab === tab.id
              ? "bg-[rgba(0,56,168,0.12)] text-gov-blue border-b-2 border-gov-blue"
              : "border border-border-light text-text-mid hover:border-gov-blue hover:text-gov-blue"
          }`}
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  )
})

export default ElectionTabs
