'use client';

import { useState, useEffect } from 'react';
import { parseElectionExcel, type ElectionData } from '@/lib/excel-parser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Award, TrendingUp } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function CandidatosPage() {
  const [data, setData] = useState<ElectionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/election-data');
      if (response.ok) {
        const data = await response.json();
        setData(data);
      }
    } catch (err) {
      console.log('No initial data available');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const electionData = await parseElectionExcel(file);
      setData(electionData);
    } catch (err) {
      console.error('Error loading file:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"></div>
          <p className="text-white text-lg">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Análisis de Candidatos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">No hay datos cargados. Carga un archivo Excel.</p>
        </CardContent>
      </Card>
    );
  }

  const chartData = data.candidates.map((c) => ({
    name: c.name.substring(0, 20),
    votos: c.votes,
    porcentaje: parseFloat(c.percentage),
  }));

  const totalVotesWithoutNull = data.validVotes;
  const candidateStats = data.candidates.map((candidate) => ({
    ...candidate,
    share: ((candidate.votes / totalVotesWithoutNull) * 100).toFixed(2),
    isLeading: candidate === data.candidates[0],
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Análisis de Candidatos</h1>
          <p className="text-slate-400">Resultados detallados de todos los candidatos</p>
        </div>
        <label htmlFor="file-upload-candidatos" className="cursor-pointer">
          <Button asChild variant="outline">
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Cargar datos
            </span>
          </Button>
          <input
            id="file-upload-candidatos"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Comparativa de Votos</CardTitle>
          <CardDescription>Votos recibidos por cada candidato</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
              <YAxis tick={{ fill: '#cbd5e1' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                formatter={(value) => [(value as number).toLocaleString(), 'Votos']}
              />
              <Bar dataKey="votos" fill="#3b82f6" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            Ranking Completo
          </CardTitle>
          <CardDescription>Todos los candidatos ordenados por votos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-300 font-semibold">Pos.</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-semibold">Candidato</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-semibold">Votos</th>
                  <th className="text-right py-3 px-4 text-slate-300 font-semibold">Porcentaje</th>
                  <th className="text-center py-3 px-4 text-slate-300 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {candidateStats.map((candidate, index) => (
                  <tr
                    key={index}
                    className={`border-b border-slate-700 transition ${
                      candidate.isLeading
                        ? 'bg-green-500/10 hover:bg-green-500/20'
                        : 'hover:bg-slate-700/50'
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 text-white text-xs font-bold">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-white font-semibold">{candidate.name}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right text-white font-semibold">
                      {candidate.votes.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-300">
                      <div className="flex flex-col items-end">
                        <span>{candidate.percentage}</span>
                        <span className="text-xs text-slate-500">({candidate.share}% de válidos)</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {candidate.isLeading && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
                          🏆 Líder
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.candidates.map((candidate, index) => (
          <Card
            key={index}
            className={`bg-slate-800 border-slate-700 ${
              candidate === data.candidates[0]
                ? 'lg:col-span-2 border-green-500/50 bg-gradient-to-r from-slate-800 to-green-900/20'
                : ''
            }`}
          >
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{candidate.name}</h3>
                    <p className="text-sm text-slate-400">Candidato #{candidate.position}</p>
                  </div>
                  {candidate === data.candidates[0] && (
                    <div className="text-3xl">🏆</div>
                  )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">Total de Votos</p>
                    <p className="text-2xl font-bold text-white">
                      {candidate.votes.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-xs text-slate-400 mb-1">Porcentaje</p>
                    <p className="text-2xl font-bold text-blue-400">{candidate.percentage}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-400">Proporción de votos válidos</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {((candidate.votes / data.validVotes) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all"
                      style={{
                        width: `${(candidate.votes / data.validVotes) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
