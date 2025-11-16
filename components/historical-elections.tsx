"use client"

import { memo, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PresidentialCandidate {
  name: string
  party: string
  votes: number
  percentage: number
  elected: boolean
}

interface PresidentialElection {
  year: number
  round: "primera" | "segunda"
  president: string
  candidates: PresidentialCandidate[]
  total_votes: number
  turnout: number
  date: string
}

// Historical data for the last 50 years (1975-2025)
const HISTORICAL_ELECTIONS: PresidentialElection[] = [
  {
    year: 1975,
    round: "primera",
    president: "Augusto Pinochet",
    date: "Plebiscito",
    total_votes: 3872849,
    turnout: 75.2,
    candidates: [
      {
        name: "Augusto Pinochet (Continuidad)",
        party: "Militares",
        votes: 3089387,
        percentage: 79.7,
        elected: true,
      },
      {
        name: "En contra",
        party: "Oposición",
        votes: 787462,
        percentage: 20.3,
        elected: false,
      },
    ],
  },
  {
    year: 1989,
    round: "primera",
    president: "Patricio Aylwin",
    date: "5 octubre 1989",
    total_votes: 7237886,
    turnout: 91.3,
    candidates: [
      {
        name: "Patricio Aylwin",
        party: "Concertación",
        votes: 3858472,
        percentage: 53.4,
        elected: true,
      },
      {
        name: "Hernán Búchi",
        party: "RN/UDI",
        votes: 2913507,
        percentage: 40.3,
        elected: false,
      },
      {
        name: "Francisco Javier Errázuriz",
        party: "Independiente",
        votes: 397526,
        percentage: 5.5,
        elected: false,
      },
    ],
  },
  {
    year: 1993,
    round: "primera",
    president: "Eduardo Frei Ruiz-Tagle",
    date: "6 diciembre 1993",
    total_votes: 6612765,
    turnout: 85.1,
    candidates: [
      {
        name: "Eduardo Frei Ruiz-Tagle",
        party: "PDC",
        votes: 3723019,
        percentage: 56.3,
        elected: true,
      },
      {
        name: "Arturo Alessandri",
        party: "UDI",
        votes: 1698624,
        percentage: 25.7,
        elected: false,
      },
      {
        name: "Ricardo Lagos Escobar",
        party: "PPD",
        votes: 1200189,
        percentage: 18.1,
        elected: false,
      },
    ],
  },
  {
    year: 1999,
    round: "primera",
    president: "Ricardo Lagos",
    date: "12 diciembre 1999",
    total_votes: 6294334,
    turnout: 67.5,
    candidates: [
      {
        name: "Ricardo Lagos",
        party: "Concertación",
        votes: 3172221,
        percentage: 50.4,
        elected: false,
      },
      {
        name: "Joaquín Lavín",
        party: "UDI",
        votes: 3174969,
        percentage: 50.4,
        elected: false,
      },
    ],
  },
  {
    year: 1999,
    round: "segunda",
    president: "Ricardo Lagos",
    date: "16 enero 2000",
    total_votes: 6257531,
    turnout: 68.3,
    candidates: [
      {
        name: "Ricardo Lagos",
        party: "Concertación",
        votes: 3174288,
        percentage: 51.3,
        elected: true,
      },
      {
        name: "Joaquín Lavín",
        party: "UDI",
        votes: 3083243,
        percentage: 48.7,
        elected: false,
      },
    ],
  },
  {
    year: 2005,
    round: "primera",
    president: "Michelle Bachelet",
    date: "12 diciembre 2005",
    total_votes: 7636799,
    turnout: 87.0,
    candidates: [
      {
        name: "Michelle Bachelet",
        party: "Concertación",
        votes: 3860435,
        percentage: 50.7,
        elected: false,
      },
      {
        name: "Joaquín Lavín",
        party: "UDI",
        votes: 2926340,
        percentage: 38.3,
        elected: false,
      },
      {
        name: "Tomás Hirsch",
        party: "Juntos",
        votes: 849924,
        percentage: 11.1,
        elected: false,
      },
    ],
  },
  {
    year: 2005,
    round: "segunda",
    president: "Michelle Bachelet",
    date: "15 enero 2006",
    total_votes: 7456499,
    turnout: 85.1,
    candidates: [
      {
        name: "Michelle Bachelet",
        party: "Concertación",
        votes: 3965815,
        percentage: 53.1,
        elected: true,
      },
      {
        name: "Joaquín Lavín",
        party: "UDI",
        votes: 3490684,
        percentage: 46.9,
        elected: false,
      },
    ],
  },
  {
    year: 2009,
    round: "primera",
    president: "Sebastián Piñera",
    date: "13 diciembre 2009",
    total_votes: 8046289,
    turnout: 87.0,
    candidates: [
      {
        name: "Sebastián Piñera",
        party: "Coalición por el Cambio",
        votes: 3751490,
        percentage: 46.6,
        elected: false,
      },
      {
        name: "Eduardo Frei Ruiz-Tagle",
        party: "Concertación",
        votes: 3208139,
        percentage: 39.9,
        elected: false,
      },
      {
        name: "Jorge Arrate",
        party: "PAIS",
        votes: 849660,
        percentage: 10.6,
        elected: false,
      },
      {
        name: "Marco Enríquez-Ominami",
        party: "Independiente",
        votes: 236801,
        percentage: 2.9,
        elected: false,
      },
    ],
  },
  {
    year: 2009,
    round: "segunda",
    president: "Sebastián Piñera",
    date: "17 enero 2010",
    total_votes: 8060199,
    turnout: 87.1,
    candidates: [
      {
        name: "Sebastián Piñera",
        party: "Coalición por el Cambio",
        votes: 4012886,
        percentage: 49.8,
        elected: true,
      },
      {
        name: "Eduardo Frei Ruiz-Tagle",
        party: "Concertación",
        votes: 4047313,
        percentage: 50.2,
        elected: false,
      },
    ],
  },
  {
    year: 2013,
    round: "primera",
    president: "Michelle Bachelet",
    date: "17 noviembre 2013",
    total_votes: 8152060,
    turnout: 49.0,
    candidates: [
      {
        name: "Michelle Bachelet",
        party: "Nueva Mayoría",
        votes: 3070347,
        percentage: 37.6,
        elected: false,
      },
      {
        name: "Evelyn Matthei",
        party: "Alianza",
        votes: 2355499,
        percentage: 28.8,
        elected: false,
      },
      {
        name: "Marco Enríquez-Ominami",
        party: "Independiente",
        votes: 1569087,
        percentage: 19.2,
        elected: false,
      },
      {
        name: "Andrés Koppelman",
        party: "AHD",
        votes: 1157127,
        percentage: 14.2,
        elected: false,
      },
    ],
  },
  {
    year: 2013,
    round: "segunda",
    president: "Michelle Bachelet",
    date: "15 diciembre 2013",
    total_votes: 6999157,
    turnout: 42.0,
    candidates: [
      {
        name: "Michelle Bachelet",
        party: "Nueva Mayoría",
        votes: 3073778,
        percentage: 62.2,
        elected: true,
      },
      {
        name: "Evelyn Matthei",
        party: "Alianza",
        votes: 1876353,
        percentage: 37.8,
        elected: false,
      },
    ],
  },
  {
    year: 2017,
    round: "primera",
    president: "Sebastián Piñera",
    date: "19 noviembre 2017",
    total_votes: 7576643,
    turnout: 46.0,
    candidates: [
      {
        name: "Sebastián Piñera",
        party: "Alianza",
        votes: 2305442,
        percentage: 30.4,
        elected: false,
      },
      {
        name: "Alejandro Guillier",
        party: "Nueva Mayoría",
        votes: 2151403,
        percentage: 28.4,
        elected: false,
      },
      {
        name: "Beatriz Sánchez",
        party: "Frente Amplio",
        votes: 1542972,
        percentage: 20.3,
        elected: false,
      },
      {
        name: "José Antonio Kast",
        party: "Independiente",
        votes: 889571,
        percentage: 11.7,
        elected: false,
      },
      {
        name: "Marco Enríquez-Ominami",
        party: "Independiente",
        votes: 254961,
        percentage: 3.4,
        elected: false,
      },
    ],
  },
  {
    year: 2017,
    round: "segunda",
    president: "Sebastián Piñera",
    date: "17 diciembre 2017",
    total_votes: 7272504,
    turnout: 44.0,
    candidates: [
      {
        name: "Sebastián Piñera",
        party: "Alianza",
        votes: 3640083,
        percentage: 50.0,
        elected: true,
      },
      {
        name: "Alejandro Guillier",
        party: "Nueva Mayoría",
        votes: 3640021,
        percentage: 50.0,
        elected: false,
      },
    ],
  },
  {
    year: 2021,
    round: "primera",
    president: "Gabriel Boric",
    date: "21 noviembre 2021",
    total_votes: 11644798,
    turnout: 47.3,
    candidates: [
      {
        name: "José Antonio Kast",
        party: "Republicano",
        votes: 3273505,
        percentage: 27.91,
        elected: false,
      },
      {
        name: "Gabriel Boric Font",
        party: "Convergencia Social",
        votes: 3003633,
        percentage: 25.82,
        elected: false,
      },
      {
        name: "Franco Parisi",
        party: "Partido de la Gente",
        votes: 1485889,
        percentage: 12.81,
        elected: false,
      },
      {
        name: "Yasna Provoste",
        party: "DC/Socialista",
        votes: 1385345,
        percentage: 11.96,
        elected: false,
      },
      {
        name: "Sebastián Sichel",
        party: "Independiente",
        votes: 995806,
        percentage: 8.59,
        elected: false,
      },
    ],
  },
  {
    year: 2021,
    round: "segunda",
    president: "Gabriel Boric",
    date: "19 diciembre 2021",
    total_votes: 8364481,
    turnout: 56.0,
    candidates: [
      {
        name: "Gabriel Boric Font",
        party: "Convergencia Social",
        votes: 4621231,
        percentage: 55.87,
        elected: true,
      },
      {
        name: "José Antonio Kast",
        party: "Republicano",
        votes: 3650662,
        percentage: 44.14,
        elected: false,
      },
    ],
  },
]

interface HistoricalElectionsProps {
  isDarkMode: boolean
}

const HistoricalElections = memo(function HistoricalElections({
  isDarkMode,
}: HistoricalElectionsProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2021)
  const elections = HISTORICAL_ELECTIONS.filter((e) => e.year === selectedYear)
  const years = Array.from(new Set(HISTORICAL_ELECTIONS.map((e) => e.year))).sort(
    (a, b) => b - a
  )

  const handlePrevYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex < years.length - 1) {
      setSelectedYear(years[currentIndex + 1])
    }
  }

  const handleNextYear = () => {
    const currentIndex = years.indexOf(selectedYear)
    if (currentIndex > 0) {
      setSelectedYear(years[currentIndex - 1])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2
          className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 ${
            isDarkMode ? "text-white" : "text-white"
          }`}
        >
          Historial Electoral - Últimos 50 Años
        </h2>
        <p
          className={`text-lg transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-white/80"
          }`}
        >
          Datos presidenciales desde 1975
        </p>
      </div>

      {/* Year Navigation */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={handlePrevYear}
          disabled={years.indexOf(selectedYear) === years.length - 1}
          className={`p-3 rounded-lg transition-all duration-300 ${
            years.indexOf(selectedYear) === years.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          } ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white disabled:hover:bg-gray-700"
              : "bg-white/20 hover:bg-white/30 text-white disabled:hover:bg-white/20"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          className={`px-8 py-3 rounded-lg text-center min-w-fit transition-colors duration-300 ${
            isDarkMode
              ? "bg-gray-700/50 border border-gray-600"
              : "bg-white/10 border border-white/20"
          }`}
        >
          <div
            className={`text-4xl font-bold transition-colors duration-300 ${
              isDarkMode ? "text-white" : "text-white"
            }`}
          >
            {selectedYear}
          </div>
        </div>

        <button
          onClick={handleNextYear}
          disabled={years.indexOf(selectedYear) === 0}
          className={`p-3 rounded-lg transition-all duration-300 ${
            years.indexOf(selectedYear) === 0
              ? "opacity-50 cursor-not-allowed"
              : ""
          } ${
            isDarkMode
              ? "bg-gray-700 hover:bg-gray-600 text-white disabled:hover:bg-gray-700"
              : "bg-white/20 hover:bg-white/30 text-white disabled:hover:bg-white/20"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Elections Results */}
      <div className="space-y-6">
        {elections.map((election, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-6 md:p-8 border-2 transition-colors duration-300 ${
              isDarkMode
                ? "bg-gray-900/50 border-gray-700/50"
                : "bg-white/5 border-white/20"
            }`}
          >
            {/* Election Header */}
            <div className="mb-6">
              <h3
                className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-white"
                }`}
              >
                {election.round === "primera" ? "Primera Vuelta" : "Segunda Vuelta"} -{" "}
                {election.date}
              </h3>
              {election.round === "segunda" && (
                <div
                  className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 ${
                    isDarkMode
                      ? "bg-green-900/30 border border-green-600/50 text-green-300"
                      : "bg-green-500/20 border border-green-400/50 text-green-100"
                  }`}
                >
                  ✓ Presidente Electo: {election.president}
                </div>
              )}
            </div>

            {/* Results */}
            <div className="space-y-3">
              {election.candidates.map((candidate, cidx) => (
                <div
                  key={cidx}
                  className={`rounded-lg p-4 transition-all duration-300 ${
                    candidate.elected
                      ? isDarkMode
                        ? "bg-gradient-to-r from-green-900/40 to-green-800/30 border-l-4 border-green-500"
                        : "bg-gradient-to-r from-green-500/20 to-green-400/10 border-l-4 border-green-400"
                      : isDarkMode
                      ? "bg-gray-800/30 border-l-4 border-gray-600"
                      : "bg-white/5 border-l-4 border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div
                        className={`font-semibold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        {candidate.name}
                        {candidate.elected && " 👑"}
                      </div>
                      <div
                        className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        {candidate.party}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-bold transition-colors duration-300 ${
                          isDarkMode ? "text-white" : "text-white"
                        }`}
                      >
                        {candidate.percentage.toFixed(2)}%
                      </div>
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? "text-gray-400" : "text-white/70"
                        }`}
                      >
                        {candidate.votes.toLocaleString("es-CL")}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700/50" : "bg-white/10"
                    }`}
                  >
                    <div
                      className={`h-full transition-all duration-300 ${
                        candidate.elected
                          ? "bg-gradient-to-r from-green-600 to-green-500"
                          : "bg-gradient-to-r from-blue-600 to-blue-500"
                      }`}
                      style={{ width: `${candidate.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div
              className={`mt-6 pt-4 border-t transition-colors duration-300 ${
                isDarkMode ? "border-gray-700" : "border-white/20"
              }`}
            >
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-white/70"
                    }`}
                  >
                    Total de votos:
                  </span>
                  <div
                    className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white"
                    }`}
                  >
                    {election.total_votes.toLocaleString("es-CL")}
                  </div>
                </div>
                <div>
                  <span
                    className={`transition-colors duration-300 ${
                      isDarkMode ? "text-gray-400" : "text-white/70"
                    }`}
                  >
                    Participación:
                  </span>
                  <div
                    className={`font-semibold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-white"
                    }`}
                  >
                    {election.turnout.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export default HistoricalElections
