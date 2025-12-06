"use client"

import { memo } from "react"
import { BarChart3, Users, Vote } from "lucide-react"

interface ElectionSummaryProps {
  isDarkMode: boolean
}

interface CandidateData {
  rank: number
  name: string
  party: string
  initials: string
  votes: number
  percentage: number
}

interface ChamberData {
  name: string
  seats: number[]
  parties: string[]
  votes: number[]
  totalVotes: number
  escrutado: number
  participacion: number
}

const ElectionSummary = memo(function ElectionSummary({ isDarkMode }: ElectionSummaryProps) {
  const presidentialData: CandidateData[] = [
    { rank: 1, name: "Jara", party: "Comunista", initials: "PC", votes: 3_476_615, percentage: 26.8 },
    { rank: 2, name: "Kast", party: "Republicano", initials: "REP", votes: 3_097_717, percentage: 23.9 },
    { rank: 3, name: "Franco Parisi", party: "Partido de la Gente", initials: "PDG", votes: 2_552_649, percentage: 19.7 },
    { rank: 4, name: "Johannes Kaiser", party: "PLN", initials: "PNL", votes: 1_804_773, percentage: 13.9 },
    { rank: 5, name: "Evelyn Matthei", party: "UDI", initials: "UDI", votes: 1_613_797, percentage: 12.5 },
    { rank: 6, name: "Harold M-N", party: "Independiente", initials: "IND", votes: 163_273, percentage: 1.3 },
    { rank: 7, name: "Marco E-O", party: "Independiente", initials: "IND", votes: 154_850, percentage: 1.2 },
    { rank: 8, name: "Eduardo Artés", party: "Independiente", initials: "IND", votes: 86_041, percentage: 0.7 },
  ]

  const senadores: ChamberData = {
    name: "Senadores",
    seats: [20, 3, 0, 18, 7, 2],
    parties: ["Unidad por Chile", "Verdes, Reg. y Hum.", "P. de la Gente", "Ch. Grande y Unido", "Cambio por Chile", "Otros"],
    votes: [993_935, 122_948, 324_700, 749_330, 783_118, 112_603],
    totalVotes: 3_731_988,
    escrutado: 100.0,
    participacion: 85.23,
  }

  const diputados: ChamberData = {
    name: "Diputados",
    seats: [61, 3, 14, 34, 42, 1],
    parties: ["Unidad por Chile", "Verdes, Reg. y Hum.", "P. de la Gente", "Ch. Grande y Unido", "Cambio por Chile", "Otros"],
    votes: [3_244_272, 734_994, 1_270_364, 2_232_196, 2_439_748, 681_741],
    totalVotes: 13_256_428,
    escrutado: 99.96,
    participacion: 84.88,
  }

  return (
    <div className="space-y-8">
      {/* Header Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`rounded-xl p-6 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-600/50"
              : "bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-400/50"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <Vote className={`w-6 h-6 ${isDarkMode ? "text-blue-400" : "text-blue-300"}`} />
            <span
              className={`text-sm font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-blue-300" : "text-blue-200"
              }`}
            >
              Votos Emitidos
            </span>
          </div>
          <p
            className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            13.452.724
          </p>
          <p
            className={`text-sm mt-2 transition-colors duration-300 ${
              isDarkMode ? "text-blue-400/70" : "text-blue-300/70"
            }`}
          >
            Participación: 85,3%
          </p>
        </div>

        <div
          className={`rounded-xl p-6 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-600/50"
              : "bg-gradient-to-br from-yellow-500/20 to-yellow-400/10 border border-yellow-400/50"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className={`w-6 h-6 ${isDarkMode ? "text-yellow-400" : "text-yellow-300"}`} />
            <span
              className={`text-sm font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-yellow-300" : "text-yellow-200"
              }`}
            >
              Escrutinio
            </span>
          </div>
          <p
            className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            100,0%
          </p>
          <p
            className={`text-sm mt-2 transition-colors duration-300 ${
              isDarkMode ? "text-yellow-400/70" : "text-yellow-300/70"
            }`}
          >
            Actualizado 14:39 hrs
          </p>
        </div>

        <div
          className={`rounded-xl p-6 transition-colors duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-600/50"
              : "bg-gradient-to-br from-green-500/20 to-green-400/10 border border-green-400/50"
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            <Users className={`w-6 h-6 ${isDarkMode ? "text-green-400" : "text-green-300"}`} />
            <span
              className={`text-sm font-semibold transition-colors duration-300 ${
                isDarkMode ? "text-green-300" : "text-green-200"
              }`}
            >
              Participación
            </span>
          </div>
          <p
            className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            85,3%
          </p>
          <p
            className={`text-sm mt-2 transition-colors duration-300 ${
              isDarkMode ? "text-green-400/70" : "text-green-300/70"
            }`}
          >
            Electorado Chileno
          </p>
        </div>
      </div>

      {/* Presidential Results */}
      <div
        className={`rounded-2xl p-8 border-2 transition-colors duration-300 ${
          isDarkMode
            ? "bg-gray-900/50 border-blue-500/30"
            : "bg-white/5 border-blue-400/30"
        }`}
      >
        <h3
          className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          }`}
        >
          Resultados Presidenciales
        </h3>
        <div className="space-y-4">
          {presidentialData.map((candidate) => (
            <div
              key={candidate.name}
              className={`rounded-xl p-5 transition-all duration-300 ${
                candidate.rank <= 2
                  ? isDarkMode
                    ? "bg-gradient-to-r from-blue-900/40 to-blue-800/30 border-l-4 border-blue-500"
                    : "bg-gradient-to-r from-blue-500/20 to-blue-400/10 border-l-4 border-blue-400"
                  : isDarkMode
                  ? "bg-gray-800/30 border-l-4 border-gray-600"
                  : "bg-white/5 border-l-4 border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`text-sm font-bold px-3 py-1 rounded transition-colors duration-300 ${
                      candidate.rank <= 2
                        ? isDarkMode
                          ? "bg-blue-600/50 text-blue-200"
                          : "bg-blue-500/30 text-blue-100"
                        : isDarkMode
                        ? "bg-gray-700/50 text-gray-300"
                        : "bg-white/10 text-white/70"
                    }`}
                  >
                    {candidate.initials}
                  </div>
                  <div>
                    <p
                      className={`font-semibold transition-colors duration-300 ${
                        isDarkMode ? "text-white" : "text-white"
                      }`}
                    >
                      {candidate.name}
                    </p>
                    <p
                      className={`text-xs transition-colors duration-300 ${
                        isDarkMode ? "text-gray-400" : "text-white/70"
                      }`}
                    >
                      {candidate.party}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white"
                    }`}
                  >
                    {candidate.percentage}%
                  </p>
                  <p
                    className={`text-xs transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-white/70"
                    }`}
                  >
                    {candidate.votes.toLocaleString("es-CL")} votos
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <div
                  className={`w-full h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700/50" : "bg-white/10"
                  }`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${
                      candidate.rank <= 2
                        ? "bg-gradient-to-r from-blue-600 to-blue-500"
                        : "bg-gradient-to-r from-gray-600 to-gray-500"
                    }`}
                    style={{ width: `${candidate.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className={`mt-6 p-4 rounded-lg text-center transition-colors duration-300 ${
            isDarkMode
              ? "bg-blue-900/20 border border-blue-600/50"
              : "bg-blue-500/20 border border-blue-400/50"
          }`}
        >
          <p
            className={`font-semibold transition-colors duration-300 ${
              isDarkMode ? "text-blue-300" : "text-blue-100"
            }`}
          >
            Total votos: 13.452.724 | Escrutado: 99,99% | Participación: 85,26%
          </p>
        </div>
      </div>

      {/* Senadores and Diputados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[senadores, diputados].map((chamber) => (
          <div
            key={chamber.name}
            className={`rounded-2xl p-8 border-2 transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-900/50 border-purple-500/30"
                : "bg-white/5 border-purple-400/30"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-6 transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-white"
              }`}
            >
              {chamber.name}
            </h3>
            <div className="space-y-3 mb-6">
              {chamber.parties.map((party, idx) => (
                <div key={party} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-lg font-bold w-12 h-12 flex items-center justify-center rounded-lg transition-colors duration-300 ${
                        isDarkMode
                          ? "bg-purple-600/50 text-purple-200"
                          : "bg-purple-500/30 text-purple-100"
                      }`}
                    >
                      {chamber.seats[idx]}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        {party}
                      </p>
                      <p
                        className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        {chamber.votes[idx].toLocaleString("es-CL")} votos
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={`p-4 rounded-lg text-center transition-colors duration-300 ${
                isDarkMode
                  ? "bg-purple-900/20 border border-purple-600/50"
                  : "bg-purple-500/20 border border-purple-400/50"
              }`}
            >
              <p
                className={`text-xs font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-purple-300" : "text-purple-100"
                }`}
              >
                Total: {chamber.totalVotes.toLocaleString("es-CL")} votos | Escrutado: {chamber.escrutado}% | Participación: {chamber.participacion}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default ElectionSummary
