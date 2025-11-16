"use client"

import { memo } from "react"

interface ElectionInfoProps {
  isDarkMode: boolean
}

const ElectionInfo = memo(function ElectionInfo({ isDarkMode }: ElectionInfoProps) {
  const infoItems = [
    {
      icon: "🗳️",
      title: "Fechas Importantes",
      items: [
        { label: "Primera Vuelta", value: "16 nov 2025" },
        { label: "Segunda Vuelta", value: "14 dic 2025" },
      ],
    },
    {
      icon: "📅",
      title: "Período Presidencial",
      items: [
        { label: "Inicio", value: "11 marzo 2026" },
        { label: "Término", value: "11 marzo 2030" },
      ],
    },
    {
      icon: "ℹ️",
      title: "Información",
      items: [
        { label: "Tipo", value: "Presidencial" },
        { label: "Nivel", value: "Nacional" },
        { label: "Duración", value: "4 años" },
      ],
    },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {infoItems.map((item, idx) => (
        <div
          key={idx}
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
            <span>{item.icon}</span>
            {item.title}
          </h4>
          <div className="space-y-2 text-xs">
            {item.items.map((subItem, subIdx) => (
              <div key={subIdx} className="flex flex-col gap-1">
                <span
                  className={`transition-colors duration-300 ${
                    isDarkMode ? "text-gray-400" : "text-white/70"
                  }`}
                >
                  {subItem.label}
                </span>
                <span
                  className={`font-semibold transition-colors duration-300 ${
                    isDarkMode ? "text-white" : "text-white"
                  }`}
                >
                  {subItem.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
})

export default ElectionInfo
