'use client';

import { useState, useEffect } from 'react';
import { parseElectionExcel, type ElectionData } from '@/lib/excel-parser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, TrendingUp, Award } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export default function ComparativasPage() {
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
          <CardTitle className="text-white">Comparativas y Tendencias</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">No hay datos cargados. Carga un archivo Excel.</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate metrics
  const candidateChartData = data.candidates.map((c) => ({
    name: c.name.split(' ').slice(0, 2).join(' '),
    votos: c.votes,
    porcentaje: parseFloat(c.percentage),
  }));

  const gapData = data.candidates.slice(0, 5).map((c, idx) => ({
    name: c.name.split(' ')[0],
    votos: c.votes,
    brecha: idx > 0 ? data.candidates[0].votes - c.votes : 0,
  }));

  const participationRate = ((data.validVotes / data.totalVotes) * 100).toFixed(1);
  const nullRate = ((data.nullVotes / data.totalVotes) * 100).toFixed(1);
  const blankRate = ((data.blankVotes / data.totalVotes) * 100).toFixed(1);

  const leadingCandidate = data.candidates[0];
  const secondCandidate = data.candidates[1];
  const gapVotes = leadingCandidate.votes - (secondCandidate?.votes || 0);
  const gapPercentage = (
    parseFloat(leadingCandidate.percentage) - parseFloat(secondCandidate?.percentage || '0')
  ).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Comparativas y Tendencias</h1>
          <p className="text-slate-400">Análisis comparativo de los resultados</p>
        </div>
        <label htmlFor="file-upload-comparativas" className="cursor-pointer">
          <Button asChild variant="outline">
            <span className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Cargar datos
            </span>
          </Button>
          <input
            id="file-upload-comparativas"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Key Comparisons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-900/40 to-slate-800 border border-green-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Líder vs Segundo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">Brecha en Votos</p>
                <p className="text-3xl font-bold text-green-400">{gapVotes.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Brecha en Porcentaje</p>
                <p className="text-2xl font-bold text-green-400">{gapPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/40 to-slate-800 border border-blue-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Tasa de Participación</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-400 mb-1">Votos Válidos</p>
                <p className="text-3xl font-bold text-blue-400">{participationRate}%</p>
                <p className="text-xs text-slate-500">De {data.totalVotes.toLocaleString()} votos totales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Candidate Gap Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Brecha Respecto al Líder</CardTitle>
          <CardDescription>Diferencia de votos con el candidato que encabeza</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gapData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" tick={{ fill: '#cbd5e1' }} />
              <YAxis tick={{ fill: '#cbd5e1' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                }}
                formatter={(value) => [(value as number).toLocaleString(), 'Votos']}
              />
              <Bar dataKey="brecha" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vote Quality Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Votos Válidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-400">{participationRate}%</p>
            <p className="text-sm text-slate-400 mt-2">{data.validVotes.toLocaleString()} votos</p>
            <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${participationRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Votos Nulos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-400">{nullRate}%</p>
            <p className="text-sm text-slate-400 mt-2">{data.nullVotes.toLocaleString()} votos</p>
            <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500"
                style={{ width: `${nullRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-300">Votos en Blanco</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-400">{blankRate}%</p>
            <p className="text-sm text-slate-400 mt-2">{data.blankVotes.toLocaleString()} votos</p>
            <div className="mt-3 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500"
                style={{ width: `${blankRate}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Candidates Comparison */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5" />
            Top 5 - Comparativa Detallada
          </CardTitle>
          <CardDescription>Análisis de los 5 candidatos líderes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.candidates.slice(0, 5).map((candidate, index) => {
              const voiceShare = ((candidate.votes / data.validVotes) * 100).toFixed(1);
              return (
                <div
                  key={index}
                  className="p-4 bg-slate-700/40 rounded-lg border border-slate-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <h4 className="text-white font-semibold">{candidate.name}</h4>
                      </div>
                    </div>
                    <p className="text-blue-400 font-bold text-lg">{candidate.percentage}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Votos</p>
                      <p className="text-white font-semibold">{candidate.votes.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">% de Válidos</p>
                      <p className="text-green-400 font-semibold">{voiceShare}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Diferencia</p>
                      <p className="text-orange-400 font-semibold">
                        {index === 0
                          ? 'Líder'
                          : `−${(data.candidates[0].votes - candidate.votes).toLocaleString()}`}
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      style={{
                        width: `${(candidate.votes / data.candidates[0].votes) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Concentration Analysis */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Análisis de Concentración</CardTitle>
          <CardDescription>Distribución de votos entre candidatos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm mb-3">Top 3 Concentración</p>
              <div className="space-y-2">
                {data.candidates.slice(0, 3).map((candidate, index) => {
                  const percentage = (
                    (candidate.votes / data.validVotes) *
                    100
                  ).toFixed(1);
                  return (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">{index + 1}. {candidate.name.split(' ')[0]}</span>
                      <span className="text-white font-semibold">{percentage}%</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-500">
                <p className="text-xs text-slate-400">Total Top 3:</p>
                <p className="text-2xl font-bold text-green-400">
                  {(
                    ((data.candidates[0].votes +
                      data.candidates[1].votes +
                      data.candidates[2].votes) /
                      data.validVotes) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
              <p className="text-slate-400 text-sm mb-3">Fragmentación Electoral</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Total Candidatos</span>
                  <span className="text-white font-semibold">{data.candidates.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Con más de 5%</span>
                  <span className="text-white font-semibold">
                    {data.candidates.filter((c) => parseFloat(c.percentage) > 5).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Con menos de 2%</span>
                  <span className="text-white font-semibold">
                    {data.candidates.filter((c) => parseFloat(c.percentage) < 2).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
